import ListOfVolunteering from "../../lists/listOfVolunteering/ListOfVolunteering";
import useLanguageStore from "../../../stores/useLanguageStore";
import SelectActivity from "../../selectActivity/SelectActivity";
import { TRANSLATES } from "../../../utils/languajes";
import { useVolunteers } from "../../../hooks/querys/volunteer/useVolunteers";
import { useState } from "react";

export default function ContainerVolunteeers() {
  const [activity, setActivity] = useState("1");
  const { volunteers: data, refetch } = useVolunteers(activity);

  const handleChanges = (e) => {
    setActivity(e.target.value);
  };
  const { language } = useLanguageStore();

  return (
    <section className="flex-container gap-5 h-screen md:h-4/5">
      <h2 className="title">{TRANSLATES[language].VOLUNTEERS.TITLE}</h2>
      <div className="w-10/12 self-center">
        <SelectActivity onChange={handleChanges} />
      </div>

      <ListOfVolunteering data={data} refetch={refetch} />
    </section>
  );
}
