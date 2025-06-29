"use client"
import React, { useState } from "react"


export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) {
      setError("Please fill in all fields.")
      setSuccess("")
      return
    }
    setError("")
    setSuccess("Thank you for contacting us! We'll get back to you soon.")
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Contact Us </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium">Name:</label>
          <input
            id="name"
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">Email:</label>
          <input
            id="email"
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-1 font-medium">Message:</label>
          <textarea
            id="message"
            className="w-full border rounded px-3 py-2"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}
