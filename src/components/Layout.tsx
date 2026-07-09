import React from "react";
import Header from "../layouts/header/Header";
import Footer from "../layouts/footer/Footer";

// Polices self-hostées (woff2 variables, font-display: swap). Preload des
// sous-ensembles latins critiques dans gatsby-ssr.tsx.
import "@fontsource-variable/jura/wght.css";
import "@fontsource-variable/montserrat/wght.css";
import "@fontsource-variable/montserrat/wght-italic.css";
import "../assets/css/theme.css";

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
