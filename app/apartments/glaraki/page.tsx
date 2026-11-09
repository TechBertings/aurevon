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
  title: "Glaraki 1st Floor Apartment, Kato Patisia | Aurevon Global Partners",
  description:
    "A 70 m² fully furnished 1st floor apartment in Kato Patisia, Athens. 2 bedrooms, 1 bathroom, internal balcony, Golden Visa eligible.",
};

/* EDIT HERE: palette. Exactly the same variables as the Pythagoras page (RoomBook depends on them). */
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

/* Small arch band (replaces the right-angle band of the Pythagoras page) */
const archBg = (color: string): CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='14'><path d='M2 14V8a8 8 0 0 1 16 0v6' fill='none' stroke='${color}' stroke-width='1.3'/></svg>")`,
  backgroundRepeat: "repeat-x",
});
const ArchBand = ({
  className = "",
  color = "%23b9791f",
}: {
  className?: string;
  color?: string;
}) => <div aria-hidden className={`h-3.5 ${className}`} style={archBg(color)} />;

/* ───────── IMAGES ─────────
   All files go in public/images/glaraki/
     glaraki-cover.png          brochure cover (hero, living room)
     dining-kitchen-1.png       I    open-plan dining and kitchen
     kitchen-1.png              II   kitchen run
     dining-2.png               III  dining table and glass partition
     bedroom-1.png              IV   bedroom, frosted glass doors
     bedroom-2.png              V    bedroom, window and blinds
     bathroom-1.png             VI   bathroom
     patisia-neighbourhood.png  street view (Discover Kato Patisia)
     patisia-map.png            location map
   If your files are .jpg, change EXT below to "jpg". */
const FOLDER = "/images";
const EXT = "png";
const img = (n: string) => `${FOLDER}/${n}.${EXT}`;

/* EDIT HERE: the six pages of the book, in the order they flip */
const rooms = [
  {
    id: "open-plan",
    group: "Living",
    title: "Open-plan dining and kitchen",
    text: "Dining and kitchen share one bright space, under a brass globe pendant, with the kitchen run along a single wall.",
    src: img("glaraki-dining-kitchen"),
    alt: "Open-plan dining table and kitchen with brass globe pendant",
  },
  {
    id: "kitchen",
    group: "Kitchen",
    title: "The fitted kitchen",
    text: "Walnut-veneer cabinetry beneath taupe wall units, a travertine-look splashback, a black tap and warm under-cabinet lighting.",
    src: img("glaraki-kitchen"),
    alt: "Kitchen with walnut cabinetry, travertine-look splashback and black tap",
  },
  {
    id: "dining",
    group: "Living",
    title: "Dining and glass partition",
    text: "An oak dining table with soft taupe armchairs, set in front of a black-framed frosted glass partition.",
    src: img("glaraki-dining"),
    alt: "Oak dining table with taupe chairs and frosted glass partition",
  },
  {
    id: "bedroom-glass",
    group: "Sleeping",
    title: "Bedroom, frosted glass doors",
    text: "Black-framed frosted glass doors, layered neutral bedding and soft bedside lighting.",
    src: img("glaraki-bedroom-1"),
    alt: "Bedroom with black-framed frosted glass doors and neutral bedding",
  },
  {
    id: "bedroom-window",
    group: "Sleeping",
    title: "Bedroom and window",
    text: "A window with zebra blinds, a wall-mounted TV and a calm, uncluttered layout.",
    src: img("glaraki-bedroom-2"),
    alt: "Bedroom with zebra blinds and wall-mounted TV",
  },
  {
    id: "bathroom",
    group: "Bathroom",
    title: "The bathroom",
    text: "A walk-in shower with rain head, a wall-hung toilet and a floating walnut vanity beneath a backlit mirror.",
    src: img("glaraki-bathroom"),
    alt: "Bathroom with walk-in shower, wall-hung toilet and walnut vanity",
  },
];

/* contents strip above the book (matches the page order above) */
const chapters = [
  { range: "I – III", label: "Living & kitchen" },
  { range: "IV – V", label: "Sleeping" },
  { range: "VI", label: "Bathroom" },
];

/* EDIT HERE: key facts from the brochure */
const stats = [
  { n: 70, label: "m² of living space" },
  { n: 2, label: "Bedrooms" },
  { n: 1, label: "Bathroom" },
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
const SofaIcon = icon(
  <>
    <path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
    <path d="M3 13a2 2 0 0 1 4 0v1h10v-1a2 2 0 0 1 4 0v4H3z" />
    <path d="M5 17v2M19 17v2" />
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
const BalconyIcon = icon(
  <>
    <path d="M4 10h16" />
    <path d="M5 10v9h14v-9" />
    <path d="M8 10v9M12 10v9M16 10v9" />
    <path d="M7 10V5h10v5" />
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
const SlatsIcon = icon(
  <>
    <rect x="4" y="4" width="16" height="16" rx="1.5" />
    <path d="M8 4v16M12 4v16M16 4v16" />
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
const GlassIcon = icon(
  <>
    <rect x="4" y="3.5" width="16" height="17" rx="1" />
    <path d="M12 3.5v17M4 12h16" />
  </>,
);
const TrainIcon = icon(
  <>
    <rect x="6" y="3.5" width="12" height="13" rx="3" />
    <path d="M6 11h12M9 14h.01M15 14h.01" />
    <path d="M8.5 20.5l2-4M15.5 20.5l-2-4" />
  </>,
);
const ShopIcon = icon(
  <>
    <path d="M4 10l1.5-5h13L20 10" />
    <path d="M4 10a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 10" />
    <path d="M5.5 12.5V20h13v-7.5" />
    <path d="M10 20v-4.5h4V20" />
  </>,
);
const CupIcon = icon(
  <>
    <path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z" />
    <path d="M16 10.5h1.5a2 2 0 0 1 0 4H16" />
    <path d="M9 3.5c-.8 1 .8 1.7 0 2.7M12.5 3.5c-.8 1 .8 1.7 0 2.7" />
  </>,
);
const CityIcon = icon(
  <>
    <path d="M3.5 9L12 4l8.5 5z" />
    <path d="M6 11v7M10 11v7M14 11v7M18 11v7" />
    <path d="M4 20h16" />
  </>,
);

/* EDIT HERE: from the brochure */
const highlights: { Icon: IconType; value: string; label: string }[] = [
  { Icon: CoinsIcon, value: "€295,000", label: "Price" },
  { Icon: PassportIcon, value: "Eligible", label: "Golden Visa" },
  { Icon: SofaIcon, value: "Furnished", label: "Move-in ready" },
];

const specs: { Icon: IconType; text: string }[] = [
  { Icon: PlanIcon, text: "70 sq.m. 1st floor apartment" },
  { Icon: BedIcon, text: "2 Bedrooms" },
  { Icon: BathIcon, text: "1 Bathroom" },
  { Icon: BalconyIcon, text: "Internal balcony" },
  { Icon: HouseIcon, text: "Fully furnished" },
];

/* only what is visible in the photos; add heating, AC, alarm, etc. here if the brochure lists them */
const finishes: { Icon: IconType; text: string }[] = [
  { Icon: HobIcon, text: "Walnut fitted kitchen with built-in oven and hob" },
  { Icon: SlatsIcon, text: "Slatted timber TV wall with illuminated shelving" },
  { Icon: GlassIcon, text: "Black-framed frosted glass partitions" },
  { Icon: BulbIcon, text: "Warm recessed and concealed LED lighting" },
  { Icon: ShowerIcon, text: "Walk-in shower with rain head" },
];

/* x / y = where each pin sits on the map image, in %. Nudge them if a ring looks slightly off.
   The brochure map shows no distances, so none are listed here. */
const keyPlaces: { id: string; name: string; x: number; y: number }[] = [
  { id: "kato-patisia", name: "Kato Patisia Metro Station (Line 1)", x: 21, y: 56 },
  { id: "agios-nikolaos", name: "Agios Nikolaos Metro Station (Line 1)", x: 85, y: 61 },
  { id: "koliatsou", name: "Pl. Koliatsou (Koliatsou Square)", x: 75, y: 30 },
  { id: "jumbo", name: "Jumbo Acharnon, Acharnon 373-375", x: 13, y: 42 },
  { id: "xenophon", name: "Xenophon Hotel, Acharnon 340", x: 48, y: 44 },
  { id: "electra", name: "Electra Cinema / Theater, Patision 292", x: 61, y: 22 },
  { id: "knosos", name: "Knosos Theater, Knosou 11", x: 88, y: 24 },
  { id: "green-suites", name: "Green Suites Boutique Hotel", x: 15, y: 25 },
];

/* hover / tap on a row shows the matching ring on the map (pure CSS) */
const hoverCss = keyPlaces
  .map(
    (p) =>
      `.loc-explorer:has([data-place=${p.id}]:is(:hover,:focus)) [data-pin=${p.id}]{opacity:1;scale:1}`,
  )
  .join("\n");

const connections: { Icon: IconType; label: string; text: string }[] = [
  { Icon: TrainIcon, label: "Metro Line 1", text: "Kato Patisia and Agios Nikolaos stations nearby." },
  { Icon: CityIcon, label: "Central Athens", text: "Convenient links to the city centre." },
  { Icon: ShopIcon, label: "Shopping streets", text: "Local markets, shops and services." },
  { Icon: CupIcon, label: "Urban lifestyle", text: "Cafés, dining and neighbourhood character." },
];

/* from the brochure: "The neighbourhood" */
const theNeighbourhood: { label: string; text: string }[] = [
  {
    label: "Authentic Athenian living",
    text: "An established residential neighbourhood of Athens, combining authentic local character with the conveniences of modern urban living.",
  },
  {
    label: "Lively streets",
    text: "Lively streets, traditional shops, cafés and everyday amenities create a welcoming environment for residents seeking practicality and accessibility.",
  },
  {
    label: "Everyday amenities",
    text: "Local markets, shops and services close to home.",
  },
  {
    label: "Urban lifestyle",
    text: "Cafés, dining and neighbourhood character.",
  },
];

/* from the brochure: "Connected to Athens" */
const connectedToAthens: { label: string; text: string }[] = [
  {
    label: "Transport connections",
    text: "With access to Metro Line 1, shopping streets, educational facilities and essential services, Kato Patisia offers convenient links to central Athens.",
  },
  {
    label: "Residential appeal",
    text: "An established community and convenient location, with a residential character and established infrastructure.",
  },
  {
    label: "For homeowners and investors",
    text: "Its established infrastructure makes it an appealing choice for both homeowners and property investors.",
  },
  {
    label: "Nearby points of interest",
    text: "Two Line 1 metro stations, Jumbo on Acharnon, the Xenophon Hotel, Electra Cinema / Theater and Knosos Theater are all marked on the area map.",
  },
];

const neighbourhoodGroups = [
  { id: "neighbourhood", tab: "The neighbourhood", items: theNeighbourhood },
  { id: "athens", tab: "Connected to Athens", items: connectedToAthens },
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

/* Scalloped arch divider (echoes the arched hero frame), replaces the staircase divider */
const ARCH_W = 120;
const ARCH_N = 12;
const archTop = Array.from({ length: ARCH_N })
  .map((_, i) => `A60 20 0 0 1 ${(i + 1) * ARCH_W} 20`)
  .join(" ");
function Arches({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
      className={`block h-10 w-full md:h-14 ${flip ? "rotate-180" : ""}`}
    >
      <path d={`M0 80V20 ${archTop} V80Z`} fill="var(--navy)" />
      <path
        d={`M0 20 ${archTop}`}
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

/* Hero photo in an arch (round-topped window), brass outline echoed behind it */
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
    <div
      className={`relative ${className}`}
      style={{ filter: "drop-shadow(0 28px 36px rgba(16,35,94,0.35))" }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-t-[999px] border-[3px] border-white/80">
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

export default function GlarakiApartmentPage() {
  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      <S3Styles />
      <ScrollBar />

      {/* ───────── HERO · arch photo on the left, text on the right ───────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-(--sky) via-[#f6efe0] to-[#f4d9a8] pt-32 md:pt-40">
        <div aria-hidden className="absolute inset-0" style={glow("15% 85%", 0.45)} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 md:pb-32 lg:grid-cols-12">
          {/* arch photo with the same shape echoed as a brass outline behind it */}
          <HeroStage className="relative flex justify-center lg:col-span-5">
            <div className="relative w-[min(100%,20rem)] md:w-[min(100%,24rem)]">
              <div
                aria-hidden
                style={layer(12, -6, -25, 0, -4)}
                className="absolute inset-0 -translate-x-5 translate-y-5 rounded-t-[999px] border border-(--gold)/70"
              />
              <div style={layer(-8, -10, -60, 60, -5)} className="relative">
                <Reveal3D variant="zoom" delay={300} duration={1300}>
                  <ArchFrame
                    src={img("glaraki-cover")}
                    alt="Glaraki 1st Floor Apartment in Kato Patisia: living room with slatted timber TV wall. Golden Visa eligible, €295,000, 70 m², 2 bedrooms, 1 bathroom, fully furnished, internal balcony."
                    priority
                    sizes="(min-width:768px) 384px, 320px"
                    className="aspect-[418/584] w-full"
                  />
                </Reveal3D>
              </div>
            </div>
          </HeroStage>

          <div className="lg:col-span-7 lg:pl-8">
            <Reveal3D variant="flipRight">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--navy)/70">
                Kato Patisia, Athens
              </p>
            </Reveal3D>
            <h1 className="mt-6 font-serif text-5xl font-bold uppercase leading-[1.02] tracking-tight md:text-7xl">
              <Words text="Glaraki" className="block" />
              <Words
                text="Apartment"
                className="block"
                delay={300}
                wordClass="bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-transparent"
              />
            </h1>
            <Reveal3D variant="rise" delay={500}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-(--navy)/80">
                A fully furnished 70 m² apartment on the 1st floor, with
                2 bedrooms, 1 bathroom and an internal balcony, in the heart
                of Kato Patisia.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Tag>Golden Visa eligible</Tag>
                <span className="text-sm font-semibold text-(--navy)">€295,000</span>
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
        </div>
        <ArchBand className="relative opacity-70" />
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

      {/* ───────── PROPERTY FEATURES · title + highlights left, one tall card right ───────── */}
      <section className="relative bg-(--cream)">
        <Paper />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
              Property features
            </p>
            <Title title="Kato Patisia" sub="One furnished apartment" />
            <Reveal3D variant="rise" delay={150}>
              <p className="mt-8 max-w-sm leading-relaxed text-(--navy)/75">
                A warm, contemporary apartment in an established Athens
                neighbourhood, delivered fully furnished with a considered
                finish throughout.
              </p>
            </Reveal3D>

            {/* price · golden visa · furnished, stacked as rows */}
            <div className="mt-10 divide-y divide-(--gold)/30 border-y border-(--gold)/40">
              {highlights.map(({ Icon, value, label }, i) => (
                <Reveal3D
                  key={label}
                  variant="flipLeft"
                  delay={i * 100}
                  className="flex items-center gap-5 py-5"
                >
                  <Icon className="h-9 w-9 shrink-0 text-(--gold-dark)" />
                  <div>
                    <p className="font-serif text-2xl font-bold text-(--navy)">
                      {value}
                    </p>
                    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">
                      {label}
                    </p>
                  </div>
                </Reveal3D>
              ))}
            </div>
          </div>

          <Reveal3D variant="flipRight" className="lg:col-span-7">
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-3 translate-y-3 border border-(--gold)/50 md:-translate-x-4 md:translate-y-4"
              />
              <div className="relative border border-(--gold)/60 bg-white p-8 md:p-10">
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
                <h3 className="font-serif text-xl font-bold uppercase tracking-wide">
                  Property specifications
                </h3>
                <span className="mb-7 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                <IconList items={specs} />

                <ArchBand className="my-10 opacity-60" />

                <h3 className="font-serif text-xl font-bold uppercase tracking-wide">
                  Finishes
                </h3>
                <span className="mb-7 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                <IconList items={finishes} />
              </div>
            </div>
          </Reveal3D>
        </div>
      </section>

      {/* ───────── ROOMS · six-page flipping book ───────── */}
      <div className="bg-(--cream)">
        <Arches />
      </div>
      <section
        id="rooms"
        className="relative -mt-px scroll-mt-20 overflow-hidden bg-(--navy-deep) px-6 py-16 md:py-24"
      >
        {/* navy edges (to match the arches), blue haze above, brass glow behind the book */}
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
          <Title title="Walk through the apartment." sub="Flip through six rooms" dark center />

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
          <Arches flip />
        </div>
      </div>

      {/* ───────── LOCATION · portrait map on the left, places on the right ───────── */}
      <section id="location" className="relative -mt-px scroll-mt-20 bg-(--cream)">
        <Paper />
        <style dangerouslySetInnerHTML={{ __html: hoverCss }} />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="loc-explorer grid gap-14 lg:grid-cols-12 lg:items-center">
            {/* LEFT: tall portrait map plate */}
            <div className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
              <Depth axis="y" rotate={8} lift={70}>
                <div className="relative">
                  {/* offset brass outline, bottom-left this time */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-3 translate-y-3 border border-(--gold)/50 md:-translate-x-5 md:translate-y-5"
                  />
                  <div className="relative border border-(--gold)/60 bg-white p-3 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-4">
                    {/* floating label */}
                    <span className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap bg-(--navy) px-4 py-1 font-serif text-[10px] font-semibold uppercase tracking-[0.4em] text-(--gold-light)">
                      Patisia · Athens
                    </span>
                    <div className="relative aspect-[387/574] w-full overflow-hidden bg-(--paper) ring-1 ring-(--gold)/50">
                      <Image
                        src={img("glaraki-map")}
                        alt="Aerial map of Patisia, Athens, showing the property location, metro stations and nearby points of interest"
                        fill
                        sizes="(min-width:1024px) 40vw, 95vw"
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
                          className="pointer-events-none absolute z-10 aspect-square w-[11%] -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full border-2 border-(--gold-light) opacity-0 transition duration-300"
                        >
                          <span className="absolute inset-0 animate-ping rounded-full bg-(--gold-light)/50" />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Depth>
            </div>

            {/* RIGHT: title + paragraph + list */}
            <div className="lg:col-span-7 lg:pl-8">
              <Title title="Patisia, connected to everything." sub="Location" />
              <Reveal3D variant="rise" delay={150}>
                <p className="mt-8 max-w-md text-sm leading-relaxed text-(--navy)/75">
                  Two Line 1 metro stations, shopping on Acharnon and cultural
                  venues are all marked on the area map. Hover or tap a place
                  to find it on the map.
                </p>
                <ul className="mt-6 border-t border-(--gold)/40">
                  {keyPlaces.map(({ id, name }, i) => (
                    <li
                      key={id}
                      data-place={id}
                      tabIndex={0}
                      className="group relative flex cursor-pointer items-baseline gap-4 border-b border-(--gold)/20 py-3 text-sm text-(--navy)/85 outline-none transition-all duration-300 hover:bg-(--gold)/10 hover:pl-4 hover:text-(--navy) focus:bg-(--gold)/10 focus:pl-4 focus:text-(--navy)"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 bg-(--gold) transition-all duration-300 group-hover:h-6 group-focus:h-6"
                      />
                      <span className="font-serif text-xs tracking-[0.3em] text-(--gold)">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{name}</span>
                      <span
                        aria-hidden
                        className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.25em] text-(--gold-dark) opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100"
                      >
                        On map
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal3D>
            </div>
          </div>

          {/* connected to athens */}
          <p className="mb-6 mt-20 text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark) md:mt-24">
            Connected to Athens
          </p>
          <Reveal3D variant="rise">
            <ul className="grid grid-cols-1 divide-y divide-(--gold)/30 border-y border-(--gold)/50 sm:grid-cols-2 sm:divide-x-0 md:grid-cols-4 md:divide-x md:divide-y-0">
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

      {/* ───────── EVERYDAY LIFE · paper, photo as a tilted print ───────── */}
      <section className="relative bg-(--paper)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* text first, photo on the right */}
            <div className="lg:col-span-5">
              <Title title="Authentic Athenian living." sub="Discover Kato Patisia" />
              <Reveal3D variant="rise" delay={150}>
                <p className="mt-8 max-w-sm text-sm leading-relaxed text-(--navy)/75">
                  An established residential neighbourhood of Athens, with
                  lively streets, traditional shops, cafés and everyday
                  amenities, and convenient links to central Athens by
                  Metro Line 1.
                </p>
                <p className="mt-8 border-t border-(--gold)/40 pt-6 font-serif text-xl italic leading-snug text-(--gold-dark) md:text-2xl">
                  Authentic character. Modern convenience.
                </p>
              </Reveal3D>
            </div>

            <div className="lg:col-span-7">
              <Reveal3D variant="zoom">
                <figure className="relative mx-auto max-w-xl rotate-1 bg-white p-3 pb-12 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-4 md:pb-14">
                  {/* brass tape */}
                  <span
                    aria-hidden
                    className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 bg-(--gold-light)/70 shadow-sm"
                  />
                  <div className="relative aspect-[4/3] w-full overflow-hidden ring-1 ring-(--gold)/40">
                    <Image
                      src={img("patisia-neighbourhood")}
                      alt="Tree-lined residential street in Kato Patisia with apartment buildings and balconies"
                      fill
                      sizes="(min-width:1024px) 600px, 95vw"
                      className="object-cover object-center"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(90,60,15,0.3)]"
                    />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark) md:bottom-4 md:text-[10px]">
                    <span className="h-px w-8 bg-(--gold)/60 md:w-12" />
                    <span className="font-serif italic normal-case tracking-[0.15em]">
                      Kato Patisia, Athens
                    </span>
                    <span className="h-px w-8 bg-(--gold)/60 md:w-12" />
                  </figcaption>
                </figure>
              </Reveal3D>
            </div>
          </div>

          {/* interactive: the neighbourhood + connected to athens */}
          <div className="mt-14 md:mt-20">
            <Reveal3D variant="rise">
              <NeighbourhoodTabs groups={neighbourhoodGroups} />
            </Reveal3D>
          </div>
        </div>
      </section>

      {/* ───────── CTA · navy with arches ───────── */}
      <div className="bg-(--paper)">
        <Arches />
      </div>
      <section
        className="relative -mt-px overflow-hidden bg-(--navy) px-6 pb-24 pt-10 text-white md:pb-32"
        style={glow("50% 0%", 0.28)}
      >
        <Depth rotate={12} lift={120}>
          {/* arched top, to echo the hero frame */}
          <div className="relative mx-auto max-w-4xl rounded-t-[12rem] border border-(--gold)/60 px-10 pb-10 pt-20 text-center md:px-16 md:pb-16 md:pt-28">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-light)">
              Aurevon Global Partners
            </p>
            <h2 className="mx-auto mt-5 max-w-xl font-serif text-3xl font-bold uppercase leading-tight md:text-5xl">
              <Words text="Interested in the Glaraki Apartment?" className="block" />
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              A fully furnished 70 m² apartment with 2 bedrooms, 1 bathroom and
              an internal balcony in Kato Patisia, at €295,000 and Golden Visa
              eligible. Contact us to arrange a viewing.
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110"
            >
              Arrange a viewing
            </Link>
            <ArchBand className="absolute inset-x-6 bottom-3 opacity-60" color="%23e2b862" />
          </div>
        </Depth>
      </section>
    </main>
  );
}