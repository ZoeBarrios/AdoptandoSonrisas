import { Link } from "wouter";

export default function RatingCard({ rating }) {
  console.log(rating);
  const date = new Date(rating.date);
  return (
    <div className="flex flex-col items-center w-full bg-ligthOrange p-3 rounded gap-3">
      <div className="flex  flex-col flex-row w-full items-start justify-between text-center">
        <p>{date.toLocaleDateString()}</p>
        <p>Calificador: {rating.rater.name}</p>
        <p>Calificación: {rating.rating}</p>
      </div>
      <p>&quot;{rating.comment}&quot;</p>
      <Link
        to={`/adoptar/${rating.animal.animal_id}`}
        className="self-start text-base"
      >
        Mascota: {rating.animal.name}
      </Link>
    </div>
  );
}
