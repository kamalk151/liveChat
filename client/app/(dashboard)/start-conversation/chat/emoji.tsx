"use client"
import React from "react"
import EmojiPicker from 'emoji-picker-react'

interface EmojiProps {
  showPicker: boolean
  messageHandler: (message: any) => void
  ref: any
}

export default function EmojiContainer({ showPicker, messageHandler, ref }: EmojiProps) {

  const sendEmoji = (event: any, emojiObject:any) => {
    const chatMsg = { type: 'emoji', user: name, text: emojiObject.target.src}
    messageHandler(chatMsg)
  }

  return (
     showPicker && (
      <div ref={ref} className="absolute bottom-12 mt-12 right-0 z-50 bg-white rounded shadow-lg"
        style={{
          maxHeight: 365,
          position: 'relative',
          width: 320,
          overflowY: 'auto'
        }}>
        <EmojiPicker
          categoryConfig={[
            { category: 'smileys_people' },
            { category: 'food_drink' },
            { category: 'activities' }
          ]}
          suggestedEmojisMode="recent"
          onEmojiClick={sendEmoji}
        />
      </div>
    )
  )
}