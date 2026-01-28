import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import useViewport from "../../hooks/useViewport";
import styles from './Header.module.css';

export default function Header() {
    const { isMobile } = useViewport();
    const { pathname } = useLocation();
    const [openedNav, setOpenedNav] = useState(false);

    const isHomepage = pathname === "/";
    const tinyLogo = !isHomepage || isMobile;
    const bigHeader = isHomepage && !isMobile;

    const toggleNav = () => {
        setOpenedNav(!openedNav);
    }

    const showNav = !isMobile || openedNav

    return (
        <header className={ bigHeader ? `${styles.header} ${styles.index}` : styles.header}>
            <NavLink to="/">
                { tinyLogo ? (
                    <img className="logo petit" src="./img/logo_lp_raw.png" alt="Logo" />
                ) : (
                    <img className="logo" src="./img/logo_lp.png" alt="Logo" />
                )}
            </NavLink>
            <nav className={ openedNav ? `${styles.nav} ${styles.opened}` : styles.nav }>
                { isMobile && (
                    <label htmlFor="activ-mini" onClick={toggleNav}>☰</label>
                 )}
                
                { showNav && (
                    <ul>
                        <li id="nav_projets">
                            <NavLink to="/projets">Projets</NavLink>
                        </li>
                        <li id="nav_apropos">
                            <NavLink to="/apropos">À propos</NavLink>
                        </li>
                        <li id="nav_contact">
                            <a href="#" className="ancre-contact">Contact</a>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
}