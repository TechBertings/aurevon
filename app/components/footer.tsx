"use client";
import { useState, useEffect, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Marquee, Reveal3D, Tilt3D } from "./scroll-3d";

/* EDIT HERE: brand palette (keep in sync with the page file) */
const palette = {
  "--gold": "#b98a45",
  "--gold-light": "#e2b862",
  "--cream": "#fbf6ea",
  "--navy": "#0f1b3d",
  "--navy-soft": "#16254f",
  "--navy-deep": "#0a1230",
} as CSSProperties;

/* EDIT HERE: footer links */
const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Apartments", href: "/apartments" },
  { label: "Pricing", href: "/pricing" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

/* EDIT HERE: same routes as the navbar dropdown (sold apartments not included).
   A plain item is one link. An item with `items` becomes a click-to-open group. */
type FooterItem = { label: string; href: string };
type FooterGroup = { label: string; items: FooterItem[] };

const PROPERTIES: (FooterItem | FooterGroup)[] = [
  { label: "Seizani Loft", href: "/apartments/seizani_loft" },
  { label: "Santa Sophia", href: "/apartments/santa_sophia" },
  { label: "Pythagoras", href: "/apartments/pythagoras" },
  {
    label: "Piraeus",
    items: [
      { label: "Olynthou", href: "/apartments/piraeus_olynthou" },
      { label: "Ground Floor 43 m²", href: "/apartments/piraeus/ground-floor-43" },
      { label: "Ground Floor 94 m²", href: "/apartments/piraeus/ground-floor-94" },
      { label: "1st Floor 71 m²", href: "/apartments/piraeus/first-floor-71" },
      { label: "Apartment 101 m²", href: "/apartments/piraeus/apartment-101" },
    ],
  },
  { label: "Drapetsona", href: "/apartments/drapetsona" },
  { label: "Sea View Villa", href: "/apartments/sea-view-villa" },
  { label: "Villa Porto Rafti", href: "/apartments/villa-porto-rafti" },
  {
    label: "Pagrati",
    items: [
      { label: "Studio 40 m²", href: "/apartments/pagrati/studio-40" },
      { label: "Evmenous 82 m²", href: "/apartments/pagrati/evmenous-82" },
      { label: "Aspasias 48 m²", href: "/apartments/pagrati/aspasias-48" },
    ],
  },
  { label: "Katechaki", href: "/apartments/katechaki" },
  {
    label: "Votanikos",
    items: [
      { label: "Kozanis Loft 45 m²", href: "/apartments/votanikos/kozanis-45" },
      { label: "Agias Markellas 68 m²", href: "/apartments/votanikos/agias-markellas-68" },
    ],
  },
  { label: "Glaraki", href: "/apartments/glaraki" },
  { label: "Petralona", href: "/apartments/petralona" },
  { label: "Areios Pagos", href: "/apartments/areios-pagos" },
  { label: "Kato Pasia", href: "/apartments/kato-pasia" },
  { label: "Korinthos", href: "/apartments/korinthos" },
];

/* EDIT HERE: how many apartment rows show before "Show more" */
const VISIBLE_COUNT = 6;

/* EDIT HERE: contact details */
const PHONES = [
  { display: "+49 160 9243 2179", href: "tel:+4916092432179" },
  { display: "+49 151 2404 9188", href: "tel:+4915124049188" },
];
const EMAIL = "invest@aurevon-globalpartners.com";
const SITE = "www.aurevon-globalpartners.com";

/* EDIT HERE: words that scroll across the top of the footer */
const RIBBON = ["Live", "Invest", "Build your future", "Greece"];

/* Greek key (meander) band, same motif as the page */
const meander: CSSProperties = {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='14'><path d='M0 13V1H13V10H5V5H9M13 1H18' fill='none' stroke='%23b98a45' stroke-width='1.4'/></svg>")`,
  backgroundRepeat: "repeat-x",
};

function Heading({ children }: { children: string }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-(--gold-light)">
        {children}
      </h3>
      <span className="mt-3 block h-px w-10 bg-linear-to-r from-(--gold) to-transparent" />
    </div>
  );
}

const navLink =
  "group inline-flex items-center gap-3 text-white/80 transition hover:text-(--gold-light)";
const Dash = () => (
  <span
    aria-hidden
    className="h-px w-4 shrink-0 bg-(--gold) transition-all duration-300 group-hover:w-8"
  />
);

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    aria-hidden
    viewBox="0 0 10 6"
    className={`h-1.5 w-2.5 shrink-0 transition-transform duration-300 ${
      open ? "rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M1 1l4 4 4-4" />
  </svg>
);

/* Smooth open/close. Closed content is hidden from keyboard and screen readers too. */
function Collapse({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div
      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className={`overflow-hidden ${open ? "" : "invisible"}`}>
        {children}
      </div>
    </div>
  );
}

/* A group (Piraeus, Pagrati, Votanikos): click to open its list */
function Group({ group }: { group: FooterGroup }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`group flex w-full items-center justify-between gap-3 text-left transition hover:text-(--gold-light) ${
          open ? "text-(--gold-light)" : "text-white/80"
        }`}
      >
        <span className="inline-flex items-center gap-3">
          <Dash />
          {group.label}
          <span className="text-[10px] text-white/40">
            {group.items.length}
          </span>
        </span>
        <Chevron open={open} />
      </button>
      <Collapse open={open}>
        <ul className="mt-2 space-y-2 border-l border-(--gold)/40 pb-1 pl-4">
          {group.items.map((g) => (
            <li key={g.href}>
              <Link href={g.href} className={`${navLink} text-[13px]`}>
                <Dash />
                {g.label}
              </Link>
            </li>
          ))}
        </ul>
      </Collapse>
    </li>
  );
}

function renderItem(p: FooterItem | FooterGroup) {
  return "items" in p ? (
    <Group key={p.label} group={p} />
  ) : (
    <li key={p.href}>
      <Link href={p.href} className={navLink}>
        <Dash />
        {p.label}
      </Link>
    </li>
  );
}

function Apartments() {
  const [showAll, setShowAll] = useState(false);
  const first = PROPERTIES.slice(0, VISIBLE_COUNT);
  const rest = PROPERTIES.slice(VISIBLE_COUNT);

  return (
    <>
      <Heading>Apartments</Heading>
      <ul className="mt-6 space-y-3 text-sm">{first.map(renderItem)}</ul>

      <Collapse open={showAll}>
        <ul className="space-y-3 pt-3 text-sm">{rest.map(renderItem)}</ul>
      </Collapse>

      <button
        type="button"
        aria-expanded={showAll}
        onClick={() => setShowAll((v) => !v)}
        className="mt-5 inline-flex items-center gap-2 border border-(--gold)/50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-(--gold-light) transition hover:border-(--gold-light) hover:bg-(--gold)/10"
      >
        {showAll ? "Show less" : "Show more"}
        <Chevron open={showAll} />
      </button>

      <div className="mt-4">
        <Link
          href="/apartments"
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/70 transition hover:text-(--gold-light)"
        >
          View all apartments
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </>
  );
}

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      className="relative overflow-hidden bg-(--navy-deep) text-white"
      style={palette}
    >
      {/* soft gold glow behind the wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(50% 45% at 50% 0%, rgba(226,184,98,0.16), transparent 70%)",
        }}
      />

      {/* moving ribbon */}
      <div className="relative border-b border-(--gold)/30 bg-(--navy) py-4">
        <Marquee
          items={RIBBON}
          className="font-serif text-sm uppercase tracking-[0.4em] text-(--gold-light) md:text-base"
        />
      </div>

      {/* cream band: the transparent logo keeps its original colours, no plate around it */}
      <div className="relative bg-(--cream) px-6 pb-8 pt-12 text-center">
        <Reveal3D variant="zoom" duration={1300}>
          <Tilt3D max={6} className="inline-block">
           <Image
  src="/images/aurevon_logo_rbg.png"
  alt="Aurevon Global Partners"
  width={800}
  height={240}
  className="h-32 w-auto md:h-48"
/>
          </Tilt3D>
        </Reveal3D>
        <div
          aria-hidden
          className="mx-auto mt-8 h-3.5 max-w-xl opacity-80"
          style={meander}
        />
      </div>

      {/* columns */}
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-12 md:gap-10 md:py-20">
        <Reveal3D variant="flipLeft" className="md:col-span-4">
          <p className="font-serif text-xl uppercase leading-snug tracking-wide text-white md:text-2xl">
            Live. Invest.
            <br />
            <span className="text-(--gold-light)">Build your future.</span>
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
            Greece property and residency opportunities.
          </p>
          <Tilt3D className="mt-8 inline-block">
            <Link
              href="/contact"
              className="inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-(--navy) shadow-lg transition hover:brightness-110"
            >
              Inquire now
            </Link>
          </Tilt3D>
        </Reveal3D>

        <Reveal3D variant="rise" delay={100} className="md:col-span-2">
          <Heading>Explore</Heading>
          <nav aria-label="Footer">
            <ul className="mt-6 space-y-3 text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={navLink}>
                    <Dash />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal3D>

        <Reveal3D variant="rise" delay={200} className="md:col-span-3">
          <Apartments />
        </Reveal3D>

        <Reveal3D variant="flipRight" delay={300} className="md:col-span-3">
          <Heading>Contact</Heading>
          <ul className="mt-6 space-y-3 text-sm text-white/80">
            {PHONES.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="transition hover:text-(--gold-light)">
                  {p.display}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="break-all transition hover:text-(--gold-light)"
              >
                {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={`https://${SITE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all transition hover:text-(--gold-light)"
              >
                {SITE}
              </a>
            </li>
          </ul>
        </Reveal3D>
      </div>

      {/* legal + back to top */}
      <div className="relative mx-auto max-w-6xl px-6 pb-10">
        <span className="block h-px w-full bg-linear-to-r from-transparent via-(--gold)/50 to-transparent" />
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-white/65">
          <p>© {year ?? ""} Aurevon Global Partners. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="border border-(--gold)/50 px-4 py-2 uppercase tracking-[0.2em] text-(--gold-light) transition hover:border-(--gold-light) hover:bg-(--gold)/10"
          >
            Back to top
          </button>
        </div>
        <p className="mt-4 max-w-2xl text-xs leading-relaxed text-white/55">
          The information on this website is general in nature and does not
          constitute legal, financial, or immigration advice. Residency
          outcomes depend on each country&apos;s requirements and are not
          guaranteed.
        </p>
      </div>
    </footer>
  );
}