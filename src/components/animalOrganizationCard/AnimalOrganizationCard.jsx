import Modal from "../modal/Modal";
import FormNewCase from "../forms/create/FormNewCase";
import useModal from "../../hooks/useModal";
import { Link } from "wouter";
import { useMutation } from "react-query";
import { deleteAnimal } from "../../services/animals";
import { showError, showSuccess } from "../../utils/userMessages";
export default function AnimalOrganizationCard({ animal, refetch }) {
  const { showModal, openModal, closeModal } = useModal();
  const { mutate } = useMutation(deleteAnimal, {
    onSuccess: () => {
      showSuccess("Animal eliminado", refetch);
    },
    onError: showError,
  });
  const handleDelete = () => {
    mutate(animal.animal_id);
  };

  console.log(animal);

  return (
    <div className="bg-ligthOrange w-full p-5 rounded flex flex-col md:flex-row gap-5 md:gap-2 justify-between items-center">
      <Link
        to={`/adoptar/${animal.animal_id}`}
        className="flex items-center gap-2"
      >
        <div className="w-20 h-14 overflow-hidden rounded">
          <img
            src={animal.img_url}
            alt={animal.name}
            className="w-full h-full object-cover"
            style={{ objectFit: "cover" }}
          />
        </div>
        <h2 className="text-white">{animal.name}</h2>
      </Link>

      <div className="flex items-center">
        {animal.isDeleted ? (
          <p className="text-center p-5 font-bold text-black">Eliminado</p>
        ) : (
          <button onClick={handleDelete} className="delete-button mr-3">
            Eliminar
          </button>
        )}
        <button
          className="bg-orange p-2 rounded font-bold text-white hover:bg-ligthOrange transition-all"
          onClick={openModal}
        >
          Agregar caso
        </button>
      </div>

      <FormNewCase
        animal={animal.animal_id}
        showModal={showModal}
        closeModal={closeModal}
        refetch={refetch}
      />
    </div>
  );
}
