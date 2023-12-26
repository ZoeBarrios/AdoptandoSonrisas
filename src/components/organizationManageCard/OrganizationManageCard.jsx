import { useMutation } from "react-query";
import { Link } from "wouter";
import {
  acceptOrganization,
  deleteOrganization,
} from "../../services/organization";
import { toast } from "react-toastify";

export default function OrganizationManageCard({
  organization,
  active = false,
  refetch,
}) {
  const { mutate: deleteOrg } = useMutation(deleteOrganization, {
    onSuccess: () => {
      toast.success("Organización eliminada");
      refetch();
    },
  });
  const { mutate: acceptOrg } = useMutation(acceptOrganization, {
    onSuccess: () => {
      toast.success("Organización aceptada");
      refetch();
    },
  });
  const handleDelete = () => {
    deleteOrg(organization.organization_id);
  };

  const handleAccept = () => {
    acceptOrg(organization.organization_id);
  };
  return (
    <div className="flex flex-col gap-5 w-full  md:flex-row bg-ligthOrange p-5 w-full rounded items-center justify-between">
      <Link
        to={`/organizacion/${organization.organization_id}`}
        className="text-2xl font-bold text-center md:text-left"
      >
        {organization.name}
      </Link>
      <p>{organization.email}</p>
      {active ? (
        <button onClick={handleDelete} className="delete-button">
          Eliminar
        </button>
      ) : (
        <div className="flex w-full md:w-3/6 items-center justify-around flex-row">
          <button onClick={handleAccept} className="buttons-form">
            Aceptar
          </button>
          <button onClick={handleDelete} className="delete-button">
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}
