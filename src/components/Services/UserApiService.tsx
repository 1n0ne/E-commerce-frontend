import { User } from '../../redux/slices/users/usersSlice'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3003/users'

const apiService = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
})

export const fetchUsersData = async () => {
  try {
    const response = await apiService.get('')
    console.log(response.data.users)
    return response.data
  } catch (error) {
    throw error
  }
}

export const fetchSingleUsersData = async (id: string) => {
  try {
    const response = await apiService.post(`/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createUser = async (newUser: FormData) => {
  try {
    const response = await apiService.post('/process-register', newUser)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateUser = async (newUser: User) => {
  try {
    const response = await apiService.put(`/update/${newUser._id}`, newUser)
    return response.data
  } catch (error) {
    throw error
  }
}

export const activateUser = async (token: string) => {
  try {
    const response = await apiService.post('/activate', { token })
    return response.data
  } catch (error) {
    throw error
  }
}

export const forgetPassword = async (email: string) => {
  try {
    const response = await apiService.post('/forget-password', { email })
    return response.data
  } catch (error) {
    throw error
  }
}

export const resetPassword = async (token: string, password: string) => {
  try {
    const response = await apiService.put('/rest-password', { token, password })
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteSingleUser = async (userId: string) => {
  try {
    const response = await apiService.delete(`/${userId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const changeUserRole = async (userId: string) => {
  try {
    const response = await apiService.put(`/change-role/${userId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const banUser = async (userId: string) => {
  try {
    const response = await apiService.put(`/${userId}/ban`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const unBanUser = async (userId: string) => {
  try {
    const response = await apiService.put(`/${userId}/unban`)
    return response.data
  } catch (error) {
    throw error
  }
}
