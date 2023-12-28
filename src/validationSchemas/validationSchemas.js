import * as Yup from "yup";
export const loginValidationSchema = Yup.object().shape({
  nameOrEmail: Yup.string().required("Nombre o Email requerido"),
  password: Yup.string().required("Contraseña requerida"),
});

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string().required("Nombre requerido"),
  surname: Yup.string().required("Apellido requerido"),
  password: Yup.string().required("Contraseña requerida"),
  email: Yup.string().email("Email invalido").required("Email requerido"),
  phone: Yup.string().required("Telefono requerido"),
});

export const registerOrganizationValidationSchema = Yup.object().shape({
  name: Yup.string().required("Nombre requerido"),
  description: Yup.string().required("Descripcion requerida"),
  email: Yup.string().email("Email invalido").required("Email requerido"),
  phone: Yup.string().optional(),
  instagram_link: Yup.string().optional(),
  facebook_link: Yup.string().optional(),
});

export const registerAnimalValidationSchema = Yup.object().shape({
  name: Yup.string().required("Nombre requerido"),
  description: Yup.string().required("Descripcion requerida"),
  sex: Yup.string().required("Sexo requerido"),
  birthdate: Yup.string().required("Fecha de nacimiento requerida"),
  size: Yup.string().required("Tamaño requerido"),
  image: Yup.string().required("Imagen requerida"),
  organization_id: Yup.number().required("Organizacion requerida"),
});

export const registerCaseValidationSchema = Yup.object().shape({
  title: Yup.string().required("Titulo requerido"),
  description: Yup.string().required("Descripcion requerida"),
  images: Yup.array().min(1, "Debe subir al menos una imagen"),
});
