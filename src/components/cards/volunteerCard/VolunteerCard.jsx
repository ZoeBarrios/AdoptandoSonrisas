import useAuthStore from "../../../stores/useAuthStore";
import { ROLES } from "../../../utils/constants";
import { Link } from "wouter";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import { useDeletePersonFromOrganization } from "../../../hooks/mutations/person/useDeletePersonFromOrganization";

export default function VolunteerCard({ volunteering, refetch }) {
  const { user } = useAuthStore();
  const { handleDelete } = useDeletePersonFromOrganization(
    refetch,

    {
      organization_id: volunteering.organization_id,
      person_id: volunteering.person_id,
    }
  );
  const { language } = useLanguageStore();
  const { organization } = volunteering;

  return (
    <div className="flex flex-col md:flex-row text-center items-center justify-around p-5 bg-ligthOrange rounded w-full">
      {user.role == ROLES.USER ? (
        <Link
          to={`/organizacion/${organization?.organization_id}`}
          className="font-bold"
        >
          {organization?.name}
        </Link>
      ) : (
        <Link
          to={`/usuario/${volunteering?.person?.person_id}`}
          className="font-bold"
        >
          {volunteering?.person?.name}
        </Link>
      )}

      <p>
        {TRANSLATES[language].VOLUNTEERS.ADMISSION}: {volunteering.joinedDate}
      </p>

      {volunteering.isActive ? (
        <button onClick={handleDelete} className="buttons-form">
          {TRANSLATES[language].BUTTONS.REMOVE_VOLUNTEERING}
        </button>
      ) : (
        <p className="text-red-500 font-bold">
          {TRANSLATES[language].BUTTONS.REMOVED_VOLUNTEERING}
        </p>
      )}
    </div>
  );
}
