import { Message, SavedMessageFormat, SavedUserFormat } from "./interface"

export const setRoomId = (roomId: string) => {
  localStorage.setItem("roomId", roomId)
}

export const getRoomId = () => {
  return localStorage.getItem("roomId") || ""
}

export const saveChatHistory = (roomId: string, conversation: Message[]) => {
  localStorage.setItem("chatHistory", JSON.stringify([
    {
      roomId,
      messages: [ ...conversation ]
    }
  ]))
}

export const saveUserDetails = (data: SavedUserFormat, keyName: string) => {
  if(!keyName) return 'enter key name'
  const date = new Date()
  localStorage.setItem(keyName, JSON.stringify({
    ...data,
    exp: date.getTime() + 1000 * 60 * 60 * 2 // 2 hours
  }))
}

export const getUserDetails = (keyName: string) => {
  if(!keyName) return 'enter key name'
  const info = localStorage.getItem(keyName)
  const itemInfo = info ? JSON.parse(info) : { name: '' }
  const now = new Date()

  if (now.getTime() > itemInfo.exp) {
    // If expired, remove item and return null
    localStorage.removeItem(keyName)
    return { name: '' }
  }
  
  return itemInfo
}

export const getChatHistory = (roomId: string): Message[] => {
  const chatHistory = localStorage.getItem("chatHistory")
  if (!chatHistory) {
    return []
  }

  const parsedHistory: SavedMessageFormat[] = JSON.parse(chatHistory)
  try {
    const roomChatHistory = parsedHistory.find(chat => chat.roomId === roomId)
    if (roomChatHistory) {
      return roomChatHistory.messages
    }
    console.log('history', roomChatHistory)
  } catch (error) {
    console.error("Error parsing chat history:", error)
  }
  // If no history found for the room, return an empty array
  return []
}

