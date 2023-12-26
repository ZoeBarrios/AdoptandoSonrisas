import { Formik, Form } from "formik";
import Modal from "../../modal/Modal";
import FormField from "../../formField/FormField";
import { useMutation } from "react-query";
import { updateAnimal } from "../../../services/animals";
import { toast } from "react-toastify";
import InputImages from "../../inputImages/InputImages";
import TextArea from "../../textArea/TextArea";

export default function UpdateAnimalForm({
  animal,
  refetch,
  showModal,
  closeModal,
}) {
  const { mutate } = useMutation(updateAnimal, {
    onSuccess: () => {
      toast.success("Animal actualizado");
      refetch();
      closeModal();
    },
    onError: async (error) => {
      const { message } = await error.json();

      toast.error(message || "Ha ocurrido un error, intenta de nuevo");
    },
  });
  const handleSubmit = (values) => {
    mutate(values);
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
              <button type="submit" className="buttons-form">
                Actualizar
              </button>
              <button
                type="reset"
                className="buttons-form"
                onClick={closeModal}
              >
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
