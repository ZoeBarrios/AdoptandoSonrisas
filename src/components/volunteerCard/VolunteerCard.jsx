import { useMutation, useQuery } from "react-query";
import { getActivity } from "../../services/activity";
import { deletePersonFromOrganization } from "../../services/user";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import useAuthStore from "../../stores/useAuthStore";
import { ROLES } from "../../utils/constants";
import { Link } from "wouter";
import { showError, showSuccess } from "../../utils/userMessages";

export default function VolunteerCard({ volunteering, refetch }) {
  const { user, organization: org } = useAuthStore();
  const { organization } = volunteering;
  const { data, isLoading } = useQuery("activity", () =>
    getActivity(volunteering.activity_id)
  );

  const { mutate } = useMutation(deletePersonFromOrganization, {
    onSuccess: () => {
      showSuccess("Voluntariado eliminado", refetch);
    },
    onError: showError,
  });

  console.log(volunteering);

  const handleDelete = () => {
    mutate({
      organization_id:
        user.role == ROLES.USER ? organization.organization_id : org,
      person_id: volunteering.person_id,
    });
  };

  return (
    <div className="flex flex-col md:flex-row text-center items-center justify-around p-5 bg-ligthOrange rounded w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {user.role == ROLES.USER ? (
            <Link
              to={`/organizacion/${organization.organization_id}`}
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

          <p>Ingreso: {volunteering.joinedDate}</p>
          <p>Actividad: {data?.data.activity_name}</p>
          {volunteering.isActive ? (
            <button onClick={handleDelete} className="buttons-form">
              Quitar voluntariado
            </button>
          ) : (
            <p className="text-red-500 font-bold">Voluntariado eliminado</p>
          )}
        </>
      )}
    </div>
  );
}
