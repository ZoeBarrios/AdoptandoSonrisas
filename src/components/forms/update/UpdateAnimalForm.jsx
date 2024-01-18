import { Formik, Form } from "formik";
import Modal from "../../modal/Modal";
import FormField from "../../formField/FormField";
import { useMutation } from "react-query";
import { updateAnimal } from "../../../services/animals";
import { toast } from "react-toastify";
import InputImages from "../../inputImages/InputImages";
import TextArea from "../../textArea/TextArea";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import { showSuccess } from "../../../utils/userMessages";

export default function UpdateAnimalForm({
  animal,
  refetch,
  showModal,
  closeModal,
}) {
  const { language } = useLanguageStore();
  const { mutate, isLoading } = useMutation(updateAnimal, {
    onSuccess: () => {
      showSuccess(TRANSLATES[language].MESSAGES.UPDATE.SUCCESS, refetch);
      closeModal();
    },
  });
  const handleSubmit = (values, { setSubmitting }) => {
    mutate(values, {
      onError: () => {
        toast.error(TRANSLATES[language].MESSAGES.UPDATE.ERROR);
        setSubmitting(false);
      },
    });
  };

  return (
    <Modal setClose={closeModal} isOpen={showModal}>
      <Formik
        initialValues={{
          ...animal,
          image: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col items-center jusitfy-center gap-3 p-5">
            <FormField label="Nombre" name="name" type="text" />
            <TextArea label="Descripción" name="description" />

            <InputImages values={values} setFieldValue={setFieldValue} />

            <div className="w-full flex flex-row justify-around">
              <button
                type="submit"
                className={`buttons-form ${isLoading && "disabled"}`}
                disabled={isLoading}
              >
                {TRANSLATES[language].BUTTONS.UPDATE}
              </button>
              <button
                type="reset"
                className={`buttons-form ${isLoading && "disabled"}`}
                onClick={closeModal}
                disabled={isLoading}
              >
                {TRANSLATES[language].BUTTONS.CANCEL}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
