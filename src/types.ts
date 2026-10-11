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
  /** Clé résolue par `TechIcon` (ex. `github`). */
  icon: string;
  description: string;
}

/* ---------- Page À propos (about.json) ---------- */

export interface TimelineDetailGroup {
  /** Intertitre du groupe (ex. un axe de mission) ; absent = simple liste. */
  heading?: string;
  items: string[];
}

export interface TimelineEntry {
  id: string | number;
  period: string;
  /** Mois de début, `AAAA-MM` : active le calcul de la durée (cf. `Duration`). */
  start?: string;
  /** Mois de fin, `AAAA-MM` ; absent = en cours, durée calculée jusqu'à aujourd'hui. */
  end?: string;
  title: string;
  /** Employeur ou établissement. */
  organization?: string;
  /** Modalité du poste : lieu, hybride, à distance, itinérant… */
  location?: string;
  /** Type de contrat, affiché à la suite de la modalité. */
  type?: string;
  /** Phrase de présentation ; facultative (ex. formation décrite par ses seules puces). */
  summary?: string;
  /** Détail dépliable ; absent = entrée simple, sans bouton. */
  details?: TimelineDetailGroup[];
  /** Phrase de conclusion, affichée à la fin du détail. */
  note?: string;
  /** Noms de compétences de `skills.json` (un nom inconnu donne une puce neutre). */
  skills?: string[];
  /** Compétences transverses (savoir-être, analyse du besoin…) : tout ce qui n'est ni une
   *  technologie ni un concept informatique. Affichées sur leur propre ligne, en puces à bordure. */
  softSkills?: string[];
  /** Liens internes, affichés à la fin du détail. */
  links?: { label: string; to: string }[];
  current?: boolean;
}

/** Carte icône + titre + texte (valeurs, centres d'intérêt). */
export interface AboutCard {
  id: string | number;
  icon: string;
  title: string;
  description: string;
}

export interface AboutData {
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
  passions: AboutCard[];
  values: AboutCard[];
  cv: { path: string; filename: string };
}
