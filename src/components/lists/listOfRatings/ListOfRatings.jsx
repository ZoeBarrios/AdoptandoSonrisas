import RatingCard from "../../cards/ratingCard/RatingCard";
import Loader from "../../loader/Loader";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";

export default function ListOfRatings({ ratings, isLoading }) {
  const { language } = useLanguageStore();
  return (
    <div className="mb-5 w-full h-full flex flex-col items-center justify-center gap-5">
      <h3 className="title">{TRANSLATES[language].CALIFICATIONS.TITLE}</h3>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white flex flex-col items-center gap-5 shadow-card p-5  rounded-lg overflow-y-auto h-96 w-10/12">
          {ratings.length > 0 ? (
            ratings.map((rating) => (
              <RatingCard rating={rating} key={rating.date} />
            ))
          ) : (
            <h2 className="title-no-info">
              {TRANSLATES[language].CALIFICATIONS.NO_CALIFICATIONS}
            </h2>
          )}
        </div>
      )}
    </div>
  );
}
