import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'

import { CategoriesLoader } from './Services/CategoriesLoader'
import Footer from './Footer'
import Header from './Header'
import { Product } from '../redux/slices/products/productSlice'
import { ProductsLoader } from './Services/ProductsLoader'
import { addToCart } from '../redux/slices/cart/CartSlice'
import { useParams } from 'react-router-dom'

function ProductPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { productId } = useParams()
  const products = useSelector((state: RootState) => state.products)
  const product = products.items.find((product: Product) => product._id === productId)
  const categories = useSelector((state: RootState) => state.categories)
  const productCategory = categories.category.find(
    (category) => category._id === product?.category[0]
  )
  const handleAddToCart = (product: Product, quantity: number) => {
    dispatch(addToCart({ product, quantity }))
  }

  return (
    <div>
      <ProductsLoader />
      <CategoriesLoader />
      <Header />
      <div className="mt-20 ">
        {product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-20 mr-20">
            <div>
              <img src={product.image} alt={product.name} className="w-50" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <p className="mb-4">{product.description}</p>
              <p className="text-lg mb-2">${product.price}</p>
              <p className="flex justify-start">
                {product.variants.length > 0 && (
                  <>
                    <p className="mr-2">Variant: </p>
                    {product.variants.map((variant, index) => (
                      <div key={index} className="mr-2">
                        <input
                          type="radio"
                          id={`variant_${index}`}
                          name="variants"
                          value={variant}
                        />
                        <label htmlFor={`variant_${index}`}>{variant}</label>
                      </div>
                    ))}
                  </>
                )}
              </p>
              <p className="flex justify-start">
                {product.sizes.length > 0 && (
                  <>
                    <p className="mr-2">Size: </p>
                    {product.sizes.map((size, index) => (
                      <div key={index} className="mr-2">
                        <input type="radio" id={`size_${index}`} name="sizes" value={size} />
                        <label htmlFor={`size_${index}`}>{size}</label>
                      </div>
                    ))}
                  </>
                )}
              </p>
              <p className="flex justify-start">
                <div className="mr-2 mb-5 mt-2">
                  <p className="bg-gray-200 rounded-lg px-1 py-1">
                    {productCategory && productCategory.name}
                  </p>
                </div>
              </p>
              <button
                onClick={() => handleAddToCart(product, 1)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Move to Cart
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default ProductPage
