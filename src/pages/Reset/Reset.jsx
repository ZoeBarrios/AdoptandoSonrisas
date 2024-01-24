import { useParams } from "wouter";
import { Form, Formik } from "formik";
import FormField from "../../components/formField/FormField";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";
import { useNewPassword } from "../../hooks/mutations/password/useNewPassword";

export default function Reset() {
  const { token } = useParams();
  const { handleSubmit } = useNewPassword(token);

  const { language } = useLanguageStore();

  const validate = (values) => {
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
