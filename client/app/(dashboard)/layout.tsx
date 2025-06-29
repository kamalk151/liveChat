import React from "react"
import Footer from "./footer"
import Header from "./header"
import "../globalStyles/style.css"  // Import global styles if needed

interface DashboardLayoutProps {
  children: React.ReactNode
}
// This is the main layout for the dashboard routes
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  
  return (
    <div>
      <Header />
      {/* <div className="bg-red-500 text-white p-4">Test Tailwind</div> */}
      {/* Main content area */}
      <main>{children}</main>
      <Footer />
      {/* Optional: Add a script for client-side functionality */}
    </div>
  )
}
