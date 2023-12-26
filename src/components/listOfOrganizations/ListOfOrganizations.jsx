import Loader from "../loader/Loader";
import OrganizationCard from "../organizationCard/OrganizationCard";

export default function ListOfOrganizations({ data, isLoading, refetch }) {
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
            <h2 className="title-no-info">No hay organizaciones disponibles</h2>
          )}
        </div>
      )}
    </>
  );
}
