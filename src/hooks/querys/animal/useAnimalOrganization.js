import { useQuery } from "react-query";
import useAuthStore from "../../../stores/useAuthStore";
import { getAnimalsByOrganizationId } from "../../../services/animals";
import { useEffect } from "react";

export function useAnimalOrganization(filters) {
  const { organization } = useAuthStore();
  const { data, refetch } = useQuery("animals", () =>
    getAnimalsByOrganizationId(organization, filters)
  );
  useEffect(() => {
    refetch();
  }, [filters, refetch]);
  return { animals: data, refetch };
}
