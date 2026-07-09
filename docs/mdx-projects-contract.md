# Contrat — Pages projet en MDX

> **Statut : en production.** Les 8 projets sont migrés ; `Mdx` est le seul pipeline
> (ancien `ProjectsJson` supprimé). Ce document reste la référence détaillée de la frontière
> frontmatter / corps et de la banque **fermée** ; la synthèse opérationnelle est dans
> [PATTERN.md](../PATTERN.md) §11.

## 1. Le principe directeur (la règle qui tranche tout)

Une seule question décide où va chaque donnée :

> **Cette donnée est-elle consommée _ailleurs_ que sur la page de détail ?**

- **OUI → frontmatter** (entête YAML). Données requêtées par les listes, la navigation
  inter-projets, le SEO, la sidebar. Elles doivent rester structurées et requêtables en
  GraphQL sans parser le corps MDX.
- **NON → corps MDX** (prose + composants). Contenu rendu _uniquement_ sur la page de
  détail. On le co-localise et on l'ordonne librement : c'est là qu'est le gain.

**Une seule exception délibérée** : `architecture` (voir §4). Donnée de référence trop
imbriquée pour du JSX agréable → reste en frontmatter, typée explicitement.

Corollaire : **une seule source de vérité par projet** = un dossier, un fichier `index.mdx`.
Fini le couple `index.json` + `description.md` désynchronisé.

---

## 2. Frontmatter — schéma (données consommées ailleurs)

```yaml
---
id: electricity-business            # identifiant stable (jointure témoignages)
title: Electricity Business
slug: electricity-business
category: caseStudy                 # client | product | caseStudy | experiment
categoryLabel: Étude de cas
shortDescription: Plateforme complète de gestion de stations de recharge…
technologies: [React, Spring Boot, Docker, Java, MySQL, MongoDB]
featured: true
priority: 4
date: Janvier 2026
duration: 2 mois
client: null                        # string | null
images:
  thumbnail: eb-thumbnail.jpg       # noms de fichiers (résolus Sharp via resolver, cf. §5)
  hero: eb-thumbnail.jpg
  gallery: [eb-1.png, eb-2.png, eb-3.png, eb-4.png]
  icon: null                        # clé lucide-react en fallback si pas de hero (cf. src/components/common/Icon)
links:
  live: https://…
  demo: null
  github: https://…
  pdf: null
architecture:                       # OPTIONNEL — exception §4
  backend: { framework: …, language: …, security: …, orm: …, databases: […] }
  frontend: { library: …, bundler: …, routing: …, mapping: …, styling: … }
  infrastructure: { containerization: …, webserver: …, registry: …, ci: … }
  externalAPIs: […]
---
```

**Ces champs sont porteurs, pas décoratifs** : le fragment `ProjectCardData`, la nav
inter-projets et le `<Seo>` les lisent. Ils sont typés explicitement dans `gatsby-node.ts`
(`type MdxFrontmatter`) pour neutraliser la fragilité d'inférence YAML.

---

## 3. Corps MDX — ce qui devient de la prose / du markdown natif (SANS composant)

Tout ce qui n'est qu'**une liste de phrases ou un paragraphe** reste du markdown pur.
C'est ici que meurt la redondance : un seul endroit, contrôle du flux narratif, zéro schéma
à maintenir.

| Ancien champ JSON | Devient |
|---|---|
| `description` (prose) | Paragraphes markdown (le corps lui-même) |
| `highlights[]` | `## Points forts` + liste à puces |
| `useCases[]` | `## Idéal pour` + liste à puces |
| `skills[]` | `## Compétences développées` + liste à puces |
| `challenges[]` (strings) | `## Défis techniques` + liste à puces |

Les puces markdown sont stylées par le CSS du wrapper de contenu (`.content ul/li`). Décision A
tranchée : **pas de composant `<KeyPoints>`** — on reste sur du markdown natif.

---

## 4. La banque de composants — FERMÉE

Règle d'or : **liste finie, un seul contrat de props par composant, `strict` TS, aucune
variante « selon le projet ».** Toute extension de la banque = décision explicite
documentée ici. Les composants vivent dans `src/components/projects/mdx/`.

### Deux mécanismes distincts (ne pas confondre)

- **Composants → import direct.** Chaque `index.mdx` importe ce qu'il utilise depuis le
  barrel, en tête de fichier (après le frontmatter) :
  ```mdx
  import { Features, Feature, Architecture, Gallery, Callout } from "../../../components/projects/mdx";
  ```
  Choix volontaire **contre** `MDXProvider` : l'import direct est explicite, n'importe que
  le nécessaire, et se rend de façon fiable dans tous les contextes (les composants injectés
  par `MDXProvider` échouent dans certains, ex. génération RSS). La banque reste fermée *par
  convention* — un seul répertoire, un seul barrel.
- **Donnée de page → contexte React.** Les composants pilotés par la donnée résolue
  (`Architecture`, `Gallery`, `Testimonial`) lisent `useProject()`, un contexte fourni par
  le template autour du corps MDX. Raison : dans le corps MDX seule la frontmatter *brute*
  est joignable (`props.pageContext.frontmatter`), **pas** les données résolues par GraphQL —
  or `<Gallery>` a besoin des images **Sharp** (`IGatsbyImageData`), absentes de `pageContext`.
  Le contexte est l'outil idiomatique pour fournir cette donnée ambiante sans faire fuiter
  `props.pageContext…` dans le contenu éditorial. L'auteur écrit juste `<Gallery />`.

### `<Features>` + `<Feature>`
Grille de cartes à icône (`lucide-react`, via `src/components/common/Icon`). Remplace
`features[]`. Données **inline dans le corps**.
```mdx
<Features title="Fonctionnalités">
  <Feature icon="map-pin">Recherche géolocalisée avec carte interactive</Feature>
  <Feature icon="calendar-check">Système de réservation complet et robuste</Feature>
</Features>
```
Contrat : `Features { title?: string }`, `Feature { icon: string; children: ReactNode }`.
`icon` est une clé résolue par `iconMap` (`src/components/common/Icon/Icon.tsx`) — y ajouter
toute nouvelle clé nécessaire. **Une seule forme** — on abandonne les variantes mortes
`{title, description}` / string.

### `<Architecture />`  *(l'exception §1)*
Lit `frontmatter.architecture`. Rend la grille backend/frontend/infra/APIs.
```mdx
<Architecture />
```
Contrat : aucune prop (lit le frontmatter du projet courant via contexte de page).

### `<Gallery />`
Lit `frontmatter.images.gallery` (images Sharp) + réutilise `GalleryModal` existante.
```mdx
<Gallery title="Galerie" />
```
Contrat : `{ title?: string }`.

### `<Testimonial />`
Lit `testimonials.json` par `frontmatter.id`. Rien à rendre si absent.
```mdx
<Testimonial />
```
Contrat : aucune prop. (Agnostique de catégorie — mais en pratique posé sur les projets client.)

### `<Callout>`  *(optionnel — le tissu conjonctif que tu voulais)*
Encart de mise en valeur narrative, entre deux blocs, pour relier récit et faits.
```mdx
<Callout tone="insight">
Ce projet répond à un enjeu concret de la transition énergétique.
</Callout>
```
Contrat : `{ tone?: "insight" | "warning" | "quote" }`.

**Total : 4 composants socle (`Features`, `Architecture`, `Gallery`, `Testimonial`)
+ 1 optionnel (`Callout`).** C'est tout. La petitesse de la banque EST la garantie
anti-divergence. Toute addition = décision explicite ajoutée ici.

---

## 5. Responsabilités du template de page

Le template `{Mdx.frontmatter__slug}.tsx` garde le **chrome** (identique à tous les projets,
piloté par frontmatter) et délègue le **contenu** au corps MDX :

- **Template** : hero (image + titre + badges + liens), sidebar (Informations, Stack, Liens,
  CTA), navigation inter-projets. Tout depuis le frontmatter.
- **`<MDXContent>`** : la prose + les composants de la banque, dans l'ordre choisi par l'auteur.

Conséquence : la `CategoryConfig` géante (`contextTitle`, `featuresTitle`, `resultsTitle`…
dans `ProjectDetail.tsx`) **disparaît** — les titres de section sont écrits en markdown.
Il ne reste au plus qu'un mini-mapping catégorie → (emoji par défaut, texte du CTA).

Les resolvers d'images (`@imageByPath` / `findImage` de `gatsby-node.ts`) sont **portés tels
quels** sur le node `Mdx` : même convention `slug/images/filename`, même `sourceInstanceName`.

---

## 6. Nettoyage induit (surface morte à supprimer)

- `results` — 0 projet. **Supprimé** du type et du schéma.
- `problem` — 0 projet. Supprimé (réintroductible en prose si besoin, cf. décision D).
- `ProjectFeature` variantes `string` et `{title, description}` — 0 usage. **Supprimées.**
- `ProjectChallenge` variante `{title, solution}` — 0 usage. **Supprimée.**

---

## 7. Décisions tranchées

- **A — Listes douces** → **puces markdown natives**. Pas de `<KeyPoints>`.
- **B — `architecture`** → **frontmatter typé + `<Architecture />`**.
- **C — Hero + sidebar** → **100 % pilotés par le template** depuis le frontmatter.
- **D — `problem` / `results`** → **suppression sèche** (0 usage ; réintroductibles en prose).
```
