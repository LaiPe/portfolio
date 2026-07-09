import React, { useMemo, useState } from "react";
import { GatsbyImage, type IGatsbyImageData } from "gatsby-plugin-image";
import GalleryModal from "../GalleryModal/GalleryModal";
import { useProject } from "./ProjectContext";
import * as styles from "../ProjectDetail/ProjectDetail.module.css";

/**
 * Galerie d'images (grille + modale). Lit `images.gallery` du projet courant
 * (Files résolus par Sharp) et réutilise la modale existante.
 *
 * ```mdx
 * <Gallery title="Galerie" />
 * ```
 */
export default function Gallery({ title }: { title?: string }) {
  const project = useProject();

  const images = useMemo<IGatsbyImageData[]>(
    () =>
      (project.images?.gallery ?? [])
        .map((node) => node?.childImageSharp?.gatsbyImageData)
        .filter((img): img is IGatsbyImageData => Boolean(img)),
    [project.images],
  );

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <section className={styles.section}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      <div className={styles.gallery}>
        {images.map((image, i) => (
          <button
            key={i}
            className={styles.galleryButton}
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            aria-label={`Voir l'image ${i + 1} en grand`}
          >
            <GatsbyImage
              image={image}
              alt={`${project.title} - Capture ${i + 1}`}
              className={styles.galleryImage}
            />
          </button>
        ))}
      </div>

      {open && (
        <GalleryModal
          images={images}
          initialIndex={index}
          onClose={() => setOpen(false)}
          projectTitle={project.title}
        />
      )}
    </section>
  );
}
