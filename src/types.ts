import type { IGatsbyImageData } from "gatsby-plugin-image";

/** Node File résolu par Sharp (issu des resolvers d'images projet, cf. gatsby-node.ts). */
export interface ImageNode {
  childImageSharp: { gatsbyImageData: IGatsbyImageData } | null;
}

export interface ProjectImages {
  thumbnail?: ImageNode | null;
  hero?: ImageNode | null;
  gallery?: (ImageNode | null)[] | null;
  icon?: string | null;
}

export interface ProjectLinks {
  live?: string | null;
  /** Lien secondaire vers une démo technique (distincte du site principal `live`). */
  demo?: string | null;
  github?: string | null;
  pdf?: string | null;
}

export interface ProjectArchitecture {
  backend?: {
    framework?: string;
    language?: string;
    security?: string;
    orm?: string;
    databases?: string[];
  };
  frontend?: {
    library?: string;
    bundler?: string;
    routing?: string;
    mapping?: string;
    styling?: string;
  };
  infrastructure?: {
    containerization?: string;
    webserver?: string;
    registry?: string;
    ci?: string;
  };
  externalAPIs?: string[];
}

export type ProjectCategory = "client" | "product" | "caseStudy" | "experiment";

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  categoryLabel: string;
  shortDescription: string;
  technologies: string[];
  featured?: boolean;
  priority?: number;
  images: ProjectImages | null;
  links?: ProjectLinks | null;
  client?: string | null;
  date?: string;
  duration?: string;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role?: string;
  projectId: string;
  featured?: boolean;
}

/**
 * Importance d'une compétence (`skills.json`) :
 * - `signature` : une par catégorie de l'accueil — tuile large (accueil), puce bleu plein (À propos) ;
 * - `key` : tuile (accueil, si la catégorie a `home: true`), puce bleu clair (À propos) ;
 * - absent : puce grise sur À propos uniquement.
 */
export type SkillLevel = "signature" | "key";

export interface SkillItem {
  name: string;
  /** Libellé court pour la tuile de l'accueil. */
  short?: string;
  /** Clé résolue par `TechIcon`. */
  icon?: string;
  level?: SkillLevel;
  /** Affiche l'item dans la carte d'une AUTRE catégorie, sur l'accueil uniquement. */
  in?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  /** Carte affichée dans « Compétences clés » sur l'accueil. */
  home: boolean;
  items: SkillItem[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  description: string;
}
