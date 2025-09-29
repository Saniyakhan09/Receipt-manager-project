import React from 'react'
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='page1'>
        <h1 className='heading'>
          Welcome to <span className="highlight">Receipt Manager</span> – 
          your smart way to create, organize, and track all your receipts in one place. 
          Manage expenses effortlessly with a simple and secure platform.
        </h1>
        <button className="get-started-btn" onClick={() => navigate("/Authform")}>
          Get Started 
        </button>
      </div>
    </>
  )
}

export default Homepage
