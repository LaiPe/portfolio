import { useState, useEffect } from "react";

/**
 * Hook pour charger une description Markdown d'un projet
 * @param {string} slug - Le slug du projet
 * @returns {{ description: string, loading: boolean, error: Error | null }}
 */
export function useProjectDescription(slug) {
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) {
            setLoading(false);
            return;
        }

        const loadDescription = async () => {
            try {
                setLoading(true);
                setError(null);

                // Import dynamique du fichier Markdown
                const response = await import(
                    `../data/projects/descriptions/${slug}.md?raw`
                );
                setDescription(response.default);
            } catch (err) {
                console.error(
                    `Erreur lors du chargement de la description pour ${slug}:`,
                    err
                );
                setError(err);
                setDescription("");
            } finally {
                setLoading(false);
            }
        };

        loadDescription();
    }, [slug]);

    return { description, loading, error };
}
