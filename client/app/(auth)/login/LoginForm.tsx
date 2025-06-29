"use client"
import React, { useState } from "react"
import Link from "next/link"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }
    setError("")
    // Handle login logic here
    alert(`Logged in as: ${email}`)
  }

  return (
    <div className="auth-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button
          type="submit"
          className="auth-btn inline-block px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition font-semibold text-center"
        >
          Login
        </button>
      </form>
      <div className="auth-links">
        <Link
          href="/signup"
          className="inline-block px-4 py-2 bg-gray-200  text-black rounded hover:bg-gray-300 transition font-semibold text-center"
        >
          Sign up
        </Link>
        <Link
          href="/forgot-password"
          className="inline-block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition font-semibold text-center ml-2"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  )
}
