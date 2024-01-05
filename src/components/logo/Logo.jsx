import LogoImg from "/imgs/logo.png";
import "./Logo.css";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";
import { Link } from "wouter";
export default function Logo() {
  const { language } = useLanguageStore();

  return (
    <div className="logo mb-3 ">
      <img src={LogoImg} alt="logo" className="logo-img" />
      <Link to="/">
        <p className="logo-text cursor-pointer bold hover:font-bold hover:scale-105 transition-all ease-in-out duration-300 ">
          {TRANSLATES[language].LOGO}
        </p>
      </Link>
    </div>
  );
}
