import React from "react"
import "../globalStyles/style.css"

import AuthPage from "./auth-layout"

export const metadata = {
  title: "Digital Chat - Login",
  description: "Login to your Digital Store account",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-body">
      <AuthPage>{children}</AuthPage>
    </div>
  )
}
