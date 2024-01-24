import { useMutation } from "react-query";
import { acceptOrganization } from "../../../services/organization";
import { toast } from "react-toastify";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useAcceptOrganization(refetch, organization_id) {
  const { language } = useLanguageStore();
  const { mutate: acceptOrg } = useMutation(acceptOrganization, {
    onSuccess: () => {
      toast.success(TRANSLATES[language].ORGANIZATIONS.ACEPTED_ORGANIZATION);
      refetch();
    },
  });

  const handleAccept = () => {
    acceptOrg(organization_id);
  };
  return { handleAccept };
}
