import { Form, Formik } from "formik";
import FormField from "../../formField/FormField";
import { useMutation } from "react-query";
import { createAdminOrModerator } from "../../../services/user";
import { showError, showSuccess } from "../../../utils/userMessages";
import { registerValidationSchema } from "../../../validationSchemas/validationSchemas";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";

export default function FormCreateAdminModerator({
  initialValues,
  closeModal,
  refetch,
  role,
}) {
  const { language } = useLanguageStore();
  const { mutate } = useMutation(createAdminOrModerator, {
    onSuccess: () => {
      showSuccess(
        `${
          TRANSLATES[language].MESSAGES.NEW_USER.SUCCESS
        } ${role.toLowerCase()} `,
        refetch
      );
    },
    onError: () => {
      showError(TRANSLATES[language].MESSAGES.NEW_USER.ERROR);
    },
  });

  const handleCreateAdmin = (values, { setSubmitting }) => {
    mutate({
      person: { ...values },
      role,
    });
    setSubmitting(false);
    closeModal();
    refetch();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleCreateAdmin}
      validationSchema={registerValidationSchema}
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
          <button type="submit" className="buttons-form">
            {TRANSLATES[language].BUTTONS.CREATE}
          </button>
          <button className="buttons-form" onClick={closeModal}>
            {TRANSLATES[language].BUTTONS.CANCEL}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
