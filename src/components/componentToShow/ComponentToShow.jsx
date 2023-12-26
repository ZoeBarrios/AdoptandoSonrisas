import { SECCIONES_ES } from "../../utils/constants";
import InfoUser from "../InfoUser/InfoUser";
import CasesContainer from "../casesContainer/CasesContainer";
import ContainerAdoptions from "../containerAdoptions/ContainerAdoptions";
import ContainerAnimals from "../containerAnimals/ContainerAnimals";
import ContainerOrganizations from "../containerOrganizations/ContainerOrganizations";
import ContainerVolunteeers from "../containerVolunteers/ContainerVolunteers";
import FinancialContainer from "../financialContainer/FinancialContainer";
import ManageOrganizations from "../manageOrganizations/ManageOrganizations";
import ModeratorContainer from "../moderatorsContainer/ModeratorsContainer";
export default function ComponentToShow({ section }) {
  switch (section.es) {
    case SECCIONES_ES.PERFIL:
      return <InfoUser />;
    case SECCIONES_ES.ORGANIZACIONES:
      return <ContainerOrganizations />;
    case SECCIONES_ES.VOLUNTARIADOS:
      return <ContainerVolunteeers />;
    case SECCIONES_ES.ADOPCIONES:
      return <ContainerAdoptions />;
    case SECCIONES_ES.MODERADORES:
      return <ModeratorContainer />;
    case SECCIONES_ES.CASOS:
      return <CasesContainer />;
    case SECCIONES_ES.ANIMALES:
      return <ContainerAnimals />;
    case SECCIONES_ES.CONTROL_ORGANIZACIONES:
      return <ManageOrganizations />;
    case SECCIONES_ES.FINANCIAL_SECTION:
      return <FinancialContainer />;
    default:
      return <h1>NO HAY NADA</h1>;
  }
}
