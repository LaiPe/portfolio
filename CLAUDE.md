# CLAUDE.md

Guide pour travailler sur ce dépôt. Voir [PATTERN.md](PATTERN.md) pour le catalogue
détaillé des patterns Gatsby (avec extraits de code et liens vers la doc officielle).

## Présentation

Portfolio de Léo Peyronnet — site statique (SSG) construit avec **Gatsby 5 + TypeScript**.
Le site a été migré depuis une SPA React Router v7 ; il génère désormais une page HTML
statique par route, avec images optimisées (Sharp) et données issues d'une couche GraphQL.

## Stack

| Domaine | Choix |
|---|---|
| Framework | Gatsby `^5.16` (SSG), React `19` |
| Langage | TypeScript (`strict`), GraphQL Typegen intégré (`graphqlTypegen: true`) |
| Données | `gatsby-source-filesystem` + `gatsby-transformer-json` + `gatsby-plugin-mdx` (pages projet) |
| Images | `gatsby-plugin-image` + `gatsby-plugin-sharp` + `gatsby-transformer-sharp` |
| Styles | CSS Modules (`*.module.css`) + CSS globaux (`src/assets/css`) |
| Divers | `react-hook-form` (contact), `ogl` (fond WebGL `Threads`) |

## Commandes

```bash
npm run develop     # serveur de dev (http://localhost:8000, GraphiQL sur /___graphql)
npm run build       # build statique de production -> public/
npm run serve       # sert le build (http://localhost:9000)
npm run clean       # vide .cache et public
npm run typecheck   # tsc --noEmit
npm run lint        # eslint .
```

Node ≥ 18 requis.

## Arborescence

```
gatsby-config.ts          # plugins, siteMetadata, graphqlTypegen
gatsby-node.ts            # schéma GraphQL custom (MdxFrontmatter) + resolvers images projet
gatsby-ssr.tsx            # onRenderBody (lang fr + favicons) + wrapPageElement
gatsby-browser.tsx        # wrapPageElement
src/
  gatsby-shared.tsx       # wrapPageElement partagé -> <Layout>
  types.ts                # types métier (Project, Testimonial, SocialLink…)
  css-modules.d.ts        # déclarations TS pour les imports *.module.css / *.css
  components/             # Layout, Seo, MarkdownText, common/, projects/, skills/, services/, spinner/, backgrounds/
  layouts/                # header/, footer/
  pages/                  # routing par fichier (voir ci-dessous)
  hooks/useViewport.ts
  data/                   # JSON + descriptions Markdown (source GraphQL + imports directs)
  images/                 # images optimisées par Sharp (projets, profil)
  assets/                 # css globaux (css/theme.css, css/fonts.css), css/pages/*.module.css, polices
static/                   # servi tel quel à la racine : /img (logos, favicons, icônes), /resources (PDF)
```

## Routing (File System Route API)

Chaque fichier de `src/pages/` devient une route :

| Fichier | URL |
|---|---|
| `index.tsx` | `/` |
| `projets/index.tsx` | `/projets` |
| `projets/{Mdx.frontmatter__slug}.tsx` | `/projets/:slug` (une page par projet, node MDX) |
| `apropos.tsx` | `/apropos` |
| `services.tsx` | `/services` |
| `contact.tsx` | `/contact` |
| `redirect.tsx` | `/redirect` |
| `404.tsx` | page 404 |

> Les `*.module.css` des pages vivent dans `src/assets/css/pages/` (ex. `HomePage.module.css`,
> `ProjectsPage.module.css`), à côté des CSS globaux. Ils y sont importés depuis le fichier de
> route correspondant dans `src/pages/`.

## Modèle de données

### Couche GraphQL (projets) — MDX
Chaque projet est **un seul fichier** `src/content/projects/<slug>/index.mdx` : frontmatter
(données structurées) + corps (prose + composants de la banque). Voir le pattern complet dans
[PATTERN.md](PATTERN.md) §11 et le contrat [docs/mdx-projects-contract.md](docs/mdx-projects-contract.md).

- **`Mdx` / `MdxFrontmatter`** : un node par `index.mdx`. Le frontmatter est **typé
  explicitement** dans `gatsby-node.ts` (sinon un champ `null` partout casse l'inférence).
- **Images** : `images.{thumbnail,hero,gallery}` (noms de fichiers) sont résolus en `File` nodes
  de `<slug>/images/` par des resolvers custom (`gatsby-node.ts`), exposant
  `childImageSharp.gatsbyImageData`.
- **Corps MDX** : rendu via `children` dans le template `{Mdx.frontmatter__slug}.tsx`. Les
  composants de la banque s'**importent directement** (`src/components/projects/mdx/`) ; ceux
  pilotés par la donnée de page lisent le contexte `useProject()`.
- Le fragment réutilisable **`ProjectCardData`** (sur `MdxFrontmatter`, défini dans
  `ProjectCard.tsx`) sert aux listes : `allMdx { nodes { frontmatter { ...ProjectCardData } } }`.

### Imports JSON directs (config / singletons)
`socials.json`, `skills.json`, `skills-complete.json`, `testimonials.json`, `about.json` et
`services/*.json` sont importés directement (`import data from "../data/x.json"`). Raison :
données de configuration à clés dynamiques (mauvais candidats pour GraphQL) et sans image Sharp.
Voir le pattern « data layer vs import direct » dans [PATTERN.md](PATTERN.md).

## Conventions

- **SEO** : chaque page exporte `Head` (Gatsby Head API) qui rend `<Seo>` (`src/components/Seo.tsx`).
  Un composant `Head` **ne peut pas** utiliser de hooks (`useStaticQuery`…) → tout passe en props.
- **Liens** : `Link` / `navigate` de `gatsby` (jamais `react-router`).
- **Images** : `<GatsbyImage image={node.childImageSharp.gatsbyImageData} />` pour les images
  issues de données ; `<StaticImage>` pour les images fixes (ex. photo de profil).
- **Layout** : appliqué globalement via `wrapPageElement` (pas d'import de Layout par page).

## Pièges SSR / hydratation (important)

- `useViewport` initialise **toujours** `{width:0,height:0}` (jamais `window.innerWidth` dans
  l'initialiseur) pour éviter un mismatch d'hydratation ; la vraie taille est mesurée en `useEffect`.
  Conséquence : le `Header`/sidebar s'affiche d'abord en version mobile puis bascule en desktop.
- Le composant `Threads` (WebGL `ogl`) n'instancie le renderer que dans `useEffect` (client only).
- Tout accès à `window`/`document` doit rester dans `useEffect` ou un gestionnaire d'événement.
- **CSS Modules** : css-loader (config Gatsby) émet des **exports nommés**. On consomme donc les
  modules avec `import * as styles from "./x.module.css"` (pas `import styles from`), et la
  déclaration TS ([css-modules.d.ts](src/css-modules.d.ts)) les expose via `export =` (objet
  indexable). Une classe nommée comme un mot réservé JS (ex. `.default`) ne peut pas devenir un
  export nommé → la renommer (ex. `.defaultVariant`).

## Déploiement

Build statique : `npm run build` produit `public/`, à servir par n'importe quel hébergeur statique.
`public/`, `.cache/` et `src/gatsby-types.d.ts` (généré) sont gitignorés.
