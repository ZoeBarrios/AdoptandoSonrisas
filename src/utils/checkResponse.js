export const checkResponse = async (response) => {
  if (response.ok) {
    const responseBody = await response.json();
    return responseBody.data;
  } else {
    throw await response.json();
  }
};
