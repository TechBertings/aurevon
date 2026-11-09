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
  title: "1-Bedroom Apartment in Areios Pagos, Athens | Aurevon Global Partners",
  description:
    "A 54.2 m² double-height loft apartment in Areios Pagos, Athens, Golden Visa eligible, 3 minutes on foot from Evangelismos metro.",
};

/* EDIT HERE: palette. Same variable names as the other pages (RoomBook depends on them),
   same navy and gold palette as the Porto Rafti page. */
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
  <div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-multiply" style={grain} />
);

const glow = (pos: string, a = 0.22): CSSProperties => ({
  backgroundImage: `radial-gradient(55% 60% at ${pos}, rgba(226,184,98,${a}), transparent 70%)`,
});

/* ───────── IMAGES ─────────
   Put all files in public/images/ (.png)
     areios-pagos-cover   the single hero image (portrait ~3:4, use a text-free crop of the brochure cover)
     areios-living        living room, grey sofa, view to the stair
     areios-double-height double-height room with the ring light
     areios-from-above    view down from the loft to the glass facade
     areios-kitchen-1     kitchen with fridge and oak worktop
     areios-kitchen-2     kitchen, wave-textured oak splashback
     areios-stair         kitchen, spiral stair and bathroom door
     areios-bedroom       the loft bedroom
     areios-bathroom      shower, wall-hung toilet, oak vanity
     areios-map           the Areios Pagos location map (crop to the map only, no title)
   Image 1 (cover, text baked in) and image 5 (near-duplicate of the living room) are not used. */
const FOLDER = "/images";
const EXT = "png";
const img = (n: string) => `${FOLDER}/${n}.${EXT}`;

const rooms = [
  { id: "living", group: "Living", title: "The living room", text: "Large-format porcelain floors, a grey sofa and a spiral staircase leading up to the loft.", src: img("areios-living"), alt: "Living area with grey sofa, kitchen and spiral staircase" },
  { id: "double-height", group: "Living", title: "Double-height space", text: "A mezzanine with glass balustrade overlooks the living room under a sculptural ring light.", src: img("areios-double-height"), alt: "Double-height living room with ring light and mezzanine" },
  { id: "from-above", group: "Living", title: "From the loft", text: "A full-height glazed facade fills the apartment with soft light.", src: img("areios-from-above"), alt: "View from the loft down to the living area and glazed facade" },
  { id: "kitchen-1", group: "Kitchen", title: "The kitchen", text: "White cabinetry, an oak breakfast bar, a ceramic hob and a full-height fridge.", src: img("areios-kitchen-1"), alt: "Kitchen with oak worktop and induction hob" },
  { id: "kitchen-2", group: "Kitchen", title: "Oak and light", text: "A wave-textured oak splashback lit from above, with a black sink and tap.", src: img("areios-kitchen-2"), alt: "Kitchen with textured oak splashback and breakfast bar" },
  { id: "stair", group: "Loft & bath", title: "The spiral stair", text: "A black steel spiral staircase rises beside the bathroom door.", src: img("areios-stair"), alt: "Spiral staircase beside the bathroom door and kitchen" },
  { id: "bedroom", group: "Loft & bath", title: "The loft bedroom", text: "A sleeping mezzanine with a tall window and a glass balustrade over the living room.", src: img("areios-bedroom"), alt: "Loft bedroom with white bed and tall window" },
  { id: "bathroom", group: "Loft & bath", title: "Bathroom", text: "Marble-effect tiles, a glass shower enclosure, a wall-hung toilet and an oak vanity.", src: img("areios-bathroom"), alt: "Bathroom with glass shower and oak vanity" },
];

const chapters = [
  { range: "I – III", label: "Living" },
  { range: "IV – V", label: "Kitchen" },
  { range: "VI – VIII", label: "Loft & bath" },
];

const stats: { n?: number; text?: string; label: string }[] = [
  { text: "54.2", label: "m² interior" },
  { n: 1, label: "Bedroom" },
  { n: 1, label: "Bathroom" },
];

/* ───────── Icons (line style) ───────── */
type IconType = ComponentType<{ className?: string }>;
const icon = (paths: ReactNode): IconType => {
  const I: IconType = ({ className = "h-6 w-6" }) => (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {paths}
    </svg>
  );
  return I;
};

const VisaIcon = icon(<><rect x="4" y="3.5" width="16" height="17" rx="1.5" /><circle cx="12" cy="10" r="3" /><path d="M8 16.5h8" /></>);
const StairIcon = icon(<><path d="M4 20h4v-4h4v-4h4V8h4" /></>);
const TheatreIcon = icon(<><path d="M5 5h14v7a7 7 0 0 1-14 0z" /><path d="M9 10h.01M15 10h.01M9.5 14.5c1.5 1.2 3.5 1.2 5 0" /></>);
const MetroIcon = icon(<><rect x="5" y="3.5" width="14" height="13" rx="3" /><path d="M5 11h14M9 20l1.5-3.5M15 20l-1.5-3.5" /><circle cx="9" cy="14" r=".6" /><circle cx="15" cy="14" r=".6" /></>);
const CoinsIcon = icon(<><ellipse cx="12" cy="6" rx="6" ry="2.5" /><path d="M6 6v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6" /><path d="M6 10v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" /><path d="M6 14v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" /></>);
const PlanIcon = icon(<><path d="M4 4h16v16H4z" /><path d="M4 12h8V4M12 16h8" /></>);
const BedIcon = icon(<><path d="M3 18V7M3 14h18v4M21 14v-3a3 3 0 0 0-3-3h-7v6" /><circle cx="7" cy="11" r="1.5" /></>);
const BathIcon = icon(<><path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" /><path d="M7 12V6a2 2 0 0 1 3.5-1.3M7 19l-1 2M17 19l1 2" /></>);
const FloorIcon = icon(<><path d="M3 8l9-4 9 4-9 4z" /><path d="M3 12l9 4 9-4" /><path d="M3 16l9 4 9-4" /></>);
const BeamIcon = icon(<><path d="M3 7h18M3 12h18M3 17h18" /><path d="M7 5v14M17 5v14" /></>);
const ShelfIcon = icon(<><path d="M4 4h16v16H4z" /><path d="M4 9h16M4 14h16M12 4v16" /></>);
const TileIcon = icon(<><rect x="4" y="4" width="7" height="7" /><rect x="13" y="13" width="7" height="7" /><path d="M13 4h7v7h-7zM4 13h7v7H4z" opacity=".5" /></>);
const LeafIcon = icon(<><path d="M5 19c0-8 5-14 14-14 0 9-6 14-14 14z" /><path d="M5 19l8-8" /></>);
const HillIcon = icon(<><path d="M2 19l7-11 4 6 3-4 6 9z" /></>);
const ColumnIcon = icon(<><path d="M3.5 9L12 4l8.5 5z" /><path d="M6 11v7M10 11v7M14 11v7M18 11v7" /><path d="M4 20h16" /></>);
const CafeIcon = icon(<><path d="M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" /><path d="M16 9h2a2 2 0 0 1 0 4h-2M8 3v2M12 3v2" /></>);

const highlights: { Icon: IconType; value: string; label: string }[] = [
  { Icon: VisaIcon, value: "Eligible", label: "Golden Visa" },
  { Icon: PlanIcon, value: "54.2 m²", label: "Double-height loft" },
  { Icon: CoinsIcon, value: "€250,000", label: "Price" },
];

const specs: { Icon: IconType; text: string }[] = [
  { Icon: PlanIcon, text: "54.2 m² apartment" },
  { Icon: BedIcon, text: "1 bedroom on the loft mezzanine" },
  { Icon: BathIcon, text: "1 bathroom" },
  { Icon: StairIcon, text: "Spiral staircase to the loft" },
  { Icon: VisaIcon, text: "Golden Visa eligible" },
];

/* only what is visible in the photos */
const finishes: { Icon: IconType; text: string }[] = [
  { Icon: FloorIcon, text: "Large-format grey porcelain floors" },
  { Icon: BeamIcon, text: "Oak worktop and wave-textured splashback" },
  { Icon: StairIcon, text: "Black steel spiral staircase, glass balustrade" },
  { Icon: TileIcon, text: "Marble-effect bathroom tiles, black fittings" },
  { Icon: ShelfIcon, text: "Full-height glazing and integrated LED lighting" },
];

/* x / y = where each ring sits on the map image, in %. The map is the brochure picture cropped to the square (no title). Nudge if a ring looks off. */
const keyPlaces: { id: string; name: string; time: string; x: number; y: number }[] = [
  { id: "metro", name: "Evangelismos Metro", time: "3 min walk", x: 17, y: 67 },
  { id: "hill", name: "Likavitos Hill", time: "5 min walk", x: 45, y: 13 },
  { id: "pedion", name: "Pedion tou Areos", time: "5 min walk", x: 86, y: 66 },
  { id: "concert", name: "Athens Concert Hall", time: "6 min walk", x: 17, y: 51 },
  { id: "garden", name: "National Garden", time: "4 min drive", x: 86, y: 90 },
  { id: "pangrati", name: "Pangrati", time: "6 min drive", x: 17, y: 90 },
  { id: "kolonaki", name: "Kolonaki", time: "8 min taxi", x: 17, y: 31 },
  { id: "acropolis", name: "Acropolis", time: "12 min drive", x: 86, y: 15 },
];

const hoverCss = keyPlaces
  .map((p) => `.loc-explorer:has([data-place=${p.id}]:is(:hover,:focus)) [data-pin=${p.id}]{opacity:1;scale:1}`)
  .join("\n");

const connections: { Icon: IconType; label: string; text: string }[] = [
  { Icon: MetroIcon, label: "Metro", text: "Evangelismos, 3 min on foot, with links to the city and airport." },
  { Icon: HillIcon, label: "Parks & views", text: "Likavitos Hill and Pedion tou Areos, 5 min on foot." },
  { Icon: TheatreIcon, label: "Culture", text: "Athens Concert Hall, 6 min on foot." },
  { Icon: ColumnIcon, label: "Historic Athens", text: "The Acropolis, 12 min by car." },
];

const onFoot: { label: string; text: string }[] = [
  { label: "Evangelismos Metro · 3 min", text: "Immediate connectivity to the city and the airport." },
  { label: "Likavitos Hill · 5 min", text: "Iconic panoramic city views and fine dining." },
  { label: "Pedion tou Areos · 5 min", text: "An extensive urban park with an open-air theatre." },
  { label: "Athens Concert Hall · 6 min", text: "World-class performances and cultural events." },
];

const byCar: { label: string; text: string }[] = [
  { label: "National Garden · 4 min drive", text: "A lush city oasis with an antiquities collection." },
  { label: "Pangrati · 6 min drive", text: "Authentic local dining and a lively social scene." },
  { label: "Kolonaki · 8 min taxi", text: "Premium shopping and boutiques." },
  { label: "Acropolis · 12 min drive", text: "A World Heritage landmark and the historical heart of Athens." },
];

const neighbourhoodGroups = [
  { id: "foot", tab: "On foot", items: onFoot },
  { id: "car", tab: "By car or taxi", items: byCar },
];

/* ───────── Shared pieces ───────── */
const Tag = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span className={`inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-md ${className}`}>
    {children}
  </span>
);

/* Colonnade divider: a row of slim columns under a gold rule (Areios Pagos sits below the Acropolis) */
const colBg: CSSProperties = {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='22'><rect x='5' y='3' width='4' height='19' fill='%23e2b862'/><rect x='3' y='0' width='8' height='3' fill='%23e2b862'/></svg>")`,
  backgroundRepeat: "repeat-x",
};
function Colonnade({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`h-[22px] w-full opacity-80 ${className}`} style={colBg} />;
}

function Title({ title, sub, dark = false, center = false }: { title: string; sub?: string; dark?: boolean; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className={`font-serif text-3xl font-bold uppercase leading-[1.1] tracking-tight md:text-5xl ${dark ? "text-white" : "text-(--navy)"}`}>
        <Words text={title} className="block" />
      </h2>
      {sub && (
        <p className={`mt-3 text-xs font-medium uppercase tracking-[0.25em] md:text-sm ${dark ? "text-(--gold-light)" : "text-(--navy)/70"}`}>
          {sub}
        </p>
      )}
      <span className={`mt-5 block h-0.5 w-16 bg-linear-to-r from-(--gold) to-(--gold-light) ${center ? "mx-auto" : ""}`} />
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

/* Brass-framed plate (map and photos) */
function Plate({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-(--gold)/50 md:translate-x-4 md:translate-y-4" />
      <div className="relative border border-(--gold)/60 bg-white p-3 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-5">
        <div aria-hidden className="pointer-events-none absolute inset-2 border border-(--gold)/40 md:inset-2.5" />
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

const layer = (mx: number, my: number, sy: number, z: number, ry: number): CSSProperties => ({
  transform: `translate3d(calc(var(--mx,0) * ${mx}px), calc(var(--my,0) * ${my}px + var(--sy,0) * ${sy}px), ${z}px) rotateY(calc(var(--mx,0) * ${ry}deg)) rotateX(calc(var(--sy,0) * 8deg))`,
  transition: "transform 350ms ease-out",
  willChange: "transform",
});

export default function AreiosPagosApartmentPage() {
  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      <S3Styles />
      <ScrollBar />

      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-(--sky) via-[#f6efe0] to-[#f4d9a8] pt-32 md:pt-40">
        <div aria-hidden className="absolute inset-0" style={glow("85% 85%", 0.4)} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 md:pb-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal3D variant="flipRight">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--navy)/70">Areios Pagos, Athens</p>
            </Reveal3D>
            <h1 className="mt-6 font-serif text-5xl font-bold uppercase leading-[1.02] tracking-tight md:text-6xl">
              <Words text="Areios Pagos" className="block" />
              <Words
                text="Apartment"
                className="block"
                delay={300}
                wordClass="bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-transparent"
              />
            </h1>
            <Reveal3D variant="rise" delay={500}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-(--navy)/80">
                A 54.2 m² double-height loft with one bedroom and one bathroom,
                3 minutes on foot from Evangelismos metro.
              </p>
              <div className="mt-8 flex flex-wrap items-end gap-x-5 gap-y-3 border-t border-(--gold)/40 pt-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">Price</p>
                  <p className="mt-1 font-serif text-4xl font-bold leading-none text-(--navy) md:text-5xl">€250,000</p>
                </div>
                <Tag className="mb-1">Golden Visa eligible</Tag>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center bg-(--navy) px-8 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:bg-(--gold-dark) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--gold)"
                >
                  Arrange a viewing
                </Link>
                <a
                  href="#rooms"
                  className="inline-flex h-12 items-center justify-center border border-(--navy)/40 px-8 text-xs font-semibold uppercase tracking-[0.15em] text-(--navy) transition hover:border-(--gold) hover:text-(--gold-dark) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--gold)"
                >
                  Tour the apartment
                </a>
              </div>
            </Reveal3D>
          </div>

          <HeroStage className="relative lg:col-span-7">
            {/* ONE cover image in an arched frame (a nod to the classical arches of the Acropolis) */}
            <div className="relative mx-auto w-full max-w-sm md:max-w-md" style={layer(-6, 4, -40, 60, -3)}>
              <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full border border-(--gold)/70 md:translate-x-6 md:translate-y-6" />
              <div aria-hidden className="absolute inset-0 -translate-x-3 -translate-y-3 rounded-t-full border border-(--gold)/40 md:-translate-x-4 md:-translate-y-4" />
              <Reveal3D variant="zoom" delay={300} duration={1300}>
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-full shadow-[0_40px_60px_-20px_rgba(16,35,94,0.5)]">
                  <Image
                    src={img("areios-pagos-cover")}
                    alt="Double-height living space of the Areios Pagos apartment with ring light and spiral staircase"
                    fill
                    priority
                    sizes="(min-width:768px) 448px, 90vw"
                    className="object-cover object-center"
                  />
                  <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(16,35,94,0.25)]" />
                </div>
              </Reveal3D>
              <div style={layer(-6, -4, -100, 140, 0)} className="absolute -left-2 bottom-12 z-20 md:-left-8">
                <div className="bg-linear-to-b from-(--gold-light) to-(--gold) px-4 py-3 text-center text-white shadow-xl">
                  <p className="font-serif text-2xl font-bold leading-none md:text-3xl">54.2</p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.25em]">m²</p>
                </div>
              </div>
            </div>
          </HeroStage>
        </div>
        <Colonnade className="relative" />
      </section>

      {/* ───────── STATS ───────── */}
      <section className="bg-(--navy)">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-(--gold)/30 px-6">
          {stats.map((s, i) => (
            <Reveal3D key={s.label} variant="flipCard" delay={i * 140} className="px-4 py-8 text-center md:px-8">
              <dd className="font-serif text-4xl font-bold text-(--gold-light) md:text-5xl">
                {s.n !== undefined ? <Counter to={s.n} /> : s.text}
              </dd>
              <dt className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/80 md:text-[11px]">{s.label}</dt>
            </Reveal3D>
          ))}
        </dl>
      </section>

      {/* ───────── PROPERTY FEATURES ───────── */}
      <section className="relative bg-(--cream)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">Property features</p>
              <Title title="Areios Pagos" sub="A loft beneath the Acropolis" />
            </div>
            <Reveal3D variant="flipRight" className="lg:col-span-5">
              <p className="leading-relaxed text-(--navy)/75">
                Full-height glazing, warm oak and a black spiral staircase give
                this compact apartment a generous double-height living space,
                with the bedroom on the mezzanine above.
              </p>
            </Reveal3D>
          </div>

          <div className="mt-14 grid grid-cols-1 divide-y divide-(--gold)/30 border border-(--gold)/40 bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {highlights.map(({ Icon, value, label }, i) => (
              <Reveal3D key={label} variant="flipCard" delay={i * 100} className="flex flex-col items-center px-6 py-8 text-center">
                <Icon className="h-9 w-9 text-(--gold-dark)" />
                <p className="mt-4 font-serif text-3xl font-bold text-(--navy)">{value}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">{label}</p>
              </Reveal3D>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Reveal3D variant="flipLeft">
              <div className="h-full border border-(--gold)/40 bg-white p-8">
                <h3 className="font-serif text-xl font-bold uppercase tracking-wide">Property specifications</h3>
                <span className="mb-7 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                <IconList items={specs} />
              </div>
            </Reveal3D>
            <Reveal3D variant="flipRight">
              <div className="h-full border border-(--gold)/40 bg-white p-8">
                <h3 className="font-serif text-xl font-bold uppercase tracking-wide">Materials & finishes</h3>
                <span className="mb-7 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                <IconList items={finishes} />
              </div>
            </Reveal3D>
          </div>
        </div>
      </section>

      {/* ───────── ROOMS · flipping book ───────── */}
      <div className="bg-(--navy)">
        <Colonnade />
      </div>
      <section id="rooms" className="relative -mt-px scroll-mt-20 overflow-hidden bg-(--navy-deep) px-6 py-16 md:py-24">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "linear-gradient(180deg, var(--navy) 0%, rgba(10,23,64,0) 16%, rgba(10,23,64,0) 84%, var(--navy) 100%)",
              "radial-gradient(70% 38% at 50% 24%, rgba(29,125,181,0.55), transparent 72%)",
              "radial-gradient(75% 42% at 50% 62%, rgba(226,184,98,0.45), transparent 72%)",
            ].join(","),
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Title title="Walk through the apartment." sub="Flip through eight views" dark center />
          <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-3 divide-x divide-(--gold)/30 border-y border-(--gold)/30 text-center">
            {chapters.map((c) => (
              <li key={c.label} className="px-2 py-4">
                <span className="block font-serif text-xs tracking-[0.3em] text-(--gold-light)">{c.range}</span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-white/70">{c.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <RoomBook pages={rooms} />
          </div>
        </div>
      </section>
      <div className="bg-(--navy)">
        <Colonnade />
      </div>

      {/* ───────── LOCATION ───────── */}
      <section id="location" className="relative -mt-px scroll-mt-20 bg-(--cream)">
        <Paper />
        <style dangerouslySetInnerHTML={{ __html: hoverCss }} />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="loc-explorer grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <Title title="Areios Pagos, central and connected." sub="Location" />
              <Reveal3D variant="rise" delay={150}>
                <p className="mt-8 max-w-sm text-sm leading-relaxed text-(--navy)/75">
                  The metro, Likavitos Hill and the city's parks are within a
                  short walk. Hover or tap a place to find it on the map.
                </p>
                <ul className="mt-6 border-t border-(--gold)/40">
                  {keyPlaces.map(({ id, name, time }) => (
                    <li
                      key={id}
                      data-place={id}
                      tabIndex={0}
                      className="group relative flex cursor-pointer items-baseline gap-3 border-b border-(--gold)/20 py-3 text-sm text-(--navy)/85 outline-none transition-all duration-300 hover:bg-(--gold)/10 hover:pl-4 hover:text-(--navy) focus:bg-(--gold)/10 focus:pl-4 focus:text-(--navy)"
                    >
                      <span aria-hidden className="absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 bg-(--gold) transition-all duration-300 group-hover:h-6 group-focus:h-6" />
                      <span>{name}</span>
                      <span aria-hidden className="min-w-4 flex-1 -translate-y-1 border-b border-dotted border-(--gold)/60" />
                      <span className="whitespace-nowrap font-serif font-bold text-(--navy)">{time}</span>
                    </li>
                  ))}
                </ul>
              </Reveal3D>
            </div>

            <div className="lg:col-span-6">
              <Depth axis="y" rotate={-8} lift={90}>
                <Plate caption="Areios Pagos">
                  <div className="relative mx-auto aspect-square w-full overflow-hidden bg-(--paper) ring-1 ring-(--gold)/50">
                    <Image
                      src={img("areios-map")}
                      alt="Aerial map of Areios Pagos with walking and driving times to Evangelismos metro, Likavitos Hill, the Acropolis and nearby parks"
                      fill
                      sizes="(min-width:1024px) 45vw, 95vw"
                      className="object-contain"
                    />
                    {keyPlaces.map(({ id, x, y }) => (
                      <span
                        key={id}
                        data-pin={id}
                        aria-hidden
                        style={{ left: `${x}%`, top: `${y}%` }}
                        className="pointer-events-none absolute z-10 aspect-square w-[14%] -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full border-2 border-(--gold-light) opacity-0 transition duration-300"
                      >
                        <span className="absolute inset-0 animate-ping rounded-full bg-(--gold-light)/50" />
                      </span>
                    ))}
                  </div>
                </Plate>
              </Depth>
            </div>
          </div>

          <p className="mb-6 mt-20 text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark) md:mt-24">
            Metro, parks, culture, history
          </p>
          <Reveal3D variant="rise">
            <ul className="grid grid-cols-1 divide-y divide-(--gold)/30 border-y border-(--gold)/50 md:grid-cols-4 md:divide-x md:divide-y-0">
              {connections.map(({ Icon, label, text }) => (
                <li key={label} className="group flex flex-col items-center px-6 py-10 text-center">
                  <Icon className="h-9 w-9 text-(--navy) transition duration-500 group-hover:-translate-y-1 group-hover:text-(--gold-dark)" />
                  <span className="mt-5 block h-px w-8 bg-(--gold)/60" />
                  <span className="mt-5 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-(--navy)">{label}</span>
                  <span className="mt-2 max-w-[11rem] text-xs leading-relaxed text-(--navy)/65">{text}</span>
                </li>
              ))}
            </ul>
          </Reveal3D>
        </div>
      </section>

      {/* ───────── NEARBY · tabs ───────── */}
      <section className="relative bg-(--paper)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="max-w-xl">
            <Title title="Everything within reach." sub="Around the apartment" />
            <Reveal3D variant="rise" delay={150}>
              <p className="mt-8 text-sm leading-relaxed text-(--navy)/75">
                Parks, music, markets and the historic centre, split by how you
                get there.
              </p>
            </Reveal3D>
          </div>
          <div className="mt-14">
            <Reveal3D variant="rise">
              <NeighbourhoodTabs groups={neighbourhoodGroups} />
            </Reveal3D>
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <div className="bg-(--navy)">
        <Colonnade />
      </div>
      <section className="relative -mt-px overflow-hidden bg-(--navy) px-6 pb-24 pt-10 text-white md:pb-32" style={glow("50% 0%", 0.25)}>
        <Depth rotate={12} lift={120}>
          <div className="relative mx-auto max-w-4xl border border-(--gold)/60 p-10 text-center md:p-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-light)">Aurevon Global Partners</p>
            <h2 className="mx-auto mt-5 max-w-xl font-serif text-3xl font-bold uppercase leading-tight md:text-5xl">
              <Words text="Interested in the Areios Pagos apartment?" className="block" />
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              A 54.2 m² loft with one bedroom and one bathroom, Golden Visa
              eligible, at €250,000. Contact us to arrange a viewing.
            </p>
            <Link href="/contact" className="mt-9 inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110">
              Arrange a viewing
            </Link>
          </div>
        </Depth>
      </section>
    </main>
  );
}