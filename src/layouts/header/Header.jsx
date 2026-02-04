import { NavLink, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import useViewport from "../../hooks/useViewport";
import styles from './Header.module.css';

export default function Header() {
    const { isDesktop } = useViewport();
    const { pathname } = useLocation();
    const [openedNav, setOpenedNav] = useState(false);

    const isHomepage = pathname === "/";
    const tinyLogo = !isHomepage || !isDesktop;
    const bigHeader = isHomepage && isDesktop;

    const toggleNav = () => {
        setOpenedNav(!openedNav);
    }
    const closeNav = () => {
        setOpenedNav(false);
    }

    const showNav = isDesktop || openedNav

    return (
        <header className={ bigHeader ? `${styles.header} ${styles.index}` : styles.header}>
            <Link to="/" onClick={closeNav}>
                { tinyLogo ? (
                    <img className="logo petit" src="/img/logo_lp_raw.png" alt="Logo" />
                ) : (
                    <img className="logo" src="/img/logo_lp.png" alt="Logo" />
                )}
            </Link>
            <nav className={ openedNav ? `${styles.nav} ${styles.opened}` : styles.nav }>
                { !isDesktop && (
                    <label htmlFor="activ-mini" onClick={toggleNav}>☰</label>
                 )}
                
                { showNav && (
                    <ul>
                        <li id="nav_projets">
                            <NavLink to="/projets" onClick={closeNav}>Projets</NavLink>
                        </li>
                        <li id="nav_services">
                            <NavLink to="/services" onClick={closeNav}>Services</NavLink>
                        </li>
                        <li id="nav_apropos">
                            <NavLink to="/apropos" onClick={closeNav}>À propos</NavLink>
                        </li>
                        <li id="nav_contact">
                            <NavLink to="/contact" onClick={closeNav}>Contact</NavLink>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
}