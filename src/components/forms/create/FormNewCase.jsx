import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "react-query";
import { createCase } from "../../../services/cases";
import { toast } from "react-toastify";
import FormField from "../../formField/FormField";
import TextArea from "../../textArea/TextArea";
import InputImages from "../../inputImages/InputImages";
import { registerCaseValidationSchema } from "../../../validationSchemas/validationSchemas";
import Modal from "../../modal/Modal";
import { showError, showSuccess } from "../../../utils/userMessages";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";

export default function FormNewCase({
  animal,
  showModal,
  closeModal,
  refetch,
}) {
  const { language } = useLanguageStore();
  const { mutate } = useMutation(createCase, {
    onSuccess: () => {
      showSuccess("Caso creado correctamente", refetch);
      closeModal();
    },
    onError: showError,
  });
  const handleSubmit = (values) => {
    mutate(values);
  };
  return (
    <Modal isOpen={showModal} setClose={closeModal}>
      <Formik
        initialValues={{
          title: "",
          description: "",
          images: [],
          animal_id: animal,
        }}
        onSubmit={handleSubmit}
        validationSchema={registerCaseValidationSchema}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col items-center justify-center gap-5 p-3">
            <h2 className="text-darkOrange font-bold text-xl p-3 ">
              {TRANSLATES[language].FORMS.NEW_CASE.TITLE}
            </h2>
            <FormField
              name="title"
              type="text"
              label={TRANSLATES[language].LABELS.TITLE}
              isRequired={true}
            />
            <TextArea
              name="description"
              label={TRANSLATES[language].LABELS.DESCRIPTION}
              isRequired={true}
            />
            <InputImages
              values={values}
              setFieldValue={setFieldValue}
              multiple={true}
              isRequired={true}
            />
            <div className="flex flex-row w-full items-center justify-around">
              <button type="submit" className="buttons-form">
                {TRANSLATES[language].BUTTONS.ADD_CASE}
              </button>
              <button
                type="button"
                className="buttons-form"
                onClick={closeModal}
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
