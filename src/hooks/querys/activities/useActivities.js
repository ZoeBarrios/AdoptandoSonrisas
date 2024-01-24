import { useQuery } from "react-query";
import { getActivities } from "../../../services/activity";

export function useActivities() {
  const { data: activities } = useQuery("activities", getActivities);
  return { activities };
}
