# PATTERN.md — Patterns Gatsby de ce projet

Mémo des patterns Gatsby 5 utilisés, avec extraits réels et liens vers la doc officielle.
À lire/mettre à jour quand on touche à l'architecture. Voir aussi [CLAUDE.md](CLAUDE.md).

---

## 1. Routing par fichier + collection route `{Type.field}`

Chaque fichier de `src/pages/` est une route. Pour générer une page par node, on nomme le
fichier `{TypeGraphQL.champ}.tsx` : Gatsby crée une page par node et injecte `$id` dans la requête.

```
src/pages/projets/{ProjectsJson.slug}.tsx   ->  /projets/:slug
```

```tsx
export const query = graphql`
  query ProjectDetail($id: String!) {
    projectsJson(id: { eq: $id }) { title slug ... }
  }
`;
```

Doc : <https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/>

---

## 2. `useStaticQuery` vs requête de page

- **Requête de page** (`export const query`) : peut prendre des variables (`$id`), réservée aux
  fichiers de `src/pages/`. La donnée arrive en `props.data`. Utilisée ici pour les projets
  (`index.tsx`, `projets/index.tsx`, `{ProjectsJson.slug}.tsx`).
- **`useStaticQuery`** : sans variables, utilisable dans n'importe quel composant, mais une seule
  par fichier. (Non utilisé ici — les singletons passent par import JSON direct, voir §10.)

Doc : <https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/>

---

## 3. Gatsby Head API + composant `Seo`

Le `<head>` se définit par un export `Head` (et non plus `<title>` inline ou react-helmet).

```tsx
// src/components/Seo.tsx — composant pur (PAS de hooks dans un Head !)
export default function Seo({ title, description, image, children }: SeoProps) {
  return (<>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    {description && <meta name="description" content={description} />}
    {children}
  </>);
}
```
```tsx
// dans une page
export const Head: HeadFC = () => (
  <Seo title="Mes Projets | Léo Peyronnet" description="..." />
);
// avec données de page :
export const Head = ({ data }: HeadProps<DataType>) => <Seo title={data.projectsJson.title} />;
```

⚠️ Un composant `Head` ne peut pas utiliser `useStaticQuery`/hooks → tout passe en props (ou via
`data`/`pageContext` que Gatsby fournit).
Doc : <https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/>

---

## 4. Layout persistant via `wrapPageElement`

Au lieu d'importer un Layout dans chaque page, on l'applique globalement. Le wrapper est défini
une fois et réexporté par `gatsby-ssr.tsx` et `gatsby-browser.tsx` (sinon le Layout serait démonté
entre les navigations).

```tsx
// src/gatsby-shared.tsx
export const wrapPageElement = ({ element, props }: WrapPageElementBrowserArgs) =>
  <Layout location={props.location}>{element}</Layout>;
```

Les CSS globaux sont importés dans `Layout.tsx` ; la langue du document et les favicons sont posés
dans `gatsby-ssr.tsx` via `onRenderBody` (`setHtmlAttributes`, `setHeadComponents`).
Doc : <https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/>

---

## 5. ⭐ Field extension : chemin string JSON → image optimisable

Le pattern le plus délicat de la migration. Les JSON stockent des chemins string
(`"/img/projects/x/y.png"`). Pour passer par Sharp, il faut un `File` node. On crée une field
extension custom qui résout le string vers le `File` de `src/images` (`gatsby-node.ts`) :

```ts
createFieldExtension({
  name: "imageByPath",
  extend: () => ({
    resolve(source, _args, context, info) {
      const value = source[info.fieldName];          // string ou string[]
      if (!value) return null;
      const findFile = (p: string) => context.nodeModel.findOne({
        type: "File",
        query: { filter: {
          sourceInstanceName: { eq: "images" },
          relativePath: { eq: p.replace(/^\/img\//, "") },  // "/img/x" -> "x"
        }},
      });
      return Array.isArray(value) ? Promise.all(value.map(findFile)) : findFile(value);
    },
  }),
});

createTypes(`
  type ProjectsJsonImages {
    thumbnail: File @imageByPath
    hero: File @imageByPath
    gallery: [File] @imageByPath
  }
`);
```

Alternative native si on peut rendre les chemins relatifs au fichier JSON : extension
intégrée `@fileByRelativePath`. Ici on garde les chemins `/img/...` intacts via l'extension custom.
Doc : <https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createSchemaCustomization>
et <https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#creating-custom-extensions>

---

## 6. `<GatsbyImage>` / `<StaticImage>`

- **Donnée dynamique** : on interroge `gatsbyImageData` puis on lit le champ directement
  (pas besoin de `getImage` quand on a déjà l'objet `gatsbyImageData`) :

```tsx
const thumbnail = project.images?.thumbnail?.childImageSharp?.gatsbyImageData;
{thumbnail && <GatsbyImage image={thumbnail} alt={project.title} />}
```
```graphql
thumbnail { childImageSharp { gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 600) } }
```

- **Image fixe** (chemin littéral connu à la compilation) : `<StaticImage>` (ex. photo de profil
  dans `apropos.tsx`) — `src` doit être un littéral statique :

```tsx
<StaticImage src="../images/a-propos/profile.jpg" alt="..." placeholder="blurred" width={400} />
```

Doc : <https://www.gatsbyjs.com/docs/how-to/images-and-media/using-gatsby-plugin-image/>

---

## 7. Markdown : `gatsby-transformer-remark` (vs react-markdown)

Les descriptions de projet sont des fichiers `.md` transformés en HTML par remark, reliés au projet
par slug (`@link`, voir §8), et rendus via `dangerouslySetInnerHTML` :

```tsx
{project.description?.html && (
  <div dangerouslySetInnerHTML={{ __html: project.description.html }} />
)}
```

Pour du Markdown inline trivial stocké en JSON (gras/italique d'`about.json`), on utilise le petit
composant maison `MarkdownText` plutôt qu'une dépendance (`react-markdown` a été retiré).
Doc : <https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/>

---

## 8. Relier deux types de nodes par `@link`

On donne un `fields.slug` aux `MarkdownRemark` (depuis le nom de fichier) dans `onCreateNode`, puis
on relie `ProjectsJson.description` au markdown partageant ce slug :

```ts
// onCreateNode : MarkdownRemark.fields.slug = nom du fichier .md
actions.createNodeField({ node, name: "slug", value: fileNode.name });
```
```graphql
type ProjectsJson implements Node {
  description: MarkdownRemark @link(by: "fields.slug", from: "slug")
}
```

Doc : <https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#foreign-key-fields>

---

## 9. GraphQL Typegen + TypeScript

`graphqlTypegen: true` (gatsby-config) génère `src/gatsby-types.d.ts` pendant `gatsby develop` :
types `Queries.*` disponibles globalement (nommer les requêtes en PascalCase, ex. `query HomePage`).
Le fichier est **généré** → gitignored et exclu du lint.

> Dans ce projet on type plutôt via `src/types.ts` (interfaces métier) pour que `tsc` passe même
> sans le fichier généré ; on peut basculer vers `PageProps<Queries.HomePageQuery>` une fois
> `develop` lancé. Fragments réutilisables : voir `ProjectCardData` dans `ProjectCard.tsx`.

Doc : <https://www.gatsbyjs.com/docs/how-to/local-development/graphql-typegen/>

---

## 10. Data layer GraphQL **ou** import JSON direct ?

| Utiliser… | Quand | Exemple ici |
|---|---|---|
| **GraphQL** | données nécessitant images Sharp, génération de pages, requêtes/tri/filtre | `projects` |
| **Import direct** (`import x from "../data/x.json"`) | config/singletons, clés dynamiques, pas d'image Sharp | `socials`, `skills`, `about`, `testimonials` |

GraphQL impose une sélection de champs explicite et ne gère pas bien les objets à clés dynamiques
(`skills: { frontend: {...} }`) ni les tableaux hétérogènes (`string | objet`). Pour ces cas,
l'import direct est plus simple et tout aussi valide en Gatsby.

---

## Gotchas rencontrés

- **CSS Modules = exports nommés** : css-loader (config Gatsby) expose chaque classe en export
  nommé, pas en export par défaut. Consommer avec `import * as styles from "./x.module.css"`
  (`import styles from` donnerait `undefined` au SSR : « Cannot read properties of undefined »).
  La déclaration TS dans `src/css-modules.d.ts` utilise `export =` pour rester indexable.
- **Classes CSS = mots réservés JS** : une classe `.default` génère `export var default` (illégal).
  Renommer (ici `.defaultVariant`).
- **Champs absents de tout JSON** : un champ jamais présent (ex. `problem`, `results`) n'existe pas
  dans le schéma inféré → requête en échec. On les déclare explicitement dans `createTypes`.
- **Hydratation** : ne pas lire `window` dans un initialiseur `useState` (mismatch SSR/CSR).
