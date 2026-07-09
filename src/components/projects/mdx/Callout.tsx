import React from "react";
import * as styles from "./mdx.module.css";

type CalloutTone = "insight" | "warning" | "quote";

/**
 * Encart de mise en valeur narrative, entre deux blocs, pour relier récit et faits.
 *
 * ```mdx
 * <Callout tone="insight">
 * Ce projet répond à un enjeu concret de la transition énergétique.
 * </Callout>
 * ```
 */
export default function Callout({
  tone = "insight",
  children,
}: {
  tone?: CalloutTone;
  children: React.ReactNode;
}) {
  return <div className={`${styles.callout} ${styles[tone]}`}>{children}</div>;
}
