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

/* EDIT HERE: your photos. Put files in public/images/ and set the path.
   Leave null to show a placeholder. */
const IMAGES: Record<string, string | null> = {
  hero: "/images/coast.jpg" /* whitewashed villa with pool, vertical */,
  heroSmall: "/images/heroSmall.jpg" /* terrace or doorway detail */,
  coast: "/images/coast.jpg" /* Aegean coastline, wide */,
  street: "/images/street.jpg" /* stone street, old town */,
  bring: "/images/five-things.jpg" /* architecture detail */,
  harbour: "/images/greek-harbour.jpg" /* harbour town, wide */,
  /* TEAM PHOTOS: vertical, person standing and centred works best */
  owner1: "/images/owner-1.jpg" /* Peter Kemper */,
  owner2: "/images/owner-2.jpg" /* Ruby Taylan */,
  owner3: "/images/owner-3.jpg" /* Kim Greindl */,
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
/* Greek key (meander) strip */
const meander = (color = "%23b9791f"): CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='16'><path d='M0 14H18M14 14V2H4V10H10V6' fill='none' stroke='${color}' stroke-width='1.5'/></svg>")`,
  backgroundRepeat: "repeat-x",
  backgroundSize: "18px 16px",
});

const vm = [
  {
    n: "I",
    icon: "eye" as const,
    label: "Our Vision",
    dark: false,
    lead: "To become a trusted connection between Philippine investors, Greek property opportunities and qualified European professionals.",
    body: [
      "We support individuals, families and Philippine property professionals exploring ownership abroad. Our vision is a client experience built on clear information, practical coordination and relationships that continue beyond a single transaction.",
    ],
  },
  {
    n: "II",
    icon: "globe" as const,
    label: "Our Mission",
    dark: true,
    lead: "To make Greek property opportunities more accessible and understandable for Philippine buyers.",
    body: [
      "We coordinate selected property information, professional introductions and practical support around your objectives: potential rental income, personal ownership and, where eligible, a residence pathway for you and qualifying family members.",
      "Through our property and professional network, we help you compare options, clarify responsibilities and understand the steps before making a commitment.",
    ],
  },
];
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
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0",
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
        {tag && <Tag className="absolute bottom-3 right-0">{tag}</Tag>}
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

/* EDIT HERE: team. Change name, role, title, bio and highlight points. */
const team = [
  {
    id: "owner1" as const,
    name: "Peter Kemper",
    role: "Managing Director",
    title: "Architect & Business Leader.",
    bio: [
      "An established architect based in Passau, Germany, Peter brings more than a decade of experience in architecture, property development and business management.",
      "As founder of an architectural business serving the Passau region for over 10 years, he contributes expertise in property evaluation, design, development and strategic planning. At Aurevon, he leads the company's strategic direction, international partnerships and business development.",
    ],
    points: [
      { icon: "home" as const, t: "10+ years in architecture" },
      { icon: "eye" as const, t: "Property evaluation & development" },
      { icon: "handshake" as const, t: "Strategy & partnerships" },
    ],
  },
  {
    id: "owner2" as const,
    name: "Ruby Taylan",
    role: "Investor Relations & Operations",
    title: "International Travel & Tourism Professional.",
    bio: [
      "With more than 15 years of experience in travel consultancy, tourism, reservations and international client services, Ruby brings a strong background in customer relations and cross-border coordination.",
      "A BS Tourism Management graduate with experience across the Philippines, China and Germany, she oversees investor relations, client engagement, international business coordination and day-to-day operations.",
    ],
    points: [
      { icon: "globe" as const, t: "15+ years in travel & tourism" },
      { icon: "handshake" as const, t: "Investor relations" },
      { icon: "grid" as const, t: "Operations & coordination" },
    ],
  },
  {
    id: "owner3" as const,
    name: "Kim Greindl",
    role: "Client & Documentation Support",
    title: "Businesswoman & Entrepreneur.",
    bio: [
      "A businesswoman based in Passau, Germany, Kim brings an entrepreneurial perspective and a strong commitment to professional client service.",
      "Her business background contributes practical organizational skills, attention to detail and reliable communication. She supports client relations, documentation coordination, administrative processes and communication with business partners.",
    ],
    points: [
      { icon: "heart" as const, t: "Client relations" },
      { icon: "check" as const, t: "Documentation coordination" },
      { icon: "link" as const, t: "Partner communication" },
    ],
  },
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
          <div className="lg:col-span-5">
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
                href="#team"
                className="border border-(--navy)/40 bg-white/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] backdrop-blur transition hover:border-(--gold) hover:text-(--gold-dark)"
              >
                Meet the team
              </a>
            </div>
          </div>

          <ul className="mx-auto grid w-full max-w-2xl grid-cols-3 gap-3 sm:gap-5 lg:col-span-7 lg:max-w-none">
            {team.map((m, i) => (
              <li
                key={m.id}
                className={`text-center ${
                  i === 1 ? "lg:-translate-y-8" : "lg:translate-y-4"
                }`}
              >
                <Photo
                  id={m.id}
                  arch
                  label={`${m.name}, ${m.role}`}
                  className="aspect-3/4 w-full"
                />
                <p className="mt-4 font-serif text-sm font-bold text-(--navy) sm:text-lg">
                  {m.name}
                </p>
                <p className="mt-0.5 font-serif text-[11px] italic leading-snug text-(--gold-dark) sm:text-sm">
                  {m.role}
                </p>
              </li>
            ))}
          </ul>
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
          <div className="relative mx-auto w-full max-w-md pb-20 pl-6 lg:col-span-5 lg:max-w-none">
            {/* main arch: offset gold outline + white mat */}
            <div className="relative w-[82%]">
              <span
                aria-hidden
                className="absolute -left-5 top-5 h-full w-full rounded-t-full border border-(--gold)/60"
              />
              <Photo
                id="coast"
                arch
                label="Aegean coastline"
                tag="Aegean"
                className="relative aspect-3/4 w-full"
              />
            </div>

            {/* small arch overlapping, cut out with a cream ring */}
            <div className="absolute bottom-0 right-0 w-[44%]">
              <Photo
                id="street"
                arch
                label="Stone street, old town"
                className="aspect-4/5 w-full ring-[10px] ring-(--cream)"
              />
            </div>
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

            <dl className="mt-10 divide-y divide-(--gold)/30 border-y border-(--gold)/30">
              {roles.map((r) => (
                <div key={r.who} className="flex items-start gap-5 py-5">
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

    <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
      {vm.map((c) => (
        <article
          key={c.label}
          className={`relative flex overflow-hidden p-3 shadow-[0_30px_60px_-35px_rgba(16,35,94,0.5)] ${
            c.dark ? "bg-(--navy) text-white" : "bg-white"
          }`}
          style={c.dark ? glow("100% 100%", 0.25) : undefined}
        >
          <div
            className={`flex flex-1 flex-col items-center border px-8 py-12 text-center md:px-12 md:py-14 ${
              c.dark ? "border-(--gold-light)/40" : "border-(--gold)/50"
            }`}
          >
            <Badge name={c.icon} />
            <span
              className={`mt-6 font-serif text-sm font-semibold tracking-[0.5em] ${
                c.dark ? "text-(--gold-light)" : "text-(--gold)"
              }`}
            >
              {c.n}
            </span>
            <h3 className="mt-2 font-serif text-3xl font-bold uppercase md:text-4xl">
              {c.label}
            </h3>
            <span
              aria-hidden
              className="mt-6 block h-4 w-32 opacity-80"
              style={meander(c.dark ? "%23e2b862" : "%23b9791f")}
            />
            <p
              className={`mt-6 font-serif text-xl italic leading-snug md:text-2xl ${
                c.dark ? "text-(--gold-light)" : "text-(--gold-dark)"
              }`}
            >
              {c.lead}
            </p>
            <div
              className={`mt-6 space-y-4 text-sm leading-relaxed ${
                c.dark ? "text-white/75" : "text-(--navy)/70"
              }`}
            >
              {c.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  </Reveal>
</section>

      {/* ───────── COMMITMENT · paper ───────── */}
      <section className="relative bg-(--paper)">
        <Paper />
        <Reveal className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
          {/* Left: quote, then photo that stretches to match the right column */}
          <div className="flex flex-col lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-(--gold-dark)">
              Our commitment
            </p>
            <blockquote className="mt-5 font-serif text-3xl font-bold leading-tight text-(--navy) md:text-4xl">
              Relationships based on <Em>trust</Em>, <Em>professionalism</Em>,{" "}
              <Em>transparency</Em> and <Em>long-term value</Em>.
            </blockquote>
            <span className="mt-6 block h-0.5 w-16 bg-linear-to-r from-(--gold) to-(--gold-light)" />
            <Photo
              id="harbour"
              label="Greek harbour town at dusk"
              tag="Greece"
              className="mt-10 min-h-72 flex-1"
            />
          </div>

          {/* Right: text, then four pillars to balance the height */}
          <div className="lg:col-span-7">
            <div className="space-y-5 leading-relaxed text-(--navy)/75">
              <p className="font-serif text-xl leading-snug text-(--navy) md:text-2xl">
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
                Our commitment extends beyond individual transactions. We aim
                to build <Em>long-term relationships</Em>,{" "}
                <Em>reliable partnerships</Em> and <Em>lasting value</Em> for
                the people and businesses we work with.
              </p>
            </div>

            <ul className="mt-10 grid gap-px overflow-hidden border border-(--gold)/40 bg-(--gold)/30 sm:grid-cols-2">
              {[
                { icon: "heart" as const, t: "Trust", d: "Honest communication in every relationship." },
                { icon: "eye" as const, t: "Transparency", d: "Expectations and next steps made clear." },
                { icon: "shield" as const, t: "Professionalism", d: "Qualified partners for regulated expertise." },
                { icon: "clock" as const, t: "Long-term value", d: "Partnerships that outlast a single transaction." },
              ].map((c) => (
                <li key={c.t} className="flex items-start gap-4 bg-(--cream) p-5">
                  <Badge name={c.icon} size="h-11 w-11" />
                  <div>
                    <h3 className="font-serif text-lg font-bold uppercase tracking-wide text-(--navy)">
                      {c.t}
                    </h3>
                    <p className="mt-1 text-sm leading-snug text-(--navy)/70">
                      {c.d}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ───────── TEAM · cream, alternating split cards ───────── */}
      <section id="team" className="relative scroll-mt-20 bg-(--cream)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <Title
              center
              title="Meet the people behind Aurevon"
              sub="Experience. Expertise. Trust. International Connections."
            />
            <p className="mx-auto mt-6 max-w-3xl text-center leading-relaxed text-(--navy)/75">
              Our team brings together architectural expertise, international
              tourism experience, business management and personalized client
              service. With professional roots in Germany and international
              connections, we help clients confidently explore property
              investment and residency opportunities in Greece.
            </p>
          </Reveal>

          <ul className="mt-16 space-y-16 md:space-y-24">
            {team.map((m, i) => {
              const photoRight = i % 2 === 1;
              const src = IMAGES[m.id];
              return (
                <li key={m.id}>
                  <Reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                    {/* Photo */}
                    <div
                      className={`relative h-120 overflow-hidden rounded-3xl border border-(--gold)/40 bg-(--paper) shadow-[0_30px_60px_-30px_rgba(16,35,94,0.45)] md:h-144 ${
                        photoRight ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      {src ? (
                        <Image
                          src={src}
                          alt={`${m.name}, ${m.role}`}
                          fill
                          sizes="(min-width:1024px) 50vw, 100vw"
                          className="object-cover object-top"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-linear-to-b from-(--sky) to-(--paper)">
                          <Icon
                            name="user"
                            className="h-10 w-10 text-(--aegean)/60"
                          />
                        </div>
                      )}

                      {/* soft fade into the text side (desktop only) */}
                      <div
                        aria-hidden
                        className={`pointer-events-none absolute inset-y-0 hidden w-1/3 from-(--cream) to-transparent lg:block ${
                          photoRight
                            ? "left-0 bg-linear-to-r"
                            : "right-0 bg-linear-to-l"
                        }`}
                      />

                      {/* name card */}
                      <div
                        className={`absolute bottom-6 flex items-center gap-3 rounded-xl bg-(--cream) px-6 py-4 shadow-xl ${
                          photoRight ? "right-6" : "left-6"
                        }`}
                      >
                        <Icon
                          name="user"
                          className="h-5 w-5 text-(--gold-dark)"
                        />
                        <div>
                          <p className="font-serif text-lg font-bold text-(--navy)">
                            {m.name}
                          </p>
                          <p className="font-serif text-sm italic text-(--gold-dark)">
                            {m.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Text */}
                    <div className={photoRight ? "lg:order-1" : "lg:order-2"}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">
                        {m.role}
                      </p>
                      <h3 className="mt-4 font-serif text-4xl font-bold leading-[1.1] text-(--navy) md:text-5xl">
                        {m.name}.
                        <span className="block text-2xl italic text-(--gold-dark) md:text-3xl">
                          {m.title}
                        </span>
                      </h3>
                      <div className="mt-6 space-y-4 text-sm leading-relaxed text-(--navy)/75 md:text-base">
                        {m.bio.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                      </div>

                      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                        {m.points.map((pt) => (
                          <li
                            key={pt.t}
                            className="flex items-start gap-3 border-l-2 border-(--gold) pl-3"
                          >
                            <Icon
                              name={pt.icon}
                              className="mt-0.5 h-5 w-5 shrink-0 text-(--gold-dark)"
                            />
                            <span className="text-sm leading-snug text-(--navy)">
                              {pt.t}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          {/* closing line */}
          <Reveal className="mt-20 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
              Your vision. Our connections. Your opportunity.
            </p>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-(--navy)/75">
              From your first property inquiry to coordination with trusted
              local professionals, our team is committed to personalized
              attention, transparent communication and professional support.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────── PRINCIPLES · navy ───────── */}
      <div className="bg-(--cream)">
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