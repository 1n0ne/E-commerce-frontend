import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <div className="logo">
      <Link to={`/`} className="flex items-center hover:text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="blue"
          className="w-6 h-6 ">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
        <h1 className="font-bold">ELECTRO STORE</h1>
      </Link>
    </div>
  )
}
