import { useMutation } from "react-query";
import { updateAnimal } from "../../../services/animals";
import { showSuccess } from "../../../utils/userMessages";
import { TRANSLATES } from "../../../utils/languajes";
import { toast } from "react-toastify";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useUpdateAnimal(refetch, closeModal) {
  const { language } = useLanguageStore();
  const { mutate, isLoading } = useMutation(updateAnimal, {
    onSuccess: () => {
      showSuccess(TRANSLATES[language].MESSAGES.UPDATE.SUCCESS, refetch);
      closeModal();
    },
  });
  const handleSubmit = (values, { setSubmitting }) => {
    mutate(values, {
      onError: () => {
        toast.error(TRANSLATES[language].MESSAGES.UPDATE.ERROR);
        setSubmitting(false);
      },
    });
  };
  return { handleSubmit, isLoading };
}
