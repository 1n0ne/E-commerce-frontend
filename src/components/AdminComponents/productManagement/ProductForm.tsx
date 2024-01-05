import { ChangeEvent, FormEvent } from 'react'

import { CategoriesLoader } from '../../Services/CategoriesLoader'
import { Product } from '../../../redux/slices/products/productSlice'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'

type ProductFormProps = {
  product: Product
  handleSubmit: (e: FormEvent) => void
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void
  errors: { [key: string]: string }
}

export function ProductForm({
  product,
  handleSubmit,
  handleChange,
  handleImageChange,
  errors
}: ProductFormProps) {
  const state = useSelector((state: RootState) => state)
  const categories = state.categories
  const inputStyle =
    'w-full px-3 py-2 text-gray-800 border rounded-lg focus:outline-none focus:border-blue-400'
  const labelStyle = 'block text-sm font-medium text-gray-600'
  const errorStyle = 'text-red-500 text-sm mt-1'

  return (
    <form onSubmit={handleSubmit}>
      <CategoriesLoader />
      <div className="mb-4">
        <label htmlFor="name" className={labelStyle}>
          Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={product.name}
          onChange={handleChange}
          className={inputStyle}
        />
        {errors.name && <div className={errorStyle}>{errors.name}</div>}
      </div>
      <div className="mb-4">
        <label htmlFor="image" className={labelStyle}>
          Image:
        </label>
        <input type="file" accept="image/*" name="image" id="image" onChange={handleImageChange} />
        {errors.image && <div className={errorStyle}>{errors.image}</div>}
      </div>
      <div className="mb-4">
        <label htmlFor="description" className={labelStyle}>
          Description:
        </label>
        <textarea
          name="description"
          id="description"
          value={product.description}
          onChange={handleChange}
          className={inputStyle}
        />
        {errors.description && <div className={errorStyle}>{errors.description}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="category" className={labelStyle}>
          Categories:
        </label>
        <select
          name="category"
          id="category"
          value={product.category}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          <option value="">Select a category</option>
          {categories.category.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="variants" className={labelStyle}>
          Variants: (use comma , to create multiple)
        </label>
        <input
          type="text"
          name="variants"
          id="variants"
          value={product.variants.join(',')}
          onChange={handleChange}
          className={inputStyle}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="sizes" className={labelStyle}>
          Sizes: (use comma , to create multiple)
        </label>
        <input
          type="text"
          name="sizes"
          id="sizes"
          value={product.sizes.join(',')}
          onChange={handleChange}
          className={inputStyle}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className={labelStyle}>
          Price:
        </label>
        <input type="text" name="price" id="price" onChange={handleChange} className={inputStyle} />
      </div>
      <div className="mb-4">
        <label htmlFor="quantity" className={labelStyle}>
          Quantity:
        </label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={product.quantity}
          onChange={handleChange}
          className={inputStyle}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="sold" className={labelStyle}>
          Sold:
        </label>
        <input
          type="number"
          name="sold"
          id="sold"
          value={product.sold}
          onChange={handleChange}
          className={inputStyle}
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
        Submit
      </button>
    </form>
  )
}
