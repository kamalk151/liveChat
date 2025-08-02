"use client"
import React, { useRef, useEffect, useState } from "react"
import { useCreateSocketConnection } from "./socketHandler"
import { saveChatHistory, getChatHistory, getUserDetails } from "./storageHandler"
import { EmojiContainer } from './emoji'
import ActionButton from './actionButton'
import { RenderMessages } from './renderMessages'
import { ChatStartedWith, MsgParam } from "./interface"

export default function TextComponent() {
  const bottomRef = useRef<HTMLDivElement>(null)
  const emojiRef = useRef<HTMLDivElement>(null)
  const [showPicker, setShowPicker] = useState<boolean>(false)
  const [text, setText] = useState("")
  const [isStrangerTyping, setIsStrangerTyping] = useState(false)
  const [roomId, setRoomId] = useState('')
  const [conversation, setConversation] = useState<MsgParam[]>([])
  const [name, setName] = useState('')
  const [strangeId, setStrangeId] = useState('')
  const [socketId, setSocketId] = useState<string>("")
  
  const { getResponseMessage, setChatStarted, chatStarted, adapter, idleUsers } = useCreateSocketConnection()

  // connect to a random stranger
  const connectToStrange = () => {
    if (!idleUsers.length) return ''
    const randomIndex = Math.floor(Math.random() * idleUsers.length)
    return idleUsers[randomIndex]
  }

  useEffect(() => {
    // get socket connection ID - // 8262873164-Hi - geetika
    if (adapter.id) setSocketId(adapter.id)
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    setName(getUserDetails('userDetails')?.name)
    // adapter.emit('allDisconnect')
    if(!showPicker) return
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
        setShowPicker(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [adapter.connected, conversation, showPicker])

  useEffect(() => {
    // to listen the response and update history
    const conversationRoomId = getResponseMessage.roomId || roomId || ''
    if (!roomId.includes(conversationRoomId)
      || Object.keys(getResponseMessage).length === 0
      || !getResponseMessage?.text ) return
    
    const newMessageResponse = { 
      sender: getResponseMessage.sender || '',
      user: getResponseMessage?.user || '',
      type: getResponseMessage?.type || '',
      text: getResponseMessage.text || ''
    }

    const latestChatHistory = getChatHistory(conversationRoomId) || []
    latestChatHistory.push(newMessageResponse)

    setRoomId(conversationRoomId)
    setConversation(latestChatHistory)
    saveChatHistory(conversationRoomId, latestChatHistory)
  }, [getResponseMessage])
  
  useEffect(() => {
    // connect with stranger and update the room id before start conversation
    if(chatStarted?.roomId && chatStarted.to === socketId) {
      const newChat = { ...chatStarted }
      setRoomId(chatStarted.roomId)
      setStrangeId(newChat.from)
      setChatStarted({} as ChatStartedWith)
    }
  }, [chatStarted])
  
  useEffect(() => {
    // to start conversation
    const strangeUserId = connectToStrange()
    if (!strangeUserId) return

    const newRoomId = `${strangeUserId}-R@R-${socketId}`
    if (strangeId !== strangeUserId) {
      // If there was a previous stranger, release both users
      if (strangeId) adapter.emit('release_users', { to: strangeId })
      setStrangeId(strangeUserId)
    }
    // If the roomId is different, update it
    if (roomId !== newRoomId) setRoomId(newRoomId)
    
    adapter.emit("start_conversation", { to: strangeUserId, roomId: newRoomId })
    messageHandler({ user: name, text: 'Hello!', roomId: newRoomId, to: strangeUserId })
  }, [socketId, idleUsers])

  const messageHandler = (msgParam?: MsgParam) => {
    const newRoomId = msgParam?.roomId || roomId
    const newMsg = {
      type: msgParam?.type || 'text',
      user: msgParam?.user || name,
      text: msgParam?.text || text,
      sender: socketId
    }
    adapter.emit("message", { to: msgParam?.to || strangeId, roomId: newRoomId, data: newMsg })
    const updatedConversation = [...conversation, newMsg]
    setConversation(updatedConversation)
    saveChatHistory(newRoomId, updatedConversation)
    setText("")
  }

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!text) return
    messageHandler()
  }

  return (
    <div className="max-w-2xl mx-auto m-8 min-w-6">
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <h1 className="text-xl font-semibold mb-2">Chat Conversation</h1>
          <p className="text-gray-500 mb-1 text-sm">Room ID: <span className="font-bold">{roomId}</span></p>
          <p className="text-gray-500 mb-3 text-sm">Socket ID: <span className="font-bold">{socketId}</span></p>
          
          {/* { render message history } */}
          <RenderMessages
            bottomRef={bottomRef}
            conversation={conversation}
            socketId={socketId}
          />
          <form className="flex flex-wrap gap-2 items-end" onSubmit={sendMessage}>
            <div >
              <ActionButton 
                setShowPicker={setShowPicker}
                roomId={roomId}
                strangeId={strangeId}
                setIsStrangerTyping={setIsStrangerTyping}
                isStrangerTyping={isStrangerTyping}
                setText={setText}
                text={text}
                setConversation={setConversation}
              />
              <EmojiContainer
                showPicker={showPicker}
                setText={messageHandler}
                ref={emojiRef}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
