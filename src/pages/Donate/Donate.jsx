import { useParams } from "wouter";
import Select from "../../components/select/Select";
import DonarImg from "/imgs/donar.jpg";
import MpBoton from "../../components/mpBoton/MpBoton";
import { useState } from "react";
import DefaultPage from "../defaultPage/DefaultPage";
import Loader from "../../components/loader/Loader";
import useLanguageStore from "../../stores/useLanguageStore";
import { useOrganizationFinancialInfo } from "../../hooks/querys/organization/useOrganizationFinancialInfo";
import { TRANSLATES } from "../../utils/languajes";
import { useOrganizations } from "../../hooks/querys/organization/useOrganizations";
export default function Donar() {
  const { id } = useParams();
  const { language } = useLanguageStore();
  const [idOrg, setIdOrg] = useState(id || 0);
  const { data, isLoading } = useOrganizations();
  const { data: org, refetch } = useOrganizationFinancialInfo(idOrg);

  const handleOrganizationChange = (e) => {
    setIdOrg(e.target.value);
    refetch();
  };

  return (
    <DefaultPage>
      <section className="mt-10 flex items-center justify-evenly flex-col gap-10 mb-10 ">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-5 text-orange">
            {TRANSLATES[language].DONATE.TITLE}
          </h1>
          <Select id={idOrg} data={data} onChange={handleOrganizationChange} />
        </div>

        <div className="w-9/12 h-96 flex flex-row items-center justify-evenly bg-orange p-5 rounded flex-col md:flex-row">
          {isLoading ? (
            <Loader />
          ) : (
            <div className=" w-2/5 text-center rounded flex items-center flex-col justify-evenly h-60">
              <h2 className="text-3xl font-bold ">
                {TRANSLATES[language].DONATE.TRANSFERS}
              </h2>
              <p className="text-xl">
                <span className="font-bold">CBU:</span>{" "}
                {org?.cbu || TRANSLATES[language].LABELS.NO_INFO}
              </p>
              <p className="text-xl">
                <span className="font-bold">Alias:</span>{" "}
                {org?.alias || TRANSLATES[language].LABELS.NO_INFO}
              </p>
            </div>
          )}

          <img
            src={DonarImg}
            alt="Donar"
            className=" w-full h-2/5 object-cover rounded shadow-lg md:w-2/5 md:h-full "
          />
        </div>
        {org?.mp_link && (
          <MpBoton
            mp_link={org.mp_link}
            title={TRANSLATES[language].DONATE.MP}
          />
        )}
      </section>
    </DefaultPage>
  );
}
