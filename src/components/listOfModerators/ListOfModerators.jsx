import PersonCard from "../personCard/PersonCard";

export default function ListOfModerators({ data, refetch }) {
  return (
    <section className="list-card shadow-card">
      {data?.length > 0 ? (
        data.map((moderator) => (
          <PersonCard key={moderator.id} person={moderator} refetch={refetch} />
        ))
      ) : (
        <h2 className="title-no-info">No hay moderadores disponibles</h2>
      )}
    </section>
  );
}
