export function paginate<T>(items: T[], currentPage: number, itemsPerPage: number): T[] {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const paginatedItems = items.slice(startIndex, endIndex)

  return paginatedItems
}
