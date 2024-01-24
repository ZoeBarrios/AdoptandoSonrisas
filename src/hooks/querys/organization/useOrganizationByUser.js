import { useLocation } from "wouter";
import useAuthStore from "../../../stores/useAuthStore";
import { useAuth } from "../../useAuth";
import { useQuery } from "react-query";
import { getOrganizacionByAdminOrModerator } from "../../../services/organization";
import { setToLocalStorage } from "../../../utils/localStorageFunctions";
import { toast } from "react-toastify";
import { ROLES } from "../../../utils/constants";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";

export function useOrganizationByUser() {
  const { user, setOrganization } = useAuthStore();
  const { handleLogout } = useAuth();
  const [__, setLocation] = useLocation();
  const { language } = useLanguageStore();
  const { data, refetch, isLoading, isError } = useQuery(
    "organization",
    () => {
      if (user.role !== ROLES.USER && user.role !== ROLES.SUPERADMIN)
        return getOrganizacionByAdminOrModerator(Number(user.id));
      else return null;
    },
    {
      onError: (error) => {
        if (error.status == 401) {
          handleLogout();
          toast.error(TRANSLATES[language].MESSAGES.EXPIRED);
        } else if (error.status == 400) {
          toast.error(TRANSLATES[language].MESSAGES.NO_ORGANIZATION);
          handleLogout();
        }

        setLocation("/");
      },
      onSuccess: async (data) => {
        setToLocalStorage(
          "organization",
          (data && data[0] && data[0].organization_id) || null
        );
        setOrganization((data && data[0] && data[0].organization_id) || null);
      },
    }
  );
  return { organization: data, refetch, isLoading, isError };
}
