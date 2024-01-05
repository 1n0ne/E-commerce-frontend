import { RootState } from '../../../redux/store'
import { User } from '../../../redux/slices/users/usersSlice'
import { useSelector } from 'react-redux'

export function validateUser(user: User) {
  const errors: { [key: string]: string } = {}

  const users = useSelector((state: RootState) => state.users)
  const ExistUser = users.users.find((existingUser) => existingUser.email === user.email)
  const currentUser = JSON.parse(localStorage.getItem('authUser') || '{}')
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^\d{10}$/

  if (!user.name.trim()) {
    errors.name = ' Name is required'
  }
  if (!user.email.trim) {
    errors.email = 'Email is required'
  } else if (!emailRegex.test(user.email)) {
    errors.email = 'Enter a valid email'
  } else if (ExistUser && ExistUser._id !== currentUser._id) {
    errors.email = 'User with this email already exists'
  }
  if (!user.phone.trim()) {
    errors.phone = 'Phone number is required'
  } else if (!phoneRegex.test(user.phone)) {
    errors.phone = 'Enter a valid phone number'
  }
  if (!user.password) {
    errors.password = 'Password is required'
  } else if (user.password.length < 6) {
    errors.password = 'Password should be at least 6 characters long'
  }

  return errors
}
