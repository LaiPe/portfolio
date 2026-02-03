import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import GalleryModal from "../GalleryModal/GalleryModal";
import { useProjectDescription } from "../../../hooks/useProjectDescription";
import testimonialsData from "../../../data/testimonials.json";
import styles from "./ProjectDetail.module.css";
import Spinner from "../../spinner/Spinner";

/**
 * Composant pour le contenu principal d'une page de détail de projet
 * Affiche les sections adaptées selon la catégorie du projet
 */
export default function ProjectDetailContent({ project, config }) {
    const category = project.category;
    const cfg = config[category] || config.mockup;

    // Chargement de la description Markdown
    const { description, loading: descriptionLoading } = useProjectDescription(
        project.slug
    );

    // Chargement des témoignages
    const { testimonials } = testimonialsData;
    console.log("Témoignages chargés :", testimonials);
    
    // Trouver le témoignage correspondant au projet
    const projectTestimonial = useMemo(() => {
        return testimonials.find(t => t.projectId === project.id);
    }, [testimonials, project.id]);

    // État pour la modale de galerie
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState({});

    const openGallery = (index) => {
        setGalleryIndex(index);
        setGalleryOpen(true);
    };

    const closeGallery = () => {
        setGalleryOpen(false);
    };

    const handleImageLoad = (index) => {
        setLoadedImages((prev) => ({ ...prev, [index]: true }));
    };

    return (
        <div className={styles.content}>
            {/* Description / Contexte */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{cfg.contextTitle}</h2>
                <div className={styles.sectionText}>
                    {descriptionLoading ? (
                        <Spinner />
                    ) : description ? (
                        <ReactMarkdown>{description}</ReactMarkdown>
                    ) : (
                        <p>{project.shortDescription}</p>
                    )}
                </div>
            </section>

            {/* Points forts */}
            {(category === "app" || category === "mockup") && project.highlights && project.highlights.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Points forts</h2>
                    <div className={styles.highlightsList}>
                        {project.highlights.map((highlight, index) => (
                            <div key={index} className={styles.highlightItem}>
                                {highlight}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Cas d'usage (mockup only) */}
            {category === "mockup" && project.useCases && project.useCases.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Idéal pour</h2>
                    <div className={styles.useCasesList}>
                        {project.useCases.map((useCase, index) => (
                            <div key={index} className={styles.useCaseItem}>
                                {useCase}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Problématique / Objectif */}
            {project.problem && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        {category === "client" ? "Problématique" : 
                         category === "mockup" ? "Objectif de la maquette" : "Objectif"}
                    </h2>
                    <p className={styles.sectionText}>{project.problem}</p>
                </section>
            )}

            {/* Compétences développées (experiment only) */}
            {category === "experiment" && project.skills && project.skills.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Compétences développées</h2>
                    <div className={styles.skillsList}>
                        {project.skills.map((skill, index) => (
                            <div key={index} className={styles.skillItem}>
                                {skill}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Architecture technique (app only) */}
            {category === "app" && project.architecture && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Architecture technique</h2>
                    <div className={styles.architectureGrid}>
                        {project.architecture.backend && (
                            <div className={styles.architectureCard}>
                                <h3 className={styles.architectureTitle}>Backend</h3>
                                <ul className={styles.architectureList}>
                                    {project.architecture.backend.framework && (
                                        <li>Framework: {project.architecture.backend.framework}</li>
                                    )}
                                    {project.architecture.backend.language && (
                                        <li>Langage: {project.architecture.backend.language}</li>
                                    )}
                                    {project.architecture.backend.security && (
                                        <li>Sécurité: {project.architecture.backend.security}</li>
                                    )}
                                    {project.architecture.backend.orm && (
                                        <li>ORM: {project.architecture.backend.orm}</li>
                                    )}
                                    {project.architecture.backend.databases?.map((db, i) => (
                                        <li key={i}>{db}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {project.architecture.frontend && (
                            <div className={styles.architectureCard}>
                                <h3 className={styles.architectureTitle}>Frontend</h3>
                                <ul className={styles.architectureList}>
                                    {project.architecture.frontend.library && (
                                        <li>Library: {project.architecture.frontend.library}</li>
                                    )}
                                    {project.architecture.frontend.bundler && (
                                        <li>Bundler: {project.architecture.frontend.bundler}</li>
                                    )}
                                    {project.architecture.frontend.routing && (
                                        <li>Routing: {project.architecture.frontend.routing}</li>
                                    )}
                                    {project.architecture.frontend.mapping && (
                                        <li>Mapping: {project.architecture.frontend.mapping}</li>
                                    )}
                                    {project.architecture.frontend.styling && (
                                        <li>Styling: {project.architecture.frontend.styling}</li>
                                    )}
                                </ul>
                            </div>
                        )}
                        {project.architecture.infrastructure && (
                            <div className={styles.architectureCard}>
                                <h3 className={styles.architectureTitle}>Infrastructure</h3>
                                <ul className={styles.architectureList}>
                                    {project.architecture.infrastructure.containerization && (
                                        <li>{project.architecture.infrastructure.containerization}</li>
                                    )}
                                    {project.architecture.infrastructure.webserver && (
                                        <li>Serveur: {project.architecture.infrastructure.webserver}</li>
                                    )}
                                    {project.architecture.infrastructure.registry && (
                                        <li>Registry: {project.architecture.infrastructure.registry}</li>
                                    )}
                                    {project.architecture.infrastructure.ci && (
                                        <li>CI: {project.architecture.infrastructure.ci}</li>
                                    )}
                                </ul>
                            </div>
                        )}
                        {project.architecture.externalAPIs && project.architecture.externalAPIs.length > 0 && (
                            <div className={styles.architectureCard}>
                                <h3 className={styles.architectureTitle}>APIs Externes</h3>
                                <ul className={styles.architectureList}>
                                    {project.architecture.externalAPIs.map((api, index) => (
                                        <li key={index}>{api}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Fonctionnalités */}
            {project.features && project.features.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{cfg.featuresTitle}</h2>
                    <div className={styles.featuresGrid}>
                        {project.features.map((feature, index) => (
                            <div key={index} className={styles.featureCard}>
                                {typeof feature === 'string' ? (
                                    <h3 className={styles.featureTitle}>{feature}</h3>
                                ) : feature.emoji !== undefined ? (
                                    <h3 className={styles.featureTitle}>
                                        {feature.emoji && <span className={styles.featureEmoji}>{feature.emoji}</span>}
                                        {feature.text}
                                    </h3>
                                ) : (
                                    <>
                                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                                        {feature.description && (
                                            <p className={styles.featureDescription}>
                                                {feature.description}
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Défis techniques */}
            {project.challenges && project.challenges.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        {category === "experiment" ? "Défis rencontrés" : "Défis techniques"}
                    </h2>
                    <div className={styles.challengesList}>
                        {project.challenges.map((challenge, index) => (
                            <div key={index} className={styles.challengeItem}>
                                <h3 className={styles.challengeTitle}>
                                    {typeof challenge === 'string' ? challenge : challenge.title}
                                </h3>
                                {typeof challenge !== 'string' && challenge.solution && (
                                    <p className={styles.challengeSolution}>
                                        {challenge.solution}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Résultats */}
            {project.results && project.results.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{cfg.resultsTitle}</h2>
                    <div className={styles.resultsList}>
                        {project.results.map((result, index) => (
                            <div key={index} className={styles.resultItem}>
                                {result}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Témoignage client (client only) */}
            {category === "client" && projectTestimonial && projectTestimonial.text && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Témoignage client</h2>
                    <div className={styles.testimonial}>
                        <p className={styles.testimonialQuote}>
                            {projectTestimonial.text}
                        </p>
                        <div className={styles.testimonialAuthor}>
                            <span className={styles.testimonialAuthorName}>
                                {projectTestimonial.author}
                            </span>
                            {projectTestimonial.role && (
                                <span className={styles.testimonialAuthorRole}>
                                    — {projectTestimonial.role}
                                </span>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Galerie */}
            {project.images?.gallery && project.images.gallery.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{cfg.galleryTitle}</h2>
                    <div className={styles.gallery}>
                        {project.images.gallery.map((image, index) => (
                            <button
                                key={index}
                                className={styles.galleryButton}
                                onClick={() => openGallery(index)}
                                aria-label={`Voir l'image ${index + 1} en grand`}
                            >
                                {!loadedImages[index] && (
                                    <div className={styles.gallerySpinner}>
                                        <Spinner />
                                    </div>
                                )}
                                <img
                                    src={image}
                                    alt={`${project.title} - Screenshot ${index + 1}`}
                                    className={`${styles.galleryImage} ${loadedImages[index] ? styles.galleryImageLoaded : ''}`}
                                    loading="lazy"
                                    onLoad={() => handleImageLoad(index)}
                                />
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* Modale de galerie */}
            {galleryOpen && project.images?.gallery && (
                <GalleryModal
                    images={project.images.gallery}
                    initialIndex={galleryIndex}
                    onClose={closeGallery}
                    projectTitle={project.title}
                />
            )}
        </div>
    );
}
