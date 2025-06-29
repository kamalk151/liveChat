"use client"
import React, { useState } from "react"

export default function Login() {
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
    alert(`Logged in as: ${email}`)
  }

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 24, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #eee" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            required
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
        <button type="submit" style={{ width: "100%", padding: 10, background: "#0070f3", color: "#fff", border: "none", borderRadius: 4 }}>
          Login
        </button>
      </form>
      <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between" }}>
        <a href="/forgot" style={{ color: "#0070f3", textDecoration: "underline" }}>Forgot password?</a>
        <a href="/signup" style={{ color: "#0070f3", textDecoration: "underline" }}>Sign up</a>
      </div>
    </div>
  )
}