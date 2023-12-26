import { useState } from "react";
import Modal from "../modal/Modal";
import ChangePasswordInput from "../changePasswordInput/ChangePasswordInput";

export default function Recover({ showModal, closeModal, openModal }) {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Modal isOpen={showModal} setIsOpen={openModal} setClose={closeModal}>
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl font-bold text-darkOrange">
          Recuperar contraseña
        </h1>
        <p className="text-base text-darkOrange">
          Ingresa tu correo electrónico para recuperar tu contraseña
        </p>
        <input
          type="email"
          className="border-2 border-darkOrange rounded w-8/12 h-10 px-3"
          placeholder="Correo electrónico"
          value={email}
          onChange={handleEmailChange}
        />
        <ChangePasswordInput email={email} />
      </div>
    </Modal>
  );
}
