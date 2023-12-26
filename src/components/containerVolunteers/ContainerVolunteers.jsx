import { useQuery } from "react-query";
import useAuthStore from "../../stores/useAuthStore";
import ListOfVolunteering from "../listOfVolunteering/ListOfVolunteering";
import { ROLES } from "../../utils/constants";
import {
  getAppliedOrganizations,
  getPersonsVolunteersByOrganization,
} from "../../services/user";

export default function ContainerVolunteeers() {
  const { user, organization } = useAuthStore();
  const { data, refetch } = useQuery("volunteering", () => {
    if (user.role === ROLES.USER) {
      return getAppliedOrganizations(user.id);
    }
    return getPersonsVolunteersByOrganization(organization);
  });

  return (
    <section className="flex-container gap-5 h-screen md:h-4/5">
      <h2 className="title">Lista de voluntariados</h2>
      <ListOfVolunteering data={data} refetch={refetch} />
    </section>
  );
}
