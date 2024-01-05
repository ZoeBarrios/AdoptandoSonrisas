import { Link } from "wouter";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";

export default function RatingCard({ rating }) {
  const date = new Date(rating.date);
  const { language } = useLanguageStore();
  return (
    <div className="flex flex-col items-center w-full bg-ligthOrange p-3 rounded gap-3">
      <div className="flex flex-col lg:flex-row w-full items-start justify-between text-center">
        <p className="font-bold">{date.toLocaleDateString()}</p>
        <p className="font-bold">
          {TRANSLATES[language].LABELS.RATER}: {rating.rater.name}
        </p>
        <p className="font-bold">
          {TRANSLATES[language].LABELS.CALIFICATION}: {rating.rating}
        </p>
      </div>
      <p>&quot;{rating.comment}&quot;</p>
      <Link
        to={`/adoptar/${rating.animal.animal_id}`}
        className="self-start text-base"
      >
        {TRANSLATES[language].LABELS.PET}: {rating.animal.name}
      </Link>
    </div>
  );
}
