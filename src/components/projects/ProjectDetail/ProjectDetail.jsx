import { Link } from "react-router";
import Badge from "../../common/Badge/Badge";
import Button from "../../common/Button/Button";
import ProjectDetailContent from "./ProjectDetailContent";
import styles from "./ProjectDetail.module.css";

/**
 * Composant unifié de détail de projet
 * Adapte son affichage selon la catégorie du projet (client, mockup, experiment, app)
 */
export default function ProjectDetail({ project }) {
    const category = project.category;

    // Configuration par catégorie
    const config = {
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
            showCta: true
        },
        mockup: {
            defaultEmoji: "🎨",
            extraBadge: null,
            buttonText: "Voir la maquette",
            typeLabel: "Maquette / Étude de cas",
            contextTitle: "À propos du projet",
            featuresTitle: "Fonctionnalités",
            resultsTitle: "Livrables",
            galleryTitle: "Aperçu",
            ctaTitle: "Disponible en projet clé en main",
            ctaText: "Cette maquette peut être adaptée à votre entreprise.",
            ctaButton: "Découvrir mes offres",
            showCta: true
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
            showCta: false
        },
        app: {
            defaultEmoji: "💻",
            extraBadge: null,
            buttonText: "Voir l'application",
            typeLabel: "Application Web",
            contextTitle: "Présentation",
            featuresTitle: "Fonctionnalités",
            resultsTitle: "Résultats",
            galleryTitle: "Captures d'écran",
            ctaTitle: "Besoin d'une application ?",
            ctaText: "Découvrez mes offres de développement d'applications.",
            ctaButton: "Voir mes services",
            showCta: true
        }
    };

    const cfg = config[category] || config.mockup;

    return (
        <article>
            {/* Hero Section */}
            <header className={styles.hero}>
                {project.images?.hero ? (
                    <img
                        src={project.images.hero}
                        alt={project.title}
                        loading="lazy"
                        className={styles.heroImage}
                    />
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
                        {(category === "app" ? project.technologies.slice(0, 6) : project.technologies).map((tech, index) => (
                            <Badge key={index} variant="tech">{tech}</Badge>
                        ))}
                        {category === "app" && project.technologies.length > 6 && (
                            <Badge variant="tech">+{project.technologies.length - 6}</Badge>
                        )}
                    </div>
                    <div className={styles.heroLinks}>
                        {project.links?.live && (
                            <Button href={project.links.live} target="_blank" variant="primary">
                                🔗 {cfg.buttonText}
                            </Button>
                        )}
                        {project.links?.github && (
                            <Button href={project.links.github} target="_blank" variant="primary">
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
                            {category === "app" ? "Stack technique" : "Technologies"}
                        </h3>
                        <div className={styles.sidebarTechnologies}>
                            {project.technologies.map((tech, index) => (
                                <Badge key={index} variant="tech">{tech}</Badge>
                            ))}
                        </div>
                    </div>

                    {(project.links?.live || project.links?.github || project.links?.pdf) && (
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
                                        🔗 {category === "client" ? "Site en ligne" : category === "app" ? "Application en ligne" : "Maquette en ligne"}
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
