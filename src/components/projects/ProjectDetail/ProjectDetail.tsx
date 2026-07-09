import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Badge from "../../common/Badge/Badge";
import Button from "../../common/Button/Button";
import ProjectDetailContent from "./ProjectDetailContent";
import * as styles from "./ProjectDetail.module.css";
import type { Project } from "../../../types";

export interface CategoryConfig {
  defaultEmoji: string;
  extraBadge: string | null;
  buttonText: string;
  typeLabel: string;
  contextTitle: string;
  featuresTitle: string;
  resultsTitle: string;
  galleryTitle: string;
  ctaTitle?: string;
  ctaText?: string;
  ctaButton?: string;
  showCta: boolean;
}

/**
 * Composant unifié de détail de projet.
 * Adapte son affichage selon la catégorie (client, product, caseStudy, experiment).
 */
export default function ProjectDetail({ project }: { project: Project }) {
  const category = project.category;

  const config: Record<string, CategoryConfig> = {
    client: {
      defaultEmoji: "🎵",
      extraBadge: null,
      buttonText: "Voir le site",
      typeLabel: "Projet Client",
      contextTitle: "Contexte du projet",
      featuresTitle: "Réalisations clés",
      resultsTitle: "Résultats",
      galleryTitle: "Galerie",
      ctaTitle: "Projet similaire ?",
      ctaText: "Découvrez mes offres pour créer un projet similaire.",
      ctaButton: "Voir mes services",
      showCta: true,
    },
    product: {
      defaultEmoji: "📦",
      extraBadge: null,
      buttonText: "Découvrir Stonecast",
      typeLabel: "Produit",
      contextTitle: "À propos du produit",
      featuresTitle: "Fonctionnalités",
      resultsTitle: "Résultats",
      galleryTitle: "Aperçu",
      showCta: false,
    },
    experiment: {
      defaultEmoji: "🧪",
      extraBadge: null,
      buttonText: "Essayer",
      typeLabel: "Expérimentation",
      contextTitle: "À propos",
      featuresTitle: "Fonctionnalités",
      resultsTitle: "Résultats",
      galleryTitle: "Aperçu",
      showCta: false,
    },
    caseStudy: {
      defaultEmoji: "📐",
      extraBadge: null,
      buttonText: "Voir le projet",
      typeLabel: "Étude de cas",
      contextTitle: "Présentation",
      featuresTitle: "Fonctionnalités",
      resultsTitle: "Résultats",
      galleryTitle: "Captures d'écran",
      ctaTitle: "Un projet similaire ?",
      ctaText: "Découvrez mes offres de conception et développement.",
      ctaButton: "Voir mes services",
      showCta: true,
    },
  };

  const cfg = config[category] || config.caseStudy;
  const hero = project.images?.hero?.childImageSharp?.gatsbyImageData;
  // Projet à stack riche : tronque les badges du hero et titre la sidebar « Stack technique ».
  const hasFullStack = Boolean(project.architecture);

  return (
    <article>
      {/* Hero Section */}
      <header className={styles.hero}>
        {hero ? (
          <div className={styles.heroImageWrapper}>
            <GatsbyImage
              image={hero}
              alt={project.title}
              className={styles.heroImage}
            />
          </div>
        ) : (
          <div className={styles.heroEmoji}>
            <span>{project.images?.emoji || cfg.defaultEmoji}</span>
          </div>
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.heroHeader}>
            <Badge variant={category}>{project.categoryLabel}</Badge>
            {cfg.extraBadge && <Badge variant="tech">{cfg.extraBadge}</Badge>}
          </div>
          <h1 className={styles.heroTitle}>{project.title}</h1>
          <p className={styles.heroDescription}>{project.shortDescription}</p>
          <div className={styles.heroTechnologies}>
            {(hasFullStack
              ? project.technologies.slice(0, 6)
              : project.technologies
            ).map((tech, index) => (
              <Badge key={index} variant="tech">
                {tech}
              </Badge>
            ))}
            {hasFullStack && project.technologies.length > 6 && (
              <Badge variant="tech">+{project.technologies.length - 6}</Badge>
            )}
          </div>
          <div className={styles.heroLinks}>
            {project.links?.live && (
              <Button href={project.links.live} target="_blank" variant="primary">
                🔗 {cfg.buttonText}
              </Button>
            )}
            {project.links?.demo && (
              <Button
                href={project.links.demo}
                target="_blank"
                variant="primary"
              >
                ▶️ Voir la démo
              </Button>
            )}
            {project.links?.github && (
              <Button
                href={project.links.github}
                target="_blank"
                variant="primary"
              >
                💻 Code source
              </Button>
            )}
            {project.links?.pdf && (
              <Button href={project.links.pdf} target="_blank" variant="primary">
                📄 Documentation
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Layout principal */}
      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>Informations</h3>
            <div className={styles.sidebarInfo}>
              {category === "client" && project.client && (
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>👤</span>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>Client</span>
                    <span className={styles.infoValue}>{project.client}</span>
                  </div>
                </div>
              )}
              {category !== "client" && (
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>🏷️</span>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>Type</span>
                    <span className={styles.infoValue}>{cfg.typeLabel}</span>
                  </div>
                </div>
              )}
              {category === "experiment" && project.client && (
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>🎓</span>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>Contexte</span>
                    <span className={styles.infoValue}>{project.client}</span>
                  </div>
                </div>
              )}
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📅</span>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Date</span>
                  <span className={styles.infoValue}>{project.date}</span>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>⏱️</span>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Durée</span>
                  <span className={styles.infoValue}>{project.duration}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>
              {hasFullStack ? "Stack technique" : "Technologies"}
            </h3>
            <div className={styles.sidebarTechnologies}>
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="tech">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {(project.links?.live ||
            project.links?.demo ||
            project.links?.github ||
            project.links?.pdf) && (
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Liens</h3>
              <div className={styles.sidebarLinks}>
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.sidebarLink}
                  >
                    🔗{" "}
                    {category === "client"
                      ? "Site en ligne"
                      : category === "product"
                        ? "Site officiel"
                        : category === "caseStudy"
                          ? "Projet en ligne"
                          : "Voir en ligne"}
                  </a>
                )}
                {project.links?.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.sidebarLink}
                  >
                    ▶️ Démo technique
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.sidebarLink}
                  >
                    💻 Code GitHub
                  </a>
                )}
                {project.links?.pdf && (
                  <a
                    href={project.links.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.sidebarLink}
                  >
                    📄 Documentation PDF
                  </a>
                )}
              </div>
            </div>
          )}

          {cfg.showCta && (
            <div className={styles.sidebarCta}>
              <h3 className={styles.sidebarCtaTitle}>{cfg.ctaTitle}</h3>
              <p className={styles.sidebarCtaText}>{cfg.ctaText}</p>
              <Link to="/services" className={styles.sidebarCtaButton}>
                {cfg.ctaButton}
              </Link>
            </div>
          )}
        </aside>

        <ProjectDetailContent project={project} config={config} />
      </div>
    </article>
  );
}
