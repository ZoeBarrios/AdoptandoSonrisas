import useLanguageStore from "../../stores/useLanguageStore";
import ListOfOrganizationManage from "../lists/listOrganizationManage/ListOrganizationManage";
import { TRANSLATES } from "../../utils/languajes";
import { useActiveOrganizations } from "../../hooks/querys/organization/useActiveOrganizations";
import { usePendingOrganizations } from "../../hooks/querys/organization/usePendingOrganizations";

export default function ManageOrganizations() {
  const { language } = useLanguageStore();
  const { active, refetchActive } = useActiveOrganizations();
  const { pending, refetchPending } = usePendingOrganizations();
  const refetchBothQueries = () => {
    refetchActive();
    refetchPending();
  };

  return (
    <section className="my-10 lg:m-auto w-11/12 h-full flex flex-col lg:flex-row items-center justify-around gap-5 flex-1">
      <ListOfOrganizationManage
        title={TRANSLATES[language].FORMS.MANAGE_ORGANIZATIONS.ACTIVE_TITLE}
        data={active}
        refetchBothQueries={refetchBothQueries}
      />
      <ListOfOrganizationManage
        title={TRANSLATES[language].FORMS.MANAGE_ORGANIZATIONS.PENDING_TITLE}
        data={pending}
        refetchBothQueries={refetchBothQueries}
        active={false}
      />
    </section>
  );
}
