import { useQuery } from "react-query";
import { getAdminsByOrganizationId } from "../../../services/organization";

export function useAdmins(id) {
  const { data, refetch } = useQuery("admins", () =>
    getAdminsByOrganizationId(id)
  );
  return { data, refetch };
}
