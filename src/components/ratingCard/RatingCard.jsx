import { Link } from "wouter";

export default function RatingCard({ rating }) {
  const date = new Date(rating.date);
  return (
    <div className="flex flex-col items-center w-full bg-ligthOrange p-3 rounded gap-3">
      <div className="flex flex-col lg:flex-row w-full items-start justify-between text-center">
        <p className="font-bold">{date.toLocaleDateString()}</p>
        <p className="font-bold">Calificador: {rating.rater.name}</p>
        <p className="font-bold">Calificación: {rating.rating}</p>
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
