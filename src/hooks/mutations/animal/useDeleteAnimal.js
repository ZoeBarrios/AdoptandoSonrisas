import { useMutation } from "react-query";
import { deleteAnimal } from "../../../services/animals";
import { showError, showSuccess } from "../../../utils/userMessages";

export function useDeleteAnimal(refetch, animal) {
  const { mutate } = useMutation(deleteAnimal, {
    onSuccess: () => {
      showSuccess("Animal eliminado", refetch);
    },
    onError: showError,
  });
  const handleDelete = () => {
    mutate(animal.animal_id);
  };
  return { handleDelete };
}
