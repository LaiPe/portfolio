import type { IGatsbyImageData } from "gatsby-plugin-image";

/** Node File résolu par Sharp (issu de `@imageByPath`). */
export interface ImageNode {
  childImageSharp: { gatsbyImageData: IGatsbyImageData } | null;
}

export interface ProjectImages {
  thumbnail?: ImageNode | null;
  hero?: ImageNode | null;
  gallery?: (ImageNode | null)[] | null;
  emoji?: string | null;
}

export interface ProjectLinks {
  live?: string | null;
  /** Lien secondaire vers une démo technique (distincte du site principal `live`). */
  demo?: string | null;
  github?: string | null;
  pdf?: string | null;
}

/** Une « feature » peut être une string ou un objet titre/description. */
export type ProjectFeature =
  | string
  | { title?: string; description?: string; text?: string; emoji?: string };

/** Un « challenge » peut être une string ou un objet titre/solution. */
export type ProjectChallenge = string | { title?: string; solution?: string };

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
  highlights?: string[];
  useCases?: string[];
  skills?: string[];
  featured?: boolean;
  priority?: number;
  images: ProjectImages | null;
  links?: ProjectLinks | null;
  client?: string | null;
  date?: string;
  duration?: string;
  problem?: string;
  architecture?: ProjectArchitecture;
  features?: ProjectFeature[];
  challenges?: ProjectChallenge[];
  results?: string[];
  /** HTML rendu de la description Markdown (relié par slug). */
  description?: { html: string } | null;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role?: string;
  projectId: string;
  featured?: boolean;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  description: string;
}
