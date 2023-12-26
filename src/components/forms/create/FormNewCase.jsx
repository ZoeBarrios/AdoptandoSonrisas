import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "react-query";
import { createCase } from "../../../services/cases";
import { toast } from "react-toastify";
import FormField from "../../formField/FormField";
import TextArea from "../../textArea/TextArea";
import InputImages from "../../inputImages/InputImages";

export default function FormNewCase({ animal }) {
  const { mutate } = useMutation(createCase, {
    onSuccess: () => {
      toast.success("Caso creado");
    },
    onError: async (error) => {
      const { message } = await error.json();

      toast.error(message || "Ha ocurrido un error, intenta de nuevo");
    },
  });
  const handleSubmit = (values) => {
    console.log(values);
    mutate(values);
  };
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        images: [],
        animal_id: animal,
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col items-center justify-around p-3">
          <h2 className="text-darkOrange font-bold text-xl p-3 ">
            Crea un nuevo caso
          </h2>
          <FormField name="title" type="text" label="Título" />
          <TextArea name="description" label="Descripción" />
          <InputImages
            values={values}
            setFieldValue={setFieldValue}
            multiple={true}
          />
          <div>
            <button type="submit" className="buttons-form">
              Agregar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
