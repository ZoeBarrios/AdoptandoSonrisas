import { useMutation } from "react-query";
import { useLocation } from "wouter";
import { registerOrganization } from "../../../services/organization";
import { toast } from "react-toastify";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useRegisterOrganization() {
  const { language } = useLanguageStore();
  const [location, setLocation] = useLocation();
  const toggleForm = () => setLocation("/login");
  const { mutate, isLoading } = useMutation(registerOrganization, {
    onError: async (error) => {
      const { message } = await error.json();

      toast.error(message);
    },
    onSuccess: () => {
      toast.success(TRANSLATES[language].MESSAGES.REGISTER.ORGANIZATION, {
        position: "top-center",
      });
      toggleForm();
    },
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    mutate(values);
    setSubmitting(false);
  };
  return { handleSubmit, isLoading };
}
