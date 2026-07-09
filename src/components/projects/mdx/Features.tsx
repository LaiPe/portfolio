import React from "react";
import Icon from "../../common/Icon/Icon";
import * as styles from "./blocks.module.css";

/**
 * Grille de cartes fonctionnalités à icône. Données inline dans le corps MDX.
 * Contrat unique — abandonne les anciennes variantes `string` / `{title, description}`.
 *
 * ```mdx
 * <Features title="Fonctionnalités">
 *   <Feature icon="map-pin">Recherche géolocalisée avec carte interactive</Feature>
 * </Features>
 * ```
 */
export function Features({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      <div className={styles.featuresGrid}>{children}</div>
    </section>
  );
}

export function Feature({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.featureCard}>
      <h3 className={styles.featureTitle}>
        <Icon name={icon} size={20} className={styles.featureIcon} />
        {children}
      </h3>
    </div>
  );
}
