import { useState, useEffect } from "react";
import { createEmployee, updateEmployee } from "../../services/EmployeeService";
import { DESIGNATIONS, GENDERS } from "../../constants/lookups";
import StatusMessage from "../../components/StatusMessage";
import { validateEmployeeForm } from "../../utils/validation";
import {
  isEmployeeNotFound,
  isEmployeeNotFoundError,
  isEmployeeApiFailure,
  getEmployeeApiErrorMessage,
} from "../../utils/employeeResponse";
import RequiredMark from "../../components/RequiredMark";

const EMPTY_FORM = {
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
};

function mapEmployeeToForm(employee) {
  return {
    firstName: employee.firstName ?? "",
    lastName: employee.lastName ?? "",
    dateOfBirth: employee.dateOfBirth
      ? employee.dateOfBirth.split("T")[0]
      : "",
    personalEmail: employee.personalEmail ?? "",
    mobileNumber: employee.mobileNumber ?? "",
    postalAddress: employee.postalAddress ?? "",
    gender: employee.gender ?? 0,
    country: employee.country ?? "",
    city: employee.city ?? "",
    designation: employee.designation ?? 0,
    basicPay: employee.basicPay ?? 0,
    needTransportation: employee.needTransportation ?? false,
    notes: employee.notes ?? "",
    username: employee.username ?? "",
    password: "",
  };
}

export default function EmployeeFormPopUp({
  employee,
  onClose,
  onSuccess,
  onNotFound,
}) {
  const isEditMode = Boolean(employee?.employeeID);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    setFormData(employee ? mapEmployeeToForm(employee) : EMPTY_FORM);
    setErrors({});
    setStatusMessage(null);
  }, [employee]);

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleApiFailure = (data) => {
    const message = getEmployeeApiErrorMessage(data);
    setStatusMessage({ type: "error", message });

    if (/email/i.test(message)) {
      setErrors((prev) => ({ ...prev, personalEmail: message }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateEmployeeForm(formData, isEditMode);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatusMessage({
        type: "warning",
        message: "Please fix the errors below before submitting.",
      });
      return;
    }

    const payload = {
      ...formData,
      gender: Number(formData.gender),
      designation: Number(formData.designation),
      basicPay: Number(formData.basicPay),
    };

    if (isEditMode) {
      payload.employeeID = employee.employeeID;
      if (!payload.password) {
        delete payload.password;
      }
    }

    try {
      setStatusMessage(null);

      if (isEditMode) {
        const data = await updateEmployee(employee.employeeID, payload);

        if (isEmployeeNotFound(data)) {
          onNotFound?.();
          return;
        }

        if (isEmployeeApiFailure(data)) {
          handleApiFailure(data);
          return;
        }
      } else {
        const data = await createEmployee(payload);

        if (isEmployeeApiFailure(data)) {
          handleApiFailure(data);
          return;
        }
      }

      onSuccess?.(isEditMode ? "edit" : "add");
      onClose();
    } catch (error) {
      console.error(error);
      const errorData = error.response?.data;

      if (isEmployeeNotFoundError(error)) {
        onNotFound?.();
        return;
      }

      if (isEmployeeApiFailure(errorData)) {
        handleApiFailure(errorData);
        return;
      }

      setStatusMessage({
        type: "error",
        message:
          errorData?.errorMessage ||
          errorData?.message ||
          errorData?.title ||
          `Failed to ${isEditMode ? "update" : "create"} employee. Please try again.`,
      });
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

  const fieldClass = (name) =>
    `${inputClass} ${
      errors[name]
        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
        : ""
    }`;

  const FieldError = ({ name }) =>
    errors[name] ? (
      <p className="mt-1 text-xs text-red-600">{errors[name]}</p>
    ) : null;

  const FieldLabel = ({ children, required = true }) => (
    <label className="mb-1 block text-sm font-medium text-slate-700">
      {children}
      {required && <RequiredMark />}
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <form
        onSubmit={handleSubmit}
        noValidate
        className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between rounded-t-2xl border-b border-slate-200 bg-white px-6 py-5">
          <h2 className="text-xl font-semibold text-slate-900">
            {isEditMode ? "Edit Employee" : "Add Employee"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {statusMessage && (
            <div className="mb-4">
              <StatusMessage
                type={statusMessage.type}
                message={statusMessage.message}
                onClose={() => setStatusMessage(null)}
              />
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <FieldLabel>First Name</FieldLabel>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleOnChange}
                required
                className={fieldClass("firstName")}
              />
              <FieldError name="firstName" />
            </div>

            <div>
              <FieldLabel>Last Name</FieldLabel>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleOnChange}
                className={fieldClass("lastName")}
              />
              <FieldError name="lastName" />
            </div>

            <div>
              <FieldLabel>Date of Birth</FieldLabel>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleOnChange}
                max={new Date().toISOString().split("T")[0]}
                className={fieldClass("dateOfBirth")}
              />
              <FieldError name="dateOfBirth" />
            </div>

            <div>
              <FieldLabel>Personal Email</FieldLabel>
              <input
                type="email"
                name="personalEmail"
                value={formData.personalEmail}
                onChange={handleOnChange}
                className={fieldClass("personalEmail")}
              />
              <FieldError name="personalEmail" />
            </div>

            <div>
              <FieldLabel>Mobile Number</FieldLabel>
              <input
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleOnChange}
                className={fieldClass("mobileNumber")}
              />
              <FieldError name="mobileNumber" />
            </div>

            <div>
              <FieldLabel>Username</FieldLabel>
              <input
                name="username"
                value={formData.username}
                onChange={handleOnChange}
                className={fieldClass("username")}
              />
              <FieldError name="username" />
            </div>

            <div>
              <FieldLabel required={!isEditMode}>Password</FieldLabel>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder={isEditMode ? "Leave blank to keep current password" : ""}
                className={fieldClass("password")}
              />
              <FieldError name="password" />
            </div>

            <div>
              <FieldLabel>Basic Pay</FieldLabel>
              <input
                type="number"
                name="basicPay"
                min="1"
                value={formData.basicPay}
                onChange={handleOnChange}
                className={fieldClass("basicPay")}
              />
              <FieldError name="basicPay" />
            </div>

            <div>
              <FieldLabel>Gender</FieldLabel>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleOnChange}
                className={`${fieldClass("gender")} bg-white`}
              >
                <option value={0}>Select Gender</option>
                {GENDERS.map((gender) => (
                  <option key={gender.id} value={gender.id}>
                    {gender.value}
                  </option>
                ))}
              </select>
              <FieldError name="gender" />
            </div>

            <div>
              <FieldLabel>Designation</FieldLabel>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleOnChange}
                className={`${fieldClass("designation")} bg-white`}
              >
                <option value={0}>Select Designation</option>
                {DESIGNATIONS.map((designation) => (
                  <option key={designation.id} value={designation.id}>
                    {designation.value}
                  </option>
                ))}
              </select>
              <FieldError name="designation" />
            </div>

            <div>
              <FieldLabel>Country</FieldLabel>
              <input
                name="country"
                value={formData.country}
                onChange={handleOnChange}
                className={fieldClass("country")}
              />
              <FieldError name="country" />
            </div>

            <div>
              <FieldLabel>City</FieldLabel>
              <input
                name="city"
                value={formData.city}
                onChange={handleOnChange}
                className={fieldClass("city")}
              />
              <FieldError name="city" />
            </div>

            <div className="lg:col-span-3">
              <FieldLabel>Postal Address</FieldLabel>
              <textarea
                name="postalAddress"
                rows={3}
                value={formData.postalAddress}
                onChange={handleOnChange}
                className={fieldClass("postalAddress")}
              />
              <FieldError name="postalAddress" />
            </div>

            <div className="lg:col-span-3">
              <FieldLabel>Notes</FieldLabel>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleOnChange}
                className={fieldClass("notes")}
              />
              <FieldError name="notes" />
            </div>

            <div className="flex items-center gap-3 lg:col-span-3">
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
                className="select-none text-sm font-medium text-slate-700"
              >
                Need Transportation
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 rounded-b-2xl border-t border-slate-200 bg-white px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {isEditMode ? "Update Employee" : "Create Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}
