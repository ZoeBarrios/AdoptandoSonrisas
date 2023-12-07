import { useEffect, useState } from "react";
import Logo from "../logo/Logo";
import NavItem from "../navItem/NavItem";
import "./Header.css";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";

export default function Header() {
  const [shrink, setShrink] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
        <ul className="nav-ul">
          <NavItem href="/">Inicio</NavItem>
          <NavItem href="/casos">Casos</NavItem>
          <NavItem href="/adoptar">Adoptar</NavItem>
          <NavItem href="/donar">Donar</NavItem>
          <NavItem href="/voluntarios">Voluntarios</NavItem>
        </ul>
      </nav>
      <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen}>
        <NavItem href="/">Inicio</NavItem>
        <NavItem href="/casos">Casos</NavItem>
        <NavItem href="/adoptar">Adoptar</NavItem>
        <NavItem href="/donar">Donar</NavItem>
        <NavItem href="/voluntarios">Voluntarios</NavItem>
      </HamburgerMenu>
    </header>
  );
}
