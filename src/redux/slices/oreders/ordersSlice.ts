import { Product } from '../products/productSlice'
import { User } from '../users/usersSlice'
import { createSlice } from '@reduxjs/toolkit'

export type IOrderProduct = {
  product: Product
  quantity: number
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type IOrderPayment = {}

export type Order = {
  _id: string
  products: IOrderProduct[]
  payment: IOrderPayment
  buyer: User
  status: string
}

export type OrderState = {
  orders: Order[]
  error: null | string
  isLoading: boolean
  searchTerm: null | string
}
const initialState: OrderState = {
  orders: [],
  error: null,
  isLoading: false,
  searchTerm: ''
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    ordersRequest: (state) => {
      state.isLoading = true
    },
    ordersSuccess: (state, action) => {
      state.isLoading = false
      state.orders = action.payload
    },
    searchOrder: (state, action: { payload: string }) => {
      state.searchTerm = action.payload
    }
  }
})
export const { ordersRequest, ordersSuccess, searchOrder } = ordersSlice.actions

export default ordersSlice.reducer
