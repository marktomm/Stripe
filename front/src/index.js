import React, { useState } from "react"
import ReactDOM from "react-dom"
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"
import { toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"
import "./styles.css"

toast.configure()

const App = () => {
  const [product] = useState({
    name: "Tesla Roadster",
    price: 64998.67,
    description: "Cool car"
  })

  const handleToken = async (token, addresses) => {
    const response = await axios.post(
      "http://localhost:8080/checkout", {
      token,
      product
    })

    const { status } = response.data
    console.log("Response:", response.data)
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" })
    } else {
      toast("Something went wrong", { type: "error" })
    }
  }

  return (
    <div className="container">
      <div className="product">
        <h1>{product.name}</h1>
        <h3>On Sale · ${product.price}</h3>
      </div>
      <StripeCheckout
        stripeKey="PUBLISHABLE_KEY"
        token={handleToken}
        amount={product.price * 100}
        name="Tesla Roadster"
        billingAddress
        shippingAddress
      />
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
