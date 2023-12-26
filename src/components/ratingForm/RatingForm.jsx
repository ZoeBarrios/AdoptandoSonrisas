import Modal from "../modal/Modal";
import { useMutation } from "react-query";
import { createRating } from "../../services/ratings";
import TextArea from "../textArea/TextArea";
import { showError, showSuccess } from "../../utils/userMessages";
import { Field, Form, Formik } from "formik";
import useAuthStore from "../../stores/useAuthStore";
import FormField from "../formField/FormField";
export default function RatingForm({ data, closeModal, showModal }) {
  const { user } = useAuthStore();
  const { mutate } = useMutation(createRating, {
    onSuccess: () => {
      showSuccess("Calificación enviada");
    },
    onError: showError,
  });
  const handleSubmit = (values, { setSubmitting }) => {
    const person = data.find(
      (adoption) =>
        adoption.animal.animal_id == values.animal_id &&
        adoption.isAccepted &&
        !adoption.isCancelled
    );

    mutate({ ...values, person_id: person.person_id });
    setSubmitting(false);
  };

  return (
    <Modal isOpen={showModal} setClose={closeModal}>
      <div className="mt-5 flex flex-col items-center justify-center gap-5">
        <h2 className="text-xl text-darkOrange font-bold">
          Calificar adopción
        </h2>

        <Formik
          initialValues={{
            animal_id: "",
            rating: 1,
            comment: "",
            rater_id: user.id,
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5 p-5 items-center w-full">
              <Field
                as="select"
                name="animal_id"
                id="animal_id"
                className="w-9/12 bg-white rounded-md border border-darkOrange focus:outline-orange focus:ring-darkOrange focus:border-transparent transition duration-300 ease-in-out"
              >
                <option value="" disabled>
                  Seleccione una adopción
                </option>
                {data?.map(
                  (adoption) =>
                    adoption.isAccepted &&
                    !adoption.isCancelled && (
                      <option
                        value={adoption.animal.animal_id}
                        key={adoption.animal.animal_id}
                      >
                        {adoption.animal.name}
                      </option>
                    )
                )}
              </Field>

              <FormField
                name="rating"
                type="number"
                label="Calificación"
                min="1"
                max="5"
              />
              <TextArea name="comment" id="comment" label="Comentario" />
              <div className="flex flex-row w-full items-center justify-around">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="buttons-form"
                >
                  Enviar
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="buttons-form"
                >
                  Cancelar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
