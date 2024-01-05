import Loader from "../loader/Loader";
import OrganizationCard from "../organizationCard/OrganizationCard";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";

export default function ListOfOrganizations({ data, isLoading, refetch }) {
  const { language } = useLanguageStore();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="list-card shadow-card h-5/6">
          {data.length > 0 ? (
            data.map((organization) => {
              return (
                <OrganizationCard
                  organization={organization}
                  key={organization.organization_id}
                  refetch={refetch}
                />
              );
            })
          ) : (
            <h2 className="title-no-info">
              {TRANSLATES[language].ORGANIZATIONS.NO_ORGANIZATIONS}
            </h2>
          )}
        </div>
      )}
    </>
  );
}
