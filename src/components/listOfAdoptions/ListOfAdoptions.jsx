import { TRANSLATES } from "../../utils/languajes";
import AdoptionCard from "../../components/cards/adoptionCard/AdoptionCard";
import Loader from "../loader/Loader";
import useLanguageStore from "../../stores/useLanguageStore";

export default function ListOfAdoptions({ data, isLoading, refetch }) {
  const { language } = useLanguageStore();
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
            <h2 className="title-no-info">
              {TRANSLATES[language].LABELS.NO_INFO}
            </h2>
          )}
        </>
      )}
    </div>
  );
}
