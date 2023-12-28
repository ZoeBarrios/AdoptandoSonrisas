import { Link, useParams } from "wouter";
import { getAnimal } from "../../services/animals";
import { useQuery } from "react-query";
import "../../components/caseCard/CaseCard.css";
import SexItem from "../../components/sexItem/SexItem";
import getAge from "../../utils/getAge";
import DefaultPage from "../defaultPage/DefaultPage";
import { SIZE_TRANSLATE } from "../../utils/translate";
import useAuthStore from "../../stores/useAuthStore";
import Modal from "../../components/modal/Modal";
import { ROLES } from "../../utils/constants";
import AdoptForm from "../../components/forms/create/AdoptForm";
import useModal from "../../hooks/useModal";
import UpdateAnimalForm from "../../components/forms/update/UpdateAnimalForm";
import Loader from "../../components/loader/Loader";
export default function Animal() {
  const { id } = useParams();
  const { user, organization } = useAuthStore();
  const { data, isLoading, refetch } = useQuery(["animal", { id }], () =>
    getAnimal(Number(id))
  );
  const { showModal, openModal, closeModal } = useModal();

  return (
    <DefaultPage>
      <section className="w-full h-full flex items-center justify-center p-5">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-9/12 bg-green flex flex-col md:flex-row  p-5 rounded gap-5">
            <div className="flex w-full md:w-9/12 h-full flex-col items-center justify-center gap-5">
              <div className="w-full h-full rounded-lg overflow-hidden">
                <img
                  src={data.img_url}
                  alt={data.name}
                  className="w-96 h-96 object-cover rounded m-auto"
                />
              </div>
              <div className="flex flex-row w-full md:w-9/12 justify-between items-center h-38">
                <SexItem sex={data.sex} />
                <span>{SIZE_TRANSLATE[data.size]}</span>
                <span>{getAge(data?.birthdate)} años</span>
              </div>
            </div>

            <div className="bg-white rounded shadow-card flex flex-col w-full p-3 items-start justify-between">
              <div className="text-start">
                <h1 className="text-4xl font-bold mb-3">{data.name}</h1>
                <p className="text-base lg:text-lg max-h-80 overflow-y-auto">
                  {data.description}
                </p>
              </div>

              <div className="flex flex-col w-full items-center justify-between md:items-end md:flex-row mt-5 ">
                <Link
                  to={`/organizacion/${data?.organization.organization_id}`}
                  className="cursor-pointer text-base text-center md:text-start font-base hover:text-grey transition-colors duration-300 ease-in-out"
                >
                  Organización {data?.organization.name}
                </Link>
                {user?.role !== ROLES.USER &&
                user &&
                data?.organization?.organization_id &&
                organization === data?.organization?.organization_id ? (
                  <div>
                    <button onClick={openModal} className="buttons-form">
                      Editar
                    </button>

                    <UpdateAnimalForm
                      animal={data}
                      refetch={refetch}
                      closeModal={closeModal}
                      showModal={showModal}
                    />
                  </div>
                ) : (
                  <div>
                    <button className="buttons-form" onClick={openModal}>
                      Adoptar
                    </button>
                    <AdoptForm
                      name={data.name}
                      openModal={openModal}
                      closeModal={closeModal}
                      isShow={showModal}
                      person_id={user?.id}
                      animal_id={id}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </DefaultPage>
  );
}
