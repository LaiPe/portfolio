import type { GatsbyConfig } from "gatsby";
import path from "path";

// Charge .env.development / .env.production (RESEND_API_KEY pour src/api/contact.ts).
// Sur l'hébergeur (prod), ces variables sont configurées directement — le fichier
// .env.production n'existe pas et dotenv échoue silencieusement, ce qui est attendu.
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

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
      // Données de configuration (skills, socials, testimonials, about, services…).
      resolve: "gatsby-source-filesystem",
      options: { name: "data", path: path.resolve(__dirname, "src/data") },
    },
    {
      // Images non-projet (profil…).
      resolve: "gatsby-source-filesystem",
      options: { name: "images", path: path.resolve(__dirname, "src/images") },
    },
    {
      // Projets co-localisés : index.mdx + images/ par slug.
      resolve: "gatsby-source-filesystem",
      options: { name: "projects-content", path: path.resolve(__dirname, "src/content/projects") },
    },
    {
      resolve: "gatsby-transformer-json",
      options: {
        typeName: ({ node }: { node: { sourceInstanceName: string; relativeDirectory: string; name: string } }) => {
          if (node.sourceInstanceName === "data" && node.relativeDirectory === "services") return "ServicesJson";
          return toTypeName(node.name);
        },
      },
    },
    // Pages projet en MDX (content/projects/<slug>/index.mdx).
    "gatsby-plugin-mdx",
  ],
};

export default config;
