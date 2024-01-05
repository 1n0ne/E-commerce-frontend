import AdminHeader from './AdminHeader'
import { CategroyManager } from '../../components/AdminComponents/catedgoryManagement/CategoryManger'
import { OrdersManager } from '../../components/AdminComponents/ordersManagement/OrdersManager'
import { ProductsManager } from '../../components/AdminComponents/productManagement/ProductsManager'
import { UpdateUserInfoWarpper } from '../../components/UserUpdateInfo/UpdateUserInfoWrapper'
import { UserManager } from '../../components/AdminComponents/userManagement/UserManager'
import { useState } from 'react'

export function Admin() {
  const [showInformation, setShowInformation] = useState(false)
  const [showProducts, setshowProducts] = useState(false)
  const [showCategory, setshowCategory] = useState(false)
  const [showUsers, setshowUsers] = useState(false)
  const [showOrders, setShowOrders] = useState(false)

  const handleInformationClick = () => {
    setShowInformation(!showInformation)
  }

  const handleProductsClick = () => {
    setshowProducts(!showProducts)
  }

  const handleCategoryClick = () => {
    setshowCategory(!showCategory)
  }

  const handleUsersClick = () => {
    setshowUsers(!showUsers)
  }

  const handleOrdersClick = () => {
    setShowOrders(!showOrders)
  }

  return (
    <div>
      <AdminHeader />
      <div className="flex flex-col min-h-screen md:flex-row">
        <aside className="w-full md:w-1/4 bg-gray-200 h-screen md:h-auto">
          <div className="flex justify-center items-center mb-10 mt-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="gray"
              className="w-20 h-20">
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <ul className="flex flex-col">
            <li
              onClick={handleInformationClick}
              className={`border  cursor-pointer  p-2  flex justify-center items-center ${
                showInformation ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}>
              My Information
            </li>
            <li
              onClick={handleProductsClick}
              className={`border cursor-pointer  p-2  flex justify-center items-center ${
                showProducts ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}>
              Products
            </li>
            <li
              onClick={handleCategoryClick}
              className={` border cursor-pointer  p-2  flex justify-center items-center ${
                showCategory ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}>
              Categories
            </li>
            <li
              onClick={handleUsersClick}
              className={`border cursor-pointer p-2  flex justify-center items-center ${
                showUsers ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}>
              Users
            </li>
            <li
              onClick={handleOrdersClick}
              className={`cursor-pointer rounded p-2  flex justify-center items-center ${
                showOrders ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}>
              Orders
            </li>
          </ul>
        </aside>
        <main className="w-full md:w-3/4">
          {showInformation && (
            <div className="flex flex-col items-start ml-16 mb-10 mt-16">
              <h3 className="text-2xl font-bold">My Information</h3>
              <div className="ml-4 mt-4 w-2/3">
                <UpdateUserInfoWarpper />
              </div>
            </div>
          )}
          {showProducts && (
            <div className="flex flex-col items-start ml-16 mb-10 mt-16">
              <div className="ml-4 mt-4 w-2/3">
                <ProductsManager />
              </div>
            </div>
          )}
          {showCategory && (
            <div className="flex flex-col items-start ml-16 mb-10 mt-16">
              <div className="ml-4 mt-4 w-2/3">
                <CategroyManager />
              </div>
            </div>
          )}
          {showUsers && (
            <div className="flex flex-col items-start ml-16 mb-10 mt-16">
              <div className="ml-4 mt-4 w-2/3">
                <UserManager />
              </div>
            </div>
          )}
          {showOrders && (
            <div className="flex flex-col items-start ml-16 mb-10 mt-16">
              <div className="ml-4 mt-4 w-2/3">
                <h2 className="text-2xl font-bold mb-4">Orders Management</h2>
                <OrdersManager />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
