import Image from "next/image";
import Link from "next/link";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import RoomBook from "../../components/room-book";
import NeighbourhoodTabs from "../../components/neighbourhood-tabs";
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
  title: "Villas in Porto Rafti | Aurevon Global Partners",
  description:
    "A 6,020 m² estate in Porto Rafti, eastern Attica. Two stone-and-stucco buildings, a 100 m² private pool and two garages, a short drive from Athens.",
};

/* EDIT HERE: palette. Same as the Pythagoras page (RoomBook depends on these names). */
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

/* Ripple band: a row of small waves (replaces the right-angle band of the Pythagoras page) */
const rippleBg = (color: string): CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='28' height='14'><path d='M0 7Q7 0 14 7T28 7' fill='none' stroke='${color}' stroke-width='1.3'/></svg>")`,
  backgroundRepeat: "repeat-x",
});
const Ripple = ({
  className = "",
  color = "%23b9791f",
}: {
  className?: string;
  color?: string;
}) => (
  <div aria-hidden className={`h-3.5 ${className}`} style={rippleBg(color)} />
);

/* ───────── IMAGES ─────────
   Put all files in public/images/
     porto-rafti-cover-1.png    hero frame 1, left (the bay, top photo of the brochure cover; title text is cropped out by object-position)
     porto-rafti-cover-2.png    hero frame 2, right (the harbour, bottom photo of the brochure cover)
     porto-rafti-map.png        the drive-time map (crop it from the brochure, the bottom picture)
     pool-garden-1.png          I    pool and garden
     villa-pool-1.png           II   villa above the pool
     arcade-1.png               III  stone arcade
     living-4.png               IV   living room
     stone-hall-1.png           V    stone hall with beams
     bathroom-1.png             VI   bathroom, double basin
     bedroom-1.png              VII  bedroom, patterned floor
     bedroom-2.png              VIII bedroom, blue wall
     building-a.png             Building A facade
     building-b.png             Building B tower
     driveway-1.png             the palm-lined drive (not used yet)
     location-marina.png        location photo 1 (boats at the marina)
     location-beach.png         location photo 2 (rocky beach and hillside)
   If your files are .jpg, change EXT below to "jpg". */
const FOLDER = "/images";
const EXT = "png";
const img = (n: string) => `${FOLDER}/${n}.${EXT}`;

/* EDIT HERE: the eight pages of the book, in the order they flip */
const rooms = [
  {
    id: "pool-garden",
    group: "Pool & grounds",
    title: "Pool and garden",
    text: "A 100 m² private pool set in lawn, framed by tall palms, olive trees and mature pines.",
    src: img("pool-garden-1"),
    alt: "Private pool in a landscaped garden with palm trees",
  },
  {
    id: "villa-pool",
    group: "Pool & grounds",
    title: "The villa above the pool",
    text: "Warm stucco towers and stone terraces look down onto a stepped pool entrance.",
    src: img("villa-pool-1"),
    alt: "Villa with stone arches and terraces above the swimming pool",
  },
  {
    id: "arcade",
    group: "Pool & grounds",
    title: "The stone arcade",
    text: "A shaded colonnade of natural stone arches under a timber ceiling, opening onto the pool terrace.",
    src: img("arcade-1"),
    alt: "Stone arcade with timber ceiling overlooking the pool",
  },
  {
    id: "living",
    group: "Living",
    title: "The living room",
    text: "A long, bright room with timber flooring, a fireplace and a window onto the garden.",
    src: img("living-4"),
    alt: "Living room with timber floor, fireplace and garden window",
  },
  {
    id: "stone-hall",
    group: "Living",
    title: "The stone hall",
    text: "Exposed timber beams, natural stone walls and tiled floors in a generous open space.",
    src: img("stone-hall-1"),
    alt: "Hall with stone walls, timber beams and tiled floor",
  },
  {
    id: "bathroom",
    group: "Bathrooms & bedrooms",
    title: "Bathroom",
    text: "A full-width mirror, double basin and bath, finished in stone-tone tiles with recessed lighting.",
    src: img("bathroom-3"),
    alt: "Bathroom with double basin, large mirror and bath",
  },
  {
    id: "bedroom-tiles",
    group: "Bathrooms & bedrooms",
    title: "Bedroom, patterned floor",
    text: "A decorative tiled floor, a corner fireplace and exposed timber beams under the roof.",
    src: img("bedroom-7"),
    alt: "Bedroom with patterned tile floor, fireplace and timber roof",
  },
  {
    id: "bedroom-blue",
    group: "Bathrooms & bedrooms",
    title: "Bedroom, en-suite",
    text: "Timber flooring, a balcony door and a bathroom of its own, set beneath a timber ceiling.",
    src: img("bedroom-6"),
    alt: "Bedroom with timber floor and en-suite bathroom",
  },
];

/* contents strip above the book (matches the page order above) */
const chapters = [
  { range: "I – III", label: "Pool & grounds" },
  { range: "IV – V", label: "Living" },
  { range: "VI – VIII", label: "Baths & bedrooms" },
];

/* EDIT HERE: key facts from the brochure */
const stats = [
  { n: 6020, label: "m² plot" },
  { n: 2, label: "Buildings" },
  { n: 100, label: "m² private pool" },
];

const buildings = [
  {
    id: "A",
    above: 165,
    basement: 103,
    src: img("building-a"),
    alt: "Building A: terracotta stucco villa with chimney and balcony",
  },
  {
    id: "B",
    above: 170,
    basement: 113,
    src: img("building-b"),
    alt: "Building B: corner tower with balconies in terracotta stucco",
  },
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

const PlaneIcon = icon(
  <>
    <path d="M10.5 13.5L3 11l1-1.5 8 .5 4.5-5.5a1.6 1.6 0 0 1 2.5 2L14.5 12l.5 8-1.5 1-2.5-7.5z" />
  </>,
);
const CoinsIcon = icon(
  <>
    <ellipse cx="12" cy="6" rx="6" ry="2.5" />
    <path d="M6 6v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6" />
    <path d="M6 10v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" />
    <path d="M6 14v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" />
  </>,
);
const PlotIcon = icon(
  <>
    <path d="M4 7l8-3 8 3v10l-8 3-8-3z" />
    <path d="M4 7l8 3 8-3M12 10v10" />
  </>,
);
const HouseIcon = icon(
  <>
    <path d="M3.5 11.5L12 4l8.5 7.5" />
    <path d="M5.5 10v10h13V10" />
    <path d="M10 20v-5.5h4V20" />
  </>,
);
const PoolIcon = icon(
  <>
    <path d="M8 4v9M15 4v9M8 7h7M8 10h7" />
    <path d="M3 17c2 0 2-1.5 4.5-1.5S10 17 12 17s2.5-1.5 4.5-1.5S19 17 21 17" />
    <path d="M3 21c2 0 2-1.5 4.5-1.5S10 21 12 21s2.5-1.5 4.5-1.5S19 21 21 21" />
  </>,
);
const GarageIcon = icon(
  <>
    <path d="M3 20V9l9-5 9 5v11" />
    <path d="M7 20v-6h10v6M7 17h10" />
  </>,
);
const StoneIcon = icon(
  <>
    <rect x="3.5" y="5" width="7" height="5" rx="0.8" />
    <rect x="13" y="5" width="7.5" height="5" rx="0.8" />
    <rect x="3.5" y="13" width="10" height="6" rx="0.8" />
    <rect x="16" y="13" width="4.5" height="6" rx="0.8" />
  </>,
);
const BeamIcon = icon(
  <>
    <path d="M3 7h18M3 12h18M3 17h18" />
    <path d="M7 5v14M17 5v14" />
  </>,
);
const FloorIcon = icon(
  <>
    <path d="M3 8l9-4 9 4-9 4z" />
    <path d="M3 12l9 4 9-4" />
    <path d="M3 16l9 4 9-4" />
  </>,
);
const FireIcon = icon(
  <>
    <path d="M12 3c1 3.5 4.5 5 4.5 9.5a4.5 4.5 0 0 1-9 0c0-2 1-3 2-4 .2 1.2.8 1.8 1.5 2C11 8.5 11.3 5.5 12 3z" />
  </>,
);
const ArchIcon = icon(
  <>
    <path d="M5 21V11a7 7 0 0 1 14 0v10" />
    <path d="M9 21v-9a3 3 0 0 1 6 0v9" />
  </>,
);
const AnchorIcon = icon(
  <>
    <circle cx="12" cy="5.5" r="2" />
    <path d="M12 7.5V21M8 11h8" />
    <path d="M5 14c0 3.5 3 6 7 6s7-2.5 7-6" />
  </>,
);
const CityIcon = icon(
  <>
    <path d="M3.5 9L12 4l8.5 5z" />
    <path d="M6 11v7M10 11v7M14 11v7M18 11v7" />
    <path d="M4 20h16" />
  </>,
);
const RoadIcon = icon(
  <>
    <path d="M8 3L5 21M16 3l3 18" />
    <path d="M12 4v3M12 11v3M12 18v3" />
  </>,
);
const WaveIcon = icon(
  <>
    <path d="M3 9c2 0 2-1.5 4.5-1.5S10 9 12 9s2.5-1.5 4.5-1.5S19 9 21 9" />
    <path d="M3 14c2 0 2-1.5 4.5-1.5S10 14 12 14s2.5-1.5 4.5-1.5S19 14 21 14" />
    <path d="M3 19c2 0 2-1.5 4.5-1.5S10 19 12 19s2.5-1.5 4.5-1.5S19 19 21 19" />
  </>,
);

/* EDIT HERE: from the brochure. Price and Golden Visa are NOT in the brochure, so I left price as "On request". */
const highlights: { Icon: IconType; value: string; label: string }[] = [
  { Icon: PlaneIcon, value: "20 min", label: "To Athens International Airport" },
  { Icon: PlotIcon, value: "6,020 m²", label: "Plot with two buildings" },
  { Icon: CoinsIcon, value: "On request", label: "Price" },
];

const specs: { Icon: IconType; text: string }[] = [
  { Icon: PlotIcon, text: "6,020 m² plot with two buildings" },
  { Icon: HouseIcon, text: "Building A: 165 m² + 103 m² basement" },
  { Icon: HouseIcon, text: "Building B: 170 m² + 113 m² basement" },
  { Icon: PoolIcon, text: "100 m² private pool" },
  { Icon: GarageIcon, text: "2 garages, 66 m² in total" },
];

/* only what is visible in the photos */
const finishes: { Icon: IconType; text: string }[] = [
  { Icon: StoneIcon, text: "Natural stone masonry and paved terraces" },
  { Icon: ArchIcon, text: "Stone arcade overlooking the pool" },
  { Icon: BeamIcon, text: "Exposed timber beams and ceilings" },
  { Icon: FloorIcon, text: "Timber flooring and decorative floor tiles" },
  { Icon: FireIcon, text: "Fireplaces in the living and sleeping areas" },
];

/* x / y = where each ring sits on the map image, in %. Nudge them if a ring looks slightly off. */
const keyPlaces: { id: string; name: string; min: number; x: number; y: number }[] = [
  { id: "beach", name: "Nearers Beach", min: 5, x: 80, y: 69 },
  { id: "airport", name: "Athens International Airport", min: 20, x: 80, y: 21 },
  { id: "athens", name: "Athens city centre", min: 55, x: 17, y: 10 },
];

/* hover / tap on a row shows the matching ring on the map (pure CSS) */
const hoverCss = keyPlaces
  .map(
    (p) =>
      `.loc-explorer:has([data-place=${p.id}]:is(:hover,:focus)) [data-pin=${p.id}]{opacity:1;scale:1}`,
  )
  .join("\n");

const connections: { Icon: IconType; label: string; text: string }[] = [
  { Icon: PlaneIcon, label: "Athens Airport", text: "About 20 minutes by car." },
  { Icon: CityIcon, label: "Athens centre", text: "About 55 minutes by car." },
  { Icon: WaveIcon, label: "Nearers Beach", text: "Just 5 minutes by car." },
  { Icon: AnchorIcon, label: "Marina & bay", text: "Waterfront cafés and marina facilities." },
  { Icon: RoadIcon, label: "Road network", text: "Easy access along major roads." },
];

/* from the brochure text */
const coastalLife: { label: string; text: string }[] = [
  {
    label: "The bay",
    text: "Porto Rafti is built around a picturesque bay with calm waters and beautiful beaches, just a short distance from Athens.",
  },
  {
    label: "Waterfront cafés & tavernas",
    text: "The area is known for its waterfront cafés and traditional tavernas, with a welcoming atmosphere that captures the essence of coastal Greek living.",
  },
  {
    label: "Marina facilities",
    text: "Marina facilities add to the seaside character, bringing boats, harbour life and a lively waterfront.",
  },
  {
    label: "Natural beauty",
    text: "A relaxed seaside lifestyle that combines natural beauty with modern convenience.",
  },
  {
    label: "A peaceful environment",
    text: "Residents enjoy a peaceful environment without sacrificing connectivity to the capital.",
  },
  {
    label: "Strategic location",
    text: "Easy access to Athens International Airport and the major road networks of Attica.",
  },
];

const investment: { label: string; text: string }[] = [
  {
    label: "Growing interest",
    text: "Porto Rafti continues to attract growing interest thanks to its seaside character and year-round appeal.",
  },
  {
    label: "Strong demand",
    text: "Demand is strong for both vacation and residential properties.",
  },
  {
    label: "Holiday retreat",
    text: "A coastal home within easy reach of Athens, suited to holidays by the sea.",
  },
  {
    label: "Permanent residence",
    text: "A setting that works for everyday living as well as for holidays.",
  },
  {
    label: "Rental investment",
    text: "The area's year-round appeal supports its potential as a rental investment.",
  },
  {
    label: "Long-term value",
    text: "A combination of coastal lifestyle, accessibility and long-term value potential within the wider Athens region.",
  },
];

const neighbourhoodGroups = [
  { id: "coastal", tab: "Coastal life", items: coastalLife },
  { id: "invest", tab: "Why invest", items: investment },
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

/* Shoreline divider, replaces the staircase of the Pythagoras page */
function Waves({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
      className={`block h-10 w-full md:h-16 ${flip ? "rotate-180" : ""}`}
    >
      <path
        d="M0 40C120 10 240 10 360 40S600 70 720 40S960 10 1080 40S1320 70 1440 40V80H0Z"
        fill="var(--navy)"
      />
      <path
        d="M0 40C120 10 240 10 360 40S600 70 720 40S960 10 1080 40S1320 70 1440 40"
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

/* Photo with one corner cut on the diagonal */
const CUT_TOP_RIGHT = "polygon(0 0, 84% 0, 100% 14%, 100% 100%, 0 100%)";
const CUT_BOTTOM_LEFT = "polygon(0 0, 100% 0, 100% 100%, 20% 100%, 0 82%)";
function CutFrame({
  src,
  alt = "",
  priority = false,
  sizes,
  clip,
  className = "",
  imgClass = "object-cover",
}: {
  src: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  clip: string;
  className?: string;
  imgClass?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ filter: "drop-shadow(0 28px 36px rgba(16,35,94,0.35))" }}
    >
      <div className="relative h-full w-full overflow-hidden" style={{ clipPath: clip }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={imgClass}
        />
      </div>
    </div>
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

/* Brass-framed photo plate (used for the map and the harbour photo) */
function Plate({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-(--gold)/50 md:translate-x-4 md:translate-y-4"
      />
      <div className="relative border border-(--gold)/60 bg-white p-3 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-2 border border-(--gold)/40 md:inset-2.5"
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
        {children}
        <div className="relative mt-3 flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark) md:text-[10px]">
          <span className="h-px w-8 bg-(--gold)/60 md:w-12" />
          <span className="font-serif italic normal-case tracking-[0.15em]">{caption}</span>
          <span className="h-px w-8 bg-(--gold)/60 md:w-12" />
        </div>
      </div>
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

export default function PortoRaftiVillasPage() {
  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      <S3Styles />
      <ScrollBar />

      {/* ───────── HERO · two overlapping frames (photos on the left, text on the right) ───────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-(--sky) via-[#f6efe0] to-[#f4d9a8] pt-32 md:pt-40">
        <div aria-hidden className="absolute inset-0" style={glow("15% 85%", 0.45)} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 md:pb-32 lg:grid-cols-12">
          {/* TEXT (right on desktop) */}
          <div className="lg:order-2 lg:col-span-5">
            <Reveal3D variant="flipRight">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--navy)/70">
                Porto Rafti, Eastern Attica
              </p>
            </Reveal3D>
            <h1 className="mt-6 font-serif text-5xl font-bold uppercase leading-[1.02] tracking-tight md:text-7xl">
              <Words text="Villas in" className="block" />
              <Words
                text="Porto Rafti"
                className="block"
                delay={300}
                wordClass="bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-transparent"
              />
            </h1>
            <Reveal3D variant="rise" delay={500}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-(--navy)/80">
                A 6,020 m² estate with two buildings, a 100 m² private pool and
                two garages, minutes from the beach and a short drive from Athens.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Tag>Private pool estate</Tag>
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
                  href="#rooms"
                  className="border border-(--navy)/40 bg-white/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] backdrop-blur transition hover:border-(--gold) hover:text-(--gold-dark)"
                >
                  Tour the estate
                </a>
              </div>
            </Reveal3D>
          </div>

          {/* PHOTOS: two separate frames, side by side and staggered (bay lower, harbour higher),
              each with its own diagonal cut and brass outline, like the two photos on the brochure cover */}
          <HeroStage className="relative lg:order-1 lg:col-span-7">
            <div className="relative mx-auto grid max-w-md grid-cols-2 gap-6 md:max-w-xl md:gap-10">
              {/* FRAME 1 · the bay (lower) */}
              <div className="relative mt-14 md:mt-24" style={layer(-10, 6, -40, 50, -4)}>
                <svg
                  aria-hidden
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full -translate-x-3 translate-y-3 overflow-visible md:-translate-x-5 md:translate-y-5"
                >
                  <path
                    d="M0 0H100V100H20L0 82Z"
                    fill="none"
                    stroke="var(--gold)"
                    strokeOpacity="0.7"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <Reveal3D variant="zoom" delay={300} duration={1300}>
                  <CutFrame
                    src={img("porto-rafti-cover-1")}
                    alt="Aerial view of the Porto Rafti bay with turquoise water and a sandy beach"
                    priority
                    clip={CUT_BOTTOM_LEFT}
                    sizes="(min-width:768px) 300px, 45vw"
                    className="aspect-[3/4] w-full"
                    imgClass="object-cover object-[35%_85%]"
                  />
                </Reveal3D>
              </div>

              {/* FRAME 2 · the harbour (higher) */}
              <div className="relative" style={layer(10, -8, -70, 80, 4)}>
                <svg
                  aria-hidden
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full translate-x-3 translate-y-3 overflow-visible md:translate-x-5 md:translate-y-5"
                >
                  <path
                    d="M0 0H84L100 14V100H0Z"
                    fill="none"
                    stroke="var(--gold)"
                    strokeOpacity="0.7"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <Reveal3D variant="zoom" delay={600} duration={1300}>
                  <CutFrame
                    src={img("porto-rafti-cover-2")}
                    alt="Aerial view of the Porto Rafti harbour, marina and waterfront town"
                    priority
                    clip={CUT_TOP_RIGHT}
                    sizes="(min-width:768px) 300px, 45vw"
                    className="aspect-[3/4] w-full"
                    imgClass="object-cover object-[40%_60%]"
                  />
                </Reveal3D>
              </div>

              {/* floating badge, sits where the two frames meet */}
              <div
                style={layer(-6, -4, -100, 140, 0)}
                className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 md:bottom-10"
              >
                <div className="bg-linear-to-b from-(--gold-light) to-(--gold) px-4 py-3 text-center text-white shadow-xl">
                  <p className="font-serif text-2xl font-bold leading-none md:text-3xl">6,020</p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.25em]">
                    m² plot
                  </p>
                </div>
              </div>
            </div>
          </HeroStage>
        </div>
        <Ripple className="relative opacity-70" />
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
              <Title title="Porto Rafti" sub="One estate, two buildings" />
            </div>
            <Reveal3D variant="flipRight" className="lg:col-span-5">
              <p className="leading-relaxed text-(--navy)/75">
                Stone, timber and terracotta stucco, set in a landscaped garden
                with a private pool, on one of the most attractive stretches of
                the eastern Attica coast.
              </p>
            </Reveal3D>
          </div>

          {/* airport · plot · price */}
          <div className="mt-14 grid grid-cols-1 divide-y divide-(--gold)/30 border border-(--gold)/40 bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {highlights.map(({ Icon, value, label }, i) => (
              <Reveal3D
                key={label}
                variant="flipCard"
                delay={i * 100}
                className="flex flex-col items-center px-6 py-8 text-center"
              >
                <Icon className="h-9 w-9 text-(--gold-dark)" />
                <p className="mt-4 font-serif text-3xl font-bold text-(--navy)">{value}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">
                  {label}
                </p>
              </Reveal3D>
            ))}
          </div>

          {/* specifications and finishes */}
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
                  Materials & finishes
                </h3>
                <span className="mb-7 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                <IconList items={finishes} />
              </div>
            </Reveal3D>
          </div>
        </div>
      </section>

      {/* ───────── THE TWO BUILDINGS · paper (new section for this page) ───────── */}
      <section className="relative bg-(--paper)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Title title="Two buildings, one estate." sub="Building A and Building B" center />

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {buildings.map((b, i) => (
              <Reveal3D key={b.id} variant={i === 0 ? "flipLeft" : "flipRight"}>
                <div className="relative h-full">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-(--gold)/50"
                  />
                  <div className="relative h-full border border-(--gold)/60 bg-white p-3 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.45)]">
                    <div className="relative aspect-[4/3] w-full overflow-hidden ring-1 ring-(--gold)/50">
                      <Image
                        src={b.src}
                        alt={b.alt}
                        fill
                        sizes="(min-width:768px) 480px, 95vw"
                        className="object-cover"
                      />
                      <span className="absolute left-0 top-0 bg-linear-to-b from-(--gold-light) to-(--gold) px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white">
                        Building {b.id}
                      </span>
                    </div>
                    <dl className="mt-4 grid grid-cols-2 divide-x divide-(--gold)/30 text-center">
                      <div className="px-3 py-3">
                        <dd className="font-serif text-3xl font-bold text-(--navy)">
                          {b.above} m²
                        </dd>
                        <dt className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-(--gold-dark)">
                          Above ground
                        </dt>
                      </div>
                      <div className="px-3 py-3">
                        <dd className="font-serif text-3xl font-bold text-(--navy)">
                          +{b.basement} m²
                        </dd>
                        <dt className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-(--gold-dark)">
                          Basement
                        </dt>
                      </div>
                    </dl>
                  </div>
                </div>
              </Reveal3D>
            ))}
          </div>

          {/* pool + garages strip */}
          <Reveal3D variant="rise">
            <div className="mt-12 grid grid-cols-1 divide-y divide-(--gold)/30 border-y border-(--gold)/50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                { Icon: PoolIcon, v: "100 m²", l: "Private pool" },
                { Icon: GarageIcon, v: "2 garages", l: "66 m² in total" },
                { Icon: PlotIcon, v: "6,020 m²", l: "Plot" },
              ].map(({ Icon, v, l }) => (
                <div key={l} className="flex flex-col items-center px-6 py-8 text-center">
                  <Icon className="h-8 w-8 text-(--gold-dark)" />
                  <p className="mt-3 font-serif text-2xl font-bold text-(--navy)">{v}</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </Reveal3D>
        </div>
      </section>

      {/* ───────── ROOMS · eight-page flipping book ───────── */}
      <div className="bg-(--paper)">
        <Waves />
      </div>
      <section
        id="rooms"
        className="relative -mt-px scroll-mt-20 overflow-hidden bg-(--navy-deep) px-6 py-16 md:py-24"
      >
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
          <Title title="Walk through the estate." sub="Flip through eight views" dark center />

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
      <div className="bg-(--cream)">
        <div className="bg-(--navy)">
          <Waves flip />
        </div>
      </div>

      {/* ───────── LOCATION · cream ───────── */}
      <section id="location" className="relative -mt-px scroll-mt-20 bg-(--cream)">
        <Paper />
        <style dangerouslySetInnerHTML={{ __html: hoverCss }} />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="loc-explorer grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* LEFT: title + paragraph + list */}
            <div className="lg:col-span-5">
              <Title title="Porto Rafti, a short drive from everything." sub="Location" />
              <Reveal3D variant="rise" delay={150}>
                <p className="mt-8 max-w-sm text-sm leading-relaxed text-(--navy)/75">
                  A coastal setting with quick access to the beach, the airport
                  and the capital. Hover or tap a destination to find it on the
                  map.
                </p>
                <ul className="mt-6 border-t border-(--gold)/40">
                  {keyPlaces.map(({ id, name, min }) => (
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
                      <span className="whitespace-nowrap font-serif font-bold text-(--navy)">
                        <span className="group-hover:hidden group-focus:hidden">{min} min</span>
                        <span className="hidden text-(--gold-dark) group-hover:inline group-focus:inline">
                          by car
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal3D>
            </div>

            {/* RIGHT: map plate */}
            <div className="lg:col-span-7 lg:-mr-10 xl:-mr-16">
              <Depth axis="y" rotate={-8} lift={90}>
                <div className="relative">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-(--gold)/50 md:translate-x-5 md:translate-y-5"
                  />
                  <div className="relative border border-(--gold)/60 bg-white p-4 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-7">
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

                    <div className="relative mb-4 flex items-center justify-center gap-4 md:mb-5">
                      <span className="h-px w-10 bg-(--gold)/60 md:w-20" />
                      <span className="font-serif text-[10px] font-semibold uppercase tracking-[0.4em] text-(--navy) md:text-xs">
                        Carte de situation
                      </span>
                      <span className="h-px w-10 bg-(--gold)/60 md:w-20" />
                    </div>

                    {/* EDIT HERE: change aspect-[…] to match your cropped map image */}
                    <div className="relative aspect-[390/215] w-full overflow-hidden bg-(--paper) ring-1 ring-(--gold)/50">
                      <Image
                        src={img("porto-rafti-map")}
                        alt="Map of eastern Attica showing Porto Rafti with drive times to Athens centre, the airport and Nearers Beach"
                        fill
                        sizes="(min-width:1024px) 58vw, 95vw"
                        className="object-contain"
                      />
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
                          className="pointer-events-none absolute z-10 aspect-square w-[10%] -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full border-2 border-(--gold-light) opacity-0 transition duration-300"
                        >
                          <span className="absolute inset-0 animate-ping rounded-full bg-(--gold-light)/50" />
                        </span>
                      ))}
                    </div>

                    <div className="relative mt-4 flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark) md:mt-5 md:text-[10px]">
                      <span className="h-px w-8 bg-(--gold)/60 md:w-14" />
                      <span className="font-serif italic normal-case tracking-[0.15em]">
                        Porto Rafti
                      </span>
                      <span className="h-px w-8 bg-(--gold)/60 md:w-14" />
                    </div>
                  </div>
                </div>
              </Depth>
            </div>
          </div>

          {/* two location photos: marina + rocky beach (staggered so they don't line up flat) */}
          <div className="mt-20 grid gap-10 md:mt-24 md:grid-cols-2 md:gap-14">
            <Reveal3D variant="flipLeft">
              <Plate caption="The marina">
                <div className="relative aspect-[4/3] w-full overflow-hidden ring-1 ring-(--gold)/50">
                  <Image
                    src={img("location-marina")}
                    alt="Boats moored at the Porto Rafti marina with the town on the hillside beyond"
                    fill
                    sizes="(min-width:768px) 480px, 95vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(90,60,15,0.3)]"
                  />
                </div>
              </Plate>
            </Reveal3D>
            <Reveal3D variant="flipRight" className="md:mt-16">
              <Plate caption="The coast">
                <div className="relative aspect-[4/3] w-full overflow-hidden ring-1 ring-(--gold)/50">
                  <Image
                    src={img("location-beach")}
                    alt="Rocky shoreline with green hillside and waves breaking on the beach"
                    fill
                    sizes="(min-width:768px) 480px, 95vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(90,60,15,0.3)]"
                  />
                </div>
              </Plate>
            </Reveal3D>
          </div>

          {/* connected */}
          <p className="mb-6 mt-20 text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark) md:mt-24">
            Coast and capital, side by side
          </p>
          <Reveal3D variant="rise">
            <ul className="grid grid-cols-1 divide-y divide-(--gold)/30 border-y border-(--gold)/50 md:grid-cols-5 md:divide-x md:divide-y-0">
              {connections.map(({ Icon, label, text }, i) => (
                <li
                  key={label}
                  className="group flex flex-col items-center px-6 py-10 text-center"
                >
                  <span className="font-serif text-xs tracking-[0.3em] text-(--gold)">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="mt-5 h-9 w-9 text-(--navy) transition duration-500 group-hover:-translate-y-1 group-hover:text-(--gold-dark)" />
                  <span className="mt-5 block h-px w-8 bg-(--gold)/60" />
                  <span className="mt-5 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-(--navy)">
                    {label}
                  </span>
                  <span className="mt-2 max-w-[11rem] text-xs leading-relaxed text-(--navy)/65">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal3D>
        </div>
      </section>

      {/* ───────── EVERYDAY LIFE · paper ───────── */}
      <section className="relative bg-(--paper)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Title title="Seaside living, made easy." sub="Discover Porto Rafti" />
              <Reveal3D variant="rise" delay={150}>
                <p className="mt-8 max-w-sm text-sm leading-relaxed text-(--navy)/75">
                  One of the most attractive coastal destinations in eastern
                  Attica: a relaxed seaside lifestyle, a picturesque bay and a
                  welcoming atmosphere, just a short distance from Athens.
                </p>
                <p className="mt-8 border-t border-(--gold)/40 pt-6 font-serif text-xl italic leading-snug text-(--gold-dark) md:text-2xl">
                  Coastal lifestyle. Easy access. Lasting value.
                </p>
              </Reveal3D>
            </div>

            <div className="lg:col-span-7">
              <Reveal3D variant="zoom">
                <Plate caption="Porto Rafti harbour">
                  <div className="relative aspect-[16/9] w-full overflow-hidden ring-1 ring-(--gold)/50">
                    <Image
                      src={img("porto-rafti-cover-2")}
                      alt="Aerial view of Porto Rafti harbour and the town above the bay"
                      fill
                      sizes="(min-width:1024px) 600px, 95vw"
                      className="object-cover object-center"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(90,60,15,0.35)]"
                    />
                  </div>
                </Plate>
              </Reveal3D>
            </div>
          </div>

          {/* interactive: coastal life + why invest */}
          <div className="mt-14 md:mt-20">
            <Reveal3D variant="rise">
              <NeighbourhoodTabs groups={neighbourhoodGroups} />
            </Reveal3D>
          </div>
        </div>
      </section>

      {/* ───────── CTA · navy with waves ───────── */}
      <div className="bg-(--paper)">
        <Waves />
      </div>
      <section
        className="relative -mt-px overflow-hidden bg-(--navy) px-6 pb-24 pt-10 text-white md:pb-32"
        style={glow("50% 0%", 0.28)}
      >
        <Depth rotate={12} lift={120}>
          <div className="relative mx-auto max-w-4xl border border-(--gold)/60 p-10 text-center md:p-16">
            <Ripple className="absolute inset-x-6 top-3 opacity-60" color="%23e2b862" />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-light)">
              Aurevon Global Partners
            </p>
            <h2 className="mx-auto mt-5 max-w-xl font-serif text-3xl font-bold uppercase leading-tight md:text-5xl">
              <Words text="Interested in the Porto Rafti villas?" className="block" />
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              A 6,020 m² estate with two buildings, a 100 m² private pool and
              two garages, 5 minutes from the beach. Contact us to arrange a
              viewing.
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110"
            >
              Arrange a viewing
            </Link>
            <Ripple className="absolute inset-x-6 bottom-3 opacity-60" color="%23e2b862" />
          </div>
        </Depth>
      </section>
    </main>
  );
}