import 'react-toastify/dist/ReactToastify.css'

import { ChangeEvent, FormEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { User, updateUserInfo } from '../../redux/slices/users/usersSlice'

import { AppDispatch } from '../../redux/store'
import { UserForm } from '../Auth/CreatNewAccount/UserForm'
import axios from 'axios'
import { updateUser } from '../Services/UserApiService'
import { useDispatch } from 'react-redux'
import { validateUser } from '../Auth/CreatNewAccount/validateUser'

export function UpdateUserInfoWarpper() {
  const dispatch = useDispatch<AppDispatch>()
  const user = JSON.parse(localStorage.getItem('authUser') || '{}')
  const [updatedUser, setUser] = useState<User>(user)
  const errors = validateUser(updatedUser)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({
      ...updatedUser,
      [name]: value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (Object.keys(errors).length > 0) {
      return
    }
    try {
      await updateUser(updatedUser)
      dispatch(updateUserInfo({ updateUser: updatedUser }))
      setUser(updatedUser)
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
    <div>
      <ToastContainer />
      <UserForm
        usedFor="Update"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        user={updatedUser}
        errors={errors}
      />
    </div>
  )
}
