import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";
import logo from "/imgs/logo.png";

export default function Footer() {
  const { language } = useLanguageStore();

  return (
    <footer className="bg-orange py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2 mb-4 md:mb-0 flex items-center">
            <img src={logo} alt="Logo" className="h-12 mr-4" />
            <p className="text-sm text-gray-600">
              &copy; 2023 - {TRANSLATES[language].FOOTER}
            </p>
          </div>
          <div className="md:w-1/2 flex flex-col md:flex-row justify-end items-center">
            <div className="md:ml-4">
              <p className="text-gray-600 mb-2 md:mb-0">
                ¿Necesitas ayuda? Contáctanos:
              </p>
              <a
                href="mailto:AdoptandoSonrisas@hotmail.com"
                className="text-sm md:text-md text-gray-500 font-semibold hover:text-gray-600"
              >
                AdoptandoSonrisas@hotmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
