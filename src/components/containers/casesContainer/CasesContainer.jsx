import ListOfCases from "../../lists/listOfCases/ListOfCases";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import DropDown from "../../dropdown/DropDown";
import { useCasesOrganization } from "../../../hooks/querys/cases/useCasesOrganization";
import { useState } from "react";

export default function CasesContainer() {
  const [deleted, setDeleted] = useState("");
  const { language } = useLanguageStore();
  const { casesOrganization: data, refetch } = useCasesOrganization(deleted);

  const handleChangeFilters = (e) => {
    setDeleted(e.target.value);
  };

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
