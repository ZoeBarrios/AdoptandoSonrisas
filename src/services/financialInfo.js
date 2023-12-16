import { checkResponse } from "../utils/checkResponse";

const API_URL = import.meta.env.VITE_API_URL;
export const getFinancialInfo = async (id) => {
  const response = await fetch(`${API_URL}/financialInfo/${id}`);
  return checkResponse(response);
};
