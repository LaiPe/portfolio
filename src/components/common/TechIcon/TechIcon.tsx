import React from "react";
import { Braces, Database, Layers, Repeat, type LucideIcon } from "lucide-react";
import {
  siAngular,
  siApachemaven,
  siBootstrap,
  siC,
  siClaude,
  siCss,
  siDocker,
  siDrizzle,
  siExpo,
  siExpress,
  siFigma,
  siGatsby,
  siGit,
  siGithub,
  siGithubcopilot,
  siH2database,
  siHibernate,
  siHtml5,
  siJavascript,
  siJest,
  siJunit5,
  siMedusa,
  siMongodb,
  siMysql,
  siNetlify,
  siNodedotjs,
  siNextdotjs,
  siNotion,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siSelenium,
  siSpring,
  siSpringboot,
  siSpringsecurity,
  siSupabase,
  siTestinglibrary,
  siTypescript,
  siUml,
  siVercel,
  siZod,
} from "simple-icons";

interface BrandIcon {
  path: string;
  /** viewBox du tracé ; Simple Icons est en 24x24, Devicon en 128x128. */
  viewBox?: string;
}

/**
 * Logos de technologies et de réseaux (Simple Icons, CC0), rendus en monochrome
 * (`currentColor`). Java, AWS et LinkedIn, absents de Simple Icons, viennent de
 * Devicon (MIT) : https://devicon.dev
 */
const brandIcons: Record<string, BrandIcon> = {
  java: {
    viewBox: "0 0 128 128",
    path: "M47.617 98.12c-19.192 5.362 11.677 16.439 36.115 5.969-4.003-1.556-6.874-3.351-6.874-3.351-10.897 2.06-15.952 2.222-25.844 1.092-8.164-.935-3.397-3.71-3.397-3.71zm33.189-10.46c-14.444 2.779-22.787 2.69-33.354 1.6-8.171-.845-2.822-4.805-2.822-4.805-21.137 7.016 11.767 14.977 41.309 6.336-3.14-1.106-5.133-3.131-5.133-3.131zm11.319-60.575c.001 0-42.731 10.669-22.323 34.187 6.024 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.793 15.634-29.58zm9.998 81.144s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.095.171-4.45-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.952-3.487-32.013 6.85-13.742 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM85 77.896c2.395-1.634 5.703-3.053 5.703-3.053s-9.424 1.685-18.813 2.474c-11.494.964-23.823 1.154-30.012.326-14.652-1.959 8.033-7.348 8.033-7.348s-8.812-.596-19.644 4.644C17.455 81.134 61.958 83.958 85 77.896zm5.609 15.145c-.108.29-.468.616-.468.616 31.273-8.221 19.775-28.979 4.822-23.725-1.312.464-2 1.543-2 1.543s.829-.334 2.678-.72c7.559-1.575 18.389 10.119-5.032 22.286zM64.181 70.069c-4.614-10.429-20.26-19.553.007-35.559C89.459 14.563 76.492 1.587 76.492 1.587c5.23 20.608-18.451 26.833-26.999 39.667-5.821 8.745 2.857 18.142 14.688 28.815zm27.274 51.748c-19.187 3.612-42.854 3.191-56.887.874 0 0 2.874 2.38 17.646 3.331 22.476 1.437 57-.8 57.816-11.436.001 0-1.57 4.032-18.575 7.231z",
  },
  aws: {
    viewBox: "0 0 128 128",
    path: "M108.59 26.148c-1.852 0-3.622.211-5.305.715-1.684.504-3.117 1.223-4.379 2.188a10.829 10.829 0 0 0-3.031 3.453c-.757 1.348-1.137 2.906-1.137 4.676 0 2.187.716 4.25 2.106 6.105 1.386 1.895 3.66 3.324 6.734 4.293l6.106 1.895c2.062.675 3.496 1.391 4.254 2.191.757.801 1.136 1.765 1.136 2.945 0 1.726-.758 3.074-2.191 4-1.43.925-3.492 1.391-6.145 1.391-1.687 0-3.328-.168-5.011-.504a23.102 23.102 0 0 1-4.633-1.476c-.421-.168-.801-.336-1.051-.418a2.357 2.357 0 0 0-.758-.13c-.634 0-.969.423-.969 1.305v2.149a2.919 2.919 0 0 0 .254 1.18c.168.38.629.8 1.305 1.18 1.094.628 2.734 1.179 4.84 1.683 2.105.504 4.297.758 6.484.758 2.15 0 4.129-.297 6.024-.883 1.808-.551 3.367-1.309 4.672-2.36 1.304-1.01 2.316-2.273 3.074-3.707.714-1.429 1.094-3.07 1.094-4.882 0-2.188-.633-4.168-1.938-5.895-1.304-1.727-3.491-3.074-6.523-4.043l-5.98-1.895c-2.23-.713-3.79-1.516-4.634-2.316-.84-.797-1.261-1.808-1.261-2.988 0-1.726.671-2.95 1.98-3.746 1.305-.801 3.199-1.18 5.598-1.18 2.988 0 5.683.547 8.086 1.64.714.337 1.261.508 1.597.508.633 0 .969-.463.969-1.347v-1.98c0-.59-.125-1.051-.379-1.391-.25-.378-.672-.715-1.262-1.051-.422-.254-1.011-.504-1.77-.758a32.528 32.528 0 0 0-2.398-.676c-.886-.168-1.769-.336-2.738-.46a21.347 21.347 0 0 0-2.82-.169zm-86.822.082c-2.316 0-4.508.254-6.57.801-2.063.505-3.831 1.137-5.303 1.895-.59.297-.97.59-1.18.883-.211.296-.293.8-.293 1.476v2.063c0 .882.293 1.304.883 1.304.168 0 .378-.043.674-.125.293-.086.796-.254 1.472-.547a33.416 33.416 0 0 1 4.547-1.433A19.176 19.176 0 0 1 20.547 32c3.242 0 5.513.633 6.863 1.938 1.304 1.303 1.98 3.534 1.98 6.734v3.074c-1.683-.379-3.283-.715-4.843-.926-1.558-.21-3.031-.336-4.461-.336-4.34 0-7.75 1.094-10.316 3.286-2.571 2.187-3.832 5.093-3.832 8.671 0 3.368 1.05 6.063 3.113 8.086 2.066 2.02 4.887 3.032 8.422 3.032 4.97 0 9.097-1.938 12.379-5.813a34.153 34.153 0 0 0 1.304 2.484 13.28 13.28 0 0 0 1.516 1.98c.422.38.844.59 1.266.59.334 0 .714-.128 1.093-.378l2.653-1.77c.546-.42.8-.843.8-1.261a1.86 1.86 0 0 0-.293-.97 22.469 22.469 0 0 1-1.347-3.03c-.297-.925-.465-2.19-.465-3.75h-.086V40c0-4.633-1.176-8.086-3.492-10.36-2.36-2.273-6.025-3.41-11.033-3.41zm19.58 1.012c-.676 0-1.012.379-1.012 1.051 0 .297.129.844.379 1.687l9.894 32.547c.254.8.547 1.387.887 1.641.336.297.84.422 1.598.422h3.62c.759 0 1.347-.125 1.684-.422.34-.293.591-.84.801-1.684l6.485-27.117 6.527 27.16c.168.84.46 1.387.8 1.684.337.292.883.422 1.684.422h3.621c.715 0 1.262-.167 1.598-.422.34-.253.633-.8.887-1.64L90.949 30.02c.168-.46.25-.797.293-1.051.043-.254.086-.466.086-.676 0-.715-.379-1.05-1.055-1.05H86.36c-.757 0-1.308.166-1.644.421-.293.25-.59.8-.84 1.64L76.59 57.517l-6.653-28.211c-.166-.8-.464-1.39-.8-1.64-.336-.298-.884-.423-1.684-.423h-3.367c-.758 0-1.348.167-1.688.422-.335.25-.588.8-.796 1.64l-6.57 27.876-7.075-27.875c-.25-.8-.504-1.39-.84-1.64-.297-.298-.844-.423-1.644-.423h-4.125zM21.64 47.496a31.816 31.816 0 0 1 3.96.25 34.401 34.401 0 0 1 3.872.719v1.765c0 1.435-.168 2.653-.422 3.665-.25 1.01-.758 1.895-1.43 2.695-1.137 1.262-2.484 2.187-4 2.695-1.516.504-2.949.758-4.336.758-1.937 0-3.41-.508-4.422-1.559-1.054-1.01-1.558-2.484-1.558-4.464 0-2.106.675-3.704 2.062-4.84 1.391-1.137 3.454-1.684 6.274-1.684zM118 73.348c-4.432.063-9.664 1.052-13.621 3.832-1.223.883-1.012 2.062.336 1.894 4.508-.547 14.44-1.726 16.21.547 1.77 2.23-1.976 11.62-3.663 15.79-.504 1.26.59 1.769 1.726.8 7.41-6.231 9.348-19.242 7.832-21.137-.757-.925-4.388-1.79-8.82-1.726zM1.63 75.859c-.926.116-1.347 1.236-.368 2.121 16.508 14.902 38.359 23.872 62.613 23.872 17.305 0 37.43-5.43 51.281-15.66 2.273-1.689.298-4.254-2.02-3.204-15.533 6.57-32.421 9.77-47.788 9.77-22.778 0-44.8-6.273-62.653-16.633-.39-.231-.755-.304-1.064-.266z",
  },
  linkedin: {
    viewBox: "0 0 128 128",
    path: "M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3zM39.17 107H21.06V48.73h18.11zm-9-66.21a10.5 10.5 0 1110.49-10.5 10.5 10.5 0 01-10.54 10.48zM107 107H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53V48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75z",
  },
  // Sigle seul : sous-tracés du logo Simple Icons « Malt », recadrés (sans le mot « malt »).
  malt: {
    viewBox: "0 9.39 6.03 6.03",
    path: "M3.499 13.563l-.21.21.619.618c.304.304.79.598 1.244.144.339-.34.26-.695.073-.98-.06.004-1.726.008-1.726.008zm-.963-2.325.21-.21-.608-.607c-.304-.303-.765-.621-1.243-.143-.351.35-.273.692-.087.97Zm2.86.416c-.037.043-1.511 1.524-1.511 1.524h1.154c.43 0 .981-.101.981-.777 0-.496-.296-.683-.624-.747zm-3.244-.031H.981c-.43 0-.981.135-.981.778 0 .479.307.676.641.745.04-.046 1.511-1.523 1.511-1.523zm1.484 3.04-.618-.618-.608.607a2.613 2.613 0 0 1-.137.128c.07.333.266.639.745.639s.676-.307.745-.641c-.043-.037-.085-.073-.127-.115zM2.41 10.15l.608.607.618-.618a2.25 2.25 0 0 1 .128-.118c-.065-.327-.251-.623-.747-.623s-.682.297-.746.625c.046.04.092.08.14.127zm2.742.117c-.455-.454-.94-.16-1.244.144l-2.87 2.87c-.303.303-.621.765-.143 1.243.478.478.94.16 1.243-.143l2.87-2.87c.304-.304.598-.79.144-1.244Z",
  },
  angular: siAngular,
  apachemaven: siApachemaven,
  bootstrap: siBootstrap,
  c: siC,
  claude: siClaude,
  css: siCss,
  docker: siDocker,
  drizzle: siDrizzle,
  expo: siExpo,
  express: siExpress,
  figma: siFigma,
  gatsby: siGatsby,
  git: siGit,
  github: siGithub,
  githubcopilot: siGithubcopilot,
  h2database: siH2database,
  hibernate: siHibernate,
  html5: siHtml5,
  javascript: siJavascript,
  jest: siJest,
  junit5: siJunit5,
  medusa: siMedusa,
  mongodb: siMongodb,
  mysql: siMysql,
  netlify: siNetlify,
  nodedotjs: siNodedotjs,
  nextdotjs: siNextdotjs,
  notion: siNotion,
  postgresql: siPostgresql,
  postman: siPostman,
  python: siPython,
  react: siReact,
  selenium: siSelenium,
  spring: siSpring,
  springboot: siSpringboot,
  springsecurity: siSpringsecurity,
  supabase: siSupabase,
  testinglibrary: siTestinglibrary,
  typescript: siTypescript,
  uml: siUml,
  vercel: siVercel,
  zod: siZod,
};

/** Notions sans logo de marque : icône générique `lucide-react`. */
const genericIcons: Record<string, LucideIcon> = {
  sql: Database,
  api: Braces,
  agile: Repeat,
  layers: Layers,
};

/** Drapeaux (langues parlées), monochromes comme les logos : trois nuances de
 *  `currentColor` mélangées au blanc (pas d'opacité, pour que les aplats qui se
 *  superposent restent nets). Ratio 3:2 ; pas d'emoji, Windows ne les affiche pas. */
const DARK = { fill: "currentColor" };
const MID = { fill: "color-mix(in srgb, currentColor 55%, white)" };
const LIGHT = { fill: "color-mix(in srgb, currentColor 18%, white)" };
const strokeOf = (tone: { fill: string }) => ({ stroke: tone.fill, fill: "none" });

function UkFlag() {
  const id = React.useId();
  return (
    <>
      <clipPath id={`${id}s`}>
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id={`${id}t`}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath={`url(#${id}s)`}>
        <path d="M0,0 v30 h60 v-30 z" style={DARK} />
        <path d="M0,0 L60,30 M60,0 L0,30" style={strokeOf(LIGHT)} strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${id}t)`} style={strokeOf(MID)} strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" style={strokeOf(LIGHT)} strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" style={strokeOf(MID)} strokeWidth="6" />
      </g>
    </>
  );
}

const flags: Record<string, { viewBox: string; content: React.ReactNode }> = {
  "flag-fr": {
    viewBox: "0 0 3 2",
    content: (
      <>
        <rect width="1" height="2" style={DARK} />
        <rect x="1" width="1" height="2" style={LIGHT} />
        <rect x="2" width="1" height="2" style={MID} />
      </>
    ),
  },
  // Union Jack au ratio 2:1, étiré en 3:2 comme les autres (preserveAspectRatio="none").
  "flag-gb": { viewBox: "0 0 60 30", content: <UkFlag /> },
  "flag-es": {
    viewBox: "0 0 3 2",
    content: (
      <>
        <rect width="3" height="2" style={DARK} />
        <rect y="0.5" width="3" height="1" style={LIGHT} />
      </>
    ),
  },
};

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}

/** Résout une clé de donnée (`skills.json`) vers un logo ; clé inconnue -> rien. */
export default function TechIcon({ name, size = 16, className }: TechIconProps) {
  const flag = flags[name];
  if (flag) {
    return (
      <svg
        viewBox={flag.viewBox}
        width={Math.round(size * 1.5)}
        height={size}
        preserveAspectRatio="none"
        className={className}
        style={{ borderRadius: 2 }}
        aria-hidden
      >
        {flag.content}
      </svg>
    );
  }

  const Generic = genericIcons[name];
  if (Generic) return <Generic size={size} className={className} aria-hidden />;

  const icon = brandIcons[name];
  if (!icon) return null;
  return (
    <svg
      viewBox={icon.viewBox ?? "0 0 24 24"}
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d={icon.path} />
    </svg>
  );
}
