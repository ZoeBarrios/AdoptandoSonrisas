import { create } from "zustand";
import {
  getObjFromLocalStorage,
  getFromLocalStorage,
} from "../utils/localStorageFunctions";
const useAuthStore = create((set) => ({
  user: getObjFromLocalStorage("user") || null,
  token: getFromLocalStorage("token") || null,
  isAuthenticated:
    getObjFromLocalStorage("user") && getFromLocalStorage("token"),
  login: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));

export default useAuthStore;
