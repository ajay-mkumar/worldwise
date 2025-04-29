import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./NavBar.module.css";
import { useAuth } from "../contexts/FakeAuthContext";

function NavBar() {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={"/pricing"}>Pricing</NavLink>
        </li>
        <li>
          {!isAuthenticated ? (
            <NavLink to={"/login"} className={styles.ctaLink}>
              Login
            </NavLink>
          ): `welcome ${user.name}`}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
