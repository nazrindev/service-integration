import api from "./api";

export const login = async (userName, password) => {
  const response = await api.post("/Api/account", {
    userName,
    password,
  });

  return response.data;
};
