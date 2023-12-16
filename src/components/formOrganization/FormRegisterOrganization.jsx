import { Formik } from "formik";
import Loader from "../loader/Loader";
import FormField from "../formField/FormField";
import FormBase from "../formBase/FormBase";
import registerImg from "/imgs/register.jpg";
import { useLocation } from "wouter";
import { registerOrganizationValidationSchema } from "../../validationSchemas/validationSchemas";
import { registerOrganization } from "../../services/organization";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import BackButton from "../backButton/BackButton";

const initialValues = {
  name: "",
  description: "",
  email: "",
  phone: "",
  instagram_link: "",
  facebook_link: "",
};
export default function FormRegisterOrganizartion() {
  const [location, setLocation] = useLocation();
  const toggleForm = () => setLocation("/login");
  const { mutate } = useMutation(registerOrganization, {
    onError: async (error) => {
      const { message } = await error.json();

      toast.error(message);
    },
    onSuccess: () => {
      toast.success(
        "Se te contactara a la brevedad para confirmar el registro",
        {
          position: "top-center",
        }
      );
      toggleForm();
    },
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    mutate(values);
    setSubmitting(false);
  };
  return (
    <div className="h-screen p-5 flex flex-col items-center justify-center bg-orange">
      <BackButton />
      <Formik
        validationSchema={registerOrganizationValidationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormBase>
            <div className="w-full overflow-hidden hidden md:block">
              <img
                src={registerImg}
                alt="login"
                className="w-full h-full object-cover object-center rounded "
              />
            </div>
            <div className="w-full flex flex-col items-center justify-evenly h-full">
              <FormField type="text" name="name" label="Nombre" />
              <FormField type="text" name="description" label="Descripción" />
              <FormField type="email" name="email" label="Email" />
              <FormField type="phone" name="phone" label="Telefono(Opcional)" />
              <FormField
                type="text"
                name="instagram_link"
                label="Link de Instagram(Opcional)"
              />
              <FormField
                type="text"
                name="facebook_link"
                label="Link de Facebook(Opcional)"
              />

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
    </div>
  );
}
