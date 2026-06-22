import React, { useState, useMemo } from "react";
import { graphql, type PageProps, type HeadFC } from "gatsby";

import ProjectCard from "../../components/projects/ProjectCard/ProjectCard";
import Seo from "../../components/Seo";
import * as styles from "../../assets/css/pages/ProjectsPage.module.css";
import type { Project } from "../../types";

const CATEGORIES = [
  { id: "all", label: "Tous", icon: "📁" },
  { id: "client", label: "Clients", icon: "🎵" },
  { id: "mockup", label: "Maquettes", icon: "🎨" },
  { id: "app", label: "Applications", icon: "💻" },
  { id: "experiment", label: "Expérimentations", icon: "🧪" },
];

const CATEGORY_ORDER: Record<string, number> = {
  client: 1,
  mockup: 2,
  app: 3,
  experiment: 4,
};

interface ProjectsPageData {
  allProjectsJson: { nodes: Project[] };
}

export default function ProjectsPage({ data }: PageProps<ProjectsPageData>) {
  const [activeCategory, setActiveCategory] = useState("all");
  const projects = data.allProjectsJson.nodes;

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
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                className={`${styles.filterButton} ${activeCategory === category.id ? styles.active : ""}`}
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={activeCategory === category.id}
              >
                <span className={styles.filterIcon}>{category.icon}</span>
                <span className={styles.filterLabel}>{category.label}</span>
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
            <>
              {groupedProjects.client?.length > 0 && (
                <div className={styles.categorySection}>
                  <h2 className={styles.categoryTitle}>
                    <span className={styles.categoryIcon}>🎵</span>
                    Projets Clients
                  </h2>
                  <p className={styles.categoryDescription}>
                    Réalisations concrètes pour des clients réels
                  </p>
                  <div className={`${styles.grid} ${styles.gridClient}`}>
                    {groupedProjects.client.map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        size={index === 0 ? "large" : "medium"}
                      />
                    ))}
                  </div>
                </div>
              )}

              {groupedProjects.mockup?.length > 0 && (
                <div className={styles.categorySection}>
                  <h2 className={styles.categoryTitle}>
                    <span className={styles.categoryIcon}>🎨</span>
                    Maquettes & Études de Cas
                  </h2>
                  <p className={styles.categoryDescription}>
                    Démonstrations de compétences métier et cas d'usage
                  </p>
                  <div className={`${styles.grid} ${styles.gridMockup}`}>
                    {groupedProjects.mockup.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        size="medium"
                      />
                    ))}
                  </div>
                </div>
              )}

              {groupedProjects.app?.length > 0 && (
                <div className={styles.categorySection}>
                  <h2 className={styles.categoryTitle}>
                    <span className={styles.categoryIcon}>💻</span>
                    Applications Web
                  </h2>
                  <p className={styles.categoryDescription}>
                    Applications interactives et dynamiques développées avec
                    React
                  </p>
                  <div className={`${styles.grid} ${styles.gridMockup}`}>
                    {groupedProjects.app.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        size="medium"
                      />
                    ))}
                  </div>
                </div>
              )}

              {groupedProjects.experiment?.length > 0 && (
                <div className={styles.categorySection}>
                  <h2 className={styles.categoryTitle}>
                    <span className={styles.categoryIcon}>🧪</span>
                    Expérimentations Techniques
                  </h2>
                  <p className={styles.categoryDescription}>
                    Explorations, projets académiques et certifications
                  </p>
                  <div className={`${styles.grid} ${styles.gridExperiment}`}>
                    {groupedProjects.experiment.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        size="small"
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div
              className={`${styles.grid} ${styles[`grid${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`]}`}
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  size={
                    activeCategory === "client" && index === 0
                      ? "large"
                      : activeCategory === "experiment"
                        ? "small"
                        : "medium"
                  }
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
    allProjectsJson(sort: { priority: ASC }) {
      nodes {
        ...ProjectCardData
      }
    }
  }
`;

export const Head: HeadFC = () => (
  <Seo
    title="Mes Projets | Léo Peyronnet"
    description="Découvrez mes réalisations : projets clients, applications web React, sites vitrines et expérimentations techniques."
  >
    <meta
      name="keywords"
      content="portfolio développeur, projets react, sites web, applications web"
    />
  </Seo>
);
