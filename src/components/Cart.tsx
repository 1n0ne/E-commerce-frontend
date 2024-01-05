import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer, toast } from 'react-toastify'
import {
  decreaseQuantity,
  increaseQuantity,
  removeAll,
  removeFromCart
} from '../redux/slices/cart/CartSlice'
import { useDispatch, useSelector } from 'react-redux'

import Footer from '../components/Footer'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { RootState } from '../redux/store'
import axios from 'axios'
import { createOrder } from './Services/OrderApiService'

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeFromCart(itemId))
  }

  const handleRemoveAll = () => {
    dispatch(removeAll())
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const handelCreatOrder = async () => {
    const order = {
      cartItems: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      payment: {}
    }
    try {
      const res = await createOrder(order)
      toast.success(res.message)
      console.log('New order data:', res.payload)
      dispatch(removeAll())
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errResp = error.response?.data.message
        toast.error(errResp)
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen mt-16">
      <Header />
      <ToastContainer />
      <div className="flex-grow p-4">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center">
            <div className="w-full md:w-3/4">
              <div className="mr-16">
                <div className="font-bold text-2xl mb-4">Shopping Cart</div>
                <div className="flex items-row border-b border-gray-300 pb-4 mb-10"></div>
                <div className="text-center mb-4">Your cart is empty. Go shop now!</div>
                <div className="flex justify-center">
                  <Link to="/All-Products">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-full md:w-3/4">
              <div className="mr-16">
                <div className="font-bold text-2xl mb-4">Shopping Cart</div>
                <div className="flex items-row border-b border-gray-300 pb-4">
                  <div className="flex-grow">{cartItems.length} items</div>
                  <button className="ml-0 text-red-600" onClick={() => handleRemoveAll()}>
                    Remove All
                  </button>
                </div>
                <br></br>
              </div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Product</th>
                    <th className="text-left">Quantity</th>
                    <th className="text-left">Price</th>
                    <th className="text-left">Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.product._id}>
                      <td>
                        <div className="flex justify-start mb-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-20 h-20 mr-2"
                          />
                          <div className="flex flex-col">
                            <div className="flex justify-start font-semibold text-lg mb-3">
                              {item.product.name}
                            </div>
                            <button
                              className="flex justify-start text-red-600"
                              onClick={() => handleRemoveFromCart(item.product._id)}>
                              Remove
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center">
                          <button
                            className="bg-gray-300 w-6 h-6 rounded-full"
                            onClick={() => dispatch(decreaseQuantity(item.product._id))}>
                            -
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            className="bg-gray-300 w-6 h-6 rounded-full"
                            onClick={() => dispatch(increaseQuantity(item.product._id))}>
                            +
                          </button>
                        </div>
                      </td>
                      <td>{item.product.price}</td>
                      <td>{item.product.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full md:w-3/4">
              <div className="bg-gray-100 p-4">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${getTotalPrice()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax:</span>
                  <span>$0</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>${getTotalPrice()}</span>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 mt-4"
                  onClick={handelCreatOrder}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Cart
