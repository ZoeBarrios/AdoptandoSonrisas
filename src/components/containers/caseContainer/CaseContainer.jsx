import CaseCard from "../../cards/caseCard/CaseCard";
import PaginationButtons from "../../paginationButtons/PaginationButtons";
import Loader from "../../loader/Loader";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import { useCases } from "../../../hooks/querys/cases/useCases";
export default function CaseContainer() {
  const { language } = useLanguageStore();
  const {
    cases: data,
    isLoading,
    page,
    setPage,
    nextPage,
    prevPage,
  } = useCases();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-around mt-12">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="w-9/12  flex flex-row items-center justify-around flex-wrap gap-5">
            {data?.length > 0 && data ? (
              data?.map((item) => (
                <CaseCard key={item.case_id} itemcase={item} />
              ))
            ) : (
              <h2 className="text-3xl p-40 text-center">
                {TRANSLATES[language].CASES.NO_CASES}
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
        </>
      )}
    </div>
  );
}
