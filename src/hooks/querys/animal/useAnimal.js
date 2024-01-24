import { useQuery } from "react-query";
import { getAnimal } from "../../../services/animals";

export function useAnimal(id) {
  const { data, isLoading, refetch } = useQuery(["animal", { id }], () =>
    getAnimal(Number(id))
  );
  return { data, isLoading, refetch };
}
