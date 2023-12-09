import AnimalCard from "../animalCard/AnimalCard";

export default function ListOfAnimals({ data, error, loading }) {
  return (
    <div className="flex items-center justify-center flex-wrap gap-10 w-full flex-col md:flex-row ">
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      {data &&
        data.map((animal) => <AnimalCard key={animal.id} animal={animal} />)}
    </div>
  );
}
