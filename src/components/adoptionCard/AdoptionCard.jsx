import { useMutation } from "react-query";
import { cancelAdoption } from "../../services/adoptions";

export default function AdoptionCard({ adoption, refetch }) {
  const { animal } = adoption;
  const { mutate } = useMutation(cancelAdoption, {
    onSuccess: () => {
      refetch();
    },
  });
  console.log(adoption);

  const handleCancel = () => {
    mutate({
      animal_id: animal.animal_id,
      person_id: adoption.person_id,
    });
  };

  return (
    <div className="bg-ligthOrange p-5 w-full flex items-center flex-row justify-around">
      <img
        src={animal.img_url}
        alt={animal.name}
        className="object-containt w-25 h-20 rounded"
      />
      <p>{animal.name}</p>
      <p>{new Date(adoption.adoption_date).toLocaleDateString()}</p>
      <p>
        {adoption.isAccepted
          ? "Completada"
          : adoption.isCancelled
          ? "Cancelada"
          : "Pendiente"}
      </p>
      {!adoption.isAccepted && !adoption.isCancelled && (
        <button className="bg-green rounded-lg p-2" onClick={handleCancel}>
          Cancelar petición
        </button>
      )}
    </div>
  );
}
