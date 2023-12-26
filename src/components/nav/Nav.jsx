import useAuthStore from "../../stores/useAuthStore";
import { ROUTES } from "../../utils/routesConstants";
import NavItem from "../navItem/NavItem";
import { useAuth } from "../../hooks/useAuth";

export default function Nav() {
  const { isAuthenticated } = useAuthStore();
  const { handleLogout } = useAuth();
  return (
    <>
      {ROUTES.map((route) => {
        return (
          <NavItem href={route.path} key={route.name}>
            {route.name}
          </NavItem>
        );
      })}

      {isAuthenticated ? (
        <NavItem href="/perfil">Perfil</NavItem>
      ) : (
        <NavItem href="/register">Voluntarios</NavItem>
      )}

      {isAuthenticated ? (
        <a onClick={handleLogout} className="cursor-pointer">
          Cerrar sesión
        </a>
      ) : (
        <NavItem href="/login">Iniciar sesión</NavItem>
      )}
    </>
  );
}
