import styles from "./SkillCard.module.css";

export default function SkillCard({ title, icon, items }) {
    return (
        <div className={styles.skillCard}>
            <div className={styles.header}>
                <span className={styles.icon}>{icon}</span>
                <h3 className={styles.title}>{title}</h3>
            </div>
            <ul className={styles.list}>
                {items.map((item, index) => (
                    <li key={index} className={styles.item}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
