export default function AddEmployeePopUp({ setshowCreatePopUp }) {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Add Employee
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Create a new employee record
            </p>
          </div>

          <button
            onClick={() => setshowCreatePopUp(false)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                First Name
              </label>
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-slate-500 focus:outline-none"
                placeholder="John"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Last Name
              </label>
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-slate-500 focus:outline-none"
                placeholder="Doe"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-slate-500 focus:outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Phone
              </label>
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-slate-500 focus:outline-none"
                placeholder="+91 9876543210"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Gender
              </label>
              <select className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-slate-500 focus:outline-none">
                <option>Select Gender</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Date of Birth
              </label>
              <input
                type="date"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-slate-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Cancel
          </button>

          <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
            Create Employee
          </button>
        </div>
      </div>
    </div>
  );
}
