import React from "react"
import "./globalStyles/globals.css"  // Import global styles if needed
import Header from "./layout/Header"
import Footer from "./layout/Footer"
// import "./globalStyles/style.css"

interface RootLayoutProps {
  children: React.ReactNode
}
// This is the main layout for the dashboard routes
export default function RootLayout({ children }: RootLayoutProps) {
  
  return (
    <html lang="en">
      <body>
        <Header />
        {/* Optional: Add a footer or other layout components */}
        {/* Main content area */}
        <main>{children}</main>
          {/* Optional: Add a script for client-side functionality */}
        <Footer />
      </body>
    </html>
  )
}
