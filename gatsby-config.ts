import type { GatsbyConfig } from "gatsby";
import path from "path";

/**
 * Transforme un nom de fichier (ex. "skills-complete") en nom de type GraphQL
 * (ex. "SkillsCompleteJson"), reproduisant le comportement par défaut de
 * gatsby-transformer-json pour les fichiers JSON non regroupés.
 */
const toTypeName = (name: string): string =>
  name
    .replace(/(^\w|[-_\s]\w)/g, (m) => m.replace(/[-_\s]/, "").toUpperCase())
    .concat("Json");

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Léo Peyronnet — Développeur Full-Stack React",
    description:
      "Portfolio de Léo Peyronnet, développeur web full-stack spécialisé React. Projets, compétences et services.",
    siteUrl: "https://leopeyronnet.fr",
    lang: "fr",
    author: "Léo Peyronnet",
  },
  // Génère src/gatsby-types.d.ts pendant `gatsby develop` (types des requêtes GraphQL).
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      // Source des données JSON + descriptions Markdown.
      resolve: "gatsby-source-filesystem",
      options: { name: "data", path: path.resolve(__dirname, "src/data") },
    },
    {
      // Source des images optimisées par Sharp (projets, profil…).
      resolve: "gatsby-source-filesystem",
      options: { name: "images", path: path.resolve(__dirname, "src/images") },
    },
    {
      resolve: "gatsby-transformer-json",
      options: {
        // Regroupe les fichiers d'un même dossier sous un seul type de node.
        typeName: ({ node }: { node: { sourceInstanceName: string; relativeDirectory: string; name: string } }) => {
          if (node.sourceInstanceName === "data") {
            if (node.relativeDirectory === "projects") return "ProjectsJson";
            if (node.relativeDirectory === "services") return "ServicesJson";
          }
          return toTypeName(node.name);
        },
      },
    },
    "gatsby-transformer-remark",
  ],
};

export default config;
