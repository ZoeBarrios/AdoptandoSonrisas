import useAuthStore from "../../stores/useAuthStore";
import { ROUTES } from "../../utils/routesConstants";
import NavItem from "../navItem/NavItem";
import useLanguageStore from "../../stores/useLanguageStore";
import { useAuth } from "../../hooks/useAuth";
import { TRANSLATES } from "../../utils/languajes";
import LanguajeSelector from "../languajeSelector/LanguajeSelector";

export default function Nav() {
  const { isAuthenticated } = useAuthStore();
  const { language } = useLanguageStore();
  const translate = TRANSLATES[language].NAV;
  const { handleLogout } = useAuth();
  return (
    <>
      {ROUTES.map((route) => {
        return (
          <NavItem href={route.path} key={route.name[language]}>
            {route.name[language]}
          </NavItem>
        );
      })}

      {isAuthenticated ? (
        <NavItem href="/perfil">{translate.PROFILE}</NavItem>
      ) : (
        <NavItem href="/register">{translate.VOLUNTEERS}</NavItem>
      )}

      {isAuthenticated ? (
        <a onClick={handleLogout} className="cursor-pointer">
          {translate.LOGOUT}
        </a>
      ) : (
        <NavItem href="/login">{translate.LOGIN}</NavItem>
      )}
      <LanguajeSelector />
    </>
  );
}
