import React, { useMemo } from "react";
import { graphql, Link, type PageProps, type HeadProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import {
  ExternalLink,
  FolderGit2,
  FileText,
  User,
  Tag,
  Calendar,
  Timer,
  type LucideIcon,
} from "lucide-react";

import Badge from "../../components/common/Badge/Badge";
import Button from "../../components/common/Button/Button";
import Icon from "../../components/common/Icon/Icon";
import Seo from "../../components/Seo";
import {
  ProjectProvider,
  type MdxProject,
} from "../../components/projects/mdx";
import * as styles from "../../assets/css/pages/ProjectDetailPage.module.css";
import * as detail from "../../components/projects/mdx/blocks.module.css";
import * as mdxStyles from "../../components/projects/mdx/mdx.module.css";
import type { ProjectCategory } from "../../types";

/**
 * Template de page de détail d'un projet (pipeline MDX).
 * Route générée par la File System Route API : `{Mdx.frontmatter__slug}.tsx`
 * → /projets/:slug (une page statique par node Mdx).
 *
 * Le template porte le CHROME (hero + sidebar + nav) depuis le frontmatter ;
 * le CONTENU (prose + composants de la banque) arrive via `children` (corps MDX).
 */

interface CategoryChrome {
  typeLabel: string;
  cta: { title: string; text: string; button: string } | null;
}

const CHROME: Record<ProjectCategory, CategoryChrome> = {
  client: {
    typeLabel: "Projet Client",
    cta: {
      title: "Projet similaire ?",
      text: "Découvrez mes offres pour créer un projet similaire.",
      button: "Voir mes services",
    },
  },
  product: { typeLabel: "Produit", cta: null },
  experiment: { typeLabel: "Expérimentation", cta: null },
  caseStudy: {
    typeLabel: "Étude de cas",
    cta: {
      title: "Un projet similaire ?",
      text: "Découvrez mes offres de conception et développement.",
      button: "Voir mes services",
    },
  },
};

type NavProject = {
  frontmatter: Pick<MdxProject, "slug" | "title" | "category"> & {
    priority?: number | null;
  };
};

interface PreviewData {
  mdx: { frontmatter: MdxProject & { priority?: number | null } };
  allMdx: { nodes: NavProject[] };
}

export default function ProjectMdxPreview({
  data,
  children,
}: PageProps<PreviewData> & { children: React.ReactNode }) {
  const project = data.mdx.frontmatter;
  const chrome = CHROME[project.category] ?? CHROME.caseStudy;
  const hero = project.images?.hero?.childImageSharp?.gatsbyImageData;
  const links = project.links;

  const navigation = useMemo(() => {
    const same = data.allMdx.nodes
      .filter((n) => n.frontmatter.category === project.category)
      .sort(
        (a, b) =>
          (a.frontmatter.priority || 99) - (b.frontmatter.priority || 99),
      );
    const i = same.findIndex((n) => n.frontmatter.slug === project.slug);
    return {
      prev: i > 0 ? same[i - 1].frontmatter : null,
      next: i >= 0 && i < same.length - 1 ? same[i + 1].frontmatter : null,
    };
  }, [data.allMdx.nodes, project.category, project.slug]);

  return (
    <main className={styles.projectDetail}>
      <article>
        {/* Hero */}
        <header className={detail.hero}>
          {hero ? (
            <div className={detail.heroImageWrapper}>
              <GatsbyImage
                image={hero}
                alt={project.title}
                className={detail.heroImage}
              />
            </div>
          ) : (
            <div className={detail.heroEmoji}>
              <Icon name={project.images?.icon || "rocket"} size={120} />
            </div>
          )}
          <div className={detail.heroOverlay} />
          <div className={detail.heroContent}>
            <div className={detail.heroHeader}>
              <Badge variant={project.category}>{project.categoryLabel}</Badge>
            </div>
            <h1 className={detail.heroTitle}>{project.title}</h1>
            <p className={detail.heroDescription}>{project.shortDescription}</p>
            <div className={detail.heroTechnologies}>
              {project.technologies.slice(0, 6).map((tech, i) => (
                <Badge key={i} variant="tech">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 6 && (
                <Badge variant="tech">+{project.technologies.length - 6}</Badge>
              )}
            </div>
            <div className={detail.heroLinks}>
              {links?.live && (
                <Button href={links.live} target="_blank" variant="primary">
                  <ExternalLink size={18} /> Voir le projet
                </Button>
              )}
              {links?.github && (
                <Button href={links.github} target="_blank" variant="primary">
                  <FolderGit2 size={18} /> Code source
                </Button>
              )}
              {links?.pdf && (
                <Button href={links.pdf} target="_blank" variant="primary">
                  <FileText size={18} /> Documentation
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Layout : sidebar (chrome) + corps MDX (contenu) */}
        <div className={detail.layout}>
          <aside className={detail.sidebar}>
            <div className={detail.sidebarSection}>
              <h3 className={detail.sidebarTitle}>Informations</h3>
              <div className={detail.sidebarInfo}>
                {project.category === "client" && project.client ? (
                  <InfoItem icon={User} label="Client" value={project.client} />
                ) : (
                  <InfoItem icon={Tag} label="Type" value={chrome.typeLabel} />
                )}
                {project.date && (
                  <InfoItem icon={Calendar} label="Date" value={project.date} />
                )}
                {project.duration && (
                  <InfoItem icon={Timer} label="Durée" value={project.duration} />
                )}
              </div>
            </div>

            <div className={detail.sidebarSection}>
              <h3 className={detail.sidebarTitle}>
                {project.architecture ? "Stack technique" : "Technologies"}
              </h3>
              <div className={detail.sidebarTechnologies}>
                {project.technologies.map((tech, i) => (
                  <Badge key={i} variant="tech">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {(links?.live || links?.github || links?.pdf) && (
              <div className={detail.sidebarSection}>
                <h3 className={detail.sidebarTitle}>Liens</h3>
                <div className={detail.sidebarLinks}>
                  {links?.live && (
                    <SidebarLink href={links.live}>
                      <ExternalLink size={16} /> Projet en ligne
                    </SidebarLink>
                  )}
                  {links?.github && (
                    <SidebarLink href={links.github}>
                      <FolderGit2 size={16} /> Code GitHub
                    </SidebarLink>
                  )}
                  {links?.pdf && (
                    <SidebarLink href={links.pdf}>
                      <FileText size={16} /> Documentation PDF
                    </SidebarLink>
                  )}
                </div>
              </div>
            )}

            {chrome.cta && (
              <div className={detail.sidebarCta}>
                <h3 className={detail.sidebarCtaTitle}>{chrome.cta.title}</h3>
                <p className={detail.sidebarCtaText}>{chrome.cta.text}</p>
                <Link to="/services" className={detail.sidebarCtaButton}>
                  {chrome.cta.button}
                </Link>
              </div>
            )}
          </aside>

          <ProjectProvider project={project}>
            <div className={mdxStyles.body}>{children}</div>
          </ProjectProvider>
        </div>
      </article>

      {/* Navigation inter-projets */}
      <nav className={styles.projectNav}>
        <div className={styles.navContainer}>
          {navigation.prev ? (
            <Link
              to={`/projets/${navigation.prev.slug}`}
              className={styles.navLink}
            >
              <span className={styles.navDirection}>← Précédent</span>
              <span className={styles.navTitle}>{navigation.prev.title}</span>
            </Link>
          ) : (
            <Link to="/projets" className={styles.navLink}>
              <span className={styles.navDirection}>← Retour</span>
              <span className={styles.navTitle}>Tous les projets</span>
            </Link>
          )}
          {navigation.next ? (
            <Link
              to={`/projets/${navigation.next.slug}`}
              className={`${styles.navLink} ${styles.navRight}`}
            >
              <span className={styles.navDirection}>Suivant →</span>
              <span className={styles.navTitle}>{navigation.next.title}</span>
            </Link>
          ) : (
            <Link to="/projets" className={`${styles.navLink} ${styles.navRight}`}>
              <span className={styles.navDirection}>Retour →</span>
              <span className={styles.navTitle}>Tous les projets</span>
            </Link>
          )}
        </div>
      </nav>
    </main>
  );
}

function InfoItem({
  icon: IconComponent,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className={detail.infoItem}>
      <IconComponent className={detail.infoIcon} size={18} />
      <div className={detail.infoContent}>
        <span className={detail.infoLabel}>{label}</span>
        <span className={detail.infoValue}>{value}</span>
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={detail.sidebarLink}
    >
      {children}
    </a>
  );
}

export const query = graphql`
  query ProjectMdxPreview($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        id
        title
        slug
        category
        categoryLabel
        shortDescription
        technologies
        date
        duration
        client
        priority
        links {
          live
          demo
          github
          pdf
        }
        images {
          icon
          hero {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
          gallery {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                placeholder: BLURRED
                width: 1200
              )
            }
          }
        }
        architecture {
          backend {
            framework
            language
            security
            orm
            databases
          }
          frontend {
            library
            bundler
            routing
            mapping
            styling
          }
          infrastructure {
            containerization
            webserver
            registry
            ci
          }
          externalAPIs
        }
      }
    }
    allMdx {
      nodes {
        frontmatter {
          slug
          title
          category
          priority
        }
      }
    }
  }
`;

export const Head = ({ data }: HeadProps<PreviewData>) => {
  const p = data.mdx.frontmatter;
  return (
    <Seo
      title={`${p.title} | Léo Peyronnet - Développeur Full-Stack`}
      description={p.shortDescription}
    />
  );
};
