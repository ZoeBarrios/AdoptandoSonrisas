import { useQuery } from "react-query";
import { getRatingsByPersonId } from "../../../services/ratings";

export function useRatings(id) {
  const { data: ratings, isLoading: ratingsLoading } = useQuery("ratings", () =>
    getRatingsByPersonId(id)
  );
  return { ratings, ratingsLoading };
}
