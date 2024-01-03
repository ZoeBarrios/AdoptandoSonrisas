import { useQuery } from "react-query";
import useModal from "../../hooks/useModal";
import ListOfAdoptions from "../listOfAdoptions/ListOfAdoptions";
import RatingForm from "../ratingForm/RatingForm";
import { FILTERS_ACTIONS, ROLES } from "../../utils/constants";
import useAuthStore from "../../stores/useAuthStore";
import {
  getAdoptionsByOrganizationId,
  getAdoptionsByUserId,
} from "../../services/adoptions";
import { useEffect, useReducer } from "react";
import { adoptionsReducer } from "../../utils/reducers";

export default function ContainerAdoptions() {
  const { user, organization } = useAuthStore();
  const [state, dispatch] = useReducer(adoptionsReducer, {
    isAccepted: "",
    isCancelled: "",
  });
  const { showModal, closeModal, openModal } = useModal();
  const { data, refetch, isLoading } = useQuery("adoptions", () => {
    if (user.role == ROLES.USER) {
      return getAdoptionsByUserId(user.id, state);
    } else {
      return getAdoptionsByOrganizationId(organization, state);
    }
  });

  const handleChangeFilters = (e) => {
    const { value } = e.target;
    console.log(value);
    dispatch({ type: value });
  };

  useEffect(() => {
    refetch();
  }, [refetch, state]);
  return (
    <section className="flex-container gap-5 h-screen md:h-5/6">
      <h2 className="title">Lista de adopciones</h2>
      <div className="w-10/12 gap-3 flex flex-col md:flex-row items-center justify-between">
        <select onClick={handleChangeFilters} className="w-full md:w-fit">
          <option value={FILTERS_ACTIONS.RESET}>Todos</option>
          <option value={FILTERS_ACTIONS.SET_REJECTED}>Canceladas</option>
          <option value={FILTERS_ACTIONS.SET_PENDING}>Pendientes</option>
          <option value={FILTERS_ACTIONS.SET_APPROVED}>Aceptadas</option>
        </select>
      </div>

      <ListOfAdoptions data={data} refetch={refetch} isLoading={isLoading} />
      {user.role == ROLES.USER || user.role == ROLES.SUPERADMIN ? null : (
        <button onClick={openModal} className="buttons-form">
          Añadir calificacion de adopción
        </button>
      )}

      <RatingForm showModal={showModal} closeModal={closeModal} data={data} />
    </section>
  );
}
