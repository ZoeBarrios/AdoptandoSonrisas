import { useMutation } from "react-query";
import { deleteCase } from "../../../services/cases";
import { toast } from "react-toastify";

export function useDeleteCase(refetch, caseInfo) {
  const { mutate } = useMutation(deleteCase, {
    onSuccess: () => {
      refetch();
      toast.success("Caso eliminado");
    },
    onError: () => {
      toast.error("Error al eliminar el caso");
    },
  });

  const handleDelete = () => {
    mutate(caseInfo.case_id);
    refetch();
  };

  return { handleDelete };
}
