import { useQuery } from "react-query";
import useAuthStore from "../../stores/useAuthStore";
import { getCasesByOrganizationId } from "../../services/cases";
import ListOfCases from "../listOfCases/ListOfCases";

export default function CasesContainer() {
  const { organization } = useAuthStore();
  const { data, refetch } = useQuery("cases", () =>
    getCasesByOrganizationId(organization)
  );
  return (
    <section className="flex-container gap-5 h-5/6">
      <h2 className="title">Casos</h2>
      <ListOfCases data={data} refetch={refetch} />
    </section>
  );
}
