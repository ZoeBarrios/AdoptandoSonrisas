import { useQuery } from "react-query";
import { getUserById } from "../../../services/user";

export function usePerson(id) {
  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery(["user"], () => getUserById(Number(id)), {
    enabled: !!id,
  });
  return { userData, isLoading, refetch };
}
