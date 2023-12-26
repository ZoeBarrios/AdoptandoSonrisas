import AdoptionCard from "../adoptionCard/AdoptionCard";
import Loader from "../loader/Loader";

export default function ListOfAdoptions({ data, isLoading, refetch }) {
  return (
    <div className="list-card shadow-card">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data?.map((adoption) => (
            <AdoptionCard
              adoption={adoption}
              key={adoption.adoption_date}
              refetch={refetch}
            />
          ))}
        </>
      )}
    </div>
  );
}
