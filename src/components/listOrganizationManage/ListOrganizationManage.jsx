import OrganizationManageCard from "../organizationManageCard/OrganizationManageCard";

export default function ListOfOrganizationManage({
  title,
  data,
  refetchBothQueries,
  active = true,
}) {
  return (
    <div className="w-10/12 lg:w-auto p-5 h-5/6 shadow-card flex-grow rounded-lg overflow-y-auto flex flex-col items-center gap-5">
      <h2 className="title">{title}</h2>
      {data?.map((organization) => (
        <OrganizationManageCard
          organization={organization}
          key={organization.organization_id}
          active={active}
          refetch={refetchBothQueries}
        />
      ))}
    </div>
  );
}
