import FormNewCase from "../../forms/create/FormNewCase";
import useModal from "../../../hooks/useModal";
import { Link } from "wouter";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import { useDeleteAnimal } from "../../../hooks/mutations/animal/useDeleteAnimal";
export default function AnimalOrganizationCard({ animal, refetch }) {
  const { showModal, openModal, closeModal } = useModal();
  const { language } = useLanguageStore();
  const { handleDelete } = useDeleteAnimal(refetch, animal);

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
          <p className="text-center p-5 font-bold text-black">
            {TRANSLATES[language].BUTTONS.DELETED}
          </p>
        ) : (
          <button onClick={handleDelete} className="delete-button mr-3">
            {TRANSLATES[language].BUTTONS.DELETE}
          </button>
        )}
        <button
          className="bg-orange p-2 rounded font-bold text-white hover:bg-ligthOrange transition-all"
          onClick={openModal}
        >
          {TRANSLATES[language].BUTTONS.ADD_CASE}
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
