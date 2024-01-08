import { Formik, Form } from "formik";
import { useMutation } from "react-query";
import FormField from "../../formField/FormField";
import TextArea from "../../textArea/TextArea";
import InputImages from "../../inputImages/InputImages";
import { createAnimal } from "../../../services/animals";
import useAuthStore from "../../../stores/useAuthStore";
import { showError, showSuccess } from "../../../utils/userMessages";
import { registerAnimalValidationSchema } from "../../../validationSchemas/validationSchemas";
import YearInput from "../../yearInput/YearInput";
import SelectSize from "../../selectSize/SelectSize";
import SelectSex from "../../selectSex/SelectSex";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import Loader from "../../loader/Loader";

export default function FormAnimal({ closeModal, refetch }) {
  const { organization } = useAuthStore();
  const { language } = useLanguageStore();
  const { mutate } = useMutation(createAnimal, {
    onSuccess: () => {
      showSuccess("Animal creado", refetch);
      closeModal();
    },
    onError: showError,
  });
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    mutate(values);
  };
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        sex: "",
        birthdate: "",
        size: "",
        image: "",
        organization_id: organization,
      }}
      validationSchema={() => registerAnimalValidationSchema(language)}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="flex flex-col items-center p-3 gap-5">
          <h2 className="text-darkOrange font-bold text-xl p-3 ">
            {TRANSLATES[language].FORMS.NEW_ANIMAL.TITLE}
          </h2>
          <FormField
            name="name"
            type="text"
            label={TRANSLATES[language].LABELS.NAME}
            isRequired={true}
          />
          <TextArea
            name="description"
            label={TRANSLATES[language].LABELS.DESCRIPTION}
            isRequired={true}
          />
          <YearInput
            onChange={(e) => setFieldValue("birthdate", e.target.value)}
          />
          <SelectSex
            onChange={(e) => setFieldValue("sex", e.target.value)}
            defaultValue={values.sex}
          />

          <SelectSize
            onChange={(e) => setFieldValue("size", e.target.value)}
            defaultValue={values.size}
          />

          <InputImages
            values={values}
            setFieldValue={setFieldValue}
            multiple={false}
            isRequired={true}
          />
          <div className="flex flex-row w-full items-center justify-around">
            <button type="button" className="buttons-form" onClick={closeModal}>
              {TRANSLATES[language].BUTTONS.CANCEL}
            </button>

            <button
              type="submit"
              className="buttons-form"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader isButtonLoader={true} />
              ) : (
                TRANSLATES[language].BUTTONS.ADD_ANIMAL
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
