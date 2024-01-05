export default function PaginationButtons({
  nextPage,
  prevPage,
  page,
  limit,
  dataLength,
}) {
  return (
    <div className="flex justify-between gap-5 items-center w-10/12 mt-10">
      <button
        className={`pagination-button ${page === 1 ? "inactive" : ""}`}
        onClick={prevPage}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button
        className={`pagination-button ${dataLength < limit ? "inactive" : ""}`}
        onClick={nextPage}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
}
