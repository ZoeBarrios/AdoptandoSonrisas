import InfoUser from "../components/InfoUser/InfoUser";

export const GENDERS = {
  F: "F",
  M: "M",
};

export const SIZES = {
  SMALL: "SMALL",
  MEDIUM: "MEDIUM",
  BIG: "BIG",
};

export const AGE = {
  PUPPY: "PUPPY",
  ADULT: "ADULT",
  OLD: "OLD",
};

export const ROLES = {
  ADMIN: "Admin",
  USER: "User",
  SUPERADMIN: "SuperAdmin",
  MODERATOR: "Moderator",
};
export const SEARCH_ACTIONS = {
  SET_PAGE: "SET_PAGE",
  SET_SIZE: "SET_SIZE",
  SET_GENRE: "SET_GENRE",
  SET_AGE: "SET_AGE",
  RESTART: "RESTART",
};

export const SECCIONES_ES = {
  PERFIL: "Perfil",
  VOLUNTARIADOS: "Voluntariados",
  ORGANIZACIONES: "Organizaciones",
  ADOPCIONES: "Adopciones",
};

export const PANEL_ACTIONS = {
  USER: {
    PROFILE: {
      id: 1,
      es: SECCIONES_ES.PERFIL,
    },
    VOLUNTEER: {
      id: 2,
      es: SECCIONES_ES.VOLUNTARIADOS,
    },
    ORGANIZATIONS: { id: 3, es: SECCIONES_ES.ORGANIZACIONES },
    ADOPTIONS: { id: 4, es: SECCIONES_ES.ADOPCIONES },
  },
};
