import { useMutation } from "react-query";
import useAuthStore from "../../../stores/useAuthStore";
import { applyToOrganization } from "../../../services/user";
import { showError, showSuccess } from "../../../utils/userMessages";

export function useApplyOrganization(
  setIsOpen,
  selectRef,
  organization,
  refetch
) {
  const { user } = useAuthStore();
  const { mutate } = useMutation(applyToOrganization, {
    onSuccess: () => {
      setIsOpen(false);
      showSuccess("¡Aplicación enviada!", refetch);
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
