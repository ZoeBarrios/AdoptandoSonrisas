import { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Link } from "wouter";
import useLanguageStore from "../../stores/useLanguageStore";
import "./Banner.css";
import { TRANSLATES } from "../../utils/languajes";

export default function Banner() {
  const { language } = useLanguageStore();
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

  return (
    <animated.div className="banner" style={containerProps}>
      <div className="banner__content">
        <h1>{TRANSLATES[language].LOGO}</h1>
        <p>{TRANSLATES[language].BANNER}</p>
        <Link to="/adoptar">
          <span className="buttons-form cursor-pointer w-3/12 text-xl text-center">
            {TRANSLATES[language].BUTTONS.ADOPT}
          </span>
        </Link>
      </div>
    </animated.div>
  );
}
