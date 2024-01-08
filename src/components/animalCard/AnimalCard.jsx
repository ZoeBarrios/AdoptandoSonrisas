import { Link } from "wouter";
import getAge from "../../utils/getAge";
import SexItem from "../sexItem/SexItem";
import "../caseCard/CaseCard.css";
import { SIZE_TRANSLATE } from "../../utils/translate";
import useLanguageStore from "../../stores/useLanguageStore";
import { LANGUAGES, TRANSLATES } from "../../utils/languajes";

export default function AnimalCard({ animal }) {
  const { name, sex, size, birthdate, img_url } = animal;
  const { language } = useLanguageStore();

  const age = getAge(birthdate,language);
  return (
    <div className="flex w-4/5 md:w-2/5 items-center flex-col h-2/5 bg-white shadow-card p-5 rounded-md">
      <div className="w-40 h-40 rounded-lg overflow-hidden">
        <img src={img_url} alt={name} className="object-cover w-full h-full" />
      </div>
      <h3>{name}</h3>
      <div className="flex flex-row w-full items-center justify-around text-center">
        <SexItem sex={sex} />
        <span>
          {language === LANGUAGES.ES
            ? SIZE_TRANSLATE[size]
            : size.charAt(0) + size.slice(1).toLowerCase()}
        </span>
        <span>{age}</span>
      </div>
      <Link to={`/adoptar/${animal.animal_id}`}>
        <button className="buttons-form w-full mt-5">
          {TRANSLATES[language].BUTTONS.MORE}
        </button>
      </Link>
    </div>
  );
}
