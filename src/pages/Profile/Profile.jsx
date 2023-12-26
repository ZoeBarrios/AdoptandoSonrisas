import { useState } from "react";
import PanelMenu from "../../components/panelMenu/PanelMenu";
import useAuthStore from "../../stores/useAuthStore";
import { PANEL_ACTIONS } from "../../utils/constants";
import ComponentToShow from "../../components/componentToShow/ComponentToShow";
import Header from "../../components/header/Header";

export default function Profile() {
  const { user } = useAuthStore();
  const role = user?.role.toUpperCase();
  const [sectionActive, setSectionActive] = useState(
    PANEL_ACTIONS[role].PROFILE
  );

  const handleSectionActive = (section) => {
    setSectionActive(section);
  };

  return (
    <>
      <Header />
      <section className="md:h-screen max-h-full flex flex-row relative bg-white">
        <PanelMenu
          items={PANEL_ACTIONS[role]}
          sectionActive={sectionActive}
          handleSectionActive={handleSectionActive}
        />
        <div className="flex flex-col items-center justify-center w-full md:h-screen">
          <ComponentToShow section={sectionActive} />
        </div>
      </section>
    </>
  );
}
