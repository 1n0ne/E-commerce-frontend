import 'react-toastify/dist/ReactToastify.css'

import { Category, addCategroy } from '../../../redux/slices/products/categorySlice'
import { ChangeEvent, FormEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { AppDispatch } from '../../../redux/store'
import { CategoryForm } from './CategoryForm'
import axios from 'axios'
import { createCategory } from '../../Services/CategoryApiService'
import { useDispatch } from 'react-redux'
import { validateCategories } from './categoryFormValidate'

const initialCategoryState: Category = {
  _id: '',
  name: ''
}
type PropsType = {
  closeForm: React.Dispatch<React.SetStateAction<boolean>>
}

export function NewCategoryWrapper({ closeForm }: PropsType) {
  const dispatch = useDispatch<AppDispatch>()
  const [category, setCategory] = useState<Category>(initialCategoryState)
  const errors = validateCategories(category)
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setCategory({
      ...category,
      [name]: value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (Object.keys(errors).length > 0) {
      return
    }
    try {
      const res = await createCategory(category)
      toast.success(res.message)
      dispatch(addCategroy({ category: res.payload }))
      closeForm(false)
      setCategory(initialCategoryState)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errResp = error.response?.data.message
        toast.error(errResp)
      } else {
        toast.error('somthing wend wrong pleas try again')
      }
    }
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <ToastContainer />
        <h2 className="font-bold text-xl">Adding New Product</h2>
        <button onClick={() => closeForm(false)} className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="red"
            className="w-10 h-10">
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <CategoryForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        category={category}
        errors={errors}
      />
    </div>
  )
}
