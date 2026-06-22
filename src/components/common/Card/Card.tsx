import React from "react";
import * as styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  const classNames =
    `${styles.card} ${hover ? styles.hover : ""} ${className}`.trim();

  return <div className={classNames}>{children}</div>;
}
