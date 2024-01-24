import { useMutation } from "react-query";
import { deleteOrganization } from "../../../services/organization";
import { toast } from "react-toastify";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useDeleteOrganization(organization_id, refetch) {
  const { language } = useLanguageStore();
  const { mutate: deleteOrg } = useMutation(deleteOrganization, {
    onSuccess: () => {
      toast.success(TRANSLATES[language].ORGANIZATIONS.DELETED_ORGANIZATION);
      refetch();
    },
  });
  const handleDelete = () => {
    deleteOrg(organization_id);
  };
  return { handleDelete };
}
