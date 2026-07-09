import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { Menu, X, ChevronRight } from "lucide-react";
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

/**
 * Header entièrement rendu au build : le mode (homepage vs. défaut) est dérivé
 * de `pathname` (connu au SSR), et la bascule desktop/mobile est purement CSS
 * (media queries). Aucune mesure de viewport n'entre dans le rendu — l'API React
 * ne sert qu'à l'INTERACTION du menu mobile (ouverture/fermeture), en amélioration
 * progressive : le header s'affiche correctement même sans JS.
 */
export default function Header({ pathname = "/" }: HeaderProps) {
  const [openedNav, setOpenedNav] = useState(false);
  const isHomepage = pathname === "/";

  const closeNav = () => setOpenedNav(false);
  const toggleNav = () => setOpenedNav((v) => !v);

  // A2 — dès qu'on repasse en desktop, on ferme le menu (et donc on relâche le
  // verrou de scroll), pour ne pas rester bloqué si on redimensionne menu ouvert.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");
    const handle = () => {
      if (mq.matches) setOpenedNav(false);
    };
    handle();
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  // Verrouille le scroll du fond quand l'overlay mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = openedNav ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openedNav]);

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
      className={isHomepage ? `${styles.header} ${styles.index}` : styles.header}
    >
      <Link to="/" onClick={closeNav}>
        {isHomepage ? (
          <picture>
            <source media="(min-width: 1025px)" srcSet="/img/logo-lp.png" />
            <img
              className={styles.homeLogo}
              src="/img/logo-lp-raw.png"
              alt="Logo Léo Peyronnet"
            />
          </picture>
        ) : (
          <img
            className="logo petit"
            src="/img/logo-lp-raw.png"
            alt="Logo Léo Peyronnet"
          />
        )}
      </Link>
      <nav
        id="primary-nav"
        className={openedNav ? `${styles.nav} ${styles.opened}` : styles.nav}
      >
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
