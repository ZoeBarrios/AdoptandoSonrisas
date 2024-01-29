import { useMutation } from "react-query";
import { createCase } from "../../../services/cases";
import { showError, showSuccess } from "../../../utils/userMessages";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";

export function useRegisterCase(closeModal, refetch) {
  const { language } = useLanguageStore();
  const { mutate, isLoading } = useMutation(createCase, {
    onSuccess: () => {
      showSuccess(TRANSLATES[language].CASES.CREATED, refetch);
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
