import { useQuery } from "react-query";
import useAuthStore from "../../../stores/useAuthStore";
import { ROLES } from "../../../utils/constants";
import {
  getAppliedOrganizations,
  getPersonsVolunteersByOrganization,
} from "../../../services/user";
import { useEffect } from "react";

export function useVolunteers(activity) {
  const { user, organization } = useAuthStore();
  const { data, refetch } = useQuery("volunteering", () => {
    if (user.role === ROLES.USER) {
      return getAppliedOrganizations(user.id, activity);
    }
    return getPersonsVolunteersByOrganization(organization, activity);
  });

  useEffect(() => {
    refetch();
  }, [activity, refetch]);

  return { volunteers: data, refetch };
}
