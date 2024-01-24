import { useMutation } from "react-query";
import { handleLogin } from "../../../services/auth";
import {
  setObjToLocalStorage,
  setToLocalStorage,
} from "../../../utils/localStorageFunctions";
import { PANEL_ACTIONS } from "../../../utils/constants";
import useAuthStore from "../../../stores/useAuthStore";
import { toast } from "react-toastify";
import { TRANSLATES } from "../../../utils/languajes";
import { useLocation } from "wouter";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useLogin() {
  const { login } = useAuthStore();
  const [__, setLocation] = useLocation();
  const { language } = useLanguageStore();
  const { mutate, isLoading } = useMutation(handleLogin, {
    onSuccess: (info) => {
      const user = {
        id: info.id,
        role: info.role,
      };
      setObjToLocalStorage("user", user);
      setToLocalStorage("token", info.token);
      setObjToLocalStorage(
        "panelSection",
        PANEL_ACTIONS[user.role.toUpperCase()].PROFILE
      );
      login(user, info.token, PANEL_ACTIONS[user.role.toUpperCase()].PROFILE);
      toast.success(TRANSLATES[language].MESSAGES.LOGIN.SUCCESS);
      setLocation("/");
    },
    onError: () => {
      toast.error(TRANSLATES[language].MESSAGES.LOGIN.ERROR);
    },
  });
  const handleSubmit = async (values) => {
    mutate(values);
  };
  return { handleSubmit, isLoading };
}
