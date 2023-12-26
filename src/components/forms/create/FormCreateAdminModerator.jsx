import { Form, Formik } from "formik";
import FormField from "../../formField/FormField";
import { useMutation } from "react-query";
import { createAdminOrModerator } from "../../../services/user";
import { showError, showSuccess } from "../../../utils/userMessages";

export default function FormCreateAdminModerator({
  initialValues,
  closeModal,
  refetch,
  role,
}) {
  const { mutate } = useMutation(createAdminOrModerator, {
    onSuccess: () => {
      showSuccess(
        `Se ha creado el ${role.toLowerCase()} correctamente`,
        refetch
      );
    },
    onError: showError,
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
    <Formik initialValues={initialValues} onSubmit={handleCreateAdmin}>
      <Form className="flex flex-col items-center justify-around p-5">
        <FormField label="Nombre" name="name" type="text" />
        <FormField label="Apellido" name="surname" type="text" />
        <FormField label="Email" name="email" type="email" />
        <FormField label="Telefono" name="phone" type="phone" />
        <div className="w-full flex flex-row justify-around items-center mt-5">
          <button type="submit" className="buttons-form">
            Agregar
          </button>
          <button className="buttons-form">Volver</button>
        </div>
      </Form>
    </Formik>
  );
}
