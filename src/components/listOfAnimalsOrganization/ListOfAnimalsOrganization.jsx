import AnimalOrganizationCard from "../animalOrganizationCard/AnimalOrganizationCard";

export default function ListOfAnimalsOrganization({ data, refetch }) {
  return (
    <div className="list-card shadow-card">
      {data?.length > 0 ? (
        data.map((animal) => (
          <AnimalOrganizationCard
            key={animal.animal_id}
            animal={animal}
            refetch={refetch}
          />
        ))
      ) : (
        <h3 className="title-no-info">No hay animales</h3>
      )}
    </div>
  );
}
