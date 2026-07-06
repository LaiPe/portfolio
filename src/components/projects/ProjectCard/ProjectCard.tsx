import React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Badge from "../../common/Badge/Badge";
import * as styles from "./ProjectCard.module.css";
import type { Project } from "../../../types";

const categoryVariants: Record<string, string> = {
  client: "client",
  mockup: "mockup",
  experiment: "experiment",
  app: "app",
};

interface ProjectCardProps {
  project: Project;
  size?: "small" | "medium" | "large";
}

export default function ProjectCard({
  project,
  size = "medium",
}: ProjectCardProps) {
  const variant = categoryVariants[project.category] || "default";
  const thumbnail = project.images?.thumbnail?.childImageSharp?.gatsbyImageData;

  return (
    <Link
      to={`/projets/${project.slug}`}
      className={`${styles.projectCard} ${styles[size]}`}
    >
      <div className={styles.imageContainer}>
        {thumbnail ? (
          <GatsbyImage
            image={thumbnail}
            alt={project.title}
            className={styles.image}
          />
        ) : (
          <div className={styles.emojiContainer}>
            <span className={styles.emoji}>
              {project.images?.emoji || "🚀"}
            </span>
          </div>
        )}
        <Badge variant={variant} className={styles.badge}>
          {project.categoryLabel}
        </Badge>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.shortDescription}</p>
        <div className={styles.technologies}>
          {project.technologies.slice(0, 4).map((tech, index) => (
            <Badge key={index} variant="tech">
              {tech}
            </Badge>
          ))}
        </div>
        <span className={styles.link}>Voir le projet →</span>
      </div>
    </Link>
  );
}

/**
 * Fragment réutilisable : champs nécessaires à l'affichage d'une carte projet.
 * Utilisable dans toute requête via `...ProjectCardData`.
 */
export const query = graphql`
  fragment ProjectCardData on ProjectsJson {
    id
    slug
    title
    category
    categoryLabel
    shortDescription
    technologies
    priority
    featured
    images {
      emoji
      thumbnail {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 1200)
        }
      }
    }
  }
`;
