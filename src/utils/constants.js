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

export const FILTERS_ACTIONS = {
  SET_PENDING: "SET_PENDING",
  SET_REJECTED: "SET_REJECTED",
  SET_APPROVED: "SET_APPROVED",
  RESET: "RESET",
};

export const SECCIONES_ES = {
  PERFIL: "Perfil",
  VOLUNTARIADOS: "Voluntariados",
  ORGANIZACIONES: "Organizaciones",
  ADOPCIONES: "Adopciones",
  MODERADORES: "Moderadores",
  CASOS: "Casos",
  ANIMALES: "Animales",
  CONTROL_ORGANIZACIONES: "Control de estado",
  FINANCIAL_SECTION: "Sección financiera",
};

export const PANEL_ACTIONS = {
  USER: {
    PROFILE: {
      id: 1,
      es: SECCIONES_ES.PERFIL,
      icon: "fa-solid fa-user",
    },
    VOLUNTEER: {
      id: 2,
      es: SECCIONES_ES.VOLUNTARIADOS,
      icon: "fa-solid fa-hands-helping",
    },
    ORGANIZATIONS: {
      id: 3,
      es: SECCIONES_ES.ORGANIZACIONES,
      icon: "fa-solid fa-hand-holding-heart",
    },
    ADOPTIONS: {
      id: 4,
      es: SECCIONES_ES.ADOPCIONES,
      icon: "fa-solid fa-heart",
    },
  },
  ADMIN: {
    PROFILE: {
      id: 1,
      es: SECCIONES_ES.PERFIL,
      icon: "fa-solid fa-user",
    },
    FINANCIAL_INFO: {
      id: 7,
      es: SECCIONES_ES.FINANCIAL_SECTION,
      icon: "fa-solid fa-hand-holding-heart",
    },

    MODERATORS: {
      id: 2,
      es: SECCIONES_ES.MODERADORES,
      icon: "fa-solid fa-user-shield",
    },
    CASES: { id: 3, es: SECCIONES_ES.CASOS, icon: "fa-solid fa-heart" },
    ANIMALS: { id: 4, es: SECCIONES_ES.ANIMALES, icon: "fa-solid fa-paw" },
    ADOPCIONES: {
      id: 5,
      es: SECCIONES_ES.ADOPCIONES,
      icon: "fa-solid fa-heart",
    },
    VOLUNTEER: {
      id: 6,
      es: SECCIONES_ES.VOLUNTARIADOS,
      icon: "fa-solid fa-hands-helping",
    },
  },
  MODERATOR: {
    PROFILE: {
      id: 1,
      es: SECCIONES_ES.PERFIL,
      icon: "fa-solid fa-user",
    },
    CASES: { id: 2, es: SECCIONES_ES.CASOS, icon: "fa-solid fa-heart" },
    ANIMALS: { id: 3, es: SECCIONES_ES.ANIMALES, icon: "fa-solid fa-paw" },
    ADOPCIONES: {
      id: 4,
      es: SECCIONES_ES.ADOPCIONES,
      icon: "fa-solid fa-heart",
    },
    VOLUNTEER: {
      id: 5,
      es: SECCIONES_ES.VOLUNTARIADOS,
      icon: "fa-solid fa-hands-helping",
    },
  },
  SUPERADMIN: {
    PROFILE: {
      id: 1,
      es: SECCIONES_ES.PERFIL,
      icon: "fa-solid fa-user",
    },
    MANAGE_ORGANIZATIONS: {
      id: 2,
      es: SECCIONES_ES.CONTROL_ORGANIZACIONES,
      icon: "fa-solid fa-hand-holding-heart",
    },
  },
};
