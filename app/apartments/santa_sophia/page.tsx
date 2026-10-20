import Image from "next/image";
import Link from "next/link";
import PhotoSlider, { Reveal } from "../../components/photo-slider";

export const metadata = {
  title: "Santa Sophia | Aurevon Global Partners",
  description:
    "Design direction for Santa Sophia: light, materials, planting and metal details.",
};

const GOLD = "#b8935a";

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

/* Builds photos light-1 ... light-N from a name and a count */
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

export default function SantaSophiaPage() {
  return (
    <main className="bg-[#f7f4ee] text-slate-800">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#2a2724] pt-32 pb-20 text-white md:pt-40 md:pb-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.3em]" style={{ color: GOLD }}>
              <span className="h-px w-10" style={{ background: GOLD }} />
              Apartments
            </p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.08] md:text-6xl">Santa Sophia</h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">
              Light, texture and greenery, shaped into apartments that feel calm,
              private and open to the day.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-7 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:brightness-110"
                style={{ background: GOLD }}
              >
                Discuss your requirements
              </Link>
              <a
                href="#light"
                className="border border-white/70 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.15em] transition hover:bg-white hover:text-slate-900"
              >
                See the details
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 lg:col-span-6">
            {[
              { src: img("light-2"), cls: "mt-10" },
              { src: img("balconies-2"), cls: "" },
              { src: img("light-3"), cls: "mt-20" },
            ].map((p) => (
              <div key={p.src} className={`relative aspect-3/5 overflow-hidden ${p.cls}`}>
                <Image src={p.src} alt="" fill priority sizes="(min-width:1024px) 20vw, 30vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.3em]" style={{ color: GOLD }}>
              Overview
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
              One design language, from the entrance to the balcony.
            </h2>
            <p className="mt-6 leading-relaxed text-slate-600">
              The apartment direction is built around a few repeated ideas:
              patterned daylight, pale metal screens, quiet mineral surfaces and
              plants. Browse each one below.
            </p>
          </div>

          <ul className="grid gap-px bg-slate-300/60 sm:grid-cols-2 lg:col-span-7">
            {sections.map((s) => (
              <li key={s.id} className="bg-[#f7f4ee] sm:last:odd:col-span-2">
                <a href={`#${s.id}`} className="group flex items-center gap-4 p-4 transition hover:bg-white">
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden">
                    <Image src={s.photos[0].src} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-[0.2em] text-slate-500">{s.group}</span>
                    <span className="block font-serif text-lg group-hover:text-[#b8935a]">{s.title}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DETAIL SECTIONS */}
      {sections.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`scroll-mt-20 py-16 md:py-24 ${i % 2 === 0 ? "bg-white" : "bg-[#f7f4ee]"}`}
        >
          <Reveal className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="text-xs font-medium uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                  {s.group}
                </p>
                <h3 className="mt-3 font-serif text-3xl leading-tight">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{s.text}</p>
              </div>
            </div>
            <div className="min-w-0 lg:col-span-9">
              <PhotoSlider photos={s.photos} square={s.square} />
            </div>
          </Reveal>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-[#2a2724] px-6 py-20 text-center text-white">
        <h2 className="mx-auto max-w-xl font-serif text-3xl md:text-4xl">
          Planning an apartment project?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/70">
          Tell us what you have in mind and we will guide you from there.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block px-8 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:brightness-110"
          style={{ background: GOLD }}
        >
          Discuss your requirements
        </Link>
      </section>
    </main>
  );
}