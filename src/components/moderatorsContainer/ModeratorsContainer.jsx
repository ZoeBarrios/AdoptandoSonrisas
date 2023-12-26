import useModal from "../../hooks/useModal";
import Modal from "../modal/Modal";
import FormCreateAdminModerator from "../forms/create/FormCreateAdminModerator";
import useAuthStore from "../../stores/useAuthStore";
import { useQuery } from "react-query";
import { getModeratorsByOrganizationId } from "../../services/organization";
import ListOfModerators from "../listOfModerators/ListOfModerators";
import { ROLES } from "../../utils/constants";
import Loader from "../loader/Loader";

export default function ModeratorContainer() {
  const { organization } = useAuthStore();

  const { data, refetch, isLoading } = useQuery("moderators", () =>
    getModeratorsByOrganizationId(organization)
  );
  const { showModal, closeModal, openModal } = useModal();

  return (
    <section className="flex-container gap-5">
      <h2 className="title">Lista de moderadores</h2>

      {isLoading ? (
        <Loader />
      ) : (
        <ListOfModerators data={data} refetch={refetch} />
      )}
      <Modal setClose={closeModal} isOpen={showModal}>
        <div>
          <FormCreateAdminModerator
            refetch={refetch}
            closeModal={closeModal}
            initialValues={{
              name: "",
              surname: "",
              email: "",
              phone: "",
              password: "moderator",
              organization_id: organization,
            }}
            role={ROLES.MODERATOR}
          />
        </div>
      </Modal>
      <button
        className=" p-3 font-bold text-xl bg-darkOrange text-white rounded hover:bg-orange transition duration-300 ease-in-out "
        onClick={openModal}
      >
        Agregar Moderador
      </button>
    </section>
  );
}
