import { Category } from '../../../redux/slices/products/categorySlice'

export function validateCategories(categories: Category) {
  const errors: { [key: string]: string } = {}

  if (!categories.name || categories.name.length === 0) {
    errors.name = 'Add the category name'
  }

  return errors
}
