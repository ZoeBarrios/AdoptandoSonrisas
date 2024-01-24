import useModal from "../../../hooks/useModal";
import ListOfAdoptions from "../../listOfAdoptions/ListOfAdoptions";
import RatingForm from "../../forms/create/RatingForm";
import { FILTERS_ACTIONS, ROLES } from "../../../utils/constants";
import useAuthStore from "../../../stores/useAuthStore";
import { adoptionsReducer } from "../../../utils/reducers";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import DropDown from "../../dropdown/DropDown";
import { useAdoptions } from "../../../hooks/querys/adoption/useAdoptions";
import { useReducer } from "react";

export default function ContainerAdoptions() {
  const { language } = useLanguageStore();
  const { user } = useAuthStore();
  const [state, dispatch] = useReducer(adoptionsReducer, {
    isAccepted: "",
    isCancelled: "",
  });
  const { adoptions: data, refetch, isLoading } = useAdoptions(state);
  const { showModal, closeModal, openModal } = useModal();

  const handleChangeFilters = (e) => {
    const { value } = e.target;
    if (value === "") {
      dispatch({ type: FILTERS_ACTIONS.RESET });
      return;
    }

    dispatch({ type: value });
  };

  return (
    <section className="flex-container gap-5 h-screen md:h-5/6">
      <h2 className="title">{TRANSLATES[language].ADOPTIONS.TITLE}</h2>
      <div className="w-10/12 gap-3 flex flex-col md:flex-row items-center justify-between">
        <DropDown
          name="adoptions"
          value={""}
          onChange={(e) => handleChangeFilters(e)}
          defaultValue={TRANSLATES[language].FILTERS.ALL}
          defaultDisables={false}
          options={[
            {
              value: FILTERS_ACTIONS.SET_REJECTED,
              label: TRANSLATES[language].FILTERS.CANCELS,
            },
            {
              value: FILTERS_ACTIONS.SET_PENDING,
              label: TRANSLATES[language].FILTERS.PENDING,
            },
            {
              value: FILTERS_ACTIONS.SET_APPROVED,
              label: TRANSLATES[language].FILTERS.ACCEPTED,
            },
          ]}
        />
      </div>

      <ListOfAdoptions data={data} refetch={refetch} isLoading={isLoading} />
      {user.role == ROLES.USER || user.role == ROLES.SUPERADMIN ? null : (
        <button onClick={openModal} className="buttons-form">
          {TRANSLATES[language].BUTTONS.ADD_CALIFICATION}
        </button>
      )}

      <RatingForm showModal={showModal} closeModal={closeModal} data={data} />
    </section>
  );
}
