import * as Yup from "yup";
import { LANGUAGES } from "../utils/languajes";

const validationMessages = {
  [LANGUAGES.ES]: {
    required: "Campo requerido",
    email: "Email inválido",
    min: (min) => `Debe tener al menos ${min} caracteres`,
    max: (max) => `Debe tener como máximo ${max} caracteres`,
    minImages: (min) => `Debe tener al menos ${min} imágenes`,
    maxImages: (max) => `Debe tener como máximo ${max} imágenes`,
    phone: "Teléfono inválido",
    number: "Número inválido",
  },
  [LANGUAGES.ENG]: {
    required: "Field is required",
    email: "Invalid email",
    min: (min) => `Must be at least ${min} characters long`,
    max: (max) => `Must be at most ${max} characters long`,
    minImages: (min) => `Must have at least ${min} images`,
    maxImages: (max) => `Must have at most ${max} images`,
    phone: "Invalid phone",
    number: "Invalid number",
  },
};
export const loginValidationSchema = (language) =>
  Yup.object().shape({
    nameOrEmail: Yup.string().required(validationMessages[language].required),
    password: Yup.string().required(validationMessages[language].required),
  });

export const registerValidationSchema = (language) =>
  Yup.object().shape({
    name: Yup.string().required(validationMessages[language].required),
    surname: Yup.string().required(validationMessages[language].required),
    password: Yup.string()
      .required(validationMessages[language].required)
      .min(6, validationMessages[language].min(6)),
    email: Yup.string()
      .email(validationMessages[language].email)
      .required(validationMessages[language].required),
    phone: Yup.string()
      .required(validationMessages[language].required)
      .matches(/^\d{10}$/, validationMessages[language].phone),
  });

export const registerOrganizationValidationSchema = (language) =>
  Yup.object().shape({
    name: Yup.string().required(validationMessages[language].required),
    description: Yup.string().required(validationMessages[language].required),
    email: Yup.string()
      .email(validationMessages[language].email)
      .required(validationMessages[language].required),
    phone: Yup.string()
      .optional()
      .matches(/^\d{10}$/, validationMessages[language].phone),
    instagram_link: Yup.string().optional(),
    facebook_link: Yup.string().optional(),
  });

export const registerAnimalValidationSchema = (language) =>
  Yup.object().shape({
    name: Yup.string().required(validationMessages[language].required),
    description: Yup.string().required(validationMessages[language].required),
    sex: Yup.string().required(validationMessages[language].required),
    birthdate: Yup.string().required(validationMessages[language].required),
    size: Yup.string().required(validationMessages[language].required),
    image: Yup.string().required(validationMessages[language].required),
    organization_id: Yup.number().required(
      validationMessages[language].required
    ),
    type: Yup.string().required(validationMessages[language].required),
  });

export const registerCaseValidationSchema = (language) =>
  Yup.object().shape({
    title: Yup.string().required(validationMessages[language].required),
    description: Yup.string().required(validationMessages[language].required),
    images: Yup.array()
      .min(1, validationMessages[language].minImages(1))
      .max(3, validationMessages[language].maxImages(3))
      .required(validationMessages[language].required),
  });

export const registerCalificationValidationSchema = (language) => {
  return Yup.object().shape({
    rating: Yup.number()
      .typeError(validationMessages[language].number)
      .integer(validationMessages[language].number)
      .min(1, validationMessages[language].number)
      .max(5, validationMessages[language].number)
      .required(validationMessages[language].required),
    comment: Yup.string().required(validationMessages[language].required),
  });
};
