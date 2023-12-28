import { useQuery } from "react-query";
import useAuthStore from "../../stores/useAuthStore";
import ListOfVolunteering from "../listOfVolunteering/ListOfVolunteering";
import { ROLES } from "../../utils/constants";
import {
  getAppliedOrganizations,
  getPersonsVolunteersByOrganization,
} from "../../services/user";
import SelectActivity from "../selectActivity/SelectActivity";
import { useEffect, useState } from "react";

export default function ContainerVolunteeers() {
  const { user, organization } = useAuthStore();
  const [activity, setActivity] = useState("");

  const { data, refetch } = useQuery("volunteering", () => {
    if (user.role === ROLES.USER) {
      return getAppliedOrganizations(user.id, activity);
    }
    return getPersonsVolunteersByOrganization(organization, activity);
  });

  useEffect(() => {
    refetch();
  }, [activity, refetch]);

  const handleChanges = (e) => {
    setActivity(e.target.value);
  };

  return (
    <section className="flex-container gap-5 h-screen md:h-4/5">
      <h2 className="title">Lista de voluntariados</h2>
      <div className="w-10/12 self-center">
        <SelectActivity onChange={handleChanges} />
      </div>

      <ListOfVolunteering data={data} refetch={refetch} />
    </section>
  );
}
