import { checkResponse } from "../utils/checkResponse";

const API_URL = import.meta.env.VITE_API_URL;
export const getCases = async (page, limit) => {
  const response = await fetch(`${API_URL}/cases?page=${page}&limit=${limit}`);

  return checkResponse(response);
};

export const getCase = async (id) => {
  const response = await fetch(`${API_URL}/cases/${id}`);
  return checkResponse(response);
};
