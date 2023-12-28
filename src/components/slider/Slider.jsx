import { useState, useEffect } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import "./Slider.css";
import useSlider from "../../hooks/useSlider";

const Slider = ({ images }) => {
  const { current, nextSlide, prevSlide } = useSlider(images.length);
  const [direction, setDirection] = useState("left");
  const [key, setKey] = useState(Date.now());
  useEffect(() => {
    setKey(Date.now());
  }, [current]);

  const handleSlide = (direction) => {
    setDirection(direction);
    if (direction === "left") {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  const slideProps = useSpring({
    reset: true,
    from: {
      transform: `translateX(${direction === "left" ? "100%" : "-100%"})`,
    },
    to: { transform: "translateX(0%)" },
    config: config.default,
  });

  return (
    <div className="slider">
      <animated.img
        key={key}
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="slider-image"
        style={slideProps}
      />
      <div
        className={`slider-buttons ${images.length === 1 ? "opacity-0" : ""}`}
      >
        <button onClick={() => handleSlide("right")} className="slider-button">
          <i
            className="fa-solid fa-arrow-right fa-rotate-180 fa-2xl"
            style={{ color: "#ffc93c" }}
          ></i>
        </button>
        <button onClick={() => handleSlide("left")} className="slider-button">
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
