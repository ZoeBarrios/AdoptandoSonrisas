import { useQuery } from "react-query";
import { getOrganizations } from "../../../services/organization";

export function useOrganizations() {
  const { data, isLoading } = useQuery("organizations", getOrganizations);
  return { data, isLoading };
}
