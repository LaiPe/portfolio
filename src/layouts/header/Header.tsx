import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { Menu, X, ChevronRight } from "lucide-react";
import useViewport from "../../hooks/useViewport";
import * as styles from "./Header.module.css";

interface HeaderProps {
  pathname?: string;
}

const NAV_ITEMS = [
  { id: "nav_projets", to: "/projets", label: "Projets" },
  { id: "nav_services", to: "/services", label: "Services" },
  { id: "nav_apropos", to: "/apropos", label: "À propos" },
  { id: "nav_contact", to: "/contact", label: "Contact" },
];

export default function Header({ pathname = "/" }: HeaderProps) {
  const { isDesktop } = useViewport();
  const [openedNav, setOpenedNav] = useState(false);

  const isHomepage = pathname === "/";
  const tinyLogo = !isHomepage || !isDesktop;
  const bigHeader = isHomepage && isDesktop;

  const toggleNav = () => setOpenedNav((v) => !v);
  const closeNav = () => setOpenedNav(false);

  // Verrouille le scroll du fond quand l'overlay mobile est ouvert.
  useEffect(() => {
    const lock = openedNav && !isDesktop;
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openedNav, isDesktop]);

  // Fermeture au clavier (Échap).
  useEffect(() => {
    if (!openedNav) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenedNav(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openedNav]);

  return (
    <header
      className={bigHeader ? `${styles.header} ${styles.index}` : styles.header}
    >
      <Link to="/" onClick={closeNav}>
        {tinyLogo ? (
          <img className="logo petit" src="/img/logo-lp-raw.png" alt="Logo" />
        ) : (
          <img className="logo" src="/img/logo-lp.png" alt="Logo" />
        )}
      </Link>
      <nav
        id="primary-nav"
        className={openedNav ? `${styles.nav} ${styles.opened}` : styles.nav}
      >
        {!isDesktop && (
          <button
            type="button"
            className={styles.toggle}
            onClick={toggleNav}
            aria-label={openedNav ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={openedNav}
            aria-controls="primary-nav"
          >
            <Menu className={styles.iconMenu} size={30} aria-hidden />
            <X className={styles.iconClose} size={30} aria-hidden />
          </button>
        )}

        <ul onClick={closeNav}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id} id={item.id}>
              <Link to={item.to} activeClassName="active" onClick={closeNav}>
                <span>{item.label}</span>
                <ChevronRight className={styles.navArrow} size={22} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
