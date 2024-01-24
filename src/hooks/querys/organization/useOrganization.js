import { useQuery } from "react-query";
import { getOrganization } from "../../../services/organization";

export function useOrganization(id) {
  const { data, isLoading, isError } = useQuery(["organization", id], () =>
    getOrganization(id)
  );
  return { data, isLoading, isError };
}
