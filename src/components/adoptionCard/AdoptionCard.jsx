import { useMutation } from "react-query";
import { cancelAdoption, acceptAdoption } from "../../services/adoptions";
import { ROLES } from "../../utils/constants";
import useAuthStore from "../../stores/useAuthStore";

import { Link } from "wouter";
import { toast } from "react-toastify";
import { showError, showSuccess } from "../../utils/userMessages";

export default function AdoptionCard({ adoption, refetch }) {
  const { user } = useAuthStore();
  const { animal } = adoption;

  const { mutate } = useMutation(cancelAdoption, {
    onSuccess: () => {
      showSuccess("Adopción cancelada", refetch);
    },
  });
  const { mutate: acceptAdop } = useMutation(acceptAdoption, {
    onSuccess: () => {
      showSuccess("Adopción aceptada", refetch);
    },
    onError: showError,
  });

  const handleCancel = () => {
    mutate({
      animal_id: animal.animal_id,
      person_id: adoption.person_id,
    });
  };

  const handleAccept = () => {
    acceptAdop({
      animal_id: animal.animal_id,
      person_id: adoption.person_id,
    });
  };

  return (
    <div className="bg-ligthOrange p-5 w-full rounded flex items-center flex-col md:flex-row justify-between gap-3 text-center">
      <div className="flex flex-row items-center gap-3">
        <div className="w-24 h-24 overflow-hidden rounded">
          <img
            src={animal.img_url}
            alt={animal.name}
            className="object-cover w-full h-full"
          />
        </div>
        <p className="text-xl font-bold">{animal.name}</p>
      </div>

      <p>
        <span className="font-bold">Fecha de solicitud: </span>
        {new Date(adoption.adoption_date).toLocaleDateString()}
      </p>
      {user.role != ROLES.USER && (
        <Link to={`/usuario/${adoption.person_id}`} className="text-base">
          Adoptante
        </Link>
      )}

      {user.role == ROLES.USER ? (
        <>
          <p className="w-24 font-bold">
            {adoption.isAccepted
              ? "Completada"
              : adoption.isCancelled
              ? "Cancelada"
              : "Pendiente"}
          </p>
          {!adoption.isAccepted && !adoption.isCancelled && (
            <button className="delete-button" onClick={handleCancel}>
              Cancelar petición
            </button>
          )}
        </>
      ) : (
        <>
          {adoption.isCancelled ? (
            <p className="w-1/3 text-center text-red-500 font-bold">
              Cancelada
            </p>
          ) : (
            <button
              onClick={adoption.isAccepted ? handleCancel : handleAccept}
              className="buttons-form"
            >
              {adoption.isAccepted ? "Cancelar adopción" : "Aceptar adopción"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
