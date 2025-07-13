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
  } = useCreateSocketForVideo()

  const [targetId, setTargetId] = useState("")
  const [socketId, setSocketId] = useState("")

  useEffect(() => {
    if (!adapter) return
    setSocketId(adapter.id)

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      localStreamRef.current = stream
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }
    }).catch(console.error)

    // Listen for offer
    adapter.on("offer", async ({ from, offer }) => {
      console.log("📥 Received offer from", from)
      const pc = createPeer(from)
      peerRef.current = pc

      await pc.setRemoteDescription(new RTCSessionDescription(offer))
      const answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)

      adapter.emit("answer", { to: from, answer })
    })

    // Listen for answer
    adapter.on("answer", async ({ answer }) => {
      console.log("📥 Received answer")
      if (peerRef.current) {
        await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer))
      }
    })

    // ICE candidates
    adapter.on("ice-candidate", async ({ candidate }) => {
      console.log("📥 Received ICE candidate")
      if (peerRef.current && candidate) {
        await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate))
      }
    })

    return () => {
      adapter.off("offer")
      adapter.off("answer")
      adapter.off("ice-candidate")
    }
  }, [adapter])

  const createPeer = (remoteId: string) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    })

    const stream = localStreamRef.current
    if (!stream) {
      console.error("❌ No local stream available")
      return pc
    }

    stream.getTracks().forEach(track => {
      pc.addTrack(track, stream)
    })

    pc.ontrack = (event) => {
      console.log("✅ ontrack fired", event.streams)
      if (remoteVideoRef.current && !remoteVideoRef.current.srcObject) {
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
    }

    return pc
  }

  const startCall = async () => {
    if (!adapter || !targetId || !localStreamRef.current) {
      alert("Missing target ID or local stream not ready")
      return
    }

    const pc = createPeer(targetId)
    peerRef.current = pc

    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    adapter.emit("offer", { to: targetId, offer })
    console.log("📤 Sent offer to", targetId)
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
        <button
          onClick={startCall}
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Start Call
        </button>
      </div>

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
