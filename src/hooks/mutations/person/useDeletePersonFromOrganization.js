import { useMutation } from "react-query";
import { deletePersonFromOrganization } from "../../../services/user";
import { showError, showSuccess } from "../../../utils/userMessages";
import { TRANSLATES } from "../../../utils/languajes";
import useAuthStore from "../../../stores/useAuthStore";
import { ROLES } from "../../../utils/constants";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useDeletePersonFromOrganization(
  refetch,
  { organization_id, person_id }
) {
  const { language } = useLanguageStore();
  const { user, organization } = useAuthStore();
  const { mutate } = useMutation(deletePersonFromOrganization, {
    onSuccess: () => {
      showSuccess(TRANSLATES[language].MESSAGES.VOLUNTEERING.SUCCESS, refetch);
    },
    onError: showError,
  });
  const handleDelete = () => {
    mutate({
      organization_id:
        user.role == ROLES.USER || user.role == ROLES.SUPERADMIN
          ? organization_id
          : organization,
      person_id: person_id,
    });
  };
  return {
    handleDelete,
  };
}
