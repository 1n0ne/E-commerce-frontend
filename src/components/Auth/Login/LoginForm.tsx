import { ChangeEvent, FormEvent } from 'react'

import { UserCredentials } from '../../../redux/slices/users/usersSlice'

type UserFormProps = {
  userCredentials: UserCredentials
  handleSubmit: (e: FormEvent) => void
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export function LoginForm({ userCredentials, handleSubmit, handleChange }: UserFormProps) {
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={userCredentials.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              value={userCredentials.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full mb-4 bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
