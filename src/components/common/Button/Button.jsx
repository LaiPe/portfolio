import { Link } from "react-router-dom";
import styles from "./Button.module.css";

export default function Button({ 
    children, 
    to = null, 
    href = null, 
    onClick = null, 
    variant = "primary", 
    size = "md",
    className = ""
}) {
    const classNames = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`.trim();

    if (to) {
        return (
            <Link to={to} className={classNames}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={classNames} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={classNames}>
            {children}
        </button>
    );
}
