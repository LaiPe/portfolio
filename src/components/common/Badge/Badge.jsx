import styles from "./Badge.module.css";

export default function Badge({ children, variant = "default", className = "" }) {
    const classNames = `${styles.badge} ${styles[variant]} ${className}`.trim();

    return (
        <span className={classNames}>
            {children}
        </span>
    );
}
