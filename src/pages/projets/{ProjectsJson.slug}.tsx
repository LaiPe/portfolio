import React, { useMemo } from "react";
import { graphql, Link, type PageProps, type HeadProps } from "gatsby";

import ProjectDetail from "../../components/projects/ProjectDetail/ProjectDetail";
import Seo from "../../components/Seo";
import * as styles from "../../assets/css/pages/ProjectDetailPage.module.css";
import type { Project } from "../../types";

type NavProject = Pick<Project, "slug" | "title" | "category" | "priority">;

interface ProjectDetailData {
  projectsJson: Project;
  allProjectsJson: { nodes: NavProject[] };
}

/**
 * Page de détail d'un projet — générée par la File System Route API
 * (`{ProjectsJson.slug}.tsx`) : une page statique par node ProjectsJson.
 * La requête de page reçoit automatiquement la variable `$id`.
 */
export default function ProjectDetailPage({
  data,
}: PageProps<ProjectDetailData>) {
  const project = data.projectsJson;
  const allProjects = data.allProjectsJson.nodes;

  // Navigation inter-projets (même catégorie, triée par priorité)
  const navigation = useMemo(() => {
    const sameCategory = allProjects
      .filter((p) => p.category === project.category)
      .sort((a, b) => (a.priority || 99) - (b.priority || 99));

    const currentIndex = sameCategory.findIndex((p) => p.slug === project.slug);

    return {
      prev: currentIndex > 0 ? sameCategory[currentIndex - 1] : null,
      next:
        currentIndex < sameCategory.length - 1
          ? sameCategory[currentIndex + 1]
          : null,
    };
  }, [allProjects, project.category, project.slug]);

  return (
    <main className={styles.projectDetail}>
      <ProjectDetail project={project} />

      {/* Navigation inter-projets */}
      <nav className={styles.projectNav}>
        <div className={styles.navContainer}>
          {navigation.prev ? (
            <Link
              to={`/projets/${navigation.prev.slug}`}
              className={styles.navLink}
            >
              <span className={styles.navDirection}>← Précédent</span>
              <span className={styles.navTitle}>{navigation.prev.title}</span>
            </Link>
          ) : (
            <Link to="/projets" className={styles.navLink}>
              <span className={styles.navDirection}>← Retour</span>
              <span className={styles.navTitle}>Tous les projets</span>
            </Link>
          )}

          {navigation.next ? (
            <Link
              to={`/projets/${navigation.next.slug}`}
              className={`${styles.navLink} ${styles.navRight}`}
            >
              <span className={styles.navDirection}>Suivant →</span>
              <span className={styles.navTitle}>{navigation.next.title}</span>
            </Link>
          ) : (
            <Link
              to="/projets"
              className={`${styles.navLink} ${styles.navRight}`}
            >
              <span className={styles.navDirection}>Retour →</span>
              <span className={styles.navTitle}>Tous les projets</span>
            </Link>
          )}
        </div>
      </nav>
    </main>
  );
}

export const query = graphql`
  query ProjectDetail($id: String!) {
    projectsJson(id: { eq: $id }) {
      id
      title
      slug
      category
      categoryLabel
      shortDescription
      technologies
      highlights
      useCases
      skills
      client
      date
      duration
      problem
      results
      priority
      links {
        live
        github
        pdf
      }
      features {
        emoji
        text
      }
      challenges
      architecture {
        backend {
          framework
          language
          security
          orm
          databases
        }
        frontend {
          library
          bundler
          routing
          mapping
          styling
        }
        infrastructure {
          containerization
          webserver
          registry
          ci
        }
        externalAPIs
      }
      images {
        emoji
        hero {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
        gallery {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              width: 1200
            )
          }
        }
      }
      description {
        html
      }
    }
    allProjectsJson(sort: { priority: ASC }) {
      nodes {
        slug
        title
        category
        priority
      }
    }
  }
`;

export const Head = ({ data }: HeadProps<ProjectDetailData>) => {
  const project = data.projectsJson;
  return (
    <Seo
      title={`${project.title} | Léo Peyronnet - Développeur Full-Stack`}
      description={project.shortDescription}
    />
  );
};
