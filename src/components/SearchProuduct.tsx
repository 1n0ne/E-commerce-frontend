import { AppDispatch, RootState } from '../redux/store'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { searchProduct } from '../redux/slices/products/productSlice'

export function SearchProducts() {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state: RootState) => state.products)
  const categories = useSelector((state: RootState) => state.categories)
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  function handleLinkClick(): void {
    setDropdownOpen(false)
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const searchTerm = event.target.value
    dispatch(searchProduct(searchTerm))
    setDropdownOpen(true)
    setDropdownOpen(searchTerm.length > 0)
  }

  const SelectedItems =
    categories.searchId !== ''
      ? products.items.filter((product) => product.category[0] === categories.searchId)
      : products.items

  const searchedItems = products.searchTerm
    ? SelectedItems.filter((product) =>
        product.name.toLowerCase().includes(products.searchTerm.toLowerCase())
      )
    : SelectedItems

  return (
    <div className="relative">
      <form className="relative flex items-center">
        <label htmlFor="search" className="sr-only">
          Search Product
        </label>
        <input
          id="search"
          name="search"
          onChange={handleChange}
          placeholder="Search For Product"
          className="border border-gray-300 rounded-sm py-2 px-3 pr-10 hover:bg-transparent focus:outline-none"
        />
        <span className="absolute right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 28 28"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-9 h-10 text-white bg-blue-500 p-1">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
      </form>
      {isDropdownOpen && (
        <div className="absolute top-full left-0 w-full">
          <ul className="border border-gray-300 bg-white">
            {searchedItems.map((product) => (
              <li key={product._id}>
                <Link
                  to={`/product/${product._id}/${encodeURIComponent(product.name)}`}
                  onClick={handleLinkClick}
                  className="block py-2 px-3 hover:bg-gray-200 transition-colors duration-300">
                  <span>{product.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
