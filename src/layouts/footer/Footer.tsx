import React from "react";
import { Link } from "gatsby";
import Button from "../../components/common/Button/Button";
import Container from "../../components/common/Container/Container";
import TechIcon from "../../components/common/TechIcon/TechIcon";
import * as styles from "./Footer.module.css";
import site from "../../data/site.json";
import socialsData from "../../data/socials.json";
import type { SocialLink } from "../../types";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = socialsData.socialLinks as SocialLink[];

  const quickLinks = [
    { name: "Accueil", path: "/" },
    { name: "Projets", path: "/projets" },
    { name: "Services", path: "/services" },
    { name: "À propos", path: "/apropos" },
  ];

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          {/* Identité : monogramme à gauche ; à droite le nom, le métier, les technologies
              (l'intitulé du profil LinkedIn) */}
          <div className={styles.section}>
            <div className={styles.identity}>
              <img src="/img/logo-lp-raw.png" alt="" className={styles.logo} />
              <div className={styles.identityText}>
                <h3 className={`wordmark ${styles.title}`}>Léo Peyronnet</h3>
                <p className={styles.role}>{site.role}</p>
                <p className={styles.stack}>{site.stack}</p>
              </div>
            </div>
          </div>

          {/* Section Navigation rapide */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Navigation</h4>
            <nav className={styles.quickLinks}>
              {quickLinks.map((link) => (
                <Link key={link.path} to={link.path} className={styles.link}>
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Section Contact */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Me contacter</h4>
            <p className={styles.contactText}>
              Une question ? Un projet ?
              <br />
              Discutons-en !
            </p>
            <Button to="/contact" variant="inverse" size="sm" className={styles.ctaButton}>
              Envoyez-moi un message
            </Button>
          </div>

          {/* Section Réseaux sociaux */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Suivez-moi</h4>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.name}
                  title={social.name}
                >
                  <TechIcon name={social.icon} size={24} className={styles.socialIcon} />
                  <span className={styles.socialName}>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>© {currentYear} Léo Peyronnet. Tous droits réservés.</p>
          <div className={styles.legalLinks}>
            {/* Page à créer : les mentions légales sont obligatoires pour un site professionnel. */}
            <a href="/mentions-legales" className={styles.legalLink}>
              Mentions légales
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
