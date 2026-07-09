/**
 * Barrel de la banque de composants MDX des pages projet.
 * Les fichiers `index.mdx` importent depuis ce point unique :
 *
 * ```mdx
 * import { Features, Feature, Architecture, Gallery, Testimonial, Callout } from "../../../components/projects/mdx";
 * ```
 *
 * Import direct (pas de MDXProvider) : explicite, fiable dans tous les contextes
 * de rendu, et la banque reste fermée par convention (cf. docs/mdx-projects-contract.md).
 * Les composants pilotés par la donnée de page (Architecture, Gallery, Testimonial)
 * lisent le contexte projet fourni par le template via ProjectProvider.
 */
export { Features, Feature } from "./Features";
export { default as Architecture } from "./Architecture";
export { default as Gallery } from "./Gallery";
export { default as Testimonial } from "./Testimonial";
export { default as Callout } from "./Callout";

export { ProjectProvider, useProject } from "./ProjectContext";
export type { MdxProject } from "./ProjectContext";
