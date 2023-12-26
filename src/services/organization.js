import { checkResponse } from "../utils/checkResponse";
import { getFromLocalStorage } from "../utils/localStorageFunctions";
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
  const token = getFromLocalStorage("token");
  const response = await fetch(`${API_URL}/organizations/active/user/${id}`, {
    headers: {
      contentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};

export const getOrganizacionByAdminOrModerator = async (id) => {
  const token = getFromLocalStorage("token");
  const response = await fetch(`${API_URL}/organizations/person/${id}`, {
    contentType: "application/json",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};

export const updateOrganization = async (org) => {
  const token = getFromLocalStorage("token");
  const response = await fetch(
    `${API_URL}/organizations/${org.organization_id}`,
    {
      method: "PUT",
      body: JSON.stringify(org),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return checkResponse(response);
};

export const getModeratorsByOrganizationId = async (id) => {
  const token = getFromLocalStorage("token");
  const response = await fetch(`${API_URL}/organizations/moderators/${id}`, {
    headers: {
      contentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};

export const getAdminsByOrganizationId = async (id) => {
  const token = getFromLocalStorage("token");
  const response = await fetch(`${API_URL}/organizations/admins/${id}`, {
    method: "GET",
    headers: {
      contentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};

export const deletePersonFromOrganization = async (personOrganization) => {
  const token = getFromLocalStorage("token");
  const response = await fetch(
    `${API_URL}/organizations?person_id=${personOrganization.person_id}&organization_id=${personOrganization.organization_id}`,
    {
      method: "DELETE",
      headers: {
        contentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return checkResponse(response);
};

export const getPendingOrganizations = async () => {
  const token = getFromLocalStorage("token");
  const response = await fetch(`${API_URL}/organizations/pending`, {
    headers: {
      contentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};

export const deleteOrganization = async (id) => {
  const token = getFromLocalStorage("token");
  const response = await fetch(`${API_URL}/organizations/${id}`, {
    method: "DELETE",
    headers: {
      contentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};

export const acceptOrganization = async (id) => {
  const token = getFromLocalStorage("token");
  const response = await fetch(`${API_URL}/organizations/accept/${id}`, {
    method: "PUT",
    headers: {
      contentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};
