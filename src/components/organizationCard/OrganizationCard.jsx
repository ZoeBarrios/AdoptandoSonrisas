import { Link } from "wouter";
import Modal from "../modal/Modal";
import { useRef, useState } from "react";
import { getActivities } from "../../services/activity";
import { useMutation, useQuery } from "react-query";
import { applyToOrganization } from "../../services/user";
import { toast } from "react-toastify";
import useAuthStore from "../../stores/useAuthStore";

export default function OrganizationCard({ organization, refetch }) {
  const { user } = useAuthStore();
  const selectRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { data: activities } = useQuery("activities", getActivities);
  const { mutate } = useMutation(applyToOrganization, {
    onSuccess: () => {
      setIsOpen(false);
      toast.success("¡Aplicación enviada!");
      refetch();
    },
    onError: (error) => {
      toast.error("¡Error al enviar la aplicación!");
    },
  });

  const handleApply = () => {
    mutate({
      activity_id: selectRef.current.value,
      organization_id: organization.organization_id,
      person_id: user.id,
    });
  };

  return (
    <div className="p-5 bg-ligthOrange flex flex-row w-full items-center justify-around rounded-lg py-10">
      <h1 className="text-xl font-bold">{organization.name}</h1>
      <Link to={`/organizacion/${organization.organization_id}`}>
        <button className="p-2 bg-white rounded font-bold">Ver más</button>
      </Link>
      <button
        className="p-2 bg-white rounded font-bold"
        onClick={() => setIsOpen(true)}
      >
        Aplicar
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="p-5 bg-white flex flex-col items-center justify-center rounded-lg">
          <h1 className="text-xl font-bold">
            ¡Elije la actividad a la que quieras aplicar!
          </h1>
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
          <button
            className="p-2 bg-ligthOrange rounded font-bold"
            onClick={handleApply}
          >
            Aplicar
          </button>
          <button
            className="p-2 bg-ligthOrange rounded font-bold"
            onClick={() => setIsOpen(false)}
          >
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
}
