import { createSlice } from '@reduxjs/toolkit'

export type Category = {
  _id: string
  name: string
}
export type CategoriesState = {
  category: Category[]
  error: null | string
  isLoading: boolean
  searchId: string
  filterId: string
}

const initialState: CategoriesState = {
  category: [],
  error: null,
  isLoading: false,
  searchId: '',
  filterId: ''
}

export const CategoriesSlice = createSlice({
  name: 'Categories',
  initialState,
  reducers: {
    categroiesRequest: (state) => {
      state.isLoading = true
    },
    categroiesSuccess: (state, action) => {
      state.isLoading = false
      state.category = action.payload.categories
    },
    addCategroy: (state, action: { payload: { category: Category } }) => {
      state.category = [action.payload.category, ...state.category]
    },
    removeCategroy: (state, action: { payload: { categoryId: string } }) => {
      const filteredItems = state.category.filter(
        (category) => category._id !== action.payload.categoryId
      )
      state.category = filteredItems
    },
    setSearchedCategories: (state, action) => {
      state.searchId = action.payload
    },
    setFilterdCategories: (state, action) => {
      state.filterId = action.payload
    },
    upadateCategory: (state, action: { payload: { category: Category } }) => {
      const updatedCategroy = action.payload.category
      const index = state.category.findIndex((category) => category._id === updatedCategroy._id)

      if (index !== -1) {
        state.category[index] = updatedCategroy
      }
    }
  }
})
export const {
  upadateCategory,
  setFilterdCategories,
  setSearchedCategories,
  removeCategroy,
  addCategroy,
  categroiesRequest,
  categroiesSuccess
} = CategoriesSlice.actions

export default CategoriesSlice.reducer
