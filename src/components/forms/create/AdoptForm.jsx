import Modal from "../../modal/Modal";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import { useRegisterAdoption } from "../../../hooks/mutations/adoption/useRegisterAdoption";

export default function AdoptForm({
  name,
  closeModal,
  openModal,
  isShow,
  person_id,
  animal_id,
}) {
  const { language } = useLanguageStore();
  const { handleAdopt } = useRegisterAdoption(closeModal, animal_id, person_id);

  return (
    <Modal
      setIsOpen={openModal}
      isOpen={isShow}
      setClose={closeModal}
      smallModal={true}
    >
      <div className="h-full flex flex-col items-center justify-between gap-5 p-5 text-center">
        <h1 className="text-2xl font-bold mb-3">
          {TRANSLATES[language].FORMS.NEW_ADOPTION.TITLE} {name}?
        </h1>
        <p className="text-center text-lg">
          {TRANSLATES[language].FORMS.NEW_ADOPTION.DESCRIPTION}
        </p>
        <div className="flex flex-row w-full items-center justify-around gap-5">
          <button
            className="font-bold mt-5 bg-green p-2 w-full md:w-6/12 rounded hover:bg-grey transition-colors duration-300 ease-in-out"
            onClick={handleAdopt}
          >
            {TRANSLATES[language].BUTTONS.ADOPT}
          </button>
          <button
            className="font-bold mt-5 bg-green p-2 w-full md:w-6/12 rounded hover:bg-grey transition-colors duration-300 ease-in-out"
            onClick={closeModal}
          >
            {TRANSLATES[language].BUTTONS.CANCEL}
          </button>
        </div>
      </div>
    </Modal>
  );
}
