import EmployeeCard from "./EmployeeCard";

export default function EmployeeList({ employees, onEditEmployee, onDeleteEmployee }) {
  if (!employees.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
        <p className="text-sm font-medium text-slate-500">No employees found</p>
      </div>
    );
  }

  return (
    <div className="grid auto-rows-fr gap-5 md:grid-cols-2">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.employeeID}
          employee={employee}
          onEdit={onEditEmployee}
          onDelete={onDeleteEmployee}
        />
      ))}
    </div>
  );
}
