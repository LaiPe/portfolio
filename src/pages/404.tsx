import React from "react";
import { type HeadFC } from "gatsby";

import Button from "../components/common/Button/Button";
import Seo from "../components/Seo";

export default function NotFoundPage() {
  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        gap: "1rem",
      }}
    >
      <h1 style={{ fontSize: "4rem", margin: 0 }}>404</h1>
      <p>La page demandée n'a pas été trouvée.</p>
      <Button to="/" variant="primary">
        Retour à l'accueil
      </Button>
    </main>
  );
}

export const Head: HeadFC = () => <Seo title="404 — Page introuvable | Léo Peyronnet" />;
