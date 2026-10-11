import React from "react";
import Icon from "../../common/Icon/Icon";
import TechIcon from "../../common/TechIcon/TechIcon";
import type { SkillItem } from "../../../types";
import * as styles from "./SkillCard.module.css";

interface SkillCardProps {
  title: string;
  icon: string;
  items: SkillItem[];
}

/** Une catégorie de l'accueil : la compétence `signature` en grande tuile,
 *  puis les autres en liste compacte (une par ligne, sans tuile orpheline). */
export default function SkillCard({ title, icon, items }: SkillCardProps) {
  const signatures = items.filter((item) => item.level === "signature");
  const others = items.filter((item) => item.level !== "signature");

  return (
    <div className={styles.skillCard}>
      <div className={styles.header}>
        <Icon name={icon} className={styles.icon} size={20} />
        <h3 className={styles.title}>{title}</h3>
      </div>

      {signatures.map((item) => (
        <div key={item.name} className={styles.signature} title={item.name}>
          {item.icon && <TechIcon name={item.icon} size={44} />}
          <span className={styles.signatureName}>{item.short ?? item.name}</span>
        </div>
      ))}

      {others.length > 0 && (
        <ul className={styles.list}>
          {others.map((item) => (
            <li key={item.name} className={styles.row} title={item.name}>
              {item.icon && <TechIcon name={item.icon} size={20} className={styles.rowIcon} />}
              <span>{item.short ?? item.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
