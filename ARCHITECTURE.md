# Architecture du Portfolio — React Router v7 Framework Mode

## Mode de génération

Le site est un **SPA avec pré-rendu statique** (Static Site Generation).

| Paramètre | Valeur |
|---|---|
| `ssr` | `false` — pas de serveur Node en production |
| `prerender` | Liste explicite de toutes les routes |
| Bundler | Vite, piloté par le plugin `@react-router/dev/vite` |
| Framework | React 19 + React Router 7 (mode framework) |

**Concrètement** : à chaque `npm run build`, React Router exécute le rendu de chaque route listée et produit un fichier HTML complet par page dans `build/client/`. Le résultat est un dossier 100 % statique, déployable sur n'importe quel CDN ou serveur de fichiers.

---

## Pré-rendu — quelles pages ?

Défini dans `react-router.config.js` :

| Route | Fichier généré |
|---|---|
| `/` | `build/client/index.html` |
| `/projets` | `build/client/projets/index.html` |
| `/apropos` | `build/client/apropos/index.html` |
| `/services` | `build/client/services/index.html` |
| `/contact` | `build/client/contact/index.html` |
| `/projets/:slug` (×7) | `build/client/projets/<slug>/index.html` |

Les slugs des projets sont lus dynamiquement depuis les fichiers JSON de `src/data/projects/` au moment du build.

Un fichier `__spa-fallback.html` est aussi généré : il sert de fallback SPA pour toute route non pré-rendue (ex. future route ajoutée sans rebuild).

---

## Scripts `package.json`

| Script | Commande | Rôle |
|---|---|---|
| `dev` | `react-router dev` | Lance Vite en mode dev avec HMR. Le plugin React Router gère le routage, la génération de types et le rechargement. |
| `build` | `react-router build` | Compile le bundle client via Vite **puis** pré-rend toutes les routes listées dans `prerender`. Produit `build/client/`. |
| `start` | `react-router-serve ./build/server/index.js` | Sert le build en local pour preview. Utile en test, **non nécessaire en production** si déployé sur un hébergement statique. |
| `lint` | `eslint .` | Vérifie le code avec ESLint. |

---

## Métadonnées (SEO)

Les `<title>` et `<meta>` sont gérés via les **balises natives React 19** directement dans le JSX de chaque page (pas de bibliothèque tierce). React 19 hoist automatiquement ces éléments dans le `<head>` du document.

```jsx
// Exemple dans une page
return (
    <main>
        <title>Mes Projets | Léo Peyronnet</title>
        <meta name="description" content="..." />
        {/* contenu */}
    </main>
);
```

---

## Pipeline CI/CD recommandé

### Déploiement statique (Netlify, Vercel, Cloudflare Pages, GitHub Pages…)

```yaml
# Exemple GitHub Actions
name: Deploy
on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run lint
      - run: npm run build

      # Le dossier à déployer est build/client/
      - name: Deploy
        uses: # adapter selon l'hébergeur
        with:
          publish-dir: build/client
```

### Points clés

| Étape | Détail |
|---|---|
| **Install** | `npm ci` (reproductible, basé sur le lockfile) |
| **Lint** | `npm run lint` — fail-fast si erreurs |
| **Build** | `npm run build` — produit `build/client/` avec tous les HTML pré-rendus |
| **Deploy** | Publier **uniquement** `build/client/` sur l'hébergeur statique |
| **Fallback SPA** | Configurer l'hébergeur pour servir `__spa-fallback.html` sur les 404 (si routes non pré-rendues) |

### Configuration fallback par hébergeur

| Hébergeur | Configuration |
|---|---|
| **Netlify** | `_redirects` : `/* /__spa-fallback.html 200` |
| **Vercel** | `vercel.json` : `{ "rewrites": [{ "source": "/(.*)", "destination": "/__spa-fallback.html" }] }` |
| **Cloudflare Pages** | Gère automatiquement les `index.html` par dossier |
| **GitHub Pages** | Ajouter un `404.html` copié depuis `__spa-fallback.html` |

> **Note** : si toutes les routes sont pré-rendues (ce qui est le cas actuellement), le fallback SPA n'est sollicité que pour des URLs invalides. Il reste une sécurité.

---

## Structure résumée

```
portfolio/
├── app/
│   └── root.jsx              ← Layout racine (html, head, body, Header, Footer)
├── react-router.config.js    ← Config : ssr:false + liste prerender
├── vite.config.js             ← Plugin reactRouter()
├── src/
│   ├── pages/                 ← Composants de page (référencés dans routes.js)
│   ├── components/            ← Composants réutilisables
│   ├── layouts/               ← Header, Footer
│   ├── data/                  ← JSON statiques (projets, services…)
│   └── hooks/                 ← Hooks personnalisés
└── build/
    └── client/                ← ⭐ Sortie de build — à déployer
        ├── index.html
        ├── projets/index.html
        ├── projets/<slug>/index.html (×7)
        ├── apropos/index.html
        ├── services/index.html
        ├── contact/index.html
        ├── __spa-fallback.html
        └── assets/            ← JS/CSS bundlés
```
