"use client"
import Link from "next/link"
import { useState } from "react"
 
export default function StartConversationPage() {
 
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-6">
        {
          'Start a Conversation'
        }
      </h1>
      <div className="flex gap-6">
        <Link
          href={`start-conversation/chat`}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Start Chat ----
        </Link>
        &nbsp;
        <Link
          href={`start-conversation/video`}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Start Video ----
        </Link>
      </div>
    </div>
  )
}
