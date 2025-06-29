interface Message {
  user: string;
  text: string;
  sender: string;
}

interface ChatMessage {
  roomId: string;
  messages: Message[];
}

export const setRoomId = (roomId: string) => {
  localStorage.setItem("roomId", roomId)
}

export const getRoomId = (roomId: string) => {
  return localStorage.getItem("roomId") || ""
}

export const saveChatHistory = (roomId: string, conversation: Message[]) => {
  localStorage.setItem("chatHistory", JSON.stringify([
    {
      roomId,
      messages:[ ...conversation ]
    }
  ]))
}

export const saveUserDetails = (data: any, keyName: string) => {
  if(!keyName) return 'enter key name'
  localStorage.setItem(keyName, JSON.stringify({ ...data }))
}

export const getUserDetails = (keyName: string) => {
  if(!keyName) return 'enter key name'
  const details = localStorage.getItem(keyName)
  return details && JSON.parse(details)
}

export const getChatHistory = (roomId: string) => {
  const chatHistory = localStorage.getItem("chatHistory")
  if (!chatHistory) {
    return []
  }
  const parsedHistory: ChatMessage[] = JSON.parse(chatHistory)
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

