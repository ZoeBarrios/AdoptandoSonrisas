import { Form, Formik } from "formik";
import FormField from "../../formField/FormField";
import { useMutation } from "react-query";
import { createAdminOrModerator } from "../../../services/user";
import { toast } from "react-toastify";
import { showSuccess } from "../../../utils/userMessages";
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
  const { mutate, isLoading } = useMutation(createAdminOrModerator, {
    onSuccess: () => {
      showSuccess(
        `${
          TRANSLATES[language].MESSAGES.NEW_USER.SUCCESS
        } ${role.toLowerCase()} `,
        refetch
      );
      closeModal();
    },
  });

  const handleCreateAdmin = (values, { setSubmitting }) => {
    mutate(
      {
        person: { ...values },
        role,
      },
      {
        onError: (error) => {
          if (error.status == 400) {
            toast.error(
              TRANSLATES[language].MESSAGES.REGISTER.USER_ALREADY_EXISTS
            );
          } else toast.error(TRANSLATES[language].MESSAGES.NEW_USER.ERROR);
          setSubmitting(false);
        },
      }
    );
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleCreateAdmin}
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
