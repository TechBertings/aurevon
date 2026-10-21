import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import Reveal from "../components/reveal-box";

export const metadata = {
  title: "About | Aurevon Global Partners",
  description:
    "Aurevon Global Partners connects Philippine investors and families with selected Greek property opportunities and qualified European professionals.",
};

/* EDIT HERE: brochure palette (royal navy, metallic gold, cream paper, Aegean sky) */
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

/* EDIT HERE: your photos. Put files in public/images/about/ and set the path,
   e.g. hero: "/images/about/hero.jpg". Leave null to show a placeholder. */
const IMAGES: Record<string, string | null> = {
  hero: "/images/coast.jpg"/* whitewashed villa with pool, vertical */,
  heroSmall: "/images/heroSmall.jpg"/* terrace or doorway detail */,
  coast: "/images/coast.jpg" /* Aegean coastline, wide */,
  street: "/images/street.jpg"/* stone street, old town */,
  bring: "/images/bring.jpg" /* architecture detail */,
  harbour: "/images/greek-harbour.jpg",/* harbour town, wide */
};

/* Paper texture over cream sections */
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
  check: "M5 12l5 5 9-10",
  chart: "M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6",
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
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

/* Gold filled circle badge, like the "Why invest" icons */
function Badge({
  name,
  size = "h-14 w-14",
}: {
  name: keyof typeof ICONS;
  size?: string;
}) {
  return (
    <span
      className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-linear-to-b from-(--gold-light) to-(--gold-dark) text-white shadow-[0_8px_20px_-8px_rgba(143,90,18,0.7)] ring-2 ring-(--gold-light)/40 ring-offset-2 ring-offset-transparent`}
    >
      <Icon name={name} className="h-6 w-6" />
    </span>
  );
}

/* Gold gradient tag, like the "FROM €250,000" labels */
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

/* Navy wave with gold line, the curved divider from the brochure */
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

/* ───────── Photo: real image if set, otherwise a sky placeholder ───────── */
function Photo({
  id,
  label,
  className = "",
  arch = false,
  tag,
}: {
  id: keyof typeof IMAGES;
  label: string;
  className?: string;
  arch?: boolean;
  tag?: string;
}) {
  const src = IMAGES[id];
  const round = arch ? "rounded-t-full" : "";
  return (
    <div
      className={`relative overflow-hidden bg-white p-1.5 shadow-[0_24px_50px_-20px_rgba(16,35,94,0.45)] ${round} ${className}`}
    >
      <div
        className={`relative h-full w-full overflow-hidden border border-(--gold)/60 ${round}`}
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
            className="flex h-full w-full flex-col items-center justify-end gap-3 bg-linear-to-b from-(--sky) via-[#eaf3f8] to-(--paper) pb-8 text-center"
          >
            <Icon name="image" className="h-7 w-7 text-(--aegean)/70" />
            <p className="max-w-[16ch] px-3 text-[10px] uppercase tracking-[0.25em] text-(--navy)/60">
              {label}
            </p>
          </div>
        )}
        {tag && (
          <Tag className="absolute bottom-3 right-0">{tag}</Tag>
        )}
      </div>
    </div>
  );
}

/* Section title: bold navy uppercase serif + small caps subtitle */
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
        {title}
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

const Em = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-(--gold-dark)">{children}</strong>
);
const EmDark = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-(--gold-light)">{children}</strong>
);

/* ───────── Content ───────── */
const journey = [
  { icon: "key" as const, t: "First enquiry", d: "A coordinated point of contact for your questions." },
  { icon: "home" as const, t: "Property selection", d: "Options matched to your budget, timeline and plans." },
  { icon: "handshake" as const, t: "Purchase coordination", d: "Seller communication and independent specialists." },
  { icon: "globe" as const, t: "Residence application", d: "Where relevant, coordination with Greek professionals." },
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

const strip = [
  { icon: "chart" as const, t: "Stable income potential" },
  { icon: "globe" as const, t: "European asset" },
  { icon: "home" as const, t: "Premium locations" },
  { icon: "heart" as const, t: "A brighter future for your family" },
];

export default function AboutPage() {
  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      {/* ───────── HERO · sky to sunset ───────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-(--sky) via-[#f6efe0] to-[#f4d9a8] pt-32 md:pt-40">
        <div
          aria-hidden
          className="absolute inset-0"
          style={glow("85% 85%", 0.45)}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 md:pb-32 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--navy)/70">
              Greece property &amp; residency opportunities
            </p>
            <h1 className="mt-6 font-serif text-5xl font-bold uppercase leading-[1.02] tracking-tight text-(--navy) md:text-7xl">
              About
              <span className="block bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-transparent">
                Aurevon
              </span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-(--navy)/80">
              Aurevon Global Partners connects Philippine investors and
              families with selected property opportunities in Greece. We help
              you explore ownership, potential rental income and residency
              pathways for eligible family members through practical
              coordination and professional introductions.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-(--navy) px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:bg-(--gold-dark)"
              >
                Discuss your requirements
              </Link>
              <a
                href="#overview"
                className="border border-(--navy)/40 bg-white/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] backdrop-blur transition hover:border-(--gold) hover:text-(--gold-dark)"
              >
                Our story
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-none">
            <Photo
              id="hero"
              arch
              label="Whitewashed villa with pool"
              className="ml-auto aspect-3/4 w-[78%]"
            />
            <Photo
              id="heroSmall"
              label="Terrace detail"
              className="absolute -bottom-8 left-0 aspect-square w-[42%]"
            />
         
          </div>
        </div>
      </section>

      {/* navy strip: brochure footer icons */}
      <section className="relative bg-(--navy)">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-6 py-8 md:grid-cols-4">
          {strip.map((s) => (
            <div
              key={s.t}
              className="flex flex-col items-center gap-3 text-center md:border-l md:border-(--gold)/30 md:first:border-l-0"
            >
              <Icon name={s.icon} className="h-8 w-8 text-(--gold-light)" />
              <p className="max-w-[14ch] text-[11px] font-medium uppercase tracking-[0.2em] text-white/90">
                {s.t}
              </p>
            </div>
          ))}
        </div>
        <p className="border-t border-(--gold)/30 py-3 text-center text-[11px] uppercase tracking-[0.3em] text-(--gold-light)">
          Your gateway to European property investment
        </p>
      </section>

      {/* ───────── OVERVIEW · cream ───────── */}
      <section id="overview" className="relative scroll-mt-20 bg-(--cream)">
        <Paper />
        <Reveal className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Title
                title="Investing in Greek property, made clearer."
                sub="More than a destination — a smart investment for life"
              />
            </div>
          </div>
          <div className="space-y-7 leading-relaxed text-(--navy)/75 lg:col-span-8">
            <p className="border-l-4 border-(--gold) pl-6 font-serif text-2xl leading-snug text-(--navy) md:text-3xl">
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

      {/* ───────── JOURNEY · paper, numbered gold circles ───────── */}
      <section className="relative bg-(--paper)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Title
            center
            title="Your journey with us"
            sub="A simple and secure process"
          />
          <p className="mx-auto mt-6 max-w-2xl text-center leading-relaxed text-(--navy)/75">
            From your first enquiry to property selection and purchase
            coordination, we support a clear journey around your budget and
            timeline.
          </p>
          <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <span
              aria-hidden
              className="absolute left-[12%] right-[12%] top-[1.1rem] hidden h-px bg-(--gold)/60 lg:block"
            />
            {journey.map((j, i) => (
              <li key={j.t} className="relative flex flex-col items-center text-center">
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-b from-(--gold-light) to-(--gold-dark) font-serif text-sm font-bold text-white shadow-md">
                  {i + 1}
                </span>
                <Icon name={j.icon} className="mt-5 h-9 w-9 text-(--gold-dark)" />
                <h3 className="mt-3 text-xs font-bold uppercase tracking-[0.18em]">
                  {j.t}
                </h3>
                <p className="mt-2 max-w-[22ch] text-sm leading-relaxed text-(--navy)/70">
                  {j.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── PURPOSE · navy with wave ───────── */}
      <div className="bg-(--paper)">
        <Wave />
      </div>
      <section
        className="relative -mt-px overflow-hidden bg-(--navy) text-white"
        style={glow("50% 0%", 0.28)}
      >
        <Reveal className="relative mx-auto max-w-4xl px-6 pb-24 pt-10 text-center md:pb-32">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-light)">
            Our purpose
          </p>
          <p className="mt-6 font-serif text-3xl leading-snug md:text-5xl md:leading-tight">
            To connect Filipino investors and families with Greek property
            opportunities, clear information and the professional support
            needed for informed decisions.
          </p>
          <span className="mx-auto mt-10 block h-0.5 w-16 bg-linear-to-r from-(--gold) to-(--gold-light)" />
        </Reveal>
      </section>
      <div className="bg-(--cream)">
        <div className="bg-(--navy)">
          <Wave flip />
        </div>
      </div>

      {/* ───────── POSITIONING · cream ───────── */}
      <section className="relative -mt-px bg-(--cream)">
        <Paper />
        <Reveal className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 md:py-28 lg:grid-cols-12">
          <div className="relative pb-10 lg:col-span-5">
            <Photo
              id="coast"
              label="Aegean coastline"
              tag="Aegean"
              className="aspect-4/5 w-[82%]"
            />
            <Photo
              id="street"
              label="Stone street, old town"
              className="absolute bottom-0 right-0 aspect-square w-[48%]"
            />
          </div>

          <div className="lg:col-span-7">
            <Title
              title="Your connection from the Philippines to Greek property"
              sub="Investor support, end to end"
            />
            <p className="mt-6 max-w-2xl leading-relaxed text-(--navy)/75">
              We work with clients, property partners and relevant
              professionals to coordinate property details, appointments and
              documentation, helping you understand each stage of the
              purchase journey.
            </p>

            <dl className="mt-10 space-y-6">
              {roles.map((r) => (
                <div key={r.who} className="flex items-start gap-5">
                  <Badge name={r.icon} />
                  <div>
                    <dt className="font-serif text-xl font-bold uppercase tracking-wide text-(--navy)">
                      {r.who}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-(--navy)/70">
                      {r.what}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      {/* ───────── WHAT WE BRING · paper ───────── */}
      <section className="relative bg-(--paper)">
        <Paper />
        <Reveal className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Title
                title="Five things you can expect"
                sub="What we bring to every client"
              />
              <Photo
                id="bring"
                label="Architectural detail"
                className="mt-10 hidden aspect-4/3 lg:block"
              />
            </div>
          </div>

          <ul className="space-y-4 lg:col-span-7">
            {bring.map((b) => (
              <li
                key={b.t}
                className="flex gap-5 border border-(--gold)/30 bg-white/70 p-6 shadow-[0_12px_30px_-20px_rgba(16,35,94,0.4)]"
              >
                <Badge name={b.icon} />
                <div>
                  <h3 className="font-serif text-xl font-bold uppercase tracking-wide text-(--navy)">
                    {b.t}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-(--navy)/70">
                    {b.d}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ───────── VISION & MISSION ───────── */}
      <section className="relative bg-(--cream)">
        <Paper />
        <Reveal className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Title center title="Vision & mission" sub="Where we are going, and how" />
          <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-0">
            <article className="border border-(--gold)/40 bg-white p-8 md:p-12 lg:mr-[-2rem] lg:pb-20">
              <h3 className="font-serif text-3xl font-bold uppercase text-(--navy)">
                Our Vision
              </h3>
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
              style={glow("100% 100%", 0.25)}
            >
              <h3 className="font-serif text-3xl font-bold uppercase">
                Our Mission
              </h3>
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

      {/* ───────── COMMITMENT · paper ───────── */}
      <section className="relative bg-(--paper)">
        <Paper />
        <Reveal className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-(--gold-dark)">
                Our commitment
              </p>
              <blockquote className="mt-5 font-serif text-3xl font-bold leading-tight text-(--navy) md:text-4xl">
                Relationships based on <Em>trust</Em>, <Em>professionalism</Em>,{" "}
                <Em>transparency</Em> and <Em>long-term value</Em>.
              </blockquote>
              <Photo
                id="harbour"
                label="Greek harbour town at dusk"
                tag="Greece"
                className="mt-10 hidden aspect-4/3 lg:block"
              />
            </div>
          </div>
          <div className="space-y-6 leading-relaxed text-(--navy)/75 lg:col-span-7">
            <p>
              At Aurevon, we believe that successful international
              relationships are built on <Em>trust</Em>, <Em>transparency</Em>,{" "}
              <Em>professionalism</Em> and <Em>consistent communication</Em>.
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
      <div className="bg-(--paper)">
        <Wave />
      </div>
      <section
        className="relative -mt-px overflow-hidden bg-(--navy) text-white"
        style={glow("0% 100%", 0.22)}
      >
        <Reveal className="relative mx-auto max-w-6xl px-6 pb-20 pt-6 md:pb-28">
          <Title
            dark
            title="Our principles"
            sub="How we work with every client and partner"
          />
          <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {principles.map((p) => (
              <li key={p.t} className="border-t border-(--gold)/60 pt-5">
                <Badge name={p.icon} size="h-12 w-12" />
                <h3 className="mt-4 font-serif text-lg font-bold uppercase leading-snug tracking-wide">
                  {p.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {p.d}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ───────── CTA · cream with gold frame ───────── */}
      <section className="relative bg-(--cream) px-6 py-20 md:py-28">
        <Paper />
        <div className="relative mx-auto max-w-4xl border-2 border-(--gold)/60 bg-white p-10 text-center shadow-[0_30px_60px_-30px_rgba(16,35,94,0.35)] md:p-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
            Live · Invest · Build your future
          </p>
          <h2 className="mx-auto mt-5 max-w-xl font-serif text-3xl font-bold uppercase leading-tight text-(--navy) md:text-5xl">
            Thinking about property in Greece?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-(--navy)/70 md:text-base">
            Tell us what you have in mind and we will guide you from there.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110"
          >
            Discuss your requirements
          </Link>
        </div>
      </section>
    </main>
  );
}