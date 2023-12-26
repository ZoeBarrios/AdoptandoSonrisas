import { useMutation } from "react-query";
import Modal from "../../modal/Modal";
import { registerAdoption } from "../../../services/adoptions";
import { toast } from "react-toastify";
import { showError } from "../../../utils/userMessages";

export default function AdoptForm({
  name,
  closeModal,
  openModal,
  isShow,
  person_id,
  animal_id,
}) {
  const { mutate } = useMutation(registerAdoption, {
    onSuccess: () => {
      closeModal();
      toast.success(
        "La organización ha sido notificada de tu solicitud de adopción"
      );
    },
    onError: showError,
  });

  const handleAdopt = () => {
    if (!person_id) {
      toast.error("Debes iniciar sesión para poder adoptar");
      return;
    }
    mutate({
      animal_id: animal_id,
      person_id: person_id,
    });
  };
  return (
    <Modal setIsOpen={openModal} isOpen={isShow} setClose={closeModal}>
      <div className="h-full flex flex-col items-center justify-between gap-5 p-5 text-center">
        <h1 className="text-2xl font-bold mb-3">
          ¿Estás seguro de que quieres adoptar a {name}?
        </h1>
        <p className="text-center text-lg">
          Al adoptar a {name} te comprometes a cuidarlo y darle el amor que se
          merece.
        </p>
        <div className="flex flex-row w-full items-center justify-around gap-5">
          <button
            className="font-bold mt-5 bg-green p-2 w-full md:w-6/12 rounded hover:bg-grey transition-colors duration-300 ease-in-out"
            onClick={handleAdopt}
          >
            Adoptar
          </button>
          <button
            className="font-bold mt-5 bg-green p-2 w-full md:w-6/12 rounded hover:bg-grey transition-colors duration-300 ease-in-out"
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
}
