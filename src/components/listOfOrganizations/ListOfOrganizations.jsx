import { useQuery } from "react-query";
import { getNotApllidedOrganizations } from "../../services/organization";
import Loader from "../loader/Loader";
import OrganizationCard from "../organizationCard/OrganizationCard";
import useAuthStore from "../../stores/useAuthStore";

export default function ListOfOrganizations() {
  const { user } = useAuthStore();
  const { data, isLoading, refetch } = useQuery("organizations", () =>
    getNotApllidedOrganizations(user.id)
  );
  return (
    <div className="w-full h-full flex flex-col items-center mb-10">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-around bg-white shadow-card p-5 rounded w-6/12 h-96 overflow-y-auto">
          <h2 className="font-bold text-darkOrange text-xl">
            Lista de organizaciones
          </h2>

          {data.map((organization) => {
            return (
              <OrganizationCard
                organization={organization}
                key={organization.organization_id}
                refetch={refetch}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
