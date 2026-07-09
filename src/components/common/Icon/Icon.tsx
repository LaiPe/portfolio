import React from "react";
import {
  Code2,
  Palette,
  Server,
  Database,
  Rocket,
  FlaskConical,
  Repeat,
  Target,
  Lightbulb,
  Handshake,
  Globe,
  Atom,
  ShoppingCart,
  Biohazard,
  MapPin,
  CalendarCheck,
  Star,
  LayoutDashboard,
  BatteryCharging,
  Car,
  Plug,
  FileText,
  ShoppingBag,
  LayoutGrid,
  Image as ImageIcon,
  Inbox,
  Search,
  Heart,
  Drum,
  Clapperboard,
  Waves,
  HelpCircle,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

/**
 * Table de correspondance clé -> icône, utilisée pour les icônes pilotées par
 * de la donnée (JSON, frontmatter MDX) qui ne peut pas référencer un composant
 * directement. Les icônes câblées en dur dans un composant s'importent depuis
 * `lucide-react` sans passer par cette table.
 */
const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  palette: Palette,
  server: Server,
  database: Database,
  rocket: Rocket,
  "flask-conical": FlaskConical,
  repeat: Repeat,
  target: Target,
  lightbulb: Lightbulb,
  handshake: Handshake,
  globe: Globe,
  atom: Atom,
  "shopping-cart": ShoppingCart,
  biohazard: Biohazard,
  "map-pin": MapPin,
  "calendar-check": CalendarCheck,
  star: Star,
  "layout-dashboard": LayoutDashboard,
  "battery-charging": BatteryCharging,
  car: Car,
  plug: Plug,
  "file-text": FileText,
  "shopping-bag": ShoppingBag,
  "layout-grid": LayoutGrid,
  image: ImageIcon,
  inbox: Inbox,
  search: Search,
  heart: Heart,
  drum: Drum,
  clapperboard: Clapperboard,
  waves: Waves,
};

export type IconName = keyof typeof iconMap;

interface IconProps extends LucideProps {
  name: string;
}

/** Résout une clé de donnée (JSON/frontmatter) vers son icône `lucide-react`. */
export default function Icon({ name, ...props }: IconProps) {
  const Component = iconMap[name] ?? HelpCircle;
  return <Component {...props} />;
}
