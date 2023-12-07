import { useState } from "react";
import "./Slider.css";

const Slider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider">
      <img
        src={images[currentImageIndex]}
        alt={`Slide ${currentImageIndex + 1}`}
        className="slider-image"
      />
      <div className="slider-buttons">
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
