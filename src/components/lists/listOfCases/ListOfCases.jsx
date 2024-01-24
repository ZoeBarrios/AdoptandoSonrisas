import CaseMiniCard from "../../cards/caseMiniCard/CaseMiniCard";

export default function ListOfCases({ data, refetch }) {
  return (
    <div className="list-card shadow-card">
      {data?.length > 0 ? (
        data.map((caseInfo) => (
          <CaseMiniCard
            key={caseInfo.case_id}
            caseInfo={caseInfo}
            refetch={refetch}
          />
        ))
      ) : (
        <h2 className="title-no-info">No hay casos disponibles</h2>
      )}
    </div>
  );
}
