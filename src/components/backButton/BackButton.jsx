export default function BackButton({ color = "white" }) {
  const handleBack = () => {
    window.history.back();
  };
  return (
    <button className="absolute top-5 left-5 ">
      <i
        className={`fa-solid fa-arrow-right fa-rotate-180 text-${color} text-4xl cursor-pointer`}
        onClick={handleBack}
      ></i>
    </button>
  );
}
