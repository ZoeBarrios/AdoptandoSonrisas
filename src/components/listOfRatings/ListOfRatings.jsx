import RatingCard from "../ratingCard/RatingCard";
import Loader from "../loader/Loader";

export default function ListOfRatings({ ratings, isLoading }) {
  return (
    <div className="mb-5 w-full h-full flex flex-col items-center justify-center gap-5">
      <h3 className="title">Calificaciones</h3>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white flex flex-col items-center gap-5 shadow-card p-5  rounded-lg overflow-y-auto h-64 w-10/12">
          {ratings.length > 0 ? (
            ratings.map((rating) => (
              <RatingCard rating={rating} key={rating.date} />
            ))
          ) : (
            <h2 className="title-no-info">No hay calificaciones registradas</h2>
          )}
        </div>
      )}
    </div>
  );
}
