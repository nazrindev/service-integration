import { useState, useEffect } from "react";
import { createEmployee } from "../../services/EmployeeService";

export default function AddEmployeePopUp({ setshowCreatePopUp }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    personalEmail: "",
    mobileNumber: "",
    postalAddress: "",
    gender: 0,
    country: "",
    city: "",
    designation: 0,
    basicPay: 0,
    needTransportation: false,
    notes: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dob = new Date(formData.dateOfBirth);
    const today = new Date();
    if (dob > today) {
      alert("Date of Birth cannot be a future date.");
      return;
    }

    const payload = {
      ...formData,
      gender: Number(formData.gender),
      designation: Number(formData.designation),
      basicPay: Number(formData.basicPay),
    };

    try {
      await createEmployee(payload);
      alert("Employee Added Successfully");
      setshowCreatePopUp(false);
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  return (
    // FIX 2: This container now rigidly acts as a true screen-sized backdrop overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 w-screen h-screen">
      {/* Click outside to close helper option (Optional but helpful structural layer) */}
      <div
        className="absolute inset-0"
        onClick={() => setshowCreatePopUp(false)}
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex flex-col max-h-[90vh] w-full max-w-5xl rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 rounded-t-2xl">
          <h2 className="text-xl font-semibold text-slate-900">Add Employee</h2>
          <button
            type="button"
            onClick={() => setshowCreatePopUp(false)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* FIX 3: Isolated scrolling context to form fields area ONLY */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                First Name
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleOnChange}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Last Name
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleOnChange}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleOnChange}
                required
                max={new Date().toISOString().split("T")[0]}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Personal Email
              </label>
              <input
                type="email"
                name="personalEmail"
                value={formData.personalEmail}
                onChange={handleOnChange}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Mobile Number
              </label>
              <input
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleOnChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Username
              </label>
              <input
                name="username"
                value={formData.username}
                onChange={handleOnChange}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Basic Pay
              </label>
              <input
                type="number"
                name="basicPay"
                value={formData.basicPay}
                onChange={handleOnChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleOnChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 bg-white"
              >
                <option value={0}>Select Gender</option>
                <option value={1}>Male</option>
                <option value={2}>Female</option>
                <option value={3}>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Designation
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleOnChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 bg-white"
              >
                <option value={0}>Select Designation</option>
                <option value={1}>Developer</option>
                <option value={2}>Designer</option>
                <option value={3}>Manager</option>
                <option value={4}>HR</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Country
              </label>
              <input
                name="country"
                value={formData.country}
                onChange={handleOnChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                City
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={handleOnChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              />
            </div>

            <div className="lg:col-span-3">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Postal Address
              </label>
              <textarea
                name="postalAddress"
                rows={3}
                value={formData.postalAddress}
                onChange={handleOnChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              />
            </div>

            <div className="lg:col-span-3">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleOnChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              />
            </div>

            <div className="lg:col-span-3 flex items-center gap-3">
              <input
                type="checkbox"
                name="needTransportation"
                id="needTransportation"
                checked={formData.needTransportation}
                onChange={handleOnChange}
                className="h-4 w-4 rounded text-slate-900 focus:ring-slate-900"
              />
              <label
                htmlFor="needTransportation"
                className="text-sm font-medium text-slate-700 select-none"
              >
                Need Transportation
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4 bg-white rounded-b-2xl">
          <button
            type="button"
            onClick={() => setshowCreatePopUp(false)}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Create Employee
          </button>
        </div>
      </form>
    </div>
  );
}
