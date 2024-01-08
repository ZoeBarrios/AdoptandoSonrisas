import AdoptionCard from "../adoptionCard/AdoptionCard";
import Loader from "../loader/Loader";

export default function ListOfAdoptions({ data, isLoading, refetch }) {
  return (
    <div className="list-card shadow-card">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data.length > 0 ? (
            data?.map((adoption) => (
              <AdoptionCard
                adoption={adoption}
                key={adoption.adoption_date}
                refetch={refetch}
              />
            ))
          ) : (
            <h2 className="title-no-info">No hay adopciones registradas</h2>
          )}
        </>
      )}
    </div>
  );
}
