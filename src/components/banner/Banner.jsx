import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Link } from "wouter";
import useLanguageStore from "../../stores/useLanguageStore";
import "./Banner.css";
import { TRANSLATES } from "../../utils/languajes";

export default function Banner() {
  const { language } = useLanguageStore();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [containerProps, setContainerProps] = useSpring(() => ({
    opacity: 0,
    marginTop: -20,
  }));

  useEffect(() => {
    setContainerProps.start({
      opacity: 1,
      marginTop: 0,
      from: { opacity: 0, marginTop: -20 },
      config: { duration: 800 },
    });
  }, [setContainerProps]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 768;

  return (
    <animated.div
      className="banner relative"
      style={{
        ...containerProps,
        backgroundImage: isMobile ? "none" : "url('/imgs/banner.png')",
      }}
    >
      <div className="banner__content">
        <h1 className="z-10">{TRANSLATES[language].LOGO}</h1>
        <p className="z-10">{TRANSLATES[language].BANNER}</p>
        <Link to="/adoptar">
          <span className="buttons-form cursor-pointer w-3/12 text-xl text-center z-10">
            {TRANSLATES[language].BUTTONS.ADOPT}
          </span>
        </Link>

        {isMobile && (
          <div className="absolute inset-0 z-0 md:hidden">
            <video autoPlay muted loop className="w-full h-full object-contain">
              <source src="/imgs/banner-mobile.mp4" type="video/mp4" />
              Tu navegador no admite videos HTML5.
            </video>
          </div>
        )}
      </div>
    </animated.div>
  );
}
