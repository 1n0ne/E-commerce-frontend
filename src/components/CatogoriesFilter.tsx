import { AppDispatch, RootState } from '../redux/store'
import { setFilterdCategories, setSearchedCategories } from '../redux/slices/products/categorySlice'
import { useDispatch, useSelector } from 'react-redux'

import { ChangeEvent } from 'react'

type CategoriesFilterProps = {
  source: string
}

export function CategoriesFilter({ source }: CategoriesFilterProps) {
  const dispatch = useDispatch<AppDispatch>()
  const categories = useSelector((state: RootState) => state.categories)

  function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
    const selectedValue = event.target.value

    if (source === 'header') {
      dispatch(setSearchedCategories(selectedValue))
    }
    if (source === 'AllProducts') {
      dispatch(setFilterdCategories(selectedValue))
    }
  }

  return (
    <div>
      <form>
        <label htmlFor="filter" className="sr-only">
          Sort By
        </label>
        <select
          id="filter"
          onChange={handleSelect}
          className="border border-gray-300 rounded-sm py-2 px-3 hover:bg-transparent focus:outline-none">
          <option value={''}>ALL</option>
          {categories.category.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  )
}
