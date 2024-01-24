import { useQuery } from "react-query";
import { getCase } from "../../../services/cases";

export function useCase(id) {
  const { data, isLoading, refetch } = useQuery(["case", { id }], () =>
    getCase(Number(id))
  );
  return {
    data,
    isLoading,
    refetch,
  };
}
