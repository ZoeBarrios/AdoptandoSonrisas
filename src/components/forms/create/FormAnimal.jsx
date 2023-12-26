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

export default function FormAnimal({ closeModal, refetch }) {
  const { organization } = useAuthStore();
  const { mutate } = useMutation(createAnimal, {
    onSuccess: () => {
      showSuccess("Animal creado", refetch);
      closeModal();
    },
    onError: showError,
  });
  const handleSubmit = (values) => {
    console.log(values);
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
      validationSchema={registerAnimalValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col items-center p-3 gap-5">
          <h2 className="text-darkOrange font-bold text-xl p-3 ">
            Crea un nuevo animal
          </h2>
          <FormField name="name" type="text" label="Nombre" />
          <TextArea name="description" label="Descripción" />
          <YearInput />
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
          />
          <div className="flex flex-row w-full items-center justify-around">
            <button type="button" className="buttons-form" onClick={closeModal}>
              Volver
            </button>

            <button type="submit" className="buttons-form">
              Agregar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
