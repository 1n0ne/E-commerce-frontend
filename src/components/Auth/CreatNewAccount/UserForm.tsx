import { ChangeEvent, FormEvent } from 'react'

import { User } from '../../../redux/slices/users/usersSlice'

type UserFormProps = {
  user: User
  handleSubmit: (e: FormEvent) => void
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  errors: { [key: string]: string }
  usedFor: string
}
export function UserForm({ usedFor, user, handleSubmit, handleChange, errors }: UserFormProps) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="text-red-500 mt-2">{errors.name}</div>
        <div className="mb-4">
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder=" Name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="text-red-500 mt-2">{errors.email}</div>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="text-red-500 mt-2">{errors.phone}</div>
        <div className="">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          {usedFor === 'Creat Account' && (
            <>
              <div className="text-red-500 mt-2">{errors.password}</div>
              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="address"
            name="address"
            value={user.address}
            onChange={handleChange}
            placeholder="adress"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full mb-4 bg-blue-500 text-white mt-2 py-2 px-4 rounded focus:outline-none hover:bg-blue-600">
          {usedFor}
        </button>
      </form>
    </div>
  )
}
