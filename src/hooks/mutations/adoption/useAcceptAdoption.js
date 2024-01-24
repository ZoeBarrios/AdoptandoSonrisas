import { useMutation } from "react-query";
import { acceptAdoption } from "../../../services/adoptions";
import { showError, showSuccess } from "../../../utils/userMessages";

export function useAcceptAdoption(refetch, animal, adoption) {
  const { mutate: acceptAdop } = useMutation(acceptAdoption, {
    onSuccess: () => {
      showSuccess("Adopción aceptada", refetch);
    },
    onError: showError,
  });
  const handleAccept = () => {
    acceptAdop({
      animal_id: animal.animal_id,
      person_id: adoption.person_id,
    });
  };
  return { handleAccept };
}
