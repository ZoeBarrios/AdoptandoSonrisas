import { useEffect, useState } from "react";
import Logo from "../logo/Logo";
import "./Header.css";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import useModal from "../../hooks/useModal";
import Nav from "../nav/Nav";

export default function Header() {
  const [shrink, setShrink] = useState(false);
  const { showModal, closeModal, openModal } = useModal();

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
    <>
      <header className={`header ${shrink ? "shrink" : ""}`}>
        <div className="logo-container">
          <Logo />
        </div>
        <nav className="nav">
          <ul className="nav-ul text-sm md:text-small lg:text-base">
            <Nav />
          </ul>
        </nav>
        <HamburgerMenu
          isOpen={showModal}
          openModal={openModal}
          closeModal={closeModal}
        >
          <Nav />
        </HamburgerMenu>
      </header>

      <div className={`content-padding ${shrink ? "shrink" : ""}`} />
    </>
  );
}
