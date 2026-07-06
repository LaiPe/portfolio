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
 */
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    actions.createTypes(`
      type ProjectsJson implements Node {
        images: ProjectsJsonImages
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
    `);
  };

/**
 * Resolvers pour les images co-localisées.
 * ProjectsJson.images injecte `_slug` dans l'objet retourné pour que les
 * sous-resolvers (thumbnail/hero/gallery) puissent construire le relativePath
 * sans accès direct au nœud parent.
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
    ProjectsJson: {
      images: {
        type: "ProjectsJsonImages",
        resolve(source: any) {
          if (!source.images) return null;
          return { ...source.images, _slug: source.slug };
        },
      },
    },
    ProjectsJsonImages: {
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
