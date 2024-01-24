import { useMutation } from "react-query";
import { createAnimal } from "../../../services/animals";
import { showError, showSuccess } from "../../../utils/userMessages";

export function useRegisterAnimal(closeModal, refetch) {
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
  return { handleSubmit, isLoading };
}
