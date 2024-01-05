import create from "zustand";
import { LANGUAGES } from "../utils/languajes";

const languageStore = create((set) => ({
  language: LANGUAGES.ES,
  setLanguage: (newLanguage) => set({ language: newLanguage }),
}));

export default languageStore;
