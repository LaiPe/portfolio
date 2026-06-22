import React from "react";

interface SeoProps {
  /** Titre complet de la page (rendu tel quel dans <title> et og:title). */
  title: string;
  description?: string;
  /** URL absolue ou relative d'une image Open Graph. */
  image?: string;
  children?: React.ReactNode;
}

/**
 * Composant SEO consommé par les exports `Head` des pages (Gatsby Head API).
 * NB : un composant Head ne peut pas utiliser de hooks (useStaticQuery, etc.) —
 * toutes les valeurs arrivent en props.
 */
export default function Seo({ title, description, image, children }: SeoProps) {
  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {children}
    </>
  );
}
