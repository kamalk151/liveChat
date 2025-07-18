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
    startCall
  } = useCreateSocketForVideo()

  const [targetId, setTargetId] = useState("")
  const [socketId, setSocketId] = useState<any>("")
  const [endCall, setEndCall] = useState<any>(false)
  // connect to a random stranger
  const connectToStrange = () => {
    if (!idleUsers.length) return ''
    const randomIndex = Math.floor(Math.random() * idleUsers.length)
    return idleUsers[randomIndex]
  }

  const ensureLocalStream = async () => {
    let stream = localStreamRef.current;

    if (!stream) {
      console.warn("❌ No local stream available. Getting new media...");
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Failed to get user media:", err);
        // return null;
      }
    }

    return stream;
  }
  
  const endCallHandler = () => {
    adapter.emit('release_users', { to: targetId, type: 'endCall' })
    // Ensure any previous peer is completely reset
    setEndCall(true)
    if (peerRef.current) {
      peerRef.current.close()
      peerRef.current = null
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        track.stop()
      })
      localStreamRef.current = null
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null
    }

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
    adapter.emit("offer", { to: strangeId, offer })
    console.log("📤 Sent offer to", strangeId)
    console.log("Target ID set to:", strangeId)
    setStartCall(true)
    setIsCalling(false)
    console.log("Starting call with strange ID:", strangeId)
  }

  useEffect(() => {
    const getRandomStrangId = connectToStrange()
    if (idleUsers.length && getRandomStrangId && !targetId) {  
      setStrangeId(getRandomStrangId)
      setTargetId(getRandomStrangId)
      console.log("Set StrangeId ID:", getRandomStrangId)
    }
    console.log(targetId, "set targetId====", endCall)

    if(targetId && !endCall) {
      startCallWithStrange(targetId)
    }

  }, [idleUsers, targetId])

  useEffect(() => {
    if (!adapter) return
    setSocketId(adapter?.id)
    // adapter.emit('allDisconnect') // to start conversation
    ensureLocalStream()
    // navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
    //   localStreamRef.current = stream
    //   if (localVideoRef.current) {
    //     localVideoRef.current.srcObject = stream
    //   }
    // }).catch(console.error)

    // Listen for offer
    adapter.on("offer", async ({ from, offer }) => {
      console.log("📥 Received offer from", from)
      if(!targetId) setTargetId(from)
      const pc = await createPeer(from)
      peerRef.current = pc

      await pc.setRemoteDescription(new RTCSessionDescription(offer))
      const answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)

      adapter.emit("answer", { to: from, answer })
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
      if (peerRef.current && candidate) {
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

  const createPeer = async (remoteId: string) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    })

    const stream = await ensureLocalStream()
    if (!stream) {
      return pc
    }

    stream.getTracks().forEach(track => {
      pc.addTrack(track, stream)
    })

    pc.ontrack = (event) => {
      if (remoteVideoRef.current && !remoteVideoRef.current.srcObject) {
        console.log("✅ ontrack fired", event.streams)
        remoteVideoRef.current.srcObject = event.streams[0]
      }
    }

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("📤 Sending ICE candidate")
        adapter.emit("ice-candidate", { to: remoteId, candidate: event.candidate })
      }
    }

    pc.onconnectionstatechange = () => {
      console.log("🔗 Connection state:", pc.connectionState)
      if (pc.connectionState === 'connected') {
        setStartCall(true) 
        console.log("Connected to peer:", remoteId)
      }

      if (pc.connectionState === 'disconnected') {
        endCallHandler()
        console.log("close connection to peer:", remoteId)
      }
    }

    return pc
  }

  const startCallHandler = async () => {
    // !targetId ||
    if (!adapter || !localStreamRef.current) {
      console.log(`Missing target ID or local stream not ready ${adapter.id} ${localStreamRef.current}`)
      await ensureLocalStream()
    }
    //Intimate to peer that call is starting
    adapter.emit('start_conversation', { to: targetId })
    setIsCalling(true)
    setEndCall(false)
     setTimeout( () => {
      adapter.emit('get_idle_users') // to start conversation
      console.log("Requesting idle users")
    }, 1000)
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">🎥 WebRTC Video Chat</h2>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Target Socket ID:</label>
        <input
          type="text"
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
          placeholder="Enter socket ID to call"
          className="w-full border px-3 py-2 rounded-md"
        />
        { startCall } s
        { startCall && (
          <button
            onClick={() => {
              endCallHandler()
            }}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            End Call
          </button>
        )}

        {!startCall && (
          <button
          onClick={startCallHandler}
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Start Call
        </button>
        )}

        
      </div>
      {
        isCalling && !targetId && (
          <div className="text-green-600 mb-4">
            <p>📞 finding a person for you </p>
          </div>
        )
      }
      
      {
        targetId && !startCall && (
          <div className="text-blue-600 mb-4">
            <p>🔗 Found a person & Calling: {targetId}</p>
          </div>
        )
      }

      {
        startCall && (
          <div className="text-green-600 mb-4">
            <p>📞 Call in progress with {targetId}</p>
          </div>
        )
      }

      {
        !startCall && isCalling && (
          <div className="text-red-600 mb-4">
            <p>❌ Call ended</p>
          </div>
        )
      }
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium mb-1">📍 Local Video</p>
          <video ref={localVideoRef} autoPlay muted playsInline className="w-full bg-black rounded" />
        </div>
        <div>
          <p className="text-sm font-medium mb-1">📡 Remote Video</p>
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full bg-black rounded" />
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">Your socket ID: <span className="font-mono">{socketId}</span></div>
    </div>
  )
}
