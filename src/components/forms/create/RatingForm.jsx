import Modal from "../../modal/Modal";
import TextArea from "../../textArea/TextArea";
import { Field, Form, Formik } from "formik";
import useAuthStore from "../../../stores/useAuthStore";
import FormField from "../../formField/FormField";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import { registerCalificationValidationSchema } from "../../../validationSchemas/validationSchemas";
import { useRegisterRating } from "../../../hooks/mutations/rating/useRegisterRating";

export default function RatingForm({ data, closeModal, showModal }) {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();

  const { handleSubmit, isLoading } = useRegisterRating(data);

  return (
    <Modal isOpen={showModal} setClose={closeModal}>
      <div className="mt-5 flex flex-col items-center justify-center gap-5">
        <h2 className="text-xl text-darkOrange font-bold">
          {TRANSLATES[language].FORMS.NEW_CALIFICATION.TITLE}
        </h2>

        <Formik
          initialValues={{
            animal_id: "",
            calification: 1,
            comment: "",
            rater_id: user.id,
          }}
          onSubmit={handleSubmit}
          validationSchema={() =>
            registerCalificationValidationSchema(language)
          }
        >
          {({ values }) => (
            <Form className="flex flex-col gap-5 p-5 items-center w-full">
              <Field
                as="select"
                name="animal_id"
                id="animal_id"
                className="w-9/12 bg-white rounded-md border border-darkOrange focus:outline-orange focus:ring-darkOrange focus:border-transparent transition duration-300 ease-in-out"
              >
                <option value="" disabled>
                  {TRANSLATES[language].FORMS.NEW_CALIFICATION.DESCRIPTION}
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
                name="calification"
                type="number"
                label={TRANSLATES[language].LABELS.CALIFICATION}
                min="1"
                max="5"
              />
              <TextArea
                name="comment"
                id="comment"
                isRequired={true}
                label={TRANSLATES[language].LABELS.COMMENT}
              />
              <div className="flex flex-row w-full items-center justify-around">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`buttons-form ${
                    (isLoading || values.animal_id == "") && "disabled"
                  }`}
                >
                  {TRANSLATES[language].BUTTONS.ADD_CALIFICATION}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className={`buttons-form ${isLoading && "disabled"}`}
                  disabled={isLoading}
                >
                  {TRANSLATES[language].BUTTONS.CANCEL}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
