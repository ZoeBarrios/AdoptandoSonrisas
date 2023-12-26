import { checkResponse } from "../utils/checkResponse";

const API_URL = import.meta.env.VITE_API_URL;
export const createRating = async (rating) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/ratings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(rating),
  });

  return checkResponse(response);
};

export const getRatingsByPersonId = async (person_id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/ratings/${person_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return checkResponse(response);
};
