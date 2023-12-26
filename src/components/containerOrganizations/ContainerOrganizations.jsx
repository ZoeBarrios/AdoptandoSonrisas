import { useQuery } from "react-query";
import useAuthStore from "../../stores/useAuthStore";
import ListOfOrganizations from "../listOfOrganizations/ListOfOrganizations";
import { getNotApllidedOrganizations } from "../../services/organization";

export default function ContainerOrganizations() {
  const { user } = useAuthStore();
  const { data, isLoading, refetch } = useQuery("organizations", () =>
    getNotApllidedOrganizations(user.id)
  );
  return (
    <section className="flex-container gap-5 h-screen md:h-4/5">
      <h2 className="title">Lista de organizaciones</h2>
      <ListOfOrganizations
        data={data}
        isLoading={isLoading}
        refetch={refetch}
      />
    </section>
  );
}
