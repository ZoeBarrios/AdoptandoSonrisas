import { checkResponse } from "../utils/checkResponse";
import { getFromLocalStorage } from "../utils/localStorageFunctions";

const API_URL = import.meta.env.VITE_API_URL;
export const getFinancialInfo = async (id) => {
  const response = await fetch(`${API_URL}/financialInfo/${id}`);
  return checkResponse(response);
};

export const createFinancialInfo = async (financialInfo) => {
  const token = getFromLocalStorage("token");
  const response = await fetch(`${API_URL}/financialInfo`, {
    method: "POST",
    body: JSON.stringify(financialInfo),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};

export const updateFinancialInfo = async (financialInfo) => {
  console.log("financialInfo", financialInfo);
  const token = getFromLocalStorage("token");
  const response = await fetch(
    `${API_URL}/financialInfo/${financialInfo.organization_id}`,
    {
      method: "PUT",
      body: JSON.stringify(financialInfo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return checkResponse(response);
};
