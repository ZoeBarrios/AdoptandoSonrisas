import { useQuery } from "react-query";
import useAuthStore from "../../stores/useAuthStore";
import { getAnimalsByOrganizationId } from "../../services/animals";
import ListOfAnimalsOrganization from "../listOfAnimalsOrganization/ListOfAnimalsOrganization";
import useModal from "../../hooks/useModal";
import FormAnimal from "../forms/create/FormAnimal";
import Modal from "../modal/Modal";

export default function ContainerAnimals() {
  const { organization } = useAuthStore();
  const { data, refetch } = useQuery("animals", () =>
    getAnimalsByOrganizationId(organization)
  );
  const { showModal, closeModal, openModal } = useModal();

  return (
    <section className="flex-container gap-5 h-4/5">
      <h2 className="title">Animales</h2>
      <ListOfAnimalsOrganization data={data} refetch={refetch} />
      <button className="buttons-form" onClick={openModal}>
        Agregar animal
      </button>
      <Modal isOpen={showModal} setClose={closeModal}>
        <FormAnimal closeModal={closeModal} refetch={refetch} />
      </Modal>
    </section>
  );
}
