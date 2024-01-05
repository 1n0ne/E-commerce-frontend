import 'react-toastify/dist/ReactToastify.css'

import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { UserCredentials, authorizeUser } from '../../../redux/slices/users/usersSlice'

import { AppDispatch } from '../../../redux/store'
import { LoginForm } from './LoginForm'
import { Logo } from '../../Logo'
import axios from 'axios'
import { login } from '../../Services/AuthApiService'
import { useDispatch } from 'react-redux'

const initialUserState: UserCredentials = {
  email: '',
  password: ''
}

export function ExistUserWarpper() {
  const dispatch = useDispatch<AppDispatch>()
  const [userCredentials, setUser] = useState<UserCredentials>(initialUserState)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({
      ...userCredentials,
      [name]: value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!userCredentials.email || !userCredentials.password) {
      setError('Please enter both email and password')
      return
    }
    try {
      const res = await login(userCredentials)
      toast.success(res.message)
      const currentUser = res.payload
      dispatch(authorizeUser({ user: currentUser }))
      currentUser.isAdmin === false
        ? navigate(`/UserProfile/${currentUser._id}/${currentUser.name}`)
        : navigate(`/Admin/${currentUser._id}/${currentUser.name}`)
      setUser(initialUserState)
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
        <Logo />
        <ToastContainer />
        <h3 className="text-lg font-bold mt-4">Sign in</h3>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <LoginForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          userCredentials={userCredentials}
        />
        <Link to="/CreatAccount" className="text-blue-500 mt-4">
          <div>New to Electro stor? Create Account now</div>
        </Link>
        <Link to="/forgetPassword" className="text-blue-500 mt-4">
          <div>Forgot your password? Reset it now</div>
        </Link>
      </div>
    </div>
  )
}
