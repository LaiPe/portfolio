import React from "react";
import * as styles from "./blocks.module.css";

/**
 * Grille de cartes fonctionnalités à emoji. Données inline dans le corps MDX.
 * Contrat unique — abandonne les anciennes variantes `string` / `{title, description}`.
 *
 * ```mdx
 * <Features title="Fonctionnalités">
 *   <Feature emoji="📍">Recherche géolocalisée avec carte interactive</Feature>
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
  emoji,
  children,
}: {
  emoji: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.featureCard}>
      <h3 className={styles.featureTitle}>
        <span className={styles.featureEmoji}>{emoji}</span>
        {children}
      </h3>
    </div>
  );
}
