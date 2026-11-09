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
  title: "Detached House in Korinthos | Aurevon Global Partners",
  description:
    "A 170 m² detached house with 3 bedrooms, a sea-view terrace and a garden in Korinthos, Golden Visa eligible, about an hour from Athens.",
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

/* Meander (Greek key) band: a nod to Ancient Corinth, used as the section divider */
const meanderBg = (color: string): CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='14'><path d='M0 13V1H16V10H6V5H11V7.5 M16 13H24' fill='none' stroke='${color}' stroke-width='1.3'/></svg>")`,
  backgroundRepeat: "repeat-x",
  backgroundPosition: "center",
});
const Meander = ({ className = "", color = "%23e2b862" }: { className?: string; color?: string }) => (
  <div aria-hidden className={`h-3.5 ${className}`} style={meanderBg(color)} />
);

/* ───────── IMAGES ─────────
   All files go in public/images/ (.png)
     korinthos-cover      hero. A text-free crop of the brochure cover (no title, no price list)
     korinthos-living     I    living room with the sea-view doors
     korinthos-hall       II   entrance hall looking to the sea
     korinthos-stairs     III  living room and staircase
     korinthos-kitchen-1  IV   open kitchen, pendant lights
     korinthos-kitchen-2  V    kitchen, blue cabinets
     korinthos-bath-1     VI   bathroom with shower
     korinthos-bath-2     VII  bathroom with bath
     korinthos-bedroom    VIII bedroom with fitted wardrobes
     korinthos-terrace    covered terrace and lawn
     korinthos-view-1     view of the gulf from the house
     korinthos-view-2     second view of the gulf
     korinthos-garden     garden and gate
     korinthos-beach-1    beach and mountains
     korinthos-beach-2    rocky shoreline
     korinthos-map        the map (crop to the square map only)
   If your files are .jpg, change EXT below to "jpg". */
const FOLDER = "/images";
const EXT = "png";
const img = (n: string) => `${FOLDER}/${n}.${EXT}`;

const rooms = [
  { id: "living", group: "Living", title: "The living room", text: "A bright open room with large-format floors and sliding doors toward the sea.", src: img("korinthos-living"), alt: "Living room with sliding doors and a view of the sea" },
  { id: "hall", group: "Living", title: "Entrance and hall", text: "The entrance opens straight onto the living space, with the gulf visible at the far end.", src: img("korinthos-hall"), alt: "Entrance hall looking through the living room to the sea" },
  { id: "stairs", group: "Living", title: "Stairs and living space", text: "A steel-and-stone staircase leads up from the living room, under warm pendant lights.", src: img("korinthos-stairs"), alt: "Living room with staircase and pendant lights" },
  { id: "kitchen-1", group: "Kitchen", title: "The open kitchen", text: "Light timber-effect units along one wall, with space for a dining table in front.", src: img("korinthos-kitchen-1"), alt: "Open kitchen with pendant lights" },
  { id: "kitchen-2", group: "Kitchen", title: "The kitchen, blue", text: "Deep blue cabinetry, a built-in oven and a long window above the worktop.", src: img("korinthos-kitchen-2"), alt: "Kitchen with blue cabinets and a long window" },
  { id: "bath-1", group: "Bathrooms & bedroom", title: "Bathroom", text: "Large warm-toned tiles, a wall-hung timber vanity and a glass shower.", src: img("korinthos-bath-1"), alt: "Bathroom with timber vanity and glass shower" },
  { id: "bath-2", group: "Bathrooms & bedroom", title: "Second bathroom", text: "A full bath with shower, a wall-hung toilet and a mirrored vanity.", src: img("korinthos-bath-2"), alt: "Bathroom with bath and wall-hung toilet" },
  { id: "bedroom", group: "Bathrooms & bedroom", title: "Bedroom", text: "Timber-effect flooring and floor-to-ceiling fitted wardrobes.", src: img("korinthos-bedroom"), alt: "Bedroom with fitted wardrobes and timber floor" },
];

const chapters = [
  { range: "I – III", label: "Living" },
  { range: "IV – V", label: "Kitchen" },
  { range: "VI – VIII", label: "Baths & bedroom" },
];

const stats: { n?: number; text?: string; label: string }[] = [
  { n: 170, label: "m² house" },
  { n: 3, label: "Bedrooms" },
  { text: "2 + 1", label: "Bathrooms" },
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

const ParkIcon = icon(<><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M10 17V8h3a2.5 2.5 0 0 1 0 5h-3" /></>);
const CartIcon = icon(<><path d="M3 4h2.5l2 11h10l2-8H7" /><circle cx="9" cy="19" r="1.2" /><circle cx="17" cy="19" r="1.2" /></>);
const HomeIcon = icon(<><path d="M3.5 11.5L12 4l8.5 7.5" /><path d="M5.5 10v10h13V10" /><path d="M10 20v-5.5h4V20" /></>);
const SofaIcon = icon(<><path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" /><path d="M3 12a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3z" /><path d="M5 19v1.5M19 19v1.5" /></>);
const ShipIcon = icon(<><path d="M3 15l2 4h14l2-4z" /><path d="M6 15V9h12v6M10 9V5h4v4" /></>);
const CastleIcon = icon(<><path d="M4 20V8h3v2h2V8h2v2h2V8h2v2h2V8h1v12z" /><path d="M10 20v-4h4v4" /></>);
const GrapeIcon = icon(<><circle cx="9" cy="12" r="2" /><circle cx="15" cy="12" r="2" /><circle cx="12" cy="16" r="2" /><circle cx="12" cy="8" r="2" /><path d="M12 6V3l3-1" /></>);
const PinIcon = icon(<><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>);
const EyeIcon = icon(<><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></>);
const TreeIcon = icon(<><circle cx="12" cy="9" r="5" /><path d="M12 14v7M9 21h6" /></>);
const PlaneIcon = icon(<><path d="M21 4L3 11l6 2.5L11.5 20 14 14.5z" /><path d="M9 13.5L21 4" /></>);
const WaveIcon = icon(<><path d="M3 9c2 0 2-1.5 4.5-1.5S10 9 12 9s2.5-1.5 4.5-1.5S19 9 21 9" /><path d="M3 14c2 0 2-1.5 4.5-1.5S10 14 12 14s2.5-1.5 4.5-1.5S19 14 21 14" /></>);
const highlights: { Icon: IconType; value: string; label: string }[] = [
  { Icon: PlaneIcon, value: "≈ 1 hr", label: "To Athens, 84 km" },
  { Icon: ShipIcon, value: "8 min", label: "To the Corinth Canal" },
  { Icon: VisaIcon, value: "Eligible", label: "Golden Visa" },
];

const specs: { Icon: IconType; text: string }[] = [
  { Icon: HomeIcon, text: "170 m² detached house" },
  { Icon: BedIcon, text: "3 bedrooms" },
  { Icon: BathIcon, text: "2 + 1 bathrooms" },
  { Icon: EyeIcon, text: "Sea views from the living room and terrace" },
  { Icon: VisaIcon, text: "Golden Visa eligible" },
];

/* only what is visible in the photos */
const features: { Icon: IconType; text: string }[] = [
  { Icon: FloorIcon, text: "Large-format tiled floors, timber-effect in the bedroom" },
  { Icon: WaveIcon, text: "Covered terrace with glass balustrade" },
  { Icon: TreeIcon, text: "Private lawn garden with gated driveway" },
  { Icon: StairIcon, text: "Steel-and-stone interior staircase" },
  { Icon: ShelfIcon, text: "Fitted wardrobes and blue kitchen cabinetry" },
];

/* x / y = where each highlight sits on the map image, in %. The highlight outlines the brochure's own label, so nudge if it looks off. */
const keyPlaces: { id: string; name: string; tag: string; x: number; y: number }[] = [
  { id: "athens", name: "Athens", tag: "84 km · ~1 hr", x: 19, y: 12 },
  { id: "airport", name: "Athens International Airport", tag: "118 km · ~1 hr 20 min", x: 19, y: 18 },
  { id: "canal", name: "Corinth Canal", tag: "5 km · 8 min", x: 19, y: 25 },
  { id: "ancient", name: "Ancient Corinth", tag: "8 km · 12 min", x: 19, y: 32 },
  { id: "acro", name: "Acrocorinth Castle", tag: "10 km · 15 min", x: 19, y: 37 },
  { id: "loutraki", name: "Loutraki", tag: "7 km · 10 min", x: 86, y: 30 },
  { id: "marina", name: "Loutraki Marina", tag: "8 km · 12 min", x: 88, y: 38 },
  { id: "heraion", name: "Heraion of Perachora", tag: "22 km · 30 min", x: 86, y: 53 },
  { id: "kiato", name: "Kiato", tag: "26 km · 25 min", x: 89, y: 80 },
  { id: "nemea", name: "Nemea Wine Region", tag: "32 km · 30 min", x: 89, y: 87 },
  { id: "nafplio", name: "Nafplio", tag: "65 km · 50 min", x: 89, y: 93 },
];

const hoverCss = keyPlaces
  .map((p) => `.loc-explorer:has([data-place=${p.id}]:is(:hover,:focus)) [data-pin=${p.id}]{opacity:1;scale:1}`)
  .join("\n");

const around: { Icon: IconType; label: string; text: string }[] = [
  { Icon: ShipIcon, label: "Corinth Canal", text: "5 km, 8 min. The canal joins the Gulf of Corinth and the Saronic Gulf." },
  { Icon: ColumnIcon, label: "Ancient Corinth", text: "8 km, 12 min, with Acrocorinth Castle 10 km, 15 min away." },
  { Icon: WaveIcon, label: "Loutraki", text: "7 km, 10 min to the seaside town, and 8 km to its marina." },
  { Icon: GrapeIcon, label: "Nemea Wine Region", text: "32 km, 30 min to one of Greece's best-known wine regions." },
  { Icon: CastleIcon, label: "Nafplio", text: "65 km, 50 min to the old coastal town." },
  { Icon: PlaneIcon, label: "Athens", text: "84 km, about 1 hr to Athens, and 118 km to the international airport." },
];

/* ───────── Shared pieces ───────── */
const Tag = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span className={`inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-md ${className}`}>
    {children}
  </span>
);

/* Meander divider on a navy bar */
function MeanderBar() {
  return (
    <div aria-hidden className="flex h-8 w-full items-center bg-(--navy) md:h-10">
      <Meander className="w-full" />
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

/* Brass-framed photo plate. "tilt" pins it slightly off-square, like a print on a table. */
function Photo({ src, alt, caption, sizes, aspect = "aspect-[4/3]", tilt = 0, className = "", priority = false }: { src: string; alt: string; caption: string; sizes: string; aspect?: string; tilt?: number; className?: string; priority?: boolean }) {
  return (
    <figure className={`relative ${className}`} style={{ transform: `rotate(${tilt}deg)` }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-(--gold)/50" />
      <div className="relative border border-(--gold)/60 bg-white p-3 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-4">
        <div aria-hidden className="pointer-events-none absolute inset-2 border border-(--gold)/40" />
        <div className={`relative ${aspect} w-full overflow-hidden ring-1 ring-(--gold)/50`}>
          <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-center" />
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

const layer = (mx: number, my: number, sy: number, z: number, ry: number): CSSProperties => ({
  transform: `translate3d(calc(var(--mx,0) * ${mx}px), calc(var(--my,0) * ${my}px + var(--sy,0) * ${sy}px), ${z}px) rotateY(calc(var(--mx,0) * ${ry}deg)) rotateX(calc(var(--sy,0) * 8deg))`,
  transition: "transform 350ms ease-out",
  willChange: "transform",
});

export default function KorinthosHousePage() {
  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      <S3Styles />
      <ScrollBar />

      {/* ───────── HERO · one image in a stacked block frame ───────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-(--sky) via-[#f6efe0] to-[#f4d9a8] pt-32 md:pt-40">
        <div aria-hidden className="absolute inset-0" style={glow("85% 85%", 0.45)} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 md:pb-32 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal3D variant="flipLeft">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--navy)/70">Korinthos, Greece</p>
            </Reveal3D>
            <h1 className="mt-6 font-serif text-5xl font-bold uppercase leading-[1.02] tracking-tight md:text-7xl">
              <Words text="Detached House" className="block" />
              <Words
                text="in Korinthos"
                className="block"
                delay={300}
                wordClass="bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-transparent"
              />
            </h1>
            <Reveal3D variant="rise" delay={500}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-(--navy)/80">
                A 170 m² house with 3 bedrooms, a sea-view terrace and a garden,
                about an hour from Athens.
              </p>
              <div className="mt-8 flex flex-wrap items-end gap-x-5 gap-y-3 border-t border-(--gold)/40 pt-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">Price</p>
                  <p className="mt-1 font-serif text-4xl font-bold leading-none text-(--navy) md:text-5xl">€525,000</p>
                </div>
                <Tag className="mb-1">Golden Visa eligible</Tag>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="inline-flex h-12 items-center justify-center bg-(--navy) px-8 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:bg-(--gold-dark) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--gold)">
                  Arrange a viewing
                </Link>
                <a href="#views" className="inline-flex h-12 items-center justify-center border border-(--navy)/40 px-8 text-xs font-semibold uppercase tracking-[0.15em] text-(--navy) transition hover:border-(--gold) hover:text-(--gold-dark) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--gold)">
                  Tour the house
                </a>
              </div>
            </Reveal3D>
          </div>

          {/* one photo, with a solid navy block and a brass outline stepped behind it */}
          <HeroStage className="relative flex justify-center lg:col-span-6">
            <div className="relative w-[min(88%,21rem)] md:w-[min(88%,25rem)]">
              <div aria-hidden style={layer(-12, -6, -25, 0, 4)} className="absolute inset-0 -translate-x-5 translate-y-5 bg-(--navy)" />
              <div aria-hidden style={layer(-6, -3, -40, 20, 3)} className="absolute inset-0 translate-x-4 -translate-y-4 border border-(--gold)/70" />
              <div style={layer(8, -10, -60, 60, 5)} className="relative">
                <Reveal3D variant="zoom" delay={300} duration={1300}>
                  <div className="relative aspect-[5/7] w-full overflow-hidden border-4 border-white shadow-[0_40px_70px_-30px_rgba(16,35,94,0.6)]">
                    <Image src={img("korinthos-cover")} alt="Modern detached house in Korinthos with a stone-clad upper floor, glass-balustrade terrace and lawn at sunset" fill priority sizes="(min-width:768px) 400px, 336px" className="object-cover" />
                    <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(16,35,94,0.25)]" />
                  </div>
                </Reveal3D>
                <div className="absolute -right-3 bottom-10 z-20 bg-linear-to-b from-(--gold-light) to-(--gold) px-4 py-3 text-center text-white shadow-xl md:-right-8">
                  <p className="font-serif text-2xl font-bold leading-none md:text-3xl">170</p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.25em]">m²</p>
                </div>
              </div>
            </div>
          </HeroStage>
        </div>
        <Meander className="relative opacity-80" color="%23b9791f" />
      </section>

      {/* ───────── STATS ───────── */}
      <section className="bg-(--navy)">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-(--gold)/30 px-6">
          {stats.map((st, i) => (
            <Reveal3D key={st.label} variant="flipCard" delay={i * 140} className="px-4 py-8 text-center md:px-8">
              <dd className="font-serif text-4xl font-bold text-(--gold-light) md:text-5xl">
                {st.n !== undefined ? <Counter to={st.n} /> : st.text}
              </dd>
              <dt className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/80 md:text-[11px]">{st.label}</dt>
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
              <Title title="Korinthos" sub="A detached house with a view of the gulf" />
            </div>
            <Reveal3D variant="flipRight" className="lg:col-span-5">
              <p className="leading-relaxed text-(--navy)/75">
                A stone-clad modern house with its own garden and a covered
                terrace, looking out over the water.
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
                <h3 className="font-serif text-xl font-bold uppercase tracking-wide">Property highlights</h3>
                <span className="mb-7 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                <IconList items={features} />
              </div>
            </Reveal3D>
          </div>

          {/* outdoors collage: one large print and two smaller, pinned off-square */}
          <p className="mb-8 mt-24 text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">Terrace, garden and sea</p>
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
            <Reveal3D variant="flipLeft" className="md:col-span-7">
              <Photo src={img("korinthos-terrace")} alt="Covered terrace with glass balustrade overlooking the lawn" caption="The terrace" aspect="aspect-[4/3]" tilt={-1.2} sizes="(min-width:768px) 600px, 95vw" />
            </Reveal3D>
            <div className="grid gap-10 md:col-span-5">
              <Reveal3D variant="flipRight">
                <Photo src={img("korinthos-view-1")} alt="View of the Gulf of Corinth from the house" caption="The gulf" aspect="aspect-[16/10]" tilt={1.5} sizes="(min-width:768px) 420px, 95vw" />
              </Reveal3D>
              <Reveal3D variant="flipRight" delay={120}>
                <Photo src={img("korinthos-garden")} alt="Lawn garden with gated driveway and sea beyond" caption="The garden" aspect="aspect-[16/10]" tilt={-1} className="md:ml-8" sizes="(min-width:768px) 420px, 95vw" />
              </Reveal3D>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── VIEWS · flipping book ───────── */}
      <div className="bg-(--cream)"><MeanderBar /></div>
      <section id="views" className="relative -mt-px scroll-mt-20 overflow-hidden bg-(--navy-deep) px-6 py-16 md:py-24">
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
          <div key={pos} aria-hidden className={`absolute inset-x-0 ${pos} h-1`} style={{ backgroundImage: "linear-gradient(90deg, var(--aegean) 0 33.33%, var(--cream) 33.33% 66.66%, var(--gold-light) 66.66% 100%)" }} />
        ))}
        <div className="relative z-10 mx-auto max-w-6xl">
          <Title title="Walk through the house." sub="Flip through eight views" dark center />
          <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-3 divide-x divide-(--gold)/30 border-y border-(--gold)/30 text-center">
            {chapters.map((c) => (
              <li key={c.label} className="px-2 py-4">
                <span className="block font-serif text-xs tracking-[0.3em] text-(--gold-light)">{c.range}</span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-white/70">{c.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-12"><RoomBook pages={rooms} /></div>
        </div>
      </section>
      <div className="bg-(--paper)"><MeanderBar /></div>

      {/* ───────── LOCATION ───────── */}
      <section id="location" className="relative -mt-px scroll-mt-20 bg-(--paper)">
        <Paper />
        <style dangerouslySetInnerHTML={{ __html: hoverCss }} />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="loc-explorer grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <Title title="An hour from Athens, minutes from the canal." sub="Location" />
              <Reveal3D variant="rise" delay={150}>
                <p className="mt-8 max-w-md text-sm leading-relaxed text-(--navy)/75">
                  Distances are measured by road. Hover or tap a place to find it
                  on the map.
                </p>
                <ul className="mt-6 border-t border-(--gold)/40">
                  {keyPlaces.map(({ id, name, tag }) => (
                    <li key={id} data-place={id} tabIndex={0} className="group relative flex cursor-pointer items-baseline gap-3 border-b border-(--gold)/20 py-2.5 text-sm text-(--navy)/85 outline-none transition-all duration-300 hover:bg-(--gold)/10 hover:pl-4 hover:text-(--navy) focus:bg-(--gold)/10 focus:pl-4 focus:text-(--navy)">
                      <span aria-hidden className="absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 bg-(--gold) transition-all duration-300 group-hover:h-6 group-focus:h-6" />
                      <span>{name}</span>
                      <span aria-hidden className="min-w-4 flex-1 -translate-y-1 border-b border-dotted border-(--gold)/60" />
                      <span className="whitespace-nowrap text-xs text-(--gold-dark) group-hover:font-semibold">{tag}</span>
                    </li>
                  ))}
                </ul>
              </Reveal3D>
            </div>

            <div className="mx-auto w-full max-w-lg lg:col-span-6 lg:max-w-none">
              <Depth axis="y" rotate={-8} lift={90}>
                <div className="relative">
                  <div aria-hidden className="pointer-events-none absolute inset-0 -translate-x-3 translate-y-3 border border-(--gold)/50 md:-translate-x-5 md:translate-y-5" />
                  <div className="relative border border-(--gold)/60 bg-white p-4 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-6">
                    <div aria-hidden className="pointer-events-none absolute inset-2 border border-(--gold)/40 md:inset-3" />
                    <div className="relative aspect-square w-full overflow-hidden bg-(--paper) ring-1 ring-(--gold)/50">
                      <Image src={img("korinthos-map")} alt="Relief map of Corinth, Loutraki and the Corinth Canal with distances and drive times to Athens, the airport, Ancient Corinth, Nafplio and more" fill sizes="(min-width:1024px) 520px, 95vw" className="object-contain" />
                      {keyPlaces.map(({ id, x, y }) => (
                        <span key={id} data-pin={id} aria-hidden style={{ left: `${x}%`, top: `${y}%` }} className="pointer-events-none absolute z-10 aspect-[7/2] w-[30%] -translate-x-1/2 -translate-y-1/2 scale-90 rounded-md border-2 border-(--gold-light) bg-(--gold-light)/25 opacity-0 transition duration-300" />
                      ))}
                    </div>
                    <div className="relative mt-4 flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark) md:mt-5 md:text-[10px]">
                      <span className="h-px w-8 bg-(--gold)/60 md:w-12" />
                      <span className="font-serif italic normal-case tracking-[0.15em]">Gulf of Corinth</span>
                      <span className="h-px w-8 bg-(--gold)/60 md:w-12" />
                    </div>
                  </div>
                </div>
              </Depth>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── AROUND KORINTHOS ───────── */}
      <section className="relative bg-(--cream)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Title title="Sea, history and wine." sub="Around Korinthos" />
              <Reveal3D variant="rise" delay={150}>
                <p className="mt-8 max-w-sm text-sm leading-relaxed text-(--navy)/75">
                  Beaches on the gulf, ancient sites and the Nemea wine region
                  are all within an hour of the house.
                </p>
              </Reveal3D>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
              <Reveal3D variant="flipLeft">
                <Photo src={img("korinthos-beach-1")} alt="Clear shallow water and a sandy shore with mountains across the gulf" caption="The shore" aspect="aspect-[4/5]" tilt={-1.5} sizes="(min-width:1024px) 300px, 95vw" />
              </Reveal3D>
              <Reveal3D variant="flipRight" className="sm:mt-14">
                <Photo src={img("korinthos-beach-2")} alt="Rocky shoreline and blue water under a bright sky" caption="The coast" aspect="aspect-[4/5]" tilt={1.5} sizes="(min-width:1024px) 300px, 95vw" />
              </Reveal3D>
            </div>
          </div>

          <p className="mb-6 mt-20 text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark) md:mt-24">Nearby highlights</p>
          <Reveal3D variant="rise">
            <ul className="grid grid-cols-1 divide-y divide-(--gold)/30 border-y border-(--gold)/50 sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
              {around.map(({ Icon, label, text }) => (
                <li key={label} className="group flex flex-col items-center px-6 py-10 text-center sm:[&:nth-child(n+3)]:border-t sm:[&:nth-child(n+3)]:border-(--gold)/30">
                  <Icon className="h-9 w-9 text-(--navy) transition duration-500 group-hover:-translate-y-1 group-hover:text-(--gold-dark)" />
                  <span className="mt-5 block h-px w-8 bg-(--gold)/60" />
                  <span className="mt-5 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-(--navy)">{label}</span>
                  <span className="mt-2 max-w-[15rem] text-xs leading-relaxed text-(--navy)/65">{text}</span>
                </li>
              ))}
            </ul>
          </Reveal3D>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <div className="bg-(--cream)"><MeanderBar /></div>
      <section className="relative -mt-px overflow-hidden bg-(--navy) px-6 pb-24 pt-10 text-white md:pb-32" style={glow("50% 0%", 0.28)}>
        <Depth rotate={12} lift={120}>
          <div className="relative mx-auto max-w-4xl border border-(--gold)/60 p-10 text-center md:p-16">
            <Meander className="absolute inset-x-6 top-3 opacity-60" />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-light)">Aurevon Global Partners</p>
            <h2 className="mx-auto mt-5 max-w-xl font-serif text-3xl font-bold uppercase leading-tight md:text-5xl">
              <Words text="Interested in the Korinthos house?" className="block" />
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              A 170 m² detached house with 3 bedrooms and 2 + 1 bathrooms,
              Golden Visa eligible, at €525,000. Contact us to arrange a viewing.
            </p>
            <Link href="/contact" className="mt-9 inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110">
              Arrange a viewing
            </Link>
            <Meander className="absolute inset-x-6 bottom-3 opacity-60" />
          </div>
        </Depth>
      </section>
    </main>
  );
}