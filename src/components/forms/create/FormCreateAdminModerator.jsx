import { Form, Formik } from "formik";
import FormField from "../../formField/FormField";
import { registerValidationSchema } from "../../../validationSchemas/validationSchemas";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";
import { useCreateAdminOrModerator } from "../../../hooks/mutations/person/useCreateAdminOrModerator";

export default function FormCreateAdminModerator({
  initialValues,
  closeModal,
  refetch,
  role,
}) {
  const { language } = useLanguageStore();
  const { handleCreateAdminOrModerator, isLoading } = useCreateAdminOrModerator(
    refetch,
    closeModal,
    role
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleCreateAdminOrModerator}
      validationSchema={() => registerValidationSchema(language)}
    >
      <Form className="flex flex-col items-center justify-center p-5 gap-5 w-full">
        <FormField
          label={TRANSLATES[language].LABELS.NAME}
          name="name"
          type="text"
        />
        <FormField
          label={TRANSLATES[language].LABELS.SURNAME}
          name="surname"
          type="text"
        />
        <FormField
          label={TRANSLATES[language].LABELS.EMAIL}
          name="email"
          type="email"
        />
        <FormField
          label={TRANSLATES[language].LABELS.PHONE}
          name="phone"
          type="phone"
        />
        <div className="w-full flex flex-row justify-around items-center mt-5">
          <button
            type="submit"
            className={`buttons-form ${isLoading && "disabled"}`}
            disabled={isLoading}
          >
            {TRANSLATES[language].BUTTONS.CREATE}
          </button>
          <button
            className={`buttons-form ${isLoading && "disabled"}`}
            onClick={closeModal}
            disabled={isLoading}
          >
            {TRANSLATES[language].BUTTONS.CANCEL}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
