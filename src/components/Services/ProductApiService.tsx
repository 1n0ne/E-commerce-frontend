import axios from 'axios'

const API_BASE_URL = 'http://localhost:3003/products'

const apiService = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
})

export const fetchProductsData = async () => {
  try {
    const response = await apiService.get('')
    return response.data
  } catch (error) {
    throw error
  }
}

export const createProduct = async (newProduct: FormData) => {
  try {
    const response = await apiService.post('', newProduct)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateProduct = async (updateProduct: FormData, productId: string) => {
  try {
    const response = await apiService.put(`/${productId}`, updateProduct)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteProduct = async (productId: string) => {
  try {
    const response = await apiService.delete(`/${productId}`)
    return response.data
  } catch (error) {
    throw error
  }
}
