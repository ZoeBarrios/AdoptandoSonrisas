import AnimalCard from "../../cards/animalCard/AnimalCard";
import Loader from "../../loader/Loader";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";

export default function ListOfAnimals({ data, error, loading }) {
  const { language } = useLanguageStore();
  return (
    <div
      className="flex min-h-60 items-center justify-center flex-wrap gap-10 w-full flex-col md:flex-row "
      style={{ minHeight: "20em" }}
    >
      {loading ? (
        <Loader />
      ) : (
        data?.length === 0 && (
          <h1 className="text-2xl text-orange font-bold">
            {TRANSLATES[language].ANIMALS.NO_ANIMALS}
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
