

import React, { useState } from "react";
import Select from "react-select";

function CreateReceipt() {
  const [formData, setFormData] = useState({
    ReceiptNumber: "",
    date: "",
    amount: "",
    status: null, 
    category: "",
    description: ""
  });

  const [save, setSave] = useState("Save");
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSave("Saved")
     setFormData({
          ReceiptNumber: "",
          date: "",
          amount: "",
          status: null, 
          category: "",
          description: ""
        });
        setFile(null);
        document.querySelector('input[type="file"]').value = "";

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) =>
      formDataToSend.append(key, formData[key] || "")
    );

    if (file) {
      formDataToSend.append("image", file);
    }

    try {
      const res = await fetch("http://localhost:3000/receipt/create", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();

      if (res.ok) {
       
       

        console.log(data);

        setTimeout(() => setSave("Save"), 1500);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const options = [
    { value: "Paid", label: "Paid" },
    { value: "Unpaid", label: "Unpaid" },
    { value: "Pending", label: "Pending" },
  ];

  return (
    <div className="receipt-container">
      <h2 className="form-title">Review Receipt</h2>

      <form className="receipt-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Receipt Number*</label>
          <input
            type="text"
            name="ReceiptNumber"
            value={formData.ReceiptNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Total Amount*</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            placeholder="Meals / Travel etc."
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Date*</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status*</label>
          <Select
            name="status"
            className="custom-select"
            options={options}
            value={options.find((opt) => opt.value === formData.status) || null} // 👈 Corrected
            onChange={(selected) =>
              setFormData({ ...formData, status: selected ? selected.value : null })
            }
            isClearable 
          />
        </div>

        <div className="form-group">
          <label>Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <button className="savebtn" type="submit">
          {save}
        </button>
      </form>
    </div>
  );
}

export default CreateReceipt;
