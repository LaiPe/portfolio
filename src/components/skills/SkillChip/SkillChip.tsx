import React from "react";
import TechIcon from "../../common/TechIcon/TechIcon";
import skillsData from "../../../data/skills.json";
import type { SkillCategory, SkillItem, SkillLevel } from "../../../types";
import * as styles from "./SkillChip.module.css";

/** Puce selon l'importance (`level`) : signature > key > aucune. */
const levelClass: Record<SkillLevel, string> = {
  signature: styles.signature,
  key: styles.key,
};

const skillsByName = new Map<string, SkillItem>(
  Object.values(skillsData.skills as Record<string, SkillCategory>).flatMap((category) =>
    category.items.map((item) => [item.name, item] as const),
  ),
);

/**
 * Retrouve une compétence de `skills.json` par son nom, pour afficher ailleurs
 * (expériences…) la même puce que dans la section Compétences. Nom inconnu ->
 * puce neutre, sans logo.
 */
export function findSkill(name: string): SkillItem {
  return skillsByName.get(name) ?? { name };
}

/** Puce de compétence (logo + nom), à placer dans une liste `<ul>`. */
export default function SkillChip({ skill }: { skill: SkillItem }) {
  return (
    <li className={`${styles.chip} ${skill.level ? levelClass[skill.level] : ""}`}>
      {skill.icon && <TechIcon name={skill.icon} size={14} />}
      {skill.name}
    </li>
  );
}
