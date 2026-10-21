import type { CSSProperties } from "react";
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
import PhotoSlider from "./components/photo-slider";

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
};

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
            <div className="relative mx-auto h-[560px] w-full max-w-md lg:col-span-6 lg:max-w-none">
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

        {/* ───────── PRIME LOCATIONS · navy ───────── */}
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