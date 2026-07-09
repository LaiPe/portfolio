import React, { createContext, useContext } from "react";
import type {
  ImageNode,
  ProjectArchitecture,
  ProjectCategory,
  ProjectLinks,
} from "../../../types";

/**
 * Données de niveau projet, issues du frontmatter + resolvers d'images, fournies
 * par le template de page autour du corps MDX. Les composants de la banque qui
 * ont besoin de ces données (Architecture, Gallery, Testimonial) les lisent ici
 * plutôt que de recevoir des props — l'auteur MDX écrit juste `<Gallery />`.
 */
export interface MdxProject {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  categoryLabel: string;
  shortDescription: string;
  technologies: string[];
  date?: string | null;
  duration?: string | null;
  client?: string | null;
  links?: ProjectLinks | null;
  images?: {
    icon?: string | null;
    hero?: ImageNode | null;
    gallery?: (ImageNode | null)[] | null;
  } | null;
  architecture?: ProjectArchitecture | null;
}

const ProjectContext = createContext<MdxProject | null>(null);

export function ProjectProvider({
  project,
  children,
}: {
  project: MdxProject;
  children: React.ReactNode;
}) {
  return (
    <ProjectContext.Provider value={project}>
      {children}
    </ProjectContext.Provider>
  );
}

/**
 * Accès aux données du projet courant depuis un composant de la banque MDX.
 * Lève si utilisé hors d'une page projet (erreur d'auteur détectée tôt).
 */
export function useProject(): MdxProject {
  const project = useContext(ProjectContext);
  if (!project) {
    throw new Error(
      "useProject() doit être utilisé dans une page projet (ProjectProvider manquant).",
    );
  }
  return project;
}
