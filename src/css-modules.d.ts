// Déclarations pour les imports de styles en TypeScript.
// css-loader (config Gatsby) émet des exports nommés ; on consomme les modules
// via `import * as styles from "./x.module.css"`. La déclaration expose donc le
// module comme un objet indexable (clé = nom de classe, valeur = nom généré).
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export = classes;
}

// Imports CSS globaux (effets de bord, ex. theme.css, fonts.css, Threads.css).
declare module "*.css";
