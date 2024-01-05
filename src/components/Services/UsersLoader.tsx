import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { userRequest, userSuccess } from '../../redux/slices/users/usersSlice'

import { fetchUsersData } from './UserApiService'
import { useEffect } from 'react'

export function UsersLoader() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const users = state.users

  const handelGetUsers = async () => {
    try {
      dispatch(userRequest())
      const res = await fetchUsersData()
      dispatch(userSuccess(res.payload.users))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    handelGetUsers()
  }, [])

  return <div>{users.isLoading && <h3> Loading Users...</h3>}</div>
}
