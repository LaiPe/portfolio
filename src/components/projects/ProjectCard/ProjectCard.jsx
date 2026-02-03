import { Link } from "react-router-dom";
import { useState } from "react";
import Badge from "../../common/Badge/Badge";
import Spinner from "../../spinner/Spinner";
import styles from "./ProjectCard.module.css";

const categoryVariants = {
    client: "client",
    mockup: "mockup",
    experiment: "experiment",
    app: "app"
};

export default function ProjectCard({ project, size = "medium" }) {
    const variant = categoryVariants[project.category] || "default";
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <Link to={`/projets/${project.slug}`} className={`${styles.projectCard} ${styles[size]}`}>
            <div className={styles.imageContainer}>
                {project.images?.thumbnail ? (
                    <>
                        {!imageLoaded && (
                            <div className={styles.imageSpinner}>
                                <Spinner />
                            </div>
                        )}
                        <img 
                            src={project.images.thumbnail} 
                            alt={project.title}
                            className={`${styles.image} ${imageLoaded ? styles.imageLoaded : ''}`}
                            loading="lazy"
                            onLoad={handleImageLoad}
                        />
                    </>
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
                        <Badge key={index} variant="tech">{tech}</Badge>
                    ))}
                </div>
                <span className={styles.link}>Voir le projet →</span>
            </div>
        </Link>
    );
}
