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
import SelectType from "../../selectType/SelectType";

export default function FormAnimal({ closeModal, refetch }) {
  const { organization } = useAuthStore();
  const { language } = useLanguageStore();
  const { mutate, isLoading } = useMutation(createAnimal, {
    onSuccess: () => {
      showSuccess("Animal creado", refetch);
      closeModal();
    },
  });
  const handleSubmit = (values, { setSubmitting }) => {
    mutate(values, {
      onError: (error) => {
        showError(error);
        setSubmitting(false);
      },
    });
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
        type: "",
        organization_id: organization,
      }}
      validationSchema={() => registerAnimalValidationSchema(language)}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
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

          <SelectType
            onChange={(e) => setFieldValue("type", e.target.value)}
            defaultValue={values.type}
          />

          <InputImages
            values={values}
            setFieldValue={setFieldValue}
            multiple={false}
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
                TRANSLATES[language].BUTTONS.ADD_ANIMAL
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
