import { useEffect } from "react";

interface HandleTypingProps {
  setText: (value: string) => void
  setIsStrangerTyping: (isTyping: boolean) => void
  adapter: any // Replace 'any' with the actual type of your adapter
  roomId: string
  strangeId: string
}

export const useHandleTypeing = ({ setText, setIsStrangerTyping, adapter, roomId, strangeId } : HandleTypingProps ) => {
  useEffect(() => {
    // handling typeing events indicator
    adapter.on("typing", () => {
      setIsStrangerTyping(true)
    })
    adapter.on("stop_typing", () => {
      setIsStrangerTyping(false)
    })
    // Listen for typing events
    return () => {
      adapter.off("typing")
      adapter.off("stop_typing")
    }
  }, [adapter])

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value?.trim())
    adapter.emit('typing', { to: strangeId, roomId: roomId })
  }

  const handleInputBlur = () => {
    adapter.emit('stop_typing', { to: strangeId, roomId: roomId })
  }

  return { handleTyping, handleInputBlur }
}

export const useHandleOnlineUsers = (setOnlineUsers: (users: string[]) => void) => {
  const handleOnlineUsers = (data: any) => {
    console.log("Requesting peers from server", data)
    setOnlineUsers(data || [])
  }

  return { handleOnlineUsers }
}

export const useHandleMsgResponse = (setGetResponseMessage: (message: string) => void) => {
  const handleMsgResponse = (responseData: any) => {
    console.log(responseData.from, "from = message response from server", responseData.data)
    setGetResponseMessage(responseData.data || "")
  }

  return { handleMsgResponse };
}