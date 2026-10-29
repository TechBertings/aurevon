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
  title: "Seizani Loft Apartments, Nea Ionia | Aurevon Global Partners",
  description:
    "Two identical 55 m² loft apartments in Nea Ionia, Athens. Delivery ready, 300 m from the metro, Golden Visa eligible.",
};

/* EDIT HERE: brochure palette */
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

/* Greek key (meander) band */
const meanderBg = (color: string): CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='14'><path d='M0 13V1H13V10H5V5H9M13 1H18' fill='none' stroke='${color}' stroke-width='1.4'/></svg>")`,
  backgroundRepeat: "repeat-x",
});
const Meander = ({
  className = "",
  color = "%23b9791f",
}: {
  className?: string;
  color?: string;
}) => (
  <div aria-hidden className={`h-3.5 ${className}`} style={meanderBg(color)} />
);

/* ───────── IMAGES ─────────
   All files go directly in public/images/
     mapa-1.jpg                (the Nea Ionia location map)
     seizani-cover.jpg      the brochure cover (hero image)
     kitchen-1.jpg          photo 1  kitchen
     living-1.jpg           photo 2  double-height living
     entrance-1.jpg         photo 3  entrance and daylight
     storage-1.jpg          photo 4  built-in cabinetry and appliances
     bedroom-1.jpg          photo 5  mezzanine bedroom
     wardrobe-1.jpg         photo 6  wardrobe and window
     bathroom-1.jpg         photo 7  bathroom
   If your files are .png, change EXT below to "png". */
const FOLDER = "/images";
const EXT = "png";
const img = (n: string) => `${FOLDER}/${n}.${EXT}`;

/* EDIT HERE: the seven pages of the book, in the order they flip */
const rooms = [
  {
    id: "kitchen",
    group: "Living",
    title: "The kitchen",
    text: "Dark matte cabinetry against an oak backsplash, with a timber breakfast bar and warm strip lighting overhead.",
    src: img("kitchen-1"),
    alt: "Kitchen with dark cabinetry, oak backsplash and breakfast bar",
  },
  {
    id: "living",
    group: "Living",
    title: "Double-height living",
    text: "A tall open volume with a glazed mezzanine gallery above, soft wall-washed light and pale tile underfoot.",
    src: img("living-1"),
    alt: "Double-height living area with glazed mezzanine",
  },
  {
    id: "entrance",
    group: "Entrance",
    title: "Entrance and daylight",
    text: "Tall glazed openings bring daylight into the entry, beside the security door and a slatted timber bar.",
    src: img("entrance-1"),
    alt: "Entrance with security door and tall windows",
  },
  {
    id: "storage",
    group: "Living",
    title: "Built-in storage",
    text: "A full-height run of dark cabinetry with the oven and fridge built in, keeping the plan clean and uncluttered.",
    src: img("storage-1"),
    alt: "Full-height cabinetry with built-in oven and fridge",
  },
  {
    id: "bedroom",
    group: "Sleeping",
    title: "Mezzanine bedroom",
    text: "Warm oak flooring, track lighting and sliding wardrobes on the upper level, beside the stair.",
    src: img("bedroom-1"),
    alt: "Mezzanine bedroom with oak floor and sliding wardrobe",
  },
  {
    id: "wardrobe",
    group: "Sleeping",
    title: "Wardrobe and window",
    text: "Generous built-in wardrobes and a bright window at the far end make the bedroom practical as well as calm.",
    src: img("wardrobe-1"),
    alt: "Bedroom wardrobe and window",
  },
  {
    id: "bathroom",
    group: "Bathroom",
    title: "The bathroom",
    text: "Large-format stone-look tiles, a floating oak vanity, a backlit mirror and black fixtures, with a glass walk-in shower.",
    src: img("bathroom-1"),
    alt: "Bathroom with floating oak vanity, backlit mirror and walk-in shower",
  },
];

/* EDIT HERE: key facts from the brochure */
const stats = [
  { n: 2, label: "Identical apartments" },
  { n: 55, label: "m² each" },
  { n: 300, label: "m to the metro" },
];

/* ───────── Icons (line style, drawn to match the brochure) ───────── */
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
const CalendarIcon = icon(
  <>
    <rect x="4" y="5.5" width="16" height="14.5" rx="1.5" />
    <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    <path d="M8 13.5h.01M12 13.5h.01M16 13.5h.01M8 16.5h.01M12 16.5h.01" />
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
const NoFurnitureIcon = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 11v-1.5A1.5 1.5 0 0 1 9.5 8h5a1.5 1.5 0 0 1 1.5 1.5V11" />
    <path d="M7 11h10v3.5H7z" />
    <path d="M5.6 5.6l12.8 12.8" />
  </>,
);
const ThermometerIcon = icon(
  <>
    <path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z" />
    <path d="M12 9v7" />
    <path d="M16.5 6.5h2M16.5 9.5h2" />
  </>,
);
const SnowflakeIcon = icon(
  <>
    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
    <path d="M9.5 4.5L12 6.5l2.5-2M9.5 19.5l2.5-2 2.5 2" />
  </>,
);
const ShieldCheckIcon = icon(
  <>
    <path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6z" />
    <path d="M8.5 12l2.5 2.5L15.5 10" />
  </>,
);
const PlantIcon = icon(
  <>
    <path d="M12 21v-9" />
    <path d="M12 13c0-3.5-2.5-6-6.5-6 0 3.5 2.5 6 6.5 6z" />
    <path d="M12 11c0-3 2-5.5 6-5.5 0 3.2-2 5.5-6 5.5z" />
    <path d="M8 21h8" />
  </>,
);
const WindowIcon = icon(
  <>
    <rect x="5" y="3.5" width="14" height="17" rx="1" />
    <path d="M12 3.5v17M5 12h14" />
  </>,
);
const SecurityIcon = icon(
  <>
    <path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6z" />
    <circle cx="12" cy="10" r="1.8" />
    <path d="M12 11.8V16M12 14h1.8" />
  </>,
);
const TrainIcon = icon(
  <>
    <rect x="6" y="3.5" width="12" height="13" rx="3" />
    <path d="M6 11h12M9 14h.01M15 14h.01" />
    <path d="M8.5 20.5l2-4M15.5 20.5l-2-4" />
  </>,
);
const BagIcon = icon(
  <>
    <path d="M5.5 8h13l-1 12h-11z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </>,
);
const TreeIcon = icon(
  <>
    <path d="M12 21v-6" />
    <path d="M12 3.5c-3.5 2.5-5.5 5-5.5 8 0 2.2 2.5 3.5 5.5 3.5s5.5-1.3 5.5-3.5c0-3-2-5.5-5.5-8z" />
  </>,
);
const HeartIcon = icon(
  <path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
);

/* EDIT HERE: taken from the "Property features" brochure */
const highlights: { Icon: IconType; value: string; label: string }[] = [
  { Icon: PinIcon, value: "300 m", label: "From Nea Ionia metro station" },
  { Icon: CoinsIcon, value: "€250,000", label: "Price" },
  { Icon: CalendarIcon, value: "Ready", label: "Delivery" },
];

const specs: { Icon: IconType; text: string }[] = [
  { Icon: HouseIcon, text: "2 Separate Apartments" },
  { Icon: PlanIcon, text: "Identical 55 sq.m. each" },
  { Icon: BedIcon, text: "1 Bedroom" },
  { Icon: BathIcon, text: "1 Bathroom" },
  { Icon: NoFurnitureIcon, text: "No Furniture" },
];

const features: { Icon: IconType; text: string }[] = [
  { Icon: ThermometerIcon, text: "Autonomous Heating" },
  { Icon: SnowflakeIcon, text: "ACs" },
  { Icon: ShieldCheckIcon, text: "Alarm System" },
  { Icon: PlantIcon, text: "Backyard" },
  { Icon: WindowIcon, text: "Double Glaze Aluminium Triplex" },
  { Icon: SecurityIcon, text: "Security Door" },
];

const pillars: { Icon: IconType; label: string }[] = [
  { Icon: HouseIcon, label: "Modern living" },
  { Icon: PinIcon, label: "Excellent location" },
  { Icon: ShieldCheckIcon, label: "Security & comfort" },
  { Icon: PlantIcon, label: "Smart investment" },
];

/* EDIT HERE: the five amenities bar under the map (same as the brochure) */
const amenities: { Icon: IconType; label: string }[] = [
  { Icon: HouseIcon, label: "Close to key amenities" },
  { Icon: TrainIcon, label: "Excellent transport links" },
  { Icon: BagIcon, label: "Shops & services within walking distance" },
  { Icon: TreeIcon, label: "Parks & green areas" },
  { Icon: HeartIcon, label: "Healthcare facilities" },
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

function Wave({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
      className={`block h-10 w-full md:h-16 ${flip ? "rotate-180" : ""}`}
    >
      <path
        d="M0 46 C 260 6, 520 74, 780 38 C 1040 4, 1250 56, 1440 20 L1440 80 L0 80 Z"
        fill="var(--navy)"
      />
      <path
        d="M0 46 C 260 6, 520 74, 780 38 C 1040 4, 1250 56, 1440 20"
        fill="none"
        stroke="var(--gold-light)"
        strokeWidth="2.5"
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

/* Framed photo: white mat + gold hairline, optional arch */
function Frame({
  src,
  alt = "",
  arch = false,
  priority = false,
  className = "",
  sizes = "(min-width:1024px) 20vw, 30vw",
}: {
  src: string;
  alt?: string;
  arch?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const round = arch ? "rounded-t-full" : "";
  return (
    <div
      className={`relative overflow-hidden bg-white p-1.5 shadow-[0_24px_50px_-20px_rgba(16,35,94,0.45)] ${round} ${className}`}
    >
      <div
        className={`relative h-full w-full overflow-hidden border border-(--gold)/60 ${round}`}
      >
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

export default function SeizaniLoftPage() {
  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      <S3Styles />
      <ScrollBar />

      {/* ───────── HERO · sky to sunset, layered 3D ───────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-(--sky) via-[#f6efe0] to-[#f4d9a8] pt-32 md:pt-40">
        <div aria-hidden className="absolute inset-0" style={glow("85% 85%", 0.45)} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 md:pb-32 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal3D variant="flipLeft">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--navy)/70">
                Nea Ionia, Athens
              </p>
            </Reveal3D>
            <h1 className="mt-6 font-serif text-5xl font-bold uppercase leading-[1.02] tracking-tight md:text-7xl">
              <Words text="Seizani" className="block" />
              <Words
                text="Loft"
                className="block"
                delay={300}
                wordClass="bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-transparent"
              />
            </h1>
            <Reveal3D variant="rise" delay={500}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-(--navy)/80">
                Two modern 55 m² lofts with double-height ceilings, warm timber
                and quiet mineral finishes, 300 m from the metro.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Tag>Golden Visa eligible</Tag>
                <span className="text-sm font-semibold text-(--navy)">€250,000 each</span>
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

          {/* one framed arch: the brochure cover, with a gold outline floating behind it at a different depth */}
          <HeroStage className="relative flex justify-center lg:col-span-6">
            <div className="relative w-[min(100%,22rem)] md:w-[min(100%,26rem)]">
              <div
                aria-hidden
                style={layer(-12, -6, -25, 0, 4)}
                className="absolute inset-0 translate-x-5 translate-y-5 rounded-t-full border border-(--gold)/60"
              />
              <div style={layer(8, -10, -60, 60, 5)} className="relative">
                <Reveal3D variant="zoom" delay={300} duration={1300}>
                  <Frame
                    src={img("seizani-cover")}
                    alt="Nea Ionia Seizani Loft Apartments: double-height kitchen and living area. Golden Visa eligible, €250,000, 55 m², 1 bedroom, 1 bathroom."
                    priority
                    arch
                    sizes="(min-width:768px) 416px, 352px"
                    className="aspect-[541/773] w-full"
                  />
                </Reveal3D>
              </div>
            </div>
          </HeroStage>
        </div>
        <Meander className="relative opacity-70" />
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
              <Title title="Nea Ionia" sub="Two modern apartments" />
            </div>
            <Reveal3D variant="flipRight" className="lg:col-span-5">
              <p className="leading-relaxed text-(--navy)/75">
                A refined residential opportunity in a prime location, offering
                modern comfort and excellent connectivity to the city.
              </p>
            </Reveal3D>
          </div>

          {/* metro distance · price · delivery */}
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
                  Property features
                </h3>
                <span className="mb-7 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                <IconList items={features} />
              </div>
            </Reveal3D>
          </div>

          {/* four pillars */}
          <div className="mt-12 grid grid-cols-2 gap-y-8 border-t border-(--gold)/40 pt-10 md:grid-cols-4">
            {pillars.map(({ Icon, label }, i) => (
              <Reveal3D
                key={label}
                variant="rise"
                delay={i * 100}
                className="flex flex-col items-center text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-(--gold)/60 bg-white text-(--gold-dark)">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="mt-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-(--navy)">
                  {label}
                </span>
              </Reveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── ROOMS · one flipping-book carousel instead of seven long sections ───────── */}
      <div className="bg-(--cream)">
        <Wave />
      </div>
      <section
        id="rooms"
        className="relative -mt-px scroll-mt-20 overflow-hidden bg-(--navy-deep) px-6 py-16 md:py-24"
      >
        {/* tri-colour twilight: navy edges (to match the waves), aegean blue haze above, sunset gold behind the book */}
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
        {/* European tricolour hairlines: aegean | cream | gold */}
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
          <Title title="Walk through the apartment." sub="Flip through the rooms" dark center />
          <div className="mt-12">
            <RoomBook pages={rooms} />
          </div>
        </div>
      </section>
      <div className="bg-(--paper)">
        <div className="bg-(--navy)">
          <Wave flip />
        </div>
      </div>

      {/* ───────── LOCATION · paper ───────── */}
      <section id="location" className="relative -mt-px scroll-mt-20 bg-(--paper)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Title title="Nea Ionia, close to everything." sub="Location" />
              <Reveal3D variant="rise" delay={150}>
                <p className="mt-8 max-w-sm text-sm leading-relaxed text-(--navy)/75">
                  The metro, shops, green areas and healthcare are all within
                  easy reach of the apartments, with excellent links to the
                  centre of Athens.
                </p>
                <div className="mt-8 flex items-baseline gap-4 border-t border-(--gold)/40 pt-6">
                  <span className="font-serif text-4xl font-bold text-(--navy)">
                    300 m
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">
                    to Nea Ionia metro
                  </span>
                </div>
              </Reveal3D>
            </div>
            <div className="lg:col-span-7">
              <Depth axis="y" rotate={-8} lift={90}>
                <div className="border border-(--gold)/50 bg-white p-3 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-5">
                  <div className="relative aspect-[1130/944] w-full overflow-hidden">
                    <Image
                      src={img("mapa-1")}
                      alt="Aerial map of Nea Ionia showing the apartments, metro station, parks, hospital and shops"
                      fill
                      sizes="(min-width:1024px) 55vw, 95vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Depth>
            </div>
          </div>

          {/* five amenities bar */}
          <Reveal3D variant="rise" className="mt-16 md:mt-20">
            <ul className="grid grid-cols-1 divide-y divide-(--gold)/30 border-y border-(--gold)/50 md:grid-cols-5 md:divide-x md:divide-y-0">
              {amenities.map(({ Icon, label }, i) => (
                <li
                  key={label}
                  className="group flex flex-col items-center px-6 py-10 text-center"
                >
                  <span className="font-serif text-xs tracking-[0.3em] text-(--gold)">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="mt-5 h-9 w-9 text-(--navy) transition duration-500 group-hover:-translate-y-1 group-hover:text-(--gold-dark)" />
                  <span className="mt-5 block h-px w-8 bg-(--gold)/60" />
                  <span className="mt-5 max-w-[11rem] text-[10px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-(--navy)/80">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal3D>
        </div>
      </section>

      {/* ───────── CTA · navy with wave ───────── */}
      <div className="bg-(--paper)">
        <Wave />
      </div>
      <section
        className="relative -mt-px overflow-hidden bg-(--navy) px-6 pb-24 pt-10 text-white md:pb-32"
        style={glow("50% 0%", 0.28)}
      >
        <Depth rotate={12} lift={120}>
          <div className="relative mx-auto max-w-4xl border border-(--gold)/60 p-10 text-center md:p-16">
            <Meander className="absolute inset-x-6 top-3 opacity-60" color="%23e2b862" />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-light)">
              Aurevon Global Partners
            </p>
            <h2 className="mx-auto mt-5 max-w-xl font-serif text-3xl font-bold uppercase leading-tight md:text-5xl">
              <Words text="Interested in a Seizani Loft?" className="block" />
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              Two apartments at €250,000 each, delivery ready and Golden Visa
              eligible. Contact us to arrange a viewing.
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110"
            >
              Arrange a viewing
            </Link>
            <Meander className="absolute inset-x-6 bottom-3 opacity-60" color="%23e2b862" />
          </div>
        </Depth>
      </section>
    </main>
  );
}