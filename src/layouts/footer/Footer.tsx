import React from "react";
import { Link } from "gatsby";
import Button from "../../components/common/Button/Button";
import Container from "../../components/common/Container/Container";
import TechIcon from "../../components/common/TechIcon/TechIcon";
import * as styles from "./Footer.module.css";
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
          {/* Section À propos */}
          <div className={styles.section}>
            <div className={styles.logoTitle}>
              <img
                src="/img/logo-lp-raw.png"
                alt="Logo Léo Peyronnet"
                className={styles.logo}
              />
              <h3 className={styles.title}>Léo Peyronnet</h3>
            </div>
            <p className={styles.description}>
              Développeur Full-Stack
              <br />
              React · Next.js · Spring Boot
            </p>
            <p className={styles.tagline}>
              Transformons vos idées en solutions digitales modernes et
              performantes.
            </p>
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
            <Button to="/contact" variant="inverse" className={styles.ctaButton}>
              Envoyer moi un message
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
