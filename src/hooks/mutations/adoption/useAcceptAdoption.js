import { useMutation } from "react-query";
import { acceptAdoption } from "../../../services/adoptions";
import { showError, showSuccess } from "../../../utils/userMessages";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useAcceptAdoption(refetch, animal, adoption) {
  const { language } = useLanguageStore();
  const { mutate: acceptAdop } = useMutation(acceptAdoption, {
    onSuccess: () => {
      showSuccess(TRANSLATES[language].MESSAGES.ADOPT.ACCEPTED, refetch);
    },
    onError: showError,
  });
  const handleAccept = () => {
    acceptAdop({
      animal_id: animal.animal_id,
      person_id: adoption.person_id,
    });
  };
  return { handleAccept };
}
