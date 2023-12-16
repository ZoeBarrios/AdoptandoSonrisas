import { useEffect, useState } from "react";
import Logo from "../logo/Logo";
import NavItem from "../navItem/NavItem";
import "./Header.css";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import useAuthStore from "../../stores/useAuthStore";

export default function Header() {
  const { isAuthenticated, logout } = useAuthStore();
  const [shrink, setShrink] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logout();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={`header ${shrink ? "shrink" : null}`}>
      <div className="logo-container">
        <Logo />
      </div>
      <nav className="nav">
        <ul className="nav-ul text-sm md:text-base">
          <NavItem href="/">Inicio</NavItem>
          <NavItem href="/casos">Casos</NavItem>
          <NavItem href="/adoptar">Adoptar</NavItem>
          <NavItem href="/donar">Donar</NavItem>
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
        </ul>
      </nav>
      <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen}>
        <NavItem href="/">Inicio</NavItem>
        <NavItem href="/casos">Casos</NavItem>
        <NavItem href="/adoptar">Adoptar</NavItem>
        <NavItem href="/donar">Donar</NavItem>
        <NavItem href="/register">Voluntarios</NavItem>
        <NavItem href="/login">Iniciar sesión</NavItem>
      </HamburgerMenu>
    </header>
  );
}
