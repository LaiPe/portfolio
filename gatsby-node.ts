import type { GatsbyNode } from "gatsby";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Ajoute `fields.slug` aux nodes MarkdownRemark.
 * Pour les descriptions co-localisées (description.md), le slug est le nom du
 * dossier parent, lu via `fileNode.relativeDirectory` (ex. "attilio-terlizzi").
 * Pour les anciens fichiers nommés par slug, on garde le nom du fichier.
 */
export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  getNode,
  actions,
}) => {
  if (node.internal.type !== "MarkdownRemark") return;

  const fileNode = node.parent ? getNode(node.parent) : undefined;
  if (!fileNode) return;

  // gatsby-source-filesystem : fileNode.parent est null, pas un nœud directory.
  // relativeDirectory donne le dossier du projet ("attilio-terlizzi").
  const slug =
    (fileNode as any).name === "description"
      ? (fileNode as any).relativeDirectory
      : (fileNode as any).name;

  if (slug) {
    actions.createNodeField({ node, name: "slug", value: slug });
  }
};

/**
 * Schéma GraphQL : déclare les types sans field extension (les resolvers
 * d'images sont définis dans createResolvers pour accéder au slug parent).
 *
 * Deux sources de projet coexistent pendant la migration MDX :
 * - `ProjectsJson` (ancien pipeline, encore actif pour /projets/:slug) ;
 * - `Mdx` / `MdxFrontmatter` (nouveau pipeline, aperçu sur /projets-preview/:slug).
 * Les deux résolvent leurs images via la même convention `slug/images/<file>`.
 */
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    actions.createTypes(`
      type ProjectsJson implements Node {
        images: ProjectsJsonImages
        links: ProjectsJsonLinks
        description: MarkdownRemark @link(by: "fields.slug", from: "slug")
        problem: String
        results: [String]
      }
      type ProjectsJsonImages {
        emoji: String
        thumbnail: File
        hero: File
        gallery: [File]
      }
      type ProjectsJsonLinks {
        live: String
        demo: String
        github: String
        pdf: String
      }

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
 * Resolvers pour les images co-localisées.
 * Le conteneur d'images (`ProjectsJson.images` / `MdxFrontmatter.images`) injecte
 * `_slug` dans l'objet retourné pour que les sous-resolvers (thumbnail/hero/gallery)
 * construisent le relativePath sans accès direct au nœud parent.
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

  // Resolvers d'un conteneur d'images (thumbnail/hero/gallery), factorisés pour
  // ProjectsJsonImages et MdxFrontmatterImages qui partagent la même convention.
  const imageContainerResolvers = {
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
  };

  // Injecte `_slug` dans le conteneur d'images depuis le node/frontmatter parent.
  const withSlug = (type: string) => ({
    type,
    resolve(source: any) {
      if (!source.images) return null;
      return { ...source.images, _slug: source.slug };
    },
  });

  cr({
    ProjectsJson: { images: withSlug("ProjectsJsonImages") },
    ProjectsJsonImages: imageContainerResolvers,
    MdxFrontmatter: { images: withSlug("MdxFrontmatterImages") },
    MdxFrontmatterImages: imageContainerResolvers,
  });
};
