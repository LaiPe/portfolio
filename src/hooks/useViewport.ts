import { useState, useEffect } from "react";

interface Breakpoints {
  mobile: number;
  tablet: number;
}

const DEFAULT_BREAKPOINTS: Breakpoints = { mobile: 768, tablet: 1024 };

/**
 * Renvoie la taille de la fenêtre et des drapeaux mobile/tablet/desktop.
 * SSR-safe : on initialise TOUJOURS à 0 (identique serveur ↔ premier rendu
 * client, donc pas de mismatch d'hydratation), puis on mesure au montage.
 */
export default function useViewport(breakpoints: Breakpoints = DEFAULT_BREAKPOINTS) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = size.width <= breakpoints.mobile;
  const isTablet =
    size.width > breakpoints.mobile && size.width <= breakpoints.tablet;
  const isDesktop = size.width > breakpoints.tablet;
  const format = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";

  return { ...size, isMobile, isTablet, isDesktop, format };
}
