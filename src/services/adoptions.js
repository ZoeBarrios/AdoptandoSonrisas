const API_URL = import.meta.env.VITE_API_URL;
import { checkResponse } from "../utils/checkResponse";
import { getFromLocalStorage } from "../utils/localStorageFunctions";
export const getAdoptionsByUserId = async (personId) => {
  const token = getFromLocalStorage("token");
  const response = await fetch(`${API_URL}/adoptions/person/${personId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};

export const registerAdoption = async (adoption) => {
  const token = getFromLocalStorage("token");
  const response = await fetch(`${API_URL}/adoptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(adoption),
  });
  return checkResponse(response);
};

export const cancelAdoption = async (adoption) => {
  const token = getFromLocalStorage("token");
  const response = await fetch(`${API_URL}/adoptions/cancel`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(adoption),
  });
  return checkResponse(response);
};
