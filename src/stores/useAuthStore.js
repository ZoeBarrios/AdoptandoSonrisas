import { create } from "zustand";
import {
  getObjFromLocalStorage,
  getFromLocalStorage,
} from "../utils/localStorageFunctions";
const useAuthStore = create((set) => ({
  user: getObjFromLocalStorage("user") || null,
  token: getFromLocalStorage("token") || null,
  organization: getFromLocalStorage("organization") || null,
  panelSection: getObjFromLocalStorage("panelSection") || null,
  isAuthenticated:
    getObjFromLocalStorage("user") && getFromLocalStorage("token"),
  login: (user, token, panel) =>
    set({ user, token, isAuthenticated: true, panelSection: panel }),
  setPanelSection: (panelSection) => set({ panelSection }),
  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      organization: null,
      panelSection: null,
    }),
  setOrganization: (organization) => set({ organization }),
}));

export default useAuthStore;
