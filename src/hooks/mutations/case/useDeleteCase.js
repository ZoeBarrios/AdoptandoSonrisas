import { useMutation } from "react-query";
import { deleteCase } from "../../../services/cases";
import { toast } from "react-toastify";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useDeleteCase(refetch, caseInfo) {
  const { language } = useLanguageStore();
  const { mutate } = useMutation(deleteCase, {
    onSuccess: () => {
      refetch();
      toast.success(TRANSLATES[language].CASES.DELETED);
    },
    onError: () => {
      toast.error(TRANSLATES[language].CASES.ERROR_DELETED);
    },
  });

  const handleDelete = () => {
    mutate(caseInfo.case_id);
    refetch();
  };

  return { handleDelete };
}
