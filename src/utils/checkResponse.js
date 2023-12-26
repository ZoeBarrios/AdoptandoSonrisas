export const checkResponse = async (response) => {
  if (response.status == 204) return response;

  if (response.ok) {
    const responseBody = await response.json();
    return responseBody.data;
  } else {
    throw await response;
  }
};
