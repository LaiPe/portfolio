Stonecast est un **produit** conçu, développé et publié en solo, de bout en bout : conception, architecture technique, développement, identité visuelle et documentation.

C'est **le template Next.js pour la location** : un site de location complet, acheté une fois et piloté en autonomie. Le principe : **« Payez une fois. Possédez tout. »** — pas un abonnement, **0 €/mois pour fonctionner**. Et pas un starter à terminer : un **produit fini à personnaliser**.

## Fonctionnalités (v0.5)

Catalogue de produits (catégories, produits, tarifs), back-office admin intuitif permettant de piloter le site sans développeur après l'installation, médiathèque (upload, réorganisation et insertion directe dans les sections), boîte de réception centralisée pour les demandes de contact, site bilingue EN/FR (structure prête pour d'autres langues), SEO ready (métadonnées configurables, URLs propres) et design personnalisable — polices, logo, images et quatre thèmes de couleurs.

## Propriété & absence de lock-in

La base de données est en **PostgreSQL** : aucun verrouillage propriétaire. Le contenu s'exporte intégralement et le site se migre vers n'importe quel hébergeur compatible. Le code source est livré avec le produit.

## Architecture technique

Next.js 16 (App Router), React 19 et TypeScript strict. Données en PostgreSQL via **Supabase** (Row-Level Security, Auth, Storage), envoi d'emails via Resend, validation via Zod, déploiement sur Netlify.

Rendu et cache modernes : **Server Actions** et **Partial Prerendering** avec invalidation par tags. Les fournisseurs (stockage, email) sont abstraits pour évoluer facilement de prestataire.

Système de **licence cryptographique** : tokens signés Ed25519, vérification côté serveur, outillage CLI de génération et de signature des clés.

## Modèle & roadmap

Trois licences one-time : **Personal**, **Launch Pack** et **Agency** (déploiements illimités, marque blanche pour freelances et agences). Un programme *Founding Advantage* offre aux dix premiers acheteurs (Personal / Launch Pack) toutes les futures versions majeures.

Roadmap publique : **v0.5** (version actuelle) → **v1** Réservation → **v2** Gestion complète → **v3** Croissance.
