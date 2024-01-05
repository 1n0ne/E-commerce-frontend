import 'react-toastify/dist/ReactToastify.css'

import { ChangeEvent, FormEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { Link } from 'react-router-dom'
import { Logo } from '../../Logo'
import { User } from '../../../redux/slices/users/usersSlice'
import { UserForm } from './UserForm'
import { UsersLoader } from '../../Services/UsersLoader'
import axios from 'axios'
import { createUser } from '../../Services/UserApiService'
import { validateUser } from './validateUser'

const initialUserState: User = {
  _id: '',
  name: '',
  email: '',
  password: '',
  address: '',
  phone: '',
  isAdmin: false,
  isBan: false
}

export function NewUserWrapper() {
  const [user, setUser] = useState<User>(initialUserState)
  const errors = validateUser(user)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (Object.keys(errors).length > 0) {
      return
    }
    const formData = new FormData()
    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('phone', user.phone)
    formData.append('password', user.password)
    formData.append('address', user.address)
    try {
      const res = await createUser(formData)
      toast.success(res.message)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errResp = error.response?.data.message
        toast.error(errResp)
      } else {
        toast.error('somthing wend wrong pleas try again')
      }
    }

    setUser(initialUserState)
  }

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-xl bg-white p-12 shadow-md rounded-lg">
        <Logo />
        <ToastContainer />
        <h3 className="text-lg font-bold mt-4">Create Account</h3>
        <UserForm
          usedFor="Creat Account"
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          user={user}
          errors={errors}
        />
        <Link to={'/Login'} className="text-blue-500 mt-4">
          <div>Already have an account?</div>
        </Link>
      </div>
    </div>
  )
}
