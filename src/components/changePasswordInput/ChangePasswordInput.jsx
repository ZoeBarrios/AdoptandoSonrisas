import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { sendEmailToChangePassword } from "../../services/email";
import Modal from "../modal/Modal";
import useModal from "../../hooks/useModal";

export default function ChangePasswordInput({ email }) {
  const { showModal, openModal, closeModal } = useModal();
  const { mutate } = useMutation(sendEmailToChangePassword, {
    onSuccess: () => {
      toast.success("Se ha enviado un correo para cambiar la contraseña");
    },
    onError: async (error) => {
      const { message } = await error.json();
      toast.error(message);
    },
  });

  const handleClick = async () => {
    mutate(email);
    closeModal();
  };
  return (
    <>
      <a
        onClick={openModal}
        className="block text-center text-darkOrange text-sm cursor-pointer mb-5"
      >
        Quiero cambiar mi contraseña
      </a>
      <Modal isOpen={showModal} setClose={closeModal}>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-darkOrange text-xl font-bold">
            ¿Estas seguro que quieres cambiar tu contraseña?
          </h2>
          <p className="text-center">
            Se enviará un correo a {email} para cambiar la contraseña
          </p>
          <div className="flex flex-row items-center justify-center gap-5">
            <button
              onClick={handleClick}
              className="bg-darkOrange text-white rounded p-1"
            >
              Si
            </button>
            <button
              className="bg-darkOrange text-white rounded p-1"
              onClick={closeModal}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
