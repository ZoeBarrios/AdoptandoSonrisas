import { useMutation, useQuery } from "react-query";
import { useParams } from "wouter";
import { getAdminsByOrganizationId } from "../../services/organization";
import PersonCard from "../../components/personCard/PersonCard";
import Modal from "../../components/modal/Modal";
import useModal from "../../hooks/useModal";

import FormCreateAdminModerator from "../../components/forms/create/FormCreateAdminModerator";
import { ROLES } from "../../utils/constants";

export default function Admins() {
  const { id } = useParams();
  const { showModal, closeModal, openModal } = useModal();
  const { data, refetch } = useQuery("admins", () =>
    getAdminsByOrganizationId(id)
  );

  return (
    <>
      <h1>Admins</h1>
      <div className="list-card shadow-card">
        {data?.length > 0 ? (
          data.map((admin) => (
            <PersonCard
              person={admin}
              refetch={refetch}
              key={admin.person.person_id}
              organization_id={id}
            />
          ))
        ) : (
          <h2>No hay administradores</h2>
        )}
      </div>
      <button className="bg-orange p-2 rounded font-bold" onClick={openModal}>
        Agregar Administrador
      </button>
      <Modal isOpen={showModal} setClose={closeModal}>
        <div className="p-5 h-full w-full bg-white flex flex-col items-center justify-around rounded-lg">
          <FormCreateAdminModerator
            initialValues={{
              name: "",
              surname: "",
              email: "",
              phone: "",
              password: "admin",
              organization_id: id,
            }}
            role={ROLES.ADMIN}
            closeModal={closeModal}
            refetch={refetch}
          />
          <button
            className="bg-orange p-2 rounded font-bold"
            onClick={closeModal}
          >
            Volver
          </button>
        </div>
      </Modal>
    </>
  );
}
