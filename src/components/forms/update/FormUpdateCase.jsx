import { Form, Formik } from "formik";
import Modal from "../../modal/Modal";
import FormField from "../../formField/FormField";
import { useMutation } from "react-query";
import { updateCase } from "../../../services/cases";
import { showError, showSuccess } from "../../../utils/userMessages";
import useUpdateForm from "../../../hooks/useUpdateForm";

export default function FormUpdateCase({
  data,
  refetch,
  showModal,
  closeModal,
}) {
  const { mutate } = useMutation(updateCase, {
    onSuccess: () => {
      closeModal();
      showSuccess("Caso actualizado correctamente", refetch);
    },
    onError: showError,
  });

  const { setFormRef, handleUpdate } = useUpdateForm(mutate, data);
  return (
    <Modal isOpen={showModal} setIsOpen={closeModal}>
      <Formik initialValues={data} onSubmit={handleUpdate}>
        {({ setValues }) => {
          setFormRef.current = setValues;
          return (
            <Form className="flex flex-col items-center justify-center gap-5 w-full p-5">
              <FormField type="text" name="title" label="Titulo" />
              <FormField type="text" name="description" label="Descripcion" />
              <button
                type="button"
                onClick={closeModal}
                className="buttons-form w-1/2"
              >
                Volver
              </button>
              <button type="submit" className="buttons-form w-1/2">
                Actualizar
              </button>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}
