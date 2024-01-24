import { Formik, Form } from "formik";
import FormField from "../../formField/FormField";
import TextArea from "../../textArea/TextArea";
import InputImages from "../../inputImages/InputImages";
import { registerCaseValidationSchema } from "../../../validationSchemas/validationSchemas";
import Modal from "../../modal/Modal";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import Loader from "../../loader/Loader";
import { useRegisterCase } from "../../../hooks/mutations/case/useRegisterCase";

export default function FormNewCase({
  animal,
  showModal,
  closeModal,
  refetch,
}) {
  const { language } = useLanguageStore();
  const { handleSubmit, isLoading } = useRegisterCase(closeModal, refetch);

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
        validationSchema={() => registerCaseValidationSchema(language)}
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
              <button
                type="button"
                className={`buttons-form ${isLoading && "disabled"}`}
                onClick={closeModal}
                disabled={isLoading}
              >
                {TRANSLATES[language].BUTTONS.CANCEL}
              </button>
              <button
                type="submit"
                className={`buttons-form ${isLoading && "disabled"}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader isButtonLoader={true} />
                ) : (
                  TRANSLATES[language].BUTTONS.ADD_CASE
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
