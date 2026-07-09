import React from "react";
import Card from "../../common/Card/Card";
import Icon from "../../common/Icon/Icon";
import * as styles from "./ServiceCard.module.css";

interface Service {
  icon: string;
  title: string;
  priceLabel: string;
  target: string;
  features: string[];
  delay: string;
}

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className={styles.serviceCard}>
      <div className={styles.header}>
        <Icon name={service.icon} size={40} className={styles.icon} />
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
