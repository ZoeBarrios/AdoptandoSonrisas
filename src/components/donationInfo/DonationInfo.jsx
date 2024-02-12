import "./DonationInfo.css";
import { Link } from "wouter";
import Perro1 from "/imgs/perro1.png";
import Perro2 from "/imgs/perro2.png";
import Gato1 from "/imgs/gato1.png";
import curva from "/imgs/curva.svg";
import Slider from "../slider/Slider";
import useAuthStore from "../../stores/useAuthStore";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";

const images = [Perro1, Gato1, Perro2];

export default function DonationInfo() {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  return (
    <div className="donation-info-section">
      <div>
        <img src={curva} className="curva" />
      </div>

      <section className="donation-info">
        <div className="donation-info-text animate__fadeIn">
          <h2>{TRANSLATES[language].DONATION_SECTION.TITLE}</h2>
          <p>{TRANSLATES[language].DONATION_SECTION.DESCRIPTION}</p>
        </div>
        <Slider images={images} />
        <div className="buttons-container">
          <Link to="/donar" className="button">
            {TRANSLATES[language].BUTTONS.DONATE}
          </Link>
          <Link to={user ? "/perfil" : "/register"} className="button">
            {TRANSLATES[language].BUTTONS.VOLUNTEERING}
          </Link>
        </div>
      </section>
    </div>
  );
}
