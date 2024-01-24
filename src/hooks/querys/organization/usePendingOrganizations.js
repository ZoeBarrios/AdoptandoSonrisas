import { useQuery } from "react-query";
import { getPendingOrganizations } from "../../../services/organization";

export function usePendingOrganizations() {
  const { data: pending, refetch: refetchPending } = useQuery(
    "pendingOrganizations",
    getPendingOrganizations
  );

  return { pending, refetchPending };
}
