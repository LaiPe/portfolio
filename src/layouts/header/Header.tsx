import React, { useState } from "react";
import { Link } from "gatsby";
import useViewport from "../../hooks/useViewport";
import * as styles from "./Header.module.css";

interface HeaderProps {
  pathname?: string;
}

export default function Header({ pathname = "/" }: HeaderProps) {
  const { isDesktop } = useViewport();
  const [openedNav, setOpenedNav] = useState(false);

  const isHomepage = pathname === "/";
  const tinyLogo = !isHomepage || !isDesktop;
  const bigHeader = isHomepage && isDesktop;

  const toggleNav = () => setOpenedNav((v) => !v);
  const closeNav = () => setOpenedNav(false);

  const showNav = isDesktop || openedNav;

  return (
    <header
      className={bigHeader ? `${styles.header} ${styles.index}` : styles.header}
    >
      <Link to="/" onClick={closeNav}>
        {tinyLogo ? (
          <img className="logo petit" src="/img/logo_lp_raw.png" alt="Logo" />
        ) : (
          <img className="logo" src="/img/logo_lp.png" alt="Logo" />
        )}
      </Link>
      <nav className={openedNav ? `${styles.nav} ${styles.opened}` : styles.nav}>
        {!isDesktop && (
          <label htmlFor="activ-mini" onClick={toggleNav}>
            ☰
          </label>
        )}

        {showNav && (
          <ul>
            <li id="nav_projets">
              <Link to="/projets" onClick={closeNav}>
                Projets
              </Link>
            </li>
            <li id="nav_services">
              <Link to="/services" onClick={closeNav}>
                Services
              </Link>
            </li>
            <li id="nav_apropos">
              <Link to="/apropos" onClick={closeNav}>
                À propos
              </Link>
            </li>
            <li id="nav_contact">
              <Link to="/contact" onClick={closeNav}>
                Contact
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
