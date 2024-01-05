/* eslint-disable react/no-unescaped-entities */
import "./About.css";
import useLanguageStore from "../../stores/useLanguageStore";
import { TRANSLATES } from "../../utils/languajes";
export default function About() {
  const { language } = useLanguageStore();
  return (
    <section className="about-section">
      <div className="about w-full md:w-10/12 lg:w-8/12">
        <h1>{TRANSLATES[language].LOGO}</h1>
        <p className="leading-8">{TRANSLATES[language].ABOUT}</p>
      </div>
    </section>
  );
}
