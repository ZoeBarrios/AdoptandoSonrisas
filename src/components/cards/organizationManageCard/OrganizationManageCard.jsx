import { Link } from "wouter";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import { useDeleteOrganization } from "../../../hooks/mutations/organization/useDeleteOrganization";
import { useAcceptOrganization } from "../../../hooks/mutations/organization/useAcceptOrganization";

export default function OrganizationManageCard({
  organization,
  active = false,
  refetch,
}) {
  const { language } = useLanguageStore();
  const { handleDelete } = useDeleteOrganization(
    organization.organization_id,
    refetch
  );
  const { handleAccept } = useAcceptOrganization(
    refetch,
    organization.organization_id
  );

  return (
    <div className="flex flex-col gap-5 w-full  md:flex-row bg-ligthOrange p-5 w-full rounded items-center justify-between">
      <Link
        to={`/organizacion/${organization.organization_id}`}
        className="text-2xl font-bold text-center md:text-left"
      >
        {organization.name}
      </Link>
      <p>{organization.email}</p>
      {active ? (
        <button onClick={handleDelete} className="delete-button">
          {TRANSLATES[language].BUTTONS.DELETE}
        </button>
      ) : (
        <div className="flex w-full md:w-3/6 items-center justify-around flex-row">
          <button
            onClick={handleAccept}
            className="text-white font-bold py-2 px-4 rounded transition duration-300 bg-orange hover:bg-darkOrange"
          >
            {TRANSLATES[language].BUTTONS.ACCEPT}
          </button>
          <button onClick={handleDelete} className="delete-button">
            {TRANSLATES[language].BUTTONS.DELETE}
          </button>
        </div>
      )}
    </div>
  );
}
