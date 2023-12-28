import { useQuery } from "react-query";
import useAuthStore from "../../stores/useAuthStore";
import { getAnimalsByOrganizationId } from "../../services/animals";
import ListOfAnimalsOrganization from "../listOfAnimalsOrganization/ListOfAnimalsOrganization";
import useModal from "../../hooks/useModal";
import FormAnimal from "../forms/create/FormAnimal";
import Modal from "../modal/Modal";
import { useEffect, useState } from "react";

export default function ContainerAnimals() {
  const { organization } = useAuthStore();
  const [filters, setFilters] = useState({
    name: "",
    isDeleted: "",
  });
  const { data, refetch } = useQuery("animals", () =>
    getAnimalsByOrganizationId(organization, filters)
  );
  const { showModal, closeModal, openModal } = useModal();

  const handleChangeFilters = (e) => {
    if (e.key !== "Enter" && e.target.name === "name") return;

    let updatedFilters = { ...filters };
    if (e.target.name === "isDeleted" && e.target.value === "") {
      updatedFilters.name = "";
      updatedFilters.isDeleted = "";
    } else {
      updatedFilters[e.target.name] = e.target.value;
    }
    setFilters(updatedFilters);
  };

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  return (
    <section className="flex-container gap-5 h-4/5">
      <h2 className="title">Animales</h2>
      <div className="w-10/12 gap-3 flex flex-col md:flex-row items-center justify-between">
        <select
          onChange={handleChangeFilters}
          name="isDeleted"
          className="w-full md:w-fit"
        >
          <option value="">Todos</option>
          <option value={true}>Eliminado</option>
          <option value={false}>Activo</option>
        </select>
        <input
          type="text"
          placeholder="Buscar por nombre"
          name="name"
          onKeyDown={handleChangeFilters}
          className="border border-gray-300 rounded-md w-full md:w-1/2 h-10 px-5 pr-16 text-sm focus:outline-none"
        />
      </div>

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
