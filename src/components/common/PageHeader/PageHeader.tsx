import React from "react";
import Container from "../Container/Container";
import * as styles from "./PageHeader.module.css";

interface PageHeaderProps {
  title: string;
  /** Pastille au-dessus du titre (ex. « Bientôt disponible »). */
  badge?: React.ReactNode;
  /** Phrase d'introduction sous le titre. */
  children: React.ReactNode;
}

/** Bandeau d'en-tête des pages de liste et de contact : titre centré + introduction. */
export default function PageHeader({ title, badge, children }: PageHeaderProps) {
  return (
    <section className={styles.pageHeader}>
      <Container>
        {badge && <span className={styles.badge}>{badge}</span>}
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{children}</p>
      </Container>
    </section>
  );
}
