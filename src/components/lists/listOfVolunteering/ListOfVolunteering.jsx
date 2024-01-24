import VolunteerCard from "../../cards/volunteerCard/VolunteerCard";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";

export default function ListOfVolunteering({ data, refetch }) {
  const { language } = useLanguageStore();

  return (
    <div className="list-card shadow-card">
      {data?.length <= 0 ? (
        <h2 className="title-no-info">
          {TRANSLATES[language].VOLUNTEERS.NO_VOLUNTEERS}
        </h2>
      ) : (
        <>
          {data?.map((volunteering, index) => (
            <VolunteerCard
              key={index}
              volunteering={volunteering}
              refetch={refetch}
            />
          ))}
        </>
      )}
    </div>
  );
}
