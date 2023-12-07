import Perro3 from "/imgs/perro3.png";
import "./AboutRegister.css";
export default function AboutRegister() {
  return (
    <section className="about-register">
      <div className="about-register-info">
        <div className="about-register-text">
          <h2>¿Como registrar mi organización?</h2>
          <p>
            Si quieres registrar tu organización, puedes hacerlo a traves de
            nuestro formulario de registro. Es importante que tengas en cuenta
            que para poder registrar tu organización, se te contactara para
            verificar la información que nos has proporcionado.
          </p>
          <div className="button-container">
            <button className="button register">
              Registrar mi organización
            </button>
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
