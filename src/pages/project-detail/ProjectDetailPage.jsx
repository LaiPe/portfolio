import { useParams, Link } from "react-router";
import { useMemo } from "react";

import ProjectDetail from "../../components/projects/ProjectDetail/ProjectDetail";
import Spinner from "../../components/spinner/Spinner";

import useCollection from "../../hooks/useCollection";
import styles from "./ProjectDetailPage.module.css";

/**
 * Page de détail d'un projet
 * Route: /projets/:slug
 * 
 * Charge le projet correspondant au slug et délègue l'affichage
 * au composant ProjectDetail
 */
export default function ProjectDetailPage() {
    const { slug } = useParams();
    const { data: projects, loading, error } = useCollection("projects");

    // Trouver le projet actuel
    const project = useMemo(() => {
        return projects.find(p => p.slug === slug);
    }, [projects, slug]);

    // Navigation inter-projets (même catégorie)
    const navigation = useMemo(() => {
        if (!project) return { prev: null, next: null };

        // Filtrer par même catégorie et trier par priorité
        const sameCategory = projects
            .filter(p => p.category === project.category)
            .sort((a, b) => (a.priority || 99) - (b.priority || 99));

        const currentIndex = sameCategory.findIndex(p => p.slug === slug);

        return {
            prev: currentIndex > 0 ? sameCategory[currentIndex - 1] : null,
            next: currentIndex < sameCategory.length - 1 ? sameCategory[currentIndex + 1] : null
        };
    }, [project, projects, slug]);

    // Affichage du spinner pendant le chargement
    if (loading) {
        return (
            <main className={styles.projectDetail}>
                <div className={styles.loading}>
                    <Spinner />
                </div>
            </main>
        );
    }

    // Affichage d'erreur si le projet n'existe pas
    if (error || !project) {
        return (
            <main className={styles.projectDetail}>
                <div className={styles.error}>
                    <h1>Projet introuvable</h1>
                    <p>Le projet que vous recherchez n'existe pas ou a été déplacé.</p>
                    <Link to="/projets" className={styles.backLink}>
                        ← Retour aux projets
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <>
            <title>{project.title} | Léo Peyronnet - Développeur Full-Stack</title>
            <meta name="description" content={project.shortDescription} />
            <meta property="og:title" content={`${project.title} | Léo Peyronnet`} />
            <meta property="og:description" content={project.shortDescription} />
            {project.images?.hero && (
                <meta property="og:image" content={project.images.hero} />
            )}

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
        </>
    );
}
