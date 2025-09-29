import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Page.css"

const Page = () => {
  const username = localStorage.getItem("username")
  const navigate = useNavigate()
  return (
    <div className="page-container">
      <h1>Welcome {username} </h1>
      <p>Here's what you need to know today.</p>
      <div className="btn-group">
        <button 
          className="btn" 
          onClick={() => navigate("/CreateReceipt")}
        >
          CREATE NEW REACIPTS
        </button>
        <button 
          className="btn" 
          onClick={() => navigate("/AllReceipt")}
        >
          VIEW ALL RECEIPTS
        </button>
      </div>
    </div>
  )
}

export default Page
