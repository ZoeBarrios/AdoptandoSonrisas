export const getObjFromLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const getFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const setObjToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const closeSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("organization");
  localStorage.removeItem("panelSection");
};
