import api from "./api";

export const login = async (userName, password) => {
  const response = await api.post("/api/account", { userName, password });
  const data = response.data;

  if (typeof data === "string") {
    return { token: data };
  }

  return data;
};
