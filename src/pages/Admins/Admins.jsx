import { useQuery } from "react-query";
import { useParams } from "wouter";
import { getAdminsByOrganizationId } from "../../services/organization";
import PersonCard from "../../components/personCard/PersonCard";
import Modal from "../../components/modal/Modal";
import useModal from "../../hooks/useModal";
import BackButton from "../../components/backButton/BackButton";

import FormCreateAdminModerator from "../../components/forms/create/FormCreateAdminModerator";
import { ROLES } from "../../utils/constants";

export default function Admins() {
  const { id } = useParams();
  const { showModal, closeModal, openModal } = useModal();
  const { data, refetch } = useQuery("admins", () =>
    getAdminsByOrganizationId(id)
  );

  return (
    <section className="bg-grey w-full min-h-screen flex flex-col items-center justify-evenly">
      <BackButton color="darkOrange" />
      <h1 className="title">Admins</h1>
      <div className="list-card shadow-card" style={{ minHeight: "25rem" }}>
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
          <h2 className="title-no-info">No hay administradores</h2>
        )}
      </div>
      <button className="buttons-form" onClick={openModal}>
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
        </div>
      </Modal>
    </section>
  );
}
