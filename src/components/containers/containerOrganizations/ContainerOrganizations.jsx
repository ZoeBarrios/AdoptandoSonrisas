import ListOfOrganizations from "../../lists/listOfOrganizations/ListOfOrganizations";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import { useNotAppliedOrganization } from "../../../hooks/querys/organization/useNotAppliedOrganization";

export default function ContainerOrganizations() {
  const { language } = useLanguageStore();
  const {
    organizations: data,
    isLoading,
    refetch,
  } = useNotAppliedOrganization();
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
