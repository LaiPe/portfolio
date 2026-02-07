/**
 * Hook pour charger une description Markdown d'un projet.
 * Chargement synchrone via import.meta.glob (eager), compatible pré-rendu statique.
 *
 * @param {string} slug - Le slug du projet
 * @returns {{ description: string, loading: false, error: Error | null }}
 */

// Charger tous les fichiers .md de descriptions au build-time (synchrone)
const descriptionModules = import.meta.glob(
    "/src/data/projects/descriptions/*.md",
    { eager: true, query: "?raw", import: "default" }
);

export function useProjectDescription(slug) {
    if (!slug) {
        return { description: "", loading: false, error: null };
    }

    try {
        const key = `/src/data/projects/descriptions/${slug}.md`;
        const content = descriptionModules[key];

        return { description: content ?? "", loading: false, error: null };
    } catch (err) {
        console.error(
            `Erreur lors du chargement de la description pour ${slug}:`,
            err
        );
        return { description: "", loading: false, error: err };
    }
}
