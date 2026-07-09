import React from "react";
import Icon from "../../common/Icon/Icon";
import * as styles from "./SkillCard.module.css";

interface SkillItem {
  name: string;
  featured?: boolean;
}

interface SkillCardProps {
  title: string;
  icon: string;
  items: SkillItem[];
}

export default function SkillCard({ title, icon, items }: SkillCardProps) {
  return (
    <div className={styles.skillCard}>
      <div className={styles.header}>
        <Icon name={icon} className={styles.icon} size={20} />
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
