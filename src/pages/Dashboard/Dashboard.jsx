import { useEffect, useState } from "react";
import { deleteEmployee, getEmployees } from "../../services/EmployeeService";
import PageSizeSelector from "../../components/PageSelector";
import EmployeeList from "../../components/EmployeeList";
import Pagination from "../../components/Pagination";
import AddEmployeeButton from "../../components/AddEmployeeButton";
import EmployeeFormPopUp from "../Employees/EmployeeFormPopUp";
import ConfirmPopUp from "../../components/ConfirmPopUp";
import StatusMessage from "../../components/StatusMessage";

export default function Dashboard() {
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [employeeList, setEmployeeList] = useState([]);
  const [showFormPopUp, setShowFormPopUp] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees(pageSize, pageNumber);
      const employees = data || [];
      setEmployeeList(employees);

      if (employees.length < pageSize) {
        setTotalPages(pageNumber);
      } else {
        setTotalPages((prev) => Math.max(prev, pageNumber + 1));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [pageSize, pageNumber]);

  const openAddForm = () => {
    setEditingEmployee(null);
    setShowFormPopUp(true);
  };

  const openEditForm = (employee) => {
    setEditingEmployee(employee);
    setShowFormPopUp(true);
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

  const handleConfirmDelete = async () => {
    if (!employeeToDelete) return;

    setDeleting(true);
    try {
      await deleteEmployee(employeeToDelete.employeeID);
      setStatusMessage({
        type: "success",
        message: `${employeeToDelete.firstName} ${employeeToDelete.lastName} deleted successfully.`,
      });
      setEmployeeToDelete(null);
      fetchEmployees();
    } catch (error) {
      console.error(error);
      setStatusMessage({
        type: "error",
        message:
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

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Employee List
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Browse and manage your team members
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
