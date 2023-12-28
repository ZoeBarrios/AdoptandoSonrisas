import { checkResponse } from "../utils/checkResponse";
import { ROLES } from "../utils/constants";
import { getFromLocalStorage } from "../utils/localStorageFunctions";
const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (person) => {
  const response = await fetch(`${API_URL}/auth/register?role=${ROLES.USER}`, {
    method: "POST",
    body: JSON.stringify(person),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return checkResponse(response);
};
export const createAdminOrModerator = async ({ person, role }) => {
  const response = await fetch(`${API_URL}/auth/register?role=${role}`, {
    method: "POST",
    body: JSON.stringify(person),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return checkResponse(response);
};
export const getUserById = async (id) => {
  const token = getFromLocalStorage("token");

  const response = await fetch(`${API_URL}/persons/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return checkResponse(response);
};

export const updateUser = async (person) => {
  const token = getFromLocalStorage("token");

  const response = await fetch(`${API_URL}/persons/${person.person_id}`, {
    method: "PUT",
    body: JSON.stringify(person),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return checkResponse(response);
};

export const applyToOrganization = async (person_organization) => {
  const token = getFromLocalStorage("token");

  const response = await fetch(`${API_URL}/persons/apply`, {
    method: "POST",
    body: JSON.stringify(person_organization),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return checkResponse(response);
};

export const getAppliedOrganizations = async (id, activity_id) => {
  const token = getFromLocalStorage("token");
  let url = `${API_URL}/persons/apply/${id}`;
  if (activity_id) {
    url = `${API_URL}/persons/apply/${id}?activity_id=${activity_id}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};

export const deletePersonFromOrganization = async (person_organization) => {
  const token = getFromLocalStorage("token");

  const response = await fetch(`${API_URL}/persons/apply`, {
    method: "DELETE",
    body: JSON.stringify(person_organization),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};

export const getPersonsVolunteersByOrganization = async (id, activity_id) => {
  const token = getFromLocalStorage("token");
  let url = `${API_URL}/persons/organization/${id}`;
  if (activity_id) {
    url = `${API_URL}/persons/organization/${id}?activity_id=${activity_id}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};
