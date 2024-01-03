import { deletePersonFromOrganization } from "../../services/organization";
import { useMutation } from "react-query";
import useAuthStore from "../../stores/useAuthStore";
import { applyToOrganization } from "../../services/user";
import { showError, showSuccess } from "../../utils/userMessages";
import { Link } from "wouter";

export default function PersonCard({
  person: data,
  refetch,
  organization_id = null,
}) {
  const { person } = data;
  const { organization } = useAuthStore();
  const { mutate } = useMutation(deletePersonFromOrganization, {
    onSuccess: () => {
      showSuccess("Persona eliminada de la organización con éxito", refetch);
    },
    onError: showError,
  });
  const { mutate: reactivate } = useMutation(applyToOrganization, {
    onSuccess: () => {
      showSuccess("Persona reactivada con éxito", refetch);
    },
    onError: showError,
  });
  const handleDelete = () => {
    mutate({
      person_id: person.person_id,
      organization_id: organization_id || organization,
    });
  };

  const handleReactivate = () => {
    reactivate({
      person_id: person.person_id,
      organization_id: organization_id || organization,
    });
  };
  return (
    <div className="w-full rounded flex flex-col md:flex-row items-center justify-between bg-ligthOrange p-2">
      <Link
        to={`/usuario/${person.person_id}`}
        className="flex flex-row gap-3 flex-1"
      >
        <p className="text-lg font-bold ">{person.person_id}</p>
        <p className="text-lg cursor-pointer">{person.name.toUpperCase()}</p>
      </Link>
      <p className="text-lg flex-1">{person.email}</p>
      <p className="text-lg flex-1">{person.phone || "Sin telefono"}</p>
      {data.isActive ? (
        <button className="buttons-form flex-1" onClick={handleDelete}>
          Eliminar de la organización
        </button>
      ) : (
        <button className="buttons-form flex-1" onClick={handleReactivate}>
          Reactivar
        </button>
      )}
    </div>
  );
}
