import VolunteerCard from "../volunteerCard/VolunteerCard";
import { ROLES } from "../../utils/constants";
import useAuthStore from "../../stores/useAuthStore";

export default function ListOfVolunteering({ data, refetch }) {
  const { user } = useAuthStore();

  return (
    <div className="list-card shadow-card">
      {data?.length <= 0 ? (
        <h2 className="title-no-info">No hay voluntariados registrados</h2>
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
