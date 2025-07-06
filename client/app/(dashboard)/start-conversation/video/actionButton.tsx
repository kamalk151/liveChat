
import React from "react"
import { useCreateSocketForVideo } from "./socketHandler"

interface ActionButtonProps {
  setTargetId: (targetId: string) => void,
  targetId: string,
  socketId: string
}

export default function ActionButton({
  setTargetId,
  targetId,
  socketId
}: ActionButtonProps) {
  const [isCalling, setIsCalling] = React.useState(false)
  const { getAllIdleUsers, setStartCall, startCall, adapter } = useCreateSocketForVideo()
  console.log("ActionButton rendered----start", startCall)

  const handleStartCall = () => {
    setIsCalling(true)
    getAllIdleUsers()
  }

  const handleEndCall = () => {
    setIsCalling(false)
    setStartCall(false)
    setTargetId('')
    adapter.emit('release_users', { to: targetId })
    // Add your end call logic here
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 min-w-6 items-center gap-2">
      {!isCalling ? (
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold shadow transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleStartCall}
        >
          Start Video
        </button>
      ) : (
        <div className="flex gap-4 justify-center">
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold shadow transition"
            onClick={handleEndCall}
          >
            End Call
          </button>
        </div>
      )}
      <div className="flex mt-6 justify-between items-center">
        <div className="mx-2 text-gray-500 text-sm">
          <span>{ isCalling && "Call in progress..." }</span>
        </div>
        <div className="mx-2 text-xs text-gray-400">
          <span> Your Socket ID: { socketId } </span>
        </div>
        <div className="mx-2 text-xs text-gray-400">
          <span> Target Id: { targetId } </span>
        </div>
      </div>
    </div>
  )
}

