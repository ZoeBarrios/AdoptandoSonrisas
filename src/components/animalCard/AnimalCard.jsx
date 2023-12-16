import { Link } from "wouter";
import getAge from "../../utils/getAge";
import SexItem from "../sexItem/SexItem";
import "../caseCard/CaseCard.css";
import { SIZE_TRANSLATE } from "../../utils/translate";

export default function AnimalCard({ animal }) {
  const { name, sex, size, birthdate, img_url } = animal;

  const age = getAge(birthdate);
  return (
    <div className="flex w-4/5 md:w-2/5 items-center flex-col h-2/5 bg-white shadow-card p-5 rounded-md">
      <div className="w-40 h-40 rounded-lg overflow-hidden">
        <img src={img_url} alt={name} className="object-cover w-full h-full" />
      </div>
      <h3>{name}</h3>
      <div className="flex flex-row w-full items-center justify-around text-center">
        <SexItem sex={sex} />
        <span>{SIZE_TRANSLATE[size]}</span>
        <span>{age} años</span>
      </div>
      <Link to={`/adoptar/${animal.animal_id}`}>
        <button className="bg-orange p-3 mt-5 w-full rounded text-lg hover:bg-gray-200 transition-colors duration-300 ease-in-out">
          Ver más
        </button>
      </Link>
    </div>
  );
}
