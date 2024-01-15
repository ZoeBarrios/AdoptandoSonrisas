import { useQuery } from "react-query";
import useAuthStore from "../../stores/useAuthStore";
import { getCasesByOrganizationId } from "../../services/cases";
import ListOfCases from "../listOfCases/ListOfCases";
import { useEffect, useState } from "react";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";
import DropDown from "../dropdown/DropDown";

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
    <section className="flex-container gap-5  h-4/5">
      <h2 className="title">{TRANSLATES[language].LIST_CASES.TITLE}</h2>
      <div className="w-10/12 gap-3 flex flex-col md:flex-row items-center justify-between">
        <DropDown
          name="genre"
          onChange={(e) => handleChangeFilters(e)}
          value={""}
          defaultValue={TRANSLATES[language].FILTERS.ALL}
          defaultDisables={false}
          options={[
            {
              value: false,
              label: TRANSLATES[language].FILTERS.ACTIVE,
            },
            {
              value: true,
              label: TRANSLATES[language].FILTERS.DELETED,
            },
          ]}
        />
      </div>

      <ListOfCases data={data} refetch={refetch} />
    </section>
  );
}
