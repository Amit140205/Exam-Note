import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { useEffect } from 'react'
import { getCurrentUser } from './services/api'
import {useDispatch, useSelector} from "react-redux"
import History from './pages/History'
import Pricing from './pages/Pricing'
import Notes from './pages/Notes'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailure from './pages/PaymentFailure'

export const serverUrl=import.meta.env.VITE_SERVER_URL

function App() {

  const dispatch=useDispatch()

  useEffect(()=>{
    getCurrentUser(dispatch)
  }, [dispatch])

  const {userData}=useSelector((state)=>state.user)
  // console.log(userData)

  return (
    <Routes>
      <Route path='/' element={userData?<Home/>:<Navigate to={"/auth"} replace/>}/>

      <Route path='/auth' element={userData?<Navigate to={"/"} replace/> :<Auth/>}/>

      <Route path='/notes' element={userData?<Notes/>:<Navigate to={"/auth"} replace/>}/>

      <Route path='/history' element={userData?<History/>:<Navigate to={"/auth"} replace/>}/>

      <Route path='/pricing' element={userData?<Pricing/>:<Navigate to={"/auth"} replace/>}/>

      {/* payment */}
      <Route path="/payment-success" element={<PaymentSuccess/>}/>
      <Route path="/payment-failure" element={<PaymentFailure/>}/>
    </Routes>
  )
}

export default App