import React, { useState } from 'react';

const CreateReceipt = () => {
  const [receiptData, setReceiptData] = useState({
    ReceiptNumber: '',
    date: '',
    category: '',
    amount: '',
    status: '',
    image: null,
  });
const [submitButton,setsubmitButton] = useState('save')
const [file, setFile] = useState(null);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
   

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setReceiptData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !userId) {
      console.error('Token or UserId missing:', { token, userId });
      alert('Please log in first');
      return;
    }
      setsubmitButton('saving...')

    

    const formData = new FormData();
    formData.append('ReceiptNumber', receiptData.ReceiptNumber);
    formData.append('date', receiptData.date);
    formData.append('category', receiptData.category);
    formData.append('amount', receiptData.amount);
    formData.append('status', receiptData.status);
    formData.append('image', receiptData.image);
    formData.append('user', userId);

    try {
      const response = await fetch('http://localhost:3000/receipt/create', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create receipt');
      }

      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error creating receipt:', error.message);
    }

          setsubmitButton('saved')
           setReceiptData({
 ReceiptNumber: '',
    date: '',
    category: '',
    amount: '',
    status: '',
    image: null,
      })
      setFile(null); document.querySelector('input[type="file"]').value = "";
       setTimeout(() => {
        setsubmitButton('Save');
      }, 1000);

  };

  
  return (
    <div className='receipt-container' >
      <h2 className='form-heading'>Create Receipt</h2>
      <form className='receipt-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='form-title'>Receipt Number</label>
          <input
            type="text"
            name="ReceiptNumber"
            value={receiptData.ReceiptNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div  className='form-group'>
          <label  className='form-title'>Total Amount</label>
          <input
            type="number"
            name="amount"
            value={receiptData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div  className='form-group'>
          <label className='form-title'>Category</label>
          <input
            type="text"
            name="category"
            placeholder=''
            value={receiptData.category}
            onChange={handleChange}
            
          />
        </div>
        <div  className='form-group'>
          <label className='form-title'>Date</label>
          <input
            type="date"
            name="date"
            value={receiptData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group '>
          <label    className='form-title'>Status</label>
          <select
            name="status"
            value={receiptData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
                        <option value="unpaid">Unpaid</option>

          </select>
        </div>
        <div  className='form-group'>
          <label className='form-title'>Upload Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
          />
        </div>
        <button type="submit" className='savebtn'>
          {submitButton}
        </button>
      </form>
    
    </div>
  );
};

export default CreateReceipt;