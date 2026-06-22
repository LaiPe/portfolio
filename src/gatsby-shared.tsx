import React from "react";
import type { WrapPageElementBrowserArgs } from "gatsby";
import Layout from "./components/Layout";

/**
 * Enveloppe partagée entre gatsby-ssr et gatsby-browser : applique le Layout
 * (Header/Footer + CSS globaux) à chaque page tout en préservant l'arbre React
 * entre les navigations (le Layout n'est pas démonté).
 */
export const wrapPageElement = ({
  element,
  props,
}: WrapPageElementBrowserArgs) => {
  return <Layout location={props.location}>{element}</Layout>;
};
