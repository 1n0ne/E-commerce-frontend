import { Product } from '../products/productSlice'
import { createSlice } from '@reduxjs/toolkit'

const data =
  localStorage.getItem('cart') !== null ? JSON.parse(String(localStorage.getItem('cart'))) : []

export type CartState = {
  items: { product: Product; quantity: number }[]
  error: null | string
  isLoading: boolean
}

const initialState: CartState = {
  items: data.map((product: Product) => ({ product, quantity: 1 })),
  error: null,
  isLoading: false
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartsItemsRequest: (state) => {
      state.isLoading = true
    },
    cartsItemsSuccess: (state) => {
      state.isLoading = false
    },
    addToCart: (state, action) => {
      const { product, quantity } = action.payload
      const existingItem = state.items.find((item) => item.product._id === product._id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({ product, quantity })
      }
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload
      state.items = state.items.filter((item) => item.product._id !== itemId)
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    removeAll: (state) => {
      state.items = []
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload
      const item = state.items.find((item) => item.product._id === itemId)
      if (item) {
        item.quantity += 1
        localStorage.setItem('cart', JSON.stringify(state.items))
      }
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload
      const item = state.items.find((item) => item.product._id === itemId)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
          localStorage.setItem('cart', JSON.stringify(state.items))
        } else {
          state.items = state.items.filter((item) => item.product._id !== itemId)
          localStorage.setItem('cart', JSON.stringify(state.items))
        }
      }
    }
  }
})

export const {
  decreaseQuantity,
  increaseQuantity,
  removeAll,
  cartsItemsSuccess,
  cartsItemsRequest,
  addToCart,
  removeFromCart
} = cartSlice.actions

export default cartSlice.reducer
