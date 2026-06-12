export const EMPLOYEE_NOT_FOUND_MESSAGE = "User not found";

const SUCCESS_STATUSES = ["Success", "OK", "Created"];

export function isEmployeeNotFound(data) {
  return data?.status === "NotFound";
}

export function isEmployeeNotFoundError(error) {
  return (
    error?.response?.status === 404 || isEmployeeNotFound(error?.response?.data)
  );
}

export function isEmployeeApiFailure(data) {
  if (!data || isEmployeeNotFound(data)) return false;

  if (data.status && !SUCCESS_STATUSES.includes(data.status)) {
    return true;
  }

  return Boolean(data.errorMessage);
}

export function getEmployeeApiErrorMessage(data) {
  return (
    data?.errorMessage ||
    data?.message ||
    data?.title ||
    "Request failed. Please try again."
  );
}
