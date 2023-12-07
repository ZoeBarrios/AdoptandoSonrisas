import "./DonationInfo.css";
import Perro1 from "/imgs/perro1.png";
import Perro2 from "/imgs/perro2.png";
import Gato1 from "/imgs/gato1.png";
import curva from "/imgs/curva.svg";
import Slider from "../slider/Slider";

const images = [Perro1, Gato1, Perro2];

export default function DonationInfo() {
  return (
    <div className="donation-info-section">
      <div>
        <img src={curva} className="curva" />
      </div>

      <section className="donation-info">
        <div className="donation-info-text">
          <h2>Donación y voluntariado</h2>
          <p>Si quieres ayudar a la causa, puedes hacerlo de varias formas:</p>
        </div>
        <Slider images={images} />
        <div className="buttons-container">
          <button className="button">Donar</button>
          <button className="button">Voluntariado</button>
        </div>
      </section>
    </div>
  );
}
