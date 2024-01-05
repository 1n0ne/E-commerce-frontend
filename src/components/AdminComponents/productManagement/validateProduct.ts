import { Product } from '../../../redux/slices/products/productSlice'

export function validateProduct(product: Product) {
  const errors: { [key: string]: string } = {}

  if (!product.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!product.description.trim()) {
    errors.description = 'Description is required'
  }

  return errors
}
