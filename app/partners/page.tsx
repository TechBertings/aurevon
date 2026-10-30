import Link from "next/link";
import { Reveal3D, S3Styles, ScrollBar, Words } from "../components/scroll-3d";
import {
  Meander,
  Paper,
  Title,
  Wave,
  glow,
  palette,
} from "../components/page-bits";

export const metadata = {
  title: "Partners | Aurevon Global Partners",
  description:
    "Agents, agencies and developers: introduce clients to Greek property opportunities and build a lasting cross-border partnership with Aurevon.",
};

const EMAIL = "invest@aurevon-globalpartners.com";
const SUBJECT = "Philippines Property Partnership";

/* ───────── DATA · EDIT HERE ───────── */
const audiences = [
  {
    t: "For agents & brokers",
    d: "Give suitable clients an additional overseas property option. Introduce qualified prospects and earn the agreed 5% commission on successful referrals, paid by Aurevon from its own package revenue and never added to the investor's quotation.",
  },
  {
    t: "For real estate agencies",
    d: "Discuss joint client presentations, small-group investor briefings and a clear referral process for your team. Coordinate approved materials and follow-up responsibilities.",
  },
  {
    t: "For developers & project owners",
    d: "Explore strategic introductions, investor presentations or project collaboration where the market and offering align. Project representation and any separate commercial terms require a dedicated agreement.",
  },
];

const steps = [
  {
    t: "Partner introduction",
    d: "Discuss your market, client profile and proposed cooperation; agree written terms.",
  },
  {
    t: "Client discovery & shortlist",
    d: "Confirm the client's budget, objectives and preferences; request a suitable property shortlist.",
  },
  {
    t: "Professional review & reservation",
    d: "Arrange legal and technical checks. Confirm any reservation amount, refund conditions and payment schedule in writing.",
  },
  {
    t: "Purchase & residency assessment",
    d: "The seller or developer and appointed professionals handle the transaction. A lawyer assesses any proposed residence application.",
  },
  {
    t: "Handover & onward coordination",
    d: "Coordinate agreed follow-up and, where requested, introductions for property management and ongoing support.",
  },
];

const policies = [
  {
    t: "Partner and referral compensation",
    d: "Aurevon may compensate qualified Philippine agents, brokers or referral partners from its own 18% package revenue. No separate 5% charge is added to the investor's quotation. Any internal referral rate, eligibility, trigger for payment, tax withholding and licensing requirements must be set out in a signed partner agreement. Unlicensed persons must not perform regulated brokerage activities.",
  },
  {
    t: "Property and residency eligibility",
    d: "Properties shown are subject to price changes, availability and seller confirmation. Owning a property does not automatically qualify an investor for a Greek Golden Visa. Lower-priced properties in Attica, including Drapetsona, require documented proof of an applicable exception before being described as Golden Visa eligible. Approval, renewals and citizenship are not guaranteed.",
  },
  {
    t: "Professional and regulatory boundaries",
    d: "Aurevon acts as an investment-support and property-introduction coordinator only to the extent permitted by applicable Philippine and Greek law. Regulated brokerage, conveyancing, tax, immigration and legal services must be undertaken by appropriately authorised professionals.",
  },
];

const beforeYouPresent = [
  "Current pricing and availability",
  "A full cost breakdown",
  "Written reservation terms",
  "Property-specific residency advice",
];

export default function PartnersPage() {
  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      <S3Styles />
      <ScrollBar />

      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-(--paper) to-(--cream) pt-32 md:pt-40">
        <Paper />
        <div aria-hidden className="absolute inset-0" style={glow("85% 90%", 0.4)} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 md:pb-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal3D variant="flipLeft">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
                Agencies &amp; developers
              </p>
            </Reveal3D>
            <h1 className="mt-6 font-serif text-4xl font-bold uppercase leading-[1.04] tracking-tight md:text-6xl">
              <Words text="Broaden your reach." className="block" />
              <Words
                text="Build with Aurevon."
                className="block"
                delay={300}
                wordClass="bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-transparent"
              />
            </h1>
            <Reveal3D variant="rise" delay={500}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-(--navy)/80">
                A partnership conversation for teams ready to explore
                cross-border property opportunities.
              </p>
            </Reveal3D>
          </div>

          <Reveal3D variant="flipRight" className="lg:col-span-5">
            <div className="relative overflow-hidden bg-(--navy) p-8 text-white shadow-[0_40px_70px_-30px_rgba(16,35,94,0.6)] md:p-10">
              <div aria-hidden className="absolute inset-0" style={glow("100% 0%", 0.3)} />
              <div aria-hidden className="pointer-events-none absolute inset-3 border border-(--gold)/50" />
              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-(--gold-light)">
                  Start with one conversation
                </p>
                <p className="mt-5 text-sm leading-relaxed text-white/85">
                  Tell us your market, client profile or project, and the kind
                  of cooperation you want to explore.
                </p>
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`}
                  className="mt-8 inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110"
                >
                  Book a partner meeting
                </a>
              </div>
            </div>
          </Reveal3D>
        </div>
        <Meander className="relative opacity-70" />
      </section>

      {/* ───────── AUDIENCES ───────── */}
      <section className="relative bg-(--cream)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Title title="Three ways to partner" sub="Agents, agencies and developers" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {audiences.map((a, i) => (
              <Reveal3D key={a.t} variant="flipCard" delay={i * 120}>
                <div className="h-full border border-(--gold)/40 bg-white p-8">
                  <span className="font-serif text-4xl font-bold text-(--gold)">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-bold uppercase tracking-wide">
                    {a.t}
                  </h3>
                  <span className="my-5 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                  <p className="text-sm leading-relaxed text-(--navy)/75">{a.d}</p>
                </div>
              </Reveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── PROCESS · navy ───────── */}
      <div className="bg-(--cream)">
        <Wave />
      </div>
      <section
        className="relative -mt-px overflow-hidden bg-(--navy) px-6 py-16 text-white md:py-24"
        style={glow("50% 0%", 0.25)}
      >
        <div className="relative mx-auto max-w-6xl">
          <Title
            title="A clear path. A coordinated experience."
            sub="From introduction to ownership"
            dark
            center
          />
          <ol className="mt-14 grid grid-cols-1 divide-y divide-(--gold)/30 border-y border-(--gold)/50 md:grid-cols-5 md:divide-x md:divide-y-0">
            {steps.map((s, i) => (
              <li key={s.t}>
                <Reveal3D variant="rise" delay={i * 100}>
                  <div className="px-6 py-9">
                    <span className="font-serif text-4xl font-bold text-(--gold-light)">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="my-4 block h-px w-8 bg-(--gold)/70" />
                    <h3 className="text-[11px] font-semibold uppercase leading-relaxed tracking-[0.2em]">
                      {s.t}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-white/70">
                      {s.d}
                    </p>
                  </div>
                </Reveal3D>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <div className="bg-(--paper)">
        <div className="bg-(--navy)">
          <Wave flip />
        </div>
      </div>

      {/* ───────── POLICY ───────── */}
      <section className="relative -mt-px bg-(--paper)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Title title="Partner policy" sub="Important disclosures" />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {policies.map((p, i) => (
              <Reveal3D key={p.t} variant="rise" delay={i * 120}>
                <div className="h-full border border-(--gold)/40 bg-white p-8">
                  <h3 className="font-serif text-lg font-bold uppercase tracking-wide">
                    {p.t}
                  </h3>
                  <span className="my-5 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                  <p className="text-sm leading-relaxed text-(--navy)/75">{p.d}</p>
                </div>
              </Reveal3D>
            ))}
          </div>

          <Reveal3D variant="rise">
            <div className="mt-8 grid gap-8 border border-(--gold)/50 bg-(--cream) p-8 md:grid-cols-12 md:p-10">
              <div className="md:col-span-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">
                  Before you present an opportunity
                </p>
                <p className="mt-3 font-serif text-xl font-bold uppercase leading-snug">
                  Request these four things
                </p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 md:col-span-8">
                {beforeYouPresent.map((b) => (
                  <li key={b} className="flex gap-3 text-sm text-(--navy)/85">
                    <svg
                      viewBox="0 0 20 20"
                      aria-hidden
                      className="mt-0.5 h-4 w-4 shrink-0 text-(--gold-dark)"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <circle cx="10" cy="10" r="8.5" />
                      <path d="M6 10.5l2.8 2.8L14 7.6" />
                    </svg>
                    {b}
                  </li>
                ))}
                <li className="text-xs leading-relaxed text-(--navy)/65 sm:col-span-2">
                  A reservation or down payment alone does not establish
                  residency eligibility. Residency is subject to approval,
                  validity, renewal and continued eligibility.
                </li>
              </ul>
            </div>
          </Reveal3D>
        </div>
      </section>

      {/* ───────── LET'S CONNECT ───────── */}
      <div className="bg-(--paper)">
        <Wave />
      </div>
      <section
        className="relative -mt-px overflow-hidden bg-(--navy) px-6 pb-24 pt-10 text-white md:pb-32"
        style={glow("50% 0%", 0.28)}
      >
        <div className="relative mx-auto max-w-4xl border border-(--gold)/60 p-10 text-center md:p-16">
          <Meander className="absolute inset-x-6 top-3 opacity-60" color="%23e2b862" />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-light)">
            Let&apos;s connect
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl font-serif text-3xl font-bold uppercase leading-tight md:text-5xl">
            <Words text="Open a new conversation. Build a lasting partnership." className="block" />
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
            Tell us about your agency, professional background or development
            project, your location and the clients you serve. We can discuss a
            joint online introduction or a small-group property presentation.
          </p>
          <div className="mx-auto mt-9 max-w-md border border-(--gold)/50 p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-light)">
              Book an introductory partner meeting
            </p>
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`}
              className="mt-3 block break-all font-serif text-lg transition hover:text-(--gold-light) md:text-xl"
            >
              {EMAIL}
            </a>
            <p className="mt-2 text-xs text-white/60">
              Email subject: {SUBJECT}
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-8 inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110"
          >
            Or use the contact form
          </Link>
          <Meander className="absolute inset-x-6 bottom-3 opacity-60" color="%23e2b862" />
        </div>
        <p className="relative mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-white/55">
          Aurevon coordinates introductions and client support; regulated
          advice remains with qualified professionals. This page is
          introductory information, not an investment recommendation or a
          binding offer. Property images and details come from supplied
          brochures; renderings may differ from completed properties.
        </p>
      </section>
    </main>
  );
}