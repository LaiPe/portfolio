import React, { useId, useState, useSyncExternalStore } from "react";
import { Link } from "gatsby";
import { ArrowRight, ChevronDown } from "lucide-react";

import SkillChip, { findSkill } from "../skills/SkillChip/SkillChip";
import type { TimelineEntry } from "../../types";
import * as styles from "./Timeline.module.css";

/** Frise chronologique : date dans la marge (desktop), carte à droite du fil. */
export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className={styles.timeline}>
      {entries.map((entry) => (
        <TimelineItem key={entry.id} entry={entry} />
      ))}
    </ol>
  );
}

/** Nombre de mois entre deux `AAAA-MM`, bornes incluses (comme LinkedIn). */
function monthsBetween(start: string, end: string): number {
  const [startYear, startMonth] = start.split("-").map(Number);
  const [endYear, endMonth] = end.split("-").map(Number);
  return (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
}

/** « 8 mois », « 1 an », « 1 an 10 mois ». */
function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years > 0) parts.push(`${years} an${years > 1 ? "s" : ""}`);
  if (rest > 0 || years === 0) parts.push(`${Math.max(rest, 1)} mois`);
  return parts.join(" ");
}

/** Mois courant (`AAAA-M`) côté navigateur ; `null` au build (SSR) et pendant l'hydratation. */
const subscribeNever = () => () => {};
const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}`;
};
const getServerMonth = () => null;

/**
 * Durée d'une entrée. Terminée (`end`) : calculée au rendu, identique côté
 * serveur et client. En cours : dépend de la date du jour, donc affichée après
 * l'hydratation uniquement (le HTML du build, figé, ne peut pas la contenir).
 */
function Duration({ start, end }: { start: string; end?: string }) {
  const currentMonth = useSyncExternalStore(subscribeNever, getCurrentMonth, getServerMonth);

  const until = end ?? currentMonth;
  if (!until) return null;
  return <span className={styles.duration}>{formatDuration(monthsBetween(start, until))}</span>;
}

function TimelineItem({ entry }: { entry: TimelineEntry }) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  const expandable = Boolean(entry.details?.length);

  return (
    <li className={`${styles.item} ${entry.current ? styles.current : ""}`}>
      <span className={styles.dot} aria-hidden />
      <article className={styles.card}>
        <p className={styles.date}>
          <span className={styles.period}>{entry.period}</span>
          {entry.start && <Duration start={entry.start} end={entry.end} />}
        </p>

        {/* Trois lignes : poste, employeur, modalité · contrat */}
        <h3 className={styles.title}>{entry.title}</h3>
        {entry.organization && (
          <p className={styles.organization}>{entry.organization}</p>
        )}
        {(entry.location || entry.type) && (
          <p className={styles.status}>
            {[entry.location, entry.type].filter(Boolean).join(" · ")}
          </p>
        )}

        {entry.summary && <p className={styles.summary}>{entry.summary}</p>}

        {/* Replié par défaut mais présent dans le HTML (SSR, moteurs de recherche). */}
        {expandable && (
          <div id={detailsId} className={`${styles.details} ${open ? styles.detailsOpen : ""}`}>
            <div className={styles.detailsInner}>
              {entry.details?.map((group, index) => (
                <div key={group.heading ?? index} className={styles.group}>
                  {group.heading && <h4 className={styles.groupHeading}>{group.heading}</h4>}
                  <ul className={styles.groupItems}>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
              {entry.note && <p className={styles.note}>{entry.note}</p>}
              {entry.links && (
                <p className={styles.links}>
                  {entry.links.map((link) => (
                    <Link key={link.to} to={link.to} className={styles.link}>
                      {link.label} <ArrowRight size={14} aria-hidden />
                    </Link>
                  ))}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Après le détail : les compétences et le bouton suivent le bas de la carte */}
        {entry.skills && (
          <ul className={styles.skills}>
            {entry.skills.map((name) => (
              <SkillChip key={name} skill={findSkill(name)} />
            ))}
          </ul>
        )}
        {/* Savoir-être sur leur propre ligne, distincts des technologies */}
        {entry.softSkills && (
          <ul className={styles.skills}>
            {entry.softSkills.map((name) => (
              <SkillChip key={name} skill={{ name }} soft />
            ))}
          </ul>
        )}

        {expandable && (
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls={detailsId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Réduire" : "Voir le détail"}
            <ChevronDown size={16} className={styles.toggleIcon} aria-hidden />
          </button>
        )}
      </article>
    </li>
  );
}
