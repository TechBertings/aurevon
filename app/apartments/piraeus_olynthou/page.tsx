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
  title: "Piraeus Olynthou Loft Apartment | Aurevon Global Partners",
  description:
    "A 59 m² loft apartment in Piraeus, Athens. 1 bedroom, 1 bathroom, double-height entrance, Golden Visa eligible.",
};

/* EDIT HERE: palette. Same variable names and values as the Pythagoras page (RoomBook depends on them). */
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

/* Sail band: a row of small sails (the Piraeus twist, replaces the right-angle band) */
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
   All files go in public/images/piraeus/
     piraeus-cover.png     brochure cover (hero)
     living-1.png          I     open-plan living and dining
     living-2.png          II    the lounge
     entrance-1.png        III   double-height entrance
     living-3.png          I     open-plan living and dining
     living-2.png          II    the lounge
     entrance-2.png        III   double-height entrance
     kitchen-2.png         IV    kitchen
     dining-1.png          V     dining corner
     bathroom-2.png        VI    bathroom
     shower-2.png          VII   walk-in shower
     bedroom-4.png         VIII  bedroom
     bedroom-5.png         IX    bedroom, window
     floorplan-1.png       X     floor plan
     piraeus-map.png       location map (crop it to just the map frame)
     piraeus-theatre.png   Municipal Theatre of Piraeus
     mikrolimano.png       Mikrolimano harbour
   If your files are .jpg, change EXT below to "jpg". */
const FOLDER = "/images";
const EXT = "png";
const img = (n: string) => `${FOLDER}/${n}.${EXT}`;

/* EDIT HERE: the ten pages of the book, in the order they flip */
const rooms = [
  {
    id: "living-open",
    group: "Living",
    title: "Open-plan living and dining",
    text: "A bright open plan with a corner sofa, a round timber dining table and warm timber-look flooring.",
    src: img("living-3"),
    alt: "Open-plan living and dining area with corner sofa and round timber table",
  },
  {
    id: "living-lounge",
    group: "Living",
    title: "The lounge",
    text: "A soft corner sofa and a timber coffee table, set against a calm sage feature wall with framed botanical art.",
    src: img("living-2"),
    alt: "Lounge with corner sofa, coffee table and sage green wall",
  },
  {
    id: "entrance",
    group: "Living",
    title: "Double-height entrance",
    text: "A tall timber door with a high window above, flanked by shuttered windows that fill the room with soft light.",
    src: img("entrance-2"),
    alt: "Double-height entrance with tall timber door and high window",
  },

  {
    id: "kitchen",
    group: "Kitchen",
    title: "The kitchen",
    text: "Handleless white cabinetry, an olive-green splashback, a built-in oven, a hood and a full-height fridge freezer.",
    src: img("kitchen-2"),
    alt: "L-shaped white kitchen with olive splashback and built-in oven",
  },
  {
    id: "dining",
    group: "Dining",
    title: "Dining corner",
    text: "A round timber table with upholstered chairs, a warm pendant light and framed prints on the wall.",
    src: img("dining-1"),
    alt: "Round timber dining table with two upholstered chairs",
  },
  {
    id: "bathroom",
    group: "Bathroom",
    title: "The bathroom",
    text: "A round mirror above a timber vanity with a black tap, a black heated towel rail and a walk-in shower beyond.",
    src: img("bathroom-2"),
    alt: "Bathroom with round mirror, timber vanity and black heated towel rail",
  },
  {
    id: "shower",
    group: "Bathroom",
    title: "Walk-in shower",
    text: "A step-free shower behind a frosted glass screen, with a wall-hung toilet and black fixtures.",
    src: img("shower-2"),
    alt: "Walk-in shower with frosted glass screen and wall-hung toilet",
  },
  {
    id: "bedroom",
    group: "Sleeping",
    title: "The bedroom",
    text: "An upholstered bed, bedside wall lights, a built-in wardrobe and a soft LED glow around the ceiling.",
    src: img("bedroom-4"),
    alt: "Bedroom with upholstered bed, wall lights and built-in wardrobe",
  },
  {
    id: "bedroom-window",
    group: "Sleeping",
    title: "Bedroom and window",
    text: "Floor-length curtains at the window, a wall-mounted TV and a calm, uncluttered layout.",
    src: img("bedroom-5"),
    alt: "Bedroom with floor-length curtains and wall-mounted TV",
  },
  {
    id: "floorplan",
    group: "Plan",
    title: "Floor plan",
    text: "One open living, dining and kitchen space, with the bedroom and bathroom set neatly to the rear. 59 m² in total.",
    src: img("floorplan-1"),
    alt: "Floor plan of the Piraeus Olynthou loft showing living area, kitchen, bedroom and bathroom",
  },
];

/* contents strip above the book (matches the page order above) */
const chapters = [
  { range: "I – III", label: "Living" },
  { range: "IV – V", label: "Kitchen & dining" },
  { range: "VI – VII", label: "Bathroom" },
  { range: "VIII – IX", label: "Sleeping" },
  { range: "X", label: "Floor plan" },
];
/* EDIT HERE: key facts from the brochure */
const stats = [
  { n: 59, label: "m² of living space" },
  { n: 1, label: "Bedroom" },
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
const WindIcon = icon(
  <>
    <path d="M3 9h11a2.5 2.5 0 1 0-2.5-2.5" />
    <path d="M3 13h15a2.5 2.5 0 1 1-2.5 2.5" />
    <path d="M3 17h7" />
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
    <path d="M5 20V9h6v11" />
    <path d="M11 20V4h8v16" />
    <path d="M3 20h18" />
    <path d="M14 8h2M14 12h2M14 16h2M7.5 12.5h.01M7.5 16h.01" />
  </>,
);
const ColumnIcon = icon(
  <>
    <path d="M3.5 9L12 4l8.5 5z" />
    <path d="M6 11v7M10 11v7M14 11v7M18 11v7" />
    <path d="M4 20h16" />
  </>,
);
const GradIcon = icon(
  <>
    <path d="M2.5 9L12 4.5 21.5 9 12 13.5z" />
    <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
    <path d="M21.5 9v6" />
  </>,
);
const PlaneIcon = icon(
  <>
    <path d="M21 3L3 11l7 2.5L12.5 21z" />
    <path d="M10 13.5L21 3" />
  </>,
);

/* EDIT HERE: from the brochure */
const highlights: { Icon: IconType; value: string; label: string }[] = [
  { Icon: PinIcon, value: "20 min", label: "Drive to Athens centre" },
  { Icon: CoinsIcon, value: "€315,000", label: "Price" },
  { Icon: PassportIcon, value: "Eligible", label: "Golden Visa" },
];

const specs: { Icon: IconType; text: string }[] = [
  { Icon: PlanIcon, text: "59 sq.m. loft apartment" },
  { Icon: BedIcon, text: "1 Bedroom" },
  { Icon: BathIcon, text: "1 Bathroom" },
  { Icon: HouseIcon, text: "Double-height entrance and living" },
];

/* only what is visible in the photos; add heating, alarm, etc. here if the brochure lists them */
const finishes: { Icon: IconType; text: string }[] = [
  { Icon: HobIcon, text: "Handleless kitchen with built-in oven" },
  { Icon: FloorIcon, text: "Warm timber-look flooring" },
  { Icon: BulbIcon, text: "Soft LED cove and spot lighting" },
  { Icon: ShowerIcon, text: "Walk-in shower with frosted glass screen" },
  { Icon: WindIcon, text: "Air conditioning" },
];

/* On the map. x / y = where each pin sits on the map image, in %. Nudge them if a ring looks slightly off. */
const keyPlaces: { id: string; name: string; tag: string; x: number; y: number }[] = [
  { id: "port", name: "Piraeus Port", tag: "Ferry terminal", x: 44, y: 11 },
  { id: "museum", name: "Archaeological Museum", tag: "Classical artefacts", x: 44, y: 32 },
  { id: "maritime", name: "Hellenic Maritime Museum", tag: "Maritime heritage", x: 12, y: 50 },
  { id: "pasalimani", name: "Pasalimani", tag: "Yacht basin & promenade", x: 56, y: 52 },
  { id: "hospital", name: "Tzaneio General Hospital", tag: "Healthcare", x: 64, y: 44 },
  { id: "hill", name: "Profitis Ilias", tag: "Hillside park & viewpoint", x: 87, y: 49 },
  { id: "veakio", name: "Veakio Municipal Theatre", tag: "Open-air performances", x: 87, y: 65 },
  { id: "zeas", name: "Marina Zeas", tag: "Yacht club & facilities", x: 25, y: 74 },
  { id: "votsalakia", name: "Votsalakia Beach", tag: "Recreation area", x: 79, y: 92 },
  { id: "freatida", name: "Freatida Beach", tag: "Swimming cove", x: 12, y: 94 },
];

/* hover / tap on a row shows the matching ring on the map (pure CSS) */
const hoverCss = keyPlaces
  .map(
    (p) =>
      `.loc-explorer:has([data-place=${p.id}]:is(:hover,:focus)) [data-pin=${p.id}]{opacity:1;scale:1}`,
  )
  .join("\n");

/* from the brochure: "Approximate distances from Piraeus" */
const connections: { Icon: IconType; label: string; time: string; text: string }[] = [
  { Icon: AnchorIcon, label: "Piraeus Port", time: "Nearby", text: "A major ferry terminal with island and coastal connections." },
  { Icon: CityIcon, label: "Athens city centre", time: "≈ 20 min", text: "Syntagma, by car." },
  { Icon: ColumnIcon, label: "Acropolis of Athens", time: "≈ 20 min", text: "The city's best-known landmark, by car." },
  { Icon: GradIcon, label: "University of Piraeus", time: "≈ 15 min", text: "A short drive across the city." },
  { Icon: PlaneIcon, label: "Athens Airport", time: "≈ 45 min", text: "Athens International Airport, by car." },
];

/* from the client's brochure pages (text is the client's own) */
const landmarks: {
  id: string;
  eyebrow: string;
  name: string;
  src: string;
  alt: string;
  paras: ReactNode[];
}[] = [
  {
    id: "theatre",
    eyebrow: "Culture",
    name: "Municipal Theatre of Piraeus",
    src: img("piraeus-theatre"),
    alt: "Municipal Theatre of Piraeus, a restored neoclassical building",
    paras: [
      <>
        The <strong>Municipal Theatre of Piraeus</strong> is one of the city&rsquo;s most{" "}
        <strong>iconic architectural and cultural landmarks</strong>. This beautifully restored
        neoclassical building reflects the historical importance of Piraeus as a{" "}
        <strong>major urban and commercial center</strong>, standing as a symbol of the
        city&rsquo;s cultural heritage and artistic tradition.
      </>,
      <>
        Today, the theatre hosts a <strong>wide range of performances, concerts, and cultural
        events</strong> throughout the year, attracting both locals and visitors. Its presence
        has significantly contributed to the revitalization of the city center,{" "}
        <strong>enhancing the cultural appeal</strong> of Piraeus and adding{" "}
        <strong>long-term value</strong> to the surrounding area.
      </>,
    ],
  },
  {
    id: "mikrolimano",
    eyebrow: "Waterfront",
    name: "Mikrolimano",
    src: img("mikrolimano"),
    alt: "Mikrolimano harbour at dusk with yachts and waterfront restaurants",
    paras: [
      <>
        <strong>Mikrolimano</strong> is one of the most <strong>charming and picturesque</strong>{" "}
        coastal areas of Piraeus, known for its <strong>scenic harbor and relaxed seaside
        atmosphere</strong>. Surrounded by the sea, yachts, and colorful waterfront buildings, it
        offers a <strong>unique setting</strong> that combines urban life with a{" "}
        <strong>strong Mediterranean character</strong>.
      </>,
      <>
        The area is famous for its <strong>high-quality restaurants, caf&eacute;s, and leisure
        spots</strong>, making it a popular destination day and night. Mikrolimano&rsquo;s blend
        of lifestyle, gastronomy, and marina living makes it{" "}
        <strong>one of the most desirable locations in Piraeus</strong>, appealing to residents,
        tourists, and investors alike.
      </>,
    ],
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

/* Arcade divider (a run of quayside arches), replaces the Pythagoras steps */
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

/* Hero photo split into three staggered arched windows (echoes the arcade divider and the tall entrance door).
   The same photo runs across all three panels, each one showing its own third. */
const panels: { shift: string; depth: [number, number, number, number, number] }[] = [
  { shift: "12%", depth: [6, -6, -30, 30, 3] },
  { shift: "0%", depth: [8, -10, -60, 60, 5] },
  { shift: "8%", depth: [10, -8, -45, 45, 4] },
];

function Triptych({
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
    <div className={`grid grid-cols-3 items-start gap-3 ${className}`}>
      {panels.map((p, i) => (
        <div
          key={i}
          className="h-[88%]"
          style={{ transform: `translateY(${p.shift})` }}
        >
          <Reveal3D variant="rise" delay={300 + i * 180} duration={1100} className="h-full">
            <div style={layer(...p.depth)} className="relative h-full">
              {/* brass outline offset behind each arch */}
              <div
                aria-hidden
                className="absolute inset-0 translate-x-2 translate-y-2 rounded-t-[999px] border border-(--gold)/70"
              />
              <div
                className="relative h-full overflow-hidden rounded-t-[999px]"
                style={{ filter: "drop-shadow(0 24px 30px rgba(16,35,94,0.3))" }}
              >
                <div
                  className="absolute inset-y-0 w-[300%]"
                  style={{ left: `-${i * 100}%` }}
                >
                  <Image
                    src={src}
                    alt={i === 0 ? alt : ""}
                    aria-hidden={i === 0 ? undefined : true}
                    fill
                    priority
                    sizes={sizes}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal3D>
        </div>
      ))}
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
}: {
  src: string;
  alt: string;
  caption: string;
  sizes: string;
  className?: string;
  aspect?: string;
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
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-center" />
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

export default function PiraeusOlynthouLoftPage() {
  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      <S3Styles />
      <ScrollBar />

      {/* ───────── HERO · triptych of arched windows ───────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-(--sky) via-[#f6efe0] to-[#f4d9a8] pt-32 md:pt-40">
        <div aria-hidden className="absolute inset-0" style={glow("85% 85%", 0.45)} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 md:pb-32 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal3D variant="flipLeft">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--navy)/70">
                Piraeus, Athens
              </p>
            </Reveal3D>
            <h1 className="mt-6 font-serif text-5xl font-bold uppercase leading-[1.02] tracking-tight md:text-7xl">
              <Words text="Piraeus" className="block" />
              <Words
                text="Olynthou Loft"
                className="block"
                delay={300}
                wordClass="bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-transparent"
              />
            </h1>
            <Reveal3D variant="rise" delay={500}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-(--navy)/80">
                A 59 m² loft with a double-height entrance, 1 bedroom and
                1 bathroom, in the port city of Piraeus.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Tag>Golden Visa eligible</Tag>
                <span className="text-sm font-semibold text-(--navy)">€315,000</span>
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

          {/* three staggered arched windows, one photo running across them */}
          <HeroStage className="relative flex justify-center lg:col-span-6">
            <Triptych
              src={img("piraeus-cover")}
              alt="Piraeus Olynthou Loft Apartment: double-height entrance with a tall timber door, corner sofa and dining table. Golden Visa eligible, €315,000, 59 m², 1 bedroom, 1 bathroom."
              sizes="(min-width:768px) 480px, 360px"
              className="aspect-[5/7.5] w-[min(100%,22rem)] md:w-[min(100%,28rem)]"
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

      {/* ───────── PROPERTY FEATURES · cream ───────── */}
      <section className="relative bg-(--cream)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
                Property features
              </p>
              <Title title="Piraeus" sub="One loft apartment" />
            </div>
            <Reveal3D variant="flipRight" className="lg:col-span-5">
              <p className="leading-relaxed text-(--navy)/75">
                A compact, well-finished loft in the port city of Athens, with a
                double-height entrance, an open living space and a calm,
                contemporary finish throughout.
              </p>
            </Reveal3D>
          </div>

          {/* drive time · price · golden visa */}
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

      {/* ───────── ROOMS · eleven-page flipping book ───────── */}
      <div className="bg-(--cream)">
        <Arcade />
      </div>
      <section
        id="rooms"
        className="relative -mt-px scroll-mt-20 overflow-hidden bg-(--navy-deep) px-6 py-16 md:py-24"
      >
        {/* navy edges (to match the arcade), aegean haze above, brass glow behind the book */}
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
        <Title title="Walk through the loft." sub="Flip through ten pages" dark center />

          {/* contents strip */}
          <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-2 divide-x divide-(--gold)/30 border-y border-(--gold)/30 text-center sm:grid-cols-5">
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
          <Arcade flip />
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
              <Title title="Piraeus, on the waterfront." sub="Location" />
              <Reveal3D variant="rise" delay={150}>
                <p className="mt-8 max-w-sm text-sm leading-relaxed text-(--navy)/75">
                  The harbour, marinas, beaches and cultural landmarks of Piraeus
                  are all close by. Hover or tap a place to find it on the map.
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

            {/* RIGHT: map plate */}
            <div className="lg:col-span-7 lg:-mr-10 xl:-mr-16">
              <Depth axis="y" rotate={-8} lift={90}>
                <div className="relative">
                  {/* offset brass outline behind */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-(--gold)/50 md:translate-x-5 md:translate-y-5"
                  />

                  <div className="relative border border-(--gold)/60 bg-white p-4 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-7">
                    {/* inner double-line frame */}
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
                        Carte du port
                      </span>
                      <span className="h-px w-10 bg-(--gold)/60 md:w-20" />
                    </div>

                    {/* map */}
                    <div className="relative aspect-[375/360] w-full overflow-hidden ring-1 ring-(--gold)/50">
                      <Image
                        src={img("piraeus-map")}
                        alt="Aerial map of the Piraeus waterfront district showing the property location, the harbour, marinas, beaches and nearby landmarks"
                        fill
                        sizes="(min-width:1024px) 65vw, 95vw"
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
                          className="pointer-events-none absolute z-10 aspect-square w-[9%] -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full border-2 border-(--gold-light) opacity-0 transition duration-300"
                        >
                          <span className="absolute inset-0 animate-ping rounded-full bg-(--gold-light)/50" />
                        </span>
                      ))}
                    </div>

                    {/* plate caption */}
                    <div className="relative mt-4 flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark) md:mt-5 md:text-[10px]">
                      <span className="h-px w-8 bg-(--gold)/60 md:w-14" />
                      <span className="font-serif italic normal-case tracking-[0.15em]">
                        Piraeus
                      </span>
                      <span className="h-px w-8 bg-(--gold)/60 md:w-14" />
                    </div>
                  </div>
                </div>
              </Depth>
            </div>
          </div>

          {/* approximate distances */}
          <p className="mb-6 mt-20 text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark) md:mt-24">
            Approximate distances from Piraeus
          </p>
          <Reveal3D variant="rise">
            <ul className="grid grid-cols-1 divide-y divide-(--gold)/30 border-y border-(--gold)/50 md:grid-cols-5 md:divide-x md:divide-y-0">
              {connections.map(({ Icon, label, time, text }) => (
                <li
                  key={label}
                  className="group flex flex-col items-center px-6 py-10 text-center"
                >
                  <Icon className="h-9 w-9 text-(--navy) transition duration-500 group-hover:-translate-y-1 group-hover:text-(--gold-dark)" />
                  <span className="mt-5 font-serif text-xl font-bold text-(--gold-dark)">
                    {time}
                  </span>
                  <span className="mt-3 block h-px w-8 bg-(--gold)/60" />
                  <span className="mt-4 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-(--navy)">
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

      {/* ───────── DISCOVER PIRAEUS · paper ───────── */}
      <section className="relative bg-(--paper)">
        <Paper />
            <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          {/* title + intro */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Title title="Life by the harbour." sub="Discover Piraeus" />
            </div>
            <Reveal3D variant="flipRight" className="lg:col-span-5">
              <p className="text-sm leading-relaxed text-(--navy)/75 md:text-base">
                A seaside city with a strong Mediterranean character, where
                scenic harbours, cultural landmarks and a lively restaurant
                scene sit alongside everyday urban convenience.
              </p>
              <p className="mt-6 border-t border-(--gold)/40 pt-5 font-serif text-xl italic leading-snug text-(--gold-dark) md:text-2xl">
                Sea air. City energy. Heritage close by.
              </p>
            </Reveal3D>
          </div>

          {/* two landmarks: photo plate + client text */}
          <div className="mt-14 grid gap-16 md:mt-20 md:grid-cols-2 md:gap-10 lg:gap-16">
            {landmarks.map((l, i) => (
              <Reveal3D
                key={l.id}
                variant="rise"
                delay={i * 150}
                className={i === 1 ? "md:mt-16" : ""}
              >
                <Plate
                  src={l.src}
                  alt={l.alt}
                  caption={l.eyebrow}
                  aspect="aspect-[4/3]"
                  sizes="(min-width:768px) 520px, 95vw"
                />
                <div className="mt-10 px-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
                    {String(i + 1).padStart(2, "0")} · {l.eyebrow}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl font-bold uppercase leading-tight tracking-tight text-(--navy) md:text-3xl">
                    {l.name}
                  </h3>
                  <span className="mb-6 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                  <div className="space-y-4 text-sm leading-relaxed text-(--navy)/75 [&_strong]:font-semibold [&_strong]:text-(--navy)">
                    {l.paras.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              </Reveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA · navy with arcade ───────── */}
      <div className="bg-(--paper)">
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
              <Words text="Interested in the Olynthou Loft?" className="block" />
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              A 59 m² loft with 1 bedroom and 1 bathroom in Piraeus, at
              €315,000 and Golden Visa eligible. Contact us to arrange a viewing.
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