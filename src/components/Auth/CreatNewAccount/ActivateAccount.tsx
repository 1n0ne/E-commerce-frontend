import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer, toast } from 'react-toastify'

import { Logo } from '../../Logo'
import { activateUser } from '../../Services/UserApiService'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export function ActivateAccount() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()

  const handelActivateAccount = async () => {
    try {
      if (token) {
        await activateUser(token)
        navigate('/Login')
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
    <div className="flex justify-center items-center h-screen ">
      <div className="max-w-xl bg-white p-12 shadow-md rounded-lg">
        <Logo />
        <ToastContainer />
        <h3 className="text-lg font-bold mt-4">
          Welcom to Elector Stor Activate your Account to login
        </h3>
        <button
          type="submit"
          onClick={handelActivateAccount}
          className="w-full bg-blue-500 text-white mt-2 py-2 px-4 rounded focus:outline-none hover:bg-blue-600">
          Activate
        </button>
      </div>
    </div>
  )
}
