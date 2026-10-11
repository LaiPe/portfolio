import type { GatsbyConfig } from "gatsby";
import path from "path";

// Charge .env.development / .env.production (RESEND_API_KEY pour src/api/contact.ts).
// Sur l'hébergeur (prod), ces variables sont configurées directement — le fichier
// .env.production n'existe pas et dotenv échoue silencieusement, ce qui est attendu.
// `require` : forme documentée par Gatsby ; le dotenv embarqué n'expose pas ses types à l'import ESM.
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Léo Peyronnet — Développeur Full-Stack React & Spring Boot",
    description:
      "Portfolio de Léo Peyronnet, développeur full-stack React / Next.js et Java / Spring Boot. Projets, compétences et services.",
    siteUrl: "https://portfolio.leopeyronnet.fr",
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
      // Données de configuration (skills, socials, testimonials, about).
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
    "gatsby-transformer-json",
    // Pages projet en MDX (content/projects/<slug>/index.mdx).
    "gatsby-plugin-mdx",
  ],
};

export default config;
