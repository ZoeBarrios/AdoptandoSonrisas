import ListOfAnimals from "../../components/ListOfAnimals.jsx/ListOfAnimals";
import { useQuery } from "react-query";
import { getAnimals } from "../../services/animals";
import { useEffect, useReducer } from "react";
import { INITIAL_SEARCH_STATE, searchReducer } from "../../utils/reducers";
import Filters from "../../components/filters/Filters";
export default function Adopt() {
  const [search, dispatchSearch] = useReducer(
    searchReducer,
    INITIAL_SEARCH_STATE
  );
  const { loading, error, data, refetch } = useQuery(
    "animals",
    () => getAnimals(search),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    refetch();
  }, [search]);
  return (
    <section className="mt-40 flex flex-col w-full md:w-auto items-center justify-center mb-10">
      <h1 className="text-3xl text-orange mb-5 font-bold">
        Adoptando Sonrisas
      </h1>
      <Filters dispatch={dispatchSearch} state={search} />
      <ListOfAnimals data={data} error={error} loading={loading} />
    </section>
  );
}
