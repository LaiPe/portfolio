import { Link } from "react-router-dom";
import Badge from "../../common/Badge/Badge";
import styles from "./ProjectCard.module.css";

const categoryVariants = {
    client: "client",
    mockup: "mockup",
    experiment: "experiment",
    app: "app"
};

export default function ProjectCard({ project, size = "medium" }) {
    const variant = categoryVariants[project.category] || "default";

    return (
        <Link to={`/projets/${project.slug}`} className={`${styles.projectCard} ${styles[size]}`}>
            <div className={styles.imageContainer}>
                <img 
                    src={project.images?.thumbnail || "/img/placeholder-project.webp"} 
                    alt={project.title}
                    className={styles.image}
                    loading="lazy"
                />
                <Badge variant={variant} className={styles.badge}>
                    {project.categoryLabel}
                </Badge>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.shortDescription}</p>
                <div className={styles.technologies}>
                    {project.technologies.slice(0, 4).map((tech, index) => (
                        <Badge key={index} variant="tech">{tech}</Badge>
                    ))}
                </div>
                <span className={styles.link}>Voir le projet →</span>
            </div>
        </Link>
    );
}
