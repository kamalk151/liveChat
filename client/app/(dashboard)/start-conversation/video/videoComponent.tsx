"use client"
import React, { useRef, useEffect, useState } from "react"
import { useCreateSocketForVideo } from "./socketHandler"
import ActionButton from "./ActionButton"

export default function VideoComponent() {
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const localStreamRef = useRef<MediaStream>(null)
  // State to manage socket ID and peer connection
  const [socketId, setSocketId] = useState<string>("")
  const [peer, setPeer] = useState<RTCPeerConnection | null>(null)
  
  const {
    strangeId,
    setStrangeId,
    adapter,
    setIsCalling,
    setStartCall,
    onlineUsers,
    idleUsers,
    isCalling,
    startCall
  } = useCreateSocketForVideo()

  // connect to a random stranger
  const connectToStrange = () => {
    if (!idleUsers.length) return ''
    const randomIndex = Math.floor(Math.random() * idleUsers.length)
    return idleUsers[randomIndex]
  }

  // Setup local media
  useEffect(() => {
    if (!adapter?.id) return

    setSocketId(adapter.id)

    if( adapter.id ) {
      setSocketId(adapter.id)
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        localStreamRef.current = stream
        console.log("Local stream set", stream)
        if (localVideoRef.current) localVideoRef.current.srcObject = stream
      }).catch((err) => {
        console.error("Failed to get local media stream:", err)
      })
    }
  }, [adapter?.id])

  useEffect(() => {
    // adapter.emit('allDisconnect') // to start conversation
    const strangeUserId = connectToStrange()
    if (!strangeUserId) return
    console.log('updated idleUsers', strangeUserId)
    setStrangeId(strangeUserId)

    const startConversation = async () => {
      console.log("Starting call with user:", strangeUserId)
      adapter.emit("start_conversation", { to: strangeUserId })
      const pc = createPeerConnection(strangeUserId)
      if (!pc) {
        console.error("Failed to create peer connection")
        return
      }
      setPeer(pc)
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)
      adapter.emit("offer", { to: strangeUserId, offer })
    }

    startConversation()
  }, [idleUsers])

  // Handle signaling
  useEffect(() => {
    if (!adapter) return
    // This will create a new peer connection and set the remote description
    // Offer - The person starting the call
    adapter.on("offer", async ({ from, offer }: { from: string, offer: any }) => {
      
      // Get stream if we don’t already have it
      if (!localStreamRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        localStreamRef.current = stream
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        } else {
          console.error("Local stream is not available")
        }
      }

      const pc = createPeerConnection(from)
      if (!pc) {
        console.error("Failed to create peer connection")
        return
      }

      setPeer(pc)
      await pc.setRemoteDescription(new RTCSessionDescription(offer))
      const answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)
      // Answer - The person receiving the call
      if(strangeId !== from) {
        console.log("Setting strangeId to:", from)
        setStrangeId(from)
        setIsCalling(true)
        setStartCall(true)
      }
      console.log("Sending answer to:", from)
      adapter.emit("answer", { to: from, answer })
    })

    // This acknowledges the offer and responds with an answer 
    // This will set the remote description on the existing peer connection
    adapter.on("answer", async ({ answer }: { answer: any}) => {      
      if (peer) {
        console.log(peer, "Received answer:", answer)
        await peer.setRemoteDescription(new RTCSessionDescription(answer))
      } 
    })

    // ICE candidate from remote
    adapter.on("ice-candidate", async ({ candidate }: { candidate: any}) => {
      // it's like an IP address and port) that helps two peers find
      // the best way to connect directly to each other
      console.log(peer, "Received ICE candidate:", candidate)
      if (peer && candidate) await peer.addIceCandidate(new RTCIceCandidate(candidate))
    })

    return () => {
      adapter.off("offer")
      adapter.off("answer")
      adapter.off("ice-candidate")
    }
    // eslint-disable-next-line
  }, [adapter, peer, localStreamRef])
  console.log(localStreamRef, "Creating peer connection for:", localStreamRef.current)

  // Create peer connection
  const createPeerConnection = (remoteId: string) => {
    const stream = localStreamRef.current
    if (!stream) {
      console.error("Local stream is not available")
      return null
    }

    const pc = new RTCPeerConnection({
      // Use a public STUN server for NAT traversal
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    })

    console.log(remoteId, "Creating peer connection for:", localStreamRef)
    stream.getTracks().forEach(track =>{
      console.log("Adding track to peer connection:", track)
      return pc.addTrack(track, stream)
    })
    // Remote stream
    pc.ontrack = e => {
      if (remoteVideoRef.current) {
        console.warn("Remote video stream", e.streams[0])
        remoteVideoRef.current.srcObject = e.streams[0]
      } else {
        console.warn("Remote video ref or stream is missing")
      }
    }
    // ICE candidates
    pc.onicecandidate = e => {
      if (e.candidate) {
        adapter.emit("ice-candidate", { to: remoteId, candidate: e.candidate })
      }
    }
    return pc
  }

  console.log('===remoteVideoRef', remoteVideoRef.current)

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-blue-100 to-indigo-200">
      <h1 className="text-3xl font-bold mb-6 text-indigo-800">Live Video Conversation</h1>
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        {/* Remote (other user) video - big */}
        <div className="w-full aspect-video bg-gray-200 rounded-lg border-2 border-green-400 flex items-center justify-center overflow-hidden">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
            style={{ background: "#e5e7eb" }}
          />
          {/* My (local) video - small, draggable */}
          <div
            className="absolute top-4 right-4 cursor-move shadow-lg rounded-lg border-2 border-indigo-400 bg-gray-300"
            style={{
              width: "120px",
              height: "90px",
              zIndex: 10,
              overflow: "hidden",
              resize: "both"
            }}
            id="local-video-draggable"
          >
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted={true}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
        {/* User stats and controls */}
        { onlineUsers.length > 0 && (
          <div className="text-sm text-gray-600 mt-4">
            <span> Online Users: </span>
            <span className="font-semibold"> {onlineUsers.length} </span>
          </div>
        ) }
        <div className="text-sm text-gray-600">
          <span>Idle Users: </span>
          <span className="font-semibold">{idleUsers.length}</span>
        </div>
        <div className="flex gap-4 mt-4">
          <ActionButton
            setTargetId={setStrangeId}
            targetId={strangeId}
            socketId={socketId}
            isCalling={isCalling}
            setIsCalling={setIsCalling}
            startCall={startCall}
            setStartCall={setStartCall}
          />
        </div>
      </div>
    </div>
  )
}
