import React, { useState } from 'react'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { Order } from '../../redux/slices/oreders/ordersSlice'
import { UpdateUserInfoWarpper } from '../../components/UserUpdateInfo/UpdateUserInfoWrapper'
import { getOrderForUser } from '../../components/Services/OrderApiService'

export function User() {
  const user = JSON.parse(localStorage.getItem('authUser') || '{}')
  const [showInformation, setShowInformation] = useState(false)
  const [showOrders, setShowOrders] = useState(false)
  const [userOrders, setuserOrders] = useState([])

  const handleInformationClick = () => {
    setShowInformation(!showInformation)
  }

  const handleOrdersClick = async () => {
    setShowOrders(!showOrders)
    const res = await getOrderForUser(user._id)
    setuserOrders(res.payload)
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-screen md:flex-row">
        <aside className="w-full md:w-1/4 bg-gray-200 md:h-screen">
          <div className="mt-16 flex flex-col items-center">
            <div className="flex justify-center items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="blue"
                className="w-10 h-10">
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="mb-3 ">{user.name}</div>
            <ul className="flex flex-col w-full ">
              <li
                onClick={handleInformationClick}
                className={`border  cursor-pointer  p-2  flex justify-center items-center ${
                  showInformation ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}>
                My information
              </li>
              <li
                onClick={handleOrdersClick}
                className={`border cursor-pointer  p-2  flex justify-center items-center ${
                  showOrders ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}>
                My orders
              </li>
            </ul>
          </div>
        </aside>
        <main className="w-full md:w-3/4">
          {showInformation && (
            <div className="flex flex-col items-start ml-16 mb-10 mt-16">
              <h3 className="text-2xl font-bold">Information</h3>
              <div className="ml-4 mt-4 w-2/3">
                <UpdateUserInfoWarpper />
              </div>
            </div>
          )}
          {showOrders && (
            <div className="mr-9 ml-9 mt-5">
              {userOrders.length !== 0 ? (
                <ul className="list-disc pl-4">
                  <h3 className="text-2xl font-bold">Orders</h3>
                  {userOrders.map((order: Order) => {
                    // Calculate the final price
                    const totalPrice = order.products.reduce((acc, product) => {
                      const productPrice = product.product.price * product.quantity
                      return acc + productPrice
                    }, 0)

                    return (
                      <li
                        key={order._id}
                        className="flex flex-col gap-4 mb-4 p-4 rounded-lg bg-gray-200">
                        {order.products.map((product) => (
                          <div key={product.product._id} className="flex items-center gap-4">
                            <img
                              src={product.product.image}
                              alt={product.product.name}
                              width="50"
                            />
                            <div className="flex flex-col">
                              <span className="text-lg">{product.product.name}</span>
                              <span className="text-lg">quantity: {product.quantity}</span>
                            </div>
                          </div>
                        ))}
                        <p>Final Price: {totalPrice}</p>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p className="text-red-500">You do not have any orders.</p>
              )}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  )
}
