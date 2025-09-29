import React from 'react'
import  { useState } from "react";

import { useNavigate } from "react-router-dom";

const Receipts = () => {
    const [activeTab, setActiveTab] = useState("review"); 
       const navigate = useNavigate();
     
  return (
    <>
      <div className="tabs">
        <button
          className={activeTab === "review" ? "tab active" : "tab"}
          onClick={() => {setActiveTab("review");
          navigate("/AllReceipt")}
          }
        >
          All Receipts
        </button>

        <button
          className={activeTab === "reviewed" ? "tab active" : "tab"}
          onClick={() => {setActiveTab("reviewed");
            navigate("/totalexpensive");}}
        >
          Total Expense
        </button>
      </div>    </>
  )
}

export default Receipts
