import { useState } from "react";
import PanelItem from "../panelItem/PanelItem";

const PanelMenu = ({ items, sectionActive, handleSectionActive }) => {
  const [panelIsShown, setPanelIsShown] = useState(false);

  const handlePanelIsShown = () => {
    setPanelIsShown(!panelIsShown);
  };

  return (
    <div
      className={`bg-grey h-full w-72 fixed md:relative shadow-2xl z-30 flex flex-col items-center  ${
        panelIsShown ? "showPanel" : "hidePanel"
      } group`}
    >
      <div className="h-full flex flex-col self-center justify-around ml-5 rounded ">
        {Object.keys(items).map((key) => {
          return (
            <PanelItem
              key={key}
              isActive={sectionActive.id === items[key].id}
              onClick={() => handleSectionActive(items[key])}
              panelIsShow={`${!panelIsShown ? "opacity-0" : ""}`}
              icon={items[key].icon}
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
