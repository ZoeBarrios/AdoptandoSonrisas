import { useQuery } from "react-query";
import { getFinancialInfo } from "../../../services/financialInfo";

export function useOrganizationFinancialInfo(idOrg) {
  const {
    data,
    isLoading: isLoadingOrg,
    refetch,
  } = useQuery(["organization", idOrg], () => getFinancialInfo(idOrg), {
    enabled: !!idOrg,
  });
  return { data, isLoadingOrg, refetch };
}
