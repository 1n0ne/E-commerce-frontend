import { ActivateAccount } from '../components/Auth/CreatNewAccount/ActivateAccount'
import { Admin } from './AuthrizedAdmin/Admin'
import AllProducts from './Products/ProductsList'
import Cart from '../components/Cart'
import { ExistUserWarpper } from '../components/Auth/Login/ExistUserWarpper'
import { ForgetPassword } from '../components/Auth/Froget&RestPassword/ForgetPassword'
import Home from './Home/Home'
import { NewUserWrapper } from '../components/Auth/CreatNewAccount/NewUserWrapper'
import ProductPage from '../components/SingleProduct'
import ProtectedRoute from '../components/ProtectedRoute'
import { ResetPassword } from '../components/Auth/Froget&RestPassword/ResertPasswrord'
import { User } from './AuthrizedUser/User'
import { routerType } from '../types/router.types'

const pagesData: routerType[] = [
  {
    path: '',
    element: <Home />,
    title: 'home'
  },

  {
    path: 'All-Products',
    element: <AllProducts />,
    title: 'All-Product-'
  },

  {
    path: 'product/:productId/:productName',
    element: <ProductPage />,
    title: 'Product',
    params: {
      productId: '',
      productName: ''
    }
  },
  {
    path: '*',
    element: <Home />,
    title: 'Not Found'
  },
  {
    path: 'CreatAccount',
    element: <NewUserWrapper />,
    title: 'Create Account'
  },
  {
    path: 'users/activate/:token',
    element: <ActivateAccount />,
    title: 'Activate Account'
  },
  {
    path: 'Login',
    element: <ExistUserWarpper />,
    title: 'Login'
  },
  {
    path: '/UserProfile/:id/:firstName',
    element: <ProtectedRoute element={<User />} />,
    title: 'User Profile',
    params: {
      firstName: '',
      id: ''
    }
  },
  {
    path: '/Admin/:id/:firstName',
    element: <ProtectedRoute element={<Admin />} />,
    title: 'Admin panel',
    params: {
      firstName: '',
      id: ''
    }
  },
  {
    path: '/cart',
    element: <Cart />,
    title: 'shoping Cart'
  },
  { path: '/forgetPassword', element: <ForgetPassword />, title: 'forget-password' },
  { path: 'users/resetPassword/:token', element: <ResetPassword />, title: 'reset-password' }
]

export default pagesData
