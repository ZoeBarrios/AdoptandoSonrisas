import { useMutation } from "react-query";
import { useAuth } from "../../useAuth";
import { updateUser } from "../../../services/user";
import { TRANSLATES } from "../../../utils/languajes";
import { showSuccess } from "../../../utils/userMessages";
import { toast } from "react-toastify";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useUpdateUser(refetch) {
  const { language } = useLanguageStore();
  const { handleLogout } = useAuth();
  const { mutate } = useMutation(updateUser, {
    onSuccess: () => {
      showSuccess(TRANSLATES[language].MESSAGES.UPDATE.SUCCESS, refetch);
    },
    onError: async (error) => {
      if (error.response.status === 401) {
        handleLogout();
        toast.error(TRANSLATES[language].MESSAGES.EXPIRED);
      }
      toast.error(TRANSLATES[language].MESSAGES.UPDATE.ERROR);
    },
  });
  return { mutate };
}
