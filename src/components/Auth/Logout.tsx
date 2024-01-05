import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer, toast } from 'react-toastify'

import { AppDispatch } from '../../redux/store'
import axios from 'axios'
import { logout } from '../../redux/slices/users/usersSlice'
import { useDispatch } from 'react-redux'

const LogoutButton = () => {
  const dispatch = useDispatch<AppDispatch>()

  const handleLogout = async () => {
    try {
      await logout()
      dispatch(logout())
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
      <button className="flex flex-col items-center hover:text-blue-500" onClick={handleLogout}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6">
          <path
            fillRule="evenodd"
            d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="mt-1">Logout</span>
      </button>
    </div>
  )
}

export default LogoutButton
