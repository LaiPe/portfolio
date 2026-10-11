import React from "react";
import type { Testimonial } from "../../../types";
import * as styles from "./TestimonialCard.module.css";

/**
 * Témoignage client : la citation, puis la photo de profil adossée au nom et au rôle.
 * Seul composant de témoignage du site (accueil et pages projet).
 */
export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className={styles.card}>
      <blockquote className={styles.quote}>
        <p>{testimonial.text}</p>
      </blockquote>
      <figcaption className={styles.author}>
        {testimonial.photo && (
          <img
            src={testimonial.photo}
            alt=""
            width={48}
            height={48}
            loading="lazy"
            className={styles.photo}
          />
        )}
        {/* Des <span> et non des <p> : dans une page projet, le corps MDX espace deux
            paragraphes qui se suivent (`.body p + p`), ce qui écartait le rôle du nom. */}
        <div>
          <span className={styles.name}>{testimonial.author}</span>
          {testimonial.role && <span className={styles.role}>{testimonial.role}</span>}
        </div>
      </figcaption>
    </figure>
  );
}
