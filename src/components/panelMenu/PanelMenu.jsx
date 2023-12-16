import { useState } from "react";
import PanelItem from "../panelItem/PanelItem";

const PanelMenu = ({ items, sectionActive, handleSectionActive }) => {
  const [panelIsShown, setPanelIsShown] = useState(false);

  const handlePanelIsShown = () => {
    setPanelIsShown(!panelIsShown);
  };

  return (
    <div
      className={`bg-ligthOrange w-60 h-screen pt-32 relative ${
        panelIsShown ? "showPanel" : "hidePanel"
      }`}
    >
      <div className="h-full flex flex-col justify-around ml-10">
        {Object.keys(items).map((key) => {
          return (
            <PanelItem
              key={key}
              isActive={sectionActive.id === items[key].id}
              onClick={() => handleSectionActive(items[key])}
            >
              {items[key].es}
            </PanelItem>
          );
        })}
        <i
          className={`fa-solid ${
            panelIsShown ? "fa-arrow-left" : "fa-arrow-right"
          } absolute right-1 cursor-pointer arrow`}
          onClick={handlePanelIsShown}
        ></i>
      </div>
    </div>
  );
};

export default PanelMenu;
