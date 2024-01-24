import { useMutation } from "react-query";
import { changePassword } from "../../../services/auth";
import { toast } from "react-toastify";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";
import useAuthStore from "../../../stores/useAuthStore";
import { useLocation } from "wouter";
import { closeSession } from "../../../utils/localStorageFunctions";

export function useNewPassword(token) {
  const { logout } = useAuthStore();
  const [__, setLocation] = useLocation();
  const { language } = useLanguageStore();
  const { mutate } = useMutation(changePassword, {
    onSuccess: () => {
      toast.success(TRANSLATES[language].FORMS.RECOVER.SUCCESS);
      logout();
      closeSession();
      setLocation("/");
    },
    onError: async (error) => {
      console.error(error);
      toast.error(TRANSLATES[language].FORMS.RECOVER.ERROR);
    },
  });

  const handleSubmit = (values, { setSubmitting }) => {
    mutate({ password: values.newPassword, token });
    setSubmitting(false);
  };

  return { handleSubmit };
}
