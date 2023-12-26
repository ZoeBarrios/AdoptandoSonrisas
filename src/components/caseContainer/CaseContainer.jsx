import { useQuery } from "react-query";
import { getCases } from "../../services/cases";
import CaseCard from "../caseCard/CaseCard";
import { useEffect, useState } from "react";
import PaginationButtons from "../paginationButtons/PaginationButtons";

export default function CaseContainer() {
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
  };

  const prevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-around flex-wrap">
      <div className="w-full  md:w-9/12  flex flex-row items-center justify-around flex-wrap gap-5">
        {data?.length > 0 && data ? (
          data?.map((item) => <CaseCard key={item?.id} itemcase={item} />)
        ) : (
          <h2 className="text-3xl p-40 text-center">
            No hay mas casos registrados
          </h2>
        )}
      </div>
      <PaginationButtons
        page={page}
        setPage={setPage}
        limit={3}
        dataLength={data?.length}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
}
