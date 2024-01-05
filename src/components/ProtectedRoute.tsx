import { Navigate, useLocation } from 'react-router-dom'

import { Admin } from '../pages/AuthrizedAdmin/Admin'
import { User } from '../pages/AuthrizedUser/User'

interface AuthRouteProps {
  element: JSX.Element
}

const ProtectedRoute = ({ element }: AuthRouteProps) => {
  const isAuthenticated = JSON.parse(localStorage.getItem('authState') || 'false')
  const user = JSON.parse(localStorage.getItem('authUser') || '{}')
  const location = useLocation()

  const isAdminRoute = (pathname: string): boolean => {
    const adminRoutes = [`/Admin/${user.id}/${user.firstName}`]
    return adminRoutes.includes(pathname)
  }

  const isVisitorRoute = (pathname: string): boolean => {
    const visitorRoutes = [
      `/${user.id}/${user.firstName}`,
      `/UserProfile/${user.id}/${user.firstName}`
    ]
    return visitorRoutes.includes(pathname)
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user.role === 'admin' && !isAdminRoute(location.pathname)) {
    return <Admin />
  }

  if (user.role === 'visitor' && !isVisitorRoute(location.pathname)) {
    return <User />
  }

  return element
}

export default ProtectedRoute
