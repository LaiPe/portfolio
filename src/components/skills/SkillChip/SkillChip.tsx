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
  const exact = skillsByName.get(name);
  if (exact) return exact;
  // « Next.js 16 », « JavaScript vanilla » : même logo et même niveau que la
  // compétence de base, en gardant le libellé d'origine.
  const base = skillsByName.get(name.slice(0, name.lastIndexOf(" ")));
  return base ? { ...base, name } : { name };
}

interface SkillChipProps {
  skill: SkillItem;
  /** Savoir-être : puce à bordure, pour la distinguer des technologies. */
  soft?: boolean;
  /**
   * Ignore le niveau de la compétence : puce grise avec logo. Pour les projets,
   * où l'attention doit rester sur le projet et non sur la technologie.
   */
  neutral?: boolean;
}

/** Puce de compétence (logo + nom), à placer dans une liste `<ul>`. */
export default function SkillChip({ skill, soft, neutral }: SkillChipProps) {
  const variant = soft ? styles.soft : skill.level && !neutral ? levelClass[skill.level] : "";
  return (
    <li className={`${styles.chip} ${variant}`}>
      {skill.icon && <TechIcon name={skill.icon} size={14} />}
      {skill.name}
    </li>
  );
}
