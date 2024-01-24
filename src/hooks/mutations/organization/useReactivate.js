import { useMutation } from "react-query";
import { applyToOrganization } from "../../../services/user";
import { showSuccess } from "../../../utils/userMessages";
import { TRANSLATES } from "../../../utils/languajes";
import { toast } from "react-toastify";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useReactivate(refetch, { organization_id, person_id }) {
  const { language } = useLanguageStore();
  const { mutate: reactivate } = useMutation(applyToOrganization, {
    onSuccess: () => {
      showSuccess(TRANSLATES[language].MESSAGES.PERSON.REACTIVATE, refetch);
    },
    onError: () => {
      toast.error(TRANSLATES[language].MESSAGES.PERSON.ERROR);
    },
  });

  const handleReactivate = () => {
    reactivate({
      person_id: person_id,
      organization_id: organization_id,
    });
  };
  return { handleReactivate };
}
