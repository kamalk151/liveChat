"use client"
import { useCreateSocketConnection } from "./socketHandler"

interface RenderMessageProps {
  bottomRef: any
  conversation: any
  setConversation: (messages: any[]) => void
  socketId: string
}

export default function RenderMessages({
  conversation,
  socketId,
  bottomRef
}: RenderMessageProps) {

  const { onlineUsers } = useCreateSocketConnection()

  const getConversation = () => {

    if (!conversation || conversation.length === 0) {
      return <div className="text-gray-500 text-sm"> No messages yet. Start chatting! </div>
    }

    return conversation && conversation.map((msg:any, index: string) => {
      const isYou = msg.sender === socketId
      const containerClass = isYou
        ? "w-full flex justify-end"
        : "w-full flex justify-start"
      const messageClass = isYou
        ? "bg-purple-600 text-white rounded-l-2xl rounded-br-2xl px-4 py-2 mb-2 max-w-[70%]"
        : "bg-cyan-500 text-white rounded-r-2xl rounded-bl-2xl px-4 py-2 mb-2 max-w-[70%]"
      return (
        <div key={index} className={containerClass}>
          <div className={messageClass}>
            <span className="font-bold">
              { isYou ? `You` : msg.user }:</span>
              
              { msg.type === "emoji" ? (
                  <img
                    key={ index }
                    src={ msg.text }
                    alt="emoji"
                    className="inline-block w-8 h-8 align-middle"
                  />
                ) : (
                  <span key={ index } className="inline-block mr-2">
                    { msg.text }
                  </span>
                )
              }
          </div>
        </div>
      )
    })
  }

  return (
    <div className="">
      { onlineUsers.length === 0 ? (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded mb-3 text-sm">
          No other users online. Please open another tab or wait for someone to join.
        </div>
      ) : (
        <p className="text-gray-500 mb-3 text-sm">Online users: { onlineUsers.length }</p>
      ) }
      {/* render message history */}
      <div className="border rounded bg-gray-50 p-3 mb-4 min-h-[120px] max-h-[300px] overflow-y-auto">
        { getConversation() }
        <div ref={bottomRef} />
      </div>
    </div>
  )
}