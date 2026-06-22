import React from "react";
import { type HeadFC } from "gatsby";

import Button from "../components/common/Button/Button";
import Seo from "../components/Seo";
import socialsData from "../data/socials.json";
import * as styles from "../assets/css/pages/ServicesPage.module.css";
import type { SocialLink } from "../types";

export default function ServicesPage() {
  const socialLinks = socialsData.socialLinks as SocialLink[];
  const maltLink = socialLinks.find((link) => link.name === "Malt")?.url;

  return (
    <main className={styles.services}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>🚀 Bientôt disponible</span>
          <h1 className={styles.title}>Mes Services</h1>
          <p className={styles.subtitle}>
            Je travaille actuellement sur une offre de services adaptée à vos
            besoins.
            <br />
            En attendant, n'hésitez pas à me contacter pour discuter de votre
            projet !
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaIcon}>💬</div>
            <h2 className={styles.ctaTitle}>Discutons de votre projet</h2>
            <p className={styles.ctaDescription}>
              Vous avez un projet en tête ? Une idée à concrétiser ?
              <br />
              Contactez-moi pour en discuter et obtenir un devis personnalisé.
            </p>
            <div className={styles.ctaButtons}>
              <Button to="/contact" variant="primary" size="lg">
                Me contacter
              </Button>
              {maltLink && (
                <Button href={maltLink} variant="outline" size="lg">
                  <img
                    src="/img/icons/malt-icon.png"
                    alt="Malt Logo"
                    className={styles.maltIcon}
                  />
                  <span>Voir mon profil Malt</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Teaser Section */}
      <section className={styles.teaserSection}>
        <div className={styles.container}>
          <h2 className={styles.teaserTitle}>Ce que je peux vous proposer</h2>
          <div className={styles.teaserGrid}>
            <div className={styles.teaserItem}>
              <span className={styles.teaserIcon}>🌐</span>
              <h3>Sites Web</h3>
              <p>Sites vitrines, landing pages, sites personnalisés</p>
            </div>
            <div className={styles.teaserItem}>
              <span className={styles.teaserIcon}>⚛️</span>
              <h3>Applications React</h3>
              <p>Interfaces utilisateur dynamiques et performantes</p>
            </div>
            <div className={styles.teaserItem}>
              <span className={styles.teaserIcon}>🛒</span>
              <h3>E-commerce</h3>
              <p>Boutiques en ligne avec Shopify ou solutions sur mesure</p>
            </div>
          </div>
          <p className={styles.teaserNote}>
            Tarifications et détails des prestations à venir prochainement.
          </p>
        </div>
      </section>
    </main>
  );
}

export const Head: HeadFC = () => (
  <Seo
    title="Services | Léo Peyronnet - Développeur Web"
    description="Découvrez les services de développement web proposés par Léo Peyronnet : sites vitrines, applications React, e-commerce."
  />
);
