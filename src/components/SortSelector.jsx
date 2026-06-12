export default function SortSelector({
  sortField,
  sortDirection,
  setSortField,
  setSortDirection,
  setPageNumber,
}) {
  const selectClass =
    "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-field" className="text-sm font-medium text-slate-500">
        Sort by
      </label>
      <select
        id="sort-field"
        value={sortField}
        onChange={(e) => {
          setSortField(e.target.value);
          setPageNumber(1);
        }}
        className={selectClass}
      >
        <option value="id">ID</option>
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
      </select>

      <select
        id="sort-direction"
        value={sortDirection}
        onChange={(e) => {
          setSortDirection(e.target.value);
          setPageNumber(1);
        }}
        className={selectClass}
        aria-label="Sort direction"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
