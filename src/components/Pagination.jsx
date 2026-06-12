import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Pagination({
  pageNumber,
  setPageNumber,
  pageSize,
  employeeCount,
}) {
  const buttonClass =
    "flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-300";

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        Page <span className="text-slate-800">{pageNumber}</span>
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber === 1}
          className={buttonClass}
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={employeeCount < pageSize}
          className={buttonClass}
          aria-label="Next page"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
