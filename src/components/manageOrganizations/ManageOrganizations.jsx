import { useQuery } from "react-query";
import {
  getActiveOrganizations,
  getPendingOrganizations,
} from "../../services/organization";
import useLanguageStore from "../../stores/useLanguageStore";
import ListOfOrganizationManage from "../listOrganizationManage/ListOrganizationManage";
import { TRANSLATES } from "../../utils/languajes";

export default function ManageOrganizations() {
  const { language } = useLanguageStore();
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
        title={TRANSLATES[language].MANAGE_ORGANIZATIONS.ACTIVE_TITLE}
        data={active}
        refetchBothQueries={refetchBothQueries}
      />
      <ListOfOrganizationManage
        title={TRANSLATES[language].MANAGE_ORGANIZATIONS.PENDING_TITLE}
        data={pending}
        refetchBothQueries={refetchBothQueries}
        active={false}
      />
    </section>
  );
}
