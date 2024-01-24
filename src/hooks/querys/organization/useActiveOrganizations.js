import { useQuery } from "react-query";
import { getActiveOrganizations } from "../../../services/organization";

export function useActiveOrganizations() {
  const { data: active, refetch: refetchActive } = useQuery(
    "activeOrganizations",
    getActiveOrganizations
  );
  return { active, refetchActive };
}
