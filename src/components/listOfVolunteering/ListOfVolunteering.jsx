import { useQuery } from "react-query";
import { getAppliedOrganizations } from "../../services/user";
import useAuthStore from "../../stores/useAuthStore";
import VolunteerCard from "../volunteerCard/VolunteerCard";
import Loader from "../loader/Loader";

export default function ListOfVolunteering() {
  const { user } = useAuthStore();
  const { data, refetch, isLoading } = useQuery("volunteering", () =>
    getAppliedOrganizations(user.id)
  );

  return (
    <section className="p-5 bg-white shadow-card rounded-lg w-8/12 mb-5 flex flex-col items-center ">
      <h2 className="text-darkOrange font-bold">Lista de voluntariados</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data?.map((volunteering) => (
            <VolunteerCard
              key={volunteering.organization_id}
              volunteering={volunteering}
              refetch={refetch}
            />
          ))}
        </>
      )}
    </section>
  );
}
