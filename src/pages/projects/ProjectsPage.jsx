import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";

import ProjectCard from "../../components/projects/ProjectCard/ProjectCard";
import Spinner from "../../components/spinner/Spinner";

import useCollection from "../../hooks/useCollection";
import styles from "./ProjectsPage.module.css";

// Configuration des catégories
const CATEGORIES = [
    { id: "all", label: "Tous", icon: "📁" },
    { id: "client", label: "Clients", icon: "🎵" },
    { id: "mockup", label: "Maquettes", icon: "🎨" },
    { id: "app", label: "Applications", icon: "💻" },
    { id: "experiment", label: "Expérimentations", icon: "🧪" }
];

// Ordre de priorité des catégories pour l'affichage "Tous"
const CATEGORY_ORDER = {
    client: 1,
    mockup: 2,
    app: 3,
    experiment: 4
};

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const { data: projects, loading, error } = useCollection("projects");

    // Filtrer et trier les projets
    const filteredProjects = useMemo(() => {
        let filtered = [...projects];

        // Filtrer par catégorie si ce n'est pas "all"
        if (activeCategory !== "all") {
            filtered = filtered.filter(p => p.category === activeCategory);
        }

        // Trier par ordre de catégorie puis par priorité
        filtered.sort((a, b) => {
            // D'abord par catégorie
            const categoryDiff = (CATEGORY_ORDER[a.category] || 99) - (CATEGORY_ORDER[b.category] || 99);
            if (categoryDiff !== 0) return categoryDiff;
            
            // Ensuite par priorité
            return (a.priority || 99) - (b.priority || 99);
        });

        return filtered;
    }, [projects, activeCategory]);

    // Grouper les projets par catégorie pour l'affichage
    const groupedProjects = useMemo(() => {
        if (activeCategory !== "all") {
            return { [activeCategory]: filteredProjects };
        }

        return filteredProjects.reduce((acc, project) => {
            const category = project.category || "other";
            if (!acc[category]) acc[category] = [];
            acc[category].push(project);
            return acc;
        }, {});
    }, [filteredProjects, activeCategory]);

    // Compter les projets par catégorie
    const categoryCounts = useMemo(() => {
        const counts = { all: projects.length };
        projects.forEach(p => {
            counts[p.category] = (counts[p.category] || 0) + 1;
        });
        return counts;
    }, [projects]);

    if (loading) {
        return (
            <main className={styles.projects}>
                <div className={styles.loading}>
                    <Spinner />
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className={styles.projects}>
                <div className={styles.error}>
                    <p>Une erreur est survenue lors du chargement des projets.</p>
                </div>
            </main>
        );
    }

    return (
        <>
            <Helmet>
                <title>Mes Projets | Léo Peyronnet</title>
                <meta 
                    name="description" 
                    content="Découvrez mes réalisations : projets clients, applications web React, sites vitrines et expérimentations techniques." 
                />
                <meta 
                    name="keywords" 
                    content="portfolio développeur, projets react, sites web, applications web" 
                />
                <meta property="og:title" content="Mes Projets | Léo Peyronnet" />
                <meta 
                    property="og:description" 
                    content="Découvrez mes réalisations : projets clients, applications web React, sites vitrines et expérimentations techniques." 
                />
            </Helmet>

            <main className={styles.projects}>
                {/* Header Section */}
                <section className={styles.header}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>Mes Réalisations</h1>
                        <p className={styles.subtitle}>
                            Des projets clients aux expérimentations techniques,
                            découvrez mon parcours de développeur.
                        </p>
                    </div>
                </section>

                {/* Filters Section */}
                <section className={styles.filters}>
                    <div className={styles.container}>
                        <div className={styles.filterButtons}>
                            {CATEGORIES.map(category => (
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
                            // Affichage groupé par catégorie
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
                                            {groupedProjects.mockup.map(project => (
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
                                            Applications interactives et dynamiques développées avec React
                                        </p>
                                        <div className={`${styles.grid} ${styles.gridMockup}`}>
                                            {groupedProjects.app.map(project => (
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
                                            {groupedProjects.experiment.map(project => (
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
                            // Affichage filtré (une seule catégorie)
                            <div className={`${styles.grid} ${styles[`grid${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`]}`}>
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
        </>
    );
}
