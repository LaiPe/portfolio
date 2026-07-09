# PATTERN.md — Patterns Gatsby de ce projet

Mémo des patterns Gatsby 5 utilisés, avec extraits réels et liens vers la doc officielle.
À lire/mettre à jour quand on touche à l'architecture. Voir aussi [CLAUDE.md](CLAUDE.md).

---

## 1. Routing par fichier + collection route `{Type.field}`

Chaque fichier de `src/pages/` est une route. Pour générer une page par node, on nomme le
fichier `{TypeGraphQL.champ}.tsx` : Gatsby crée une page par node et injecte `$id` dans la requête.

```
src/pages/projets/{Mdx.frontmatter__slug}.tsx   ->  /projets/:slug
```

```tsx
export const query = graphql`
  query ProjectDetail($id: String!) {
    mdx(id: { eq: $id }) { frontmatter { title slug ... } }
  }
`;
```

Une collection route sur un champ **imbriqué** se nomme avec `__` (double underscore) :
`{Mdx.frontmatter__slug}` cible `frontmatter.slug`.

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

## 5. ⭐ Images co-localisées : nom de fichier frontmatter → image optimisable

Les images d'un projet vivent dans `src/content/projects/<slug>/images/` ; le frontmatter ne
stocke que des **noms de fichiers** (`hero: eb-thumbnail.jpg`). Pour passer par Sharp il faut un
`File` node. On résout via `createResolvers` (`gatsby-node.ts`) : `MdxFrontmatter.images` injecte
`_slug`, et les sous-resolvers construisent le `relativePath` `<slug>/images/<file>` :

```ts
const findImage = (context, slug, filename) => context.nodeModel.findOne({
  type: "File",
  query: { filter: {
    sourceInstanceName: { eq: "projects-content" },
    relativePath: { eq: `${slug}/images/${filename}` },
  }},
});

createResolvers({
  MdxFrontmatter: {                       // injecte _slug dans le conteneur images
    images: { type: "MdxFrontmatterImages",
      resolve: (s) => s.images ? { ...s.images, _slug: s.slug } : null },
  },
  MdxFrontmatterImages: {                 // hero/thumbnail/gallery -> File via findImage
    hero:    { type: "File",   resolve: (s, _, ctx) => s.hero  && findImage(ctx, s._slug, s.hero) },
    gallery: { type: "[File]", resolve: (s, _, ctx) =>
      Array.isArray(s.gallery) ? Promise.all(s.gallery.map(f => findImage(ctx, s._slug, f))) : null },
  },
});
```

On passe par `createResolvers` (et non une field extension `@…`) car le resolver a besoin du
`slug` du projet (frère de `images` dans le frontmatter) pour bâtir le chemin.
Doc : <https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createResolvers>

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

## 7. Prose : MDX (pages projet) et `MarkdownText` (inline JSON)

La prose des projets est le **corps MDX** (`index.mdx`), rendue par React via `children` — plus
de `dangerouslySetInnerHTML` ni de `gatsby-transformer-remark` (retiré). Voir §11.

Pour du Markdown **inline** trivial stocké en JSON (gras/italique d'`about.json`), on utilise le
petit composant maison `MarkdownText` plutôt qu'une dépendance (`react-markdown` a été retiré).

---

## 8. Relier deux types de nodes par `@link` *(retiré)*

Pattern utilisé à l'époque où la description vivait dans un `.md` séparé : `onCreateNode` posait
un `fields.slug` sur le `MarkdownRemark`, relié via `ProjectsJson.description @link(by: "fields.slug")`.
**Supprimé avec la migration MDX** (§11) : prose et données vivent désormais dans un seul `index.mdx`,
donc plus aucune jointure inter-nodes à maintenir. `@link` reste la technique Gatsby de référence
pour une clé étrangère si le besoin réapparaît.
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

## 11. ⭐ Pages projet en MDX (frontmatter typé + banque de composants)

Les pages projet migrent de `ProjectsJson` (`index.json` + `description.md`) vers **un seul
`index.mdx` par projet** : frontmatter (données structurées) + corps (prose + composants).
Motivation : supprimer la dette de deux sources de vérité désynchronisées. Contrat complet
(frontière frontmatter/corps, banque fermée) : [docs/mdx-projects-contract.md](docs/mdx-projects-contract.md).

**Route collection** — `src/pages/projets/{Mdx.frontmatter__slug}.tsx`. Comme §1 mais
sur le node `Mdx` ; le corps compilé arrive en **`children`** (plus de `<MDXRenderer>`) :

```tsx
export default function Page({ data, children }: PageProps<Data> & { children: React.ReactNode }) {
  return (<>{/* hero + sidebar depuis data.mdx.frontmatter */}
    <ProjectProvider project={data.mdx.frontmatter}>{children}</ProjectProvider>
  </>);
}
```

**Frontmatter typé explicitement** (`gatsby-node.ts`) — obligatoire : sur un unique node,
un champ `null` (ex. `client: null`) casse l'inférence. On déclare `MdxFrontmatter` (scalaires
inclus) et on **factorise le resolver d'images** avec `ProjectsJson` (même convention
`slug/images/<file>`, cf. §5) :

```ts
type MdxFrontmatter { client: String  images: MdxFrontmatterImages  architecture: … }
// createResolvers : MdxFrontmatter.images et ProjectsJson.images partagent findImage()
```

**Composants → import direct** (PAS `MDXProvider`). Chaque `.mdx` importe depuis le barrel,
après le frontmatter :

```mdx
import { Features, Feature, Architecture, Gallery, Callout } from "../../../components/projects/mdx";
```

L'import direct est explicite, n'importe que le nécessaire, et se rend de façon fiable dans tous
les contextes (les composants via `MDXProvider`/shortcodes échouent dans certains, ex. RSS). La
banque reste fermée *par convention* (un répertoire `src/components/projects/mdx/`, un barrel).

**Donnée de page → contexte React.** Les composants pilotés par la donnée résolue par GraphQL
(`Architecture`, `Gallery`, `Testimonial`) lisent `useProject()` — un contexte posé par le template.
Raison : dans le corps MDX seule la frontmatter *brute* est joignable (`props.pageContext.frontmatter`),
**pas** les données résolues, or `<Gallery>` a besoin des images **Sharp** (`IGatsbyImageData`).
Le contexte fournit cette donnée ambiante sans faire fuiter `props.pageContext…` dans le contenu.

**Ce qui devient de la prose / du markdown natif** : les listes de phrases (`highlights`, `useCases`,
`skills`, `challenges` textuels) ne sont PAS des composants — `## Titre` + puces, stylées par
`.body` (`mdx.module.css`). Seuls `features` (grille à icônes) et `architecture` (grille imbriquée)
restent des composants. `problem`/`results` : supprimés (0 usage).

Doc : <https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/> et
<https://www.gatsbyjs.com/docs/how-to/routing/mdx/>

> **Migration terminée** : `Mdx` est le seul pipeline projet. L'ancien (`ProjectsJson` +
> `description.md` + `gatsby-transformer-remark` + template `{ProjectsJson.slug}.tsx` +
> `ProjectDetail*`) a été entièrement retiré. Les listes/accueil interrogent `allMdx`.

---

## 12. ⭐ Composant responsive **sans hydratation** : mode par `pathname`, breakpoints en CSS

Règle : **rien de mesuré côté client n'entre dans le rendu**. Un composant présent sur toutes les
pages (ici le `Header`) doit s'afficher correctement dès le HTML statique, JS désactivé. On sépare
donc deux axes :

- **Mode métier (ex. homepage vs. défaut)** → dérivé de `pathname`, **connu au SSR** (fourni par
  `wrapPageElement` → `Layout location={props.location}`, cf. §4). Pilote une classe.
- **Breakpoint desktop/mobile** → **pure media query CSS**. Le serveur n'a pas à connaître le
  viewport : le navigateur tranche au parse, sans JS.

```tsx
// Header.tsx — le mode vient de pathname (SSR), pas d'une mesure de viewport.
const isHomepage = pathname === "/";
return <header className={isHomepage ? `${styles.header} ${styles.index}` : styles.header}> … </header>;
```

**Anti-pattern corrigé** : piloter le layout via un hook `useViewport` (qui initialise à `0` pour
rester SSR-safe, cf. gotcha hydratation) fait rendre **toujours la version mobile** au build, puis
JS « corrige » après hydratation → flash visible. On sort donc le viewport du chemin de rendu ;
l'API React ne sert plus qu'à l'**interaction** (ouverture du menu), en amélioration progressive.

**Image responsive sans JS ni double-fetch** — `<picture>` + `<source media>` : le navigateur ne
télécharge que la source retenue.

```tsx
<picture>
  <source media="(min-width: 1025px)" srcSet="/img/logo-lp.png" />   {/* grand logo desktop */}
  <img className={styles.homeLogo} src="/img/logo-lp-raw.png" alt="Logo" /> {/* compact mobile */}
</picture>
```

**Éléments d'interaction toujours dans le DOM, masqués en CSS** (pas de `{!isDesktop && …}`) : le
burger est rendu au build et caché par media query (`.toggle { display: none }` par défaut, révélé
en `@media (max-width: 1024px)`). L'ouverture reste du `useState`.

**Edge-case resize (A2)** : comme `openedNav` peut rester vrai si on élargit la fenêtre menu ouvert,
un `matchMedia` ferme le menu (et relâche le verrou de scroll) en repassant desktop — hors chemin
de rendu, donc sans impact SSR :

```tsx
useEffect(() => {
  const mq = window.matchMedia("(min-width: 1025px)");
  const handle = () => { if (mq.matches) setOpenedNav(false); };
  handle(); mq.addEventListener("change", handle);
  return () => mq.removeEventListener("change", handle);
}, []);
```

⚠️ **Piège de spécificité** : une classe conditionnelle désormais posée à *tous* les breakpoints
(`.index` depuis `isHomepage`, alors qu'avant elle n'existait qu'en desktop) doit être **neutralisée
en mobile avec des sélecteurs de spécificité ≥**. `.header.index > a { … }` (desktop) l'emporte sur
`.header > a { … }` d'une media query mobile → il faut réécrire le reset en `.header.index > a`.

Doc : <https://developer.mozilla.org/fr/docs/Web/HTML/Element/picture> ·
<https://developer.mozilla.org/fr/docs/Web/API/Window/matchMedia>

---

## 13. ⭐ Polices self-hostées : Fontsource variable + preload + stacks centralisés

Objectif : réduire le flash au chargement (FOUT) sans retirer les fallbacks, sans solution JS.

**Self-hosting via `@fontsource-variable`** — un paquet npm par famille, livrant les **woff2
variables** (un seul fichier couvre tout l'axe de graisse). On importe le CSS d'axe dans
`Layout.tsx` (bundlé pour SSR + browser) :

```tsx
import "@fontsource-variable/jura/wght.css";
import "@fontsource-variable/montserrat/wght.css";
import "@fontsource-variable/montserrat/wght-italic.css";
```

⚠️ Les paquets variables nomment la famille **`"… Variable"`** (`"Jura Variable"`,
`"Montserrat Variable"`) et posent `font-display: swap`. Le CSS contient un `@font-face` par
sous-ensemble Unicode (`unicode-range`) → le navigateur ne télécharge que le latin pour du FR.

**Stacks centralisés en variables CSS** (`theme.css`) — une seule source de vérité, référencée
partout via `font-family: var(--font-heading)` (finies les ~15 déclarations `"Jura", sans-serif`) :

```css
:root {
  --font-body: "Montserrat Variable", sans-serif;
  --font-heading: "Jura Variable", sans-serif;
}
```

**Preload des latins critiques** (`gatsby-ssr.tsx`) — on importe l'**URL** du woff2 (webpack la
hashe) et on émet un `<link rel="preload">`. Le fichier importé a le **même contenu → même hash**
que l'`url()` des `@font-face` Fontsource, donc **pas de double téléchargement** :

```tsx
import montserratLatin from "@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2";
// onRenderBody → setHeadComponents([...])
<link rel="preload" as="font" type="font/woff2" href={montserratLatin} crossOrigin="anonymous" />
```

Importer un `.woff2` en TS exige une déclaration ambiante (`src/css-modules.d.ts`) :
`declare module "*.woff2" { const url: string; export default url; }`.

**Vérification au build** (indispensable — un module CSS invalide passe `tsc` mais casse au build) :
`grep` sur `public/index.html` doit montrer les `rel="preload"` **et** un href identique à l'`url()`
du `@font-face` dans `public/*.css` (même hash = fichier unique).

> **Fallback à métriques ajustées : écarté.** On avait généré (capsize) des `@font-face` de
> fallback avec `size-adjust`/`ascent-override`/… pour annuler le décalage de layout au swap.
> Retiré : trop de machinerie (script + devDeps) pour un gain marginal une fois les woff2 petits
> préchargés. Réintroductible via `@capsizecss/core` + `@capsizecss/metrics` si le CLS au swap
> redevient gênant.

Doc : <https://fontsource.org/docs/getting-started/introduction> ·
<https://www.gatsbyjs.com/docs/how-to/styling/using-local-fonts/>

---

## 14. Warnings « Conflicting order » de mini-css-extract-plugin

Au `develop`/`build`, webpack émet des `warn chunk commons [mini-css-extract-plugin]
Conflicting order` : deux CSS Modules (ex. `mdx.module.css` vs `GalleryModal.module.css`,
`Button.module.css` vs `Badge.module.css`) sont importés dans un **ordre différent** selon les
pages, et le plugin ne peut pas choisir un ordre déterministe pour le fichier CSS concaténé.

**Pourquoi c'est un faux positif ici** : nos styles sont des **CSS Modules** (classes scopées
localement, cf. gotcha « exports nommés »). Deux modules ne partagent donc pas de sélecteur global
dont le gagnant dépendrait de l'ordre source → l'ordre d'inclusion est sans effet visuel. Le warning
n'a de sens que si deux modules redéfinissent le **même** sélecteur global (pas notre cas).

**Correctif** — poser `ignoreOrder: true` sur l'instance du plugin via `onCreateWebpackConfig`
(`gatsby-node.ts`). On récupère la config webpack, on trouve le plugin par nom de constructeur, on
mute l'option, puis `replaceWebpackConfig` :

```ts
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions, getConfig }) => {
  const config = getConfig();
  const miniCssExtractPlugin = config.plugins?.find(
    (p: any) => p?.constructor?.name === "MiniCssExtractPlugin"
  );
  if (miniCssExtractPlugin) {
    miniCssExtractPlugin.options.ignoreOrder = true;
    actions.replaceWebpackConfig(config);
  }
};
```

⚠️ Ne pas confondre avec un vrai bug de cascade : si un jour un style *global* (non-module) dépend
de l'ordre, `ignoreOrder` masquerait le symptôme. Tant que la règle « un style = un CSS Module scopé »
tient, c'est sûr. L'alternative (normaliser l'ordre des imports partout) est fragile et sans bénéfice.

> **À part** : le message `'WMIC' n'est pas reconnu` au démarrage vient de gatsby-telemetry qui
> lit le nombre de CPU via `WMIC` (retiré des Windows 11 récents). Sans effet sur le build ;
> `npx gatsby telemetry --disable` le fait disparaître.

Doc : <https://webpack.js.org/plugins/mini-css-extract-plugin/#remove-order-warnings> ·
<https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#onCreateWebpackConfig>

---

## Gotchas rencontrés

- **CSS Modules = exports nommés** : css-loader (config Gatsby) expose chaque classe en export
  nommé, pas en export par défaut. Consommer avec `import * as styles from "./x.module.css"`
  (`import styles from` donnerait `undefined` au SSR : « Cannot read properties of undefined »).
  La déclaration TS dans `src/css-modules.d.ts` utilise `export =` pour rester indexable.
- **Classes CSS = mots réservés JS** : une classe `.default` génère `export var default` (illégal).
  Renommer (ici `.defaultVariant`).
- **Champs absents / toujours `null`** : un champ jamais présent (ex. `problem`, `results`) ou
  `null` sur tous les nodes (ex. `client: null` sur l'unique node MDX pilote) n'existe pas dans le
  schéma inféré → requête en échec. On le déclare explicitement dans `createTypes` (cf. §11).
- **Hydratation** : ne pas lire `window` dans un initialiseur `useState` (mismatch SSR/CSR).
  Corollaire : ne pas faire dépendre le *rendu* d'une mesure de viewport — préférer `pathname` (SSR)
  + media queries CSS, et réserver l'API React à l'interaction (cf. §12).
- **Classe CSS Module inexistante = erreur au build, invisible à `tsc`** : `styles.foo` où `.foo`
  n'est pas défini dans le `.module.css` compile sans broncher (le type est `{ [k]: string }`) mais
  casse le build webpack (`'foo' is not exported from './x.module.css'`). Piège classique après un
  refacto qui passe une classe (`.nav`) en sélecteur d'élément (`.header nav`). **Vérifier par un
  vrai `npm run build`, pas seulement `typecheck`.**
