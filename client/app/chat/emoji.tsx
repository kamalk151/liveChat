"use client"
import { forwardRef } from "react"
import EmojiPicker, { Categories, SuggestionMode } from 'emoji-picker-react'
import type { EmojiClickData } from 'emoji-picker-react'
import { Message, EmojiProps } from "./interface"

export const EmojiContainer = forwardRef<(HTMLDivElement | null), EmojiProps>(({ showPicker, setText }, emojiRef) => {

  const sendEmoji = (emojiObject: EmojiClickData) => {
    const chatMsg:Message = { type: 'emoji', text: emojiObject.imageUrl }
    setText(chatMsg)
  }

  return (
     showPicker && (
      <div ref={ emojiRef } className="absolute bottom-12 mt-12 right-0 z-50 bg-white rounded shadow-lg"
        style={{
          maxHeight: 365,
          position: 'relative',
          width: 320,
          overflowY: 'auto'
        }}>
        {/* Emoji Picker */}
        <EmojiPicker
          autoFocusSearch={false}
          categories={[
            { name: 'Smileys & Emotion', category: Categories.SMILEYS_PEOPLE },
            { name: 'Animals & Nature', category: Categories.ANIMALS_NATURE },
            { name: 'Food & Drink', category: Categories.FOOD_DRINK },
            { name: 'Activities', category: Categories.ACTIVITIES },
          ]}
          suggestedEmojisMode={ SuggestionMode.RECENT }
          skinTonesDisabled={true}
          onEmojiClick={sendEmoji}
          lazyLoadEmojis={true}
        />
      </div>
    )
  )
})

EmojiContainer.displayName = 'EmojiContainer' // Set display name for better debugging
