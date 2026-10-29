import Image from "next/image";
import Link from "next/link";
import type { ComponentType, CSSProperties, ReactNode } from "react";
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
  title: "Drapetsona 1st Floor Apartments | Aurevon Global Partners",
  description:
    "Two 1-bedroom first-floor apartments in Drapetsona, close to Piraeus Port and the Athenian coastline. Golden Visa eligible.",
};

/* EDIT HERE: palette. Same variable names and values as the Piraeus page. */
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

/* Sail band: a row of small sails */
const sailsBg = (color: string): CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='22' height='14'><path d='M2 13L9 1V13Z M11 13V4L19 13Z M0 13.5H22' fill='none' stroke='${color}' stroke-width='1.2' stroke-linejoin='round'/></svg>")`,
  backgroundRepeat: "repeat-x",
});
const Sails = ({
  className = "",
  color = "%23b9791f",
}: {
  className?: string;
  color?: string;
}) => (
  <div aria-hidden className={`h-3.5 ${className}`} style={sailsBg(color)} />
);

/* ───────── IMAGES ─────────
   All files go in public/images/drapetsona/
     drapetsona-cover.png       building exterior (hero + discover section)
     drapetsona-floorplan.png   floor plan of both apartments
     drapetsona-map.png         aerial location map (crop it to just the map frame)
   If your files are .jpg, change EXT below to "jpg". */
const FOLDER = "/images";
const EXT = "png";
const img = (n: string) => `${FOLDER}/${n}.${EXT}`;

/* EDIT HERE: key facts from the brochure */
const stats = [
  { n: 2, label: "1st floor apartments" },
  { n: 57, label: "m² Apartment 1" },
  { n: 62, label: "m² Apartment 2" },
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
const FloorIcon = icon(
  <>
    <path d="M3 8l9-4 9 4-9 4z" />
    <path d="M3 12l9 4 9-4" />
    <path d="M3 16l9 4 9-4" />
  </>,
);

/* EDIT HERE: from the brochure */
const highlights: { Icon: IconType; value: string; label: string }[] = [
  { Icon: CoinsIcon, value: "From €290,000", label: "Price" },
  { Icon: FloorIcon, value: "1st Floor", label: "Level" },
  { Icon: PassportIcon, value: "Eligible", label: "Golden Visa" },
];

const apartments: {
  name: string;
  size: string;
  price: string;
  specs: { Icon: IconType; text: string }[];
}[] = [
  {
    name: "Apartment 1",
    size: "57 m²",
    price: "€290,000",
    specs: [
      { Icon: PlanIcon, text: "57 sq.m. apartment" },
      { Icon: BedIcon, text: "1 Bedroom" },
      { Icon: FloorIcon, text: "1st floor" },
      { Icon: PassportIcon, text: "Golden Visa eligible" },
    ],
  },
  {
    name: "Apartment 2",
    size: "62 m²",
    price: "€295,000",
    specs: [
      { Icon: PlanIcon, text: "62 sq.m. apartment" },
      { Icon: BedIcon, text: "1 Bedroom" },
      { Icon: FloorIcon, text: "1st floor" },
      { Icon: PassportIcon, text: "Golden Visa eligible" },
    ],
  },
];

/* On the map. x / y = where each pin sits on the map image, in %. Nudge them if a ring looks slightly off. */
const keyPlaces: { id: string; name: string; tag: string; x: number; y: number }[] = [
  { id: "port", name: "Piraeus Port", tag: "Ferry terminal", x: 11, y: 21 },
  { id: "portbasin", name: "Port of Piraeus", tag: "Harbour", x: 80, y: 78 },
  { id: "station", name: "Piraeus Railway Station", tag: "Metro Line 1", x: 77, y: 29 },
  { id: "theatre", name: "Municipal Theatre of Piraeus", tag: "Culture", x: 89, y: 49 },
  { id: "acropolis", name: "Acropolis of Athens", tag: "Landmark", x: 84, y: 5 },
  { id: "school", name: "2nd High School & Lyceum Drapetsonas", tag: "Education", x: 12, y: 55 },
  { id: "sklavenitis", name: "Sklavenitis Super Market", tag: "Supermarket", x: 31, y: 38 },
  { id: "masoutis", name: "Masoutis Super Market", tag: "Supermarket, nearby", x: 26, y: 68 },
  { id: "mymarket", name: "My market Local", tag: "Supermarket", x: 59, y: 55 },
  { id: "bakery", name: "Gavriilides Bakeries", tag: "Bakery", x: 41, y: 50 },
  { id: "pharmacy", name: "Pharmacy Stavrianakos Michalis", tag: "Pharmacy", x: 40, y: 78 },
  { id: "park", name: "Lipasmata Multifunctional Park", tag: "Waterfront park", x: 19, y: 96 },
];

/* hover / tap on a row shows the matching ring on the map (pure CSS) */
const hoverCss = keyPlaces
  .map(
    (p) =>
      `.loc-explorer:has([data-place=${p.id}]:is(:hover,:focus)) [data-pin=${p.id}]{opacity:1;scale:1}`,
  )
  .join("\n");

/* from the client's brochure (text is the client's own) */
const discoverParas: ReactNode[] = [
  <>
    <strong>Drapetsona</strong> is a dynamic coastal district adjoining Piraeus, combining an{" "}
    <strong>authentic urban character</strong> with convenient access to the Port of Piraeus,
    public transport and the wider Athens metropolitan area. Its waterfront setting and proximity
    to major commercial and transport hubs make it a{" "}
    <strong>well-connected choice for contemporary city living</strong>.
  </>,
  <>
    The area is also undergoing <strong>continued urban regeneration</strong>, with destinations
    such as the <strong>Lipasmaton Multifunctional Park</strong> enhancing its coastal character
    and creating new recreational spaces along the waterfront. Offering accessibility, proximity
    to the sea and <strong>investment potential</strong>, Drapetsona presents an attractive option
    for both residents and property investors.
  </>,
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

/* Arcade divider (a run of quayside arches) */
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

/* Hero frame: modern European editorial. Square-cut photo on a white mat, hairline offset outline,
   architectural caption strip, vertical side label and a navy "1F" block. No curves, no ornament. */
function Collage({
  src,
  alt = "",
  sizes,
  className = "",
}: {
  src: string;
  alt?: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* hairline outline, offset behind the mat */}
      <Reveal3D variant="rise" delay={250} duration={1100} className="absolute inset-0">
        <div
          aria-hidden
          style={layer(4, -4, -20, 20, 2)}
          className="h-full w-full translate-x-4 translate-y-4 border border-(--navy)/40"
        />
      </Reveal3D>

      {/* the mat */}
      <Reveal3D variant="rise" delay={400} duration={1100} className="absolute inset-0">
        <div style={layer(8, -8, -50, 50, 4)} className="h-full w-full">
          <div className="flex h-full w-full flex-col bg-white p-4 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.5)] md:p-5">
            {/* header row */}
            <div className="mb-3 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.35em] text-(--navy)/70">
              <span className="h-px flex-1 mx-4 bg-(--navy)/20" />
              <span>Drapetsona</span>
            </div>

            {/* photo, sharp corners */}
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <Image src={src} alt={alt} fill priority sizes={sizes} className="object-cover" />
            </div>

            {/* caption strip: two apartments */}
            <div className="mt-3 grid grid-cols-2 divide-x divide-(--navy)/15 border-t border-(--navy)/20 pt-3">
              {[
                { k: "Apt 1", m: "57 m²", p: "€290,000" },
                { k: "Apt 2", m: "62 m²", p: "€295,000" },
              ].map((a, i) => (
                <div key={a.k} className={i === 0 ? "pr-3" : "pl-4"}>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">
                    {a.k}
                  </p>
                  <p className="mt-1 font-serif text-sm font-bold text-(--navy) md:text-base">
                    {a.m} <span className="font-normal text-(--navy)/50">/</span> {a.p}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal3D>

      {/* vertical side label */}
      <Reveal3D variant="flipLeft" delay={700} className="absolute -left-7 top-1/2 hidden md:block">
        <span
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          className="block text-[9px] font-semibold uppercase tracking-[0.5em] text-(--navy)/60"
        >
          Piraeus &middot; Athens &middot; Greece
        </span>
      </Reveal3D>


        {/* navy floor block */}
      <Reveal3D variant="flipRight" delay={850} className="absolute -bottom-10 -left-5 md:-left-8">
        <div
          style={layer(16, -6, -10, 110, 6)}
          className="flex h-14 w-14 flex-col items-start justify-between bg-(--navy) p-1 shadow-xl"
        >
          <span className="text-[7px] font-semibold uppercase tracking-[0.3em] text-white/70">
            Level
          </span>
          <span className="font-serif text-2xl font-bold leading-none text-(--gold-light)">1F</span>
        </div>
      </Reveal3D>
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

export default function DrapetsonaApartmentsPage() {
  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      <S3Styles />
      <ScrollBar />

      {/* ───────── HERO · collage ───────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-(--sky) via-[#f6efe0] to-[#f4d9a8] pt-32 md:pt-40">
        <div aria-hidden className="absolute inset-0" style={glow("85% 85%", 0.45)} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 md:pb-32 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal3D variant="flipLeft">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--navy)/70">
                Drapetsona, Piraeus
              </p>
            </Reveal3D>
            <h1 className="mt-6 font-serif text-5xl font-bold uppercase leading-[1.02] tracking-tight md:text-7xl">
              <Words text="1st Floor" className="block" />
              <Words
                text="Apartments"
                className="block"
                delay={300}
                wordClass="bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-transparent"
              />
            </h1>
            <Reveal3D variant="rise" delay={500}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-(--navy)/80">
                Contemporary living close to Piraeus Port and the Athenian
                coastline. Two 1-bedroom residences in Drapetsona.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Tag>Golden Visa eligible</Tag>
                <span className="text-sm font-semibold text-(--navy)">From €290,000</span>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-(--navy) px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:bg-(--gold-dark)"
                >
                  Arrange a viewing
                </Link>
                <a
                  href="#apartments"
                  className="border border-(--navy)/40 bg-white/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] backdrop-blur transition hover:border-(--gold) hover:text-(--gold-dark)"
                >
                  View the apartments
                </a>
              </div>
            </Reveal3D>
          </div>

          {/* editorial frame */}
          <HeroStage className="relative flex justify-center lg:col-span-6">
            <Collage
              src={img("drapetsona-cover")}
              alt="1st floor apartments in Drapetsona: a contemporary building with a timber and stone facade, lit at dusk. Golden Visa eligible."
              sizes="(min-width:768px) 480px, 360px"
              className="aspect-[4/5] w-[min(88%,23rem)] md:w-[min(88%,28rem)]"
            />
          </HeroStage>
        </div>
        <Sails className="relative opacity-70" />
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

      {/* ───────── APARTMENTS · cream ───────── */}
      <section id="apartments" className="relative scroll-mt-20 bg-(--cream)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
                Property features
              </p>
              <Title title="Drapetsona" sub="Two 1-bedroom residences" />
            </div>
            <Reveal3D variant="flipRight" className="lg:col-span-5">
              <p className="leading-relaxed text-(--navy)/75">
                Two first-floor apartments in a well-connected coastal district,
                with all amenities and facilities on your doorstep.
              </p>
            </Reveal3D>
          </div>

          {/* price · level · golden visa */}
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

          {/* the two apartments */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {apartments.map((a, i) => (
              <Reveal3D key={a.name} variant={i === 0 ? "flipLeft" : "flipRight"}>
                <div className="h-full border border-(--gold)/40 bg-white p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-xl font-bold uppercase tracking-wide">
                      {a.name}
                    </h3>
                    <span className="font-serif text-2xl font-bold text-(--gold-dark)">
                      {a.price}
                    </span>
                  </div>
                  <span className="mb-7 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                  <IconList items={a.specs} />
                </div>
              </Reveal3D>
            ))}
          </div>

          {/* floor plan */}
          <div className="mx-auto mt-20 max-w-3xl">
            <Reveal3D variant="rise">
              <Plate
                src={img("drapetsona-floorplan")}
                alt="Floor plan of the two 1-bedroom first-floor apartments in Drapetsona, 57 m² and 62 m²"
                caption="Floor plan"
                aspect="aspect-[784/662]"
                fit="object-contain"
                sizes="(min-width:768px) 720px, 95vw"
              />
            </Reveal3D>
          </div>
        </div>
      </section>

      {/* ───────── LOCATION · paper ───────── */}
      <div className="bg-(--cream)">
        <Arcade />
      </div>
      <section id="location" className="relative -mt-px scroll-mt-20 bg-(--paper)">
        <Paper />
        <style dangerouslySetInnerHTML={{ __html: hoverCss }} />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="loc-explorer">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Title title="Close to the port and the coast." sub="Location" />
              </div>
              <Reveal3D variant="flipRight" className="lg:col-span-5">
                <p className="text-sm leading-relaxed text-(--navy)/75 md:text-base">
                  Supermarkets, a pharmacy, schools, the metro and the Port of
                  Piraeus are all close by. Hover or tap a place to find it on
                  the map.
                </p>
              </Reveal3D>
            </div>

            {/* map plate */}
            <div className="mt-14">
              <Depth axis="y" rotate={-6} lift={70}>
                <div className="relative">
                  {/* offset brass outline behind */}
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

                    {/* plate header */}
                    <div className="relative mb-4 flex items-center justify-center gap-4 md:mb-5">
                      <span className="h-px w-10 bg-(--gold)/60 md:w-20" />
                      <span className="font-serif text-[10px] font-semibold uppercase tracking-[0.4em] text-(--navy) md:text-xs">
                        Carte du port
                      </span>
                      <span className="h-px w-10 bg-(--gold)/60 md:w-20" />
                    </div>

                    {/* map */}
                    <div className="relative aspect-[1189/438] w-full overflow-hidden ring-1 ring-(--gold)/50">
                      <Image
                        src={img("drapetsona-map")}
                        alt="Aerial map of Drapetsona showing the property location, Piraeus Port, supermarkets, a pharmacy, a school, the railway station and the Lipasmata park"
                        fill
                        sizes="(min-width:1024px) 1100px, 95vw"
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
                          className="pointer-events-none absolute z-10 aspect-square w-[6%] -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full border-2 border-(--gold-light) opacity-0 transition duration-300"
                        >
                          <span className="absolute inset-0 animate-ping rounded-full bg-(--gold-light)/50" />
                        </span>
                      ))}
                    </div>

                    {/* plate caption */}
                    <div className="relative mt-4 flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark) md:mt-5 md:text-[10px]">
                      <span className="h-px w-8 bg-(--gold)/60 md:w-14" />
                      <span className="font-serif italic normal-case tracking-[0.15em]">
                        Drapetsona
                      </span>
                      <span className="h-px w-8 bg-(--gold)/60 md:w-14" />
                    </div>
                  </div>
                </div>
              </Depth>
            </div>

            {/* places list, two columns under the map */}
            <Reveal3D variant="rise" delay={150}>
              <ul className="mt-14 grid border-t border-(--gold)/40 md:grid-cols-2 md:gap-x-12">
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
        </div>
      </section>

      {/* ───────── DISCOVER DRAPETSONA · cream ───────── */}
      <section className="relative bg-(--cream)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal3D variant="rise" className="lg:col-span-6">
              <Plate
                src={img("drapetsona-cover")}
                alt="The building in Drapetsona with a timber and stone facade and a lit ground-floor entrance"
                caption="Drapetsona"
                aspect="aspect-[4/3]"
                sizes="(min-width:1024px) 540px, 95vw"
              />
            </Reveal3D>
            <Reveal3D variant="rise" delay={150} className="lg:col-span-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
                Discover Drapetsona
              </p>
              <h3 className="font-serif text-2xl font-bold uppercase leading-tight tracking-tight text-(--navy) md:text-3xl">
                Contemporary living close to Piraeus Port and the Athenian coastline
              </h3>
              <span className="mb-6 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
              <div className="space-y-4 text-sm leading-relaxed text-(--navy)/75 [&_strong]:font-semibold [&_strong]:text-(--navy)">
                {discoverParas.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </Reveal3D>
          </div>
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
            <Sails className="absolute inset-x-6 top-3 opacity-60" color="%23e2b862" />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-light)">
              Aurevon Global Partners
            </p>
            <h2 className="mx-auto mt-5 max-w-xl font-serif text-3xl font-bold uppercase leading-tight md:text-5xl">
              <Words text="Interested in Drapetsona?" className="block" />
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              Two 1-bedroom first-floor apartments, 57 m² at €290,000 and 62 m²
              at €295,000, both Golden Visa eligible. Contact us to arrange a
              viewing.
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110"
            >
              Arrange a viewing
            </Link>
            <Sails className="absolute inset-x-6 bottom-3 opacity-60" color="%23e2b862" />
          </div>
        </Depth>
      </section>
    </main>
  );
}