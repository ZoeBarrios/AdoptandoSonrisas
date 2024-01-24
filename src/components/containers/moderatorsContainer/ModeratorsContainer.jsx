import useModal from "../../../hooks/useModal";
import Modal from "../../modal/Modal";
import FormCreateAdminModerator from "../../forms/create/FormCreateAdminModerator";
import useAuthStore from "../../../stores/useAuthStore";
import ListOfModerators from "../../lists/listOfModerators/ListOfModerators";
import { ROLES } from "../../../utils/constants";
import Loader from "../../loader/Loader";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import { useModerators } from "../../../hooks/querys/person/useModerators";

export default function ModeratorContainer() {
  const { organization } = useAuthStore();
  const { language } = useLanguageStore();
  const { data, refetch, isLoading } = useModerators();
  const { showModal, closeModal, openModal } = useModal();

  return (
    <section className="flex-container gap-5 h-4/5">
      <h2 className="title">{TRANSLATES[language].MODERATORS.TITLE}</h2>

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
        {TRANSLATES[language].BUTTONS.ADD_MODERATOR}
      </button>
    </section>
  );
}
