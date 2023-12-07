import LogoImg from "/imgs/logo.png";
import "./Logo.css";
export default function Logo() {
  return (
    <div className="logo">
      <img src={LogoImg} alt="logo" className="logo-img" />
      <p className="logo-text">Adoptando Sonrisas</p>
    </div>
  );
}
