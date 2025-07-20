"use client"

import React, { useEffect, useRef, useState } from "react"
import { useCreateSocketForVideo } from "./socketHandler"

export default function VideoComponent() {
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const peerRef = useRef<RTCPeerConnection | null>(null)
  const localStreamRef = useRef<MediaStream | null>(null)

  const {
    adapter, // socket.io client instance
    idleUsers,
    setStrangeId,
    strangeId,
    isCalling,
    setIsCalling,
    setStartCall,
    startCall,
    endCall,
    setEndCall
  } = useCreateSocketForVideo()

  const [targetId, setTargetId] = useState("")
  const [socketId, setSocketId] = useState<any>("")
  
  // connect to a random stranger
  const connectToStrange = () => {
    if (!idleUsers.length) return ''
    const randomIndex = Math.floor(Math.random() * idleUsers.length)
    return idleUsers[randomIndex]
  }

  /**
   * Creates a new RTCPeerConnection and sets up event handlers.
   * @param remoteId The socket ID of the remote peer to connect to.
   * This function initializes the peer connection, adds local media tracks,
   * sets up event handlers for track and ICE candidate events,
   * and returns the peer connection instance.
   * 
   * @param remoteId 
   * @returns 
   */
  const createPeer = async (remoteId: string) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    })

    const stream = await ensureLocalStreamReady()
    if (!stream) {
      return pc
    }

    stream.getTracks().forEach(track => {
      pc.addTrack(track, stream)
    })

    pc.ontrack = (event) => {
      if (remoteVideoRef.current && !remoteVideoRef.current.srcObject) {
        remoteVideoRef.current.srcObject = event.streams[0]
      }
    }

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        adapter.emit("iceCandidateToTargetUser", { to: remoteId, candidate: event.candidate })
      }
    }

    pc.onconnectionstatechange = () => {
      console.log("🔗 Connection state:", pc.connectionState)
      if (pc.connectionState === 'connected') {
        setStartCall(true)
      }
      if (pc.connectionState === 'disconnected') {
        endCallHandler()
      }
    }
    
    pc.oniceconnectionstatechange = () => {
      console.log("🔗 ICE connection state:", pc.iceConnectionState)
    }

    pc.onicegatheringstatechange = () => {
      console.log("🔄 ICE gathering state:", pc.iceGatheringState)
    }
    return pc
  }

  const ensureLocalStreamReady = async () => {
    let stream = localStreamRef.current;

    if (!stream) {
      console.warn("❌ No local stream available. Getting new media...")
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        localStreamRef.current = stream

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error("Failed to get user media:", err)
      }
    }
    return stream
  }
  
  const endCallHandler = () => {
    adapter.emit('release_users', { to: targetId, type: 'endCall' })
    // Ensure any previous peer is completely reset
    
    if (peerRef.current) {
      peerRef.current.close()
      peerRef.current = null
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null
    }

    setEndCall(true)
    setIsCalling(false)
    setStartCall(false)
    setTargetId('')
    setStrangeId('')
    console.log("🛑 Call ended and cleaned up")
  }

  const startCallWithStrange = async (strangeId: string) => {
    const pc = await createPeer(strangeId)
    peerRef.current = pc
    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    adapter.emit("requestToTargetUser", { to: strangeId, offer })
    console.log("📤 Sent offer to", strangeId)
    console.log("Target ID set to:", strangeId)
    setStartCall(true)
    setIsCalling(false)
    console.log("Starting call with strange ID:", strangeId)
  }

  useEffect(() => {
    if (!isCalling) return
    const getRandomStrangId = connectToStrange()
    if ( idleUsers.length && getRandomStrangId && !targetId ) {
      setStrangeId(getRandomStrangId)
      setTargetId(getRandomStrangId)
      console.log("Set StrangeId ID:", getRandomStrangId)
    }

    if( targetId && !endCall ) {
      setTimeout(() => {
        console.log("start_conversation----", targetId)
        // adapter.emit('start_conversation', { to: targetId })
        startCallWithStrange(targetId)
      }, 1000)
    }

  }, [idleUsers, targetId])

  useEffect(() => {
    if (!adapter?.id) return
    setSocketId(adapter?.id)
    // adapter.emit('allDisconnect') // to start conversation
    ensureLocalStreamReady()
    // Listen for offer
    adapter.on("offer", async ({ from, offer }) => {
      console.log("📥 Received offer from", from)
      if (!targetId) setTargetId(from)
      const pc = await createPeer(from)
      peerRef.current = pc

      await pc.setRemoteDescription(new RTCSessionDescription(offer))
      const answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)

      adapter.emit("answerToTargetUser", { to: from, answer })
    })

    // Listen for answer
    adapter.on("answer", async ({ answer }) => {
      if (peerRef.current) {
        console.log("📥 Received answer", targetId)
        await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer))
        // 🔄 Manually assign stream if available
        const remoteStream = new MediaStream()
        peerRef.current.getReceivers().forEach(receiver => {
          if (receiver.track) {
            console.log("📥 Received answer track")
            remoteStream.addTrack(receiver.track)
          }
        })
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream
        }
      }
    })

    // ICE candidates
    adapter.on("ice-candidate", async ({ candidate }) => {
      if (!peerRef.current || !candidate) return

      if (peerRef.current.remoteDescription && peerRef.current.remoteDescription.type) {
        console.log("📥 Received ICE candidate")
        await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate))
      }
    })

    return () => {
      adapter.off("offer")
      adapter.off("answer")
      adapter.off("ice-candidate")
    }
  }, [adapter?.connected])

  const startCallHandler = async () => {
    if (!adapter || !localStreamRef.current) {
      await ensureLocalStreamReady()
    }
    setTimeout( () => {
      adapter.emit('get_idle_users') // to start conversation
    }, 500)

    // Intimate to peer that call is starting
    setIsCalling(true)
    setEndCall(false)
  }

  if (!socketId) {
    return (
      <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-lg">
        <p className="text-sm text-gray-500 ">
          <span className="">
            Kindly reload the page, something went wrong!
          </span>
          <span className="cursor-pointer hover:underline" onClick={() => window.location.reload()}> Click here to reload.</span>
        </p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
    <div className="w-full max-w-5xl bg-white shadow-xl rounded-lg overflow-hidden p-6">
    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🎥Talk Freely. See Clearly. — Free Video Chat for Everyone.</h2>

    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 space-y-4 md:space-y-0" title={socketId}>
      <div className="flex-1 hidden">
        <label className="block mb-1 text-sm font-medium text-gray-700">🎯 Target Socket ID:</label>
        <input
          type="text"
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
          placeholder="Enter socket ID to call"
          className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="md:ml-4">
        {startCall ? (
          <button
            onClick={endCallHandler}
            className="px-6 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition"
          >
            ❌ End Call
          </button>
        ) : (
          <button
            onClick={startCallHandler}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
          >
            📞 Start Call
          </button>
        )}
      </div>
    </div>

    { isCalling && !startCall && !targetId && (
      <div className="text-green-600 text-center mb-4 font-medium">
        <span> ✅ Call is connecting... </span>
      </div>
    )}
    {targetId && !startCall && (
      <div className="text-blue-700 text-center mb-4 font-medium">
        🔗 Found a person. Calling: <span className="font-mono">{targetId}</span>
      </div>
    )}

    {startCall && (
      <div className="text-green-600 text-center mb-4 font-medium">
        ✅ Call in progress with <span className="font-mono">{targetId}</span>
      </div>
    )}

    {/* Video Section */}
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
      {/* Remote video */}
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover rounded-lg"
      />

      {/* Local video (resizable via corner) */}
      <div className="absolute top-4 right-4 resize overflow-hidden border-2 border-white rounded shadow-lg bg-black w-40 h-28 min-w-[120px] min-h-[90px]">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Socket Info */}
    <div className="mt-4 text-sm text-gray-500 text-center">
      Your socket ID: <span className="font-mono">{socketId}</span>
    </div>
  </div>
  </div>

  )
}
