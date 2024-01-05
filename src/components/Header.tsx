import CartIcon from './CartIcon'
import { CategoriesFilter } from './CatogoriesFilter'
import { CategoriesLoader } from './Services/CategoriesLoader'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import LogoutButton from './Auth/Logout'
import { ProductsLoader } from './Services/ProductsLoader'
import { RootState } from '../redux/store'
import { SearchProducts } from './SearchProuduct'
import { useSelector } from 'react-redux'

export function Header() {
  const user = JSON.parse(localStorage.getItem('authUser') || '{}')
  const isUserEmpty = Object.keys(user).length === 0
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="fixed  w-full top-0 left-0 py-1.5 test-left leading-6 bg-white z-10 shadow">
      <ProductsLoader />
      <CategoriesLoader />
      <nav className="bg-white px-3 sm:px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="mr-4 h-6 mb-2 sm:h-9">
            <Logo />
          </div>
          <div className="flex items-center">
            <div className="my-2 sm:my-0 sm:mr-0">
              <CategoriesFilter source="header" />
            </div>
            <div className="my-2 sm:my-0 flex-grow">
              <SearchProducts />
            </div>
          </div>
          <ul className="flex flex-wrap gap-2 ">
            <li>
              {!isUserEmpty ? (
                <div className="flex items-center">
                  <Link
                    to={`/UserProfile/${user.id}/${user.firstName}`}
                    className="hover:text-blue-500 flex flex-col items-center ">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="mt-1">{user.name}</div>
                  </Link>
                  <div className="ml-4">
                    <LogoutButton />
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <Link to={`/Login`} className="hover:text-blue-500">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="mt-1">Login</div>
                  </Link>
                </div>
              )}
            </li>
            <li>
              <div className="ml-4 flex flex-col items-center hover:text-blue-500">
                <Link to={`/cart`} className="hover:text-blue-500">
                  <CartIcon itemCount={getTotalItems()} />
                  <div className="mt-1">Cart</div>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header
