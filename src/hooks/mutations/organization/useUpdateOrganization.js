import { useMutation } from "react-query";
import { updateOrganization } from "../../../services/organization";
import { toast } from "react-toastify";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useUpdateOrganization(refetch) {
  const { language } = useLanguageStore();
  const { mutate } = useMutation(updateOrganization, {
    onSuccess: () => {
      toast.success(TRANSLATES[language].MESSAGES.UPDATE.SUCCESS);
      refetch();
    },
    onError: async () => {
      toast.error(TRANSLATES[language].MESSAGES.UPDATE.ERROR);
    },
  });
  return { mutate };
}
