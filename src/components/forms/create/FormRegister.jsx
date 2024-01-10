import registerImg from "/imgs/register.jpg";
import { Formik } from "formik";
import { registerValidationSchema } from "../../../validationSchemas/validationSchemas";
import Loader from "../../loader/Loader";
import FormField from "../../formField/FormField";
import FormBase from "../../formBase/FormBase";
import { registerUser } from "../../../services/user";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useLocation } from "wouter";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";

const initialValues = {
  name: "",
  surname: "",
  email: "",
  password: "",
  phone: "",
};

export default function FormRegister() {
  const [location, setLocation] = useLocation();
  const { language } = useLanguageStore();
  const toggleForm = () => setLocation("/login");
  const { mutate, isLoading } = useMutation(registerUser, {
    onError: async (error) => {
      const err = await error.json();
      err.name == "UsuarioExistente"
        ? toast.error(
            TRANSLATES[language].MESSAGES.REGISTER.USER_ALREADY_EXISTS
          )
        : toast.error(TRANSLATES[language].MESSAGES.REGISTER.ERROR);
    },
    onSuccess: () => {
      toast.success(TRANSLATES[language].MESSAGES.REGISTER.SUCCESS);

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
      validationSchema={() => registerValidationSchema(language)}
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
          <div className="w-full flex flex-col items-center justify-center gap-3 h-full">
            <FormField
              type="text"
              name="name"
              label={TRANSLATES[language].LABELS.NAME}
            />
            <FormField
              type="text"
              name="surname"
              label={TRANSLATES[language].LABELS.SURNAME}
            />
            <FormField
              type="email"
              name="email"
              label={TRANSLATES[language].LABELS.EMAIL}
            />
            <FormField
              type="password"
              name="password"
              label={TRANSLATES[language].LABELS.PASSWORD}
            />
            <FormField
              type="phone"
              name="phone"
              label={TRANSLATES[language].LABELS.PHONE}
            />

            <div className="flex flex-col items-center justify-center w-full">
              <button
                type="submit"
                className="font-bold text-xl p-3 w-8/12 bg-darkOrange rounded text-white mt-5 hover:bg-orange hover:transition-colors duration-300"
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : TRANSLATES[language].BUTTONS.REGISTER}
              </button>
              <a
                onClick={toggleForm}
                className="text-base text-darkOrange cursor-pointer"
              >
                {TRANSLATES[language].LABELS.ALREADY_REGISTERED}
              </a>
            </div>
          </div>
        </FormBase>
      )}
    </Formik>
  );
}
