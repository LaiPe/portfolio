import React, { useState, useMemo } from "react";
import { graphql, type PageProps, type HeadFC } from "gatsby";
import {
  Handshake,
  Package,
  Ruler,
  FlaskConical,
  Folder,
  type LucideIcon,
} from "lucide-react";

import ProjectCard from "../../components/projects/ProjectCard/ProjectCard";
import Seo from "../../components/Seo";
import * as styles from "../../assets/css/pages/ProjectsPage.module.css";
import type { Project } from "../../types";

/**
 * Configuration unique des catégories : pilote à la fois les boutons de filtre,
 * l'ordre du gradient de crédibilité et le rendu des sections (vue « Tous ».)
 * L'ordre du tableau = ordre d'affichage / CATEGORY_ORDER (1..n).
 */
type CardSize = "small" | "medium" | "large";

interface CategoryConfig {
  id: string;
  filterLabel: string;
  Icon: LucideIcon;
  sectionTitle: string;
  sectionDescription: string;
  cardSize: CardSize;
}

/** La disposition de grille (1/2/3 cartes par ligne) est dérivée de cardSize
 *  — voir .gridLarge/.gridMedium/.gridSmall dans ProjectsPage.module.css. */
const GRID_CLASS_BY_SIZE: Record<CardSize, string> = {
  large: "gridLarge",
  medium: "gridMedium",
  small: "gridSmall",
};

const CATEGORIES: CategoryConfig[] = [
  {
    id: "client",
    filterLabel: "Clients",
    Icon: Handshake,
    sectionTitle: "Missions & clients",
    sectionDescription: "Missions et réalisations livrées pour des clients réels",
    cardSize: "medium",
  },
  {
    id: "product",
    filterLabel: "Produits",
    Icon: Package,
    sectionTitle: "Produits",
    sectionDescription: "Produits conçus, développés et publiés en propre",
    cardSize: "large",
  },
  {
    id: "caseStudy",
    filterLabel: "Études de cas",
    Icon: Ruler,
    sectionTitle: "Études de cas",
    sectionDescription: "Projets aboutis illustrant une démarche technique complète",
    cardSize: "medium",
  },
  {
    id: "experiment",
    filterLabel: "Expérimentations",
    Icon: FlaskConical,
    sectionTitle: "Expérimentations techniques",
    sectionDescription: "Explorations, projets académiques et certifications",
    cardSize: "small",
  },
];

const CATEGORY_ORDER: Record<string, number> = Object.fromEntries(
  CATEGORIES.map((c, i) => [c.id, i + 1]),
);

interface ProjectsPageData {
  allMdx: { nodes: { frontmatter: Project }[] };
}

export default function ProjectsPage({ data }: PageProps<ProjectsPageData>) {
  const [activeCategory, setActiveCategory] = useState("all");
  const projects = useMemo(
    () => data.allMdx.nodes.map((n) => n.frontmatter),
    [data.allMdx.nodes],
  );
  const activeCategoryConfig = CATEGORIES.find((c) => c.id === activeCategory);

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];
    if (activeCategory !== "all") {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }
    filtered.sort((a, b) => {
      const categoryDiff =
        (CATEGORY_ORDER[a.category] || 99) - (CATEGORY_ORDER[b.category] || 99);
      if (categoryDiff !== 0) return categoryDiff;
      return (a.priority || 99) - (b.priority || 99);
    });
    return filtered;
  }, [projects, activeCategory]);

  const groupedProjects = useMemo<Record<string, Project[]>>(() => {
    if (activeCategory !== "all") {
      return { [activeCategory]: filteredProjects };
    }
    return filteredProjects.reduce<Record<string, Project[]>>((acc, project) => {
      const category = project.category || "other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(project);
      return acc;
    }, {});
  }, [filteredProjects, activeCategory]);

  const categoryCounts = useMemo<Record<string, number>>(() => {
    const counts: Record<string, number> = { all: projects.length };
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [projects]);

  return (
    <main className={styles.projects}>
      {/* Header Section */}
      <section className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Mes Réalisations</h1>
          <p className={styles.subtitle}>
            Des projets clients aux expérimentations techniques, découvrez mon
            parcours de développeur.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className={styles.filters}>
        <div className={styles.container}>
          <div className={styles.filterButtons}>
            {[
              { id: "all", filterLabel: "Tous", Icon: Folder },
              ...CATEGORIES,
            ].map((category) => (
              <button
                key={category.id}
                className={`${styles.filterButton} ${activeCategory === category.id ? styles.active : ""}`}
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={activeCategory === category.id}
              >
                <category.Icon className={styles.filterIcon} size={16} />
                <span className={styles.filterLabel}>{category.filterLabel}</span>
                <span className={styles.filterCount}>
                  {categoryCounts[category.id] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className={styles.content}>
        <div className={styles.container}>
          {activeCategory === "all" ? (
            CATEGORIES.map((category) => {
              const projectsInCategory = groupedProjects[category.id];
              if (!projectsInCategory?.length) return null;
              return (
                <div key={category.id} className={styles.categorySection}>
                  <h2 className={styles.categoryTitle}>
                    <category.Icon className={styles.categoryIcon} size={20} />
                    {category.sectionTitle}
                  </h2>
                  <p className={styles.categoryDescription}>
                    {category.sectionDescription}
                  </p>
                  <div
                    className={`${styles.grid} ${styles[GRID_CLASS_BY_SIZE[category.cardSize]]}`}
                  >
                    {projectsInCategory.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        size={category.cardSize}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div
              className={`${styles.grid} ${styles[GRID_CLASS_BY_SIZE[activeCategoryConfig?.cardSize ?? "medium"]]}`}
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  size={activeCategoryConfig?.cardSize ?? "medium"}
                />
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className={styles.empty}>
              <p>Aucun projet trouvé dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export const query = graphql`
  query ProjectsPage {
    allMdx(sort: { frontmatter: { priority: ASC } }) {
      nodes {
        frontmatter {
          ...ProjectCardData
        }
      }
    }
  }
`;

export const Head: HeadFC = () => (
  <Seo
    title="Mes Projets | Léo Peyronnet"
    description="Mes réalisations : missions & clients, produit, études de cas et expérimentations techniques."
  >
    <meta
      name="keywords"
      content="portfolio développeur, projets react, sites web, applications web"
    />
  </Seo>
);
