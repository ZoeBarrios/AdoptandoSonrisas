import { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./Banner.css";

export default function Banner() {
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
        <h1>Adoptando Sonrisas</h1>
        <p>Encuentra tu compañero peludo y llena tu vida de amor y alegría.</p>
        <button className="btn btn--primary">Adoptar</button>
      </div>
    </animated.div>
  );
}
