import { useMutation } from "react-query";
import useAuthStore from "../../../stores/useAuthStore";
import { applyToOrganization } from "../../../services/user";
import { showError, showSuccess } from "../../../utils/userMessages";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useApplyOrganization(
  setIsOpen,
  selectRef,
  organization,
  refetch
) {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const { mutate } = useMutation(applyToOrganization, {
    onSuccess: () => {
      setIsOpen(false);
      showSuccess(TRANSLATES[language].MESSAGES.APPLY.SUCCESS, refetch);
    },
    onError: showError,
  });

  const handleApply = () => {
    mutate({
      activity_id: selectRef.current.value,
      organization_id: organization.organization_id,
      person_id: user.id,
    });
  };
  return { handleApply };
}
