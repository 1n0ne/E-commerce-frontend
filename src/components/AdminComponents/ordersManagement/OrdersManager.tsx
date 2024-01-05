import { Order } from '../../../redux/slices/oreders/ordersSlice'
import { OrdersLoader } from '../../Services/OrdersLoader'
import { PaginationBar } from '../../PaginationBar'
import { ProductsLoader } from '../../Services/ProductsLoader'
import { RootState } from '../../../redux/store'
import { UsersLoader } from '../../Services/UsersLoader'
import { paginate } from '../../paginationFunction'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export function OrdersManager() {
  const state = useSelector((state: RootState) => state)
  const orders = state.orders
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const paginatedOrders = paginate<Order>(orders.orders, currentPage, itemsPerPage)
  console.log(paginatedOrders)
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 w-full">
      <OrdersLoader />
      <ProductsLoader />
      <UsersLoader />
      {orders.isLoading && <h3>Loading Orders...</h3>}
      <div>
        {paginatedOrders.map((order) => {
          // Calculate the final price
          return (
            <li key={order._id} className="flex flex-col gap-4 mb-4 p-4 rounded-lg bg-gray-200">
              <h3 className="text-xl">{order.buyer.name} order:</h3>
              {order.products.map((product) => (
                <div key={product.product._id} className="flex items-center gap-4">
                  <img src={product.product.image} alt={product.product.name} width="50" />
                  <div className="flex flex-col">
                    <span className="text-lg">{product.product.name}</span>
                    <span className="text-lg">quantity: {product.quantity}</span>
                  </div>
                </div>
              ))}
              <p>Final Price: {0}</p>
            </li>
          )
        })}
      </div>
      <div>
        <PaginationBar
          totalItems={orders.orders.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
