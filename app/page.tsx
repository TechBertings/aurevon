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

/* EDIT HERE: your photos. Put files in public/images/home/ and set the path,
   e.g. athens: "/images/home/athens.jpg". Leave null to show the placeholder. */
const IMAGES: Record<string, string | null> = {
  intro1: null /* whitewashed villa, vertical (arch) */,
  pool: "/images/pool.jpg"/* terrace or pool, wide */,
  stone:  "/images/stone.jpg" /* small detail: door, flowers, stone */,
  lifestyle1: "/images/lifestyle1.jpg", // sea views
  lifestyle2: "/images/lifestyle2.jpg", // modern living
  lifestyle3: "/images/lifestyle3.jpg", // history
  lifestyle4: "/images/lifestyle4.jpg", // quality of life
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

/* NEW — EDIT HERE: contact details */
const CONTACT = { phone: "+63 900 000 0000", email: "hello@aurevon.com" };

const features: Feature[] = [
  {
    icon: "sun",
    title: "Stunning Sea Views",
    text: "Wake up to the beauty of the Mediterranean with breathtaking views every day.",
    src: IMAGES.lifestyle1,
    label: "Santorini sunset over the sea",
    tone: "sunset",
  },
  {
    icon: "home",
    title: "Modern Living Spaces",
    text: "Designed for comfort, elegance and long-term value.",
    src: IMAGES.lifestyle2,
    label: "Modern living room with sea view",
    tone: "sea",
  },
  {
    icon: "temple",
    title: "Rich History & Culture",
    text: "Live close to world-famous historical sites, vibrant towns and authentic Mediterranean life.",
    src: IMAGES.lifestyle3,
    label: "Colourful harbour town",
    tone: "stone",
  },
  {
    icon: "leaf",
    title: "A Better Quality of Life",
    text: "Enjoy a peaceful, healthy and inspiring environment for you and your family.",
    src: IMAGES.lifestyle4,
    label: "Terrace dining at sunset",
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

/* EDIT HERE: placeholder listings, replace with real ones */
const properties = [
  {
    src: IMAGES.p1,
    place: "Athens Riviera, Greece",
    name: "Seafront Modern Villa",
    spec: "5 Beds · 5 Baths · 520 m²",
    price: "€2,450,000",
    tone: "sunset" as const,
  },
  {
    src: IMAGES.p2,
    place: "Santorini, Greece",
    name: "Caldera Cliff Residence",
    spec: "3 Beds · 3 Baths · 280 m²",
    price: "€1,875,000",
    tone: "sea" as const,
  },
  {
    src: IMAGES.p3,
    place: "Halkidiki, Greece",
    name: "Pine Bay Pool Villa",
    spec: "4 Beds · 4 Baths · 340 m²",
    price: "€985,000",
    tone: "pool" as const,
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
        <LifestyleStory features={features} />

        {/* ───────── NEW · FEATURED PROPERTIES ───────── */}
        <section className="relative overflow-hidden bg-(--cream)">
          <Paper />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">
                  Featured properties
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
                  Discover our finest selection
                </h2>
                <span className="mt-6 block h-px w-14 bg-(--gold)" />
                <p className="mt-6 text-sm leading-relaxed text-(--navy)/70">
                  From island retreats to city residences, find a home that
                  defines your lifestyle in Greece.
                </p>
                <a href="/properties" className={`${btnGold} mt-8`}>
                  View all properties <span aria-hidden>→</span>
                </a>
              </Reveal>
            </div>

            <ul className="grid gap-6 sm:grid-cols-3 lg:col-span-9">
              {properties.map((p, i) => (
                <li key={p.name}>
                  <Reveal delay={i * 120}>
                    <Tilt max={4}>
                      <article className="overflow-hidden rounded-xl border border-(--gold)/40 bg-(--navy)">
                        <div className="relative aspect-3/4">
                          <Ph
                            bare
                            src={p.src}
                            label={p.name}
                            tone={p.tone}
                            speed={0.03}
                            className="h-full w-full"
                          />
                          <div
                            aria-hidden
                            className="absolute inset-0 bg-linear-to-t from-(--navy-deep) via-(--navy-deep)/30 to-transparent"
                          />
                          <span className="absolute left-3 top-3 rounded bg-(--navy-deep)/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-(--gold-light)">
                            Featured
                          </span>
                          <div className="absolute inset-x-0 bottom-0 p-5">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">
                              {p.place}
                            </p>
                            <h3 className="mt-2 font-serif text-xl text-white">{p.name}</h3>
                            <p className="mt-1 text-xs text-white/70">
                              {p.spec}
                            </p>
                            <p className="mt-4 font-serif text-2xl text-(--gold-light)">
                              {p.price}
                            </p>
                          </div>
                        </div>
                      </article>
                    </Tilt>
                  </Reveal>
                </li>
              ))}
            </ul>
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

            {/* quick facts */}
            <ul className="mt-24 grid grid-cols-2 gap-y-10 border-t border-(--gold)/30 pt-12 md:grid-cols-4">
              {strip.map((s, i) => (
                <li
                  key={s.t}
                  className="md:border-l md:border-(--gold)/30 md:first:border-l-0"
                >
                  <Reveal delay={i * 130}>
                    <Tilt className="flex flex-col items-center gap-4 px-4 text-center">
                      <span
                        className="fx-anim block"
                        style={{
                          animation: `fx-float 6s ease-in-out ${i * 0.6}s infinite`,
                        }}
                      >
                        <Icon
                          name={s.icon}
                          className="h-10 w-10 text-(--gold-light)"
                        />
                      </span>
                      <p className="max-w-[14ch] text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90">
                        {s.t}
                      </p>
                    </Tilt>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── NEW · WHY CHOOSE US ───────── */}
        <section className="bg-(--cream) px-4 py-24 md:px-6">
          <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-(--gold)/50 bg-(--navy) text-white lg:grid-cols-12">
            <div className="p-8 md:p-10 lg:col-span-4 lg:border-r lg:border-(--gold)/25">
              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-(--gold-light)">
                  Why choose us
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
                  A standard above the rest
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/70">
                  Aurevon Global Partners combines local insight with
                  professional introductions to deliver unmatched results for
                  our clients.
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col justify-between gap-8 p-8 md:p-10 lg:col-span-4">
              <dl className="grid grid-cols-2 gap-y-8">
                {stats.map((s, i) => (
                  <Reveal key={s.l} delay={i * 100}>
                    <div>
                      <dd className="font-serif text-4xl text-(--gold-light)">
                        {s.n}
                      </dd>
                      <dt className="mt-1 text-xs text-white/70">{s.l}</dt>
                    </div>
                  </Reveal>
                ))}
              </dl>
              <p className="font-serif text-2xl italic text-(--gold-light)">
                Live exceptionally.
              </p>
            </div>

            <div className="relative min-h-64 lg:col-span-2">
              <Ph
                bare
                src={IMAGES.expert}
                label="Interior at night"
                tone="stone"
                speed={0.04}
                className="absolute inset-0 h-full w-full"
              />
            </div>

            <div className="flex flex-col justify-center gap-5 p-8 lg:col-span-2 lg:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--gold-light)">
                Speak to an expert
              </p>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="text-sm">
                {CONTACT.phone}
              </a>
              <a href="/contact" className={btnGold}>
                Book consultation
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-xs text-white/70 underline-offset-4 hover:underline"
              >
                Or email {CONTACT.email}
              </a>
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