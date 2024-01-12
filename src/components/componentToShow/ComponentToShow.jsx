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
export default function ComponentToShow({ section }) {
  const { language } = useLanguageStore();
  switch (section[language]) {
    case SECTION_NAMES[language].PROFILE:
      return <InfoUser />;
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
}
