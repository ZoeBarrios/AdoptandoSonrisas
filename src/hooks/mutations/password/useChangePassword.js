import { useMutation } from "react-query";
import { sendEmailToChangePassword } from "../../../services/email";
import { toast } from "react-toastify";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useChangePassword(email, closeModal) {
  const { language } = useLanguageStore();
  const { mutate } = useMutation(sendEmailToChangePassword, {
    onSuccess: () => {
      toast.success(TRANSLATES[language].CHANGE_PASSWORD.SUCCESS);
    },
    onError: () => {
      toast.error(TRANSLATES[language].CHANGE_PASSWORD.ERROR);
    },
  });

  const handleClick = async () => {
    mutate(email);
    closeModal();
  };

  return { handleClick };
}
