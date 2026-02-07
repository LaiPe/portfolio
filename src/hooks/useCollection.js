/**
 * Hook personnalisé pour charger tous les fichiers JSON d'un répertoire de collection.
 * Chargement synchrone via import.meta.glob (eager: true), compatible pré-rendu statique.
 *
 * @param {string} collectionName - Nom du répertoire de la collection (ex: "projects", "services")
 * @returns {Object} - { data: Array, loading: false, error: Error|null }
 *
 * @example
 * const { data: projects, error } = useCollection("projects");
 * const { data: services } = useCollection("services");
 */

// Tous les JSON sont résolus au build (eager: true = synchrone)
const modules = import.meta.glob('/src/data/**/*.json', { eager: true });

function loadCollection(collectionName) {
    const collectionPath = `/src/data/${collectionName}/`;
    const items = [];

    for (const [filePath, mod] of Object.entries(modules)) {
        if (filePath.startsWith(collectionPath)) {
            items.push(mod.default || mod);
        }
    }

    items.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
    items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    items.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));

    return items;
}

export default function useCollection(collectionName) {
    try {
        const data = loadCollection(collectionName);
        return { data, loading: false, error: null };
    } catch (err) {
        console.error(`Erreur lors du chargement de la collection "${collectionName}":`, err);
        return { data: [], loading: false, error: err };
    }
}
