
import { useEffect, useMemo, useState } from "react"
import { io, Socket } from "socket.io-client"

let socket: Socket | null = null
// new socket creation logic for text chat
export const useCreateSocketForVideo = () => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const [idleUsers, setIdleUsers] = useState<string[]>([])
  const [isCalling, setIsCalling] = useState(false)
  const [startCall, setStartCall] = useState<boolean>(false)
  const [strangeId, setStrangeId] = useState<string>('')

  const adapter = useMemo(() => {
    if (!socket) {
      socket = io("http://192.168.29.171:3080/video", {
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

  const handleStartCall = () => {
    setStartCall(true)
  }

  const handleIdleUsers = (data: any) => {
    setIdleUsers(data || [])
  }

  const handleEndCall = () => {
    setIsCalling(false) // Reset the call state
    setStartCall(false) // Reset the start call state
    setStrangeId("") // Reset the strange user ID
    console.log("Call ended, states reset")
  }

  useEffect(() => {
    // Connect to the socket server
    adapter.connect()

    adapter.on("conversation_started", handleStartCall)
    // Request to get online users
    adapter.emit("get_all_online_users")
    console.log('test')
    adapter.on('idleUserList', handleIdleUsers)
    adapter.on("userList", handleOnlineUsers)
    adapter.on("handle_end_call", handleEndCall)
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

  return {
    strangeId,
    setStrangeId,
    adapter,
    isCalling,
    setIsCalling,
    startCall,
    setStartCall,
    idleUsers,
    getAllIdleUsers,
    onlineUsers
  }
}
