"use client"
import React, { useRef, useEffect, useState } from "react"
import useCreateSocketConnection from "../socketHandler"

export default function VideoComponent() {
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const [isCalling, setIsCalling] = useState(false)
  const [targetId, setTargetId] = useState("")
  const [socketId, setSocketId] = useState("")
  const [peer, setPeer] = useState<RTCPeerConnection | null>(null)
  const { adapter, onlineUsers } = useCreateSocketConnection()

  // Setup local media
  useEffect(() => {
    adapter.id && setSocketId(adapter.id)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      if (localVideoRef.current) localVideoRef.current.srcObject = stream
    })
  }, [onlineUsers])

  // Handle signaling
  useEffect(() => {
    if (!adapter) return
    // This will create a new peer connection and set the remote description
    adapter.on("offer", async ({ from, offer }) => {
      const pc = createPeerConnection(from)
      setPeer(pc)
      await pc.setRemoteDescription(new RTCSessionDescription(offer))
      const answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)
      adapter.emit("answer", { to: from, answer })
    })

    // Answer from remote
    // This acknowledges the offer and responds with an answer 
    // This will set the remote description on the existing peer connection
    adapter.on("answer", async ({ answer }) => {
      if (peer) await peer.setRemoteDescription(new RTCSessionDescription(answer))
    })

    // ICE candidate from remote
    adapter.on("ice-candidate", async ({ candidate }) => {
      if (peer && candidate) await peer.addIceCandidate(new RTCIceCandidate(candidate))
    })

    return () => {
      adapter.off("offer")
      adapter.off("answer")
      adapter.off("ice-candidate")
    }
    // eslint-disable-next-line
  }, [adapter, peer])

  // Create peer connection
  function createPeerConnection(remoteId: string) {
    const pc = new RTCPeerConnection()
    // Add local stream
    const localStream = localVideoRef.current?.srcObject as MediaStream
    localStream?.getTracks().forEach(track => pc.addTrack(track, localStream))
    // Remote stream
    pc.ontrack = e => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = e.streams[0]
    }
    // ICE candidates
    pc.onicecandidate = e => {
      if (e.candidate) {
        adapter.emit("ice-candidate", { to: remoteId, candidate: e.candidate })
      }
    }
    return pc
  }

  // Start call
  const startCall = async () => {
    if (!targetId) return
    const pc = createPeerConnection(targetId)
    setPeer(pc)
    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    adapter.emit("offer", { to: targetId, offer })
    setIsCalling(true)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-blue-100 to-indigo-200">
      <h1 className="text-3xl font-bold mb-6 text-indigo-800">Live Video Conversation</h1>
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <div className="flex gap-6 mb-6 w-full justify-center">
          <video ref={localVideoRef} autoPlay playsInline muted className="w-48 h-32 bg-gray-300 rounded-lg border-2 border-indigo-400" />
          <video ref={remoteVideoRef} autoPlay playsInline className="w-48 h-32 bg-gray-200 rounded-lg border-2 border-green-400" />
        </div>
        <div className="flex gap-4 mt-4">
          <input
            type="text"
            placeholder="Target Socket ID"
            value={targetId}
            onChange={e => setTargetId(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold shadow transition"
            onClick={startCall}
            disabled={!targetId}
          >
            Start Video
          </button>
        </div>
        <div className="mt-6 text-gray-500 text-sm">
          <span>{isCalling ? "Call in progress..." : "Ready to call"}</span>
        </div>
        <div className="mt-2 text-xs text-gray-400">
          <span>Your Socket ID: {socketId}</span>
        </div>
      </div>
    </div>
  )
}
