import { AppDispatch, RootState } from '../../redux/store'
import { productsRequest, productsSuccess } from '../../redux/slices/products/productSlice'
import { useDispatch, useSelector } from 'react-redux'

import { fetchProductsData } from './ProductApiService'
import { useEffect } from 'react'

export function ProductsLoader() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const products = state.products

  const handleGetProducts = async () => {
    try {
      dispatch(productsRequest())
      const res = await fetchProductsData()
      dispatch(productsSuccess(res.payload.products))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    handleGetProducts()
  }, [])

  return <div>{products.isLoading && <h3> Loading products...</h3>}</div>
}
