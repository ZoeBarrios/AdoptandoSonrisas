import { useQuery } from "react-query";
import useAuthStore from "../../stores/useAuthStore";
import { getCasesByOrganizationId } from "../../services/cases";
import ListOfCases from "../listOfCases/ListOfCases";
import { useEffect, useState } from "react";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";

export default function CasesContainer() {
  const { organization } = useAuthStore();
  const [deleted, setDeleted] = useState("");
  const { language } = useLanguageStore();
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
      <h2 className="title">{TRANSLATES[language].LIST_CASES.TITLE}</h2>
      <div className="w-10/12 gap-3 flex flex-col md:flex-row items-center justify-between">
        <select onChange={handleChangeFilters} className="w-full md:w-fit">
          <option value={""}>{TRANSLATES[language].FILTERS.ALL}</option>
          <option value={false}>{TRANSLATES[language].FILTERS.ACTIVE}</option>
          <option value={true}>{TRANSLATES[language].FILTERS.DELETED}</option>
        </select>
      </div>

      <ListOfCases data={data} refetch={refetch} />
    </section>
  );
}
