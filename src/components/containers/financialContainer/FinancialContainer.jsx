import useAuthStore from "../../../stores/useAuthStore";
import Loader from "../../loader/Loader";
import FinancialForm from "../../forms/update/financialForm/FinancialForm";
import useLanguageStore from "../../../stores/useLanguageStore";
import { TRANSLATES } from "../../../utils/languajes";
import { useFinancialInfo } from "../../../hooks/querys/financialInfo/useFinancialInfo";

export default function FinancialContainer() {
  const { organization } = useAuthStore();
  const { financial: data, isLoading, refetch } = useFinancialInfo();
  const { language } = useLanguageStore();

  return (
    <section className="flex-container h-screen">
      <h2 className="title w-9/12">
        {TRANSLATES[language].FINANCIAL_SECTION.TITLE}
      </h2>
      <div className="w-9/12 md:w-6/12 mt-5 shadow-card p-5 rounded-lg flex flex-col items-center justify-around">
        {isLoading ? (
          <Loader />
        ) : data ? (
          <FinancialForm
            update={true}
            financialInfo={{
              cbu: data.cbu || "",
              alias: data.alias || "",
              mp_link: data.mp_link || "",
            }}
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
