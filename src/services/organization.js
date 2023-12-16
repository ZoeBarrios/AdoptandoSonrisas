import { checkResponse } from "../utils/checkResponse";
const API_URL = import.meta.env.VITE_API_URL;
export const getOrganization = async (id) => {
  const response = await fetch(`${API_URL}/organizations/${id}`);
  return checkResponse(response);
};

export const getOrganizations = async () => {
  const response = await fetch(`${API_URL}/organizations/active`);

  return checkResponse(response);
};

export const registerOrganization = async (organization) => {
  const response = await fetch(`${API_URL}/auth/register/organization`, {
    method: "POST",
    body: JSON.stringify(organization),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return checkResponse(response);
};

export const getActiveOrganizations = async () => {
  const response = await fetch(`${API_URL}/organizations/active`);
  return checkResponse(response);
};

export const getNotApllidedOrganizations = async (id) => {
  const response = await fetch(`${API_URL}/organizations/active/user/${id}`);
  return checkResponse(response);
};
