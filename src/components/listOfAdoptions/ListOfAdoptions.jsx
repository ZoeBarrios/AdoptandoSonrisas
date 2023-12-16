import { useQuery } from "react-query";
import { getAdoptionsByUserId } from "../../services/adoptions";
import useAuthStore from "../../stores/useAuthStore";
import AdoptionCard from "../adoptionCard/AdoptionCard";
import Loader from "../loader/Loader";

export default function ListOfAdoptions() {
  const { user } = useAuthStore();
  const { data, refetch, isLoading } = useQuery("adoptions", () =>
    getAdoptionsByUserId(user.id)
  );

  return (
    <div className="bg-white w-8/12 shadow-card rounded-lg flex flex-col items-center">
      <h1>Lista de adopciones</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-11/12">
          {data.map((adoption) => (
            <AdoptionCard
              adoption={adoption}
              key={adoption.adoption_date}
              refetch={refetch}
            />
          ))}
        </div>
      )}
    </div>
  );
}
