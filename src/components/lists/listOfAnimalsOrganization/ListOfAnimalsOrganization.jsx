import AnimalOrganizationCard from "../../cards/animalOrganizationCard/AnimalOrganizationCard";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";

export default function ListOfAnimalsOrganization({ data, refetch }) {
  const { language } = useLanguageStore();
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
        <h3 className="title-no-info">
          {TRANSLATES[language].ANIMALS.NO_ANIMALS}
        </h3>
      )}
    </div>
  );
}
