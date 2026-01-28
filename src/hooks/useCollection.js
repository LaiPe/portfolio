import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour charger dynamiquement tous les fichiers JSON d'un répertoire de collection
 * 
 * @param {string} collectionName - Nom du répertoire de la collection (ex: "projects", "services")
 * @returns {Object} - { data: Array, loading: boolean, error: Error|null }
 * 
 * @example
 * const { data: projects, loading, error } = useCollection("projects");
 * const { data: services } = useCollection("services");
 */
export default function useCollection(collectionName) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCollection = async () => {
            setLoading(true);
            setError(null);

            try {
                // Utilise import.meta.glob pour charger dynamiquement tous les JSON du répertoire
                // eager: true charge immédiatement tous les fichiers
                const modules = import.meta.glob('/src/data/**/*.json', { eager: true });
                
                // Filtrer les fichiers du répertoire demandé
                const collectionPath = `/src/data/${collectionName}/`;
                const collectionItems = [];

                for (const [path, module] of Object.entries(modules)) {
                    if (path.startsWith(collectionPath)) {
                        collectionItems.push(module.default || module);
                    }
                }

                collectionItems.sort((a, b) => a.id - b.id);
                collectionItems.sort((a, b) => a.order - b.order);
                collectionItems.sort((a, b) => a.priority - b.priority);
                setData(collectionItems);
            } catch (err) {
                console.error(`Erreur lors du chargement de la collection "${collectionName}":`, err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadCollection();
    }, [collectionName]);

    return { data, loading, error };
}
