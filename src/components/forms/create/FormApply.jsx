import { useRef } from "react";
import Modal from "../../modal/Modal";
import SelectActivity from "../../selectActivity/SelectActivity";
import { useApplyOrganization } from "../../../hooks/mutations/organization/useApplyOrganization";

export default function FormApply({
  organization,
  setIsOpen,
  isOpen,
  refetch,
}) {
  const selectRef = useRef(null);
  const { handleApply } = useApplyOrganization(
    setIsOpen,
    selectRef,
    organization,
    refetch
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="p-10 h-full w-full bg-white flex flex-col items-center justify-center gap-5 rounded-lg">
        <h1 className="title">¡Elije la actividad a la que quieras aplicar!</h1>
        <SelectActivity selectRef={selectRef} />
        <div className="w-full flex flex-row items-center justify-between gap-5">
          <button className="buttons-form" onClick={handleApply}>
            Aplicar
          </button>
          <button className="buttons-form" onClick={() => setIsOpen(false)}>
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}
