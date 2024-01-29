import { useMutation } from "react-query";
import { deleteAnimal } from "../../../services/animals";
import { showError, showSuccess } from "../../../utils/userMessages";
import { TRANSLATES } from "../../../utils/languajes";
import useLanguageStore from "../../../stores/useLanguageStore";

export function useDeleteAnimal(refetch, animal) {
  const { language } = useLanguageStore();
  const { mutate } = useMutation(deleteAnimal, {
    onSuccess: () => {
      showSuccess(TRANSLATES[language].ANIMAL.DELETED, refetch);
    },
    onError: showError,
  });
  const handleDelete = () => {
    mutate(animal.animal_id);
  };
  return { handleDelete };
}
