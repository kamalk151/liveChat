"use client"
import React, { useRef, useEffect, useState } from "react"
import { useCreateSocketConnection } from "./socketHandler"
import { saveChatHistory, getChatHistory } from "../storageHandler"
import { useHandleTypeing } from "../hooks"

export default function TextComponent() {
  const nameList = ["John", "Jane", "Alice", "Bob", "Charlie"]
  const bottomRef = useRef<HTMLDivElement>(null)
  
  const [input, setInput] = useState("")
  const [isStrangerTyping, setIsStrangerTyping] = useState(false)
  const [targetedUserId, setTargetedUserId] = useState("")
  const [roomId, setRoomId] = useState('')
  const [conversation, setConversation] = useState<any[]>([])
  const [name, setName] = useState(nameList[Math.floor(Math.random() * nameList.length)])
  const [strangeId, setStrangeId] = useState('')
  const [socketId, setSocketId] = useState<string>("")
 
  return (
    <div className="max-w-2xl mx-auto mt-8">
      
    </div>
  )
}