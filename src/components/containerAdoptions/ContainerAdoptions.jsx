import { useQuery } from "react-query";
import useModal from "../../hooks/useModal";
import ListOfAdoptions from "../listOfAdoptions/ListOfAdoptions";
import RatingForm from "../ratingForm/RatingForm";
import { ROLES } from "../../utils/constants";
import useAuthStore from "../../stores/useAuthStore";
import {
  getAdoptionsByOrganizationId,
  getAdoptionsByUserId,
} from "../../services/adoptions";

export default function ContainerAdoptions() {
  const { user, organization } = useAuthStore();
  const { showModal, closeModal, openModal } = useModal();
  const { data, refetch, isLoading } = useQuery("adoptions", () => {
    if (user.role == ROLES.USER) {
      return getAdoptionsByUserId(user.id);
    } else {
      return getAdoptionsByOrganizationId(organization);
    }
  });
  return (
    <section className="flex-container gap-5 h-screen md:h-5/6">
      <h2 className="title">Lista de adopciones</h2>
      <ListOfAdoptions data={data} refetch={refetch} isLoading={isLoading} />
      <button onClick={openModal} className="buttons-form">
        Añadir calificacion de adopción
      </button>
      <RatingForm showModal={showModal} closeModal={closeModal} data={data} />
    </section>
  );
}
