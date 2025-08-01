
import React, { useEffect } from "react"
import { useCreateSocketForVideo } from "./socketHandler"

interface ActionButtonProps {
  setTargetId: (targetId: string) => void,
  targetId: string,
  socketId: string
  setStartCall: (startCall: boolean) => void
  setIsCalling: (isCalling: boolean) => void
  setSubmitTarget: (startCall: boolean) => void
  isCalling: boolean
  startCall: boolean
}

export default function ActionButton({
  setTargetId,
  setSubmitTarget,
  targetId,
  socketId,
  setStartCall,
  setIsCalling,
  isCalling,
  startCall
}: ActionButtonProps) {
  
  const {
    getAllIdleUsers,
    adapter
  } = useCreateSocketForVideo()


  const handleStartCall = () => {
    setIsCalling(true)
    // getAllIdleUsers()
    setSubmitTarget(true)
  }

  const handleEndCall = () => {
    adapter.emit('release_users', { to: targetId, type: 'endCall' })
    setIsCalling(false)
    setStartCall(false)
    setTargetId('')
    // adapter.emit('handle_end_call_users', { to: targetId })
    // Add your end call logic here
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 min-w-6 items-center gap-2">
      { !isCalling ? (
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold shadow transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={ handleStartCall }
        >
          Start Video
        </button>
      ) : (
        <div className="flex gap-4 justify-center">
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold shadow transition"
            onClick={ handleEndCall }
          >
            End Call
          </button>
        </div>
      ) }
      <div className="flex mt-6 justify-between items-center">
        <div className="mx-2 text-gray-500 text-sm">
          <span> { isCalling && "Call in progress..." } </span>
        </div>
        <div className="mx-2 text-xs text-gray-400">
          <span> Your Socket ID: { socketId } </span>
        </div>
        <input type="text"
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter target user ID"
          value={ targetId }
          onChange={ (e) => setTargetId(e.target.value.trim()) }
          />
        <div className="mx-2 text-xs text-gray-400">
          <span> Target Id: { targetId } </span>
        </div>
      </div>
    </div>
  )
}

