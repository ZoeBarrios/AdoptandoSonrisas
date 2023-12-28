import ListOfAnimals from "../../components/listOfAnimals/ListOfAnimals";
import { SEARCH_ACTIONS } from "../../utils/constants";
import { useQuery } from "react-query";
import { getAnimals } from "../../services/animals";
import { useEffect, useReducer } from "react";
import { INITIAL_SEARCH_STATE, searchReducer } from "../../utils/reducers";
import Filters from "../../components/filters/Filters";
import PaginationButtons from "../../components/paginationButtons/PaginationButtons";
import DefaultPage from "../defaultPage/DefaultPage";
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

  const nextPage = () => {
    console.log(data.length, search.limit);
    if (data.length < search.limit) return;
    dispatchSearch({
      type: SEARCH_ACTIONS.SET_PAGE,
      payload: search.page + 1,
    });
  };

  const prevPage = () => {
    if (search.page === 1) return;
    dispatchSearch({
      type: SEARCH_ACTIONS.SET_PAGE,
      payload: search.page - 1,
    });
  };

  useEffect(() => {
    refetch();
  }, [refetch, search]);
  return (
    <DefaultPage>
      <section className="mt-10 flex flex-col w-full md:w-auto items-center justify-center mb-10">
        <h1 className="title mb-10">Adoptando Sonrisas</h1>
        <Filters dispatch={dispatchSearch} state={search} />
        <ListOfAnimals data={data} error={error} loading={loading} />
        <PaginationButtons
          nextPage={nextPage}
          prevPage={prevPage}
          page={search.page}
          limit={search.limit}
          dataLength={data?.length}
        />
      </section>
    </DefaultPage>
  );
}
