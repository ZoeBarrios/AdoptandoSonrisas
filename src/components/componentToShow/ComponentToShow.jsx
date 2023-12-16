import { ROLES, SECCIONES_ES } from "../../utils/constants";
import InfoUser from "../InfoUser/InfoUser";
import ListOfAdoptions from "../listOfAdoptions/ListOfAdoptions";
import ListOfOrganizations from "../listOfOrganizations/ListOfOrganizations";
import ListOfVolunteering from "../listOfVolunteering/ListOfVolunteering";
export default function ComponentToShow({ section }) {
  switch (section.es) {
    case SECCIONES_ES.PERFIL:
      return <InfoUser />;
    case SECCIONES_ES.ORGANIZACIONES:
      return <ListOfOrganizations />;
    case SECCIONES_ES.VOLUNTARIADOS:
      return <ListOfVolunteering />;
    case SECCIONES_ES.ADOPCIONES:
      return <ListOfAdoptions />;
    default:
      return <h1>NO HAY NADA</h1>;
  }
}
