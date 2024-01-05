import 'react-toastify/dist/ReactToastify.css'

import { ChangeEvent, FormEvent, useState } from 'react'
import { Product, addProduct } from '../../../redux/slices/products/productSlice'
import { ToastContainer, toast } from 'react-toastify'

import { AppDispatch } from '../../../redux/store'
import { ProductForm } from './ProductForm'
import axios from 'axios'
import { createProduct } from '../../Services/ProductApiService'
import { useDispatch } from 'react-redux'
import { validateProduct } from './validateProduct'

const initialProductState: Product = {
  _id: '',
  name: '',
  image: '',
  description: '',
  category: '',
  variants: [],
  sizes: [],
  price: 0,
  quantity: 0,
  sold: 0
}
type PropsType = {
  closeForm: React.Dispatch<React.SetStateAction<boolean>>
}

export function NewProductWrapper({ closeForm }: PropsType) {
  const dispatch = useDispatch<AppDispatch>()
  const [product, setProduct] = useState<Product>(initialProductState)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const errors = validateProduct(product)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    const isList = name === 'variants' || name === 'sizes'
    if (isList) {
      setProduct({
        ...product,
        [name]: value.split(',')
      })
      return
    }

    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (Object.keys(errors).length > 0) {
      return
    }

    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('description', product.description)
    formData.append('category', product.category)
    formData.append('variants', product.variants.join(','))
    formData.append('sizes', product.sizes.join(','))
    formData.append('price', String(product.price))
    formData.append('quantity', String(product.quantity))
    formData.append('sold', String(product.sold))

    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      const res = await createProduct(formData)
      toast.success(res.message)
      dispatch(addProduct({ product }))
      closeForm(false)
      setProduct(initialProductState)
      setImageFile(null)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errResp = error.response?.data.message
        toast.error(errResp)
      } else {
        toast.error('Something went wrong. Please try again.')
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
      <ProductForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        product={product}
        errors={errors}
      />
    </div>
  )
}
