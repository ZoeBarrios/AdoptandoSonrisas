import { checkResponse } from "../utils/checkResponse";

const API_URL = import.meta.env.VITE_API_URL;
export const handleLogin = async (person) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(person),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return checkResponse(response);
};

export const changePassword = async ({ token, password }) => {
  const response = await fetch(`${API_URL}/auth/new-password/${token}`, {
    method: "PUT",
    body: JSON.stringify({ password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return checkResponse(response);
};
