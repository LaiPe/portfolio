import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { type HeadFC } from "gatsby";
import {
  Download,
  UserRound,
  Compass,
  Briefcase,
  GraduationCap,
  Award,
  Drama,
  Wrench,
  Heart,
  MapPin,
  ArrowRight,
  Plane,
  Music,
} from "lucide-react";

import Button from "../components/common/Button/Button";
import Container from "../components/common/Container/Container";
import Icon from "../components/common/Icon/Icon";
import SectionTitle from "../components/common/SectionTitle/SectionTitle";
import TechIcon from "../components/common/TechIcon/TechIcon";
import FranceMap from "../components/about/FranceMap";
import Timeline from "../components/about/Timeline";
import SkillChip from "../components/skills/SkillChip/SkillChip";
import Seo from "../components/Seo";
import MarkdownText from "../components/MarkdownText";
import aboutData from "../data/about.json";
import skillsData from "../data/skills.json";
import * as styles from "../assets/css/pages/AboutPage.module.css";
import type { AboutData, SkillCategory } from "../types";

const { profile, education, certifications, experiences, otherExperiences, passions, values, cv } =
  aboutData as AboutData;

export default function AboutPage() {
  // Défile en douceur vers la carte Mobilité et la centre dans la zone visible
  // sous la navbar sticky (sans jamais passer sous celle-ci).
  const scrollToMobility = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("mobilite");
    if (!target) return;
    event.preventDefault();

    const navHeight = document.querySelector("header")?.offsetHeight ?? 0;
    const visibleHeight = window.innerHeight - navHeight;
    const minGap = 16;
    const offset = Math.max(minGap, (visibleHeight - target.offsetHeight) / 2);
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - offset;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    history.replaceState(null, "", "#mobilite");
  };

  return (
    <main className={styles.about}>
      <Container>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.profileInfo}>
              <h1 className={styles.name}>{profile.name}</h1>
              <p className={styles.title}>
                {profile.title} - {profile.age} ans
              </p>
              <div className={styles.bio}>
                <MarkdownText>{profile.bio}</MarkdownText>
              </div>
              <a href="#mobilite" onClick={scrollToMobility} className={styles.mobilityHint}>
                <MapPin size={16} aria-hidden /> {profile.mobilityHint}
              </a>
              {/* Une entrée par public : recruteurs / clients */}
              <div className={styles.heroCta}>
                <div className={styles.ctaGroup}>
                  <span className={styles.ctaLabel}>Vous recrutez ?</span>
                  <Button href={cv.path} download={cv.filename} target="_self" variant="primary">
                    <Download size={18} /> Télécharger mon CV
                  </Button>
                </div>
                <div className={styles.ctaGroup}>
                  <span className={styles.ctaLabel}>Un projet ?</span>
                  <Button to="/contact" variant="outline">
                    Parlons-en <ArrowRight size={18} />
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.profileImageWrapper}>
              <StaticImage
                src="../images/a-propos/profile.jpg"
                alt={`Photo de ${profile.name}`}
                className={styles.profileImage}
                placeholder="blurred"
                layout="constrained"
                width={400}
              />
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className={styles.section}>
          <SectionTitle icon={UserRound}>Qui suis-je ?</SectionTitle>
          <div className={styles.facetsGrid}>
            {profile.facets.map((facet) => (
              <div key={facet.id} className={styles.facetCard}>
                <h3 className={styles.facetTitle}>
                  <Icon name={facet.icon} className={styles.facetIcon} size={22} />
                  {facet.title}
                </h3>
                <div className={styles.facetText}>
                  <MarkdownText>{facet.text}</MarkdownText>
                </div>
              </div>
            ))}

            <div id="mobilite" className={styles.mobilityCard}>
              <h3 className={styles.facetTitle}>
                <Plane className={styles.mobilityIcon} size={22} />
                {profile.mobility.title}
              </h3>
              <div className={styles.mobilityBody}>
                <FranceMap className={styles.mobilityMap} />
                <div className={styles.facetText}>
                  <MarkdownText>{profile.mobility.text}</MarkdownText>
                </div>
              </div>
              <ul className={styles.mobilityChips}>
                {profile.mobility.places.map((place) => (
                  <li key={place}>{place}</li>
                ))}
                <li>
                  <TechIcon name="flag-gb" size={12} /> {profile.mobility.language}
                </li>
              </ul>
            </div>

            {/* Carte pleine largeur, sur une ligne : reste visuellement dans « Qui suis-je ? » */}
            <div className={styles.musicCard}>
              <Music className={styles.musicIcon} size={22} />
              <MarkdownText>{profile.music}</MarkdownText>
            </div>
          </div>
        </section>

        <SkillsSection />

        {/* Values */}
        <section className={styles.section}>
          <SectionTitle icon={Compass}>Ce qui me guide</SectionTitle>
          <div className={styles.valuesGrid}>
            {values.map((value) => (
              <div key={value.id} className={styles.valueCard}>
                <Icon name={value.icon} className={styles.valueIcon} size={32} />
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experiences */}
        <section className={styles.section}>
          <SectionTitle icon={Briefcase}>Expériences</SectionTitle>
          <Timeline entries={experiences} />
        </section>

        {/* Education */}
        <section className={styles.section}>
          <SectionTitle icon={GraduationCap}>Formation</SectionTitle>
          <Timeline entries={education} />
        </section>

        {/* Certifications */}
        <section className={styles.section}>
          <SectionTitle icon={Award}>Certifications</SectionTitle>
          <div className={styles.certificationsGrid}>
            {certifications.map((cert) => (
              <div key={cert.id} className={styles.certificationCard}>
                <h3 className={styles.certificationTitle}>{cert.title}</h3>
                <p className={styles.certificationIssuer}>{cert.issuer}</p>
                <span className={styles.certificationDate}>{cert.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Other Experiences */}
        {otherExperiences.length > 0 && (
          <section className={styles.section}>
            <SectionTitle icon={Drama}>Autres expériences</SectionTitle>
            <Timeline entries={otherExperiences} />
          </section>
        )}

        {/* Passions */}
        <section className={styles.section}>
          <SectionTitle icon={Heart}>En dehors du code</SectionTitle>
          <div className={styles.passionsGrid}>
            {passions.map((passion) => (
              <div key={passion.id} className={styles.passionCard}>
                <Icon name={passion.icon} className={styles.passionIcon} size={40} />
                <h3 className={styles.passionTitle}>{passion.title}</h3>
                <p className={styles.passionDescription}>
                  {passion.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Envie de collaborer ?</h2>
          <p className={styles.ctaText}>
            Ouvert aux opportunités en CDI / CDD, y compris en ESN, comme aux
            missions freelance, en développement full-stack.
          </p>
          <div className={styles.ctaButtons}>
            <Button href={cv.path} download={cv.filename} target="_self" variant="inverse" size="lg">
              <Download size={20} /> Télécharger mon CV
            </Button>
            <Button to="/contact" variant="inverse" size="lg">
              Me contacter
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
}

/** Toutes les compétences, en cartes par catégorie, puces graduées par `level`. */
function SkillsSection() {
  const skills = skillsData.skills as Record<string, SkillCategory>;

  return (
    <section className={styles.section}>
      <SectionTitle icon={Wrench}>Compétences</SectionTitle>
      <div className={styles.skillsGrid}>
        {Object.values(skills).map((category) => (
          <div key={category.title} className={styles.skillCategory}>
            <h3 className={styles.skillCategoryTitle}>
              <Icon name={category.icon} className={styles.skillCategoryIcon} size={18} />
              {category.title}
            </h3>
            <ul className={styles.skillList}>
              {category.items.map((skill) => (
                <SkillChip key={skill.name} skill={skill} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export const Head: HeadFC = () => (
  <Seo
    title="À propos | Léo Peyronnet - Développeur Full-Stack"
    description="Le parcours de Léo Peyronnet, développeur full-stack React / Next.js et Java / Spring Boot. Formation, expériences et compétences."
  />
);
