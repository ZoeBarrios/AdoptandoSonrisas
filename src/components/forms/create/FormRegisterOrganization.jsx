import { Formik } from "formik";
import Loader from "../../loader/Loader";
import FormField from "../../formField/FormField";
import FormBase from "../../formBase/FormBase";
import registerImg from "/imgs/register.jpg";
import TextArea from "../../textArea/TextArea";
import { useLocation } from "wouter";
import { registerOrganizationValidationSchema } from "../../../validationSchemas/validationSchemas";
import { registerOrganization } from "../../../services/organization";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import BackButton from "../../backButton/BackButton";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";

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
  const { language } = useLanguageStore();
  const toggleForm = () => setLocation("/login");
  const { mutate } = useMutation(registerOrganization, {
    onError: async (error) => {
      const { message } = await error.json();

      toast.error(message);
    },
    onSuccess: () => {
      toast.success(TRANSLATES[language].MESSAGES.REGISTER.ORGANIZATION, {
        position: "top-center",
      });
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
        validationSchema={() => registerOrganizationValidationSchema(language)}
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
            <div className="w-full flex flex-col items-center justify-center gap-3 h-full">
              <FormField
                type="text"
                name="name"
                label={TRANSLATES[language].LABELS.NAME}
              />
              <TextArea
                type="text"
                name="description"
                label={TRANSLATES[language].LABELS.DESCRIPTION}
                isRequired={true}
              />
              <FormField
                type="email"
                name="email"
                label={TRANSLATES[language].LABELS.EMAIL}
              />
              <FormField
                type="phone"
                name="phone"
                label={TRANSLATES[language].LABELS.PHONE}
              />

              <div className="flex flex-col w-full items-center justify-center text-center">
                <button
                  type="submit"
                  className="font-bold text-xl p-3 w-8/12 bg-darkOrange rounded text-white hover:bg-orange hover:transition-colors duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader />
                  ) : (
                    TRANSLATES[language].BUTTONS.REGISTER
                  )}
                </button>
              </div>
            </div>
          </FormBase>
        )}
      </Formik>
    </div>
  );
}
