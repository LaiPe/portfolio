import type { GatsbyNode } from "gatsby";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Ajoute un champ `fields.slug` aux nodes MarkdownRemark, dérivé du nom du
 * fichier de description (ex. `drums-please.md` → slug `drums-please`).
 * Ce slug sert de clé de jointure avec les projets (voir @link plus bas).
 */
export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  getNode,
  actions,
}) => {
  if (node.internal.type !== "MarkdownRemark") return;

  const fileNode = node.parent ? getNode(node.parent) : undefined;
  if (fileNode?.name) {
    actions.createNodeField({
      node,
      name: "slug",
      value: fileNode.name as string,
    });
  }
};

/**
 * Personnalisation du schéma GraphQL :
 *  - field extension `@imageByPath` : résout un chemin string (ex.
 *    "/img/projects/x/y.png") stocké dans le JSON vers le File node
 *    correspondant dans `src/images`, ouvrant l'accès à childImageSharp.
 *  - `ProjectsJson.images.*` typés en `File` pour gatsby-plugin-image.
 *  - `ProjectsJson.description` lié au MarkdownRemark par slug (@link).
 */
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes, createFieldExtension } = actions;

    createFieldExtension({
      name: "imageByPath",
      extend: () => ({
        resolve(source: Record<string, unknown>, _args: unknown, context: any, info: any) {
          const value = source[info.fieldName] as string | string[] | undefined;
          if (!value) return null;

          const findFile = (p: string) =>
            context.nodeModel.findOne({
              type: "File",
              query: {
                filter: {
                  sourceInstanceName: { eq: "images" },
                  relativePath: { eq: p.replace(/^\/img\//, "") },
                },
              },
            });

          return Array.isArray(value)
            ? Promise.all(value.map(findFile))
            : findFile(value);
        },
      }),
    });

    // `problem` et `results` ne figurent dans aucun JSON : on les déclare
    // explicitement pour qu'ils restent interrogeables (null) sans casser le build.
    createTypes(`
      type ProjectsJson implements Node {
        images: ProjectsJsonImages
        description: MarkdownRemark @link(by: "fields.slug", from: "slug")
        problem: String
        results: [String]
      }
      type ProjectsJsonImages {
        emoji: String
        thumbnail: File @imageByPath
        hero: File @imageByPath
        gallery: [File] @imageByPath
      }
    `);
  };
