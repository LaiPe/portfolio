import Card from "../../common/Card/Card";
import styles from "./ServiceCard.module.css";

export default function ServiceCard({ service }) {
    return (
        <Card className={styles.serviceCard}>
            <div className={styles.header}>
                <span className={styles.icon}>{service.icon}</span>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.price}>{service.priceLabel}</p>
            </div>
            <p className={styles.target}>{service.target}</p>
            <ul className={styles.features}>
                {service.features.map((feature, index) => (
                    <li key={index} className={styles.feature}>
                        <span className={styles.checkmark}>✓</span>
                        {feature}
                    </li>
                ))}
            </ul>
            <p className={styles.delay}>Délai : {service.delay}</p>
        </Card>
    );
}
