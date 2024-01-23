import { useMutation, useQuery } from "react-query";
import { getActivity } from "../../services/activity";
import { deletePersonFromOrganization } from "../../services/user";
import Loader from "../loader/Loader";
import useAuthStore from "../../stores/useAuthStore";
import { ROLES } from "../../utils/constants";
import { Link } from "wouter";
import { showError, showSuccess } from "../../utils/userMessages";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";

export default function VolunteerCard({ volunteering, refetch }) {
  const { user, organization: org } = useAuthStore();
  const { language } = useLanguageStore();
  const { organization } = volunteering;

  const { mutate } = useMutation(deletePersonFromOrganization, {
    onSuccess: () => {
      showSuccess(TRANSLATES[language].MESSAGES.VOLUNTEERING.SUCCESS, refetch);
    },
    onError: showError,
  });

  const handleDelete = () => {
    mutate({
      organization_id:
        user.role == ROLES.USER ? organization.organization_id : org,
      person_id: volunteering.person_id,
    });
  };

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
