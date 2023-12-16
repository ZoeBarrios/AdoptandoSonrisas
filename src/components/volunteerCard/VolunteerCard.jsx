import { useMutation, useQuery } from "react-query";
import { getActivity } from "../../services/activity";
import { deletePersonFromOrganization } from "../../services/user";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";

export default function VolunteerCard({ volunteering, refetch }) {
  const { organization } = volunteering;
  const { data, isLoading } = useQuery("activity", () =>
    getActivity(volunteering.activity_id)
  );

  const { mutate } = useMutation(deletePersonFromOrganization, {
    onSuccess: () => {
      refetch();
    },
    onError: async (error) => {
      const { message } = await error.json();
      toast.error(message);
    },
  });

  const handleDelete = () => {
    mutate({
      organization_id: organization.organization_id,
      person_id: volunteering.person_id,
    });
  };

  return (
    <div className="flex flex-row items-center justify-around p-5 bg-ligthOrange rounded-lg w-full shadow-card">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <p>{organization?.name}</p>
          <p>Ingreso: {volunteering.joinedDate}</p>
          <p>Actividad: {data?.data.activity_name}</p>
          <button onClick={handleDelete}>Quitar voluntariado</button>
        </>
      )}
    </div>
  );
}
