import React from "react";
import * as styles from "./Container.module.css";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/** Colonne de page : largeur `--max-width`, centrée, avec les marges latérales du site. */
export default function Container({ children, className = "" }: ContainerProps) {
  return <div className={`${styles.container} ${className}`.trim()}>{children}</div>;
}
