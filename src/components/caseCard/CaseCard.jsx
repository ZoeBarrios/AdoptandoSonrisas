import { Link } from "wouter";
import SliderCard from "../sliderCard/SliderCard";
import "./CaseCard.css";

export default function CaseCard({ itemcase }) {
  const onlyImages = itemcase?.imgs?.map((img) => img.img_url) || [];
  const description =
    itemcase?.description.length > 150
      ? itemcase?.description.substring(0, 150) + "..."
      : itemcase?.description;
  return (
    <div className="flex-col items-center w-full md:w-2/5 flex lg:flex-row bg-white shadow-card p-4 rounded-lg overflow-hidden grow">
      <SliderCard images={onlyImages} />
      <div className=" text-center lg:text-left flex-1 h-auto ml-4 h-30 self-center flex flex-col justify-around h-40">
        <h5 className="font-bold text-xl mb-2">{itemcase?.title}</h5>
        <p className="text-gray-700 overflow-auto">{description}</p>
        <Link
          to={`/casos/${itemcase.id}`}
          className="mt-3 self-center lg:self-start bg-orange w-28 text-center text-lg rounded-md shadow-md hover:bg-white transition-colors duration-300 ease-in-out"
        >
          Ver mas
        </Link>
      </div>
    </div>
  );
}
