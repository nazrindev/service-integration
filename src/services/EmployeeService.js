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
  const response = await api.post("/api/Employee", employee);
  return response.data;
};

export const updateEmployee = async (id, employee) => {
  const response = await api.put(`/api/Employee/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await api.delete(`/api/Employee/${id}`);
  return response.data;
};
