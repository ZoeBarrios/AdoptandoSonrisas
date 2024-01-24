import { useMutation } from "react-query";
import { cancelAdoption } from "../../../services/adoptions";
import { showSuccess } from "../../../utils/userMessages";

export function useCancelAdoption(refetch, animal, adoption) {
  const { mutate } = useMutation(cancelAdoption, {
    onSuccess: () => {
      showSuccess("Adopción cancelada", refetch);
    },
  });

  const handleCancel = () => {
    mutate({
      animal_id: animal.animal_id,
      person_id: adoption.person_id,
    });
  };

  return { handleCancel };
}
