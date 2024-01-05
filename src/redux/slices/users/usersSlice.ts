import { createSlice } from '@reduxjs/toolkit'

export type UserCredentials = {
  email: string
  password: string
}
export type User = {
  _id: string
  name: string
  email: string
  password: string
  address: string
  phone: string
  isAdmin: boolean
  isBan: boolean
}

export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isAdd: boolean
  isAuth: boolean
  authUser: User | null
}

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isAdd: false,
  isAuth: false,
  authUser: null
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userRequest: (state) => {
      state.isLoading = true
    },
    userSuccess: (state, action) => {
      state.isLoading = false
      state.users = action.payload
    },
    updateState: (state, action) => {
      state.users = action.payload
    },
    addUser: (state, action: { payload: { user: User } }) => {
      state.users = [action.payload.user, ...state.users]
    },
    removeUser: (state, action: { payload: { userId: string } }) => {
      const filteredItems = state.users.filter((user) => user._id !== action.payload.userId)
      state.users = filteredItems
    },
    blockUser: (state, action: { payload: { userId: string } }) => {
      const { userId } = action.payload
      const userIndex = state.users.findIndex((user) => user._id === userId)
      if (userIndex !== -1) {
        state.users[userIndex].isBan = true
      }
    },
    unblockUser: (state, action: { payload: { userId: string } }) => {
      const { userId } = action.payload
      const userIndex = state.users.findIndex((user) => user._id === userId)
      if (userIndex !== -1) {
        state.users[userIndex].isBan = false
      }
    },
    authorizeUser: (state, action: { payload: { user: User } }) => {
      state.isAuth = true
      state.authUser = action.payload.user

      try {
        localStorage.setItem('authState', JSON.stringify(state.isAuth))
        localStorage.setItem('authUser', JSON.stringify(state.authUser))
      } catch (error) {
        console.error('Error saving auth state to local storage:', error)
      }
    },
    logout: (state) => {
      state.isAuth = false
      state.authUser = null

      try {
        localStorage.removeItem('authState')
        localStorage.removeItem('authUser')
        window.location.reload()
      } catch (error) {
        console.error('Error removing auth state from local storage:', error)
      }
    },
    updateUserInfo: (state, action: { payload: { updateUser: User } }) => {
      state.authUser = action.payload.updateUser
      try {
        localStorage.setItem('authUser', JSON.stringify(state.authUser))
        window.location.reload()
      } catch (error) {
        console.error('Error saving auth user to localStorage:', error)
      }
    },
    changeRole: (state, action: { payload: { userId: string } }) => {
      const { userId } = action.payload
      const userIndex = state.users.findIndex((user) => user._id === userId)
      if (userIndex !== -1) {
        if (state.users[userIndex].isAdmin) {
          state.users[userIndex].isAdmin = false
        } else {
          state.users[userIndex].isAdmin = true
        }
      }
    }
  }
})
export const {
  changeRole,
  unblockUser,
  blockUser,
  updateUserInfo,
  logout,
  authorizeUser,
  removeUser,
  addUser,
  userRequest,
  userSuccess,
  updateState
} = usersSlice.actions

export default usersSlice.reducer
