import { Link, useParams } from "wouter";
import { getAnimal } from "../../services/animals";
import { useMutation, useQuery } from "react-query";
import "../../components/caseCard/CaseCard.css";
import SexItem from "../../components/sexItem/SexItem";
import getAge from "../../utils/getAge";
import DefaultPage from "../defaultPage/DefaultPage";
import FetchInfo from "../../components/fetchInfo/FetchInfo";
import { SIZE_TRANSLATE } from "../../utils/translate";
import useAuthStore from "../../stores/useAuthStore";
import Modal from "../../components/modal/Modal";
import { registerAdoption } from "../../services/adoptions";
import { useState } from "react";
import { toast } from "react-toastify";
export default function Animal() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [show, setShow] = useState(false);
  const { data, isLoading, isError } = useQuery(["animal", { id }], () =>
    getAnimal(Number(id))
  );

  const { mutate } = useMutation(registerAdoption, {
    onSuccess: () => {
      setShow(false);
      toast.success(
        "La organización ha sido notificada de tu solicitud de adopción"
      );
    },
    onError: async (error) => {
      const { message } = await error.json();

      toast.error(message || "Ha ocurrido un error, intenta de nuevo");
    },
  });

  const handleAdopt = () => {
    mutate({
      animal_id: id,
      person_id: user.id,
    });
  };

  return (
    <DefaultPage>
      <section className="mt-40 w-full flex items-center justify-center mb-5">
        {isLoading || isError ? (
          <FetchInfo error={isError} loading={isLoading} />
        ) : null}

        {data && (
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
                <button
                  className="mt-5 bg-green p-2 w-full md:w-6/12 rounded hover:bg-grey transition-colors duration-300 ease-in-out"
                  onClick={() => setShow(true)}
                >
                  Adoptar
                </button>
              </div>
            </div>
            <Modal setIsOpen={() => setShow(true)} isOpen={show}>
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-3">
                  ¿Estás seguro de que quieres adoptar a {data.name}?
                </h1>
                <p className="text-center">
                  Al adoptar a {data.name} te comprometes a cuidarlo y darle el
                  amor que se merece.
                </p>
                <button
                  className="mt-5 bg-green p-2 w-full md:w-6/12 rounded hover:bg-grey transition-colors duration-300 ease-in-out"
                  onClick={handleAdopt}
                >
                  Adoptar
                </button>
                <button
                  className="mt-5 bg-green p-2 w-full md:w-6/12 rounded hover:bg-grey transition-colors duration-300 ease-in-out"
                  onClick={() => setShow(false)}
                >
                  Cancelar
                </button>
              </div>
            </Modal>
          </div>
        )}
      </section>
    </DefaultPage>
  );
}
