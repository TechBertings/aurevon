import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import PhotoSlider from "../../components/photo-slider";
import {
  Counter,
  Depth,
  HeroStage,
  Marquee,
  Reveal3D,
  S3Styles,
  ScrollBar,
  Tilt3D,
  Words,
} from "../../components/scroll-3d";

export const metadata = {
  title: "Santa Sophia | Aurevon Global Partners",
  description:
    "Design direction for Santa Sophia: light, materials, planting and metal details.",
};

/* EDIT HERE: same brochure palette as the About page */
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

/* Greek key (meander) band, the classic European border */
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
  <div
    aria-hidden
    className={`h-3.5 ${className}`}
    style={meanderBg(color)}
  />
);

/* EDIT HERE: image folder inside /public. "/images" = public/images/light-1.jpg */
const FOLDER = "/images";
const img = (n: string) => `${FOLDER}/${n}.jpg`;

type Section = {
  id: string;
  group: string;
  title: string;
  text: string;
  photos: { src: string; alt: string }[];
  square?: boolean;
};

const photos = (name: string, count: number, alt: string) =>
  Array.from({ length: count }, (_, i) => ({
    src: img(`${name}-${i + 1}`),
    alt: `${alt} ${i + 1}`,
  }));

/* EDIT HERE: titles, descriptions and photo counts for every section */
const sections: Section[] = [
  {
    id: "light",
    group: "Feeling",
    title: "Light and shadow",
    text: "Screens and openings that draw patterned light across floors and walls as the day moves.",
    photos: photos("light", 4, "Light and shadow"),
  },
  {
    id: "fins",
    group: "Materials",
    title: "White metal fins",
    text: "Slim vertical fins that give the facade rhythm while keeping privacy and airflow.",
    photos: photos("fins", 3, "White metal fins"),
  },
  {
    id: "balconies",
    group: "Spaces",
    title: "First floor front balconies",
    text: "Shaded, screened balconies that feel open to the sky yet private from the street.",
    photos: photos("balconies", 4, "Front balcony"),
  },
  {
    id: "plants",
    group: "Feeling",
    title: "Plants",
    text: "Planters and greenery set against raw, quiet walls to soften the architecture.",
    photos: photos("plants", 3, "Plants"),
  },
  {
    id: "surfaces",
    group: "Materials",
    title: "Surfaces",
    text: "A calm palette of mineral tones, with ribbed textures as the accent.",
    photos: photos("surfaces", 6, "Surface sample"),
    square: true,
  },
  {
    id: "metal",
    group: "Materials",
    title: "Metal details",
    text: "Fine railings and screens that add pattern without closing the space in.",
    photos: photos("metal", 3, "Metal detail"),
  },
  {
    id: "entrances",
    group: "Spaces",
    title: "Ground floor entrances",
    text: "Glass block and framed glazing that let daylight into the entry while keeping it private.",
    photos: photos("entrances", 3, "Ground floor entrance"),
  },
  {
    id: "garden",
    group: "Spaces",
    title: "Ground floor garden",
    text: "Small courtyards and planted edges that bring green into the ground floor living areas.",
    photos: photos("garden", 3, "Ground floor garden"),
  },
  {
    id: "interior",
    group: "Spaces",
    title: "Interior inspiration",
    text: "Soft green cabinetry, warm timber and hanging planters that carry the garden indoors.",
    photos: photos("interior", 5, "Interior inspiration"),
  },
];

/* Roman numerals: the sections are a fixed sequence, so numbering earns its place */
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const roman = (n: number) => ROMAN[n - 1] ?? String(n);

const groups = [...new Set(sections.map((s) => s.group))];
const stats = [
  { n: sections.length, label: "Design details" },
  { n: groups.length, label: "Themes" },
  {
    n: sections.reduce((a, s) => a + s.photos.length, 0),
    label: "Reference images",
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

export default function SantaSophiaPage() {
  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      <S3Styles />
      <ScrollBar />

      {/* ───────── HERO · sky to sunset, layered 3D ───────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-(--sky) via-[#f6efe0] to-[#f4d9a8] pt-32 md:pt-40">
        <div
          aria-hidden
          className="absolute inset-0"
          style={glow("85% 85%", 0.45)}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 md:pb-32 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal3D variant="flipLeft">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--navy)/70">
                Apartments
              </p>
            </Reveal3D>
            <h1 className="mt-6 font-serif text-5xl font-bold uppercase leading-[1.02] tracking-tight md:text-7xl">
              <Words text="Santa" className="block" />
              <Words
                text="Sophia"
                className="block"
                delay={300}
                wordClass="bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-transparent"
              />
            </h1>
            <Reveal3D variant="rise" delay={500}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-(--navy)/80">
                Light, texture and greenery, shaped into apartments that feel
                calm, private and open to the day.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-(--navy) px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:bg-(--gold-dark)"
                >
                  Discuss your requirements
                </Link>
                <a
                  href="#light"
                  className="border border-(--navy)/40 bg-white/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] backdrop-blur transition hover:border-(--gold) hover:text-(--gold-dark)"
                >
                  See the details
                </a>
              </div>
            </Reveal3D>
          </div>

          {/* three framed photos at different depths, centre one is an arch */}
          <HeroStage className="relative grid grid-cols-3 items-end gap-4 lg:col-span-6">
            <div style={layer(-14, -8, -30, 0, 7)} className="mb-10">
              <Reveal3D variant="flipLeft" delay={200}>
                <Frame src={img("light-2")} priority className="aspect-3/5" />
              </Reveal3D>
            </div>
            <div style={layer(10, -14, -70, 70, 5)} className="-translate-y-6">
              <Reveal3D variant="zoom" delay={400} duration={1300}>
                <Frame
                  src={img("balconies-2")}
                  priority
                  arch
                  className="aspect-3/5"
                />
              </Reveal3D>
            </div>
            <div style={layer(22, 6, -15, 20, 9)} className="mb-4">
              <Reveal3D variant="flipRight" delay={600}>
                <Frame src={img("light-3")} priority className="aspect-3/5" />
              </Reveal3D>
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

      {/* ───────── OVERVIEW · cream ───────── */}
      <section className="relative bg-(--cream)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Title
                title="One design language, from entrance to balcony."
                sub="Browse the details"
              />
            </div>
            <Reveal3D variant="flipRight" className="lg:col-span-5">
              <p className="leading-relaxed text-(--navy)/75">
                The apartment direction is built around a few repeated ideas:
                patterned daylight, pale metal screens, quiet mineral surfaces
                and plants. Browse each one below.
              </p>
            </Reveal3D>
          </div>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s, i) => (
            <li key={s.id} className="h-full">
  <Reveal3D variant="flipCard" delay={(i % 3) * 120} className="h-full">
    <Tilt3D className="h-full">
      <a
        href={`#${s.id}`}
        className="group flex h-full flex-col border border-(--gold)/40 bg-white p-2.5 ..."
      >
        <div className="relative aspect-4/3 overflow-hidden">
                        <Image
                          src={s.photos[0].src}
                          alt=""
                          fill
                          sizes="(min-width:1024px) 30vw, 90vw"
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                        <Tag className="absolute bottom-3 right-0 font-serif tracking-widest">
                          {roman(i + 1)}
                        </Tag>
                      </div>
                      <div className="flex flex-1 items-end justify-between gap-4 px-2 pb-2 pt-4 min-h-[5.5rem]">
                        <div>
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">
                            {s.group}
                          </span>
                          <span className="mt-1 block font-serif text-xl font-bold uppercase leading-snug tracking-wide">
                            {s.title}
                          </span>
                        </div>
                        <span
                          aria-hidden
                          className="text-(--gold-dark) transition group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </div>
                    </a>
                  </Tilt3D>
                </Reveal3D>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── THEMES · navy band with waves and a moving ribbon ───────── */}
      <div className="bg-(--cream)">
        <Wave />
      </div>
      <section
        className="relative -mt-px bg-(--navy) py-6"
        style={glow("50% 0%", 0.25)}
      >
        <Marquee
          items={groups}
          className="font-serif text-lg font-semibold uppercase tracking-[0.35em] text-(--gold-light) md:text-2xl"
        />
      </section>
      <div className="bg-(--cream)">
        <div className="bg-(--navy)">
          <Wave flip />
        </div>
      </div>

      {/* ───────── DETAIL SECTIONS · text flips in, photo card moves in depth as you scroll ───────── */}
      {sections.map((s, i) => {
        const odd = i % 2 === 1;
        return (
          <section
            key={s.id}
            id={s.id}
            className={`relative -mt-px scroll-mt-20 overflow-hidden py-16 md:py-24 ${
              odd ? "bg-(--paper)" : "bg-(--cream)"
            }`}
          >
            <Paper />
            <div className="relative mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-12">
              <div className={`lg:col-span-4 ${odd ? "lg:order-2" : ""}`}>
                <div className="lg:sticky lg:top-28">
                  <Reveal3D variant={odd ? "flipRight" : "flipLeft"}>
                    <span
                      aria-hidden
                      className="block font-serif text-7xl font-bold leading-none text-transparent md:text-8xl"
                      style={{ WebkitTextStroke: "1px rgba(185,121,31,0.6)" }}
                    >
                      {roman(i + 1)}
                    </span>
                    <Meander className="mt-4 w-28" />
                    <Tag className="mt-6">{s.group}</Tag>
                    <h3 className="mt-5 font-serif text-3xl font-bold uppercase leading-tight tracking-tight md:text-4xl">
                      {s.title}
                    </h3>
                    <span className="mt-5 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                    <p className="mt-5 max-w-sm text-sm leading-relaxed text-(--navy)/75">
                      {s.text}
                    </p>
                    <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">
                      {s.photos.length} reference images
                    </p>
                  </Reveal3D>
                </div>
              </div>

              <div className={`min-w-0 lg:col-span-8 ${odd ? "lg:order-1" : ""}`}>
                <Depth axis={odd ? "y" : "x"} rotate={odd ? -10 : 14} lift={110}>
                  <div className="border border-(--gold)/50 bg-white p-3 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-5">
                    <PhotoSlider
                      photos={s.photos}
                      square={s.square}
                      tone="gold"
                    />
                  </div>
                </Depth>
              </div>
            </div>
          </section>
        );
      })}

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
            <Meander
              className="absolute inset-x-6 top-3 opacity-60"
              color="%23e2b862"
            />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-light)">
              Aurevon Global Partners
            </p>
            <h2 className="mx-auto mt-5 max-w-xl font-serif text-3xl font-bold uppercase leading-tight md:text-5xl">
              <Words text="Planning an apartment project?" className="block" />
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              Tell us what you have in mind and we will guide you from there.
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110"
            >
              Discuss your requirements
            </Link>
            <Meander
              className="absolute inset-x-6 bottom-3 opacity-60"
              color="%23e2b862"
            />
          </div>
        </Depth>
      </section>
    </main>
  );
}