import 'react-toastify/dist/ReactToastify.css'

import { AppDispatch, RootState } from '../../../redux/store'
import { Category, upadateCategory } from '../../../redux/slices/products/categorySlice'
import { ChangeEvent, FormEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

import { CategoryForm } from './CategoryForm'
import axios from 'axios'
import { updateCategory } from '../../Services/CategoryApiService'
import { validateCategories } from './categoryFormValidate'

type PropsType = {
  closeForm: React.Dispatch<React.SetStateAction<boolean>>
  categoryId: string
}

export function UpdateCategoryWrapper({ closeForm, categoryId }: PropsType) {
  const dispatch = useDispatch<AppDispatch>()
  const categories = useSelector((state: RootState) => state.categories)
  const UpdatedCategory = categories.category.find((category) => category._id === categoryId)
  const [category, setCategory] = useState<Category>(UpdatedCategory!)
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
      const res = await updateCategory(category)
      toast.success(res.message)
      dispatch(upadateCategory({ category }))
      closeForm(false)
      setCategory(UpdatedCategory!)
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
        <h2 className="font-bold text-xl">Updating Product</h2>
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
