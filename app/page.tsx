import type { CSSProperties, ReactNode } from "react";
import Hero from "./components/hero";
import {
  FxStyles,
  Icon,
  Marquee,
  Paper,
  Parallax,
  Ph,
  Reveal,
  Tilt,
  Title,
  Wave,
  Words,
  type IconName,
} from './components/fx';
import {
  LifestyleStory,
  LocationExplorer,
  type Feature,
  type Place,
} from "./components/home-story";
import { glow } from './components/glow';
import PropertyCarousel, { type Property } from "./components/property-carousel";


/* EDIT HERE: brochure palette (same as About and Santa Sophia) */
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
}) => <div aria-hidden className={`h-3.5 ${className}`} style={meanderBg(color)} />;
/* EDIT HERE: your photos. Put files in public/images/home/ and set the path,
   e.g. athens: "/images/home/athens.jpg". Leave null to show the placeholder. */
const IMAGES: Record<string, string | null> = {
  intro1: null /* whitewashed villa, vertical (arch) */,
  pool: "/images/pool.jpg"/* terrace or pool, wide */,
  stone:  "/images/stone.jpg" /* small detail: door, flowers, stone */,
  loc1: "/images/location-1.jpg", // Acropolis at sunset,
  loc2: "/images/location-2.jpg", // villa on a turquoise bay
  loc3: "/images/location-3.jpg", // harbour and lighthouse
  loc4: "/images/location-4.jpg", // seaside town under a fortress
  athens: "/images/athens.jpg" /* Acropolis */,
  santorini: "/images/santorini.jpg" /* blue-domed church */,
  mykonos: "/images/mykonos.jpg" /* windmills */,
  crete: "/images/crete.jpg" /* turquoise beach */,
  thessaloniki: "/images/thessaloniki.jpg" /* White Tower and waterfront */,
  halkidiki: "/images/halkidiki.jpg" /* beach and pine trees */,
  finale: "/images/finale.jpg" /* terrace pool at sunset, wide */,
  /* NEW: featured properties + why-choose-us photo */
  p1: null /* property 1, vertical */,
  p2: null /* property 2, vertical */,
  p3: null /* property 3, vertical */,
  expert: null /* interior at night, vertical */,
};



const features: Feature[] = [
  {
    icon: "temple",
    title: "Rich History & Culture",
    text: "Live close to world-famous historical sites, vibrant towns and authentic Mediterranean life.",
    src: IMAGES.loc1,
    label: "The Acropolis at sunset",
    tone: "sunset",
  },
  {
    icon: "sun",
    title: "Stunning Sea Views",
    text: "Wake up to the beauty of the Mediterranean with breathtaking views every day.",
    src: IMAGES.loc2,
    label: "A villa above a turquoise bay",
    tone: "sea",
  },
  {
    icon: "home",
    title: "Relaxed Harbour Living",
    text: "Waterfront cafés, fresh seafood and a slower rhythm of life on the Greek coast.",
    src: IMAGES.loc3,
    label: "Harbour and lighthouse at golden hour",
    tone: "stone",
  },
  {
    icon: "leaf",
    title: "A Better Quality of Life",
    text: "Enjoy a peaceful, healthy and inspiring environment for you and your family.",
    src: IMAGES.loc4,
    label: "Seaside town beneath the fortress",
    tone: "pool",
  },
];

/* x and y place each pin on the map (400 x 440). Move them if you swap the map. */
const places: Place[] = [
  {
    name: "Athens",
    text: "Modern city living with high rental demand.",
    src: IMAGES.athens,
    tone: "stone",
    x: 213,
    y: 240,
  },
  {
    name: "Santorini",
    text: "Iconic views and luxury investments.",
    src: IMAGES.santorini,
    tone: "sea",
    x: 272,
    y: 340,
  },
  {
    name: "Mykonos",
    text: "World-famous destination with high rental returns.",
    src: IMAGES.mykonos,
    tone: "sunset",
    x: 276,
    y: 286,
  },
  {
    name: "Crete",
    text: "Natural beauty and a growing market.",
    src: IMAGES.crete,
    tone: "sea",
    x: 226,
    y: 392,
  },
  {
    name: "Thessaloniki",
    text: "A growing city with strong prospects.",
    src: IMAGES.thessaloniki,
    tone: "sky",
    x: 214,
    y: 84,
  },
  {
    name: "Halkidiki",
    text: "Stunning beaches and family-friendly areas.",
    src: IMAGES.halkidiki,
    tone: "sea",
    x: 252,
    y: 104,
  },
];

const strip: { icon: IconName; t: string }[] = [
  { icon: "sun", t: "Sunny climate" },
  { icon: "diamond", t: "World-class lifestyle" },
  { icon: "family", t: "Family friendly" },
  { icon: "chart", t: "Long-term investment" },
];

const ribbon = [
  "Live",
  "Invest",
  "Build your future",
  "Greece property & residency opportunities",
  "Live",
  "Invest",
  "Build your future",
  "Greece property & residency opportunities",
];

/* ───────── NEW: services, featured properties, stats ───────── */
function Svg({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-10 w-10 text-(--gold)"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const services: { t: string; d: string; icon: ReactNode }[] = [
  {
    t: "Selected Properties",
    d: "Curated homes across Greece’s best locations.",
    icon: (
      <Svg>
        <path d="M14 8h20l8 11-18 21L6 19l8-11Z" />
        <path d="M6 19h36M18 19l6 21 6-21M24 8l-4 11M24 8l4 11" />
      </Svg>
    ),
  },
  {
    t: "Virtual Viewings",
    d: "See properties from Manila, wherever you are.",
    icon: (
      <Svg>
        <rect x="5" y="15" width="38" height="18" rx="7" />
        <path d="M18 33c2-4 10-4 12 0" />
        <circle cx="24" cy="24" r="2" />
      </Svg>
    ),
  },
  {
    t: "Personal Coordination",
    d: "One point of contact for a smooth journey.",
    icon: (
      <Svg>
        <path d="M8 22 24 8l16 14v18H8V22Z" />
        <path d="M19 40V28h10v12" />
      </Svg>
    ),
  },
  {
    t: "Secure Transactions",
    d: "Your privacy and safety come first.",
    icon: (
      <Svg>
        <path d="M24 5 8 11v12c0 10 7 17 16 20 9-3 16-10 16-20V11L24 5Z" />
        <path d="m17 24 5 5 9-10" />
      </Svg>
    ),
  },
];

const properties: Property[] = [
  {
    slug: "seizani_loft",
    src: "/images/living-1.png",
    name: "Seizani Loft",
    tag: "Golden Visa",
    facts: ["Nea Ionia, Athens", "Loft · 2 units", "Delivery ready"],
    stats: [{ n: "1", l: "Bedroom" }, { n: "55 m²", l: "Each" }],
    price: "€250,000",
  },
  {
    slug: "pythagoras",
    src: "/images/stairs-1.png",
    name: "Pythagoras Loft",
    tag: "Golden Visa",
    facts: ["Korydallos, Athens", "Loft apartment", "0.9 km to metro"],
    stats: [{ n: "2", l: "Bedrooms" }, { n: "80 m²", l: "Living" }],
    price: "€290,000",
  },
  {
    slug: "piraeus_olynthou",
    src: "/images/living-3.png",
    name: "Olynthou Loft",
    tag: "Golden Visa",
    facts: ["Piraeus, Athens", "Loft apartment", "20 min to centre"],
    stats: [{ n: "1", l: "Bedroom" }, { n: "59 m²", l: "Living" }],
    price: "€315,000",
  },
  {
    slug: "drapetsona",
    src: "/images/drapetsona-cover.png",
    name: "Drapetsona",
    tag: "Golden Visa",
    facts: ["Drapetsona, Piraeus", "2 apartments", "1st floor"],
    stats: [{ n: "1", l: "Bedroom" }, { n: "57–62 m²", l: "Size" }],
    price: "€290,000",
    from: true,
  },
  {
    slug: "santa_sophia",
    src: "/images/balconies-2.jpg",
    name: "Santa Sophia",
    tag: "Apartments",
    facts: ["Athens", "Design direction", "Light & greenery"],
    stats: [{ n: "9", l: "Details" }, { n: "3", l: "Themes" }],
    price: "On request",
  },
  {
    slug: "sea-view-villa",
    src: "/images/villa-front.png",
    name: "Sea View Villa",
    tag: "Private villa",
    facts: ["Vourvoulos, Santorini", "Unobstructed sea view", "Walk to the beach"],
    stats: [{ n: "4", l: "Bedrooms" }, { n: "150 m²", l: "Residence" }],
    price: "On request",
  },
  {
    slug: "villa-porto-rafti",
    src: "/images/villa-pool-1.png",
    name: "Porto Rafti",
    tag: "Pool estate",
    facts: ["Eastern Attica", "2 buildings", "5 min to the beach"],
    stats: [{ n: "6,020 m²", l: "Plot" }, { n: "100 m²", l: "Pool" }],
    price: "On request",
  },
];


/* EDIT HERE: placeholder numbers, replace with real ones */
const stats = [
  { n: "500+", l: "Happy clients" },
  { n: "6", l: "Prime regions" },
  { n: "120+", l: "Properties reviewed" },
  { n: "10+", l: "Years of experience" },
];

const btnGold =
  "inline-flex items-center justify-center gap-3 rounded-md bg-(--gold) px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-(--navy-deep) transition hover:bg-(--gold-light) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--gold-light)";

export default function Home() {
  return (
    <>
      <FxStyles />
      <Hero />

      <div style={palette} className="bg-(--cream) text-(--navy)">
        {/* ───────── RIBBON ───────── */}
        <div className="bg-linear-to-r from-(--gold) via-(--gold-light) to-(--gold) py-4 text-(--navy)">
          <Marquee items={ribbon} />
        </div>

        {/* ───────── NEW · EXCLUSIVE SERVICES ───────── */}
        <section className="border-b border-(--gold)/15 bg-(--paper)">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4 lg:border-r lg:border-(--gold)/30 lg:pr-10">
              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">
                  Exclusive services
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
                  Tailored for extraordinary living
                </h2>
              </Reveal>
            </div>
            <ul className="grid grid-cols-2 gap-8 lg:col-span-8 lg:grid-cols-4">
              {services.map((s, i) => (
                <li key={s.t}>
                  <Reveal delay={i * 100}>
                    {s.icon}
                    <h3 className="mt-4 text-base font-medium">{s.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-(--navy)/70">
                      {s.d}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── ABOUT / INTRO ───────── */}
        <section className="relative overflow-hidden bg-(--cream)">
          <Paper />
          <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 py-24 md:py-32 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-(--gold-dark)">
                  <span className="h-px w-10 bg-(--gold)" />
                  About Aurevon
                </p>
              </Reveal>
              <h2 className="mt-6 font-serif text-4xl font-bold uppercase leading-[1.05] tracking-tight md:text-6xl">
                <Words text="More than a property" className="block" />
                <Words
                  text="a lifestyle you deserve"
                  className="block"
                  delay={350}
                  wordClass="bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-transparent"
                />
              </h2>
              <Reveal delay={200}>
                <p className="mt-8 max-w-lg text-lg leading-relaxed text-(--navy)/80">
                  Own a home in one of Europe’s most beautiful countries and
                  enjoy a lifestyle of sun, sea, culture and opportunity.
                </p>
              </Reveal>
              <Reveal delay={350}>
                <p className="mt-5 max-w-lg leading-relaxed text-(--navy)/70">
                  Aurevon Global Partners connects Philippine investors and
                  families with selected property opportunities in Greece,
                  with practical coordination and professional introductions
                  along the way.
                </p>
              </Reveal>
            </div>

            {/* floating collage: each piece moves at its own speed */}
            <div className="relative mx-auto h-560p] w-full max-w-md lg:col-span-6 lg:max-w-none">
              <Parallax speed={0.1} className="absolute right-0 top-0 w-[58%]">
                <Reveal variant="wipe-up" duration={1100}>
                  <Tilt>
                    <Ph
                      src={IMAGES.intro1}
                      label="Whitewashed villa"
                      tone="sunset"
                      arch
                      priority
                      className="aspect-3/4 w-full"
                    />
                  </Tilt>
                </Reveal>
              </Parallax>

              <Parallax
                speed={-0.06}
                className="absolute bottom-0 left-0 w-[56%]"
              >
                <Reveal variant="left" delay={250}>
                  <Tilt max={6}>
                    <Ph
                      src={IMAGES.pool}
                      label="Terrace and pool"
                      tone="pool"
                      speed={0.04}
                      className="aspect-4/3 w-full"
                    />
                  </Tilt>
                </Reveal>
              </Parallax>

              <Parallax speed={0.2} className="absolute left-[6%] top-[6%] w-[30%]">
                <Reveal variant="zoom" delay={500}>
                  <div
                    className="fx-anim"
                    style={{ animation: "fx-float 7s ease-in-out infinite" }}
                  >
                    <Ph
                      src={IMAGES.stone}
                      label="Stone detail"
                      tone="stone"
                      speed={0.03}
                      className="aspect-square w-full"
                    />
                  </div>
                </Reveal>
              </Parallax>

              {/* rotating seal */}
              <div
                aria-hidden
                className="absolute left-[42%] top-[50%] z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-(--navy) shadow-2xl"
              >
                <svg
                  viewBox="0 0 120 120"
                  className="fx-anim absolute inset-0 h-full w-full"
                  style={{ animation: "fx-spin 22s linear infinite" }}
                >
                  <defs>
                    <path
                      id="fx-seal"
                      d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0"
                    />
                  </defs>
                  <text
                    fontSize="9.5"
                    letterSpacing="3.2"
                    className="fill-(--gold-light) font-semibold uppercase"
                  >
                    <textPath href="#fx-seal">
                      Live · Invest · Build your future ·
                    </textPath>
                  </text>
                </svg>
                <Icon name="home" className="h-8 w-8 text-(--gold-light)" />
              </div>
            </div>
          </div>
        </section>

        {/* ───────── WHY GREECE · pinned scroll story ───────── */}
      <div className="bg-(--cream)">
  <Wave />
</div>
<LifestyleStory features={features} />
<div className="bg-(--cream)">
  <div className="bg-(--navy)">
    <Wave flip />
  </div>
</div>

{/* ───────── NEW · FEATURED PROPERTIES ───────── */}
<section className="relative overflow-hidden bg-(--cream) pb-24">
  <Paper />
  <div className="relative mx-auto max-w-3xl px-6 pt-24 text-center">
    <Reveal>
      <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
        Featured properties
      </p>
      <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
        Discover our finest selection
      </h2>
      <span className="mx-auto mt-6 block h-0.5 w-16 bg-linear-to-r from-(--gold) to-(--gold-light)" />
      <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-(--navy)/70">
        From island retreats to city residences, find a home that
        defines your lifestyle in Greece.
      </p>
    </Reveal>
  </div>
  <div className="relative mt-12">
    <PropertyCarousel items={properties} />
  </div>
</section>



        {/* ───────── PRIME LOCATIONS ───────── */}
        <div className="bg-(--paper)">
          <Wave />
        </div>
  <section
  className="relative -mt-px overflow-hidden bg-(--navy) text-white"
  style={glow("50% 0%", 0.25)}
>
  <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-8 md:pb-28">
    <Reveal>
      <Title
        dark
        center
        title="Prime locations in Greece"
        sub="Iconic cities. Stunning islands. Exceptional opportunities."
      />
    </Reveal>
    <div className="mt-16">
      <LocationExplorer places={places} />
    </div>
  </div>
</section>
{/* ───────── QUICK FACTS · khaki band with Greek key ───────── */}
<section className="relative -mt-px bg-(--cream)">
  <Paper />
  <div className="relative mx-auto max-w-5xl px-6">
    {/* top border */}
    <div className="pt-10 md:pt-14">
      <span className="block h-px w-full bg-(--gold)/50" />
      <Meander className="mt-2 opacity-70" />
    </div>

    <ul className="grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4 md:py-16">
      {strip.map((s, i) => (
        <li
          key={s.t}
          className="md:border-l md:border-(--navy)/15 md:first:border-l-0"
        >
          <Reveal delay={i * 120}>
            <div className="flex flex-col items-center gap-4 px-4 text-center">
              <Icon name={s.icon} className="h-9 w-9 text-(--gold-dark)" />
              <p className="max-w-[14ch] text-[11px] font-semibold uppercase tracking-[0.22em] text-(--navy)/80">
                {s.t}
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>

    {/* bottom border */}
    <div className="pb-10 md:pb-14">
      <Meander className="opacity-70" />
      <span className="mt-2 block h-px w-full bg-(--gold)/50" />
    </div>
  </div>
</section>

        {/* ───────── FINALE · full-bleed photo ───────── */}
        <section className="relative isolate flex min-h-[85vh] items-end overflow-hidden bg-(--navy-deep)">
          <div className="absolute inset-0 -z-10">
            <Ph
              bare
              src={IMAGES.finale}
              label="Terrace pool at sunset"
              tone="pool"
              speed={0.12}
              sizes="100vw"
              className="h-full w-full"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-linear-to-b from-(--navy) via-(--navy)/10 to-(--navy-deep)/90"
          />
          <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-40 md:pb-28">
            <Reveal variant="wipe" duration={1200}>
              <span className="block h-px w-24 bg-(--gold-light)" />
            </Reveal>
            <blockquote className="mt-8 max-w-3xl font-serif text-4xl italic leading-tight text-white md:text-6xl">
              <Words
                text="Invest in a place where every day feels like a holiday."
                step={90}
              />
            </blockquote>
            <Reveal delay={700}>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.4em] text-(--gold-light)">
                Aurevon Global Partners
              </p>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}