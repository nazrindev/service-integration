export default function AddEmployeeButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
    >
      Create Employee
    </button>
  );
}
