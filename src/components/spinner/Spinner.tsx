import React from "react";
import * as styles from "./Spinner.module.css";

interface SpinnerProps {
  small?: boolean;
  fullscreen?: boolean;
  className?: string;
}

export default function Spinner({
  small = false,
  fullscreen = false,
  className = "",
  ...props
}: SpinnerProps) {
  return (
    <div
      className={`${styles.spinnerContainer} ${fullscreen ? styles.fullscreen : ""} ${className}`}
      {...props}
    >
      <div className={`${styles.spinner} ${small ? styles.small : ""}`}></div>
    </div>
  );
}
