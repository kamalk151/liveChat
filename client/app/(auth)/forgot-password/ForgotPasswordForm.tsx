"use client"
import React, { useState } from "react"
import Link from "next/link"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Please enter your email address.")
      setMessage("")
      return
    }
    setError("")
    setMessage("If an account with that email exists, a password reset link has been sent.")
  }

  return (
    <div className="auth-form">
      <h1>Forgot Password</h1>
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
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        <button type="submit" className="auth-btn">Send Reset Link</button>
      </form>
      <div className="auth-links">
        <Link href="/login" className="auth-link">Login</Link>
      </div>
    </div>
  )
}
