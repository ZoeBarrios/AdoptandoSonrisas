import { useMutation } from "react-query";
import { createRating } from "../../../services/ratings";
import { showError, showSuccess } from "../../../utils/userMessages";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useRegisterRating(data, closeModal) {
  const { language } = useLanguageStore();
  const { mutate, isLoading } = useMutation(createRating, {
    onSuccess: () => {
      showSuccess(TRANSLATES[language].MESSAGES.CALIFICATION.SUCCESS);
      closeModal();
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

  return { handleSubmit, isLoading };
}
