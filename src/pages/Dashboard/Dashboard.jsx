import { useEffect, useState } from "react";
import { getEmployees } from "../../services/EmployeeService";
import PageSizeSelector from "../../components/PageSelector";
import EmployeeList from "../../components/EmployeeList";
import Pagination from "../../components/Pagination";
import AddEmployeeButton from "../../components/AddEmployeeButton";
import AddEmployeePopUp from "../Employees/AddEmployeePopUp";

export default function Dashboard() {
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [employeeList, setEmployeeList] = useState([]);
  const [showCreatePopUp, setshowCreatePopUp] = useState(false);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const data = await getEmployees(pageSize, pageNumber);

        setEmployeeList(data || []);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEmployees();
  }, [pageSize, pageNumber]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
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
          />

          <AddEmployeeButton setshowCreatePopUp={setshowCreatePopUp} />
        </div>
      </div>

      <EmployeeList employees={employeeList} />
      {showCreatePopUp ? (
        <AddEmployeePopUp setshowCreatePopUp={setshowCreatePopUp} />
      ) : (
        ""
      )}

      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        employeeCount={employeeList.length}
      />
    </div>
  );
}
