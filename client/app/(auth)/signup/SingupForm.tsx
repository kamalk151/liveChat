"use client"
import React, { useState } from "react"
import Link from "next/link"

export default function SignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.")
      setSuccess("")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setSuccess("")
      return
    }
    setError("")
    setSuccess("Account created successfully!")
    // Handle signup logic here
  }

  return (
    <div className="auth-form">
      <h1>Sign Up</h1>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <button type="submit"
          className="auth-btn w-full inline-block px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition font-semibold text-center"
        >
          Sign Up
        </button>
      </form>
      <div className="auth-links">
        <Link href="/login"
          className="auth-link inline-block px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition font-semibold text-center w-full"
        >
          Login
        </Link>
      </div>
    </div>
  )
}
