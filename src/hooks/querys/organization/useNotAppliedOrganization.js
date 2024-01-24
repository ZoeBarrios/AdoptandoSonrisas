import { useQuery } from "react-query";
import useAuthStore from "../../../stores/useAuthStore";
import { getNotApllidedOrganizations } from "../../../services/organization";

export function useNotAppliedOrganization() {
  const { user } = useAuthStore();
  const { data, isLoading, refetch } = useQuery("organizations", () =>
    getNotApllidedOrganizations(user.id)
  );
  return { organizations: data, isLoading, refetch };
}
