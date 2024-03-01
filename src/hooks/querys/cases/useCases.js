import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCases } from "../../../services/cases";
import { scrollToTop } from "../../../utils/utils";

export function useCases() {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery("cases", () =>
    getCases(page, 3)
  );

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const nextPage = () => {
    if (data.length < 3) return;
    setPage(page + 1);
    scrollToTop();
  };

  const prevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
    scrollToTop();
  };
  return {
    cases: data,
    isLoading,
    nextPage,
    prevPage,
    page,
  };
}
