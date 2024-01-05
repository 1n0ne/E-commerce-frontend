import { Logo } from '../../components/Logo'
import LogoutButton from '../../components/Auth/Logout'
import React from 'react'

const AdminHeader = () => {
  return (
    <header className="fixed w-full top-0 left-0 py-1.5 text-left leading-6 bg-white z-10 shadow sm:h-20 md:h-24 flex items-center">
      <div className="flex flex-col">
        <div className="flex items-center ml-10">
          <Logo />
        </div>
        <div className="flex justify-center ml-10 mt-5">
          <h3 className="font-bold text-2xl ">Admin Dashboard</h3>
        </div>
      </div>
      <div className="ml-auto mr-10">
        <LogoutButton />
      </div>
    </header>
  )
}

export default AdminHeader
