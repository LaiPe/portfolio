import React from "react";

/**
 * Rend un sous-ensemble minimal de Markdown inline (**gras**, *italique*) et
 * les paragraphes (séparés par `\n\n`). Suffisant pour les textes stockés dans
 * les JSON de configuration (ex. about.json) sans dépendance externe.
 * Pour du Markdown riche issu de fichiers, on passe par MDX (pages projet, cf. PATTERN.md §11).
 */
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export default function MarkdownText({ children }: { children: string }) {
  return (
    <>
      {children.split("\n\n").map((paragraph, i) => (
        <p key={i}>{renderInline(paragraph)}</p>
      ))}
    </>
  );
}
