import { createSlice } from '@reduxjs/toolkit'

export type Product = {
  _id: string
  name: string
  image: string
  description: string
  category: string
  variants: string[]
  sizes: string[]
  price: number
  quantity: number
  sold: number
}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
  searchTerm: '' | string
}

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false,
  searchTerm: ''
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload
    },
    addProduct: (state, action: { payload: { product: Product } }) => {
      // let's append the new product to the beginning of the array
      state.items = [action.payload.product, ...state.items]
    },
    removeProduct: (state, action: { payload: { productId: string } }) => {
      const filteredItems = state.items.filter(
        (product) => product._id !== action.payload.productId
      )
      state.items = filteredItems
    },
    searchProduct: (state, action: { payload: string }) => {
      state.searchTerm = action.payload
    },
    upadateProduct: (state, action: { payload: { product: Product } }) => {
      const updatedProduct = action.payload.product
      const index = state.items.findIndex((item) => item._id === updatedProduct._id)

      if (index !== -1) {
        state.items[index] = updatedProduct
      }
    }
  }
})
export const {
  upadateProduct,
  removeProduct,
  addProduct,
  productsRequest,
  productsSuccess,
  searchProduct
} = productsSlice.actions

export default productsSlice.reducer
