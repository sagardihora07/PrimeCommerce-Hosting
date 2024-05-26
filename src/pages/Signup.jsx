import React from 'react'
import SignupForm from "../components/core/Auth/SignupForm"

const Signup = () => {
  return (
    <div className='flex items-center justify-center h-screen flex-col'>

      <div class="text-2xl font-semibold text-center py-1 px-3 rounded-md bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-700 text-white shadow-lg">
        Sign Up
      </div>


      <SignupForm />
    </div>
  )
}

export default Signup