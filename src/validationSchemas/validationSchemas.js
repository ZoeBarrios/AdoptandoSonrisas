import * as Yup from "yup";
export const loginValidationSchema = Yup.object().shape({
  name: Yup.string().required("Nombre requerido"),
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
