// "use client"
import React from "react"
import Link from "next/link"
export default function Header() {
  // const [inputValue, setInputValue] = React.useState("")
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(event.target.value)
  // }
  console.log("Header input value:")
  return (
    <header id='header'>
      <h1>Digital Store</h1>
      <nav>
        <ul>
          <li><Link href="/dashboard">Home</Link></li>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/product">Product</Link></li>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/start-conversation">Start Conversation</Link></li>
          <li><Link href="/portfolio">Portfolio</Link></li>
        </ul>
      </nav>
      {/* <div className="search-bar">
        <input
          type="text"
          // value={''}
          // onChange={() => {}}
          placeholder="Search..."
        />
      </div> */}
    </header>
  )
}