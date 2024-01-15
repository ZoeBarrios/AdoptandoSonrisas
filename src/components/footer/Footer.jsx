import "./Footer.css";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";
export default function Footer() {
  const { language } = useLanguageStore();
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2023 - {TRANSLATES[language].FOOTER}</p>
        <p>
          <i
            className="fa-regular fa-envelope"
            style={{ color: "#000000" }}
          ></i>{" "}
          AdoptandoSonrisas@hotmail.com
        </p>
      </div>
    </footer>
  );
}
