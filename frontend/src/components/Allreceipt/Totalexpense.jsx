// import React, { useEffect, useState } from 'react'
// const Totalexpense = () => {
//   const[paid,setPaid] = useState();
//   const[unpaid,setUnpaid]  = useState();
//   const[pending,setPending] = useState();
//   const[activeButton, setActiveButton] = useState("paid")
//   const fetchData = async (type)=>{
//   try{
//  const res = await fetch(`http://localhost:3000/receipt/${type}`);

//     const data = await res.json();
//    if(type === "paid") setPaid(data.totalPaid);
//    if(type === "unpaid") setUnpaid(data.totalPaid);
//    if(type === "pending") setPending(data.totalPaid)
//   }catch (err){
//     console.error("Error fetching data:", err)
//   } 
//   };
//   useEffect(()=>{
//     fetchData("paid")
//      fetchData("unpaid");
//     fetchData("pending");
//   },[])
  
//   return (
//     <>

//    <div className='expense'>
//     {/* <h2>Total Expensive</h2> */}
//     <div className='expense-names'>
//    <button className={activeButton === "paid"? "active":""}
//     onClick={()=> {
//           setActiveButton("paid")

//     fetchData("paid");
//   }}>Paid </button>

//       <button className={activeButton === "unpaid"? "active" :""} 
//       onClick={()=>  {       
//         setActiveButton("unpaid");
//  fetchData("unpaid");}}>Unpaid </button>


//    <button className={activeButton === "pending" ? "active" : ""} onClick={()=>{setActiveButton("pending"); fetchData("pending")}}>pending </button>

           
//     </div>

//    </div>
     
//     </>
//   )
// }

// export default Totalexpense


// import React, { useEffect, useState } from "react";

// import "./Totalexpense.css"; // 👈 new css file for styling

// import { useNavigate } from "react-router-dom";



// const Totalexpense = () => {

//  const [paid, setPaid] = useState(0);

//  const [unpaid, setUnpaid] = useState(0);

// const [pending, setPending] = useState(0);
// const [activeButton, setActiveButton] = useState("paid");
// const navigate = useNavigate();



// const fetchData = async (type) => {
// const userId = localStorage.getItem(userId)
// try {

// const res = await fetch(`http://localhost:3000/receipt/${type}/${userId}`,{
//   credentials: "include" 
// }

// // credentials: "include"

// );

//  const data = await res.json();



// if (type === "paid") setPaid(data.totalPaid || 0);

// if (type === "unpaid") setUnpaid(data.totalPaid || 0);

// if (type === "pending") setPending(data.totalPaid || 0);

//  } catch (err) {

// console.error("Error fetching data:", err);

//  }

//  };



//   useEffect(() => {

//     fetchData("paid");

//     fetchData("unpaid");

//     fetchData("pending");

//   }, []);



//   return (

//     <div className="all-receipts-container">

//       {/* Tabs (same as Allreceipt.jsx) */}

//       <div className="tabs">

//         <button

//           className="tab"

//           onClick={() => {

//             navigate("/AllReceipt");

//           }}

//         >

//           All Receipts

//         </button>



//  <button className="tab active">Total Expense</button>

//       </div>



//       {/* Expense Summary Section */}

//       <div className="expense">

//         <h3 className="section-title">Expense Overview</h3>



//         {/* Buttons */}

//         <div className="expense-buttons">

//           <button

//             className={activeButton === "paid" ? "active" : ""}

//             onClick={() => setActiveButton("paid")}

//           >

//             Paid

//           </button>

//           <button

//             className={activeButton === "unpaid" ? "active" : ""}

//             onClick={() => setActiveButton("unpaid")}

//           >

//             Unpaid

//           </button>

//           <button

//             className={activeButton === "pending" ? "active" : ""}

//             onClick={() => setActiveButton("pending")}

//           >

//             Pending

//           </button>

//         </div>



//         {/* Data Display */}

//         <div className="expense-summary">

//           {activeButton === "paid" && (

//             <div className="summary-card">

//               <p>Total Paid Expense</p>

//               <h2>₹{paid}</h2>

//             </div>

//           )}

//           {activeButton === "unpaid" && (

//             <div className="summary-card">

//               <p>Total Unpaid Expense</p>

//               <h2>₹{unpaid}</h2>

//             </div>

//           )}

//           {activeButton === "pending" && (

//             <div className="summary-card">

//               <p>Total Pending Expense</p>

//               <h2>₹{pending}</h2>

//             </div>

//           )}

//         </div>

//       </div>

//     </div>

//   );

// };



// export default Totalexpense;


import React, { useEffect, useState } from "react";
import "./Totalexpense.css";
import { useNavigate } from "react-router-dom";

const Totalexpense = () => {
  const [paid, setPaid] = useState(0);
  const [unpaid, setUnpaid] = useState(0);
  const [pending, setPending] = useState(0);
  const [activeButton, setActiveButton] = useState("paid");

  const navigate = useNavigate();

  // ✅ Corrected: localStorage.getItem("userId") (it must be a string)
  const fetchData = async (type) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("No userId found in localStorage");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/receipt/${type}/${userId}`, {
        credentials: "include", // ✅ properly placed inside options
      });

      const data = await res.json();

      // ✅ Handle each type properly
      if (type === "paid") setPaid(data.totalPaid || 0);
      if (type === "unpaid") setUnpaid(data.totalPaid || 0);
      if (type === "pending") setPending(data.totalPaid || 0);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // ✅ Fetch all totals when component loads
  useEffect(() => {
    fetchData("paid");
    fetchData("unpaid");
    fetchData("pending");
  }, []);

  return (
    <div className="all-receipts-container">
      {/* Navigation Tabs */}
      <div className="tabs">
        <button
          className="tab"
          onClick={() => navigate("/AllReceipt")}
        >
          All Receipts
        </button>

        <button className="tab active">Total Expense</button>
      </div>

      {/* Expense Section */}
      <div className="expense">
        <h3 className="section-title">Expense Overview</h3>

        {/* Filter Buttons */}
        <div className="expense-buttons">
          <button
            className={activeButton === "paid" ? "active" : ""}
            onClick={() => setActiveButton("paid")}
          >
            Paid
          </button>
          <button
            className={activeButton === "unpaid" ? "active" : ""}
            onClick={() => setActiveButton("unpaid")}
          >
            Unpaid
          </button>
          <button
            className={activeButton === "pending" ? "active" : ""}
            onClick={() => setActiveButton("pending")}
          >
            Pending
          </button>
        </div>

        {/* Summary Display */}
        <div className="expense-summary">
          {activeButton === "paid" && (
            <div className="summary-card">
              <p>Total Paid Expense</p>
              <h2>₹{paid}</h2>
            </div>
          )}
          {activeButton === "unpaid" && (
            <div className="summary-card">
              <p>Total Unpaid Expense</p>
              <h2>₹{unpaid}</h2>
            </div>
          )}
          {activeButton === "pending" && (
            <div className="summary-card">
              <p>Total Pending Expense</p>
              <h2>₹{pending}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Totalexpense;
