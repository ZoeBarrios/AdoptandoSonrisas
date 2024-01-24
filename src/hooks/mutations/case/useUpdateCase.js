import { useMutation } from "react-query";
import { updateCase } from "../../../services/cases";
import { showError, showSuccess } from "../../../utils/userMessages";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useUpdateCase(closeModal, refetch) {
  const { language } = useLanguageStore();
  const { mutate, isLoading } = useMutation(updateCase, {
    onSuccess: () => {
      closeModal();
      showSuccess(TRANSLATES[language].MESSAGES.UPDATE.SUCCESS, refetch);
    },
    onError: showError,
  });
  return { mutate, isLoading };
}
