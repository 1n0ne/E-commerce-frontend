import 'react-toastify/dist/ReactToastify.css'

import { ChangeEvent, FormEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'
import { resetPassword } from '../../Services/UserApiService'

export function ResetPassword() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
  }

  const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    try {
      if (token) {
        await resetPassword(token, newPassword)
        navigate('/login')
      }
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
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={handleChangeNewPassword}
            className="mt-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            className="mt-2 p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}
