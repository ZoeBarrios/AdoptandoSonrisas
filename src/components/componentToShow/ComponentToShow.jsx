import { SECTION_NAMES } from "../../utils/constants";
import InfoUser from "../InfoUser/InfoUser";
import CasesContainer from "../casesContainer/CasesContainer";
import ContainerAdoptions from "../containerAdoptions/ContainerAdoptions";
import ContainerAnimals from "../containerAnimals/ContainerAnimals";
import ContainerOrganizations from "../containerOrganizations/ContainerOrganizations";
import ContainerVolunteeers from "../containerVolunteers/ContainerVolunteers";
import FinancialContainer from "../financialContainer/FinancialContainer";
import ManageOrganizations from "../manageOrganizations/ManageOrganizations";
import ModeratorContainer from "../moderatorsContainer/ModeratorsContainer";
import useLanguageStore from "../../stores/useLanguageStore";
import useAuthStore from "../../stores/useAuthStore";
import { useQuery } from "react-query";
import { getOrganizacionByAdminOrModerator } from "../../services/organization";
import { setToLocalStorage } from "../../utils/localStorageFunctions";
import { useLocation } from "wouter";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { ROLES } from "../../utils/constants";
import { TRANSLATES } from "../../utils/languajes";
import Loader from "../loader/Loader";

export default function ComponentToShow({ section }) {
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

  const component = () => {
    switch (section[language]) {
      case SECTION_NAMES[language].PROFILE:
        return <InfoUser data={data} refetch={refetch} />;
      case SECTION_NAMES[language].ORGANIZATIONS:
        return <ContainerOrganizations />;
      case SECTION_NAMES[language].VOLUNTEERS:
        return <ContainerVolunteeers />;
      case SECTION_NAMES[language].ADOPTIONS:
        return <ContainerAdoptions />;
      case SECTION_NAMES[language].MODERATORS:
        return <ModeratorContainer />;
      case SECTION_NAMES[language].CASES:
        return <CasesContainer />;
      case SECTION_NAMES[language].ANIMALS:
        return <ContainerAnimals />;
      case SECTION_NAMES[language].CONTROL_ORGANIZATIONS:
        return <ManageOrganizations />;
      case SECTION_NAMES[language].FINANCIAL_SECTION:
        return <FinancialContainer />;
      default:
        return <h1>Error</h1>;
    }
  };

  return isLoading || isError ? <Loader /> : component();
}
