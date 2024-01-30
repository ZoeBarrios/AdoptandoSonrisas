import { useMutation } from "react-query";
import { registerAdoption } from "../../../services/adoptions";
import { toast } from "react-toastify";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useRegisterAdoption(closeModal, animal_id, person_id) {
  const { language } = useLanguageStore();
  const { mutate } = useMutation(registerAdoption, {
    onSuccess: () => {
      closeModal();
      toast.success(TRANSLATES[language].MESSAGES.ADOPT.SUCCESS);
    },
    onError: async (er) => {
      const error = await er.json();
      if (error.name == "AdopciónExistente")
        toast.error(TRANSLATES[language].MESSAGES.ADOPT.ADOPTION_EXISTS);
      else toast.error(TRANSLATES[language].MESSAGES.ADOPT.ERROR);
    },
  });

  const handleAdopt = () => {
    if (!person_id) {
      toast.error(TRANSLATES[language].MESSAGES.ADOPT.NEED_LOGIN);
      return;
    }
    mutate({
      animal_id: animal_id,
      person_id: person_id,
    });
  };
  return { handleAdopt };
}
