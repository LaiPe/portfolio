import React, { useState, useEffect, useCallback } from "react";
import { GatsbyImage, type IGatsbyImageData } from "gatsby-plugin-image";
import * as styles from "./GalleryModal.module.css";

interface GalleryModalProps {
  images: IGatsbyImageData[];
  initialIndex?: number;
  onClose: () => void;
  projectTitle: string;
}

/**
 * Modale de galerie avec navigation entre images (clavier + boutons).
 * Les images sont des `IGatsbyImageData` rendues via <GatsbyImage>.
 */
export default function GalleryModal({
  images,
  initialIndex = 0,
  onClose,
  projectTitle,
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
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
    },
    [images.length, onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const goToNext = () =>
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  const goToIndex = (index: number) => setCurrentIndex(index);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Fermer"
        >
          ✕
        </button>

        <div className={styles.mainContent}>
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={goToPrevious}
            aria-label="Image précédente"
          >
            ‹
          </button>

          <div className={styles.imageContainer}>
            <GatsbyImage
              image={images[currentIndex]}
              alt={`${projectTitle} - Image ${currentIndex + 1}`}
              className={styles.mainImage}
            />
            <div className={styles.imageCounter}>
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={goToNext}
            aria-label="Image suivante"
          >
            ›
          </button>
        </div>

        <div className={styles.carousel}>
          <div className={styles.carouselTrack}>
            {images.map((image, index) => (
              <button
                key={index}
                className={`${styles.thumbnail} ${index === currentIndex ? styles.active : ""}`}
                onClick={() => goToIndex(index)}
                aria-label={`Aller à l'image ${index + 1}`}
              >
                <GatsbyImage
                  image={image}
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
