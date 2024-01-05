import 'react-toastify/dist/ReactToastify.css'

import { AppDispatch, RootState } from '../../../redux/store'
import { Product, removeProduct } from '../../../redux/slices/products/productSlice'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

import { NewProductWrapper } from './NewProductWrapper'
import { PaginationBar } from '../../PaginationBar'
import { ProductsLoader } from '../../Services/ProductsLoader'
import { UpdateProductWrapper } from './UpdateProductWrapper'
import axios from 'axios'
import { deleteProduct } from '../../Services/ProductApiService'
import { paginate } from '../../paginationFunction'
import { useState } from 'react'

export function ProductsManager() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const [showAddForm, setShoWAddForm] = useState(false)
  const [showFormFor, setShowFormFor] = useState('')
  const [updateProductID, setUpdateProductId] = useState('')
  const products = state.products
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const paginatedProducts = paginate<Product>(products.items, currentPage, itemsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handelShowAddForm = () => {
    setShoWAddForm(true)
  }

  const handelDeletProduct = async (productId: string) => {
    try {
      const res = await deleteProduct(productId)
      toast.success(res.massage)
      dispatch(removeProduct({ productId: productId }))
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
    <div className="grid grid-cols-1 md:grid-cols-1 w-full">
      <ProductsLoader />
      <ToastContainer />
      <div className="card grid gap-4">
        <div className="flex items-center gap-4 mb-2"></div>
      </div>
      <div className="flex justify-start gap-4 mb-2">
        <h2 className="text-2xl font-bold mb-4">Product Management</h2>
        <div className="flex justify-center gap-4 mb-2">
          <button
            onClick={() => {
              handelShowAddForm(), setShowFormFor('Add')
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="blue"
              className="w-10 h-10">
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {showAddForm &&
        (showFormFor === 'Add' ? (
          <NewProductWrapper closeForm={setShoWAddForm} />
        ) : (
          <UpdateProductWrapper productID={updateProductID} closeForm={setShoWAddForm} />
        ))}
      <div className="card grid gap-4">
        <ul>
          {paginatedProducts.map((product) => (
            <li key={product._id} className="flex items-center gap-4 text-2xl mb-2">
              <img src={product.image} alt={product.name} width="50" />
              <span>{product.name}</span>
              <button onClick={() => handelDeletProduct(product._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="red"
                  className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  handelShowAddForm(), setShowFormFor('Update'), setUpdateProductId(product._id)
                }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="blue"
                  className="w-6 h-6">
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <PaginationBar
          totalItems={products.items.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
