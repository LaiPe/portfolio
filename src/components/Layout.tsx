import React from "react";
import Header from "../layouts/header/Header";
import Footer from "../layouts/footer/Footer";

import "../assets/css/theme.css";
import "../assets/css/fonts.css";

interface LayoutProps {
  children: React.ReactNode;
  location?: { pathname: string };
}

/**
 * Layout global appliqué via `wrapPageElement` (voir src/gatsby-shared.tsx).
 * Remplace l'ancien `App` de app/root.jsx (React Router).
 */
export default function Layout({ children, location }: LayoutProps) {
  return (
    <>
      <Header pathname={location?.pathname} />
      {children}
      <Footer />
    </>
  );
}
