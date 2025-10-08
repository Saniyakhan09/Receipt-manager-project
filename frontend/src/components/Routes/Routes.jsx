
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Authform from '../Credential/AuthForm'
import  '../Credential/AuthForm.css'
import Homepage from '../Homepage/Homepage'
import '../Homepage/Homepage.css'
import Page from '../pages/Page'
import CreateReceipt from '../Createreceipt/CreateReceipt'
import '../Createreceipt/CreateReceipt.css'
import Allreceipt from '../Allreceipt/Allreceipt'
import '../Allreceipt/Allreceipt.css'
import Totalexpense from '../Allreceipt/Totalexpense'
import '../Allreceipt/Totalexpense.css'
// import Receipts from '../Allreceipt/Receipts'
import '../Allreceipt/Receipts.css'
const AuthRoutes = () => {
  return (
   <>

    <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/Authform" element={<Authform/>} />
        <Route path="/page" element={<Page/>}/>
        <Route path='/CreateReceipt' element={<CreateReceipt/>}/>
        <Route path="/AllReceipt/" element={<Allreceipt/>}/>
        <Route path='/totalexpensive' element={<Totalexpense/>}/>
        {/* <Route path='/receipts' element ={<Receipts/>}/> */}
    </Routes>

   </>
  )
}

export default AuthRoutes
