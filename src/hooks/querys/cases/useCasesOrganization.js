import { useQuery } from "react-query";
import useAuthStore from "../../../stores/useAuthStore";
import { getCasesByOrganizationId } from "../../../services/cases";
import { useEffect } from "react";

export const useCasesOrganization = (deleted) => {
  const { organization } = useAuthStore();
  const { data, refetch } = useQuery("cases", () =>
    getCasesByOrganizationId(organization, deleted)
  );

  useEffect(() => {
    refetch();
  }, [deleted, refetch]);
  return {
    casesOrganization: data,
    refetch,
  };
};
