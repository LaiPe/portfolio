import styles from "./Card.module.css";

export default function Card({ children, className = "", hover = true }) {
    const classNames = `${styles.card} ${hover ? styles.hover : ""} ${className}`.trim();

    return (
        <div className={classNames}>
            {children}
        </div>
    );
}
