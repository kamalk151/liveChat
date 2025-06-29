"use client"
import React from "react"
import useCreateSocketConnection from "../socketHandler"
import { useHandleTypeing } from "../hooks"

interface ActionButtonProps {
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>> 
  roomId: string
  strangeId: string
  setIsStrangerTyping: (isTyping: boolean) => void
  setText: (text: string) => void
  text: string
  isStrangerTyping: boolean
  setConversation: (conversation: any) => void
}

export default function ActionButton({
  setShowPicker,
  roomId,
  strangeId,
  setIsStrangerTyping,
  setText,
  text,
  isStrangerTyping,
  setConversation
}: ActionButtonProps) {

  const { adapter, getAllIdleUsers } = useCreateSocketConnection()
  const { handleTyping, handleInputBlur } = useHandleTypeing({
    setText,
    setIsStrangerTyping,
    adapter,
    roomId,
    strangeId
  })

  const findRandomUser = () => {
    getAllIdleUsers()
    setConversation([])
  }

  return (
    <div className="flex max-w-2xl mx-auto mt-8 min-w-6  items-center gap-2">
      <button
        type="button"
        onClick={ findRandomUser }
        className="text-white px-4 py-2 rounded hover:bg-white-500 transition cursor-pointer"
      >
        <img src='/images/refresh-icon.png' width='35px' />
      </button>
      <div className="flex-1 min-w-[180px]">
        <input
          type="text"
          onChange={ handleTyping }
          onBlur={ handleInputBlur }
          value={text}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          placeholder="Type your message..."
        />
        { isStrangerTyping && <div className="text-green-600 text-xs mt-1">Stranger is typing...</div> }
      </div>
          
      <button type="submit" className="p-2 rounded text-white cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 28"
          fill="none"
          className="w-7 h-7"
          stroke="currentColor"
          strokeWidth={1.7}
        >
          {/* Paper plane body */}
          <polygon
            points="3,25 25,14 3,3 7,13 17,14 7,15"
            fill="currentColor"
            className="text-black"
          />
          {/* Accent lines under the plane */}
        </svg>
      </button>
      <button
        type="button"
        onClick={() => setShowPicker(v => !v)}
        className="text-xl"
      >
        😊
      </button>
    </div>
  )
}
