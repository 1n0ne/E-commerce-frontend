import { Link } from 'react-router-dom'
import { RootState } from '../redux/store'
import { useSelector } from 'react-redux'

export function Products() {
  const products = useSelector((state: RootState) => state.products)

  const limitedProducts = products.items.slice(0, 8) // Get the first 8 products

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-20">
      <h2 className="text-3xl font-bold mt-10 mb-10">Top Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {limitedProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-lg">
            <Link to={`/product/${product._id}/${encodeURIComponent(product.name)}`}>
              <div className="aspect-w-4 aspect-h-5">
                <img src={product.image} alt={product.name} className="object-cover rounded-t-lg" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">${product.price}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Buy Now
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
