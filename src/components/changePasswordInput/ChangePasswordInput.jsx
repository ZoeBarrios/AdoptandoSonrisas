import Modal from "../modal/Modal";
import useModal from "../../hooks/useModal";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";
import { useChangePassword } from "../../hooks/mutations/password/useChangePassword";

export default function ChangePasswordInput({ email }) {
  const { showModal, openModal, closeModal } = useModal();
  const { language } = useLanguageStore();
  const { handleClick } = useChangePassword(email, closeModal);

  return (
    <>
      <a
        onClick={openModal}
        className="block text-center text-darkOrange text-sm cursor-pointer mb-5"
      >
        {TRANSLATES[language].CHANGE_PASSWORD.TITLE}
      </a>
      <Modal isOpen={showModal} setClose={closeModal}>
        <div className="flex flex-col items-center justify-center p-5 text-center gap-5">
          <h2 className="text-darkOrange text-xl font-bold">
            {TRANSLATES[language].CHANGE_PASSWORD.WARNING}
          </h2>
          <p className="text-center">
            {TRANSLATES[language].CHANGE_PASSWORD.DESCRIPTION}
            {email}
          </p>
          <div className="flex flex-row items-center justify-center gap-5">
            <button onClick={handleClick} className="buttons-form">
              {TRANSLATES[language].BUTTONS.YES}
            </button>
            <button className="buttons-form" onClick={closeModal}>
              {TRANSLATES[language].BUTTONS.RETURN}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
