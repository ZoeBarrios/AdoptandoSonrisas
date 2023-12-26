import RatingCard from "../ratingCard/RatingCard";
import Loader from "../loader/Loader";

export default function ListOfRatings({ ratings, isLoading }) {
  return (
    <div className="mb-5 w-full h-full flex flex-col items-center justify-center gap-5">
      <h3 className="text-center text-2xl font-bold">Calificaciones</h3>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center gap-5 shadow-card p-5 bg-white rounded-lg overflow-y-auto h-4/5 w-10/12">
          {ratings.length > 0 ? (
            ratings.map((rating) => (
              <RatingCard rating={rating} key={rating.date} />
            ))
          ) : (
            <h2>No hay calificaciones registradas</h2>
          )}
        </div>
      )}
    </div>
  );
}
