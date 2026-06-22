import React from "react";
import type { GatsbySSR } from "gatsby";
import { wrapPageElement as sharedWrapPageElement } from "./src/gatsby-shared";

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
      key="favicon-fallback"
      rel="icon"
      type="image/png"
      href="/img/icone-lp-mid.png"
    />,
    <link
      key="favicon-light"
      rel="icon"
      type="image/png"
      href="/img/icone_lp_light.png"
      media="(prefers-color-scheme: light)"
    />,
    <link
      key="favicon-dark"
      rel="icon"
      type="image/png"
      href="/img/icone_lp_dark.png"
      media="(prefers-color-scheme: dark)"
    />,
  ]);
};
