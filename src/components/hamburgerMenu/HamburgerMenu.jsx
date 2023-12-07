import { useSpring, animated } from "@react-spring/web";
import "./HamburgerMenu.css";

export default function HamburgerMenu({ children, isOpen, setIsOpen }) {
  const [menuProps, setMenuProps] = useSpring(() => ({
    opacity: isOpen ? 1 : 0,
    display: isOpen ? "block" : "none",
  }));

  const handleOpen = () => {
    setIsOpen(!isOpen);
    setMenuProps.start({
      opacity: isOpen ? 1 : 0,
      display: isOpen ? "block" : "none",
    });
  };

  return (
    <>
      <div className="hamburger" onClick={handleOpen}>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </div>
      <animated.div className="hamburger-menu" style={menuProps}>
        <div className="hamburger-menu-content">{children}</div>
      </animated.div>
    </>
  );
}
