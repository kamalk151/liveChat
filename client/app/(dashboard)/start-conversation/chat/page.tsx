import TextComponent from './textComponent'

interface Props {
  searchParams: { [key: string]: string | null }
}

export default function TextChatPage({ searchParams }: Props) {

  return (
    <div className="flex h-full w-full flex-col">
      <TextComponent />
    </div>
  )
}

// export const metadata = {
//   title: 'Digital Store - Chat Conversation',
//   description: 'Chat with our support team for any inquiries or assistance.',
//   keywords: 'chat, conversation, support, digital store',
//   openGraph: {
//     title: 'Digital Store - Chat Conversation',
//     description: 'Chat with our support team for any inquiries or assistance.',
//     url: 'https://digitalstore.com/chat', 
//     siteName: 'Digital Store',
//   }
// }