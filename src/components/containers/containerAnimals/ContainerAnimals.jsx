import ListOfAnimalsOrganization from "../../lists/listOfAnimalsOrganization/ListOfAnimalsOrganization";
import useModal from "../../../hooks/useModal";
import FormAnimal from "../../forms/create/FormAnimal";
import Modal from "../../modal/Modal";
import { useState } from "react";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import DropDown from "../../dropdown/DropDown";
import { useAnimalOrganization } from "../../../hooks/querys/animal/useAnimalOrganization";

export default function ContainerAnimals() {
  const { language } = useLanguageStore();
  const [filters, setFilters] = useState({
    name: "",
    isDeleted: "",
  });
  const { animals: data, refetch } = useAnimalOrganization(filters);
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

  return (
    <section className="flex-container gap-5 h-4/5">
      <h2 className="title">{TRANSLATES[language].ANIMALS.TITLE}</h2>
      <div className="w-10/12 gap-3 flex flex-col md:flex-row items-center justify-between">
        <DropDown
          name="isDeleted"
          onChange={(e) => handleChangeFilters(e)}
          value={""}
          defaultValue={TRANSLATES[language].FILTERS.ALL}
          defaultDisables={false}
          options={[
            {
              value: false,
              label: TRANSLATES[language].FILTERS.ACTIVE,
            },
            {
              value: true,
              label: TRANSLATES[language].FILTERS.DELETED,
            },
          ]}
        />
        <input
          type="text"
          placeholder={TRANSLATES[language].ANIMALS.PLACEHOLDER}
          name="name"
          onKeyDown={handleChangeFilters}
          className="border border-gray-300 rounded-md w-full md:w-1/2 h-10 px-5 pr-16 text-sm focus:outline-none"
        />
      </div>

      <ListOfAnimalsOrganization data={data} refetch={refetch} />
      <button className="buttons-form" onClick={openModal}>
        {TRANSLATES[language].BUTTONS.ADD_ANIMAL}
      </button>
      <Modal isOpen={showModal} setClose={closeModal}>
        <FormAnimal closeModal={closeModal} refetch={refetch} />
      </Modal>
    </section>
  );
}
