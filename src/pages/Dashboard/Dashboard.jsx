import { useEffect, useState } from "react";
import {
  deleteEmployee,
  getEmployee,
  getEmployeeCount,
  getEmployees,
} from "../../services/EmployeeService";
import PageSizeSelector from "../../components/PageSelector";
import SortSelector from "../../components/SortSelector";
import EmployeeList from "../../components/EmployeeList";
import Pagination from "../../components/Pagination";
import AddEmployeeButton from "../../components/AddEmployeeButton";
import EmployeeFormPopUp from "../Employees/EmployeeFormPopUp";
import ConfirmPopUp from "../../components/ConfirmPopUp";
import StatusMessage from "../../components/StatusMessage";
import {
  isEmployeeNotFound,
  isEmployeeNotFoundError,
  isEmployeeApiFailure,
  EMPLOYEE_NOT_FOUND_MESSAGE,
} from "../../utils/employeeResponse";

export default function Dashboard() {
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [totalPages, setTotalPages] = useState(1);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [showFormPopUp, setShowFormPopUp] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const fetchEmployees = async () => {
    try {
      const [data, count] = await Promise.all([
        getEmployees(pageSize, pageNumber, sortField, sortDirection),
        getEmployeeCount(),
      ]);

      const employees = data || [];
      setEmployeeList(employees);
      setEmployeeCount(count);
      setTotalPages(Math.max(1, Math.ceil(count / pageSize)));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [pageSize, pageNumber, sortField, sortDirection]);

  const openAddForm = () => {
    setEditingEmployee(null);
    setShowFormPopUp(true);
  };

  const openEditForm = async (employee) => {
    setLoadingEdit(true);

    try {
      const data = await getEmployee(employee.employeeID);

      if (isEmployeeNotFound(data) || isEmployeeApiFailure(data)) {
        handleEmployeeNotFound();
        return;
      }

      setEditingEmployee(data);
      setShowFormPopUp(true);
    } catch (error) {
      console.error(error);

      if (isEmployeeNotFoundError(error)) {
        handleEmployeeNotFound();
        return;
      }

      setStatusMessage({
        type: "error",
        message: "Failed to load employee details. Please try again.",
      });
    } finally {
      setLoadingEdit(false);
    }
  };

  const closeForm = () => {
    setShowFormPopUp(false);
    setEditingEmployee(null);
  };

  const handleEmployeeSaved = (mode) => {
    setStatusMessage({
      type: "success",
      message:
        mode === "edit"
          ? "Employee updated successfully."
          : "Employee created successfully.",
    });
    fetchEmployees();
  };

  const openDeleteConfirm = (employee) => {
    setEmployeeToDelete(employee);
  };

  const closeDeleteConfirm = () => {
    if (!deleting) setEmployeeToDelete(null);
  };

  const handleEmployeeNotFound = () => {
    setShowFormPopUp(false);
    setEditingEmployee(null);
    setEmployeeToDelete(null);
    setStatusMessage({
      type: "error",
      message: EMPLOYEE_NOT_FOUND_MESSAGE,
    });
    fetchEmployees();
  };

  const handleConfirmDelete = async () => {
    if (!employeeToDelete) return;

    setDeleting(true);
    try {
      const data = await deleteEmployee(employeeToDelete.employeeID);

      if (isEmployeeNotFound(data)) {
        handleEmployeeNotFound();
        return;
      }

      setStatusMessage({
        type: "success",
        message: `${employeeToDelete.firstName} ${employeeToDelete.lastName} deleted successfully.`,
      });
      setEmployeeToDelete(null);
      fetchEmployees();
    } catch (error) {
      console.error(error);

      if (isEmployeeNotFoundError(error)) {
        handleEmployeeNotFound();
        return;
      }

      setStatusMessage({
        type: "error",
        message:
          error.response?.data?.errorMessage ||
          error.response?.data?.message ||
          error.response?.data?.title ||
          "Failed to delete employee. Please try again.",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {statusMessage && (
        <StatusMessage
          type={statusMessage.type}
          message={statusMessage.message}
          onClose={() => setStatusMessage(null)}
          autoDismissMs={statusMessage.type === "success" ? 4000 : undefined}
        />
      )}

      {loadingEdit && (
        <p className="rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-600">
          Loading employee details...
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Employee List
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {employeeCount} employee{employeeCount !== 1 ? "s" : ""} total
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SortSelector
            sortField={sortField}
            sortDirection={sortDirection}
            setSortField={setSortField}
            setSortDirection={setSortDirection}
            setPageNumber={setPageNumber}
          />

          <PageSizeSelector
            pageSize={pageSize}
            setPageSize={setPageSize}
            setPageNumber={setPageNumber}
            setTotalPages={setTotalPages}
          />

          <AddEmployeeButton onClick={openAddForm} />
        </div>
      </div>

      <EmployeeList
        employees={employeeList}
        onEditEmployee={openEditForm}
        onDeleteEmployee={openDeleteConfirm}
      />
      {employeeToDelete && (
        <ConfirmPopUp
          title="Delete employee?"
          message={`${employeeToDelete.firstName} ${employeeToDelete.lastName} will be permanently removed. This action cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={handleConfirmDelete}
          onClose={closeDeleteConfirm}
          loading={deleting}
        />
      )}
      {showFormPopUp && (
        <EmployeeFormPopUp
          employee={editingEmployee}
          onClose={closeForm}
          onSuccess={handleEmployeeSaved}
          onNotFound={handleEmployeeNotFound}
        />
      )}

      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPages={totalPages}
      />
    </div>
  );
}
