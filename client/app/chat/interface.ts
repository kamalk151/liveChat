export interface Message {
  sender?: string
  user?: string
  type?: string
  text?: string
  roomId?: string
}

export interface MsgParam extends Partial<Message> {
  to?: string
}

export interface SavedMessageFormat {
  roomId: string
  messages: Message[]
}

export interface SavedUserFormat {
  name: string
  gender: string
}

export interface ChatStartedWith {
  from: string
  roomId: string
  to: string
}

export interface ActionButtonProps {
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>
  roomId: string
  strangeId: string
  setIsStrangerTyping: (isTyping: boolean) => void
  setText: (text: string) => void
  text: string
  isStrangerTyping: boolean
  setConversation: (msgParam: Message[] | []) => void
}

export interface UseHandleTyping {
  handleTyping: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleInputBlur: () => void
}

export interface EmojiProps {
  showPicker: boolean
  setText: (message: Message) => void
}

export interface RenderMessageProps {
  conversation: Message[]
  bottomRef: React.RefObject<HTMLDivElement | null>
  socketId: string
}
