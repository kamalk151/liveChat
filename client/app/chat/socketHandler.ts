
import { ChatStartedWith, Message } from "./interface"
import { useEffect, useMemo, useState } from "react"
import { io, Socket } from "socket.io-client"

let socket: Socket | null = null
// new socket creation logic for text chat
export const useCreateSocketConnection = () => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const [getResponseMessage, setGetResponseMessage] = useState<Partial<Message>>({})
  const [idleUsers, setIdleUsers] = useState<string[]>([])
  const [chatStarted, setChatStarted] = useState<ChatStartedWith>()
  
  const adapter = useMemo(() => {
    if (!socket) {
      socket = io("http://192.168.29.171:3080/chat", {
        // autoConnect: true,
      })
      console.log("Socket connection created")
    }
    return socket
  }, [])

  // [ 'z4IUb-k53E-hEPExAAAD', 'idle' ]
  const handleOnlineUsers = (data: string[]) => {
    console.log("Requesting peers from server", data)
    setOnlineUsers(data || [])
  }

  const handleMsgResponse = (message: Message) => {
    const response = { ...message, roomId: message.roomId }
    setGetResponseMessage( response || {})
  }

  // [ 'z4IUb-k53E-hEPExAAAD', 'idle' ]
  const handleIdleUsers = (data: string[]) => {
    setIdleUsers(data || [])
    console.log("Idle users received:", data)
  }

  const handleChatStarted = (chatDetails: ChatStartedWith) => {
    console.log("Conversation started with:", chatDetails)
    // You can handle the conversation start event here if needed
    setChatStarted({ ...chatDetails })
  }

  useEffect(() => {
    // Connect to the socket server
    adapter.connect()
    // Log connection status
    adapter.on("connect", () => {
      console.log("Socket connected:", adapter.id)
    })
    // Handle disconnection
    adapter.on("disconnect", () => {
      console.log("Socket disconnected", adapter.id)
    })

    adapter.on("conversation_started", handleChatStarted)
    adapter.on("get_message_response", handleMsgResponse)
    // Request to get online users
    adapter.emit("get_all_online_users")
    console.log('test')
    adapter.on('idleUserList', handleIdleUsers)
    adapter.on("userList", handleOnlineUsers)
    console.log("------------------------********-----------------")
    // Cleanup on unmount
    return () => {
      adapter.off("connect")
      adapter.off("userList")
      // adapter.off("message_response")
      console.log("Cleaning up socket connection")
      adapter.off("disconnect")
      adapter.off("get_message_response")
      adapter.disconnect()
    }
  }, [])

  const getAllIdleUsers = () => {
    adapter.emit("get_idle_users")
    console.log("Requesting all online users")
  }

  return { chatStarted, setChatStarted, idleUsers, getAllIdleUsers, adapter, onlineUsers, getResponseMessage  }
}
