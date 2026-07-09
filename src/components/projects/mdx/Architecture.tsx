import React from "react";
import { useProject } from "./ProjectContext";
import * as styles from "./blocks.module.css";

/**
 * Grille d'architecture technique (backend / frontend / infra / APIs externes).
 * L'exception assumée du contrat : donnée trop imbriquée pour du JSX agréable,
 * elle vit dans le frontmatter (`architecture`) et ce composant la lit via contexte.
 *
 * ```mdx
 * <Architecture title="Architecture technique" />
 * ```
 */
export default function Architecture({ title }: { title?: string }) {
  const { architecture } = useProject();
  if (!architecture) return null;

  const { backend, frontend, infrastructure, externalAPIs } = architecture;

  return (
    <section className={styles.section}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      <div className={styles.architectureGrid}>
        {backend && (
          <div className={styles.architectureCard}>
            <h3 className={styles.architectureTitle}>Backend</h3>
            <ul className={styles.architectureList}>
              {backend.framework && <li>Framework&nbsp;: {backend.framework}</li>}
              {backend.language && <li>Langage&nbsp;: {backend.language}</li>}
              {backend.security && <li>Sécurité&nbsp;: {backend.security}</li>}
              {backend.orm && <li>ORM&nbsp;: {backend.orm}</li>}
              {backend.databases?.map((db, i) => <li key={i}>{db}</li>)}
            </ul>
          </div>
        )}
        {frontend && (
          <div className={styles.architectureCard}>
            <h3 className={styles.architectureTitle}>Frontend</h3>
            <ul className={styles.architectureList}>
              {frontend.library && <li>Library&nbsp;: {frontend.library}</li>}
              {frontend.bundler && <li>Bundler&nbsp;: {frontend.bundler}</li>}
              {frontend.routing && <li>Routing&nbsp;: {frontend.routing}</li>}
              {frontend.mapping && <li>Mapping&nbsp;: {frontend.mapping}</li>}
              {frontend.styling && <li>Styling&nbsp;: {frontend.styling}</li>}
            </ul>
          </div>
        )}
        {infrastructure && (
          <div className={styles.architectureCard}>
            <h3 className={styles.architectureTitle}>Infrastructure</h3>
            <ul className={styles.architectureList}>
              {infrastructure.containerization && (
                <li>{infrastructure.containerization}</li>
              )}
              {infrastructure.webserver && (
                <li>Serveur&nbsp;: {infrastructure.webserver}</li>
              )}
              {infrastructure.registry && (
                <li>Registry&nbsp;: {infrastructure.registry}</li>
              )}
              {infrastructure.ci && <li>CI&nbsp;: {infrastructure.ci}</li>}
            </ul>
          </div>
        )}
        {externalAPIs && externalAPIs.length > 0 && (
          <div className={styles.architectureCard}>
            <h3 className={styles.architectureTitle}>APIs Externes</h3>
            <ul className={styles.architectureList}>
              {externalAPIs.map((api, i) => (
                <li key={i}>{api}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
