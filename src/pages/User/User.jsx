import { useQuery } from "react-query";
import { useParams } from "wouter";
import { getUserById } from "../../services/user";
import Loader from "../../components/loader/Loader";
import ListOfRatings from "../../components/listOfRatings/ListOfRatings";
import BackButton from "../../components/backButton/BackButton";
import Avatar from "/imgs/avatar.png";
import ItemUser from "../../components/itemUser/ItemUser";
import { getRatingsByPersonId } from "../../services/ratings";

export default function User() {
  const { id } = useParams();
  const { data, isLoading } = useQuery(["user", id], () => getUserById(id), {
    enabled: !!id,
  });
  const { data: ratings, isLoading: ratingsLoading } = useQuery("ratings", () =>
    getRatingsByPersonId(id)
  );
  const average =
    ratings?.reduce((acc, rating) => acc + rating.rating, 0) / ratings?.length;

  const starsArray = [];

  for (let i = 0; i < average; i++) {
    starsArray.push(<i className="fa-solid fa-star text-orange text-3xl"></i>);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto md:h-screen bg-orange">
      <BackButton />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-5 mt-24 mb-10 md:mt-16 shadow-card bg-white w-11/12  flex flex-col md:flex-row items-center rounded">
          <div className="w-full">
            <h2 className="title">Información del usuario</h2>
            <div className="m-auto  w-9/12 rounded gap-5 flex flex-col items-start justify-evenly p-5">
              <div className="flex flex-row w-full items-center gap-3">
                <img
                  src={data?.avatar || Avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <ItemUser
                  label="Número identificatorio"
                  value={data.person_id}
                />
              </div>
              <ItemUser label="Nombre" value={data.name} />
              <ItemUser label="Apellido" value={data.surname} />
              <ItemUser label="Email" value={data.email} />
              <ItemUser label="Teléfono" value={data.phone} />
              {starsArray.length > 0 ? (
                <>
                  <ItemUser
                    label="Calificación promedio"
                    value={Math.ceil(average)}
                  />
                  <div className="flex flex-row items-center gap-5 md:gap-10">
                    {starsArray.map((star) => star)}
                  </div>
                </>
              ) : (
                <p className="text-xl font-bold">
                  No hay calificaciones registradas
                </p>
              )}
            </div>
          </div>
          <ListOfRatings ratings={ratings} isLoading={ratingsLoading} />
        </div>
      )}
    </div>
  );
}
