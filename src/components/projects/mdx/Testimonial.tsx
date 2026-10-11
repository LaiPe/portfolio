import React from "react";
import testimonialsData from "../../../data/testimonials.json";
import TestimonialCard from "../../common/TestimonialCard/TestimonialCard";
import { useProject } from "./ProjectContext";
import type { Testimonial as TestimonialType } from "../../../types";
import * as styles from "./blocks.module.css";

/**
 * Témoignage lié au projet courant (jointure par `id` sur testimonials.json).
 * Ne rend rien si aucun témoignage n'existe pour ce projet.
 *
 * ```mdx
 * <Testimonial title="Témoignage client" />
 * ```
 */
export default function Testimonial({ title }: { title?: string }) {
  const project = useProject();
  const { testimonials } = testimonialsData as {
    testimonials: TestimonialType[];
  };

  const testimonial = testimonials.find((t) => t.projectId === project.id);
  if (!testimonial?.text) return null;

  return (
    <section className={styles.section}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      <TestimonialCard testimonial={testimonial} />
    </section>
  );
}
