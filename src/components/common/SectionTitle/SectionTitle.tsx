import React from "react";
import type { LucideIcon } from "lucide-react";
import * as styles from "./SectionTitle.module.css";

interface SectionTitleProps {
  /** Icône `lucide-react` affichée en bleu devant le titre. */
  icon?: LucideIcon;
  /** Phrase d'accroche sous le titre. */
  description?: string;
  children: React.ReactNode;
}

/** Titre de section du site : icône bleue + texte, aligné à gauche. */
export default function SectionTitle({ icon: Icon, description, children }: SectionTitleProps) {
  return (
    <div className={styles.sectionTitle}>
      <h2 className={styles.title}>
        {Icon && <Icon className={styles.icon} size={24} aria-hidden />}
        {children}
      </h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
