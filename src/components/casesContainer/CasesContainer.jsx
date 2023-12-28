import { useQuery } from "react-query";
import useAuthStore from "../../stores/useAuthStore";
import { getCasesByOrganizationId } from "../../services/cases";
import ListOfCases from "../listOfCases/ListOfCases";
import { useEffect, useState } from "react";

export default function CasesContainer() {
  const { organization } = useAuthStore();
  const [deleted, setDeleted] = useState("");
  const { data, refetch } = useQuery("cases", () =>
    getCasesByOrganizationId(organization, deleted)
  );

  const handleChangeFilters = (e) => {
    setDeleted(e.target.value);
  };
  useEffect(() => {
    refetch();
  }, [deleted, refetch]);

  return (
    <section className="flex-container gap-5 h-5/6">
      <h2 className="title">Casos</h2>
      <select
        onChange={handleChangeFilters}
        className="w-fit self-start ml-16 md:ml-20 lg:ml-28"
      >
        <option value={""}>Todos</option>
        <option value={false}>Activos</option>
        <option value={true}>Eliminados</option>
      </select>
      <ListOfCases data={data} refetch={refetch} />
    </section>
  );
}
