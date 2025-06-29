import React from "react"
import "./globalStyles/globals.css"  // Import global styles if needed
// import "./globalStyles/style.css"

interface RootLayoutProps {
  children: React.ReactNode
}
// This is the main layout for the dashboard routes
export default function RootLayout({ children }: RootLayoutProps) {
  
  return (
    <html lang="en">
      <body>
        {/* Main content area */}
        <main>{children}</main>
          {/* Optional: Add a script for client-side functionality */}
      </body>
    </html>
  )
}
