import { useState } from "react";
import { FLAG, LANGUAGES } from "../../utils/languajes";
import useLanguageStore from "../../stores/useLanguageStore";

export default function LanguageSelector() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { language, setLanguage } = useLanguageStore();

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSetLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setShowDropdown(false);
  };

  return (
    <div className="relative ">
      <div
        className="handleClick cursor-pointer  self-center"
        onClick={handleClick}
      >
        <img src={FLAG[language]} alt="flag" className="w-8 h-8" />
      </div>
      <div
        className={`${
          showDropdown ? "block" : "hidden"
        } absolute bg-white w-24 p-3 rounded-lg shadow-lg z-10 right-2`}
      >
        <ul>
          {Object.keys(LANGUAGES).map((lan) => (
            <li key={lan} className="flex flex-row gap-3">
              <input
                type="radio"
                checked={language === lan}
                onChange={() => handleSetLanguage(lan)}
                className="cursor-pointer font-bold"
                id={lan}
              />
              <label className="cursor-pointer font-bold" htmlFor={lan}>
                {lan}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
