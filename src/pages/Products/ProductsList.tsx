import { AppDispatch, RootState } from '../../redux/store'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CategoriesLoader } from '../../components/Services/CategoriesLoader'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'
import { PaginationBar } from '../../components/PaginationBar'
import { Product } from '../../redux/slices/products/productSlice'
import { ProductsLoader } from '../../components/Services/ProductsLoader'
import { addToCart } from '../../redux/slices/cart/CartSlice'
import { paginate } from '../../components/paginationFunction'
import { setFilterdCategories } from '../../redux/slices/products/categorySlice'

function AllProducts() {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state: RootState) => state.products)
  const categories = useSelector((state: RootState) => state.categories)
  const selectedCategory = useSelector((state: RootState) => state.categories)
  const [selectedPrice, setSelectedPrice] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
    const selectedValue = event.target.value
    dispatch(setFilterdCategories(selectedValue))
  }

  const handlePriceChange = (price: number) => {
    setSelectedPrice(price)
  }
  const handleAddToCart = (product: Product, quantity: number) => {
    dispatch(addToCart({ product, quantity }))
  }

  const categoryName =
    categories.filterId === ''
      ? 'All'
      : categories.category.find((e) => e._id === categories.filterId)?.name

  const filteredItems =
    categories.filterId !== ''
      ? products.items.filter((product) => product.category[0] === categories.filterId)
      : products.items

  const filteredItemsByPrice =
    selectedPrice !== 0
      ? filteredItems.filter((product) => product.price <= selectedPrice)
      : filteredItems

  const paginatedProducts = paginate<Product>(filteredItemsByPrice, currentPage, itemsPerPage)

  return (
    <div>
      <ProductsLoader />
      <CategoriesLoader />
      <Header />
      <div className="flex flex-col md:flex-row mt-5">
        <aside className=" md:ml-5 md:w-1/4">
          <h3 className="text-xl mb-2 font-semibold ">Filter by Category:</h3>
          <ul className="py-4">
            <li className="mb-2">
              <button
                className={`w-full text-left text-sm p-2 rounded-lg ${
                  selectedCategory.filterId === '' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() =>
                  handleSelect({ target: { value: '' } } as ChangeEvent<HTMLSelectElement>)
                }>
                All
              </button>
            </li>
            <div>{categories.isLoading && <h3> Loading categories...</h3>}</div>
            {categories.category.map((category) => (
              <li className="mb-2" key={category._id}>
                <button
                  className={`w-full text-left text-sm p-2 rounded-lg ${
                    selectedCategory.filterId === category._id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                  onClick={() =>
                    handleSelect({
                      target: { value: String(category._id) }
                    } as ChangeEvent<HTMLSelectElement>)
                  }>
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
          <div>
            <h3 className="text-xl mb-2 font-semibold ">Filter by Price:</h3>
            <div className="flex items-center">
              <input
                type="range"
                min="0"
                max="10000"
                value={selectedPrice}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none outline-none"
              />
              <span className="ml-2 text-gray-600">${selectedPrice}</span>
            </div>
          </div>
        </aside>
        <main className=" ml-10 md:w-3/4 mt-5">
          <h1 className="text-2xl font-bold mb-4">{categoryName} products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9">
            {paginatedProducts.map((product) => (
              <div className="bg-white rounded-lg p-4" key={product._id}>
                <img src={product.image} alt={product.name} className="w-full h-auto mb-2" />
                <div className="flex justify-between items-center mb-2">
                  <h2 className="ml-5 text-lg font-semibold">{product.name}</h2>
                  <span className="text-gray-600">${product.price}</span>
                </div>
                <div className="flex justify-end">
                  <Link
                    to={`/product/${product._id}/${encodeURIComponent(product.name)}`}
                    className="text-blue-500 hover:text-blue-700">
                    Show more
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product, 1)}
                    className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <PaginationBar
              totalItems={filteredItemsByPrice.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default AllProducts
