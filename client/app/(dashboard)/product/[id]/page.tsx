import React from "react"

interface ProductDetailProps {
  params: {
    id: string
  },
  searchParams: {
    [key: string]: string | string[]
  }
}
// This is the dynamic route for product details

export default async function ProductDetail( detailedProps: Promise<ProductDetailProps>) {
  const {  params: { id }, searchParams: { env }  } = await detailedProps
  
  console.log(env, "Product ID:s", id)
  // You can use the id to fetch product details from an API or database
  return (
    <div>
      <h1>Welcome to Digital Store product {id} {env} </h1>
      <p>Your one-stop shop for all things digital!</p>
    </div>
  )
}