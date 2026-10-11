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
import Icon from "../components/common/Icon/Icon";
import TechIcon from "../components/common/TechIcon/TechIcon";
import FranceMap from "../components/about/FranceMap";
import Seo from "../components/Seo";
import MarkdownText from "../components/MarkdownText";
import aboutData from "../data/about.json";
import skillsData from "../data/skills.json";
import * as styles from "../assets/css/pages/AboutPage.module.css";
import type { SkillCategory, SkillLevel } from "../types";

interface TimelineEntry {
  id: string | number;
  period: string;
  title: string;
  description: string;
  type?: string;
  company?: string;
  institution?: string;
  current?: boolean;
}
interface CardEntry {
  id: string | number;
  icon: string;
  title: string;
  description: string;
}

const {
  profile,
  education,
  certifications,
  experiences,
  otherExperiences,
  passions,
  values,
  cv,
} = aboutData as unknown as {
  profile: {
    name: string;
    title: string;
    age: number;
    bio: string;
    mobilityHint: string;
    facets: { id: string; icon: string; title: string; text: string }[];
    mobility: { title: string; text: string; places: string[]; language: string };
    music: string;
  };
  education: TimelineEntry[];
  certifications: { id: string | number; title: string; issuer: string; date: string }[];
  experiences: TimelineEntry[];
  otherExperiences: TimelineEntry[];
  passions: CardEntry[];
  values: CardEntry[];
  cv: { path: string; filename: string };
};

export default function AboutPage() {
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = cv.path;
    link.download = cv.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      <div className={styles.layout}>
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
                  <Button onClick={handleDownloadCV} variant="primary">
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
          <h2 className={styles.sectionTitle}>
            <UserRound className={styles.sectionIcon} size={24} />
            Qui suis-je ?
          </h2>
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
          <h2 className={styles.sectionTitle}>
            <Compass className={styles.sectionIcon} size={24} />
            Ce qui me guide
          </h2>
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
          <h2 className={styles.sectionTitle}>
            <Briefcase className={styles.sectionIcon} size={24} />
            Expériences
          </h2>
          <div className={styles.timeline}>
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className={`${styles.timelineItem} ${exp.current ? styles.current : ""}`}
              >
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <span className={styles.timelinePeriod}>{exp.period}</span>
                  <h3 className={styles.timelineTitle}>
                    {exp.title}
                    <span className={styles.timelineType}>{exp.type}</span>
                  </h3>
                  <p className={styles.timelineCompany}>{exp.company}</p>
                  <p className={styles.timelineDescription}>
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <GraduationCap className={styles.sectionIcon} size={24} />
            Formation
          </h2>
          <div className={styles.timeline}>
            {education.map((edu) => (
              <div key={edu.id} className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <span className={styles.timelinePeriod}>{edu.period}</span>
                  <h3 className={styles.timelineTitle}>{edu.title}</h3>
                  <p className={styles.timelineCompany}>{edu.institution}</p>
                  <p className={styles.timelineDescription}>
                    {edu.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Award className={styles.sectionIcon} size={24} />
            Certifications
          </h2>
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
            <h2 className={styles.sectionTitle}>
              <Drama className={styles.sectionIcon} size={24} />
              Autres expériences
            </h2>
            <div className={styles.timeline}>
              {otherExperiences.map((exp) => (
                <div key={exp.id} className={styles.timelineItem}>
                  <div className={styles.timelineDot}></div>
                  <div className={styles.timelineContent}>
                    <span className={styles.timelinePeriod}>
                      {exp.period}
                    </span>
                    <h3 className={styles.timelineTitle}>{exp.title}</h3>
                    <p className={styles.timelineCompany}>
                      {exp.institution}
                    </p>
                    <p className={styles.timelineDescription}>
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Passions */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Heart className={styles.sectionIcon} size={24} />
            En dehors du code
          </h2>
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
            <Button onClick={handleDownloadCV} variant="primary" size="lg">
              <Download size={20} /> Télécharger mon CV
            </Button>
            <Button to="/contact" variant="primary" size="lg">
              Me contacter
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}

/** Puce selon l'importance (`level`) : signature > key > aucune. */
const chipLevelClass: Record<SkillLevel, string> = {
  signature: styles.skillChipSignature,
  key: styles.skillChipKey,
};

/** Toutes les compétences, en cartes par catégorie, puces graduées par `level`. */
function SkillsSection() {
  const skills = skillsData.skills as Record<string, SkillCategory>;

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <Wrench className={styles.sectionIcon} size={24} />
        Compétences
      </h2>
      <div className={styles.skillsGrid}>
        {Object.values(skills).map((category) => (
          <div key={category.title} className={styles.skillCategory}>
            <h3 className={styles.skillCategoryTitle}>
              <Icon name={category.icon} className={styles.skillCategoryIcon} size={18} />
              {category.title}
            </h3>
            <ul className={styles.skillList}>
              {category.items.map((skill) => (
                <li
                  key={skill.name}
                  className={`${styles.skillChip} ${skill.level ? chipLevelClass[skill.level] : ""}`}
                >
                  {skill.icon && <TechIcon name={skill.icon} size={14} />}
                  {skill.name}
                </li>
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
