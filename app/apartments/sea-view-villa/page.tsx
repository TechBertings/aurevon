import Image from "next/image";
import Link from "next/link";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import RoomBook from "../../components/room-book";
import {
  Counter,
  Depth,
  HeroStage,
  Reveal3D,
  S3Styles,
  ScrollBar,
  Words,
} from "../../components/scroll-3d";

export const metadata = {
  title: "Luxury Sea View Villa, Santorini | Aurevon Global Partners",
  description:
    "A private 150 m² villa on a 4,000 m² plot in Santorini. 4 bedrooms, 3 bathrooms, unobstructed Aegean views, walking distance to the beach and 2 km from Fira.",
};

/* EDIT HERE: palette. Same variable names and values as the Piraeus / Pythagoras pages (RoomBook depends on them). */
const palette = {
  "--navy": "#10235e",
  "--navy-deep": "#0a1740",
  "--gold": "#b9791f",
  "--gold-light": "#e2b862",
  "--gold-dark": "#8f5a12",
  "--cream": "#fbf6ea",
  "--paper": "#f3ead6",
  "--sky": "#cfe5f4",
  "--aegean": "#1d7db5",
} as CSSProperties;

const grain: CSSProperties = {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .42 0 0 0 0 .34 0 0 0 0 .22 0 0 0 .14 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
};
const Paper = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 mix-blend-multiply"
    style={grain}
  />
);

const glow = (pos: string, a = 0.22): CSSProperties => ({
  backgroundImage: `radial-gradient(55% 60% at ${pos}, rgba(226,184,98,${a}), transparent 70%)`,
});

/* Vault band: a row of small barrel vaults (echoes the villa's arched roofs) */
const vaultsBg = (color: string): CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='14'><path d='M1 13V8a5 5 0 0 1 10 0V13 M0 13.5H12' fill='none' stroke='${color}' stroke-width='1.2' stroke-linejoin='round'/></svg>")`,
  backgroundRepeat: "repeat-x",
});
const Vaults = ({
  className = "",
  color = "%23b9791f",
}: {
  className?: string;
  color?: string;
}) => (
  <div aria-hidden className={`h-3.5 ${className}`} style={vaultsBg(color)} />
);

/* ───────── IMAGES ─────────
   All files go in public/images/
     santorini-cover.png      brochure cover. CROP OUT the title text (top) and the "4.000 m² plote..." text (bottom)
     villa-aerial-1.png       I    aerial view (flat roof plateau with stone roof)
     villa-aerial-2.png       II   aerial view (pergola between the two vaults)
     villa-aerial-3.png       III  aerial view (front terrace and steps)
     villa-front.png          IV   sea-facing facade render (also used in the overview plate)
     elevation-front.png      V    elevation, dark render and stone (crop off the gold border)
     elevation-side.png       VI   side elevation (crop off the gold border)
     elevation-rear.png       VII  rear elevation (crop off the gold border)
     villa-roof.png           VIII top-down roof plan (crop off the gold border)
     santorini-caldera.png    caldera photo from the "Santorini" brochure page
     santorini-map.png        the island map (crop it to just the map, no title and no legend)
   If your files are .jpg, change EXT below to "jpg". */
const FOLDER = "/images";
const EXT = "png";
const img = (n: string) => `${FOLDER}/${n}.${EXT}`;

/* EDIT HERE: the eight pages of the book, in the order they flip */
const rooms = [
  {
    id: "aerial-1",
    group: "Aerial",
    title: "The villa from above",
    text: "Two vaulted wings and a stone-clad core, set on a generous plot of open Cycladic landscape.",
    src: img("aerial-1"),
    alt: "Aerial view of the villa with two barrel-vaulted wings and a stone-topped centre",
  },
  {
    id: "aerial-2",
    group: "Aerial",
    title: "Terrace and pergola",
    text: "A timber pergola shades the dining terrace between the two vaulted wings.",
    src: img("aerial-2"),
    alt: "Aerial view of the villa showing the timber pergola between the vaulted wings",
  },
  {
    id: "aerial-3",
    group: "Aerial",
    title: "Front terrace and steps",
    text: "Wide steps lead from the garden up to the terrace, framed by low volcanic-stone walls and planting.",
    src: img("aerial-3"),
    alt: "Aerial view of the villa front with terrace steps and a curved stone planter wall",
  },
  {
    id: "facade",
    group: "Exterior",
    title: "The sea-facing facade",
    text: "Rendered vaults and a volcanic stone wall frame the covered terrace.",
    src: img("villa-front"),
    alt: "Sea-facing facade of the villa with two vaulted volumes and a stone wall",
  },
  {
    id: "elevation-front",
    group: "Elevations",
    title: "Front elevation",
    text: "Two vaulted volumes in dark render and volcanic stone, joined by a recessed entrance.",
    src: img("elevation-front"),
    alt: "Front elevation of the villa in dark render and volcanic stone",
  },
  {
    id: "elevation-side",
    group: "Elevations",
    title: "Side elevation",
    text: "A clean, stepped profile with small, carefully placed openings.",
    src: img("elevation-rear"),
    alt: "Side elevation of the villa",
  },
  {
    id: "elevation-rear",
    group: "Elevations",
    title: "Rear elevation",
    text: "Vaulted ends either side of a stone-clad centre with large glazed openings.",
    src: img("elevation-side"),
    alt: "Rear elevation of the villa with vaulted ends and a stone-clad centre",
  },
  {
    id: "roof",
    group: "Plan",
    title: "Roof plan",
    text: "Vaults, flat roofs and stone-clad volumes seen from directly above, with timber decks beside the entrance.",
    src: img("villa-roof"),
    alt: "Top-down view of the villa roofs, stone cladding and timber decks",
  },
];

/* contents strip above the book */
const chapters = [
  { range: "I – III", label: "Aerial views" },
  { range: "IV – VII", label: "Exterior & elevations" },
  { range: "VIII", label: "Roof plan" },
];

/* EDIT HERE: key facts from the brochure */
const stats = [
  { n: 4000, label: "m² plot" },
  { n: 150, label: "m² residence" },
  { n: 4, label: "Bedrooms" },
];

/* ───────── Icons (line style) ───────── */
type IconType = ComponentType<{ className?: string }>;
const icon = (paths: ReactNode): IconType => {
  const I: IconType = ({ className = "h-6 w-6" }) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths}
    </svg>
  );
  return I;
};

const PinIcon = icon(
  <>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.3" />
  </>,
);
const EyeIcon = icon(
  <>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3" />
  </>,
);
const WaveIcon = icon(
  <>
    <path d="M3 9c2 0 2-1.5 4.5-1.5S10 9 12 9s2.5-1.5 4.5-1.5S19 9 21 9" />
    <path d="M3 14c2 0 2-1.5 4.5-1.5S10 14 12 14s2.5-1.5 4.5-1.5S19 14 21 14" />
    <path d="M3 19c2 0 2-1.5 4.5-1.5S10 19 12 19s2.5-1.5 4.5-1.5S19 19 21 19" />
  </>,
);
const HouseIcon = icon(
  <>
    <path d="M3.5 11.5L12 4l8.5 7.5" />
    <path d="M5.5 10v10h13V10" />
    <path d="M10 20v-5.5h4V20" />
  </>,
);
const PlanIcon = icon(
  <>
    <path d="M5 4v16h15" />
    <path d="M5 4h8v7h7v9" />
    <path d="M5 11h3" />
  </>,
);
const BedIcon = icon(
  <>
    <path d="M3 18v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" />
    <path d="M3 15h18" />
    <path d="M6 8V6.5A1.5 1.5 0 0 1 7.5 5h9A1.5 1.5 0 0 1 18 6.5V8" />
    <path d="M3 18v1.5M21 18v1.5" />
  </>,
);
const BathIcon = icon(
  <>
    <path d="M3 12h18v2.5a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 14.5z" />
    <path d="M6 12V6.5A2.5 2.5 0 0 1 8.5 4 2.5 2.5 0 0 1 11 6" />
    <path d="M7 19l-1 2M17 19l1 2" />
  </>,
);
const FloorIcon = icon(
  <>
    <path d="M3 8l9-4 9 4-9 4z" />
    <path d="M3 12l9 4 9-4" />
    <path d="M3 16l9 4 9-4" />
  </>,
);
const DomeIcon = icon(
  <>
    <path d="M5 20v-7a7 7 0 0 1 14 0v7" />
    <path d="M3 20h18" />
    <path d="M10 20v-4a2 2 0 0 1 4 0v4" />
  </>,
);
const StoneIcon = icon(
  <>
    <path d="M4 7h7v5H4zM13 7h7v5h-7zM8.5 12h7v5h-7z" />
  </>,
);
const DiningIcon = icon(
  <>
    <path d="M3 11h18" />
    <path d="M5 11v8M19 11v8M9 11V8h6v3" />
  </>,
);
const TreeIcon = icon(
  <>
    <circle cx="12" cy="9" r="5" />
    <path d="M12 14v7M9 21h6" />
  </>,
);
const SunsetIcon = icon(
  <>
    <path d="M3 18h18" />
    <path d="M7 18a5 5 0 0 1 10 0" />
    <path d="M12 6v2M5 11l1.4 1.4M19 11l-1.4 1.4" />
  </>,
);
const StarIcon = icon(
  <>
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z" />
  </>,
);
const CityIcon = icon(
  <>
    <path d="M3.5 9L12 4l8.5 5z" />
    <path d="M6 11v7M10 11v7M14 11v7M18 11v7" />
    <path d="M4 20h16" />
  </>,
);
const PlaneIcon = icon(
  <>
    <path d="M21 4L3 11l6 2.5L11.5 20 14 14.5z" />
    <path d="M9 13.5L21 4" />
  </>,
);

/* EDIT HERE: from the brochure */
const highlights: { Icon: IconType; value: string; label: string }[] = [
  { Icon: PinIcon, value: "2 km", label: "To Fira" },
  { Icon: WaveIcon, value: "Walking", label: "Distance to the beach" },
  { Icon: EyeIcon, value: "Unobstructed", label: "Sea view" },
];

const specs: { Icon: IconType; text: string }[] = [
  { Icon: PlanIcon, text: "4,000 sq.m. plot" },
  { Icon: HouseIcon, text: "150 sq.m. residence" },
  { Icon: BedIcon, text: "4 Bedrooms" },
  { Icon: BathIcon, text: "3 Bathrooms" },
  { Icon: FloorIcon, text: "Ground floor + first floor" },
];

/* only what is visible in the renders; add pool, heating, AC, etc. here if the brochure lists them */
const features: { Icon: IconType; text: string }[] = [
  { Icon: EyeIcon, text: "Unobstructed ocean view" },
  { Icon: WaveIcon, text: "Walking distance to the beach" },
  { Icon: DomeIcon, text: "Cycladic vaulted architecture" },
  { Icon: StoneIcon, text: "Natural volcanic stone walls" },
  { Icon: DiningIcon, text: "Outdoor dining terrace and sun deck" },
  { Icon: TreeIcon, text: "Landscaped garden with stone terraces" },
];

const overviewParas: ReactNode[] = [
  <>
    Set on a generous <strong>4,000 sq.m. plot</strong> with{" "}
    <strong>uninterrupted ocean views</strong>, this 150 sq.m. residence offers a rare
    combination of privacy, space and proximity to the best of Santorini.
  </>,
  <>
    The beach is within <strong>walking distance</strong>, while{" "}
    <strong>Fira</strong>, the island&rsquo;s capital, is approximately 2 km away, with its
    renowned cliffside views, restaurants, cafés and vibrant atmosphere.
  </>,
];

/* On the map. x / y = where each pin sits on the map image, in %. Nudge them if a ring looks slightly off. */
const keyPlaces: { id: string; name: string; tag: string; x: number; y: number }[] = [
  { id: "villa", name: "The villa, Vourvoulos", tag: "Your property", x: 68, y: 38 },
  { id: "vourvoulo", name: "Vourvoulo Village", tag: "4 min by car", x: 69, y: 45 },
  { id: "vourvoulos-beach", name: "Vourvoulos Beach", tag: "8 min by car", x: 80, y: 41 },
  { id: "fira", name: "Fira", tag: "≈ 2 km, island capital", x: 64, y: 23 },
  { id: "imerovigli", name: "Imerovigli", tag: "Caldera views", x: 57, y: 37 },
  { id: "oia", name: "Oia", tag: "Caldera village & sunsets", x: 31, y: 29 },
  { id: "cable-car", name: "Santorini Cable Car", tag: "To the old port", x: 63, y: 46 },
  { id: "athinios", name: "Athinios Port", tag: "Main ferry port", x: 56, y: 60 },
  { id: "airport", name: "Santorini International Airport", tag: "Airport", x: 82, y: 59 },
  { id: "monolithos", name: "Monolithos Beach", tag: "Close to the airport", x: 89, y: 51 },
];

/* hover / tap on a row shows the matching ring on the map (pure CSS) */
const hoverCss = keyPlaces
  .map(
    (p) =>
      `.loc-explorer:has([data-place=${p.id}]:is(:hover,:focus)) [data-pin=${p.id}]{opacity:1;scale:1}`,
  )
  .join("\n");

/* from the brochure: "Santorini, the iconic jewel of the Aegean" */
const discoverParas: ReactNode[] = [
  <>
    <strong>Santorini</strong> is one of Greece&rsquo;s most iconic destinations, renowned for its
    dramatic <strong>volcanic landscape</strong>, whitewashed Cycladic architecture and
    spectacular views across the Aegean Sea. From the legendary caldera and cliffside villages to
    its exceptional beaches, gastronomy and vibrant lifestyle, the island offers a unique
    combination of natural beauty, culture and exclusivity.
  </>,
  <>
    The island combines extraordinary natural beauty with <strong>global recognition</strong>,
    strong tourism demand and a highly desirable Mediterranean lifestyle. Its limited land
    availability, distinctive character and international appeal make it one of Greece&rsquo;s most
    prestigious destinations for <strong>luxury residences and property investment</strong>.
  </>,
];

const destination: { Icon: IconType; label: string; text: string }[] = [
  {
    Icon: SunsetIcon,
    label: "Caldera & sunsets",
    text: "World-renowned volcanic cliffs and spectacular Aegean sunsets.",
  },
  {
    Icon: DomeIcon,
    label: "Cycladic architecture",
    text: "Iconic whitewashed villages, traditional churches and distinctive island architecture.",
  },
  {
    Icon: StarIcon,
    label: "Luxury lifestyle",
    text: "Exceptional restaurants, boutique hotels, cafés and sophisticated hospitality.",
  },
  {
    Icon: WaveIcon,
    label: "Beaches & nature",
    text: "Volcanic beaches, dramatic landscapes and unique geological formations.",
  },
  {
    Icon: CityIcon,
    label: "Fira & Oia",
    text: "Vibrant island centres offering dining, shopping, culture and breathtaking views.",
  },
  {
    Icon: PlaneIcon,
    label: "Accessibility",
    text: "International airport and regular connections to Athens and other Greek islands.",
  },
];

/* ───────── Shared pieces ───────── */
const Tag = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-md ${className}`}
  >
    {children}
  </span>
);

/* Arcade divider (a run of arches, like the villa's vaults) */
const ARCHES = 12;
const arcadeFill =
  "M0 60V40" + Array.from({ length: ARCHES }, () => "a60 30 0 0 1 120 0").join("") + "V60Z";
const arcadeLine =
  "M0 40" + Array.from({ length: ARCHES }, () => "a60 30 0 0 1 120 0").join("");

function Arcade({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden
      className={`block h-10 w-full md:h-14 ${flip ? "rotate-180" : ""}`}
    >
      <path d={arcadeFill} fill="var(--navy)" />
      <path
        d={arcadeLine}
        fill="none"
        stroke="var(--gold-light)"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function Title({
  title,
  sub,
  dark = false,
  center = false,
}: {
  title: string;
  sub?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2
        className={`font-serif text-3xl font-bold uppercase leading-[1.1] tracking-tight md:text-5xl ${
          dark ? "text-white" : "text-(--navy)"
        }`}
      >
        <Words text={title} className="block" />
      </h2>
      {sub && (
        <p
          className={`mt-3 text-xs font-medium uppercase tracking-[0.25em] md:text-sm ${
            dark ? "text-(--gold-light)" : "text-(--navy)/70"
          }`}
        >
          {sub}
        </p>
      )}
      <span
        className={`mt-5 block h-0.5 w-16 bg-linear-to-r from-(--gold) to-(--gold-light) ${
          center ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}

/* Each hero layer sits at its own depth and answers to mouse + scroll via the vars set by HeroStage */
const layer = (
  mx: number,
  my: number,
  sy: number,
  z: number,
  ry: number,
): CSSProperties => ({
  transform: `translate3d(calc(var(--mx,0) * ${mx}px), calc(var(--my,0) * ${my}px + var(--sy,0) * ${sy}px), ${z}px) rotateY(calc(var(--mx,0) * ${ry}deg)) rotateX(calc(var(--sy,0) * 8deg))`,
  transition: "transform 350ms ease-out",
  willChange: "transform",
});

/* Hero photo in a barrel-vault arch (the villa's signature shape), with the same arch echoed as a brass outline behind */
function ArchFrame({
  src,
  alt = "",
  priority = false,
  sizes,
  className = "",
}: {
  src: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
     <div className={`relative ${className}`}>
      <div className="relative flex h-full w-full flex-col border border-(--gold)/60 bg-white p-3 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-1.5 border border-(--gold)/40"
        />
        {[
          "left-0 top-0 border-l-2 border-t-2",
          "right-0 top-0 border-r-2 border-t-2",
          "bottom-0 left-0 border-b-2 border-l-2",
          "bottom-0 right-0 border-b-2 border-r-2",
        ].map((c) => (
          <span
            key={c}
            aria-hidden
            className={`pointer-events-none absolute h-5 w-5 border-(--gold) ${c}`}
          />
        ))}
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-t-full ring-1 ring-(--gold)/50">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(90,60,15,0.35)]"
          />
        </div>
        <p className="relative mt-3 flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark) md:text-[10px]">
          <span className="h-px w-6 bg-(--gold)/60 md:w-10" />
          <span className="font-serif italic normal-case tracking-[0.15em]">
            Vourvoulos, Santorini
          </span>
          <span className="h-px w-6 bg-(--gold)/60 md:w-10" />
        </p>
      </div>
    </div>
  );
}

/* Framed photo plate with brass corners and a caption */
function Plate({
  src,
  alt,
  caption,
  sizes,
  className = "",
  aspect = "aspect-[4/5]",
  fit = "object-cover",
}: {
  src: string;
  alt: string;
  caption: string;
  sizes: string;
  className?: string;
  aspect?: string;
  fit?: "object-cover" | "object-contain";
}) {
  return (
    <figure className={`relative ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-(--gold)/50"
      />
      <div className="relative border border-(--gold)/60 bg-white p-3 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-2 border border-(--gold)/40"
        />
        {[
          "left-0 top-0 border-l-2 border-t-2",
          "right-0 top-0 border-r-2 border-t-2",
          "bottom-0 left-0 border-b-2 border-l-2",
          "bottom-0 right-0 border-b-2 border-r-2",
        ].map((c) => (
          <span
            key={c}
            aria-hidden
            className={`pointer-events-none absolute h-5 w-5 border-(--gold) ${c}`}
          />
        ))}
        <div className={`relative ${aspect} w-full overflow-hidden ring-1 ring-(--gold)/50`}>
          <Image src={src} alt={alt} fill sizes={sizes} className={`${fit} object-center`} />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(90,60,15,0.35)]"
          />
        </div>
        <figcaption className="relative mt-3 flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark) md:text-[10px]">
          <span className="h-px w-6 bg-(--gold)/60 md:w-10" />
          <span className="font-serif italic normal-case tracking-[0.15em]">{caption}</span>
          <span className="h-px w-6 bg-(--gold)/60 md:w-10" />
        </figcaption>
      </div>
    </figure>
  );
}

const IconList = ({ items }: { items: { Icon: IconType; text: string }[] }) => (
  <ul className="space-y-5">
    {items.map(({ Icon, text }) => (
      <li key={text} className="flex items-center gap-4 text-sm text-(--navy)/90">
        <Icon className="h-6 w-6 shrink-0 text-(--gold-dark)" />
        <span>{text}</span>
      </li>
    ))}
  </ul>
);

export default function SantoriniVillaPage() {
  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      <S3Styles />
      <ScrollBar />

      {/* ───────── HERO · arch-framed photo ───────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-(--sky) via-[#f6efe0] to-[#f4d9a8] pt-32 md:pt-40">
        <div aria-hidden className="absolute inset-0" style={glow("85% 85%", 0.45)} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 md:pb-32 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal3D variant="flipLeft">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--navy)/70">
                Santorini, Greece
              </p>
            </Reveal3D>
            <h1 className="mt-6 font-serif text-5xl font-bold uppercase leading-[1.02] tracking-tight md:text-7xl">
              <Words text="Sea View" className="block" />
              <Words
                text="Villa"
                className="block"
                delay={300}
                wordClass="bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-transparent"
              />
            </h1>
            <Reveal3D variant="rise" delay={500}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-(--navy)/80">
                A private residence overlooking the Aegean. 4 bedrooms and 3
                bathrooms on a 4,000 m² plot, a short walk from the beach.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Tag>Unobstructed sea view</Tag>
                <span className="text-sm font-semibold text-(--navy)">Price on request</span>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-(--navy) px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:bg-(--gold-dark)"
                >
                  Arrange a viewing
                </Link>
                <a
                  href="#views"
                  className="border border-(--navy)/40 bg-white/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] backdrop-blur transition hover:border-(--gold) hover:text-(--gold-dark)"
                >
                  Tour the villa
                </a>
              </div>
            </Reveal3D>
          </div>

          {/* arch photo with the same arch echoed as a brass outline behind it */}
          <HeroStage className="relative flex justify-center lg:col-span-6">
            <div className="relative w-[min(88%,21rem)] md:w-[min(88%,25rem)]">
              <div
                aria-hidden
                style={layer(-12, -6, -25, 0, 4)}
                className="absolute inset-0 translate-x-5 translate-y-5 rounded-t-full border border-(--gold)/70"
              />
              <div style={layer(8, -10, -60, 60, 5)} className="relative">
                <Reveal3D variant="zoom" delay={300} duration={1300}>
                  <ArchFrame
                    src={img("santorini-cover")}
                    alt="Luxury sea view villa in Santorini: two vaulted volcanic-stone and render wings with a dining terrace overlooking the Aegean at sunset. 4 bedrooms, 3 bathrooms, 4,000 m² plot."
                    priority
                    sizes="(min-width:768px) 400px, 336px"
                    className="aspect-[5/7] w-full"
                  />
                </Reveal3D>
              </div>
            </div>
          </HeroStage>
        </div>
        <Vaults className="relative opacity-70" />
      </section>

      {/* ───────── STATS · navy strip ───────── */}
      <section className="bg-(--navy)">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-(--gold)/30 px-6">
          {stats.map((s, i) => (
            <Reveal3D
              key={s.label}
              variant="flipCard"
              delay={i * 140}
              className="px-4 py-8 text-center md:px-8"
            >
              <dd className="font-serif text-4xl font-bold text-(--gold-light) md:text-5xl">
                <Counter to={s.n} />
              </dd>
              <dt className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/80 md:text-[11px]">
                {s.label}
              </dt>
            </Reveal3D>
          ))}
        </dl>
      </section>

      {/* ───────── PROPERTY FEATURES · cream ───────── */}
      <section className="relative bg-(--cream)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
                Property features
              </p>
              <Title title="Santorini" sub="A private residence overlooking the Aegean" />
            </div>
            <Reveal3D variant="flipRight" className="lg:col-span-5">
              <p className="leading-relaxed text-(--navy)/75">
                A private villa of vaulted volumes and volcanic stone, set on its
                own generous plot with the sea on the horizon.
              </p>
            </Reveal3D>
          </div>

          {/* fira · beach · sea view */}
          <div className="mt-14 grid grid-cols-1 divide-y divide-(--gold)/30 border border-(--gold)/40 bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {highlights.map(({ Icon, value, label }, i) => (
              <Reveal3D
                key={label}
                variant="flipCard"
                delay={i * 100}
                className="flex flex-col items-center px-6 py-8 text-center"
              >
                <Icon className="h-9 w-9 text-(--gold-dark)" />
                <p className="mt-4 font-serif text-3xl font-bold text-(--navy)">
                  {value}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">
                  {label}
                </p>
              </Reveal3D>
            ))}
          </div>

          {/* specifications and features */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Reveal3D variant="flipLeft">
              <div className="h-full border border-(--gold)/40 bg-white p-8">
                <h3 className="font-serif text-xl font-bold uppercase tracking-wide">
                  Property specifications
                </h3>
                <span className="mb-7 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                <IconList items={specs} />
              </div>
            </Reveal3D>
            <Reveal3D variant="flipRight">
              <div className="h-full border border-(--gold)/40 bg-white p-8">
                <h3 className="font-serif text-xl font-bold uppercase tracking-wide">
                  Property highlights
                </h3>
                <span className="mb-7 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                <IconList items={features} />
              </div>
            </Reveal3D>
          </div>

          {/* overview */}
          <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal3D variant="rise" className="lg:col-span-6">
              <Plate
                src={img("villa-front")}
                alt="The villa's sea-facing facade with two vaulted volumes and a volcanic stone wall"
                caption="The sea-facing facade"
                aspect="aspect-[4/3]"
                sizes="(min-width:1024px) 540px, 95vw"
              />
            </Reveal3D>
            <Reveal3D variant="rise" delay={150} className="lg:col-span-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
                Overview
              </p>
              <h3 className="font-serif text-2xl font-bold uppercase leading-tight tracking-tight text-(--navy) md:text-3xl">
                Privacy, space and the best of Santorini
              </h3>
              <span className="mb-6 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
              <div className="space-y-4 text-sm leading-relaxed text-(--navy)/75 [&_strong]:font-semibold [&_strong]:text-(--navy)">
                {overviewParas.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </Reveal3D>
          </div>
        </div>
      </section>

      {/* ───────── VIEWS · eight-page flipping book ───────── */}
      <div className="bg-(--cream)">
        <Arcade />
      </div>
      <section
        id="views"
        className="relative -mt-px scroll-mt-20 overflow-hidden bg-(--navy-deep) px-6 py-16 md:py-24"
      >
        {/* navy edges, aegean haze above, brass glow behind the book */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "linear-gradient(180deg, var(--navy) 0%, rgba(10,23,64,0) 16%, rgba(10,23,64,0) 84%, var(--navy) 100%)",
              "radial-gradient(70% 38% at 50% 24%, rgba(29,125,181,0.55), transparent 72%)",
              "radial-gradient(75% 42% at 50% 62%, rgba(226,184,98,0.5), transparent 72%)",
            ].join(","),
          }}
        />
        {/* hairlines: aegean | cream | brass */}
        {["top-0", "bottom-0"].map((pos) => (
          <div
            key={pos}
            aria-hidden
            className={`absolute inset-x-0 ${pos} h-1`}
            style={{
              backgroundImage:
                "linear-gradient(90deg, var(--aegean) 0 33.33%, var(--cream) 33.33% 66.66%, var(--gold-light) 66.66% 100%)",
            }}
          />
        ))}
        <div className="relative z-10 mx-auto max-w-6xl">
          <Title title="Walk around the villa." sub="Flip through eight views" dark center />

          {/* contents strip */}
          <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-3 divide-x divide-(--gold)/30 border-y border-(--gold)/30 text-center">
            {chapters.map((c) => (
              <li key={c.label} className="px-2 py-4">
                <span className="block font-serif text-xs tracking-[0.3em] text-(--gold-light)">
                  {c.range}
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-white/70">
                  {c.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <RoomBook pages={rooms} />
          </div>
        </div>
      </section>
      <div className="bg-(--paper)">
        <Arcade flip />
      </div>

      {/* ───────── LOCATION · paper ───────── */}
      <section id="location" className="relative -mt-px scroll-mt-20 bg-(--paper)">
        <Paper />
        <style dangerouslySetInnerHTML={{ __html: hoverCss }} />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="loc-explorer grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* LEFT: title + paragraph + places list */}
            <div className="lg:col-span-7">
              <Title title="Close to Fira, the beach and the caldera." sub="Location" />
              <Reveal3D variant="rise" delay={150}>
                <p className="mt-8 max-w-md text-sm leading-relaxed text-(--navy)/75">
                  The villa sits in Vourvoulos, on the quieter side of the island.
                  Hover or tap a place to find it on the map.
                </p>
                <ul className="mt-6 border-t border-(--gold)/40">
                  {keyPlaces.map(({ id, name, tag }) => (
                    <li
                      key={id}
                      data-place={id}
                      tabIndex={0}
                      className="group relative flex cursor-pointer items-baseline gap-3 border-b border-(--gold)/20 py-3 text-sm text-(--navy)/85 outline-none transition-all duration-300 hover:bg-(--gold)/10 hover:pl-4 hover:text-(--navy) focus:bg-(--gold)/10 focus:pl-4 focus:text-(--navy)"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 bg-(--gold) transition-all duration-300 group-hover:h-6 group-focus:h-6"
                      />
                      <span>{name}</span>
                      <span
                        aria-hidden
                        className="min-w-4 flex-1 -translate-y-1 border-b border-dotted border-(--gold)/60 transition-colors group-hover:border-(--gold) group-focus:border-(--gold)"
                      />
                      <span className="whitespace-nowrap text-xs text-(--gold-dark) group-hover:font-semibold">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal3D>
            </div>

            {/* RIGHT: portrait island map in a map-plate frame */}
            <div className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
              <Depth axis="y" rotate={-8} lift={90}>
                <div className="relative">
                  {/* offset brass outline behind */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-(--gold)/50 md:translate-x-5 md:translate-y-5"
                  />

                  <div className="relative border border-(--gold)/60 bg-white p-4 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-6">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-2 border border-(--gold)/40 md:inset-3"
                    />
                    {[
                      "left-0 top-0 border-l-2 border-t-2",
                      "right-0 top-0 border-r-2 border-t-2",
                      "bottom-0 left-0 border-b-2 border-l-2",
                      "bottom-0 right-0 border-b-2 border-r-2",
                    ].map((c) => (
                      <span
                        key={c}
                        aria-hidden
                        className={`pointer-events-none absolute h-6 w-6 border-(--gold) ${c}`}
                      />
                    ))}

                    {/* plate header */}
                    <div className="relative mb-4 flex items-center justify-center gap-4 md:mb-5">
                      <span className="h-px w-8 bg-(--gold)/60 md:w-14" />
                      <span className="font-serif text-[10px] font-semibold uppercase tracking-[0.4em] text-(--navy) md:text-xs">
         
                      </span>
                      <span className="h-px w-8 bg-(--gold)/60 md:w-14" />
                    </div>

                    {/* map */}
                    <div className="relative aspect-[376/584] w-full overflow-hidden bg-(--paper) ring-1 ring-(--gold)/50">
                      <Image
                        src={img("santorini-map")}
                        alt="Map of Santorini showing the villa in Vourvoulos, Fira, Oia, the airport, the ports and the main beaches"
                        fill
                        sizes="(min-width:1024px) 420px, 95vw"
                        className="object-contain"
                      />
                      {/* sepia vignette, like an old map plate */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-[5] shadow-[inset_0_0_70px_rgba(90,60,15,0.35)]"
                      />
                      {keyPlaces.map(({ id, x, y }) => (
                        <span
                          key={id}
                          data-pin={id}
                          aria-hidden
                          style={{ left: `${x}%`, top: `${y}%` }}
                          className="pointer-events-none absolute z-10 aspect-square w-[11%] -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full border-2 border-(--gold-light) opacity-0 transition duration-300"
                        >
                          <span className="absolute inset-0 animate-ping rounded-full bg-(--gold-light)/50" />
                        </span>
                      ))}
                    </div>

                    {/* plate caption */}
                    <div className="relative mt-4 flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark) md:mt-5 md:text-[10px]">
                      <span className="h-px w-8 bg-(--gold)/60 md:w-12" />
                      <span className="font-serif italic normal-case tracking-[0.15em]">
                        Santorini
                      </span>
                      <span className="h-px w-8 bg-(--gold)/60 md:w-12" />
                    </div>
                  </div>
                </div>
              </Depth>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── DISCOVER SANTORINI · cream ───────── */}
      <section className="relative bg-(--cream)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal3D variant="rise" className="lg:col-span-6">
              <Plate
                src={img("santorini-caldera")}
                alt="The Santorini caldera: whitewashed cliffside village above the deep blue Aegean"
                caption="The caldera"
                aspect="aspect-[4/3]"
                sizes="(min-width:1024px) 540px, 95vw"
              />
            </Reveal3D>
            <Reveal3D variant="rise" delay={150} className="lg:col-span-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
                Discover Santorini
              </p>
              <h3 className="font-serif text-2xl font-bold uppercase leading-tight tracking-tight text-(--navy) md:text-3xl">
                The iconic jewel of the Aegean
              </h3>
              <span className="mb-6 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
              <div className="space-y-4 text-sm leading-relaxed text-(--navy)/75 [&_strong]:font-semibold [&_strong]:text-(--navy)">
                {discoverParas.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </Reveal3D>
          </div>

          {/* destination highlights */}
          <p className="mb-6 mt-20 text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark) md:mt-24">
            Destination highlights
          </p>
          <Reveal3D variant="rise">
            <ul className="grid grid-cols-1 divide-y divide-(--gold)/30 border-y border-(--gold)/50 sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
              {destination.map(({ Icon, label, text }) => (
                <li
                  key={label}
                  className="group flex flex-col items-center px-6 py-10 text-center sm:[&:nth-child(n+3)]:border-t sm:[&:nth-child(n+3)]:border-(--gold)/30"
                >
                  <Icon className="h-9 w-9 text-(--navy) transition duration-500 group-hover:-translate-y-1 group-hover:text-(--gold-dark)" />
                  <span className="mt-5 block h-px w-8 bg-(--gold)/60" />
                  <span className="mt-5 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-(--navy)">
                    {label}
                  </span>
                  <span className="mt-2 max-w-[15rem] text-xs leading-relaxed text-(--navy)/65">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal3D>

          <Reveal3D variant="rise" delay={100}>
            <p className="mx-auto mt-14 max-w-2xl text-center font-serif text-xl italic leading-snug text-(--gold-dark) md:text-2xl">
              &ldquo;Where volcanic landscapes meet the endless blue of the Aegean.&rdquo;
            </p>
          </Reveal3D>
        </div>
      </section>

      {/* ───────── CTA · navy with arcade ───────── */}
      <div className="bg-(--cream)">
        <Arcade />
      </div>
      <section
        className="relative -mt-px overflow-hidden bg-(--navy) px-6 pb-24 pt-10 text-white md:pb-32"
        style={glow("50% 0%", 0.28)}
      >
        <Depth rotate={12} lift={120}>
          <div className="relative mx-auto max-w-4xl border border-(--gold)/60 p-10 text-center md:p-16">
            <Vaults className="absolute inset-x-6 top-3 opacity-60" color="%23e2b862" />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-light)">
              Aurevon Global Partners
            </p>
            <h2 className="mx-auto mt-5 max-w-xl font-serif text-3xl font-bold uppercase leading-tight md:text-5xl">
              <Words text="Interested in the Santorini villa?" className="block" />
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              A 150 m² villa with 4 bedrooms and 3 bathrooms on a 4,000 m² plot,
              with unobstructed sea views and the beach within walking distance.
              Contact us to arrange a viewing.
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110"
            >
              Arrange a viewing
            </Link>
            <Vaults className="absolute inset-x-6 bottom-3 opacity-60" color="%23e2b862" />
          </div>
        </Depth>
      </section>
    </main>
  );
}