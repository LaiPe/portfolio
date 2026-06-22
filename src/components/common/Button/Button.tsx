import React from "react";
import { Link } from "gatsby";
import * as styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  to?: string | null;
  href?: string | null;
  onClick?: React.MouseEventHandler | null;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  target?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  to = null,
  href = null,
  onClick = null,
  variant = "primary",
  size = "md",
  className = "",
  target = "_blank",
  ...props
}: ButtonProps) {
  const classNames =
    `${styles.button} ${styles[variant]} ${styles[size]} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classNames} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classNames}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick ?? undefined} className={classNames} {...props}>
      {children}
    </button>
  );
}
