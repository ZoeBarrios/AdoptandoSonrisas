import { useMutation } from "react-query";
import { cancelAdoption } from "../../../services/adoptions";
import { showSuccess } from "../../../utils/userMessages";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useCancelAdoption(refetch, animal, adoption) {
  const { language } = useLanguageStore();
  const { mutate } = useMutation(cancelAdoption, {
    onSuccess: () => {
      showSuccess(TRANSLATES[language].MESSAGES.ADOPT.CANCEL, refetch);
    },
  });

  const handleCancel = () => {
    mutate({
      animal_id: animal.animal_id,
      person_id: adoption.person_id,
    });
  };

  return { handleCancel };
}
