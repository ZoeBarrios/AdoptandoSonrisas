import { useState } from "react";
import PanelMenu from "../../components/panelMenu/PanelMenu";
import useAuthStore from "../../stores/useAuthStore";
import { PANEL_ACTIONS } from "../../utils/constants";
import DefaultPage from "../defaultPage/DefaultPage";
import ComponentToShow from "../../components/componentToShow/ComponentToShow";

export default function Profile() {
  const { user } = useAuthStore();
  const role = user.role.toUpperCase();
  const [sectionActive, setSectionActive] = useState(
    PANEL_ACTIONS[role].PROFILE
  );

  const handleSectionActive = (section) => {
    setSectionActive(section);
  };

  return (
    <DefaultPage>
      <section className="flex flex-row">
        <PanelMenu
          items={PANEL_ACTIONS[role]}
          sectionActive={sectionActive}
          handleSectionActive={handleSectionActive}
        />
        <div className="pt-32 flex flex-col items-center w-full mt-10">
          <ComponentToShow section={sectionActive} />
        </div>
      </section>
    </DefaultPage>
  );
}
