import React from "react";
import type { GatsbySSR } from "gatsby";
import { wrapPageElement as sharedWrapPageElement } from "./src/gatsby-shared";

// URL (hashée par webpack) du sous-ensemble latin des polices variables : on
// précharge ces 2 fichiers critiques pour réduire la fenêtre de swap. Même
// contenu = même hash que le `url()` des @font-face Fontsource → pas de double
// téléchargement.
import juraLatin from "@fontsource-variable/jura/files/jura-latin-wght-normal.woff2";
import montserratLatin from "@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2";

export const wrapPageElement: GatsbySSR["wrapPageElement"] =
  sharedWrapPageElement;

/**
 * Définit la langue du document et les favicons (avec variantes clair/sombre
 * via media queries) au rendu statique.
 */
export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHtmlAttributes,
  setHeadComponents,
}) => {
  setHtmlAttributes({ lang: "fr" });
  setHeadComponents([
    <link
      key="preload-jura"
      rel="preload"
      as="font"
      type="font/woff2"
      href={juraLatin}
      crossOrigin="anonymous"
    />,
    <link
      key="preload-montserrat"
      rel="preload"
      as="font"
      type="font/woff2"
      href={montserratLatin}
      crossOrigin="anonymous"
    />,
    <link
      key="favicon-fallback"
      rel="icon"
      type="image/png"
      href="/img/icone-lp-mid.png"
    />,
    <link
      key="favicon-light"
      rel="icon"
      type="image/png"
      href="/img/icone-lp-light.png"
      media="(prefers-color-scheme: light)"
    />,
    <link
      key="favicon-dark"
      rel="icon"
      type="image/png"
      href="/img/icone-lp-dark.png"
      media="(prefers-color-scheme: dark)"
    />,
  ]);
};
