"use client";
import { useState, useEffect, type CSSProperties } from "react";
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
  { label: "Contact", href: "/contact" },
];

/* EDIT HERE: words that scroll across the top of the footer */
const RIBBON = ["Live", "Invest", "Build your future", "Greece"];

/* Greek key (meander) band, same motif as the page */
const meander: CSSProperties = {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='14'><path d='M0 13V1H13V10H5V5H9M13 1H18' fill='none' stroke='%23b98a45' stroke-width='1.4'/></svg>")`,
  backgroundRepeat: "repeat-x",
};

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
              width={320}
              height={96}
              className="h-20 w-auto md:h-28"
            />
          </Tilt3D>
        </Reveal3D>
        <div
          aria-hidden
          className="mx-auto mt-8 h-3.5 max-w-xl opacity-80"
          style={meander}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-14 md:grid-cols-12 md:items-start">
        <Reveal3D variant="flipLeft" className="md:col-span-6">
          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            Greece property and residency opportunities. Live, invest, build
            your future.
          </p>
        </Reveal3D>

        <Reveal3D variant="rise" delay={150} className="md:col-span-3">
          <nav aria-label="Footer">
            <ul className="space-y-3 text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-3 text-white/80 transition hover:text-(--gold-light)"
                  >
                    <span
                      aria-hidden
                      className="h-px w-4 bg-(--gold) transition-all duration-300 group-hover:w-8"
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal3D>

        <Reveal3D variant="flipRight" delay={300} className="md:col-span-3">
          <Tilt3D className="inline-block">
            <Link
              href="/contact"
              className="inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-(--navy) shadow-lg transition hover:brightness-110"
            >
              Inquire now
            </Link>
          </Tilt3D>
        </Reveal3D>
      </div>

      <div className="relative mx-auto max-w-6xl border-t border-white/15 px-6 py-8 text-xs text-white/65">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p>© {year ?? ""} Aurevon Global Partners. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="border border-(--gold)/50 px-4 py-2 uppercase tracking-[0.2em] text-(--gold-light) transition hover:border-(--gold-light) hover:bg-(--gold)/10"
          >
            Back to top
          </button>
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed">
          The information on this website is general in nature and does not
          constitute legal, financial, or immigration advice. Residency
          outcomes depend on each country&apos;s requirements and are not
          guaranteed.
        </p>
      </div>
    </footer>
  );
}