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

export const TYPES = {
  DOG: "DOG",
  CAT: "CAT",
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
  SET_TYPE: "SET_TYPE",
  RESTART: "RESTART",
};

export const FILTERS_ACTIONS = {
  SET_PENDING: "SET_PENDING",
  SET_REJECTED: "SET_REJECTED",
  SET_APPROVED: "SET_APPROVED",
  RESET: "RESET",
};

export const SECTION_NAMES = {
  ES: {
    PROFILE: "Perfil",
    VOLUNTEERS: "Voluntariados",
    ORGANIZATIONS: "Organizaciones",
    ADOPTIONS: "Adopciones",
    MODERATORS: "Moderadores",
    CASES: "Casos",
    ANIMALS: "Animales",
    CONTROL_ORGANIZATIONS: "Gestión de organizaciones",
    FINANCIAL_SECTION: "Sección financiera",
  },
  ENG: {
    PROFILE: "Profile",
    VOLUNTEERS: "Volunteers",
    ORGANIZATIONS: "Organizations",
    ADOPTIONS: "Adoptions",
    MODERATORS: "Moderators",
    CASES: "Cases",
    ANIMALS: "Animals",
    CONTROL_ORGANIZATIONS: "Control organizations",
    FINANCIAL_SECTION: "Financial section",
  },
};

export const PANEL_ACTIONS = {
  USER: {
    PROFILE: {
      id: 1,
      ES: SECTION_NAMES.ES.PROFILE,
      ENG: SECTION_NAMES.ENG.PROFILE,
      icon: "fa-solid fa-user",
    },
    VOLUNTEERS: {
      id: 2,
      ES: SECTION_NAMES.ES.VOLUNTEERS,
      ENG: SECTION_NAMES.ENG.VOLUNTEERS,
      icon: "fa-solid fa-hands-helping",
    },
    ORGANIZATIONS: {
      id: 3,
      ES: SECTION_NAMES.ES.ORGANIZATIONS,
      ENG: SECTION_NAMES.ENG.ORGANIZATIONS,
      icon: "fa-solid fa-hand-holding-heart",
    },
    ADOPTIONS: {
      id: 4,
      ES: SECTION_NAMES.ES.ADOPTIONS,
      ENG: SECTION_NAMES.ENG.ADOPTIONS,
      icon: "fa-solid fa-heart",
    },
  },
  ADMIN: {
    PROFILE: {
      id: 1,
      ES: SECTION_NAMES.ES.PROFILE,
      ENG: SECTION_NAMES.ENG.PROFILE,
      icon: "fa-solid fa-user",
    },
    FINANCIAL_SECTION: {
      id: 7,
      ES: SECTION_NAMES.ES.FINANCIAL_SECTION,
      ENG: SECTION_NAMES.ENG.FINANCIAL_SECTION,
      icon: "fa-solid fa-hand-holding-heart",
    },

    MODERATORS: {
      id: 2,
      ES: SECTION_NAMES.ES.MODERATORS,
      ENG: SECTION_NAMES.ENG.MODERATORS,
      icon: "fa-solid fa-user-shield",
    },
    CASES: {
      id: 3,
      ES: SECTION_NAMES.ES.CASES,
      ENG: SECTION_NAMES.ENG.CASES,
      icon: "fa-solid fa-heart",
    },
    ANIMALS: {
      id: 4,
      ES: SECTION_NAMES.ES.ANIMALS,
      ENG: SECTION_NAMES.ENG.ANIMALS,
      icon: "fa-solid fa-paw",
    },
    ADOPCIONES: {
      id: 5,
      ES: SECTION_NAMES.ES.ADOPTIONS,
      ENG: SECTION_NAMES.ENG.ADOPTIONS,
      icon: "fa-solid fa-heart",
    },
    VOLUNTEERS: {
      id: 6,
      ES: SECTION_NAMES.ES.VOLUNTEERS,
      ENG: SECTION_NAMES.ENG.VOLUNTEERS,
      icon: "fa-solid fa-hands-helping",
    },
  },
  MODERATOR: {
    PROFILE: {
      id: 1,
      ES: SECTION_NAMES.ES.PROFILE,
      ENG: SECTION_NAMES.ENG.PROFILE,
      icon: "fa-solid fa-user",
    },
    CASES: {
      id: 2,
      ES: SECTION_NAMES.ES.CASES,
      ENG: SECTION_NAMES.ENG.CASES,
      icon: "fa-solid fa-heart",
    },
    ANIMALS: {
      id: 3,
      ES: SECTION_NAMES.ES.ANIMALS,
      ENG: SECTION_NAMES.ENG.ANIMALS,
      icon: "fa-solid fa-paw",
    },
    ADOPCIONES: {
      id: 4,
      ES: SECTION_NAMES.ES.ADOPTIONS,
      ENG: SECTION_NAMES.ENG.ADOPTIONS,
      icon: "fa-solid fa-heart",
    },
    VOLUNTEERS: {
      id: 5,
      ES: SECTION_NAMES.ES.VOLUNTEERS,
      ENG: SECTION_NAMES.ENG.VOLUNTEERS,
      icon: "fa-solid fa-hands-helping",
    },
  },
  SUPERADMIN: {
    PROFILE: {
      id: 1,
      ES: SECTION_NAMES.ES.PROFILE,
      ENG: SECTION_NAMES.ENG.PROFILE,
      icon: "fa-solid fa-user",
    },
    CONTROL_ORGANIZATIONS: {
      id: 2,
      ES: SECTION_NAMES.ES.CONTROL_ORGANIZATIONS,
      ENG: SECTION_NAMES.ENG.CONTROL_ORGANIZATIONS,
      icon: "fa-solid fa-hand-holding-heart",
    },
  },
};
