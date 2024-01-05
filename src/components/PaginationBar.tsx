import React from 'react'

type PaginationProps = {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (pageNumber: number) => void
}

export function PaginationBar({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="flex justify-center mt-4 mb-20">
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`px-3 py-2 mx-1 rounded ${
            pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}>
          {pageNumber}
        </button>
      ))}
    </div>
  )
}
