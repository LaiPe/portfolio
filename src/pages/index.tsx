import React from "react";
import { graphql, type PageProps, type HeadFC } from "gatsby";

import Button from "../components/common/Button/Button";
import SkillCard from "../components/skills/SkillCard/SkillCard";
import ProjectCard from "../components/projects/ProjectCard/ProjectCard";
import Threads from "../components/backgrounds/threads/Threads";
import Seo from "../components/Seo";

import skillsData from "../data/skills.json";
import testimonialsData from "../data/testimonials.json";
import * as styles from "../assets/css/pages/HomePage.module.css";
import type { Project, Testimonial } from "../types";

interface SkillItem {
  name: string;
  featured?: boolean;
  /** Rattache l'item à une AUTRE catégorie pour l'affichage (ex. un langage
   *  affiché dans la carte « Frontend »). Voir la section Compétences Clés. */
  in?: string;
}
interface SkillCategory {
  title: string;
  icon: string;
  featured?: boolean;
  items: SkillItem[];
}

interface HomePageData {
  allMdx: { nodes: { frontmatter: Project }[] };
}

export default function HomePage({ data }: PageProps<HomePageData>) {
  const skills = skillsData.skills as Record<string, SkillCategory>;
  const { testimonials } = testimonialsData as { testimonials: Testimonial[] };

  // Items featured « rattachés » à une autre catégorie via `in` (ex. langages
  // affichés dans les cartes Frontend/Backend sur l'accueil).
  const injectedItems: Record<string, SkillItem[]> = {};
  Object.values(skills).forEach((category) => {
    category.items.forEach((item) => {
      if (item.featured && item.in) {
        (injectedItems[item.in] ??= []).push(item);
      }
    });
  });

  const featuredSkills = Object.entries(skills)
    .filter(([, category]) => category.featured)
    .map(([id, category]) => ({
      ...category,
      items: [
        ...category.items.filter((item) => item.featured && !item.in),
        ...(injectedItems[id] ?? []),
      ],
    }));
  const featuredProjects = data.allMdx.nodes.map((n) => n.frontmatter);
  const featuredTestimonial = testimonials.find((t) => t.featured);

  return (
    <main className={styles.home}>
      {/* Hero Section */}
      <section
        className={styles.hero}
        style={{ width: "100%", height: "600px", position: "relative" }}
      >
        {process.env.NODE_ENV !== "development" && (
          <Threads
            amplitude={3.5}
            distance={0.5}
            enableMouseInteraction
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
            }}
          />
        )}
        <div
          className={styles.heroContent}
          style={{ position: "relative", zIndex: 1 }}
        >
          <h1 className={styles.heroTitle}>
            Développeur <strong>Full-Stack</strong>
          </h1>
          <p className={styles.heroSubtitle}>
            <strong>React</strong> · <strong>Next.js</strong> ·{" "}
            <strong>Spring Boot</strong>
          </p>
          <div className={styles.heroCtas}>
            <Button to="/projets" variant="primary" size="lg">
              Voir mes projets
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              Me contacter
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={styles.skills}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Compétences Clés</h2>
          <div className={styles.skillsGrid}>
            {featuredSkills.map((skill) => (
              <SkillCard
                key={skill.title}
                title={skill.title}
                icon={skill.icon}
                items={skill.items}
              />
            ))}
          </div>
        </div>
        <div className={styles.projectsCta}>
          <Button to="/apropos" variant="outline">
            Voir toutes mes compétences →
          </Button>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className={styles.projects}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Projets Phares</h2>
          <p className={styles.sectionSubtitle}>
            Une sélection de mes réalisations les plus significatives
          </p>
          <div className={styles.projectsGrid}>
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                size={index === 0 ? "large" : "medium"}
              />
            ))}
          </div>
          <div className={styles.projectsCta}>
            <Button to="/projets" variant="outline">
              Voir tous les projets →
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services}>
        <div className={styles.container}>
          <div className={styles.servicesHeader}>
            <span className={styles.servicesIcon}>🎯</span>
            <h2 className={styles.sectionTitle}>
              Vous cherchez un développeur web ?
            </h2>
            <p className={styles.servicesSubtitle}>
              Sites vitrines, applications React, e-commerce... Discutons de
              votre projet !
            </p>
          </div>
          <div className={styles.servicesCta}>
            <Button to="/contact" variant="primary" size="lg">
              Me contacter
            </Button>
            <Button to="/services" variant="outline" size="lg">
              En savoir plus →
            </Button>
          </div>
        </div>
      </section>

      {featuredTestimonial && (
        <section className={styles.testimonials}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Ce qu'en disent mes clients</h2>
            <div className={styles.testimonialsContent}>
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialQuote}>
                  <span className={styles.quoteIcon}>"</span>
                  <p className={styles.testimonialText}>
                    {featuredTestimonial.text}
                  </p>
                </div>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorInfo}>
                    <p className={styles.authorName}>
                      {featuredTestimonial.author}
                    </p>
                    <p className={styles.authorRole}>
                      {featuredTestimonial.role}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.testimonialCta}>
                <div className={styles.testimonialCtaContent}>
                  <h3 className={styles.testimonialCtaTitle}>
                    Vous pourriez être le prochain !
                  </h3>
                  <p className={styles.testimonialCtaText}>
                    Rejoignez les clients satisfaits et donnons vie à votre
                    projet ensemble.
                  </p>
                  <Button to="/contact" variant="primary">
                    Démarrons votre projet
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export const query = graphql`
  query HomePage {
    allMdx(
      filter: { frontmatter: { featured: { eq: true } } }
      sort: { frontmatter: { priority: ASC } }
    ) {
      nodes {
        frontmatter {
          ...ProjectCardData
        }
      }
    }
  }
`;

export const Head: HeadFC = () => (
  <Seo
    title="Léo Peyronnet | Développeur Full-Stack React & Next.js"
    description="Portfolio de Léo Peyronnet, développeur full-stack React / Next.js et Java / Spring Boot. Applications web et mobiles de bout en bout. Projets, compétences et services."
  />
);
