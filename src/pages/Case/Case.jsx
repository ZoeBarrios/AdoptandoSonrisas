import { Link, useParams } from "wouter";
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
import { useCase } from "../../hooks/querys/cases/useCase";

export default function Case() {
  const { id } = useParams();
  const { language } = useLanguageStore();
  const { showModal, openModal, closeModal } = useModal();
  const { user, organization } = useAuthStore();
  const { data, isLoading, refetch } = useCase(id);
  const { sex, size, organization_id } = data?.animal ?? {};
  const imgs = data?.imgs?.map((img) => img.img_url);
  const age = getAge(data?.animal.birthdate, language);

  return (
    <DefaultPage>
      <section className="w-full h-screen flex items-center justify-center ">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-9/12 bg-green flex flex-col md:flex-row  p-5 rounded gap-5">
            <div className="flex w-full md:w-9/12 h-full flex-col items-center justify-center gap-5">
              <Slider images={imgs} />
              <div className="flex flex-row w-full md:w-9/12 justify-between items-center h-38">
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
            <div className="bg-white rounded shadow-card flex flex-col w-full p-3 items-start justify-between">
              <div className="w-full h-full flex flex-col justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-3">{data.title}</h1>
                  <p className="text-base lg:text-lg max-h-64 overflow-y-auto">
                    {data.description}
                  </p>
                </div>

                {user?.role != ROLES.USER && organization == organization_id ? (
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
          </div>
        )}
      </section>
    </DefaultPage>
  );
}
