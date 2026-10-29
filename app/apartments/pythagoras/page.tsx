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
  title: "Pythagoras Loft Apartment, Korydallos | Aurevon Global Partners",
  description:
    "An 80 m² loft apartment in Korydallos, Athens. 2 bedrooms, 2 bathrooms, double-height living, Golden Visa eligible.",
};

/* EDIT HERE: palette. Same variable names as the Seizani page (RoomBook depends on them),
   but forest green + brass + marble instead of navy + gold. */
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

/* Right-angle band: a row of small right triangles (the Pythagoras twist, replaces the Greek key) */
const anglesBg = (color: string): CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='19' height='14'><path d='M0 13H13V1Z M13 13H19' fill='none' stroke='${color}' stroke-width='1.3'/></svg>")`,
  backgroundRepeat: "repeat-x",
});
const Angles = ({
  className = "",
  color = "%23b9791f",
}: {
  className?: string;
  color?: string;
}) => (
  <div aria-hidden className={`h-3.5 ${className}`} style={anglesBg(color)} />
);

/* ───────── IMAGES ─────────
   All files go in public/images/pythagoras/
     pythagoras-cover.png     brochure cover (hero)
     stairs-1.png             I    staircase and double height
     kitchen-island-1.png     II   kitchen island
     kitchen-run-1.png        III  fitted kitchen
     bathroom-vanity-1.png    IV   bathroom, black basin
     bathroom-wc-1.png        V    bathroom, black fixtures
     bathroom-basin-1.png     VI   marble basin
     shower-1.png             VII  walk-in shower
     bedroom-1.png            VIII bedroom, wardrobes
     bedroom-2.png            IX   bedroom, window
     korydallos-map.png       location map
   If your files are .jpg, change EXT below to "jpg". */
const FOLDER = "/images";
const EXT = "png";
const img = (n: string) => `${FOLDER}/${n}.${EXT}`;

/* EDIT HERE: the nine pages of the book, in the order they flip */
const rooms = [
  {
    id: "stairs",
    group: "Living",
    title: "Staircase and double height",
    text: "A tall, bright volume with a timber stair rising to the mezzanine, lit by discreet recessed step lights.",
    src: img("stairs-1"),
    alt: "Double-height space with timber staircase and kitchen beyond",
  },
  {
    id: "kitchen-island",
    group: "Kitchen",
    title: "The stone island",
    text: "A waterfall island in veined stone with an inset sink, beneath long linear lights.",
    src: img("kitchen-island-1"),
    alt: "Kitchen island in veined stone with sink and linear ceiling lights",
  },
  {
    id: "kitchen-run",
    group: "Kitchen",
    title: "The fitted kitchen",
    text: "Handleless taupe cabinetry, a stone-look splashback, a built-in hob and a recess for appliances.",
    src: img("kitchen-run1"),
    alt: "Fitted kitchen with taupe cabinetry and built-in hob",
  },
  {
    id: "bathroom-vanity",
    group: "Bathrooms",
    title: "Bathroom, black basin",
    text: "A round mirror above a black counter basin on a fluted vanity, with ribbed stone-look tiles.",
    src: img("bathroom-vanity-1"),
    alt: "Bathroom with round mirror, black basin and fluted vanity",
  },
  {
    id: "bathroom-wc",
    group: "Bathrooms",
    title: "Black fixtures",
    text: "A wall-hung black toilet with concealed cistern, set against soft tonal tiles to half height.",
    src: img("bathroom-wc-1"),
    alt: "Bathroom with black wall-hung toilet and ribbed tiles",
  },
  {
    id: "shower",
    group: "Bathrooms",
    title: "Walk-in shower",
    text: "A rain shower head, a tiled niche and a clean, step-free tray in large-format tiles.",
    src: img("shower-1"),
    alt: "Walk-in shower with rain head and tiled niche",
  },
  {
    id: "bedroom-wardrobe",
    group: "Sleeping",
    title: "Bedroom and wardrobes",
    text: "Warm timber flooring, built-in wardrobes and a slim illuminated wall light.",
    src: img("bedroom-2"),
    alt: "Bedroom with timber floor, built-in wardrobes and wall light",
  },
  {
    id: "bedroom-window",
    group: "Sleeping",
    title: "Bedroom and window",
    text: "A bright window onto greenery, soft wall lighting and a calm, uncluttered plan.",
    src: img("bedroom-3"),
    alt: "Bedroom with window and timber floor",
  },
];

/* contents strip above the book (matches the page order above) */
const chapters = [
  { range: "I – III", label: "Living & kitchen" },
  { range: "IV – VI", label: "Bathrooms" },
  { range: "VII – VIII", label: "Sleeping" },
];

/* EDIT HERE: key facts from the brochure */
const stats = [
  { n: 80, label: "m² of living space" },
  { n: 2, label: "Bedrooms" },
  { n: 2, label: "Bathrooms" },
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
const CoinsIcon = icon(
  <>
    <ellipse cx="12" cy="6" rx="6" ry="2.5" />
    <path d="M6 6v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6" />
    <path d="M6 10v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" />
    <path d="M6 14v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" />
  </>,
);
const PassportIcon = icon(
  <>
    <rect x="5.5" y="3.5" width="13" height="17" rx="1.5" />
    <circle cx="12" cy="10" r="3" />
    <path d="M9 16.5h6" />
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
const IslandIcon = icon(
  <>
    <path d="M3 10h18v4H3z" />
    <path d="M5.5 14v6M18.5 14v6" />
    <path d="M12 10V6.5a2 2 0 0 1 4 0" />
  </>,
);
const HobIcon = icon(
  <>
    <rect x="4" y="5" width="16" height="14" rx="1.5" />
    <circle cx="9" cy="10" r="2" />
    <circle cx="15" cy="10" r="2" />
    <path d="M8 15.5h8" />
  </>,
);
const FloorIcon = icon(
  <>
    <path d="M3 8l9-4 9 4-9 4z" />
    <path d="M3 12l9 4 9-4" />
    <path d="M3 16l9 4 9-4" />
  </>,
);
const BulbIcon = icon(
  <>
    <path d="M9 18h6M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
  </>,
);
const ShowerIcon = icon(
  <>
    <path d="M5 21V8a4 4 0 0 1 4-4h5" />
    <path d="M10 9h8a4 4 0 0 1-8 0z" />
    <path d="M12 15v2M14 15.5v2.5M16 15v2" />
  </>,
);
const TrainIcon = icon(
  <>
    <rect x="6" y="3.5" width="12" height="13" rx="3" />
    <path d="M6 11h12M9 14h.01M15 14h.01" />
    <path d="M8.5 20.5l2-4M15.5 20.5l-2-4" />
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
const BusIcon = icon(
  <>
    <rect x="5" y="3.5" width="14" height="14" rx="2.5" />
    <path d="M5 11h14M8.5 14.5h.01M15.5 14.5h.01" />
    <path d="M7.5 17.5V20M16.5 17.5V20" />
  </>,
);

/* EDIT HERE: from the brochure */
const highlights: { Icon: IconType; value: string; label: string }[] = [
  { Icon: PinIcon, value: "0.9 km", label: "To Korydallos metro (Line 3)" },
  { Icon: CoinsIcon, value: "€290,000", label: "Price" },
  { Icon: PassportIcon, value: "Eligible", label: "Golden Visa" },
];

const specs: { Icon: IconType; text: string }[] = [
  { Icon: PlanIcon, text: "80 sq.m. loft apartment" },
  { Icon: BedIcon, text: "2 Bedrooms" },
  { Icon: BathIcon, text: "2 Bathrooms" },
  { Icon: HouseIcon, text: "Double-height living with mezzanine" },
];

/* only what is visible in the photos; add heating, AC, alarm, etc. here if the brochure lists them */
const finishes: { Icon: IconType; text: string }[] = [
  { Icon: IslandIcon, text: "Veined stone waterfall kitchen island" },
  { Icon: HobIcon, text: "Fitted handleless kitchen with built-in hob" },
  { Icon: FloorIcon, text: "Warm timber flooring" },
  { Icon: BulbIcon, text: "Linear and wall-washed LED lighting" },
  { Icon: ShowerIcon, text: "Walk-in shower with rain head" },
];

/* x / y = where each pin sits on the map image, in %. Nudge them if a ring looks slightly off. */
const keyPlaces: { id: string; name: string; km: string; x: number; y: number }[] = [
  { id: "town-hall", name: "Korydallos Town Hall", km: "0.4", x: 36, y: 58 },
  { id: "school", name: "1st Primary School of Korydallos", km: "0.6", x: 23, y: 34 },
  { id: "park", name: "Korydallos Park", km: "0.7", x: 34.5, y: 14 },
  { id: "commercial", name: "Korydallos Commercial Center", km: "0.7", x: 81, y: 49.5 },
  { id: "cinema", name: "Cine Paradiso", km: "0.8", x: 68, y: 34.5 },
  { id: "metro", name: "Korydallos Metro Station (Line 3)", km: "0.9", x: 5, y: 54 },
  { id: "theatre", name: "Municipal Theatre,  Amphitheatre", km: "1.0", x: 6, y: 6 },
  { id: "sports", name: "Municipal Sports Center & Stadium", km: "1.1", x: 61, y: 9 },
];

/* hover / tap on a row shows the matching ring on the map (pure CSS) */
const hoverCss = keyPlaces
  .map(
    (p) =>
      `.loc-explorer:has([data-place=${p.id}]:is(:hover,:focus)) [data-pin=${p.id}]{opacity:1;scale:1}`,
  )
  .join("\n");

const connections: { Icon: IconType; label: string; text: string }[] = [
  { Icon: TrainIcon, label: "Korydallos Metro", text: "Direct access to Athens' metro network." },
  { Icon: AnchorIcon, label: "Piraeus", text: "The port, waterfront and coastal districts nearby." },
  { Icon: CityIcon, label: "Athens city centre", text: "Easy links by metro and road." },
  { Icon: RoadIcon, label: "Attiki Odos", text: "Connected to the wider Attica road network." },
  { Icon: BusIcon, label: "Public transport", text: "Metro, bus and road connections." },
];

const daily: { label: string; text: string }[] = [
  {
    label: "Local education",
    text: "Korydallos has an extensive network of public primary and secondary schools distributed throughout the municipality, providing convenient access to education for local families.",
  },
  {
    label: "Private education & childcare",
    text: "The wider area also includes private nursery and early-years education options, providing additional choices for families with younger children.",
  },
  {
    label: "Shopping & dining",
    text: "A wide variety of independent shops, cafés, restaurants and everyday services throughout the neighbourhood.",
  },
  {
    label: "Culture",
    text: "Local theatres, cinemas, arts programmes, music activities and community events.",
  },
  {
    label: "Sports & recreation",
    text: "Municipal sports programmes, recreational facilities and open spaces for an active lifestyle.",
  },
  {
    label: "Family activities",
    text: "Childcare, educational, recreational and cultural facilities make daily family life easy.",
  },
];

/* from the brochure: "City life with local character" */
const cityLife: { label: string; text: string }[] = [
  {
    label: "Korydallos town centre",
    text: "A lively urban centre with cafés, restaurants, shops and everyday services, creating an active neighbourhood atmosphere throughout the day.",
  },
  {
    label: "Plateia Eleftherias",
    text: "One of the area's recognisable public spaces, surrounded by local amenities and serving as an important meeting point within the community.",
  },
  {
    label: "Taxiarchon & local shopping",
    text: "The commercial streets of Korydallos provide a broad selection of shops, cafés, restaurants and everyday services, supporting a convenient, walkable lifestyle.",
  },
  {
    label: "Green spaces & recreation",
    text: "Korydallos includes parks, landscaped public spaces and recreational areas that provide opportunities for outdoor activities within the urban environment.",
  },
  {
    label: "Culture & entertainment",
    text: "The municipality offers a range of cultural activities, including theatre, music, cinema, arts and seasonal events. The Thanasis Veggos Municipal Amphitheatre is an important cultural venue, hosting performances and concerts.",
  },
  {
    label: "Family-friendly amenities",
    text: "A broad network of schools, childcare facilities, sports programmes and local services contributes to the area's"
  },
];

const neighbourhoodGroups = [
  { id: "city", tab: "City life", items: cityLife },
  { id: "daily", tab: "Everyday convenience", items: daily },
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

/* Staircase divider (echoes the staircase photo), replaces the Seizani waves */
function Steps({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
      className={`block h-10 w-full md:h-16 ${flip ? "rotate-180" : ""}`}
    >
      <path
        d="M0 80V66H240V52H480V38H720V24H960V10H1200V0H1440V80Z"
        fill="var(--navy)"
      />
      <path
        d="M0 66H240V52H480V38H720V24H960V10H1200V0H1440"
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

/* Hero photo with the bottom-right corner cut on the diagonal (a hypotenuse) */
const CUT = "polygon(0 0, 100% 0, 100% 87%, 82% 100%, 0 100%)";
function CutFrame({
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
    <div
      className={`relative ${className}`}
      style={{ filter: "drop-shadow(0 28px 36px rgba(16,35,94,0.35))" }}
    >
      <div className="relative h-full w-full overflow-hidden" style={{ clipPath: CUT }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
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

/* The classic 3-4-5 diagram, with the apartment's zones on the squares */
function TheoremDiagram() {
  const sq = {
    fill: "var(--gold)",
    fillOpacity: 0.12,
    stroke: "var(--gold)",
    strokeWidth: 1.2,
  };
  return (
    <svg
      viewBox="30 -70 350 370"
      role="img"
      aria-label="A right triangle with a square on each side, labelled Live, Rest and Home"
      className="mx-auto w-full max-w-md"
    >
      <path d="M150 170H270V290H150Z" {...sq} />
      <path d="M60 80H150V170H60Z" {...sq} />
      <path d="M150 80L270 170L360 50L240 -40Z" {...sq} fillOpacity={0.2} />
      <path d="M150 80L270 170H150Z" fill="var(--navy)" />
      <path d="M160 170V160H150" fill="none" stroke="var(--gold-light)" strokeWidth="1.2" />
      <g
        fill="var(--navy)"
        fontSize="12"
        letterSpacing="3"
        textAnchor="middle"
        dominantBaseline="middle"
        className="font-serif font-bold"
      >
        <text x="105" y="125">LIVE</text>
        <text x="210" y="230">REST</text>
        <text x="255" y="65" transform="rotate(36.87 255 65)">HOME</text>
      </g>
    </svg>
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

export default function PythagorasLoftPage() {
  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      <S3Styles />
      <ScrollBar />

      {/* ───────── HERO · marble, cut-corner photo ───────── */}
<section className="relative overflow-hidden bg-linear-to-b from-(--sky) via-[#f6efe0] to-[#f4d9a8] pt-32 md:pt-40">
  <div aria-hidden className="absolute inset-0" style={glow("85% 85%", 0.45)} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 md:pb-32 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal3D variant="flipLeft">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--navy)/70">
                Korydallos, Athens
              </p>
            </Reveal3D>
            <h1 className="mt-6 font-serif text-5xl font-bold uppercase leading-[1.02] tracking-tight md:text-7xl">
              <Words text="Pythagoras" className="block" />
              <Words
                text="Loft"
                className="block"
                delay={300}
                wordClass="bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-transparent"
              />
            </h1>
            <Reveal3D variant="rise" delay={500}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-(--navy)/80">
                An 80 m² loft with double-height living, a mezzanine level,
                2 bedrooms and 2 bathrooms, in the heart of Korydallos.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Tag>Golden Visa eligible</Tag>
                <span className="text-sm font-semibold text-(--navy)">€290,000</span>
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
                  Tour the apartment
                </a>
              </div>
            </Reveal3D>
          </div>

          {/* cut-corner photo with the same shape echoed as a brass outline behind it */}
          <HeroStage className="relative flex justify-center lg:col-span-6">
            <div className="relative w-[min(100%,21rem)] md:w-[min(100%,25rem)]">
              <svg
                aria-hidden
                viewBox="0 0 439 616"
                preserveAspectRatio="none"
                style={layer(-12, -6, -25, 0, 4)}
                className="absolute inset-0 h-full w-full translate-x-6 translate-y-6 overflow-visible"
              >
                <path
                  d="M0 0H439V536L360 616H0Z"
                  fill="none"
                  stroke="var(--gold)"
                  strokeOpacity="0.7"
                  strokeWidth="1.2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div style={layer(8, -10, -60, 60, 5)} className="relative">
                <Reveal3D variant="zoom" delay={300} duration={1300}>
                  <CutFrame
                    src={img("pythagoras-cover")}
                    alt="Pythagoras Loft Apartment in Korydallos: double-height living with mezzanine and stone kitchen island. Golden Visa eligible, €290,000, 80 m², 2 bedrooms, 2 bathrooms."
                    priority
                    sizes="(min-width:768px) 400px, 336px"
                    className="aspect-[439/616] w-full"
                  />
                </Reveal3D>
              </div>
            </div>
          </HeroStage>
        </div>
        <Angles className="relative opacity-70" />
      </section>

      {/* ───────── STATS · green strip ───────── */}
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
              <Title title="Korydallos" sub="One loft apartment" />
            </div>
            <Reveal3D variant="flipRight" className="lg:col-span-5">
              <p className="leading-relaxed text-(--navy)/75">
                A refined loft in an established Athens neighbourhood, with
                double-height living, a mezzanine level and a considered,
                contemporary finish throughout.
              </p>
            </Reveal3D>
          </div>

          {/* metro distance · price · golden visa */}
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
                  Finishes
                </h3>
                <span className="mb-7 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                <IconList items={finishes} />
              </div>
            </Reveal3D>
          </div>
        </div>
      </section>



      {/* ───────── ROOMS · nine-page flipping book ───────── */}
        <div className="bg-(--cream)">
        <Steps />
      </div>
      <section
        id="rooms"
        className="relative -mt-px scroll-mt-20 overflow-hidden bg-(--navy-deep) px-6 py-16 md:py-24"
      >
        {/* green edges (to match the steps), olive haze above, brass glow behind the book */}
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
        {/* hairlines: olive | marble | brass */}
        {["top-0", "bottom-0"].map((pos) => (
          <div
            key={pos}
            aria-hidden
            className={`absolute inset-x-0 ${pos} h-1`}
            style={{
              backgroundImage:
"linear-gradient(90deg, var(--aegean) 0 33.33%, var(--cream) 33.33% 66.66%, var(--gold-light) 66.66% 100%)"            }}
          />
        ))}
        <div className="relative z-10 mx-auto max-w-6xl">
          <Title title="Walk through the loft." sub="Flip through eight rooms" dark center />

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
          <Steps flip />
        </div>
      </div>

      {/* ───────── LOCATION · cream ───────── */}
<section id="location" className="relative -mt-px scroll-mt-20 bg-(--cream)">
  <Paper />
  <style dangerouslySetInnerHTML={{ __html: hoverCss }} />
  <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
              <div className="loc-explorer grid gap-12 lg:grid-cols-12 lg:items-center">
      {/* LEFT: title + paragraph + listahan */}
       <div className="lg:col-span-5">
        <Title title="Korydallos, connected to everything." sub="Location" />
        <Reveal3D variant="rise" delay={150}>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-(--navy)/75">
            Everything below is within about a kilometre of the apartment. Hover or
            tap a place to find it on the map, with an estimated walking time.
          </p>
          <ul className="mt-6 border-t border-(--gold)/40">
            {keyPlaces.map(({ id, name, km }) => (
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
                  <span className="group-hover:hidden group-focus:hidden">{km} km</span>
                  <span className="hidden text-(--gold-dark) group-hover:inline group-focus:inline">
                    ≈ {Math.round(Number(km) * 12)} min
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal3D>
      </div>

      {/* RIGHT: invisible spacer + mapa */}
       {/* RIGHT: malaking mapa, naka-center, European map-plate style */}
            <div className="lg:col-span-7 lg:-mr-10 xl:-mr-16">
               <Depth axis="y" rotate={-8} lift={90}>
          <div className="relative lg:min-h-[34rem]">
            {/* offset brass outline sa likod */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-(--gold)/50 md:translate-x-5 md:translate-y-5"
            />

            <div className="relative flex flex-col justify-center border border-(--gold)/60 bg-white p-4 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-7 lg:min-h-[34rem]">              {/* inner double-line frame */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-2 border border-(--gold)/40 md:inset-3"
              />
              {/* brass corner marks */}
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
                <span className="h-px w-10 bg-(--gold)/60 md:w-20" />
                <span className="font-serif text-[10px] font-semibold uppercase tracking-[0.4em] text-(--navy) md:text-xs">
                  Carte de situation
                </span>
                <span className="h-px w-10 bg-(--gold)/60 md:w-20" />
              </div>

              {/* mapa */}
                              <div className="relative aspect-[1379/752] w-full overflow-hidden bg-(--paper) ring-1 ring-(--gold)/50">
                <Image
                  src={img("korydallos-map")}
                  alt="Aerial map of Korydallos showing the property and nearby key locations with distances"
                  fill
                  sizes="(min-width:1024px) 58vw, 95vw"
                  className="object-contain"
                />
                {/* sepia vignette, parang lumang map plate */}
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
                    className="pointer-events-none absolute z-10 aspect-square w-[7%] -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full border-2 border-(--gold-light) opacity-0 transition duration-300"
                  >
                    <span className="absolute inset-0 animate-ping rounded-full bg-(--gold-light)/50" />
                  </span>
                ))}
              </div>

              {/* plate caption */}
              <div className="relative mt-4 flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark) md:mt-5 md:text-[10px]">
                <span className="h-px w-8 bg-(--gold)/60 md:w-14" />
                <span className="font-serif italic normal-case tracking-[0.15em]">
                  Korydallos 
                </span>
                <span className="h-px w-8 bg-(--gold)/60 md:w-14" />
              </div>
            </div>
          </div>
        </Depth>
      </div>
    </div>

          {/* connected to everything */}
          <p className="mb-6 mt-20 text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark) md:mt-24">
            Connected to everything
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
          {/* title + photo, magkatabi para hindi humaba */}
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Title title="Everyday life, made easy." sub="Discover Korydallos" />
              <Reveal3D variant="rise" delay={150}>
                <p className="mt-8 max-w-sm text-sm leading-relaxed text-(--navy)/75">
                  An established residential municipality in western Athens,
                  known for its lively neighbourhood atmosphere, green spaces
                  and everyday conveniences, with easy access to both central
                  Athens and Piraeus.
                </p>
                <p className="mt-8 border-t border-(--gold)/40 pt-6 font-serif text-xl italic leading-snug text-(--gold-dark) md:text-2xl">
                  Local character. Urban energy. Connected living.
                </p>
              </Reveal3D>
            </div>

            <div className="lg:col-span-7">
              <Reveal3D variant="zoom">
                <figure className="relative">
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
                    <div className="relative aspect-[16/9] w-full overflow-hidden ring-1 ring-(--gold)/50">
                      <Image
                        src={img("korydallos-theatre")}
                        alt="Thanasis Veggos Amphitheatre, the municipal open-air theatre of Korydallos"
                        fill
                        sizes="(min-width:1024px) 600px, 95vw"
                        className="object-cover object-center"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(90,60,15,0.35)]"
                      />
                    </div>
                    <figcaption className="relative mt-3 flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark) md:text-[10px]">
                      <span className="h-px w-8 bg-(--gold)/60 md:w-12" />
                      <span className="font-serif italic normal-case tracking-[0.15em]">
                        Thanasis Veggos Amphitheatre
                      </span>
                      <span className="h-px w-8 bg-(--gold)/60 md:w-12" />
                    </figcaption>
                  </div>
                </figure>
              </Reveal3D>
            </div>
          </div>

          {/* interactive: city life + everyday convenience */}
          <div className="mt-14 md:mt-20">
            <Reveal3D variant="rise">
              <NeighbourhoodTabs groups={neighbourhoodGroups} />
            </Reveal3D>
          </div>
        </div>
      </section>

      {/* ───────── CTA · green with steps ───────── */}
      <div className="bg-(--paper)">
        <Steps />
      </div>
      <section
        className="relative -mt-px overflow-hidden bg-(--navy) px-6 pb-24 pt-10 text-white md:pb-32"
        style={glow("50% 0%", 0.28)}
      >
        <Depth rotate={12} lift={120}>
          <div className="relative mx-auto max-w-4xl border border-(--gold)/60 p-10 text-center md:p-16">
            <Angles className="absolute inset-x-6 top-3 opacity-60" color="%23e2b862" />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-light)">
              Aurevon Global Partners
            </p>
            <h2 className="mx-auto mt-5 max-w-xl font-serif text-3xl font-bold uppercase leading-tight md:text-5xl">
              <Words text="Interested in the Pythagoras Loft?" className="block" />
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              An 80 m² loft with 2 bedrooms and 2 bathrooms in Korydallos, at
              €290,000 and Golden Visa eligible. Contact us to arrange a viewing.
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110"
            >
              Arrange a viewing
            </Link>
           <Angles className="absolute inset-x-6 bottom-3 opacity-60" color="%23e2b862" />
          </div>
        </Depth>
      </section>
    </main>
  );
}