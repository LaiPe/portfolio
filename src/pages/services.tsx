import React from "react";
import { type HeadFC } from "gatsby";
import { Rocket, MessageCircle, Globe, Atom, ShoppingCart } from "lucide-react";

import Button from "../components/common/Button/Button";
import Container from "../components/common/Container/Container";
import PageHeader from "../components/common/PageHeader/PageHeader";
import Seo from "../components/Seo";
import socialsData from "../data/socials.json";
import * as styles from "../assets/css/pages/ServicesPage.module.css";
import type { SocialLink } from "../types";

export default function ServicesPage() {
  const socialLinks = socialsData.socialLinks as SocialLink[];
  const maltLink = socialLinks.find((link) => link.name === "Malt")?.url;

  return (
    <main className={styles.services}>
      <PageHeader
        title="Mes Services"
        badge={
          <>
            <Rocket size={16} /> Bientôt disponible
          </>
        }
      >
        Je travaille actuellement sur une offre de services adaptée à vos
        besoins.
        <br />
        En attendant, n'hésitez pas à me contacter pour discuter de votre
        projet !
      </PageHeader>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <Container>
          <div className={styles.ctaCard}>
            <MessageCircle className={styles.ctaIcon} size={48} />
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
        </Container>
      </section>

      {/* Teaser Section */}
      <section className={styles.teaserSection}>
        <Container>
          <h2 className={styles.teaserTitle}>Ce que je peux vous proposer</h2>
          <div className={styles.teaserGrid}>
            <div className={styles.teaserItem}>
              <Globe className={styles.teaserIcon} size={40} />
              <h3>Sites Web</h3>
              <p>Sites vitrines, landing pages, sites personnalisés</p>
            </div>
            <div className={styles.teaserItem}>
              <Atom className={styles.teaserIcon} size={40} />
              <h3>Applications React</h3>
              <p>Interfaces utilisateur dynamiques et performantes</p>
            </div>
            <div className={styles.teaserItem}>
              <ShoppingCart className={styles.teaserIcon} size={40} />
              <h3>E-commerce</h3>
              <p>Boutiques en ligne sur mesure, du catalogue au paiement</p>
            </div>
          </div>
          <p className={styles.teaserNote}>
            Tarifications et détails des prestations à venir prochainement.
          </p>
        </Container>
      </section>
    </main>
  );
}

export const Head: HeadFC = () => (
  <Seo
    title="Services | Léo Peyronnet - Développeur Full-Stack"
    description="Découvrez les services de développement web proposés par Léo Peyronnet : sites vitrines, applications React, e-commerce."
  />
);
