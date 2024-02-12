import Perro3 from "/imgs/perro3.png";
import "./AboutRegister.css";
import { Link } from "wouter";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";
export default function AboutRegister() {
  const { language } = useLanguageStore();
  return (
    <section className="about-register animate__fadeIn">
      <div className="about-register-info ">
        <div className="about-register-text">
          <h2>{TRANSLATES[language].REGISTER_SECTION.TITLE}</h2>
          <p>{TRANSLATES[language].REGISTER_SECTION.DESCRIPTION}</p>
          <div className="button-container">
            <Link to="/register/organizacion" className="button register">
              {TRANSLATES[language].BUTTONS.REGISTER_ORGANIZATION}
            </Link>
          </div>
        </div>
      </div>
      <div className="img-about-register-container">
        <img
          src={Perro3}
          alt="about-register-img"
          className="img-about-register"
        />
      </div>
    </section>
  );
}
