import { checkResponse } from "../utils/checkResponse";
import { getFromLocalStorage } from "../utils/localStorageFunctions";

const API_URL = import.meta.env.VITE_API_URL;
export const getCases = async (page, limit) => {
  const response = await fetch(`${API_URL}/cases?page=${page}&limit=${limit}`);

  return checkResponse(response);
};

export const getCase = async (id) => {
  const response = await fetch(`${API_URL}/cases/${id}`);
  return checkResponse(response);
};

export const getCasesByOrganizationId = async (id, deleted) => {
  console.log(deleted);
  let url = new URL(`${API_URL}/cases/organization/${id}`);
  if (deleted) {
    url.searchParams.append("deleted", deleted);
  }

  const response = await fetch(url);
  return checkResponse(response);
};

export const updateCase = async (updateCase) => {
  const token = getFromLocalStorage("token");
  console.log(updateCase);
  const response = await fetch(`${API_URL}/cases/${updateCase.case_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateCase),
  });
  return checkResponse(response);
};

export const deleteCase = async (id) => {
  const token = getFromLocalStorage("token");
  const response = await fetch(`${API_URL}/cases/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};

export const createCase = async (newCase) => {
  const token = getFromLocalStorage("token");
  const formData = new FormData();

  formData.append("animal_id", newCase.animal_id);
  formData.append("title", newCase.title);
  formData.append("description", newCase.description);

  newCase.images.forEach((file, index) => {
    formData.append(`images`, file);
  });

  const response = await fetch(`${API_URL}/cases`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return checkResponse(response);
};
