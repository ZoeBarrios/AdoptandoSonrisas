import { Form, Formik } from "formik";
import Modal from "../../modal/Modal";
import FormField from "../../formField/FormField";
import useUpdateForm from "../../../hooks/useUpdateForm";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import { useUpdateCase } from "../../../hooks/mutations/case/useUpdateCase";
import TextArea from "../../textArea/TextArea";

export default function FormUpdateCase({
  data,
  refetch,
  showModal,
  closeModal,
}) {
  const { language } = useLanguageStore();
  const { mutate, isLoading } = useUpdateCase(closeModal, refetch);

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
              <TextArea
                isRequired={true}
                name="description"
                label={TRANSLATES[language].LABELS.DESCRIPTION}
              />
              <div className="w-9/12 flex flex-col gap-5 md:flex-row items-center justify-between">
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
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}
