import { Link } from "wouter";

export default function NavItem({ children, href }) {
  return (
    <li className="nav-item">
      <Link to={href}>{children}</Link>
    </li>
  );
}
