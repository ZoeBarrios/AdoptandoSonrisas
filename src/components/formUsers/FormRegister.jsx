import registerImg from "/imgs/register.jpg";
import "../../components/caseCard/CaseCard.css";
import { Formik } from "formik";
import { registerValidationSchema } from "../../validationSchemas/validationSchemas";
import Loader from "../loader/Loader";
import FormField from "../formField/FormField";
import FormBase from "../formBase/FormBase";
import { registerUser } from "../../services/user";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useLocation } from "wouter";

const initialValues = {
  name: "",
  surname: "",
  email: "",
  password: "",
  phone: "",
};

export default function FormRegister() {
  const [location, setLocation] = useLocation();
  const toggleForm = () => setLocation("/login");
  const { mutate } = useMutation(registerUser, {
    onError: async (error) => {
      const { message } = await error.json();
      toast.error(message);
    },
    onSuccess: () => {
      toast.success("Registro exitoso");

      toggleForm();
    },
  });
  const handleSubmit = async (values, { setSubmitting }) => {
    mutate(values);
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormBase>
          <div className="w-full h-full overflow-hidden hidden md:block">
            <img
              src={registerImg}
              alt="login"
              className="w-full h-full object-cover object-center rounded "
            />
          </div>
          <div className="w-full flex flex-col items-center justify-evenly h-full">
            <FormField type="text" name="name" label="Nombre" />
            <FormField type="text" name="surname" label="Apellido" />
            <FormField type="email" name="email" label="Email" />
            <FormField type="password" name="password" label="Contraseña" />
            <FormField type="phone" name="phone" label="Telefono" />

            <button
              type="submit"
              className="font-bold text-xl p-3 w-8/12 bg-darkOrange rounded text-white mt-5"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader /> : "Registrarse"}
            </button>
            <a
              onClick={toggleForm}
              className="text-base text-darkOrange cursor-pointer"
            >
              Ya tengo una cuenta
            </a>
          </div>
        </FormBase>
      )}
    </Formik>
  );
}
