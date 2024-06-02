// type PaginationProps = {
//   paginationData: number[]
//   currentPage: number
//   onPageChange: (page: number) => void
// }

// export default function Pagination({
//   paginationData,
//   currentPage,
//   onPageChange
// }: PaginationProps) {
//   const currentPageNumber =
//     typeof currentPage === "string" ? parseInt(currentPage) : currentPage

//   return (
//     <div className="flex justify-center mt-8">
//       {paginationData.map((_, index) => (
//         <button
//           key={index}
//           className={`mx-2 py-2 px-4 rounded ${
//             currentPageNumber === index + 1
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200"
//           }`}
//           onClick={() => onPageChange(index + 1)}>
//           {index + 1}
//         </button>
//       ))}
//     </div>
//   )
// }
type PaginationProps = {
  paginationData: number[]
  currentPage: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  paginationData,
  currentPage,
  onPageChange
}: PaginationProps) {
  const currentPageNumber =
    typeof currentPage === "string" ? parseInt(currentPage) : currentPage
  const totalPages = paginationData.length

  const handleFirstClick = () => {
    onPageChange(1)
  }

  const handleLastClick = () => {
    onPageChange(totalPages)
  }

  const handlePreviousClick = () => {
    if (currentPageNumber > 1) {
      onPageChange(currentPageNumber - 1)
    }
  }

  const handleNextClick = () => {
    if (currentPageNumber < totalPages) {
      onPageChange(currentPageNumber + 1)
    }
  }

  return (
    <div className="flex justify-center mt-8">
      <button
        className={`mx-2 py-2 px-4 rounded bg-gray-100 ${
          currentPageNumber === 1
            ? "cursor-not-allowed text-grey_200"
            : "text-grey_400"
        }`}
        onClick={handleFirstClick}
        disabled={currentPageNumber === 1}>
        &lt;&lt;
      </button>
      <button
        className={`mx-2 py-2 px-4 rounded bg-gray-100 ${
          currentPageNumber === 1
            ? "cursor-not-allowed text-grey_200"
            : "text-grey_400"
        }`}
        onClick={handlePreviousClick}
        disabled={currentPageNumber === 1}>
        &lt;
      </button>
      {paginationData.map((_, index) => (
        <button
          key={index}
          className={`mx-2 py-2 px-4 rounded ${
            currentPageNumber === index + 1 ? "bg-[#0D787A] text-white" : ""
          }`}
          onClick={() => onPageChange(index + 1)}>
          {index + 1}
        </button>
      ))}
      <button
        className={`mx-2 py-2 px-4 rounded bg-gray-100 ${
          currentPageNumber === totalPages
            ? "cursor-not-allowed text-grey_200"
            : "text-grey_400"
        }`}
        onClick={handleNextClick}
        disabled={currentPageNumber === totalPages}>
        &gt;
      </button>
      <button
        className={`mx-2 py-2 px-4 rounded bg-gray-100 ${
          currentPageNumber === totalPages
            ? "cursor-not-allowed text-grey_200"
            : "text-grey_400"
        }`}
        onClick={handleLastClick}
        disabled={currentPageNumber === totalPages}>
        &gt;&gt;
      </button>
    </div>
  )
}
