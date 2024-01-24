import { useQuery } from "react-query";
import { getModeratorsByOrganizationId } from "../../../services/organization";
import useAuthStore from "../../../stores/useAuthStore";

export function useModerators() {
  const { organization } = useAuthStore();
  const { data, refetch, isLoading } = useQuery("moderators", () =>
    getModeratorsByOrganizationId(organization)
  );
  return { data, refetch, isLoading };
}
