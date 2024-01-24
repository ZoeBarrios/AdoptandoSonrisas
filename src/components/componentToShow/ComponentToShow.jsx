import { SECTION_NAMES } from "../../utils/constants";
import InfoUser from "../InfoUser/InfoUser";
import CasesContainer from "../containers/casesContainer/CasesContainer";
import ContainerAdoptions from "../containers/containerAdoptions/ContainerAdoptions";
import ContainerAnimals from "../containers/containerAnimals/ContainerAnimals";
import ContainerOrganizations from "../containers/containerOrganizations/ContainerOrganizations";
import ContainerVolunteeers from "../containers/containerVolunteers/ContainerVolunteers";
import FinancialContainer from "../containers/financialContainer/FinancialContainer";
import ManageOrganizations from "../manageOrganizations/ManageOrganizations";
import ModeratorContainer from "../containers/moderatorsContainer/ModeratorsContainer";
import useLanguageStore from "../../stores/useLanguageStore";
import Loader from "../loader/Loader";
import { useOrganizationByUser } from "../../hooks/querys/organization/useOrganizationByUser";

export default function ComponentToShow({ section }) {
  const { language } = useLanguageStore();
  const {
    organization: data,
    refetch,
    isLoading,
    isError,
  } = useOrganizationByUser();

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
