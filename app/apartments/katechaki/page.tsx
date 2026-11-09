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

/* ═════════════════════════════════════════════════════════════════
   KATECHAKI LOFT
   File location: app/apartments/katechaki_loft/page.tsx
   Same palette and RoomBook carousel as the other Aurevon pages, with its own layout:
   landscape hero with a cut top-left corner, stair dividers, cards + ledger,
   a floor plan section, map on the left with the list on the right.
   ═════════════════════════════════════════════════════════════════ */

export const metadata = {
  title: "Loft Apartment in Katechaki, Athens, Golden Visa Eligible | Aurevon Global Partners",
  description:
    "A 70 m² loft apartment in Katechaki, Athens. 2 bedrooms, 1 bathroom, access to a public garden, €325,000. Golden Visa eligible, 7 minutes on foot to Katechaki metro station.",
};

/* palette: same as the other pages (RoomBook depends on these variable names) */
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

/* Right-angle band: a row of small right triangles */
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
}) => <div aria-hidden className={`h-3.5 ${className}`} style={anglesBg(color)} />;

/* ───────── IMAGES ─────────
   All files go in public/images/. If your files are .jpg, change EXT to "jpg".
     katechaki-cover.png          brochure cover (hero)
     katechaki-living.png         living room with the entrance door, green sofa and kitchen
     katechaki-kitchen-long.png   the long kitchen photo from the "Few things about the location" page (crop off the white text panel)
     katechaki-kitchen.png        kitchen straight on (hob, oven, terrazzo splashback)
     katechaki-bedroom-1.png      bedroom with the wardrobes around the bed
     katechaki-bedroom-2.png      bedroom with the wall-mounted TV
     katechaki-floorplan.png      the floor plans page (crop to just the drawings)
     katechaki-map.png            the map with the gold frame and callouts
*/
const FOLDER = "/images";
const EXT = "png";
const img = (n: string) => `${FOLDER}/${n}.${EXT}`;

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

const TrainIcon = icon(
  <>
    <rect x="6" y="3.5" width="12" height="13" rx="3" />
    <path d="M6 11h12M9 14h.01M15 14h.01" />
    <path d="M8.5 20.5l2-4M15.5 20.5l-2-4" />
  </>,
);
const TreeIcon = icon(
  <>
    <circle cx="12" cy="9" r="5" />
    <path d="M12 14v7M9 21h6" />
  </>,
);
const HospitalIcon = icon(
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M12 8v8M8 12h8" />
  </>,
);
const KeyIcon = icon(
  <>
    <circle cx="8" cy="12" r="3.5" />
    <path d="M11.5 12H21M17 12v3M20 12v2" />
  </>,
);
const LoftIcon = icon(
  <>
    <rect x="4" y="3.5" width="16" height="17" />
    <path d="M4 10h9" />
    <path d="M13 20v-3h3v-3h4" />
  </>,
);
const GlassIcon = icon(
  <>
    <rect x="4" y="3.5" width="16" height="17" />
    <path d="M12 3.5v17M4 12h16" />
  </>,
);
const AppliancesIcon = icon(
  <>
    <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
    <path d="M5 10h14M8 6.5h2M8 13v4" />
  </>,
);
const WardrobeIcon = icon(
  <>
    <rect x="5" y="3.5" width="14" height="17" rx="1" />
    <path d="M12 3.5v17M10 11v2M14 11v2" />
  </>,
);

/* ═════════ EDIT HERE: page content ═════════ */
const loft = {
  price: "€325,000",
  tag: "Golden Visa eligible",
  heroSrc: img("katechaki-cover"),
  heroAlt:
    "Loft Apartment in Katechaki: double-height living with a staircase to the mezzanine. Golden Visa eligible, €325,000, 70 m², 2 bedrooms, 1 bathroom, access to a public garden.",
};

/* navy strip under the hero */
const stats: { n?: number; text?: string; label: string }[] = [
  { n: 70, label: "m² of living space" },
  { n: 2, label: "Bedrooms" },
  { n: 1, label: "Bathroom" },
  { text: loft.price, label: "Asking price" },
];

/* only what is visible in the brochure images; add anything else the brochure lists */
const features: { Icon: IconType; title: string; text: string }[] = [
  {
    Icon: LoftIcon,
    title: "Double-height living",
    text: "A tall living space with a light staircase up to the mezzanine and timber flooring.",
  },
  {
    Icon: AppliancesIcon,
    title: "Sage-green kitchen",
    text: "Slim black handles, a timber worktop, a terrazzo splashback and a built-in hob and oven.",
  },
  {
    Icon: GlassIcon,
    title: "Tall steel-framed glass",
    text: "Black-framed glazing beside the entrance door brings light into the double-height space.",
  },
  {
    Icon: WardrobeIcon,
    title: "Bedroom storage",
    text: "Full-height wardrobes in both bedrooms, with bedside storage in one.",
  },
  {
    Icon: TreeIcon,
    title: "Public garden access",
    text: "The apartment has access to a public garden.",
  },
  {
    Icon: KeyIcon,
    title: "Golden Visa eligible",
    text: "Qualifies for the Greek Golden Visa programme.",
  },
];

/* spec ledger */
const ledger: { label: string; value: string }[] = [
  { label: "Interior", value: "70 m²" },
  { label: "Bedrooms", value: "2" },
  { label: "Bathroom", value: "1" },
  { label: "Layout", value: "Loft with mezzanine" },
  { label: "Outdoor", value: "Public garden access" },
  { label: "To Katechaki Metro", value: "7 min on foot" },
  { label: "Asking price", value: loft.price },
];

/* EDIT HERE: the five pages of the book, in the order they flip */
const rooms = [
  {
    id: "living",
    group: "Living & kitchen",
    title: "Living and entrance",
    text: "Tall steel-framed glazing at the entrance, a green sofa and a round coffee table, with the kitchen running along the right.",
    src: img("katechaki-living"),
    alt: "Living room with the entrance door, tall glazing, a green sofa and the kitchen with a terrazzo splashback",
  },
  {
    id: "kitchen-long",
    group: "Living & kitchen",
    title: "The long kitchen",
    text: "A single run of sage-green cabinetry with a timber worktop and a breakfast bar with two stools.",
    src: img("katechaki-kitchen-long"),
    alt: "Long sage-green kitchen with a timber worktop, terrazzo splashback and a breakfast bar with two stools",
  },
  {
    id: "kitchen",
    group: "Living & kitchen",
    title: "Kitchen detail",
    text: "Sage-green units with slim black handles, a built-in hob and oven, and a steel sink below the terrazzo tiling.",
    src: img("katechaki-kitchen"),
    alt: "Kitchen with sage-green units, a built-in oven and hob, a steel sink and a terrazzo splashback",
  },
  {
    id: "bedroom-1",
    group: "Sleeping",
    title: "Bedroom one",
    text: "Full-height wardrobes frame the bed, with bedside storage and overhead cabinets.",
    src: img("katechaki-bedroom-1"),
    alt: "Bedroom with full-height wardrobes around a double bed and bedside storage",
  },
  {
    id: "bedroom-2",
    group: "Sleeping",
    title: "Bedroom two",
    text: "A wall of wardrobes, a wall-mounted TV and track lighting along a pale ceiling beam.",
    src: img("katechaki-bedroom-2"),
    alt: "Bedroom with a wall of wardrobes, a wall-mounted TV and track lighting",
  },
];

/* contents strip next to the book title (matches the page order above) */
const chapters = [
  { range: "I – III", label: "Living & kitchen" },
  { range: "IV – V", label: "Sleeping" },
];

/* location. x / y = where each ring sits on the map image, in %. Nudge them if a ring looks slightly off. */
const places: { id: string; name: string; time: string; x: number; y: number }[] = [
  { id: "loft", name: "The loft", time: "Your property", x: 88, y: 39 },
  { id: "metro", name: "Katechaki Metro Station", time: "7 min on foot", x: 77, y: 85.5 },
  { id: "sotiria", name: "Sotiria Thoracic Diseases Hospital", time: "8 min on foot", x: 93.5, y: 89 },
  { id: "goudi", name: "Goudi Metropolitan Park", time: "5 min by car", x: 27.5, y: 54.5 },
  { id: "henry", name: "Henry Dunant Hospital", time: "5 min by car", x: 56, y: 69.5 },
  { id: "pedion", name: "Pedion tou Areos", time: "16 min by car", x: 38, y: 37 },
  { id: "likavitos", name: "Likavitos Hill", time: "20 min by car", x: 12, y: 29 },
];

/* hover / tap on a row shows the matching ring on the map (pure CSS) */
const hoverCss = places
  .map(
    (p) =>
      `.loc-explorer:has([data-place=${p.id}]:is(:hover,:focus)) [data-pin=${p.id}]{opacity:1;scale:1}`,
  )
  .join("\n");

/* only what the map and brochure state */
const pillars: { n: string; Icon: IconType; title: string; body: string }[] = [
  {
    n: "01",
    Icon: TreeIcon,
    title: "Green spaces",
    body: "The apartment has access to a public garden. Goudi Metropolitan Park is 5 minutes away by car, Pedion tou Areos 16 minutes and Likavitos Hill 20 minutes.",
  },
  {
    n: "02",
    Icon: HospitalIcon,
    title: "Healthcare",
    body: "Henry Dunant Hospital is 5 minutes away by car, and Sotiria Thoracic Diseases Hospital is 8 minutes on foot.",
  },
  {
    n: "03",
    Icon: TrainIcon,
    title: "Getting around",
    body: "Katechaki Metro Station is a 7-minute walk from the loft.",
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

/* Staircase divider (echoes the staircase in the loft) */
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

/* Landscape hero photo with the top-left corner cut on the diagonal (the cover has nothing there) */
const CUT = "polygon(0 13%, 16% 0, 100% 0, 100% 100%, 0 100%)";
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

/* Simple framed picture: thin offset outline, caption on the left */
function Plate({
  src,
  alt,
  caption,
  sizes,
  aspect = "aspect-[16/9]",
  contain = false,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  sizes: string;
  aspect?: string;
  contain?: boolean;
  className?: string;
}) {
  return (
    <figure className={`relative ${className}`}>
      <div aria-hidden className="absolute -inset-3 border border-(--gold)/40" />
      <div
        className={`relative ${aspect} w-full overflow-hidden ${contain ? "bg-white" : "bg-(--paper)"}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={contain ? "object-contain" : "object-cover"}
        />
        {!contain && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(90,60,15,0.35)]"
          />
        )}
      </div>
      <figcaption className="mt-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">
        <span className="h-px w-8 bg-(--gold)/60" />
        {caption}
      </figcaption>
    </figure>
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

export default function KatechakiLoftPage() {
  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      <S3Styles />
      <ScrollBar />

      {/* ───────── HERO · sky to gold, wide cut-corner photo ───────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-(--sky) via-[#f6efe0] to-[#f4d9a8] pt-32 md:pt-40">
        <div aria-hidden className="absolute inset-0" style={glow("85% 85%", 0.45)} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 md:pb-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal3D variant="flipLeft">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--navy)/70">
                Katechaki, Athens
              </p>
            </Reveal3D>
            <h1 className="mt-6 font-serif text-5xl font-bold uppercase leading-[1.02] tracking-tight md:text-7xl">
              <Words text="Katechaki" className="block" />
              <Words
                text="Loft"
                className="block"
                delay={300}
                wordClass="bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-transparent"
              />
            </h1>
            <Reveal3D variant="rise" delay={500}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-(--navy)/80">
                A 70 m² loft apartment with double-height living, 2 bedrooms, 1 bathroom and access
                to a public garden, 7 minutes on foot from Katechaki metro station.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Tag>{loft.tag}</Tag>
                <span className="text-sm font-semibold text-(--navy)">{loft.price}</span>
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
                  Tour the loft
                </a>
              </div>
            </Reveal3D>
          </div>

          {/* landscape photo with the same shape echoed as a brass outline behind it */}
          <HeroStage className="relative flex justify-center lg:col-span-7">
            <div className="relative w-full max-w-[40rem]">
              <svg
                aria-hidden
                viewBox="0 0 905 637"
                preserveAspectRatio="none"
                style={layer(-12, -6, -25, 0, 4)}
                className="absolute inset-0 h-full w-full translate-x-5 translate-y-5 overflow-visible"
              >
                <path
                  d="M0 83L145 0H905V637H0Z"
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
                    src={loft.heroSrc}
                    alt={loft.heroAlt}
                    priority
                    sizes="(min-width:1024px) 640px, 95vw"
                    className="aspect-[905/637] w-full"
                  />
                </Reveal3D>
              </div>
            </div>
          </HeroStage>
        </div>
        <Angles className="relative opacity-70" />
      </section>

      {/* ───────── STATS · navy strip ───────── */}
      <section className="bg-(--navy)">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-(--gold)/30 px-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal3D
              key={s.label}
              variant="flipCard"
              delay={i * 140}
              className="px-4 py-8 text-center md:px-8"
            >
              <dd className="font-serif text-4xl font-bold text-(--gold-light) md:text-5xl">
                {s.n !== undefined ? <Counter to={s.n} /> : s.text}
              </dd>
              <dt className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/80 md:text-[11px]">
                {s.label}
              </dt>
            </Reveal3D>
          ))}
        </dl>
      </section>

      {/* ───────── PROPERTY FEATURES · cream, feature cards left + ledger right ───────── */}
      <section className="relative bg-(--cream)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:order-2 lg:col-span-5">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
                Property features
              </p>
              <Title title="A loft with room to breathe." sub="One loft apartment" />
              <Reveal3D variant="flipRight" delay={150}>
                <p className="mt-8 max-w-sm text-sm leading-relaxed text-(--navy)/75">
                  Double-height living, a mezzanine level and a calm, light-filled finish, with
                  access to a public garden.
                </p>
                <dl className="mt-8 border-t border-(--gold)/40">
                  {ledger.map((r) => (
                    <div
                      key={r.label}
                      className="flex items-baseline justify-between gap-6 border-b border-(--gold)/20 py-4"
                    >
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.3em] text-(--navy)/60">
                        {r.label}
                      </dt>
                      <dd className="text-right font-serif text-xl font-bold text-(--navy)">
                        {r.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal3D>
            </div>

            <div className="lg:order-1 lg:col-span-7">
              <ul className="grid gap-4 sm:grid-cols-2">
                {features.map(({ Icon, title, text }, i) => (
                  <Reveal3D key={title} variant="flipCard" delay={i * 90}>
                    <li className="h-full border border-(--gold)/40 bg-white p-6">
                      <Icon className="h-8 w-8 text-(--gold-dark)" />
                      <h3 className="mt-4 font-serif text-lg font-bold text-(--navy)">{title}</h3>
                      <span className="mb-3 mt-3 block h-0.5 w-10 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                      <p className="text-sm leading-relaxed text-(--navy)/70">{text}</p>
                    </li>
                  </Reveal3D>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── FLOOR PLAN · paper ───────── */}
      <section className="relative border-t border-(--gold)/30 bg-(--paper)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Title title="The plan, level by level." sub="Floor plans" center />
          <Reveal3D variant="zoom" className="mx-auto mt-14 max-w-4xl">
            <Plate
              src={img("katechaki-floorplan")}
              alt="Floor plans of the Katechaki loft, drawn and rendered, showing both levels"
              caption="The loft, both levels"
              aspect="aspect-[700/464]"
              contain
              sizes="(min-width:1024px) 896px, 95vw"
            />
          </Reveal3D>
        </div>
      </section>

      {/* ───────── ROOMS · flipping book, title left + contents right ───────── */}
      <div className="bg-(--paper)">
        <Steps />
      </div>
      <section
        id="rooms"
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
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Title title="Walk through the loft." sub="Flip through five rooms" dark />
            </div>
            <ul className="grid grid-cols-2 divide-x divide-(--gold)/30 border-y border-(--gold)/30 text-center lg:col-span-6">
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
          </div>

          <div className="mt-12">
            <RoomBook pages={rooms} />
          </div>
        </div>
      </section>
      <div className="bg-(--cream)">
        <Steps flip />
      </div>

      {/* ───────── LOCATION · cream, map left + list right ───────── */}
      <section id="location" className="relative -mt-px scroll-mt-20 bg-(--cream)">
        <Paper />
        <style dangerouslySetInnerHTML={{ __html: hoverCss }} />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="loc-explorer grid gap-14 lg:grid-cols-12 lg:items-center">
            {/* title + list */}
            <div className="lg:order-2 lg:col-span-5">
              <Title title="Katechaki, close to everything." sub="Location" />
              <Reveal3D variant="rise" delay={150}>
                <p className="mt-8 max-w-sm text-sm leading-relaxed text-(--navy)/75">
                  Hover or tap a place to find it on the map, with its travel time from the loft.
                </p>
                <ul className="mt-6 border-t border-(--gold)/40">
                  {places.map(({ id, name, time }) => (
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
                      <span className="whitespace-nowrap font-serif font-bold text-(--navy) transition-colors group-hover:text-(--gold-dark) group-focus:text-(--gold-dark)">
                        {time}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal3D>
            </div>

            {/* map */}
            <div className="lg:order-1 lg:col-span-7 lg:-ml-10 xl:-ml-16">
              <Depth axis="y" rotate={6} lift={70}>
                <div className="relative">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-(--gold)/50 md:translate-x-5 md:translate-y-5"
                  />
                  <div className="relative aspect-[690/446] w-full overflow-hidden bg-(--paper) shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] ring-1 ring-(--gold)/60">
                    <Image
                      src={img("katechaki-map")}
                      alt="Aerial map of Katechaki showing the loft and nearby places with travel times"
                      fill
                      sizes="(min-width:1024px) 58vw, 95vw"
                      className="object-cover"
                    />
                    {places.map(({ id, x, y }) => (
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
              </Depth>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── AROUND THE LOFT · paper, three numbered columns ───────── */}
      <section className="relative border-t border-(--gold)/30 bg-(--paper)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Title title="Everything close at hand." sub="Around the loft" center />
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-(--gold)/30">
            {pillars.map((p, i) => (
              <Reveal3D
                key={p.n}
                variant="rise"
                delay={i * 120}
                className="md:px-8 first:md:pl-0 last:md:pr-0"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-5xl font-bold text-(--gold)/70">{p.n}</span>
                  <p.Icon className="h-9 w-9 text-(--gold-dark)" />
                </div>
                <h3 className="mt-3 font-serif text-2xl font-bold text-(--navy)">{p.title}</h3>
                <span className="mb-5 mt-3 block h-0.5 w-10 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                <p className="text-sm leading-relaxed text-(--navy)/75">{p.body}</p>
              </Reveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA · navy with steps ───────── */}
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
              <Words text="Interested in the Katechaki Loft?" className="block" />
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              A 70 m² loft with 2 bedrooms, 1 bathroom and access to a public garden, at{" "}
              {loft.price} and Golden Visa eligible. Contact us to arrange a viewing.
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