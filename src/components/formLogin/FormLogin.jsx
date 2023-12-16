import { useLocation } from "wouter";
import { handleLogin } from "../../services/auth";
import loginImg from "/imgs/login.avif";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { loginValidationSchema } from "../../validationSchemas/validationSchemas";
import Loader from "../loader/Loader";
import FormField from "../formField/FormField";
import FormBase from "../formBase/FormBase";
import BackButton from "../backButton/BackButton";
import {
  setToLocalStorage,
  setObjToLocalStorage,
} from "../../utils/localStorageFunctions";
import useAuthStore from "../../stores/useAuthStore";

export default function FormLogin() {
  const { login } = useAuthStore();
  const { mutate } = useMutation(handleLogin, {
    onSuccess: (info) => {
      const user = {
        id: info.id,
        role: info.role,
      };
      setObjToLocalStorage("user", user);
      setToLocalStorage("token", info.token);
      login(user, info.token);
      toast.success("Bienvenido");
      setLocation("/");
    },
    onError: () => {
      toast.error("Usuario o contraseña incorrectos");
    },
  });
  const [location, setLocation] = useLocation();

  const initialValues = {
    name: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    mutate(values);
    setSubmitting(false);
  };

  const handleVolunteer = () => {
    setLocation("/register");
  };
  const handleOrganization = () => {
    setLocation("/register/organizacion");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-orange">
      <BackButton />
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormBase>
            <div className="w-full h-3/6 md:h-auto flex flex-col items-center justify-center gap-5">
              <FormField type="text" label="Nombre" name="name" />
              <FormField type="password" label="Contraseña" name="password" />

              <button
                type="submit"
                className="font-bold text-xl p-3 w-8/12 bg-darkOrange rounded text-white mt-5"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader /> : "Ingresar"}
              </button>
              <a
                onClick={handleOrganization}
                className="text-base text-darkOrange cursor-pointer"
              >
                Quiero registrar mi organización
              </a>
              <a
                onClick={handleVolunteer}
                className="text-base text-darkOrange cursor-pointer"
              >
                Quiero registrarme
              </a>
            </div>
            <div className="w-full h-2/5 hidden md:block md:w-full md:h-full overflow-hidden">
              <img
                src={loginImg}
                alt="register"
                className="w-full h-full object-cover object-center rounded"
              />
            </div>
          </FormBase>
        )}
      </Formik>
    </div>
  );
}
