import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 1) return [1];

  const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);

  const sorted = [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const result = [];
  let previous = 0;

  for (const page of sorted) {
    if (previous && page - previous > 1) {
      result.push("ellipsis");
    }
    result.push(page);
    previous = page;
  }

  return result;
}

export default function Pagination({
  pageNumber,
  setPageNumber,
  totalPages,
}) {
  const pageNumbers = getPageNumbers(pageNumber, totalPages);

  const navButtonClass =
    "flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-300";

  const pageButtonClass = (isActive) =>
    `flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium transition ${
      isActive
        ? "border-indigo-600 bg-indigo-600 text-white shadow-sm"
        : "border-slate-200 bg-white text-slate-600 shadow-sm hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
    }`;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-medium text-slate-500">
        Page <span className="text-slate-800">{pageNumber}</span> of{" "}
        <span className="text-slate-800">{totalPages}</span>
      </p>

      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber === 1}
          className={navButtonClass}
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>

        {pageNumbers.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-9 w-9 items-center justify-center text-sm text-slate-400"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => setPageNumber(item)}
              aria-label={`Go to page ${item}`}
              aria-current={item === pageNumber ? "page" : undefined}
              className={pageButtonClass(item === pageNumber)}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => setPageNumber((prev) => Math.min(prev + 1, totalPages))}
          disabled={pageNumber >= totalPages}
          className={navButtonClass}
          aria-label="Next page"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
