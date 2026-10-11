import React from "react";

/** Contour très simplifié de la France métropolitaine (~40 points lon/lat,
 *  projection équirectangulaire) : un « hexagone » stylisé, pas une carte exacte. */
const OUTLINE =
  "M52.3 3.5 L64.7 13 L68.8 12.5 L77.7 19 L92.2 24.3 L89.4 28 L88.1 38 L83.2 40 L77.7 52 L82.6 50 L83.9 55 L81.2 63 L83.9 72 L87.4 76.2 L85.7 77 L76.4 83 L72.6 81 L67.4 80 L56.4 82 L56.8 89 L47.5 89 L35.8 87 L23.4 80.5 L25.8 78 L27.5 68 L28.2 59 L27.5 52.5 L20.6 43 L15.1 39 L5.5 36 L3.1 30.5 L8.3 27 L15.1 26 L22 28 L24.8 27.5 L24.8 26 L22.7 17 L27.2 17 L28.2 20.5 L36.5 19.5 L45.4 13 L46.8 5 Z";

/** Villes dans le même repère que OUTLINE ; `home` = point d'attache. */
const CITIES = [
  { name: "Clermont-Ferrand", x: 57, y: 56.2, home: true },
  { name: "Lyon", x: 69.1, y: 56.4 },
  { name: "Annecy", x: 78, y: 55 },
  { name: "Bordeaux", x: 31.8, y: 65.6 },
];

/** Mini-carte décorative de la carte « Mobilité » ; trace en `currentColor`. */
export default function FranceMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 92" className={className} role="img" aria-label="Carte : Clermont-Ferrand, Lyon, Annecy, Bordeaux et l'international">
      <path
        d={OUTLINE}
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeOpacity="0.6"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Vers l'international */}
      <path
        d="M80 52 Q 92 40 104 34"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeDasharray="3 2.5"
        strokeLinecap="round"
      />
      <path d="M99.5 32.5 L105 33.6 L101.6 38" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      {CITIES.map((city) => (
        <g key={city.name}>
          {city.home && (
            <circle cx={city.x} cy={city.y} r="5.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          )}
          <circle cx={city.x} cy={city.y} r="2.6" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}
