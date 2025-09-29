import React, { useEffect, useState } from "react";
import "./Allreceipt.css";
import { useNavigate } from "react-router-dom";
const Allreceipt = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("review"); // for tabs
   const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/receipt/all", {
          method: "GET",
    //         headers: { 
    //            "Content-Type": "application/json",
    // "Authorization": `Bearer ${token}`  }

                credentials: "include"

        });

        const data = await res.json();
        if (res.ok) {
          setReceipts(data.data);
        } else {
          setError(data.message || "Failed to fetch receipts");
        }
      } catch (err) {
        setError("Error fetching receipts");
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);
  const handleDelete = async (id) => {

  try {
    const res = await fetch(`http://localhost:3000/receipt/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (res.ok) {
     
      setReceipts((prev) => prev.filter((r) => r._id !== id));
    } else {
      alert("Error: " + data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong while deleting!");
  }
};


  if (loading) return <p className="loading-message">Loading receipts...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="all-receipts-container">
      {/* {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "review" ? "tab active" : "tab"}
          onClick={() => setActiveTab("review")}
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
      </div> 

      <div className="receipt-section">
        <h3 className="section-title">Last 7 days</h3>
        <ul className="receipts-list">
          {receipts.map((receipt) => (
            <li className="receipt-row" key={receipt._id}>
              <div className="receipt-thumb">
                <img
                  src={receipt.image}
                  alt="receipt"
                  onClick={() => setSelectedImage(receipt.image)}
                  className="tumb-img"
                />      
              </div>
      
              <div className="receipt-info">
                              <p  className="receipt-number"> {receipt.ReceiptNumber}</p>
 <p className="receipt-sub">
                  {receipt.date} 
                </p >
                <p className="receipt-title">
                  {receipt.category }
                </p>

               
              </div>
  
              {/* Amount + status */}
              <div className="receipt-meta">
                <span className="amount">₹{receipt.amount}</span>
                <span
                  className={`status ${
                    receipt.status === "Pending" ? "missing" : "ok"
                  }`}
                >
                  {receipt.status === "Pending" ? "MIS INFO" : receipt.status}
                </span>
              </div>
              {/* {button delete} */}
              <div className="receipt-actions">
             <button className="delete-btn" onClick={()  => handleDelete(receipt._id)}>DELETE</button>
              </div>
            </li>
          ))}
        </ul>
                 
  {selectedImage && (
  <div className="image-modal" onClick={() => setSelectedImage(null)}>
    <span className="close-btn">&times;</span>
    <img src={selectedImage} alt="full receipt" className="modal-img" />
  </div>
)}
      </div>
    </div>
  );
};

export default Allreceipt;
