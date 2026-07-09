import type { GatsbyNode } from "gatsby";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Schéma GraphQL des pages projet (pipeline MDX).
 * On type explicitement `MdxFrontmatter` — sur un frontmatter, un champ `null`
 * partout (ex. `client`) ou absent casserait l'inférence. Les resolvers d'images
 * sont définis dans createResolvers pour accéder au slug parent.
 */
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    actions.createTypes(`
      type Mdx implements Node {
        frontmatter: MdxFrontmatter
      }
      type MdxFrontmatter {
        id: String
        title: String
        slug: String
        category: String
        categoryLabel: String
        shortDescription: String
        technologies: [String]
        featured: Boolean
        priority: Int
        date: String
        duration: String
        client: String
        images: MdxFrontmatterImages
        links: MdxFrontmatterLinks
        architecture: MdxFrontmatterArchitecture
      }
      type MdxFrontmatterImages {
        emoji: String
        thumbnail: File
        hero: File
        gallery: [File]
      }
      type MdxFrontmatterLinks {
        live: String
        demo: String
        github: String
        pdf: String
      }
      type MdxFrontmatterArchitecture {
        backend: MdxArchBackend
        frontend: MdxArchFrontend
        infrastructure: MdxArchInfra
        externalAPIs: [String]
      }
      type MdxArchBackend {
        framework: String
        language: String
        security: String
        orm: String
        databases: [String]
        tools: [String]
      }
      type MdxArchFrontend {
        library: String
        bundler: String
        routing: String
        mapping: String
        styling: String
        stateManagement: String
      }
      type MdxArchInfra {
        containerization: String
        webserver: String
        registry: String
        ci: String
      }
    `);
  };

/**
 * Resolvers pour les images de projet co-localisées (dans `content/projects/<slug>/images/`).
 * `MdxFrontmatter.images` injecte `_slug` dans l'objet retourné pour que les sous-resolvers
 * (thumbnail/hero/gallery) construisent le relativePath sans accès direct au nœud parent.
 */
export const createResolvers: GatsbyNode["createResolvers"] = ({
  createResolvers: cr,
}) => {
  const findImage = (context: any, slug: string, filename: string) =>
    context.nodeModel.findOne({
      type: "File",
      query: {
        filter: {
          sourceInstanceName: { eq: "projects-content" },
          relativePath: { eq: `${slug}/images/${filename}` },
        },
      },
    });

  cr({
    MdxFrontmatter: {
      images: {
        type: "MdxFrontmatterImages",
        resolve(source: any) {
          if (!source.images) return null;
          return { ...source.images, _slug: source.slug };
        },
      },
    },
    MdxFrontmatterImages: {
      thumbnail: {
        type: "File",
        resolve(source: any, _: any, context: any) {
          if (!source.thumbnail || !source._slug) return null;
          return findImage(context, source._slug, source.thumbnail);
        },
      },
      hero: {
        type: "File",
        resolve(source: any, _: any, context: any) {
          if (!source.hero || !source._slug) return null;
          return findImage(context, source._slug, source.hero);
        },
      },
      gallery: {
        type: "[File]",
        resolve(source: any, _: any, context: any) {
          if (!Array.isArray(source.gallery) || !source._slug) return null;
          return Promise.all(
            source.gallery.map((f: string) => findImage(context, source._slug, f))
          );
        },
      },
    },
  });
};
