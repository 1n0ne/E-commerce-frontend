import 'react-toastify/dist/ReactToastify.css'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import axios from 'axios'
import { forgetPassword } from '../../Services/UserApiService'

export function ForgetPassword() {
  const [userEmail, setUserEmail] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!userEmail) {
      setError('Please enter an email')
      return
    }
    try {
      const res = await forgetPassword(userEmail)
      toast.success(res.message)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errResp = error.response?.data.message
        toast.error(errResp)
      } else {
        toast.error('somthing wend wrong pleas try again')
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-sm bg-white p-6 shadow-md rounded-lg">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-bold mt-4">Reset Password</h3>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            value={userEmail}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}
