import { useMutation } from "react-query";
import { registerUser } from "../../../services/user";
import { toast } from "react-toastify";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useRegisterPerson(toggleForm) {
  const { language } = useLanguageStore();
  const { mutate, isLoading } = useMutation(registerUser, {
    onError: async (error) => {
      const err = await error.json();
      err.name == "UsuarioExistente"
        ? toast.error(
            TRANSLATES[language].MESSAGES.REGISTER.USER_ALREADY_EXISTS
          )
        : toast.error(TRANSLATES[language].MESSAGES.REGISTER.ERROR);
    },
    onSuccess: () => {
      toast.success(TRANSLATES[language].MESSAGES.REGISTER.SUCCESS);
      toggleForm();
    },
  });
  const handleSubmit = async (values, { setSubmitting }) => {
    mutate(values);
    setSubmitting(false);
  };
  return { handleSubmit, isLoading };
}
