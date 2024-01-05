import { useQuery } from "react-query";
import useAuthStore from "../../stores/useAuthStore";
import ListOfOrganizations from "../listOfOrganizations/ListOfOrganizations";
import { getNotApllidedOrganizations } from "../../services/organization";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";

export default function ContainerOrganizations() {
  const { user } = useAuthStore();
  const { data, isLoading, refetch } = useQuery("organizations", () =>
    getNotApllidedOrganizations(user.id)
  );
  const { language } = useLanguageStore();
  return (
    <section className="flex-container gap-5 h-screen md:h-4/5">
      <h2 className="title">{TRANSLATES[language].ORGANIZATIONS.TITLE}</h2>
      <ListOfOrganizations
        data={data}
        isLoading={isLoading}
        refetch={refetch}
      />
    </section>
  );
}
