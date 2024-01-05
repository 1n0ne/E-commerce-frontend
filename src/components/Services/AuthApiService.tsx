import axios from 'axios'

const API_BASE_URL = 'http://localhost:3003/auth'

const apiService = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
})

export const login = async (user: object) => {
  try {
    const response = await apiService.post('/login', user)
    return response.data
  } catch (error) {
    throw error
  }
}

export const logout = async () => {
  try {
    const response = await apiService.post('/logout')
    return response.data
  } catch (error) {
    throw error
  }
}
