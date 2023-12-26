import { checkResponse } from "../utils/checkResponse";

const API_URL = import.meta.env.VITE_API_URL;
export const sendEmailToChangePassword = async (email) => {
  const response = await fetch(`${API_URL}/email/change-password`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return checkResponse(response);
};
