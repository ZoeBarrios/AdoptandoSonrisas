import { useQuery } from "react-query";
import { getAnimals } from "../../../services/animals";
import { useEffect } from "react";
import { SEARCH_ACTIONS } from "../../../utils/constants";

export function useAnimals(search, dispatchSearch) {
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
  return { loading, error, data, nextPage, prevPage };
}
