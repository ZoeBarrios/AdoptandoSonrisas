import { useEffect } from "react";
import useSlider from "../../hooks/useSlider";

export default function SliderCard({ images }) {
  const { current, nextSlide } = useSlider(images?.length || 0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [images, nextSlide]);

  return (
    <div className="slider-card w-48 h-48 relative">
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <img
          src={images[current]}
          alt={`Slide ${current + 1}`}
          className="w-48 h-48 object-cover rounded"
        />
      </div>
    </div>
  );
}
