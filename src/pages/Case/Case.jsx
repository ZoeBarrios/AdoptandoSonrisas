import { useParams } from "wouter";
import { getCase } from "../../services/cases";
import { useQuery } from "react-query";
import Slider from "../../components/slider/Slider";
import { GENDERS } from "../../utils/constants";

export default function Case() {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(["case", { id }], () =>
    getCase(Number(id))
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError || !data || !data.animal) {
    return <h1>Error</h1>;
  }

  const { birthdate, sex, size, organization_id } = data.animal;
  const imgs = data?.imgs?.map((img) => img.img_url);
  const age = new Date().getFullYear() - new Date(birthdate).getFullYear();

  return (
    <div className="mt-40 w-full  lg:h-screen flex items-center justify-center">
      <section className="flex flex-col lg:flex-row w-10/12 p-5 bg-green mb-5 justify-between rounded shadow-2xl gap-5">
        <div className="flex flex-col items-center h-1/4">
          <Slider images={imgs} />
          <div className="w-full flex items-center justify-around mt-3 font-bold">
            <i
              className={
                sex && sex === GENDERS.H
                  ? "fa-solid fa-venus fa-lg"
                  : "fa-solid fa-mars fa-lg"
              }
            ></i>
            <span className="ml-2">{size}</span>
            <span className="ml-2">{age} años</span>
          </div>
        </div>
        <div className="w-full lg:w-8/12 flex flex-row bg-white shadow-2xl p-4 rounded-lg overflow-hidden">
          <div className="w-full flex flex-col justify-between">
            <h1 className="text-4xl font-bold">{data.title}</h1>
            <p className="text-base lg:text-lg max-h-80 overflow-y-auto">
              {data.description}
            </p>

            <button className="bg-green p-3 mt-5 rounded md:self-center lg:self-end text-lg hover:bg-gray-200 transition-colors duration-300 ease-in-out">
              Ver organización
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
