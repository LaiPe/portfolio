# Portfolio — Léo Peyronnet

Portfolio personnel, site statique construit avec **Gatsby 5 + TypeScript**.

> Migré depuis React Router v7. Documentation interne : [CLAUDE.md](CLAUDE.md) (guide projet) et
> [PATTERN.md](PATTERN.md) (patterns Gatsby).

## Prérequis

- Node ≥ 18
- npm

## Installation

```bash
npm install
```

## Scripts

| Commande | Description |
|---|---|
| `npm run develop` | Serveur de dev — http://localhost:8000 (GraphiQL : http://localhost:8000/___graphql) |
| `npm run build` | Build statique de production dans `public/` |
| `npm run serve` | Sert le build localement — http://localhost:9000 |
| `npm run clean` | Vide `.cache/` et `public/` |
| `npm run typecheck` | Vérification TypeScript (`tsc --noEmit`) |
| `npm run lint` | ESLint |

## Stack

Gatsby 5 · React 19 · TypeScript · GraphQL (typegen intégré) · gatsby-plugin-image + Sharp ·
gatsby-transformer-json / -remark · CSS Modules · react-hook-form · ogl (WebGL).

## Structure (résumé)

```
gatsby-config.ts / gatsby-node.ts / gatsby-ssr.tsx / gatsby-browser.tsx
src/pages/        routing par fichier (dont projets/{ProjectsJson.slug}.tsx)
src/components/   composants (Layout, Seo, GatsbyImage, etc.)
src/data/         contenu JSON + descriptions Markdown
src/images/       images optimisées par Sharp
static/           assets servis tels quels : /img (logos, favicons), /resources (PDF)
```

Voir [CLAUDE.md](CLAUDE.md) pour le détail (modèle de données, conventions, pièges SSR).

## Déploiement

`npm run build` génère un dossier `public/` 100 % statique, déployable sur n'importe quel
hébergeur de fichiers statiques (Netlify, Cloudflare Pages, GitHub Pages, Nginx…).
