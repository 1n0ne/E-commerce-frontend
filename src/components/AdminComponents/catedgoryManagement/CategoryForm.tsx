import { ChangeEvent, FormEvent } from 'react'

import { Category } from '../../../redux/slices/products/categorySlice'

type CategoryFormProps = {
  category: Category
  handleSubmit: (e: FormEvent) => void
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  errors: { [key: string]: string }
}

export function CategoryForm({ category, handleSubmit, handleChange, errors }: CategoryFormProps) {
  const inputStyle =
    'w-full px-3 py-2 text-gray-800 border rounded-lg focus:outline-none focus:border-blue-400'
  const labelStyle = 'block text-sm font-medium text-gray-600'
  const errorStyle = 'text-red-500 text-sm mt-1'

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className={labelStyle}>
          Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={category.name}
          onChange={handleChange}
          className={inputStyle}
        />
        {errors.name && <div className={errorStyle}>{errors.name}</div>}
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
        Submit
      </button>
    </form>
  )
}
