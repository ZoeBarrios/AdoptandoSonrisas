import { Link } from "wouter";
import useModal from "../../../hooks/useModal";
import FormApply from "../../forms/create/FormApply";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";

export default function OrganizationCard({ organization, refetch }) {
  const { showModal, openModal, closeModal } = useModal();
  const { language } = useLanguageStore();

  return (
    <div className="p-5 bg-ligthOrange flex flex-col gap-5 md:flex-row w-full items-center justify-between rounded-lg py-10">
      <h1 className="text-2xl font-bold">{organization.name}</h1>

      <div className="flex flex-row justify-around w-full md:w-2/3 lg:w-1/3">
        <Link to={`/organizacion/${organization.organization_id}`}>
          <button className="buttons-form">
            {TRANSLATES[language].BUTTONS.MORE}
          </button>
        </Link>
        <button className="buttons-form bg-green" onClick={openModal}>
          {TRANSLATES[language].BUTTONS.APPLY}
        </button>
      </div>

      <FormApply
        isOpen={showModal}
        setIsOpen={closeModal}
        refetch={refetch}
        organization={organization}
      />
    </div>
  );
}
