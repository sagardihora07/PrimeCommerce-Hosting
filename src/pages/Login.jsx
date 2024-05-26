import React from 'react'
import LoginForm from '../components/core/Auth/LoginForm'

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>

      <div class="text-2xl font-semibold text-center py-1 px-3 rounded-md bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-700 text-white shadow-lg">
        Login
      </div>

      <LoginForm />
    </div>
  )
}

export default Login