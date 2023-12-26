import { checkResponse } from "../utils/checkResponse";
import { getFromLocalStorage } from "../utils/localStorageFunctions";
const API_URL = import.meta.env.VITE_API_URL;
export const getAnimals = async (search) => {
  const url = new URL(`${API_URL}/animals`);
  for (let term in search) {
    if (search[term]) {
      url.searchParams.append(term, search[term]);
    }
  }
  console.log(url);
  const response = await fetch(url);
  return checkResponse(response);
};

export const getAnimal = (id) => {
  const url = new URL(`${API_URL}/animals/animal/${id}`);
  return fetch(url).then(checkResponse);
};

export const getAnimalsByOrganizationId = async (id) => {
  const token = getFromLocalStorage("token");
  const response = await fetch(`${API_URL}/animals/organization/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};

export const updateAnimal = async (updateAnimal) => {
  const token = getFromLocalStorage("token");
  const formData = new FormData();
  for (const key in updateAnimal) {
    formData.append(key, updateAnimal[key]);
  }
  const response = await fetch(`${API_URL}/animals/${updateAnimal.animal_id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return checkResponse(response);
};
export const deleteAnimal = async (id) => {
  const token = getFromLocalStorage("token");
  const response = await fetch(`${API_URL}/animals/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};

export const createAnimal = async (newAnimal) => {
  const token = getFromLocalStorage("token");
  const formData = new FormData();
  for (const key in newAnimal) {
    formData.append(key, newAnimal[key]);
  }
  const response = await fetch(`${API_URL}/animals`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return checkResponse(response);
};
