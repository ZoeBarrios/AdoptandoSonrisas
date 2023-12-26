import { useRef } from "react";
import useAuthStore from "../../../stores/useAuthStore";
import Modal from "../../modal/Modal";
import { getActivities } from "../../../services/activity";
import { useMutation, useQuery } from "react-query";
import { applyToOrganization } from "../../../services/user";
import { showError, showSuccess } from "../../../utils/userMessages";

export default function FormApply({
  organization,
  setIsOpen,
  isOpen,
  refetch,
}) {
  const { user } = useAuthStore();
  const selectRef = useRef(null);
  const { data: activities } = useQuery("activities", getActivities);
  const { mutate } = useMutation(applyToOrganization, {
    onSuccess: () => {
      setIsOpen(false);
      showSuccess("¡Aplicación enviada!", refetch);
    },
    onError: showError,
  });

  const handleApply = () => {
    mutate({
      activity_id: selectRef.current.value,
      organization_id: organization.organization_id,
      person_id: user.id,
    });
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="p-10 h-full w-full bg-white flex flex-col items-center justify-center gap-5 rounded-lg">
        <h1 className="title">¡Elije la actividad a la que quieras aplicar!</h1>
        <select className="p-2 bg-white rounded font-bold" ref={selectRef}>
          {activities?.data &&
            Object.keys(activities.data).map((activity) => {
              if (activities.data[activity]?.activity_name !== "Gestion") {
                return (
                  <option
                    value={activities.data[activity]?.activity_id}
                    key={activities.data[activity]?.activity_id}
                  >
                    {activities.data[activity]?.activity_name}
                  </option>
                );
              }
              return null;
            })}
        </select>
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
