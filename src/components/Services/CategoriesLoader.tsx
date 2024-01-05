import { AppDispatch, RootState } from '../../redux/store'
import { categroiesRequest, categroiesSuccess } from '../../redux/slices/products/categorySlice'
import { useDispatch, useSelector } from 'react-redux'

import { fetchCategoriesData } from './CategoryApiService'
import { useEffect } from 'react'

export function CategoriesLoader() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const categories = state.categories

  const handleGetCategories = async () => {
    try {
      dispatch(categroiesRequest())
      const res = await fetchCategoriesData()
      dispatch(categroiesSuccess(res.payload))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    handleGetCategories()
  }, [])
  return <div>{categories.isLoading && <h3> Loading categories...</h3>}</div>
}
