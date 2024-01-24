import { useParams } from "wouter";
import Loader from "../../components/loader/Loader";
import ListOfRatings from "../../components/lists/listOfRatings/ListOfRatings";
import BackButton from "../../components/backButton/BackButton";
import Avatar from "/imgs/avatar.png";
import ItemUser from "../../components/itemUser/ItemUser";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";
import { usePerson } from "../../hooks/querys/person/usePerson";
import { useRatings } from "../../hooks/querys/rating/useRatings";

export default function User() {
  const { id } = useParams();
  const { language } = useLanguageStore();
  const { userData: data, isLoading } = usePerson(id);
  const { ratings, ratingsLoading } = useRatings(id);
  const average =
    ratings?.reduce((acc, rating) => acc + rating.rating, 0) / ratings?.length;

  const starsArray = [];

  for (let i = 0; i < average; i++) {
    starsArray.push(<i className="fa-solid fa-star text-orange text-3xl"></i>);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto min-h-screen md:h-screen bg-orange">
      <BackButton />
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`p-5 mt-24 mb-10 md:mt-16 shadow-card bg-white w-11/12 h-5/6  flex flex-col md:flex-row items-center rounded`}
        >
          <div className="w-full">
            <h2 className="title">
              {TRANSLATES[language].CALIFICATIONS.USER_TITLE}
            </h2>
            <div
              className={`m-auto  w-9/12 rounded gap-5 flex flex-col flex-start justify-evenly p-5`}
            >
              <div
                className={`flex flex-row w-full items-center gap-3 flex-start`}
              >
                <img
                  src={data?.avatar || Avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <ItemUser
                  label={TRANSLATES[language].LABELS.ID}
                  value={data.person_id}
                />
              </div>
              <ItemUser
                label={TRANSLATES[language].LABELS.NAME}
                value={data.name}
              />
              <ItemUser
                label={TRANSLATES[language].LABELS.SURNAME}
                value={data.surname}
              />
              <ItemUser
                label={TRANSLATES[language].LABELS.EMAIL}
                value={data.email}
              />
              <ItemUser
                label={TRANSLATES[language].LABELS.PHONE}
                value={data.phone}
              />
              {starsArray.length > 0 ? (
                <>
                  <ItemUser
                    label={TRANSLATES[language].LABELS.AVG_CALIFICATION}
                    value={Math.ceil(average)}
                  />
                  <div className="flex flex-row items-center gap-5 md:gap-10">
                    {starsArray.map((star) => star)}
                  </div>
                </>
              ) : (
                <p className="text-xl font-bold">
                  {TRANSLATES[language].CALIFICATIONS.NO_CALIFICATIONS}
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
