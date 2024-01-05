import CategoriesSlice from './slices/products/categorySlice'
import cartSlice from './slices/cart/CartSlice'
import { configureStore } from '@reduxjs/toolkit'
import ordersSlice from './slices/oreders/ordersSlice'
import productsReducer from './slices/products/productSlice'
import usersSlice from './slices/users/usersSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: CategoriesSlice,
    users: usersSlice,
    orders: ordersSlice,
    cart: cartSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
