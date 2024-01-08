import { Link, useParams } from "wouter";
import { getCase } from "../../services/cases";
import { useQuery } from "react-query";
import Slider from "../../components/slider/Slider";
import SexItem from "../../components/sexItem/SexItem";
import getAge from "../../utils/getAge";
import DefaultPage from "../defaultPage/DefaultPage";
import { SIZE_TRANSLATE } from "../../utils/translate";
import useAuthStore from "../../stores/useAuthStore";
import { ROLES } from "../../utils/constants";

import FormUpdateCase from "../../components/forms/update/FormUpdateCase";
import useModal from "../../hooks/useModal";
import Loader from "../../components/loader/Loader";
import useLanguageStore from "../../stores/useLanguageStore";
import { LANGUAGES, TRANSLATES } from "../../utils/languajes";

export default function Case() {
  const { id } = useParams();
  const { language } = useLanguageStore();
  const { showModal, openModal, closeModal } = useModal();
  const { user, organization } = useAuthStore();
  const { data, isLoading, refetch } = useQuery(["case", { id }], () =>
    getCase(Number(id))
  );

  const { sex, size, organization_id } = data?.animal ?? {};
  const imgs = data?.imgs?.map((img) => img.img_url);
  const age = getAge(data?.animal.birthdate, language);

  console.log(data);

  return (
    <DefaultPage>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-5 w-full  lg:h-screen flex items-center justify-center">
          <section className="flex flex-col lg:flex-row w-10/12 p-5 bg-green mb-5 justify-between rounded shadow-2xl gap-5">
            <div className="flex flex-col items-center h-1/4">
              <Slider images={imgs} />
              <div className="w-full flex items-center justify-around mt-3 font-bold">
                <SexItem sex={sex} />
                <span className="ml-2">
                  {language == LANGUAGES.ES
                    ? SIZE_TRANSLATE[size]
                    : size.charAt(0).toUpperCase() +
                      size.slice(1).toLowerCase()}
                </span>
                <span className="ml-2">{age}</span>
              </div>
            </div>
            <div className="w-full lg:w-8/12 flex flex-row bg-white shadow-2xl p-4 rounded-lg overflow-hidden">
              <div className="w-full flex flex-col justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-3">{data.title}</h1>
                  <p className="text-base lg:text-lg max-h-80 overflow-y-auto">
                    {data.description}
                  </p>
                </div>

                {user?.role !== ROLES.USER &&
                user &&
                organization_id &&
                organization === organization_id ? (
                  <>
                    <button
                      onClick={openModal}
                      className="buttons-form bg-green mt-5"
                    >
                      {TRANSLATES[language].BUTTONS.UPDATE}
                    </button>
                    <FormUpdateCase
                      data={data}
                      refetch={refetch}
                      showModal={showModal}
                      closeModal={closeModal}
                    />
                  </>
                ) : (
                  <Link
                    to={`/organizacion/${organization_id}`}
                    className="bg-green p-3 mt-5 rounded md:self-center lg:self-end text-lg hover:bg-gray-200 transition-colors duration-300 ease-in-out"
                  >
                    {TRANSLATES[language].BUTTONS.SEE_ORGANIZATION}
                  </Link>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </DefaultPage>
  );
}
