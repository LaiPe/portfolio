import React from "react";
import { Link, type HeadFC } from "gatsby";

import Button from "../components/common/Button/Button";
import Seo from "../components/Seo";
import * as styles from "../assets/css/pages/NotFoundPage.module.css";

/** Liens de récupération vers les pages principales. */
const HELPFUL_LINKS = [
  { to: "/projets", label: "Projets" },
  { to: "/services", label: "Services" },
  { to: "/apropos", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

export default function NotFoundPage() {
  return (
    <main className={styles.notFound}>
      {/* Chiffre décoratif ; le vrai titre de page est le <h1> ci-dessous. */}
      <p className={styles.code} aria-hidden="true">
        404
      </p>
      <h1 className={styles.title}>Page introuvable</h1>
      <p className={styles.message}>
        La page que vous cherchez n'existe pas ou a été déplacée. Vérifiez
        l'adresse, ou repartez de l'accueil.
      </p>

      <div className={styles.actions}>
        <Button to="/" variant="primary">
          Retour à l'accueil
        </Button>
        <Button to="/contact" variant="outline">
          Me contacter
        </Button>
      </div>

      <nav className={styles.links} aria-label="Pages principales">
        {HELPFUL_LINKS.map((link) => (
          <Link key={link.to} to={link.to} className={styles.link}>
            {link.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}

export const Head: HeadFC = () => (
  <Seo title="404 — Page introuvable | Léo Peyronnet">
    {/* Une page 404 ne doit pas être indexée. */}
    <meta name="robots" content="noindex" />
  </Seo>
);
