import 'react-toastify/dist/ReactToastify.css'

import { AppDispatch, RootState } from '../../../redux/store'
import { ToastContainer, toast } from 'react-toastify'
import {
  User,
  blockUser,
  changeRole,
  removeUser,
  unblockUser
} from '../../../redux/slices/users/usersSlice'
import { banUser, changeUserRole, deleteSingleUser, unBanUser } from '../../Services/UserApiService'
import { useDispatch, useSelector } from 'react-redux'

import { PaginationBar } from '../../PaginationBar'
import { UsersLoader } from '../../Services/UsersLoader'
import axios from 'axios'
import { paginate } from '../../paginationFunction'
import { useState } from 'react'

export function UserManager() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const users = state.users
  const currentUser = JSON.parse(localStorage.getItem('authUser') || '{}')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const paginatedUsers = paginate<User>(users.users, currentPage, itemsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }
  const handelRemoveUser = async (userId: string) => {
    try {
      const res = await deleteSingleUser(userId)
      toast.success(res.massage)
      dispatch(removeUser({ userId }))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errResp = error.response?.data.message
        toast.error(errResp)
      } else {
        toast.error('somthing wend wrong pleas try again')
      }
    }
  }

  const handelBlockUser = async (userId: string) => {
    try {
      const res = await banUser(userId)
      toast.success(res.massage)
      dispatch(blockUser({ userId }))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errResp = error.response?.data.message
        toast.error(errResp)
      } else {
        toast.error('somthing wend wrong pleas try again')
      }
    }
  }

  const handelUnblockUser = async (userId: string) => {
    try {
      const res = await unBanUser(userId)
      toast.success(res.massage)
      dispatch(unblockUser({ userId }))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errResp = error.response?.data.message
        toast.error(errResp)
      } else {
        toast.error('somthing wend wrong pleas try again')
      }
    }
  }

  const handleChangeUserRole = async (userId: string) => {
    try {
      const res = await changeUserRole(userId)
      dispatch(changeRole({ userId: res.payload }))
      toast.success(res.message)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errResp = error.response?.data.message
        toast.error(errResp)
      } else {
        toast.error('Something went wrong. Please try again')
      }
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 w-full">
      <ToastContainer />
      <UsersLoader />
      <div>
        <h2 className="text-2xl font-bold mb-4">Users Management</h2>
        {paginatedUsers.map((user) => {
          if (currentUser._id !== user._id) {
            return (
              <li key={user._id} className="flex gap-4 text-2xl mb-2  p-4 rounded-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="blue"
                    className="w-10 h-10">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span>{user.name}</span>
                  <span className="flex flex-row text-sm">{user.email}</span>
                </div>
                <div className="flex flex-row">
                  {user.isAdmin ? (
                    <button
                      className="text-blue-400 text-xs mr-2 "
                      onClick={(e) => {
                        e.preventDefault()
                        handleChangeUserRole(user._id)
                      }}>
                      Set as user
                    </button>
                  ) : (
                    <button
                      className="text-blue-400 text-xs mr-2 "
                      onClick={(e) => {
                        e.preventDefault()
                        handleChangeUserRole(user._id)
                      }}>
                      Set as admin
                    </button>
                  )}
                  <button
                    className="text-red-400 text-xs"
                    onClick={(e) => {
                      e.preventDefault()
                      handelRemoveUser(user._id)
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="red"
                      className="w-6 h-6">
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {user.isBan ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handelUnblockUser(user._id)
                      }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="green"
                        className="w-6 h-6">
                        <path
                          fillRule="evenodd"
                          d="M6.72 5.66l11.62 11.62A8.25 8.25 0 006.72 5.66zm10.56 12.68L5.66 6.72a8.25 8.25 0 0011.62 11.62zM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handelBlockUser(user._id)
                      }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="red"
                        className="w-6 h-6">
                        <path
                          fillRule="evenodd"
                          d="M6.72 5.66l11.62 11.62A8.25 8.25 0 006.72 5.66zm10.56 12.68L5.66 6.72a8.25 8.25 0 0011.62 11.62zM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </li>
            )
          }
        })}
      </div>
      <div>
        <div>
          <PaginationBar
            totalItems={users.users.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}
