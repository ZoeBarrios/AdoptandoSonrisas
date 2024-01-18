import { Form, Formik } from "formik";
import Modal from "../../modal/Modal";
import FormField from "../../formField/FormField";
import { useMutation } from "react-query";
import { updateCase } from "../../../services/cases";
import { showError, showSuccess } from "../../../utils/userMessages";
import useUpdateForm from "../../../hooks/useUpdateForm";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";

export default function FormUpdateCase({
  data,
  refetch,
  showModal,
  closeModal,
}) {
  const { language } = useLanguageStore();
  const { mutate, isLoading } = useMutation(updateCase, {
    onSuccess: () => {
      closeModal();
      showSuccess(TRANSLATES[language].MESSAGES.UPDATE.SUCCESS, refetch);
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
              <FormField
                type="text"
                name="title"
                label={TRANSLATES[language].LABELS.TITLE}
              />
              <FormField
                type="text"
                name="description"
                label={TRANSLATES[language].LABELS.DESCRIPTION}
              />
              <button
                type="button"
                onClick={closeModal}
                className={`buttons-form ${isLoading && "disabled"} w-1/2`}
                disabled={isLoading}
              >
                {TRANSLATES[language].BUTTONS.CANCEL}
              </button>
              <button
                type="submit"
                className={`buttons-form ${isLoading && "disabled"} w-1/2`}
                disabled={isLoading}
              >
                {TRANSLATES[language].BUTTONS.UPDATE}
              </button>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}
