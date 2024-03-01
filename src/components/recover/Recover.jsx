import { useState } from "react";
import Modal from "../modal/Modal";
import ChangePasswordInput from "../changePasswordInput/ChangePasswordInput";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";

export default function Recover({ showModal, closeModal, openModal }) {
  const [email, setEmail] = useState("");
  const { language } = useLanguageStore();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Modal
      isOpen={showModal}
      setIsOpen={openModal}
      setClose={closeModal}
      smallModal={true}
    >
      <div className="flex flex-col items-center justify-center gap-5 p-5">
        <h1 className="title">{TRANSLATES[language].FORMS.RECOVER.TITLE}</h1>
        <p className="text-base text-darkOrange">
          {TRANSLATES[language].FORMS.RECOVER.DESCRIPTION}
        </p>
        <input
          type="email"
          className="border-2 border-darkOrange rounded w-8/12 h-10 px-3"
          placeholder={TRANSLATES[language].LABELS.EMAIL}
          value={email}
          onChange={handleEmailChange}
        />
        <ChangePasswordInput email={email} />
        <button onClick={closeModal} className="buttons-form">
          {TRANSLATES[language].BUTTONS.CANCEL}
        </button>
      </div>
    </Modal>
  );
}
