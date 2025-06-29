
import { useEffect, useMemo, useState } from "react"
import { io, Socket } from "socket.io-client"

let socket: Socket | null = null
type MessageResponse = {
  text: string
  user: string
  roomId: string
  sender: string
  type: string
}
export default function useCreateSocketConnection() {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const [getResponseMessage, setGetResponseMessage] = useState<Partial<MessageResponse>>({})
  const [idleUsers, setIdleUsers] = useState<string[]>([])
  const [chatStarted, setChatStarted] = useState<any>()
  const adapter = useMemo(() => {
    if (!socket) {
      socket = io("http://localhost:3080/chat", {
        // autoConnect: true,
      })
      console.log("Socket connection created")
    }
    return socket
  }, [])

  const handleOnlineUsers = (data: any) => {
    console.log("Requesting peers from server", data)
    setOnlineUsers(data || [])
  }

  const handleMsgResponse = (responseData: any) => {
    const response = { ...responseData.data, roomId: responseData.roomId }
    setGetResponseMessage( response || {})
  }

  const handleIdleUsers = (data: any) => {
    setIdleUsers(data || [])
  }

  const handleChatStarted = (chatDetails: any) => {
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
  
  // setInterval(() => {
  // // Emit a heartbeat signal to keep the connection alive 
  // // request to get all online users
  // adapter.emit("get_all_online_users")
  // }
  // , 100000) 

  return { chatStarted, setChatStarted, idleUsers, getAllIdleUsers, adapter, onlineUsers, getResponseMessage  }
}
