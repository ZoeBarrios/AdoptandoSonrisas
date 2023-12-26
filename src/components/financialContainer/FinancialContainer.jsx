import { useQuery } from "react-query";
import { getFinancialInfo } from "../../services/financialInfo";
import useAuthStore from "../../stores/useAuthStore";
import Loader from "../loader/Loader";
import FinancialForm from "../financialForm/FinancialForm";

export default function FinancialContainer() {
  const { organization } = useAuthStore();
  const { data, isLoading, refetch } = useQuery("financial", () =>
    getFinancialInfo(organization)
  );

  return (
    <section className="flex-container h-screen">
      <h2 className="title w-9/12">
        ¡Registra tus datos para recibir donaciones!
      </h2>
      <div className="w-9/12 md:w-6/12 mt-5 shadow-card p-5 rounded-lg flex flex-col items-center justify-around">
        {isLoading ? (
          <Loader />
        ) : data ? (
          <FinancialForm
            update={true}
            financialInfo={data}
            organization={organization}
            refetch={refetch}
          />
        ) : (
          <FinancialForm organization={organization} refetch={refetch} />
        )}
      </div>
    </section>
  );
}
