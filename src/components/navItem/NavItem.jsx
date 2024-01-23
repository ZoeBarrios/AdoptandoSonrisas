import { Link, useLocation } from "wouter";

export default function NavItem({ children, href }) {
  const [location] = useLocation();

  return (
    <li className={`${location == href ? "text-white" : "text-black"}`}>
      <Link to={href}>{children}</Link>
    </li>
  );
}
