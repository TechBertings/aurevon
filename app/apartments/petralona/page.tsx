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
  title: "2-Bedroom Apartment in Petralona, Athens | Aurevon Global Partners",
  description:
    "An 81 m² ground floor apartment with two bedrooms and two bathrooms in Petralona, Athens, beside the metro and a short walk from the historic centre.",
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

/* Checker band: echoes the black-and-white tiled terrace floor (replaces the waves of Porto Rafti) */
const checkerBg = (color: string): CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><rect width='8' height='8' fill='${color}'/><rect x='8' y='8' width='8' height='8' fill='${color}'/></svg>")`,
  backgroundRepeat: "repeat-x",
});
const Checker = ({ className = "", color = "%23b9791f" }: { className?: string; color?: string }) => (
  <div aria-hidden className={`h-4 ${className}`} style={checkerBg(color)} />
);

/* ───────── IMAGES ─────────
   Put all files in public/images/
     petralona-living.png     (image 2)  living room, green sofa by the window
     petralona-kitchen.png    (image 3)  kitchen, black fridge, oak cabinets
     petralona-dining.png     (image 4)  dining + shelving + TV wall
     petralona-bathroom.png   (image 5)  bathroom, green tiles
     petralona-bedroom-1.png  (image 6)  bedroom, pink wall
     petralona-bedroom-2.png  (image 7)  bedroom, dark wall
     petralona-terrace.png    (image 8)  terrace, checker floor, green wall
     petralona-map.png        (image 9)  the Petralona map
   Image 1 (cover with baked-in text) and image 10 (brochure location board) are not used. */
const FOLDER = "/images";
const EXT = "png";
const img = (n: string) => `${FOLDER}/${n}.${EXT}`;

const rooms = [
  { id: "living", group: "Living", title: "The living room", text: "A deep green corner sofa, stone-tone flooring and a window onto the garden.", src: img("petralona-living"), alt: "Living room with green corner sofa and wooden coffee table" },
  { id: "kitchen", group: "Living", title: "The kitchen", text: "Oak and olive cabinetry, a built-in oven and an open peninsula for casual dining.", src: img("petralona-kitchen"), alt: "Open kitchen with oak cabinets, black appliances and a stone peninsula" },
  { id: "dining", group: "Living", title: "Dining and shelving", text: "A dining table beside built-in shelving and a long olive sideboard under the TV.", src: img("petralona-dining"), alt: "Dining area with built-in shelves and a wall-mounted TV" },
  { id: "bathroom", group: "Bathrooms & bedrooms", title: "Bathroom", text: "Ribbed green tiles, a walk-in shower with oak niches and black fittings.", src: img("petralona-bathroom"), alt: "Bathroom with green tiled shower, vessel basin and oak vanity" },
  { id: "bedroom-1", group: "Bathrooms & bedrooms", title: "First bedroom", text: "A timber headboard with integrated shelf and a warm reading light.", src: img("petralona-bedroom-1"), alt: "Bedroom with timber headboard and wall light" },
  { id: "bedroom-2", group: "Bathrooms & bedrooms", title: "Second bedroom", text: "A calm, dark-toned room with an upholstered headboard and pendant lights.", src: img("petralona-bedroom-2"), alt: "Bedroom with upholstered headboard and pendant lights" },
  { id: "terrace", group: "Outdoors", title: "The terrace", text: "A timber-slatted wall, a living green wall and a chequered tile floor.", src: img("petralona-terrace"), alt: "Terrace with rattan sofa, green wall and chequered tile floor" },
];

const chapters = [
  { range: "I – III", label: "Living" },
  { range: "IV – VI", label: "Baths & bedrooms" },
  { range: "VII", label: "Outdoors" },
];

const stats = [
  { n: 81, label: "m² interior" },
  { n: 2, label: "Bedrooms" },
  { n: 2, label: "Bathrooms" },
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
  { Icon: MetroIcon, value: "Line 1", label: "Petralona metro" },
  { Icon: PlanIcon, value: "81 m²", label: "Ground floor apartment" },
  { Icon: CoinsIcon, value: "€330,000", label: "Price" },
];

const specs: { Icon: IconType; text: string }[] = [
  { Icon: PlanIcon, text: "81 m² ground floor apartment" },
  { Icon: BedIcon, text: "2 bedrooms" },
  { Icon: BathIcon, text: "2 bathrooms" },
  { Icon: LeafIcon, text: "Private terrace with green wall" },
  { Icon: MetroIcon, text: "Petralona metro station nearby" },
];

/* only what is visible in the renders */
const finishes: { Icon: IconType; text: string }[] = [
  { Icon: FloorIcon, text: "Large-format stone-tone floor tiles" },
  { Icon: BeamIcon, text: "Oak joinery with olive-green cabinetry" },
  { Icon: TileIcon, text: "Ribbed green wall tiles and black fittings" },
  { Icon: ShelfIcon, text: "Built-in shelving and TV wall unit" },
  { Icon: LeafIcon, text: "Timber-slatted terrace wall, chequered floor" },
];

/* x / y = where each ring sits on the map image, in %. Nudge them if a ring looks slightly off. */
const keyPlaces: { id: string; name: string; tag: string; x: number; y: number }[] = [
  { id: "metro", name: "Petralona Metro", tag: "Line 1", x: 50, y: 47 },
  { id: "merkouri", name: "Merkouri Square", tag: "Neighbourhood life", x: 38, y: 33 },
  { id: "hill", name: "Philopappos Hill", tag: "Green space", x: 14, y: 54 },
  { id: "gazi", name: "Technopolis / Gazi", tag: "Culture", x: 66, y: 25 },
  { id: "agora", name: "Ancient Agora", tag: "Historic Athens", x: 87, y: 44 },
];

const hoverCss = keyPlaces
  .map((p) => `.loc-explorer:has([data-place=${p.id}]:is(:hover,:focus)) [data-pin=${p.id}]{opacity:1;scale:1}`)
  .join("\n");

const connections: { Icon: IconType; label: string; text: string }[] = [
  { Icon: MetroIcon, label: "Metro", text: "Petralona station, Line 1." },
  { Icon: HillIcon, label: "Green space", text: "Philopappos Hill for walks and recreation." },
  { Icon: CafeIcon, label: "Culture", text: "Technopolis and Kerameikos." },
  { Icon: ColumnIcon, label: "Historic Athens", text: "Thissio, the Acropolis and the Ancient Agora." },
];

const everyday: { label: string; text: string }[] = [
  { label: "Ano Petralona", text: "Residential streets, neighbourhood squares and a relaxed local atmosphere." },
  { label: "Kato Petralona", text: "An urban character with convenient connections to surrounding central districts." },
  { label: "Local cafés & dining", text: "Independent cafés, traditional tavernas, contemporary restaurants and neighbourhood meeting places." },
  { label: "Markets & shops", text: "Everyday services and independent businesses woven into the neighbourhood." },
  { label: "Residential character", text: "A mixture of traditional Athenian homes and apartment buildings." },
  { label: "Pedestrian-friendly streets", text: "Intimate urban routes connecting residential areas, cafés and local squares." },
];

const culture: { label: string; text: string }[] = [
  { label: "Philopappos Hill", text: "Green space and recreation close to home." },
  { label: "Technopolis / Gazi", text: "Culture and entertainment in the former gasworks district." },
  { label: "Kerameikos", text: "History and culture, one stop away on the metro." },
  { label: "Thissio", text: "Historic Athens, within easy reach of the neighbourhood." },
  { label: "Acropolis & Ancient Agora", text: "The city's most recognisable landmarks, close to the neighbourhood." },
  { label: "National Observatory", text: "One of the area's cultural landmarks, on the hill to the west." },
];

const neighbourhoodGroups = [
  { id: "everyday", tab: "Everyday life", items: everyday },
  { id: "culture", tab: "Culture nearby", items: culture },
];

/* ───────── Shared pieces ───────── */
const Tag = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span className={`inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-md ${className}`}>
    {children}
  </span>
);

/* Metro line divider: a straight rail with station dots (replaces the waves) */
function MetroLine({ onDark = false }: { onDark?: boolean }) {
  return (
    <div aria-hidden className={`relative h-10 w-full md:h-14 ${onDark ? "bg-(--navy)" : ""}`}>
      <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-(--gold-light)" />
      {[12, 34, 56, 78].map((l) => (
        <span
          key={l}
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-(--gold-light) bg-(--navy)"
          style={{ left: `${l}%` }}
        />
      ))}
    </div>
  );
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

export default function PetralonaApartmentPage() {
  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      <S3Styles />
      <ScrollBar />

      {/* ───────── HERO · text left, two staggered photos right ───────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-(--sky) via-[#f6efe0] to-[#f4d9a8] pt-32 md:pt-40">
        <div aria-hidden className="absolute inset-0" style={glow("85% 85%", 0.4)} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 md:pb-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal3D variant="flipRight">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--navy)/70">
                Petralona, Athens
              </p>
            </Reveal3D>
            <h1 className="mt-6 font-serif text-5xl font-bold uppercase leading-[1.02] tracking-tight md:text-6xl">
              <Words text="2-Bedroom" className="block" />
              <Words text="Apartment in" className="block" delay={200} />
              <Words
                text="Petralona"
                className="block"
                delay={400}
                wordClass="bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-transparent"
              />
            </h1>
            <Reveal3D variant="rise" delay={500}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-(--navy)/80">
                An 81 m² ground floor apartment with two bedrooms and two
                bathrooms, beside the metro and close to historic Athens.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Tag>Ground floor</Tag>
                <span className="text-sm font-semibold text-(--navy)">€330,000</span>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/contact" className="bg-(--navy) px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:bg-(--gold-dark)">
                  Arrange a viewing
                </Link>
                <a href="#rooms" className="border border-(--navy)/40 bg-white/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] backdrop-blur transition hover:border-(--gold) hover:text-(--gold-dark)">
                  Tour the apartment
                </a>
              </div>
            </Reveal3D>
          </div>

          <HeroStage className="relative lg:col-span-7">
            <div className="relative mx-auto grid max-w-md grid-cols-2 gap-6 md:max-w-xl md:gap-10">
              {/* terrace, portrait, lower */}
              <div className="relative mt-14 md:mt-24" style={layer(-10, 6, -40, 50, -4)}>
                <div aria-hidden className="absolute inset-0 -translate-x-3 translate-y-3 border border-(--gold)/70 md:-translate-x-5 md:translate-y-5" />
                <Reveal3D variant="zoom" delay={300} duration={1300}>
                  <div className="relative aspect-[3/4] w-full overflow-hidden shadow-[0_28px_36px_-12px_rgba(16,35,94,0.4)]">
                    <Image src={img("petralona-terrace")} alt="Terrace with rattan sofa and living green wall" fill priority sizes="(min-width:768px) 300px, 45vw" className="object-cover" />
                  </div>
                </Reveal3D>
              </div>
              {/* living room, higher */}
              <div className="relative" style={layer(10, -8, -70, 80, 4)}>
                <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 border border-(--gold)/70 md:translate-x-5 md:translate-y-5" />
                <Reveal3D variant="zoom" delay={600} duration={1300}>
                  <div className="relative aspect-[3/4] w-full overflow-hidden shadow-[0_28px_36px_-12px_rgba(16,35,94,0.4)]">
                    <Image src={img("petralona-living")} alt="Living room with green corner sofa" fill priority sizes="(min-width:768px) 300px, 45vw" className="object-cover object-[75%_50%]" />
                  </div>
                </Reveal3D>
              </div>
              <div style={layer(-6, -4, -100, 140, 0)} className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 md:bottom-10">
                <div className="bg-linear-to-b from-(--gold-light) to-(--gold) px-4 py-3 text-center text-white shadow-xl">
                  <p className="font-serif text-2xl font-bold leading-none md:text-3xl">81</p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.25em]">m²</p>
                </div>
              </div>
            </div>
          </HeroStage>
        </div>
        <Checker className="relative opacity-70" />
      </section>

      {/* ───────── STATS ───────── */}
      <section className="bg-(--navy)">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-(--gold)/30 px-6">
          {stats.map((s, i) => (
            <Reveal3D key={s.label} variant="flipCard" delay={i * 140} className="px-4 py-8 text-center md:px-8">
              <dd className="font-serif text-4xl font-bold text-(--gold-light) md:text-5xl">
                <Counter to={s.n} />
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
              <Title title="Petralona" sub="Authentic Athens, exceptionally connected" />
            </div>
            <Reveal3D variant="flipRight" className="lg:col-span-5">
              <p className="leading-relaxed text-(--navy)/75">
                Olive-green joinery, warm oak and stone-tone floors in a
                ground floor apartment with its own terrace, in one of the
                city's most characterful residential neighbourhoods.
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
      <div className="bg-(--cream)">
        <MetroLine onDark />
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
              "radial-gradient(75% 42% at 50% 62%, rgba(226,184,98,0.45), transparent 72%)",
            ].join(","),
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Title title="Walk through the apartment." sub="Flip through seven views" dark center />
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
      <div className="bg-(--cream)">
        <MetroLine onDark />
      </div>

      {/* ───────── LOCATION ───────── */}
      <section id="location" className="relative -mt-px scroll-mt-20 bg-(--cream)">
        <Paper />
        <style dangerouslySetInnerHTML={{ __html: hoverCss }} />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="loc-explorer grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <Title title="Petralona, a metro stop from the Acropolis." sub="Location" />
              <Reveal3D variant="rise" delay={150}>
                <p className="mt-8 max-w-sm text-sm leading-relaxed text-(--navy)/75">
                  Petralona Metro sits right in the neighbourhood, with Philopappos
                  Hill, Technopolis and historic Athens around it. Hover or tap a
                  place to find it on the map.
                </p>
                <ul className="mt-6 border-t border-(--gold)/40">
                  {keyPlaces.map(({ id, name, tag }) => (
                    <li
                      key={id}
                      data-place={id}
                      tabIndex={0}
                      className="group relative flex cursor-pointer items-baseline gap-3 border-b border-(--gold)/20 py-3 text-sm text-(--navy)/85 outline-none transition-all duration-300 hover:bg-(--gold)/10 hover:pl-4 hover:text-(--navy) focus:bg-(--gold)/10 focus:pl-4 focus:text-(--navy)"
                    >
                      <span aria-hidden className="absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 bg-(--gold) transition-all duration-300 group-hover:h-6 group-focus:h-6" />
                      <span>{name}</span>
                      <span aria-hidden className="min-w-4 flex-1 -translate-y-1 border-b border-dotted border-(--gold)/60" />
                      <span className="whitespace-nowrap font-serif text-(--gold-dark)">{tag}</span>
                    </li>
                  ))}
                </ul>
              </Reveal3D>
            </div>

            <div className="lg:col-span-6">
              <Depth axis="y" rotate={-8} lift={90}>
                <Plate caption="Petralona">
                  <div className="relative mx-auto aspect-[497/697] w-full max-w-md overflow-hidden bg-(--paper) ring-1 ring-(--gold)/50">
                    <Image
                      src={img("petralona-map")}
                      alt="Illustrated map of Petralona showing the metro, Philopappos Hill, Kerameikos, Technopolis and the Ancient Agora"
                      fill
                      sizes="(min-width:1024px) 40vw, 95vw"
                      className="object-contain"
                    />
                    {keyPlaces.map(({ id, x, y }) => (
                      <span
                        key={id}
                        data-pin={id}
                        aria-hidden
                        style={{ left: `${x}%`, top: `${y}%` }}
                        className="pointer-events-none absolute z-10 aspect-square w-[16%] -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full border-2 border-(--gold) opacity-0 transition duration-300"
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
            Metro, green space, culture, history
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

      {/* ───────── EVERYDAY LIFE · tabs ───────── */}
      <section className="relative bg-(--paper)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="max-w-xl">
            <Title title="Authentic character, urban culture." sub="Discover Petralona" />
            <Reveal3D variant="rise" delay={150}>
              <p className="mt-8 text-sm leading-relaxed text-(--navy)/75">
                Petralona offers a side of Athens defined by everyday life
                rather than landmarks alone: residential streets, neighbourhood
                cafés and traditional architecture, close to the historic centre.
              </p>
              <p className="mt-8 border-t border-(--gold)/40 pt-6 font-serif text-xl italic leading-snug text-(--gold-dark) md:text-2xl">
                Authentic character. Urban culture. Connected living.
              </p>
            </Reveal3D>
          </div>
          <div className="mt-14 md:mt-20">
            <Reveal3D variant="rise">
              <NeighbourhoodTabs groups={neighbourhoodGroups} />
            </Reveal3D>
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <div className="bg-(--paper)">
        <MetroLine onDark />
      </div>
      <section className="relative -mt-px overflow-hidden bg-(--navy) px-6 pb-24 pt-10 text-white md:pb-32" style={glow("50% 0%", 0.25)}>
        <Depth rotate={12} lift={120}>
          <div className="relative mx-auto max-w-4xl border border-(--gold)/60 p-10 text-center md:p-16">
            <Checker className="absolute inset-x-6 top-3 opacity-50" color="%23e2b862" />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-light)">Aurevon Global Partners</p>
            <h2 className="mx-auto mt-5 max-w-xl font-serif text-3xl font-bold uppercase leading-tight md:text-5xl">
              <Words text="Interested in the Petralona apartment?" className="block" />
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              An 81 m² ground floor apartment with two bedrooms and two
              bathrooms, at €330,000. Contact us to arrange a viewing.
            </p>
            <Link href="/contact" className="mt-9 inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110">
              Arrange a viewing
            </Link>
            <Checker className="absolute inset-x-6 bottom-3 opacity-50" color="%23e2b862" />
          </div>
        </Depth>
      </section>
    </main>
  );
}