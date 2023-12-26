import AnimalCard from "../animalCard/AnimalCard";
import Loader from "../loader/Loader";

export default function ListOfAnimals({ data, error, loading }) {
  return (
    <div className="flex items-center justify-center flex-wrap gap-10 w-full flex-col md:flex-row ">
      {loading ? (
        <Loader />
      ) : (
        data?.length === 0 && (
          <h1 className="text-2xl text-orange font-bold h-60">
            No se encontraron resultados
          </h1>
        )
      )}
      {data &&
        data.map((animal) => (
          <AnimalCard key={animal.animal_id} animal={animal} />
        ))}
    </div>
  );
}
