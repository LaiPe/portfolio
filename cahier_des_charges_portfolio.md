# Cahier des Charges - Refonte Portfolio Léo Peyronnet

**Version** : 1.0  
**Date** : Janvier 2026  
**Type de projet** : Refonte complète (SPA React + Vite)  
**Objectif** : Portfolio professionnel double cible (recruteurs CDI + clients freelance)

---

## 📋 Table des matières

1. [Contexte & Objectifs](#contexte--objectifs)
2. [Positionnement & Cibles](#positionnement--cibles)
3. [Architecture Technique](#architecture-technique)
4. [Structure & Navigation](#structure--navigation)
5. [Pages & Fonctionnalités](#pages--fonctionnalités)
6. [Contenus Détaillés](#contenus-détaillés)
7. [Design & UX](#design--ux)
8. [Développement & Bonnes Pratiques](#développement--bonnes-pratiques)
9. [SEO & Performance](#seo--performance)
10. [Planning & Livrables](#planning--livrables)

---

## 🎯 Contexte & Objectifs

### Contexte actuel

**Portfolio existant** :
- Site statique HTML/CSS/JS vanilla
- Liste chronologique unique de projets
- Navigation simple (Accueil, Projets, À propos)
- Hébergé sur Netlify (domaine personnalisé)

**Limites identifiées** :
- Pas de hiérarchisation des projets (tout au même niveau)
- Mélange projets clients réels, maquettes et expérimentations
- Navigation peu intuitive pour distinguer les catégories
- Contenu hardcodé (difficile à maintenir)
- Positionnement initial "Musique & Culture" abandonné

### Nouvelle stratégie

**Repositionnement** :
- **Profil** : Développeur Full-Stack React & Spring Boot, spécialisé Front-End React
- **Objectif principal** : Recherche de CDI en développement front-end React
- **Objectif secondaire** : Activité freelance side-project (<10h/semaine) tous secteurs

**Double cible** :
1. **Recruteurs** : Mise en avant des compétences techniques, stack moderne
2. **Clients freelance** : Crédibilité via projets clients réels, offres packagées

### Objectifs de la refonte

**Fonctionnels** :
- ✅ Organisation catégorisée et hiérarchisée des projets
- ✅ Mise en valeur des projets clients réels (crédibilité)
- ✅ Clarification des compétences par type de projet
- ✅ Parcours de découverte stratégique pour les visiteurs
- ✅ Facilité de maintenance du contenu (externalisation JSON)

**Techniques** :
- ✅ Migration vers architecture SPA React moderne
- ✅ Amélioration SEO (React Helmet Async)
- ✅ Performance optimisée (lazy loading, code splitting)
- ✅ Responsive design (mobile-first)
- ✅ Accessibilité (navigation clavier, ARIA)

**Marketing** :
- ✅ Démontrer la maîtrise de React (argument recruteurs)
- ✅ Rassurer prospects freelance (projets clients réels)
- ✅ Faciliter la prise de contact (formulaire optimisé)

---

## 🎯 Positionnement & Cibles

### Positionnement technique

```
Développeur Full-Stack React & Spring Boot
Spécialisé Front-End React
```

**Stack principale mise en avant** :
- Frontend : React 18, TypeScript, CSS Modules
- Backend : Spring Boot, API REST, JPA/Hibernate
- Bases de données : PostgreSQL, MySQL
- Outils : Git, Docker, CI/CD (GitHub Actions)
- Générateur statique : 11ty + Decap CMS

### Personas cibles

#### Persona 1 : Recruteur Tech (Priorité 1)

**Profil** :
- Recruteur interne ou cabinet de recrutement
- Recherche développeur React pour CDI
- Compétences clés : React, TypeScript, API REST

**Attentes** :
- Portfolio technique démontrant la maîtrise de React
- Projets full-stack (React + Spring Boot)
- Code propre, bonnes pratiques
- Capacité à travailler en équipe (process)

**Parcours type** :
1. Atterrissage sur la page d'accueil
2. Consultation de la section "Compétences"
3. Navigation vers projets full-stack (applications React)
4. Visite GitHub pour voir le code
5. Contact via LinkedIn

#### Persona 2 : Client Freelance (Priorité 2)

**Profil** :
- TPE/PME, artisan, professionnel indépendant, startup
- Besoin d'un site web ou d'une application
- Budget : 1500-4000€

**Attentes** :
- Preuves de réalisations concrètes (projets clients)
- Comprendre l'offre de services
- Rassurance sur la fiabilité (témoignages, processus)
- Facilité de contact

**Parcours type** :
1. Atterrissage sur la page d'accueil (offres packagées)
2. Consultation de la section "Projets Clients"
3. Exploration d'un projet détaillé (Attilio Terlizzi)
4. Visite page "Services" (offres et tarifs)
5. Contact via formulaire

---

## 🏗️ Architecture Technique

### Stack technologique

| Couche | Technologie | Version | Justification |
|--------|-------------|---------|---------------|
| **Framework** | React | 18.x | SPA moderne, composants réutilisables |
| **Build Tool** | Vite | 5.x | Dev server rapide, HMR optimal |
| **Routing** | React Router | 6.x | Navigation SPA, gestion des routes |
| **State Management** | Context API | Native React | Suffisant pour la taille du projet |
| **Styling** | CSS Modules | Native Vite | Scoping automatique, pas de dépendances |
| **Animations** | React Bits | Latest | Hooks utilitaires (scroll, media queries) |
| **Forms** | React Hook Form | 7.x | Validation légère, performance |
| **SEO** | React Helmet Async | 2.x | Meta tags dynamiques par route |
| **Data** | JSON statique | - | Externalisation des projets |
| **Déploiement** | Docker + GitHub Actions | - | Pipeline CI/CD sur serveur personnel |

### Raisons des choix

**React + Vite** :
- ✅ Démontre la maîtrise de React (argument recruteurs)
- ✅ HMR ultra-rapide en développement
- ✅ Build optimisé (tree-shaking, code splitting)
- ✅ Écosystème riche (hooks, composants)

**CSS Modules** :
- ✅ Scoping automatique (pas de conflits)
- ✅ Approche vanilla (pas de courbe d'apprentissage)
- ✅ Compatible avec les bonnes pratiques CSS
- ✅ Support natif Vite (zéro config)

**Context API** :
- ✅ Suffisant pour un portfolio (pas besoin de Redux)
- ✅ Gestion simple : langue (futur i18n), thème (optionnel)
- ✅ Pas de dépendances externes

**React Hook Form** :
- ✅ Validation côté client performante
- ✅ Moins de re-renders que Formik
- ✅ Compatible avec mailto: (pas besoin de backend)

**React Helmet Async** :
- ✅ Meta tags dynamiques par page/projet
- ✅ Améliore le référencement Google
- ✅ Open Graph pour partages sociaux

### Architecture des fichiers

```
portfolio-react/
├── public/
│   ├── img/                      # Images statiques
│   │   ├── projects/             # Screenshots projets
│   │   ├── about/                # Photos page À propos
│   │   ├── icons/                # Icônes (LinkedIn, GitHub...)
│   │   └── logo/                 # Logos du site
│   └── locales/                  # Fichiers i18n (futur)
│       ├── fr.json
│       └── en.json
│
├── src/
│   ├── components/
│   │   ├── common/               # Composants réutilisables
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Header.module.css
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Footer.module.css
│   │   │   ├── Button/
│   │   │   ├── Badge/
│   │   │   └── Card/
│   │   │
│   │   ├── projects/             # Composants projets
│   │   │   ├── ProjectCard/
│   │   │   │   ├── ProjectCard.jsx
│   │   │   │   └── ProjectCard.module.css
│   │   │   ├── ProjectGrid/
│   │   │   ├── CategoryFilter/
│   │   │   └── ProjectDetail/
│   │   │
│   │   ├── forms/                # Composants formulaires
│   │   │   ├── ContactForm/
│   │   │   └── Input/
│   │   │
│   │   └── layout/               # Layouts
│   │       ├── MainLayout/
│   │       └── ProjectLayout/
│   │
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.css
│   │   ├── Projects/
│   │   │   ├── Projects.jsx
│   │   │   └── Projects.module.css
│   │   ├── ProjectDetail/
│   │   │   ├── ProjectDetail.jsx
│   │   │   └── ProjectDetail.module.css
│   │   ├── About/
│   │   │   ├── About.jsx
│   │   │   └── About.module.css
│   │   ├── Services/             # Nouvelle page
│   │   │   ├── Services.jsx
│   │   │   └── Services.module.css
│   │   └── NotFound/
│   │       ├── NotFound.jsx
│   │       └── NotFound.module.css
│   │
│   ├── data/
│   │   ├── projects.json         # Données projets
│   │   ├── services.json         # Offres packagées
│   │   └── skills.json           # Compétences techniques
│   │
│   ├── contexts/
│   │   └── LanguageContext.jsx   # Context i18n (futur)
│   │
│   ├── hooks/
│   │   ├── useScrollToTop.js
│   │   ├── useIntersectionObserver.js  # React Bits
│   │   └── useProjects.js        # Hook custom pour charger projets
│   │
│   ├── utils/
│   │   ├── constants.js          # Constantes globales
│   │   ├── helpers.js            # Fonctions utilitaires
│   │   └── seo.js                # Config SEO par page
│   │
│   ├── styles/
│   │   ├── variables.css         # Variables CSS globales
│   │   ├── reset.css             # Reset CSS
│   │   └── global.css            # Styles globaux
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── routes.jsx                # Configuration React Router
│
├── .gitignore
├── package.json
├── vite.config.js
├── README.md
└── Dockerfile                    # Image Docker pour déploiement
```

### Gestion des routes (React Router)

```javascript
// src/routes.jsx
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'projects', element: <Projects /> },
      { path: 'projects/:slug', element: <ProjectDetail /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: '*', element: <NotFound /> },
    ]
  }
]);
```

**URLs principales** :
- `/` : Page d'accueil
- `/projects` : Liste des projets (catégorisés)
- `/projects/attilio-terlizzi` : Détail d'un projet
- `/about` : À propos
- `/services` : Offres packagées freelance
- `/contact` : Scroll vers footer (ancre)

---

## 🗺️ Structure & Navigation

### Arborescence du site

```
Portfolio Léo Peyronnet
│
├── 🏠 Accueil
│   ├── Hero Section (présentation)
│   ├── Compétences clés
│   ├── Projets phares (3-4 projets)
│   ├── Offres packagées (aperçu)
│   └── CTA Contact
│
├── 💼 Projets
│   ├── Filtres par catégorie
│   │   ├── 🎵 Projets Clients (priorité visuelle)
│   │   ├── 🎨 Maquettes & Études de Cas
│   │   └── 🧪 Expérimentations Techniques
│   └── Grille de projets
│
├── 📄 Projet [Slug]
│   ├── Hero projet
│   ├── Sidebar (infos clés)
│   ├── Contenu détaillé
│   ├── Galerie
│   └── Navigation inter-projets
│
├── 🛠️ Services (nouvelle page)
│   ├── Offres packagées détaillées
│   ├── Tarifs indicatifs
│   ├── Processus de travail
│   └── CTA Contact
│
├── 👤 À propos
│   ├── Parcours
│   ├── Formations
│   ├── Valeurs
│   └── Hobbies
│
└── 📧 Contact (Footer ancré)
    ├── Formulaire
    └── Liens sociaux
```

### Navigation principale (Header)

**Desktop** :
```
Logo | Accueil | Projets | Services | À propos | Contact
```

**Mobile** :
```
Logo [Hamburger Menu]
```

**États de navigation** :
- Lien actif : Souligné ou couleur accentuée
- Hover : Animation subtile
- Scroll : Header sticky (reste fixe en haut)

### Catégorisation des projets

#### 🎵 Projets Clients (Format Large - Hero Cards)

**Objectif** : Crédibilité immédiate

**Projets inclus** :
- ✅ **Attilio Terlizzi** (Site vitrine artiste international)

**Mise en avant** :
- En tête de portfolio
- Badge "Projet Client" visible
- Format hero impactant (grande card)
- Témoignage client (si disponible)
- Metrics : délais, technologies, résultats

**À ajouter (optionnel - projets fictifs ultra-réalistes)** :
- Festival Les Nuits Sonores (refonte site festival)
- Studio XYZ (application web gestion planning)

---

#### 🎨 Maquettes & Études de Cas (Format Moyen - Grille 2 colonnes)

**Objectif** : Démonstration compétences métier

**Projets inclus** :
- ✅ **Mélodie & Cie** (Site vitrine multi-services, secteur musique)
- ✅ **Drums Please** (E-commerce + espace utilisateur, location instruments)

**Présentation** :
- Format "cas d'usage" : "Pour un label musical, j'ai conçu..."
- Focus sur cahier des charges et fonctionnalités métier
- Mention "Disponible en projet clé en main"
- Badge "Étude de cas"

---

#### 🧪 Expérimentations Techniques (Format Compact - Liste/Petites Cards)

**Objectif** : Preuve de curiosité technique

**Projets inclus** :
- ✅ **pálinDrómos** (Vérificateur palindrome, certification freeCodeCamp)
- ✅ **Tours de Hanoï** (Visualisation algorithmique)
- ✅ **Sokoban** (Jeu de puzzle en C)
- ✅ **Sim-rhinite** (Simulation épidémiologique)

**Présentation** :
- Section repliable ou page séparée
- Ton plus léger : "Explorations techniques"
- Mention des compétences spécifiques (algorithmes, C, modélisation)
- Badge "Exploration"

---

## 📄 Pages & Fonctionnalités

### 🏠 Page Accueil

**Objectif** : Conversion immédiate (recruteur ou client)

#### Section 1 : Hero

**Contenu** :
```
Léo Peyronnet
Développeur Full-Stack React & Spring Boot
Spécialisé Front-End React

[CTA 1: Voir mes projets] [CTA 2: Me contacter]
```

**Éléments visuels** :
- Photo professionnelle (optionnel)
- Animation subtile (fade-in, typing effect)
- Background dégradé ou pattern géométrique

---

#### Section 2 : Compétences Clés

**Format** : Grille 3 colonnes (Desktop) / 1 colonne (Mobile)

**Compétences mises en avant** :
```
┌─────────────────┬─────────────────┬─────────────────┐
│   Frontend      │    Backend      │     Outils      │
├─────────────────┼─────────────────┼─────────────────┤
│ React 18        │ Spring Boot     │ Git / GitHub    │
│ TypeScript      │ API REST        │ Docker          │
│ CSS Modules     │ JPA/Hibernate   │ CI/CD           │
│ React Router    │ PostgreSQL      │ Vite            │
└─────────────────┴─────────────────┴─────────────────┘
```

**Présentation** :
- Icônes des technologies
- Niveau de compétence (optionnel : jauge visuelle)
- Lien vers section détaillée (page Services ou About)

---

#### Section 3 : Projets Phares

**Objectif** : Donner envie d'explorer le portfolio

**Contenu** :
- 3-4 projets sélectionnés (1 client + 2 maquettes + 1 full-stack)
- Format cards avec image, titre, technologies, CTA "Voir le projet"
- Ordre : **Attilio Terlizzi > Application React/Spring Boot > Mélodie & Cie**

---

#### Section 4 : Offres Packagées (Aperçu)

**Objectif** : Capter les prospects freelance

**Contenu** :
```
🎯 Vous cherchez un développeur web ?

[Card 1]
Site Vitrine Essentiel
À partir de 1500€
→ En savoir plus

[Card 2]
E-commerce Shopify
À partir de 2500€
→ En savoir plus

[Card 3]
Application Web React
Sur devis
→ En savoir plus
```

**CTA** : "Voir toutes les offres" → Lien vers page Services

---

#### Section 5 : CTA Final

**Contenu** :
```
Prêt à démarrer votre projet ?

[Bouton: Contactez-moi]
```

**Scroll automatique** vers le footer contact

---

### 💼 Page Projets

**Objectif** : Navigation facile entre catégories

#### Header Section

**Contenu** :
```
Mes Réalisations

Des projets clients aux expérimentations techniques,
découvrez mon parcours de développeur.
```

---

#### Filtres de Catégories

**Format** : Boutons toggle horizontaux (sticky en scroll)

```
[Tous] [🎵 Clients] [🎨 Maquettes] [🧪 Expérimentations]
```

**Comportement** :
- Filtre actif : Fond coloré, texte blanc
- Clic : Affiche uniquement la catégorie sélectionnée
- "Tous" : Affiche tout dans l'ordre hiérarchique

---

#### Grille de Projets

**Layout** :
- **Projets Clients** : 1 colonne (pleine largeur) - Format hero
- **Maquettes** : 2 colonnes (Desktop) / 1 colonne (Mobile)
- **Expérimentations** : 3 colonnes (Desktop) / 1 colonne (Mobile)

**Composant ProjectCard** :
```
┌─────────────────────────────────┐
│  [Image/Screenshot]             │
├─────────────────────────────────┤
│  Badge [Catégorie]              │
│  Titre du Projet                │
│  Description courte (2 lignes)  │
│  [React] [Spring Boot] [Docker] │
│  → Voir le projet               │
└─────────────────────────────────┘
```

---

### 📄 Page Projet Détail

**URL** : `/projects/{slug}`

**Objectif** : Détailler un projet en profondeur

#### Hero Section

**Contenu** :
- Image/vidéo full-width (screenshot principal)
- Titre du projet + baseline
- Badge catégorie + technologies
- Liens rapides (Site live, GitHub, Figma)

**Layout** :
```
┌─────────────────────────────────────────────┐
│  [Image Full-Width]                         │
│                                             │
│  Titre du Projet                            │
│  [Badge Catégorie]                          │
│  React • Spring Boot • PostgreSQL           │
│  [🔗 Site] [💻 GitHub] [🎨 Figma]          │
└─────────────────────────────────────────────┘
```

---

#### Layout Principal (Desktop)

```
┌──────────────────┬─────────────────────────┐
│   SIDEBAR        │   CONTENU PRINCIPAL     │
│   (fixe)         │   (scroll)              │
│                  │                         │
│ 📅 Date          │ ## Contexte             │
│ 🏷️ Catégorie    │ Description projet...   │
│ 👤 Client        │                         │
│ ⏱️ Durée         │ ## Problématique        │
│                  │ Besoins client...       │
│ 🛠️ Technologies │                         │
│ [Logos tech]     │ ## Réalisations clés    │
│                  │ ✅ Fonctionnalité 1     │
│ 🔗 Liens         │ ✅ Fonctionnalité 2     │
│ → Site live      │                         │
│ → Code GitHub    │ ## Défis techniques     │
│ → Maquettes      │ 🎯 Défi 1               │
│                  │ → Solution...           │
│ 💬 CTA           │                         │
│ "Projet          │ ## Résultats            │
│  similaire ?"    │ 📈 Metrics...           │
│ [Contact]        │ 💬 Témoignage client    │
└──────────────────┴─────────────────────────┘
```

**Mobile** : Sidebar en haut, contenu en dessous

---

#### Galerie

**Layout** :
```
┌─────────────────────────────────┐
│ Screenshot principal (large)    │
├────────────────┬────────────────┤
│ Screenshot 2   │ Screenshot 3   │
├────────────────┴────────────────┤
│ Mobile mockup (carousel)        │
└─────────────────────────────────┘
```

**Fonctionnalités** :
- Lightbox au clic (zoom image)
- Légendes sous chaque image
- Lazy loading (performance)

---

#### Navigation Inter-Projets

**Position** : Bas de page

```
┌─────────────────────────────────────┐
│  ← Projet précédent | Projet suivant → │
└─────────────────────────────────────┘
```

**Comportement** :
- Affiche le projet précédent/suivant dans la même catégorie
- Si premier/dernier projet : "Retour aux projets"

---

### 🛠️ Page Services (Nouvelle)

**Objectif** : Convertir les prospects freelance

#### Hero Section

**Contenu** :
```
Mes Offres de Développement Web

Des solutions packagées pour votre projet digital,
du site vitrine à l'application web sur-mesure.
```

---

#### Offres Packagées

**Format** : Cards détaillées (2 colonnes Desktop / 1 colonne Mobile)

**Offre 1 : Site Vitrine Essentiel**
```
┌───────────────────────────────────┐
│  🌐 Site Vitrine Essentiel        │
│  1500-2500€                       │
├───────────────────────────────────┤
│  Cible: TPE, artisans, artistes   │
│                                   │
│  ✅ Site responsive                │
│  ✅ Design moderne                 │
│  ✅ Formulaire de contact          │
│  ✅ CMS simple (autonomie)         │
│  ✅ Hébergement inclus             │
│                                   │
│  Délai: 3-4 semaines              │
│  [En savoir plus]                 │
└───────────────────────────────────┘
```

**Offre 2 : E-commerce Shopify**
**Offre 3 : E-commerce JAMstack**
**Offre 4 : Application Web React**
**Offre 5 : Maintenance & Support**

---

#### Processus de Travail

**Objectif** : Rassurer sur la méthodologie

**Contenu** :
```
Comment je travaille ?

1️⃣ Découverte
   → Échange sur vos besoins
   → Définition du cahier des charges

2️⃣ Conception
   → Wireframes / Maquettes
   → Validation avec vous

3️⃣ Développement
   → Itérations régulières
   → Tests en continu

4️⃣ Livraison
   → Mise en ligne
   → Formation (si besoin)
   → Support post-livraison
```

---

#### CTA Final

**Contenu** :
```
Prêt à lancer votre projet ?

[Bouton: Demander un devis]
```

**Action** : Scroll vers footer contact

---

### 👤 Page À propos

**Objectif** : Humaniser le profil, raconter le parcours

#### Section 1 : Introduction

**Contenu** :
```
Développeur passionné par le web et la musique

[Photo professionnelle]

Bonjour, je suis Léo Peyronnet, développeur full-stack
spécialisé en React. Après une licence d'informatique et
un titre CDA, j'ai acquis une solide expérience en
développement front-end et back-end.
```

---

#### Section 2 : Parcours

**Format** : Timeline verticale

```
2025 • Certification Concepteur Développeur d'Applications
       HumanBooster

2024 • Stage React en entreprise
       Développement d'applications full-stack

2023 • Licence Informatique - Université Clermont Auvergne
       Spécialisation algorithmique et programmation
```

---

#### Section 3 : Valeurs & Approche

**Contenu** :
```
Ce qui me guide

💡 Curiosité technique
   → Toujours apprendre de nouvelles technologies

🎯 Qualité du code
   → Bonnes pratiques, lisibilité, maintenabilité

🤝 Écoute client
   → Comprendre les besoins réels, pas les demandes

🎨 Design & UX
   → L'esthétique au service de l'expérience
```

---

#### Section 4 : Hobbies

**Contenu** :
```
En dehors du code

🎵 Musicien amateur (batterie, piano)
📚 Lecture (science-fiction, essais tech)
🎮 Jeux vidéo (narrative, puzzle games)
```

---

### 📧 Footer Contact (Global)

**Position** : Toutes les pages

**Layout** :
```
┌─────────────────────────────────────────┐
│  Travaillons ensemble                   │
│                                         │
│  [Formulaire Contact]                   │
│  Nom: [______]                          │
│  Email: [______]                        │
│  Message: [__________]                  │
│  [Envoyer]                              │
│                                         │
│  Ou contactez-moi directement :         │
│  [LinkedIn] [GitHub] [Email] [Malt]     │
│                                         │
│  © 2026 Léo Peyronnet                   │
└─────────────────────────────────────────┘
```

**Fonctionnalités** :
- Formulaire React Hook Form + validation
- Envoi via `mailto:` (pas de backend)
- Messages d'erreur inline
- Scroll fluide vers footer depuis Header

---

## 📝 Contenus Détaillés

### Structure JSON des projets

**Fichier** : `src/data/projects.json`

```json
{
  "projects": [
    {
      "id": "attilio-terlizzi",
      "slug": "attilio-terlizzi",
      "title": "Attilio Terlizzi",
      "category": "client",
      "date": "2025-01",
      "client": "Attilio Terlizzi (Artiste)",
      "duration": "3 semaines",
      "description": "Site vitrine pour un percussionniste et compositeur italien de renommée internationale.",
      "problem": "Absence de site personnel professionnel. Besoin de centraliser biographie, médias et actualités avec autonomie de mise à jour.",
      "technologies": [
        { "name": "11ty", "logo": "/img/icons/11ty.svg" },
        { "name": "Decap CMS", "logo": "/img/icons/decap.svg" },
        { "name": "Tailwind CSS", "logo": "/img/icons/tailwind.svg" },
        { "name": "Netlify", "logo": "/img/icons/netlify.svg" }
      ],
      "features": [
        {
          "title": "Site statique performant",
          "description": "Temps de chargement < 1s grâce à 11ty"
        },
        {
          "title": "Intégrations médias",
          "description": "Spotify, YouTube, galerie photos/vidéos"
        },
        {
          "title": "Back-office intuitif",
          "description": "Decap CMS pour autonomie totale du client"
        },
        {
          "title": "Design épuré",
          "description": "Focus sur le contenu artistique"
        },
        {
          "title": "SEO optimisé",
          "description": "Meilleure visibilité sur les moteurs de recherche"
        }
      ],
      "challenges": [
        {
          "title": "Intégration multi-plateformes",
          "solution": "API Spotify/YouTube avec fallbacks et lazy loading"
        },
        {
          "title": "Autonomie du client",
          "solution": "Decap CMS avec interface simplifiée et documentation"
        }
      ],
      "results": [
        "Site déployé et en production",
        "Présence web professionnelle établie",
        "Client autonome sur la mise à jour du contenu"
      ],
      "testimonial": {
        "text": "À ajouter après retour client",
        "author": "Attilio Terlizzi"
      },
      "links": {
        "live": "https://attilioterlizzi.fr",
        "github": null,
        "figma": null
      },
      "images": {
        "hero": "/img/projects/attilio/hero.jpg",
        "gallery": [
          "/img/projects/attilio/screenshot-1.jpg",
          "/img/projects/attilio/screenshot-2.jpg",
          "/img/projects/attilio/mobile.jpg"
        ]
      },
      "featured": true,
      "order": 1
    },
    {
      "id": "melodie-et-cie",
      "slug": "melodie-et-cie",
      "title": "Mélodie & Cie",
      "category": "mockup",
      "date": "2024-09",
      "client": "Projet fictif",
      "duration": "2 semaines",
      "description": "Maquette pour une entreprise culturelle fictive proposant production musicale, événementiel et formation.",
      "problem": "Démontrer ma capacité à structurer un site complexe avec des publics et besoins variés.",
      "useCases": [
        "Labels musicaux indépendants",
        "Salles de concert multi-activités",
        "Écoles de musique avec offres diversifiées"
      ],
      "technologies": [
        { "name": "HTML5", "logo": "/img/icons/html5.svg" },
        { "name": "CSS3", "logo": "/img/icons/css3.svg" },
        { "name": "JavaScript", "logo": "/img/icons/js.svg" }
      ],
      "features": [
        {
          "title": "Architecture multi-services",
          "description": "Navigation claire entre 3 univers distincts"
        },
        {
          "title": "Pages services détaillées",
          "description": "Production, Événementiel, Formation"
        },
        {
          "title": "Formulaire de contact",
          "description": "Qualification des demandes par service"
        },
        {
          "title": "Design modulaire",
          "description": "Réutilisable et adaptable"
        }
      ],
      "challenges": [
        {
          "title": "Cohérence visuelle",
          "solution": "Système de design unifié avec variations par service"
        },
        {
          "title": "Complexité du parcours utilisateur",
          "solution": "Navigation intuitive avec fil d'Ariane et CTAs ciblés"
        }
      ],
      "results": [
        "Maquette disponible en projet clé en main",
        "Adaptable en 2-3 semaines pour votre entreprise culturelle"
      ],
      "links": {
        "live": "https://demo.melodie-et-cie.fr",
        "github": "https://github.com/leopeyronnet/melodie-et-cie",
        "figma": null
      },
      "images": {
        "hero": "/img/projects/melodie/hero.jpg",
        "gallery": [
          "/img/projects/melodie/screenshot-1.jpg",
          "/img/projects/melodie/screenshot-2.jpg"
        ]
      },
      "featured": true,
      "order": 3
    },
    {
      "id": "drums-please",
      "slug": "drums-please",
      "title": "Drums Please",
      "category": "mockup",
      "date": "2024-03",
      "client": "Projet fictif",
      "duration": "3 semaines",
      "description": "Maquette d'une plateforme de location de percussions intégrant catalogue dynamique et espace utilisateur sécurisé.",
      "problem": "Créer une expérience e-commerce complète avec gestion d'authentification.",
      "useCases": [
        "Boutiques d'instruments de musique",
        "Services de location d'équipement",
        "Plateformes de partage entre musiciens"
      ],
      "technologies": [
        { "name": "HTML5", "logo": "/img/icons/html5.svg" },
        { "name": "CSS3", "logo": "/img/icons/css3.svg" },
        { "name": "JavaScript", "logo": "/img/icons/js.svg" }
      ],
      "features": [
        {
          "title": "Catalogue produits dynamique",
          "description": "Filtres, recherche, tri"
        },
        {
          "title": "Fiches produits détaillées",
          "description": "Photos, specs techniques, disponibilité"
        },
        {
          "title": "Espace utilisateur sécurisé",
          "description": "Inscription, connexion, historique"
        },
        {
          "title": "Panier & checkout",
          "description": "Processus de réservation fluide"
        },
        {
          "title": "Responsive design",
          "description": "Expérience optimale sur tous devices"
        }
      ],
      "challenges": [
        {
          "title": "Gestion des états utilisateur",
          "solution": "Authentification JWT, sessions sécurisées"
        },
        {
          "title": "UX du catalogue",
          "solution": "Infinite scroll, filtres en temps réel, images optimisées"
        }
      ],
      "results": [
        "Maquette fonctionnelle avec toutes les features e-commerce",
        "Démonstration de compétences full-stack"
      ],
      "links": {
        "live": "https://demo.drums-please.fr",
        "github": "https://github.com/leopeyronnet/drums-please",
        "figma": null
      },
      "images": {
        "hero": "/img/projects/drums/hero.jpg",
        "gallery": [
          "/img/projects/drums/screenshot-1.jpg",
          "/img/projects/drums/screenshot-2.jpg",
          "/img/projects/drums/mobile.jpg"
        ]
      },
      "featured": false,
      "order": 4
    },
    {
      "id": "palindromos",
      "slug": "palindromos",
      "title": "pálinDrómos",
      "category": "experiment",
      "date": "2024-10",
      "client": "Certification freeCodeCamp",
      "duration": "1 semaine",
      "description": "Mini-application de vérification de palindromes, projet de certification JavaScript freeCodeCamp.",
      "problem": "Maîtriser la manipulation de chaînes de caractères et les algorithmes JavaScript.",
      "technologies": [
        { "name": "JavaScript", "logo": "/img/icons/js.svg" },
        { "name": "HTML5", "logo": "/img/icons/html5.svg" },
        { "name": "CSS3", "logo": "/img/icons/css3.svg" }
      ],
      "skills": [
        "Algorithmique JavaScript",
        "Manipulation du DOM",
        "Regex et traitement de texte",
        "Validation de formulaire"
      ],
      "links": {
        "live": "https://demo.palindromos.fr",
        "github": "https://github.com/leopeyronnet/palindromos",
        "figma": null
      },
      "images": {
        "hero": "/img/projects/palindromos/hero.jpg",
        "gallery": []
      },
      "featured": false,
      "order": 5
    },
    {
      "id": "tours-de-hanoi",
      "slug": "tours-de-hanoi",
      "title": "Tours de Hanoï",
      "category": "experiment",
      "date": "2025-04",
      "client": "Projet académique HumanBooster",
      "duration": "1 semaine",
      "description": "Visualisation interactive du jeu des Tours de Hanoï, projet de formation CDA.",
      "problem": "Implémenter un algorithme récursif avec une interface visuelle.",
      "technologies": [
        { "name": "JavaScript", "logo": "/img/icons/js.svg" },
        { "name": "HTML5", "logo": "/img/icons/html5.svg" },
        { "name": "CSS3", "logo": "/img/icons/css3.svg" }
      ],
      "skills": [
        "Récursivité",
        "Manipulation du DOM",
        "Animations JavaScript",
        "Visualisation de données"
      ],
      "links": {
        "live": "https://demo.tours-hanoi.fr",
        "github": "https://github.com/leopeyronnet/tours-hanoi",
        "figma": null
      },
      "images": {
        "hero": "/img/projects/hanoi/hero.jpg",
        "gallery": []
      },
      "featured": false,
      "order": 6
    },
    {
      "id": "sokoban",
      "slug": "sokoban",
      "title": "Sokoban",
      "category": "experiment",
      "date": "2023-05",
      "client": "Projet académique",
      "duration": "2 semaines",
      "description": "Implémentation en C du jeu de réflexion Sokoban (déplacement de caisses).",
      "problem": "Développer un jeu avec gestion d'états et logique de mouvement en programmation bas niveau.",
      "technologies": [
        { "name": "C", "logo": "/img/icons/c.svg" }
      ],
      "skills": [
        "Programmation C",
        "Algorithmes de jeu",
        "Gestion états de jeu",
        "Structures de données"
      ],
      "links": {
        "live": null,
        "github": "https://github.com/leopeyronnet/sokoban",
        "figma": null
      },
      "images": {
        "hero": "/img/projects/sokoban/hero.jpg",
        "gallery": []
      },
      "featured": false,
      "order": 7
    },
    {
      "id": "sim-rhinite",
      "slug": "sim-rhinite",
      "title": "Sim-rhinite",
      "category": "experiment",
      "date": "2024-06",
      "client": "Projet universitaire L2",
      "duration": "3 semaines",
      "description": "Simulation de propagation d'un virus non mortel dans une population, avec génération de statistiques analysables.",
      "problem": "Modéliser mathématiquement la propagation virale et analyser les données.",
      "technologies": [
        { "name": "C", "logo": "/img/icons/c.svg" }
      ],
      "skills": [
        "Modélisation mathématique",
        "Statistiques",
        "Programmation scientifique",
        "Simulations stochastiques"
      ],
      "links": {
        "live": null,
        "github": "https://github.com/leopeyronnet/sim-rhinite",
        "figma": null
      },
      "images": {
        "hero": "/img/projects/sim-rhinite/hero.jpg",
        "gallery": []
      },
      "featured": false,
      "order": 8
    }
  ]
}
```

---

### Structure JSON des offres packagées

**Fichier** : `src/data/services.json`

```json
{
  "services": [
    {
      "id": "site-vitrine",
      "title": "Site Vitrine Essentiel",
      "price": "1500-2500€",
      "target": "TPE, artisans, professionnels indépendants, artistes",
      "duration": "3-4 semaines",
      "description": "Site one-page ou multi-page responsive, design moderne et performant.",
      "features": [
        "Site responsive (mobile, tablet, desktop)",
        "Design moderne et performant",
        "Formulaire de contact",
        "Intégrations (réseaux sociaux, Google Maps, médias)",
        "CMS simple (Decap CMS) pour autonomie",
        "Hébergement et déploiement inclus"
      ],
      "icon": "🌐"
    },
    {
      "id": "ecommerce-shopify",
      "title": "Site E-commerce Shopify",
      "price": "2500-4000€",
      "target": "Petits commerces, créateurs, boutiques en ligne",
      "duration": "4-6 semaines",
      "description": "Solution e-commerce clé en main sur Shopify, avec thème personnalisé.",
      "features": [
        "Thème Shopify personnalisé",
        "Configuration produits et paiements",
        "Design adapté à la marque",
        "Formation à la prise en main",
        "1 mois de support inclus"
      ],
      "note": "Solution recommandée pour ROI rapide et autonomie client",
      "icon": "🛒"
    },
    {
      "id": "ecommerce-jamstack",
      "title": "Site E-commerce JAMstack",
      "price": "1500-3000€",
      "target": "Petits catalogues (<50 produits), projets créatifs",
      "duration": "3-4 semaines",
      "description": "Site statique ultra-rapide avec panier d'achat intégré.",
      "features": [
        "Site statique ultra-rapide (11ty)",
        "Panier d'achat (Snipcart ou Stripe)",
        "Design sur-mesure",
        "Performance optimale",
        "Coûts d'hébergement minimes"
      ],
      "note": "Idéal pour artistes, labels indépendants, créateurs",
      "icon": "⚡"
    },
    {
      "id": "application-react",
      "title": "Application Web React",
      "price": "Sur devis",
      "target": "Startups, PME, projets spécifiques",
      "duration": "Variable",
      "description": "Application web sur-mesure avec React + Spring Boot ou API externe.",
      "examples": [
        "Dashboard administratif",
        "Application métier",
        "MVP de SaaS",
        "Plateforme collaborative"
      ],
      "pricing": "À partir de 4000€ selon complexité",
      "note": "Nécessite définition précise du cahier des charges",
      "icon": "⚛️"
    },
    {
      "id": "maintenance-support",
      "title": "Maintenance & Support",
      "price": "75-150€/mois",
      "target": "Tous les clients",
      "duration": "Récurrent",
      "description": "Service de maintenance et support technique pour votre site.",
      "features": [
        "Mises à jour de contenu (jusqu'à 2h/mois)",
        "Support technique",
        "Hébergement inclus",
        "Sauvegardes régulières",
        "Monitoring et sécurité"
      ],
      "icon": "🔧"
    }
  ]
}
```

---

## 🎨 Design & UX

### Charte graphique

#### Couleurs

**Palette principale** :

| Couleur | Hex | Usage |
|---------|-----|-------|
| **Primaire** | `#0057BB` | CTA, liens, accents |
| **Secondaire** | `#1FBB00` | Badges, succès |
| **Tertiaire** | `#BB6A00` | Alertes, expérimentations |
| **Texte** | `#1A1A1A` | Texte principal |
| **Texte secondaire** | `#666666` | Descriptions, légendes |
| **Background** | `#FFFFFF` | Fond principal |
| **Background alt** | `#F5F5F5` | Sections alternées |
| **Bordures** | `#E0E0E0` | Séparateurs, cards |

**Badges par catégorie** :

| Catégorie | Couleur | Texte |
|-----------|---------|-------|
| Projet Client | `#0057BB` | Blanc |
| Maquette | `#1FBB00` | Blanc |
| Expérimentation | `#BB6A00` | Blanc |

---

#### Typographie

**Polices** :

| Usage | Police | Poids | Taille |
|-------|--------|-------|--------|
| **Titres H1** | Jura | Bold (700) | 3rem (48px) |
| **Titres H2** | Jura | Bold (700) | 2rem (32px) |
| **Titres H3** | Jura | SemiBold (600) | 1.5rem (24px) |
| **Texte courant** | Montserrat | Regular (400) | 1rem (16px) |
| **Texte gras** | Montserrat | Bold (700) | 1rem (16px) |
| **Accents** | Nixie One | Regular (400) | Variable |
| **Manuscrit** | Nothing You Could Do | Regular (400) | 1.2rem (À propos) |

**Imports Google Fonts** :
```css
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@600;700&family=Montserrat:wght@400;700&family=Nixie+One&family=Nothing+You+Could+Do&display=swap');
```

---

#### Espacements

**Variables CSS** :
```css
:root {
  --spacing-xs: 0.5rem;   /* 8px */
  --spacing-sm: 1rem;     /* 16px */
  --spacing-md: 1.5rem;   /* 24px */
  --spacing-lg: 2rem;     /* 32px */
  --spacing-xl: 3rem;     /* 48px */
  --spacing-xxl: 4rem;    /* 64px */
}
```

---

### Composants UI

#### Boutons

**Styles** :
```css
/* Bouton primaire */
.btn-primary {
  background: var(--color-primary);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 87, 187, 0.3);
}

/* Bouton secondaire */
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  /* ... autres propriétés */
}
```

---

#### Cards

**Styles** :
```css
.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
```

---

#### Badges

**Styles** :
```css
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.badge-client {
  background: var(--color-primary);
  color: white;
}

.badge-mockup {
  background: var(--color-secondary);
  color: white;
}

.badge-experiment {
  background: var(--color-tertiary);
  color: white;
}
```

---

### Animations

**Librairie** : React Bits + transitions CSS

**Exemples d'animations** :

#### Fade-in au scroll
```javascript
import { useIntersectionObserver } from 'react-bits';

const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

<div ref={ref} className={isVisible ? 'fade-in' : ''}>
  Contenu
</div>
```

```css
.fade-in {
  animation: fadeIn 0.6s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

#### Hover cards
```css
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
```

---

### Responsive Design

**Breakpoints** :
```css
:root {
  --breakpoint-mobile: 750px;
  --breakpoint-tablet: 1000px;
  --breakpoint-desktop: 1250px;
}

/* Mobile */
@media (max-width: 750px) {
  .header-nav { display: none; }
  .hamburger-menu { display: block; }
}

/* Tablet */
@media (min-width: 751px) and (max-width: 1000px) {
  .grid-projects { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */
@media (min-width: 1001px) {
  .grid-projects { grid-template-columns: repeat(3, 1fr); }
}
```

---

## 💻 Développement & Bonnes Pratiques

### Convention de nommage

**Fichiers & Dossiers** :
- Composants : PascalCase (`ProjectCard.jsx`, `Header.jsx`)
- Hooks : camelCase avec préfixe `use` (`useProjects.js`)
- Styles : même nom que le composant + `.module.css`
- Utilitaires : camelCase (`helpers.js`, `constants.js`)

**Variables & Fonctions** :
- Variables : camelCase (`projectData`, `isVisible`)
- Constantes : UPPER_SNAKE_CASE (`API_URL`, `MAX_PROJECTS`)
- Fonctions : camelCase (`fetchProjects`, `handleSubmit`)
- Composants : PascalCase (`ProjectCard`, `Header`)

---

### Architecture des composants

**Principe** : Composants fonctionnels + Hooks

**Structure d'un composant** :
```javascript
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  // Hooks en haut
  const [isHovered, setIsHovered] = React.useState(false);

  // Handlers
  const handleClick = () => {
    // ...
  };

  // Render
  return (
    <article className={styles.card}>
      {/* JSX */}
    </article>
  );
};

// PropTypes
ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProjectCard;
```

---

### Gestion de l'état

**Context API** :

```javascript
// src/contexts/LanguageContext.jsx
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('fr');

  const switchLanguage = (newLang) => setLang(newLang);

  return (
    <LanguageContext.Provider value={{ lang, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
```

**Usage** :
```javascript
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const { lang, switchLanguage } = useLanguage();
  // ...
};
```

---

### Hooks personnalisés

**Exemple : useProjects**

```javascript
// src/hooks/useProjects.js
import { useState, useEffect } from 'react';
import projectsData from '../data/projects.json';

export const useProjects = (category = null) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filtered = category
      ? projectsData.projects.filter(p => p.category === category)
      : projectsData.projects;

    setProjects(filtered.sort((a, b) => a.order - b.order));
    setLoading(false);
  }, [category]);

  return { projects, loading };
};
```

**Usage** :
```javascript
import { useProjects } from '../hooks/useProjects';

const Projects = () => {
  const { projects, loading } = useProjects();
  
  if (loading) return <div>Chargement...</div>;
  
  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
```

---

### Gestion des formulaires

**React Hook Form** :

```javascript
import { useForm } from 'react-hook-form';

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const mailtoLink = `mailto:leo.peyronnet@example.com?subject=Contact depuis le portfolio&body=Nom: ${data.name}%0D%0AEmail: ${data.email}%0D%0AMessage: ${data.message}`;
    window.location.href = mailtoLink;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('name', { required: 'Le nom est requis' })}
        placeholder="Votre nom"
      />
      {errors.name && <span>{errors.name.message}</span>}

      <input
        {...register('email', {
          required: 'L\'email est requis',
          pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' }
        })}
        placeholder="Votre email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <textarea
        {...register('message', { required: 'Le message est requis' })}
        placeholder="Votre message"
      />
      {errors.message && <span>{errors.message.message}</span>}

      <button type="submit">Envoyer</button>
    </form>
  );
};
```

---

### Optimisations Performance

**Lazy Loading des composants** :
```javascript
import React, { lazy, Suspense } from 'react';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail/ProjectDetail'));

const App = () => (
  <Suspense fallback={<div>Chargement...</div>}>
    <ProjectDetail />
  </Suspense>
);
```

---

**Lazy Loading des images** :
```javascript
<img
  src={project.images.hero}
  alt={project.title}
  loading="lazy"
/>
```

---

**Code Splitting par route** :
```javascript
// src/routes.jsx
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home/Home'));
const Projects = lazy(() => import('./pages/Projects/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail/ProjectDetail'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'projects', element: <Projects /> },
      { path: 'projects/:slug', element: <ProjectDetail /> },
    ]
  }
]);
```

---

## 🔍 SEO & Performance

### SEO Dynamique (React Helmet Async)

**Configuration globale** :

```javascript
// src/utils/seo.js
export const seoConfig = {
  home: {
    title: 'Léo Peyronnet - Développeur Full-Stack React & Spring Boot',
    description: 'Développeur web spécialisé en React et Spring Boot. Portfolio de projets full-stack, sites vitrines et applications web. Disponible en freelance.',
    keywords: 'développeur react, développeur spring boot, développeur full-stack, freelance web, portfolio développeur',
    ogImage: '/img/og-home.jpg',
  },
  projects: {
    title: 'Mes Projets | Léo Peyronnet',
    description: 'Découvrez mes réalisations : projets clients, applications web React, sites vitrines et expérimentations techniques.',
    keywords: 'portfolio développeur, projets react, sites web, applications web',
    ogImage: '/img/og-projects.jpg',
  },
  services: {
    title: 'Mes Services | Léo Peyronnet',
    description: 'Offres de développement web : sites vitrine, e-commerce, applications React. De 1500€ à 4000€. Freelance disponible.',
    keywords: 'développeur freelance, site web sur mesure, application react, e-commerce',
    ogImage: '/img/og-services.jpg',
  },
  about: {
    title: 'À propos | Léo Peyronnet',
    description: 'Développeur full-stack passionné par React et le web. Diplômé CDA, expérience en développement front-end et back-end.',
    keywords: 'développeur web, parcours développeur, compétences react',
    ogImage: '/img/og-about.jpg',
  },
};

export const generateProjectSEO = (project) => ({
  title: `${project.title} | Léo Peyronnet`,
  description: project.description,
  keywords: `${project.title}, ${project.technologies.map(t => t.name).join(', ')}, projet ${project.category}`,
  ogImage: project.images.hero,
});
```

---

**Usage dans les pages** :

```javascript
import { Helmet } from 'react-helmet-async';
import { seoConfig } from '../utils/seo';

const Home = () => {
  const seo = seoConfig.home;

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.ogImage} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage} />
      </Helmet>

      {/* Contenu de la page */}
    </>
  );
};
```

---

**Usage dynamique (ProjectDetail)** :

```javascript
import { generateProjectSEO } from '../utils/seo';

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = /* fetch project by slug */;
  const seo = generateProjectSEO(project);

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta property="og:image" content={seo.ogImage} />
      </Helmet>

      {/* Contenu du projet */}
    </>
  );
};
```

---

### Sitemap XML

**Générer le sitemap manuellement** :

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://portfolio.leopeyronnet.fr/</loc>
    <lastmod>2026-01-26</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://portfolio.leopeyronnet.fr/projects</loc>
    <lastmod>2026-01-26</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://portfolio.leopeyronnet.fr/projects/attilio-terlizzi</loc>
    <lastmod>2026-01-26</lastmod>
    <priority>0.8</priority>
  </url>
  <!-- Ajouter toutes les pages/projets -->
</urlset>
```

**Ou utiliser un package** : `vite-plugin-sitemap`

---

### Performance

**Checklist** :

- ✅ **Lazy loading** : Images, composants, routes
- ✅ **Code splitting** : Route-based splitting automatique
- ✅ **Minification** : CSS/JS automatique via Vite
- ✅ **Compression images** : Optimiser les images avant upload (WebP recommandé)
- ✅ **Caching** : Headers HTTP configurés sur le serveur
- ✅ **Fonts** : Google Fonts avec `display=swap`

---

### Accessibilité

**Checklist** :

- ✅ **Attributs ARIA** : `aria-label`, `aria-labelledby`, `role`
- ✅ **Textes alternatifs** : `alt` sur toutes les images
- ✅ **Navigation clavier** : Tab, Entrée, Échap fonctionnels
- ✅ **Contraste** : Ratio WCAG AA (4.5:1 minimum)
- ✅ **Focus visible** : Outline sur les éléments interactifs
- ✅ **Landmarks** : `<header>`, `<nav>`, `<main>`, `<footer>`

---

## 📅 Planning & Livrables

### Phases du projet

| Phase | Durée | Livrables |
|-------|-------|-----------|
| **Phase 1 : Setup & Architecture** | 1 semaine | - Projet Vite configuré<br>- Architecture dossiers<br>- Composants de base (Header, Footer)<br>- Routing React Router<br>- Variables CSS globales |
| **Phase 2 : Pages principales** | 2 semaines | - Page Accueil complète<br>- Page Projets avec filtres<br>- Page Services<br>- Page À propos |
| **Phase 3 : Détails projets** | 1 semaine | - Pages détail projet<br>- Galerie images<br>- Navigation inter-projets |
| **Phase 4 : Formulaire & SEO** | 1 semaine | - Formulaire de contact<br>- React Helmet Async<br>- Sitemap<br>- Optimisations performance |
| **Phase 5 : Tests & Déploiement** | 1 semaine | - Tests navigateurs<br>- Tests responsive<br>- Pipeline GitHub Actions<br>- Déploiement Docker |

**Durée totale estimée** : 6 semaines

---

### Livrables finaux

**Techniques** :
- ✅ Code source React complet
- ✅ Documentation README
- ✅ Fichier Dockerfile
- ✅ Configuration GitHub Actions
- ✅ Sitemap XML
- ✅ Données JSON (projets, services)

**Fonctionnels** :
- ✅ Site déployé sur domaine personnalisé
- ✅ SEO optimisé (meta tags, Open Graph)
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Formulaire de contact fonctionnel
- ✅ Navigation fluide et intuitive

**Optionnels (v2)** :
- 🔮 Mode sombre/clair
- 🔮 Support multilingue (FR/EN)
- 🔮 Blog technique
- 🔮 Analytics (Plausible ou Umami)

---

## 🎯 Critères de Succès

**Objectifs mesurables** :

### Performance
- ✅ **Lighthouse Score** : >90/100 (Performance, Accessibility, Best Practices, SEO)
- ✅ **Temps de chargement** : <2s (First Contentful Paint)
- ✅ **Taille du bundle** : <500KB (JS + CSS)

### SEO
- ✅ Indexation Google : Toutes les pages indexées
- ✅ Meta tags : Présents sur toutes les pages
- ✅ Open Graph : Images et descriptions configurées

### UX
- ✅ Navigation intuitive : Moins de 3 clics pour accéder à un projet
- ✅ Responsive : Testé sur 5 devices (iPhone, Android, Tablet, Desktop)
- ✅ Accessibilité : Navigation clavier fonctionnelle

### Conversion
- ✅ Taux de contact : >2% des visiteurs (objectif freelance)
- ✅ Temps sur site : >1min30 (engagement recruteurs)

---

## 🔧 Stack Technique Résumée

| Couche | Technologies |
|--------|-------------|
| **Frontend** | React 18, React Router 6, CSS Modules |
| **Build** | Vite 5 |
| **State** | Context API |
| **Forms** | React Hook Form |
| **SEO** | React Helmet Async |
| **Animations** | React Bits + CSS Transitions |
| **Data** | JSON statique |
| **Déploiement** | Docker + GitHub Actions |
| **Hébergement** | Serveur personnel |

---

## 📝 Notes Finales

### Évolutions futures (post-MVP)

**V2 (Court terme)** :
- 🔮 Ajout de 2-3 projets clients fictifs ultra-réalistes
- 🔮 Témoignages clients réels
- 🔮 Page "Compétences" détaillée (grille technologies)
- 🔮 Blog technique (articles sur React, Spring Boot)

**V3 (Moyen terme)** :
- 🔮 Support multilingue (EN)
- 🔮 Mode sombre/clair
- 🔮 Analytics (Plausible)
- 🔮 Formulaire avec EmailJS (confirmations auto)

**V4 (Long terme)** :
- 🔮 CMS headless (Strapi, Sanity)
- 🔮 Espace client privé (suivi projets)
- 🔮 Chatbot IA (support prospects)

---

### Ressources & Références

**Documentation** :
- [React Docs](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [React Helmet Async](https://github.com/staylor/react-helmet-async)
- [React Bits](https://github.com/DavidHDev/react-bits)
- [Vite Guide](https://vitejs.dev/guide/)

**Inspiration Design** :
- [Awwwards](https://www.awwwards.com/)
- [Dribbble](https://dribbble.com/tags/developer-portfolio)
- [Behance](https://www.behance.net/)

---

**Fin du Cahier des Charges**

*Version 1.0 - Janvier 2026*  
*Rédigé pour : Léo Peyronnet*  
*Projet : Refonte Portfolio React*
