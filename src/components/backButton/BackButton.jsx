import { useLocation } from "wouter";
export default function BackButton() {
  const [location, setLocation] = useLocation();
  const handleBack = () => {
    setLocation("/");
  };
  return (
    <button className="absolute top-5 left-5 ">
      <i
        className="fa-solid fa-arrow-right fa-rotate-180 text-white text-4xl cursor-pointer"
        onClick={handleBack}
      ></i>
    </button>
  );
}
