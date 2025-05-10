
import { Link, useNavigate, } from 'react-router-dom'
import {  User } from 'lucide-react'
import LoginForm from '../../Components/LoginForm'
import { useEffect } from 'react'
import { useAuth } from '../../Context/auth.context'

export default function Login() {
    const {user } = useAuth() 
    const navigate = useNavigate()
    useEffect(()=>{
       if(user){
        navigate('/')
       }
    },[user])

  return (
    <div className=" w-full flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-2xl">
        <div className="text-center">
          <div className="mx-auto bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-400">Sign in to access your account</p>
        </div>

        
        <LoginForm/>
        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
