# Brief — Refonte contenu portfolio (portfolio.leopeyronnet.fr)

> Périmètre : contenu uniquement. La stack (Gatsby), l'architecture de fichiers et
> l'implémentation restent à ta main — je ne me prononce pas dessus.
> Source de contenu : `portfolio-contenu.md`, à utiliser conjointement à ce brief.

## Objectif

Portfolio à double lecture, sans page dédiée à l'une ou l'autre facette :
- **Employeur** (CDI/CDD, via CV ou lettre de motivation) : doit lire compétence,
  sérieux, trajectoire.
- **Client freelance** (via Malt ou réseau) : doit lire fiabilité de livraison,
  autonomie, capacité à porter un projet de bout en bout.
Chaque contenu doit pouvoir être lu par les deux publics sans friction. Pas de
séparation en deux parcours ou deux pages distinctes.

## Classification des projets (verrouillée)

Gradient de crédibilité décroissant, 4 catégories, dans cet ordre :

1. **Missions & clients** — ĀIUS LŎQUENS, Attilio Terlizzi. Rien d'autre.
2. **Produit** — Stonecast seul. Catégorie à un seul élément, volontairement :
   c'est ce qui le distingue du reste.
3. **Études de cas** — Electricity Business, Mélodie & Cie.
4. **Expérimentation technique** — Tours de Hanoï, pálinDrómos, Sim-rhinite.
   Label court pour pills/cards : "Expérimentation".

Ne pas régresser vers l'ancienne grille (Projets clients / Maquettes & études de
cas / Applications Web / Expérimentations techniques) : l'ancien découpage
mélangeait provenance et nature technique, d'où son incohérence.

## Ce qui change par rapport au site actuel

- **Drums Please** (maquette HTML/CSS/JS actuellement en ligne) est **retiré** et
  remplacé par **Stonecast**, produit réel dont Drums Please n'est que le nom de
  démo technique. Ne jamais afficher "Drums Please" comme nom de projet ou
  catégorie — uniquement, si besoin, comme URL de démo technique sous Stonecast.
- **ĀIUS LŎQUENS** entre au portfolio, en catégorie 1, dans sa version « Malt »
  (texte fourni dans `portfolio-contenu.md`). Mission achevée (avril–juillet 2026),
  à formuler au passé.
- **WineToPrime** : absent du portfolio. Ne pas l'ajouter, même en creux ou en
  mention rapide.
- La page **À propos** décrit l'activité freelance par sa nature (conception et
  développement web en indépendant, prise en charge de bout en bout : cadrage,
  design, développement, déploiement, hébergement, maintenance), avec Attilio
  Terlizzi comme référence nommée. **Aucun chiffre de nombre de clients.**
- Le **positionnement** doit intégrer Next.js, actuellement absent du site,
  et sortir du seul cadrage "Junior / front-end React" — voir
  `portfolio-contenu.md` pour la formulation.
- Corriger les liens de footer cassés (`/projects`, `/about`) vers `/projets`,
  `/apropos` si non déjà fait dans la bascule Gatsby.

## Ton

- Sobre, direct, jamais survendu. Pas de superlatifs creux ("expert", "passionné
  par l'excellence"...).
- Un fait par phrase, pas d'empilement d'adjectifs.
- Les métriques et détails techniques réels (stack, durée, fonctionnalités) portent
  la crédibilité — pas l'enthousiasme déclaré.

## Garde-fous — à ne jamais afficher, sous aucune reformulation

- Chiffres de réduction de coût ĀIUS (35 % / 56 %) — utiliser uniquement
  "réduit substantiellement le coût d'exploitation" si le sujet est abordé, ou
  l'omettre.
- Toute mention de COBAS / Bassin d'Arcachon.
- Toute mention de "audiovisuel" ou "IA générative" accolée à ĀIUS — la
  caractérisation publique est "plateforme SaaS", point.
- Le nom "Drums Please" comme nom de projet ou de catégorie (autorisé
  uniquement comme URL de démo sous l'entrée Stonecast).
- WineToPrime, sous quelque forme que ce soit.
- Tout chiffre de nombre de clients freelance non explicitement fourni dans
  `portfolio-contenu.md`.
- Numéro de téléphone en clair (utiliser le formulaire de contact / email).

## Validation avant publication

La version ĀIUS fournie ici suit le périmètre déjà validé par le porteur de
projet pour Malt (pas de version portfolio pré-existante). Si le porteur
souhaite revoir ce texte spécifiquement pour le portfolio, la mise à jour
reviendra séparément.
