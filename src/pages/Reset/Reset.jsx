import { useMutation } from "react-query";
import { useParams } from "wouter";
import { changePassword } from "../../services/auth";
import { useLocation } from "wouter";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import FormField from "../../components/formField/FormField";
import useAuthStore from "../../stores/useAuthStore";
import { closeSession } from "../../utils/localStorageFunctions";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";

export default function Reset() {
  const { token } = useParams();
  const { logout } = useAuthStore();
  const [__, setLocation] = useLocation();
  const { language } = useLanguageStore();
  const { mutate } = useMutation(changePassword, {
    onSuccess: () => {
      toast.success(TRANSLATES[language].FORMS.RECOVER.SUCCESS);
      logout();
      closeSession();
      setLocation("/");
    },
    onError: async (error) => {
      console.error(error);
      toast.error(TRANSLATES[language].FORMS.RECOVER.ERROR);
    },
  });

  const handleSubmit = (values, { setSubmitting }) => {
    mutate({ password: values.newPassword, token });
    setSubmitting(false);
  };

  const validate = (values) => {
    console.log(values);

    const errors = {};
    if (!values.newPassword) {
      errors.newPassword = TRANSLATES[language].FORMS.RECOVER.REQUIRED_FIELD;
    }
    if (!values.confirmPassword) {
      errors.confirmPassword =
        TRANSLATES[language].FORMS.RECOVER.REQUIRED_FIELD;
    } else if (values.confirmPassword !== values.newPassword) {
      errors.confirmPassword =
        TRANSLATES[language].FORMS.RECOVER.PASSWORD_MISSMATCH;
    }
    return errors;
  };

  return (
    <section className="w-full min-h-screen bg-ligthOrange flex flex-col items-center justify-center">
      <Formik
        initialValues={{
          newPassword: "",
          confirmPassword: "",
        }}
        onSubmit={handleSubmit}
        validate={validate}
      >
        {({ isSubmitting }) => (
          <Form className="p-5 bg-white w-9/12 md:w-6/12 h-96 rounded-lg gap-5 flex flex-col items-center justify-center">
            <FormField
              type="password"
              label={TRANSLATES[language].LABELS.NEW_PASSWORD}
              name="newPassword"
            />
            <FormField
              type="password"
              label={TRANSLATES[language].LABELS.CONFIRM_PASSWORD}
              name="confirmPassword"
            />
            <button type="submit" className="buttons-form">
              {
                TRANSLATES[language].BUTTONS[
                  isSubmitting ? "CHANGING_PASSWORD" : "CHANGE_PASSWORD"
                ]
              }
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
