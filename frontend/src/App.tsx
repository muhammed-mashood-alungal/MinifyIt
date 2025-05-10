
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/LoginPage/LoginPage'
import Signup from './pages/SignupPage/SignupPage'
import VerifyOtpPage from './pages/VerifyOtp/VerifyOtpPage'
import Home from './pages/HomePage/HomePage'
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react'
import { useAuth } from './Context/auth.context'
import UrlRedirectionPage from './pages/UrlRedirectionPage/UrlRedirectionPage'

function App() {
 

  const {checkAuth} = useAuth()
  useEffect(()=>{
    checkAuth()
    console.log('he')
  },[])

  return (
    <>
    <BrowserRouter>
     <Routes>
       <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/signup" element={<Signup />} />
       <Route path="/verify-otp" element={<VerifyOtpPage />} />
       <Route path='/:shortCode' element={<UrlRedirectionPage/>}/>
     </Routes>
     <Toaster/>
    </BrowserRouter>
    
    </>
  )
}

export default App
