import { useQuery } from "react-query";
import { getCases } from "../../services/cases";
import CaseCard from "../caseCard/CaseCard";

export default function CaseContainer() {
  const { data, isLoading, isError } = useQuery("cases", getCases);
  return (
    <div className="w-10/12 flex flex-row items-center justify-around flex-wrap gap-5">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <h2>Error</h2>
      ) : (
        data.map((item) => <CaseCard key={item.id} itemcase={item} />)
      )}
    </div>
  );
}
