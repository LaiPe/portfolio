import { useState, useEffect, useCallback } from "react";
import styles from "./GalleryModal.module.css";

/**
 * Modale de galerie avec navigation entre images
 * Affiche l'image en grand format avec un carrousel en bas
 */
export default function GalleryModal({ images, initialIndex = 0, onClose, projectTitle }) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    // Navigation clavier
    const handleKeyDown = useCallback((e) => {
        switch (e.key) {
            case "Escape":
                onClose();
                break;
            case "ArrowLeft":
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                break;
            case "ArrowRight":
                setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                break;
            default:
                break;
        }
    }, [images.length, onClose]);

    // Ajouter/retirer le listener clavier
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        // Empêcher le scroll du body
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [handleKeyDown]);

    // Navigation
    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    const goToIndex = (index) => {
        setCurrentIndex(index);
    };

    // Fermer en cliquant sur l'overlay
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
                {/* Bouton fermer */}
                <button className={styles.closeButton} onClick={onClose} aria-label="Fermer">
                    ✕
                </button>

                {/* Zone principale avec image et navigation */}
                <div className={styles.mainContent}>
                    {/* Bouton précédent */}
                    <button 
                        className={`${styles.navButton} ${styles.prevButton}`} 
                        onClick={goToPrevious}
                        aria-label="Image précédente"
                    >
                        ‹
                    </button>

                    {/* Image principale */}
                    <div className={styles.imageContainer}>
                        <img
                            src={images[currentIndex]}
                            alt={`${projectTitle} - Image ${currentIndex + 1}`}
                            className={styles.mainImage}
                        />
                        <div className={styles.imageCounter}>
                            {currentIndex + 1} / {images.length}
                        </div>
                    </div>

                    {/* Bouton suivant */}
                    <button 
                        className={`${styles.navButton} ${styles.nextButton}`} 
                        onClick={goToNext}
                        aria-label="Image suivante"
                    >
                        ›
                    </button>
                </div>

                {/* Carrousel de miniatures */}
                <div className={styles.carousel}>
                    <div className={styles.carouselTrack}>
                        {images.map((image, index) => (
                            <button
                                key={index}
                                className={`${styles.thumbnail} ${index === currentIndex ? styles.active : ""}`}
                                onClick={() => goToIndex(index)}
                                aria-label={`Aller à l'image ${index + 1}`}
                            >
                                <img
                                    src={image}
                                    alt={`${projectTitle} - Miniature ${index + 1}`}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
