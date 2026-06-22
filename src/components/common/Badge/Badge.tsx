import React from "react";
import * as styles from "./Badge.module.css";

interface BadgeProps {
  children: React.ReactNode;
  variant?: string;
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  // `default` est un mot réservé → la classe CSS s'appelle `defaultVariant`.
  const variantKey = variant === "default" ? "defaultVariant" : variant;
  const classNames =
    `${styles.badge} ${styles[variantKey] ?? ""} ${className}`.trim();

  return <span className={classNames}>{children}</span>;
}
