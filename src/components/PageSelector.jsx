export default function PageSizeSelector({
  pageSize,
  setPageSize,
  setPageNumber,
}) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="page-size" className="text-sm font-medium text-slate-500">
        Show
      </label>
      <select
        id="page-size"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setPageNumber(1);
        }}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      >
        <option value={6}>6 items</option>
        <option value={10}>10 items</option>
        <option value={20}>20 items</option>
      </select>
    </div>
  );
}
