import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./Slider.css";
import useSlider from "../../hooks/useSlider";

const Slider = ({ images }) => {
  const { current, nextSlide, prevSlide } = useSlider(images.length);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); // Activar la animación al cambiar la imagen
    const timeout = setTimeout(() => {
      setAnimate(false); // Desactivar la animación después de un tiempo
    }, 500); // Cambia este valor para ajustar la duración de la animación

    return () => clearTimeout(timeout);
  }, [current]);

  const springProps = useSpring({
    opacity: animate ? 0 : 1,
    from: { opacity: 0 },
    enter: { opacity: 1 },
  });

  return (
    <div className="slider">
      <animated.img
        style={springProps}
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
