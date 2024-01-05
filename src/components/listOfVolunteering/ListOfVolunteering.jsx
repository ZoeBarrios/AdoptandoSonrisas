import VolunteerCard from "../volunteerCard/VolunteerCard";
import { ROLES } from "../../utils/constants";
import useAuthStore from "../../stores/useAuthStore";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";

export default function ListOfVolunteering({ data, refetch }) {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();

  return (
    <div className="list-card shadow-card">
      {data?.length <= 0 ? (
        <h2 className="title-no-info">
          {TRANSLATES[language].VOLUNTEERS.NO_VOLUNTEERS}
        </h2>
      ) : (
        <>
          {data?.map((volunteering) => (
            <VolunteerCard
              key={
                user.role == ROLES.USER
                  ? volunteering.organization_id
                  : volunteering.person_id
              }
              volunteering={volunteering}
              refetch={refetch}
            />
          ))}
        </>
      )}
    </div>
  );
}
