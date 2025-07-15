
import VideoComponent from "./videoComponent"

export const metadata = {
  title: "Digital Store - Video Conversation"
}

interface Props {
  searchParams: { [key: string]: string | null }
}

export default function VedioPage({ searchParams }: Props) {
 
  // const roomId = searchParams.roomId
  // console.log('Room ID:', socketId)
  return (
    <VideoComponent />
  )
}
