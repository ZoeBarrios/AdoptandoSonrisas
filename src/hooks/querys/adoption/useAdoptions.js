import { useQuery } from "react-query";
import useAuthStore from "../../../stores/useAuthStore";
import { ROLES } from "../../../utils/constants";
import {
  getAdoptionsByOrganizationId,
  getAdoptionsByUserId,
} from "../../../services/adoptions";
import { useEffect } from "react";

export function useAdoptions(state) {
  const { organization, user } = useAuthStore();
  const { data, refetch, isLoading } = useQuery("adoptions", () => {
    if (user.role == ROLES.USER) {
      return getAdoptionsByUserId(user.id, state);
    } else {
      return getAdoptionsByOrganizationId(organization, state);
    }
  });
  useEffect(() => {
    refetch();
  }, [refetch, state]);
  return {
    adoptions: data,
    refetch,
    isLoading,
  };
}
