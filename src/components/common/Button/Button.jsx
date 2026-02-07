import { Link } from "react-router";
import styles from "./Button.module.css";

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
}) {
    const classNames = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`.trim();

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
        <button onClick={onClick} className={classNames} {...props}>
            {children}
        </button>
    );
}
