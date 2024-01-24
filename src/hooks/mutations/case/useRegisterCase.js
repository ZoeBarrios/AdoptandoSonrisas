import { useMutation } from "react-query";
import { createCase } from "../../../services/cases";
import { showError, showSuccess } from "../../../utils/userMessages";

export function useRegisterCase(closeModal, refetch) {
  const { mutate, isLoading } = useMutation(createCase, {
    onSuccess: () => {
      showSuccess("Caso creado correctamente", refetch);
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
