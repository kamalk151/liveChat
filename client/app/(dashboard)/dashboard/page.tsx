import React from "react"

export const metadata = {
  title: "Digital Store - Dashboard"
}

export default async function Dashboard() {
  
    console.log("Dashboard loaded")
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("Dashboard data loaded")
      }, 1000)
    }).then((data) => {
      console.log(data)
    })

  return (
    <div>
      <p> Layout rendered ad  t:</p>
      <p>Your one-stop shop for all things digital!</p>
    </div>
  )
}
