import { checkResponse } from "../utils/checkResponse";
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
