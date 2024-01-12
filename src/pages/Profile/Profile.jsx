import { useEffect } from "react";
import PanelMenu from "../../components/panelMenu/PanelMenu";
import useAuthStore from "../../stores/useAuthStore";
import { PANEL_ACTIONS } from "../../utils/constants";
import ComponentToShow from "../../components/componentToShow/ComponentToShow";
import Header from "../../components/header/Header";
import useLanguageStore from "../../stores/useLanguageStore";
import { setObjToLocalStorage } from "../../utils/localStorageFunctions";

export default function Profile() {
  const { user, setPanelSection, panelSection } = useAuthStore();
  const role = user?.role.toUpperCase();
  const { language } = useLanguageStore();

  useEffect(() => {
    !panelSection && setPanelSection(PANEL_ACTIONS[role].PROFILE);
  }, [role, setPanelSection]);

  const handleSectionActive = (section) => {
    setPanelSection(section);
    setObjToLocalStorage("panelSection", section);
  };

  return (
    <>
      <Header />
      <section className="md:h-screen max-h-full flex flex-row relative bg-white">
        <PanelMenu
          items={PANEL_ACTIONS[role]}
          sectionActive={panelSection}
          handleSectionActive={handleSectionActive}
        />
        <div className="h-screen flex flex-col items-center justify-center w-full md:h-screen">
          <ComponentToShow section={panelSection} />
        </div>
      </section>
    </>
  );
}
