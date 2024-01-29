import { useMutation } from "react-query";
import { createAnimal } from "../../../services/animals";
import { showError, showSuccess } from "../../../utils/userMessages";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useRegisterAnimal(closeModal, refetch) {
  const { language } = useLanguageStore();
  const { mutate, isLoading } = useMutation(createAnimal, {
    onSuccess: () => {
      showSuccess(TRANSLATES[language].ANIMAL.CREATED, refetch);
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
  return { handleSubmit, isLoading };
}
