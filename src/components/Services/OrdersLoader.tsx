import { AppDispatch, RootState } from '../../redux/store'
import { ordersRequest, ordersSuccess } from '../../redux/slices/oreders/ordersSlice'
import { useDispatch, useSelector } from 'react-redux'

import { fetchOrdersData } from './OrderApiService'
import { useEffect } from 'react'

export function OrdersLoader() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const orders = state.orders
  const handleGetOrders = async () => {
    try {
      dispatch(ordersRequest())
      const res = await fetchOrdersData()
      dispatch(ordersSuccess(res.payload))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    handleGetOrders()
  }, [])

  return <div>{orders.isLoading && <h3> Loading Order...</h3>}</div>
}
