import { useQuery } from "react-query";
import {
  getActiveOrganizations,
  getPendingOrganizations,
} from "../../services/organization";
import OrganizationManageCard from "../organizationManageCard/OrganizationManageCard";
import ListOfOrganizationManage from "../listOrganizationManage/ListOrganizationManage";

export default function ManageOrganizations() {
  const { data: active, refetch: refetchActive } = useQuery(
    "activeOrganizations",
    getActiveOrganizations
  );
  const { data: pending, refetch: refetchPending } = useQuery(
    "pendingOrganizations",
    getPendingOrganizations
  );

  const refetchBothQueries = () => {
    refetchActive();
    refetchPending();
  };

  return (
    <section className="my-10 lg:m-auto w-11/12 h-full flex flex-col lg:flex-row items-center justify-around gap-5 flex-1">
      <ListOfOrganizationManage
        title="Organizaciones activas"
        data={active}
        refetchBothQueries={refetchBothQueries}
      />
      <ListOfOrganizationManage
        title="Organizaciones pendientes"
        data={pending}
        refetchBothQueries={refetchBothQueries}
        active={false}
      />
    </section>
  );
}
