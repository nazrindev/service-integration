import api from "./api";

export const getEmployees = async (pageSize, pageNumber) => {
  const response = await api.get(
    `/api/Employee/paged/${pageSize}/${pageNumber}/id/asc`,
  );
  return response.data;
};

export const getEmployee = async (id) => {
  const response = await api.get(`/employees/${id}`);
  return response.data;
};

export const createEmployee = async (employee) => {
  const response = await api.post("/employees", employee);
  return response.data;
};
