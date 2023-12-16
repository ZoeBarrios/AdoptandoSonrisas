import { getFromLocalStorage } from "../utils/localStorageFunctions";

const API_URL = import.meta.env.VITE_API_URL;
export const getActivities = async () => {
  const token = getFromLocalStorage("token");
  const response = await fetch(`${API_URL}/activities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getActivity = async (id) => {
  const token = getFromLocalStorage("token");
  const response = await fetch(`${API_URL}/activities/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
