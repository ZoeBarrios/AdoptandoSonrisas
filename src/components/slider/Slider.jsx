import "./Slider.css";
import useSlider from "../../hooks/useSlider";

const Slider = ({ images }) => {
  const { current, nextSlide, prevSlide } = useSlider(images.length);

  console.log(images.length);
  return (
    <div className="slider">
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="slider-image"
      />
      <div
        className={`slider-buttons ${images.length === 1 ? "opacity-0" : ""}`}
      >
        <button onClick={prevSlide} className="slider-button">
          <i
            className="fa-solid fa-arrow-right fa-rotate-180 fa-2xl"
            style={{ color: "#ffc93c" }}
          ></i>
        </button>
        <button onClick={nextSlide} className="slider-button">
          <i
            className="fa-solid fa-arrow-right fa-2xl"
            style={{ color: "#ffc93c" }}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default Slider;
