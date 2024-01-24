import ListOfAnimals from "../../components/lists/listOfAnimals/ListOfAnimals";
import { useReducer } from "react";
import { INITIAL_SEARCH_STATE, searchReducer } from "../../utils/reducers";
import Filters from "../../components/filters/Filters";
import PaginationButtons from "../../components/paginationButtons/PaginationButtons";
import DefaultPage from "../defaultPage/DefaultPage";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";
import { useAnimals } from "../../hooks/querys/animal/useAnimals";

export default function Adopt() {
  const { language } = useLanguageStore();
  const [search, dispatchSearch] = useReducer(
    searchReducer,
    INITIAL_SEARCH_STATE
  );
  const { data, error, loading, nextPage, prevPage } = useAnimals(
    search,
    dispatchSearch
  );

  return (
    <DefaultPage>
      <section className="mt-10 flex flex-col w-full md:w-auto items-center justify-center mb-10">
        <h1 className="title mb-10">{TRANSLATES[language].LOGO}</h1>
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
