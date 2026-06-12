import api from "./api";

export const getAllEmployees = async () => {
  const response = await api.get("/api/employee");
  return response.data;
};

export const getEmployeeCount = async () => {
  const response = await api.get("/api/employee/count");
  const data = response.data;
  return typeof data === "number" ? data : data?.count ?? 0;
};

export const getEmployees = async (
  pageSize,
  pageNumber,
  sortField = "id",
  sortDirection = "asc",
) => {
  const response = await api.get(
    `/api/employee/paged/${pageSize}/${pageNumber}/${sortField}/${sortDirection}`,
  );
  return response.data;
};

export const getEmployee = async (id) => {
  const response = await api.get(`/api/employee/${id}`);
  return response.data;
};

export const createEmployee = async (employee) => {
  const response = await api.post("/api/employee", employee);
  return response.data;
};

export const updateEmployee = async (id, employee) => {
  const response = await api.put(`/api/employee/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await api.delete(`/api/employee/${id}`);
  return response.data;
};
