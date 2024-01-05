import { Category } from '../../redux/slices/products/categorySlice'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3003/categories'

const apiService = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
})

export const fetchCategoriesData = async () => {
  try {
    const response = await apiService.get('')
    return response.data
  } catch (error) {
    throw error
  }
}

export const createCategory = async (newCategoy: Category) => {
  try {
    const response = await apiService.post('', newCategoy)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateCategory = async (updateCategoy: Category) => {
  try {
    const response = await apiService.put(`/${updateCategoy._id}`, updateCategoy.name)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteCategory = async (categoryId: string) => {
  try {
    const response = await apiService.delete(`/${categoryId}`)
    return response.data
  } catch (error) {
    throw error
  }
}
