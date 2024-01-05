import axios from 'axios'

const API_BASE_URL = 'http://localhost:3003/orders'

const apiService = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
})

export const fetchOrdersData = async () => {
  try {
    const response = await apiService.get('/all-orders')
    return response.data
  } catch (error) {
    throw error
  }
}

export const getOrderForUser = async (id: string) => {
  try {
    const response = await apiService.get(`/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createOrder = async (newOrder: object) => {
  try {
    const response = await apiService.post('/process-payment', newOrder)
    return response.data
  } catch (error) {
    throw error
  }
}
