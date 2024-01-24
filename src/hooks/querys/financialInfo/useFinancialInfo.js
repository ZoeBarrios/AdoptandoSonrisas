import { useQuery } from "react-query";
import useAuthStore from "../../../stores/useAuthStore";
import { getFinancialInfo } from "../../../services/financialInfo";

export function useFinancialInfo() {
  const { organization } = useAuthStore();
  const { data, isLoading, refetch } = useQuery("financial", () =>
    getFinancialInfo(organization)
  );
  return { financial: data, isLoading, refetch };
}
