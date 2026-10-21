import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import Reveal from "../components/reveal";

export const metadata = {
  title: "About | Aurevon Global Partners",
  description:
    "Aurevon Global Partners connects Philippine investors and families with selected Greek property opportunities and qualified European professionals.",
};

/* EDIT HERE: brand palette. Navy + gold from the site, plus warm neutrals. */
const palette = {
  "--gold": "#b98a45",
  "--gold-light": "#d8b779",
  "--gold-dark": "#8a6429" /* gold for text on light backgrounds */,
  "--navy": "#0f1b3d",
  "--navy-deep": "#0a1230",
  "--navy-soft": "#16254f",
  "--ivory": "#faf6ee",
  "--beige": "#efe7d8",
  "--stone": "#e2d8c3",
} as CSSProperties;

/* EDIT HERE: your photos. Put files in public/images/about/ and set the path,
   e.g. hero: "/images/about/hero.jpg". Leave null to show a placeholder. */
const IMAGES: Record<string, string | null> = {
  hero: null /* whitewashed villa, vertical */,
  heroSmall: null /* terrace or doorway detail */,
  coast: null /* Aegean coastline, wide */,
  street: null /* stone street, old town */,
  interior: null /* modern Greek interior */,
  bring: null /* architecture detail, vertical */,
  harbour: null /* harbour town, wide */,
};

const glow = (pos: string, a = 0.2): CSSProperties => ({
  backgroundImage: `radial-gradient(55% 60% at ${pos}, rgba(185,138,69,${a}), transparent 70%)`,
});

/* Soft stone grain laid over light sections */
const grain: CSSProperties = {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .42 0 0 0 0 .34 0 0 0 0 .22 0 0 0 .16 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
};
const Stone = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 mix-blend-multiply"
    style={grain}
  />
);

/* ───────── Icons ───────── */
const ICONS = {
  key: "M15 7a4 4 0 11-3.9 4.9L4 19v2h3v-2h2v-2h2l1.9-1.9A4 4 0 0115 7zm1.5 2h.01",
  link: "M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zm10 3a3 3 0 100-6 3 3 0 000 6z",
  handshake: "M3 11l4-4 4 2 4-2 6 5-5 5-3-1-2 2-3-3-2 1-3-3v-2zM7 7l-4 4M21 12l-2-2",
  globe: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  scale: "M12 4v16M6 20h12M5 8h14M5 8l-3 7a3 3 0 006 0L5 8zm14 0l-3 7a3 3 0 006 0l-3-7z",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zm-3 9l2 2 4-4",
  heart: "M12 20s-8-5-8-11a4.5 4.5 0 018-2.7A4.5 4.5 0 0120 9c0 6-8 11-8 11z",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  clock: "M12 3a9 9 0 100 18 9 9 0 000-18zm0 4v5l3 2",
  home: "M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6",
  image: "M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15 9h.01",
} as const;

function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: keyof typeof ICONS;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

/* ───────── Photo: real image if set in IMAGES, otherwise a placeholder ───────── */
function Photo({
  id,
  label,
  className = "",
  arch = false,
}: {
  id: keyof typeof IMAGES;
  label: string;
  className?: string;
  arch?: boolean;
}) {
  const src = IMAGES[id];
  const round = arch ? "rounded-t-full" : "";
  return (
    <div
      className={`relative overflow-hidden bg-(--ivory) p-1.5 shadow-[0_20px_50px_-20px_rgba(15,27,61,0.35)] ${round} ${className}`}
    >
      <div
        className={`relative h-full w-full overflow-hidden border border-(--gold)/40 ${round}`}
      >
        {src ? (
          <Image
            src={src}
            alt={label}
            fill
            sizes="(min-width:1024px) 40vw, 90vw"
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={label}
            className="flex h-full w-full flex-col items-center justify-end gap-3 bg-linear-to-b from-(--beige) via-(--stone) to-[#cfc2a8] pb-8 text-center"
          >
            <Icon name="image" className="h-7 w-7 text-(--gold-dark)/70" />
            <p className="max-w-[16ch] px-3 text-[10px] uppercase tracking-[0.25em] text-(--navy)/55">
              {label}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Eyebrow({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.35em] ${
        dark ? "text-(--gold-light)" : "text-(--gold-dark)"
      }`}
    >
      <span className={`h-px w-10 ${dark ? "bg-(--gold-light)" : "bg-(--gold)"}`} />
      {children}
    </p>
  );
}

const Em = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-(--gold-dark)">{children}</strong>
);
const EmDark = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-(--gold-light)">{children}</strong>
);

/* ───────── Content ───────── */
const journey = [
  { t: "First enquiry", d: "A coordinated point of contact for your questions." },
  { t: "Property selection", d: "Options matched to your budget, timeline and plans." },
  { t: "Purchase coordination", d: "Seller communication and independent specialists." },
  { t: "Residence application", d: "Where relevant, coordination with Greek professionals." },
];

const roles = [
  { icon: "link" as const, who: "Aurevon", what: "Introduces opportunities and coordinates support across the process." },
  { icon: "scale" as const, who: "Independent advisers", what: "Qualified professionals who handle legal, tax, financial, technical and immigration advice." },
  { icon: "home" as const, who: "Sellers and developers", what: "Finalize their respective transactions." },
];

const bring = [
  { icon: "key" as const, t: "Access", d: "Connecting clients with relevant opportunities and professional networks." },
  { icon: "grid" as const, t: "Coordination", d: "Helping organize the different stages, parties and services involved." },
  { icon: "eye" as const, t: "Clarity", d: "Presenting information in a structured and understandable way." },
  { icon: "handshake" as const, t: "Relationships", d: "Building long-term connections between clients, businesses and professional partners." },
  { icon: "globe" as const, t: "International Perspective", d: "Bridging clients and opportunities between Greece, Bulgaria, Europe and international markets." },
];

const principles = [
  { icon: "eye" as const, t: "Transparency", d: "We communicate clearly and aim to ensure that relevant information, expectations and processes are understood." },
  { icon: "shield" as const, t: "Professionalism", d: "We approach every client and partnership with responsibility, respect and attention to detail." },
  { icon: "heart" as const, t: "Integrity", d: "We value honest communication and responsible business practices in every relationship." },
  { icon: "grid" as const, t: "Coordination", d: "We bring together clients, opportunities and professional partners to create a more organized and efficient experience." },
  { icon: "clock" as const, t: "Long-Term Relationships", d: "We focus on building relationships that extend beyond a single transaction and create opportunities for continued cooperation." },
];

export default function AboutPage() {
  return (
    <main className="bg-(--ivory) text-(--navy)" style={palette}>
      {/* ───────── HERO · ivory ───────── */}
      <section
        className="relative overflow-hidden bg-(--ivory) pt-32 md:pt-40"
        style={glow("90% 0%", 0.14)}
      >
        <Stone />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 md:pb-32 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>Company profile 2026</Eyebrow>
            <h1 className="mt-7 font-serif text-5xl leading-[1.05] md:text-7xl">
              About Aurevon
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-(--navy)/75">
              Aurevon Global Partners connects Philippine investors and
              families with selected property opportunities in Greece. We help
              you explore ownership, potential rental income and residency
              pathways for eligible family members through practical
              coordination and professional introductions.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-(--navy) px-7 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:bg-(--gold) hover:text-(--navy)"
              >
                Discuss your requirements
              </Link>
              <a
                href="#overview"
                className="border border-(--navy)/30 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.15em] transition hover:border-(--gold) hover:text-(--gold-dark)"
              >
                Our story
              </a>
            </div>
          </div>

          {/* layered: arch + inset photo + navy badge */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-none">
            <Photo
              id="hero"
              arch
              label="Whitewashed Cycladic villa"
              className="ml-auto aspect-3/4 w-[78%]"
            />
            <Photo
              id="heroSmall"
              label="Terrace detail"
              className="absolute -bottom-8 left-0 aspect-square w-[42%]"
            />
            <div className="absolute right-0 top-8 bg-(--navy) px-5 py-4 text-white shadow-xl">
              <p className="font-serif text-lg leading-tight">
                Philippines
                <span className="mx-2 text-(--gold-light)">to</span>
                Greece
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── OVERVIEW · white ───────── */}
      <section id="overview" className="scroll-mt-20 bg-white">
        <Reveal className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Company overview</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl leading-tight md:text-5xl">
                Investing in Greek property, made clearer.
              </h2>
              <span className="mt-6 block h-0.5 w-12 bg-(--gold)" />
            </div>
          </div>
          <div className="space-y-7 leading-relaxed text-(--navy)/75 lg:col-span-8">
            <p className="border-l-2 border-(--gold) pl-6 font-serif text-2xl leading-snug text-(--navy) md:text-3xl">
              Your plans guide the search: an income-oriented property, a
              future home or an eligible residence investment.
            </p>
            <p>
              We help organize property information, seller communication and
              the professional support needed to assess your options. Our
              mission is to make investing in Greek property clearer and more
              manageable for buyers from the Philippines.
            </p>
            <p>
              Buying abroad raises questions about costs, documents, property
              suitability and family eligibility. Aurevon provides a
              coordinated point of contact, helping you compare options and
              connect with independent specialists before you commit.
            </p>
            <p>
              A property abroad is a long-term decision for you and your
              family. Our aim is to help you understand the opportunity,
              review the costs and choose a property that fits your plans.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ───────── JOURNEY · beige ───────── */}
      <section className="relative bg-(--beige)">
        <Stone />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="max-w-2xl leading-relaxed text-(--navy)/75">
            From your first enquiry to property selection and purchase
            coordination, we support a clear journey around your budget and
            timeline.
          </p>
          <ol className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <span
              aria-hidden
              className="absolute left-0 right-0 top-[1.1rem] hidden h-px bg-(--gold)/50 lg:block"
            />
            {journey.map((j, i) => (
              <li key={j.t} className="relative">
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-(--gold) bg-(--beige) font-serif text-sm text-(--gold-dark)">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-serif text-xl">{j.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-(--navy)/65">
                  {j.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── PURPOSE · deep navy ───────── */}
      <section
        className="relative overflow-hidden bg-(--navy-deep) text-white"
        style={glow("50% 0%", 0.25)}
      >
        <Reveal className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <span
            aria-hidden
            className="block font-serif text-7xl leading-none text-(--gold)/70"
          >
            “
          </span>
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-(--gold-light)">
            Our purpose
          </p>
          <p className="mt-6 font-serif text-3xl leading-snug md:text-5xl md:leading-tight">
            To connect Filipino investors and families with Greek property
            opportunities, clear information and the professional support
            needed for informed decisions.
          </p>
        </Reveal>
      </section>

      {/* ───────── POSITIONING · ivory ───────── */}
      <section className="relative bg-(--ivory)">
        <Stone />
        <Reveal className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 md:py-28 lg:grid-cols-12">
          <div className="relative pb-10 lg:col-span-5">
            <Photo id="coast" label="Aegean coastline" className="aspect-4/5 w-[82%]" />
            <Photo
              id="street"
              label="Stone street, old town"
              className="absolute -bottom-0 right-0 aspect-square w-[48%]"
            />
          </div>

          <div className="lg:col-span-7">
            <Eyebrow>Our positioning</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl leading-tight md:text-5xl">
              Your connection from the Philippines to Greek property and
              investor support.
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-(--navy)/75">
              We work with clients, property partners and relevant
              professionals to coordinate property details, appointments and
              documentation, helping you understand each stage of the
              purchase journey.
            </p>

            <dl className="mt-10 divide-y divide-(--navy)/12 border-y border-(--navy)/12">
              {roles.map((r) => (
                <div
                  key={r.who}
                  className="grid gap-2 py-5 sm:grid-cols-[2rem_11rem_1fr] sm:gap-6"
                >
                  <Icon name={r.icon} className="h-6 w-6 text-(--gold-dark)" />
                  <dt className="font-serif text-lg">{r.who}</dt>
                  <dd className="text-sm leading-relaxed text-(--navy)/70">
                    {r.what}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      {/* ───────── WHAT WE BRING · stone ───────── */}
      <section className="relative bg-(--stone)">
        <Stone />
        <Reveal className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>What we bring</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl leading-tight md:text-5xl">
                Five things you can expect from working with us.
              </h2>
              <Photo
                id="bring"
                label="Architectural detail"
                className="mt-10 hidden aspect-4/3 lg:block"
              />
            </div>
          </div>

          <ul className="divide-y divide-(--navy)/15 border-y border-(--navy)/15 lg:col-span-7">
            {bring.map((b) => (
              <li key={b.t} className="flex gap-5 py-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-(--gold) bg-(--ivory)/70 text-(--gold-dark)">
                  <Icon name={b.icon} />
                </span>
                <div>
                  <h3 className="font-serif text-2xl">{b.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-(--navy)/70">
                    {b.d}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ───────── VISION & MISSION · white, layered with navy ───────── */}
      <section className="bg-white">
        <Reveal className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Eyebrow>Vision &amp; mission</Eyebrow>
          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-0">
            <article className="border border-(--navy)/10 bg-(--ivory) p-8 md:p-12 lg:mr-[-2rem] lg:mt-0 lg:pb-20">
              <h2 className="font-serif text-3xl md:text-4xl">Our Vision</h2>
              <p className="mt-6 font-serif text-xl leading-snug text-(--gold-dark)">
                To become a trusted connection between Philippine investors,
                Greek property opportunities and qualified European
                professionals.
              </p>
              <p className="mt-6 text-sm leading-relaxed text-(--navy)/70">
                We support individuals, families and Philippine property
                professionals exploring ownership abroad. Our vision is a
                client experience built on clear information, practical
                coordination and relationships that continue beyond a single
                transaction.
              </p>
            </article>

            <article
              className="relative bg-(--navy) p-8 text-white shadow-2xl md:p-12 lg:mt-14 lg:pl-16"
              style={glow("100% 100%", 0.22)}
            >
              <h2 className="font-serif text-3xl md:text-4xl">Our Mission</h2>
              <p className="mt-6 font-serif text-xl leading-snug text-(--gold-light)">
                To make Greek property opportunities more accessible and
                understandable for Philippine buyers.
              </p>
              <p className="mt-6 text-sm leading-relaxed text-white/75">
                We coordinate selected property information, professional
                introductions and practical support around your objectives:
                potential rental income, personal ownership and, where
                eligible, a residence pathway for you and qualifying family
                members.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                Through our property and professional network, we help you
                compare options, clarify responsibilities and understand the
                steps before making a commitment.
              </p>
            </article>
          </div>
        </Reveal>
      </section>

      {/* ───────── COMMITMENT · beige ───────── */}
      <section className="relative bg-(--beige)">
        <Stone />
        <Reveal className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Our commitment</Eyebrow>
              <blockquote className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
                Relationships based on <Em>trust</Em>, <Em>professionalism</Em>
                , <Em>transparency</Em> and <Em>long-term value</Em>.
              </blockquote>
              <Photo
                id="harbour"
                label="Greek harbour town at dusk"
                className="mt-10 hidden aspect-4/3 lg:block"
              />
            </div>
          </div>
          <div className="space-y-6 leading-relaxed text-(--navy)/75 lg:col-span-7">
            <p>
              At Aurevon, we believe that successful international
              relationships are built on <Em>trust</Em>, <Em>transparency</Em>
              , <Em>professionalism</Em> and <Em>consistent communication</Em>.
            </p>
            <p>
              We are committed to providing clients and partners with clear
              information, responsive communication and well-coordinated
              support throughout every stage of the relationship.
            </p>
            <p>
              We work to ensure that expectations, responsibilities and next
              steps are clearly understood, while connecting clients with the
              appropriate professional partners whenever specialized or
              regulated expertise is required.
            </p>
            <p>
              Our commitment extends beyond individual transactions. We aim to
              build <Em>long-term relationships</Em>,{" "}
              <Em>reliable partnerships</Em> and <Em>lasting value</Em> for the
              people and businesses we work with.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ───────── PRINCIPLES · navy ───────── */}
      <section
        className="relative overflow-hidden bg-(--navy) text-white"
        style={glow("0% 100%", 0.22)}
      >
        <Reveal className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Eyebrow dark>Our principles</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-tight md:text-5xl">
            How we work with every client and partner.
          </h2>
          <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {principles.map((p) => (
              <li key={p.t} className="border-t border-(--gold)/50 pt-5">
                <Icon name={p.icon} className="h-7 w-7 text-(--gold-light)" />
                <h3 className="mt-4 font-serif text-lg leading-snug">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {p.d}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ───────── CTA · ivory ───────── */}
      <section className="relative bg-(--ivory) px-6 py-20 md:py-28">
        <Stone />
        <div className="relative mx-auto max-w-4xl border border-(--gold)/50 bg-white p-10 text-center shadow-[0_30px_60px_-30px_rgba(15,27,61,0.3)] md:p-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-(--gold-dark)">
            Aurevon Global Partners
          </p>
          <h2 className="mx-auto mt-5 max-w-xl font-serif text-3xl leading-tight md:text-5xl">
            Thinking about property in Greece?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-(--navy)/70 md:text-base">
            Tell us what you have in mind and we will guide you from there.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-block bg-(--navy) px-8 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:bg-(--gold) hover:text-(--navy)"
          >
            Discuss your requirements
          </Link>
        </div>
      </section>
    </main>
  );
}