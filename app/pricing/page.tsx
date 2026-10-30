import Link from "next/link";
import type { ReactNode } from "react";
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
  title: "Transparent Investment Pricing | Aurevon Global Partners",
  description:
    "One clearly disclosed 18% Aurevon package fee, itemised Greek purchasing and residency costs, and a secure staged payment structure.",
};

/* ───────── DATA · EDIT HERE ───────── */
const heroPoints = [
  "A proposed commercial fee, not a Greek tax or government charge",
  "Covers the agreed coordination package and any eligible partner compensation",
  "No additional 5% referral fee on top of the 18%",
];

type Row = { label: string; note?: string; amount: string };

const quotation: Row[] = [
  { label: "Net property price", note: "Paid to Greece", amount: "EUR 260,000" },
  { label: "Aurevon investment support package", note: "18%", amount: "EUR 46,800" },
  { label: "Greek property acquisition costs", note: "Supplier estimate", amount: "EUR 16,978" },
  {
    label: "Greek residence application and legal costs",
    note: "Sample family. Includes the optional EUR 4,000 expedited-coordination allowance.",
    amount: "EUR 9,016",
  },
];

const purchasing: Row[] = [
  { label: "Title deed transfer fee", note: "3.09%", amount: "EUR 8,034" },
  { label: "Lawyer legal fee", note: "1.24%", amount: "EUR 3,224" },
  { label: "Public notary fee", note: "1.50%", amount: "EUR 3,900" },
  { label: "Land registry fee", note: "0.70%", amount: "EUR 1,820" },
];

const residency: Row[] = [
  { label: "Main applicant, PR lawyer fee", amount: "EUR 1,000" },
  { label: "Main applicant, government fee", amount: "EUR 2,016" },
  { label: "Family member 1", amount: "EUR 500" },
  { label: "Family member 2", amount: "EUR 500" },
  { label: "PR lawyer fee for two family members", amount: "EUR 1,000" },
];

const recipients = [
  {
    who: "Greek seller / developer",
    text: "The net property price is paid by the buyer directly to the contract-designated, legally authorised Greek account, following Greek lawyer and notary instructions.",
  },
  {
    who: "Aurevon Philippines",
    text: "The separately contracted 18% service package is paid to Aurevon's verified official Philippine business bank account only, after registration, invoicing, tax treatment and legal authority to collect have been confirmed. Aurevon then handles its agreed partner compensation internally.",
  },
  {
    who: "Third-party Greek charges",
    text: "Taxes, notary, land registry, legal and immigration charges are paid to the legally authorised recipients against invoices or official payment instructions. They are not automatically payable to Aurevon.",
  },
];

const stages = [
  {
    t: "Written quotation and verification",
    d: "Provide property details, seller identity, availability confirmation, net price, an itemised 18% package scope, the Greek fee estimate, a Golden Visa eligibility opinion where relevant, and the full payment schedule. Identity, title, licensing and source-of-funds checks are carried out.",
  },
  {
    t: "Reservation, only if contractually agreed",
    d: "Any reservation amount, including the previously proposed PHP 50,000, must be supported by a signed reservation agreement naming the recipient, purpose, conditions, currency, whether it is credited toward the price or fees, and clear cancellation and refund terms. It is not an automatic mandatory Greek legal fee, and a blanket non-refundable promise should be avoided.",
  },
  {
    t: "Property purchase instalments to Greece",
    d: "The buyer transfers the net property price directly to the Greek seller or developer, or another legally authorised recipient, under the executed contract. The amount and timing of deposits, any 50/50 schedule and completion payments must follow the contract approved by the Greek lawyer or notary. Do not transfer the full amount solely to start visa processing.",
  },
  {
    t: "Aurevon fee and Greek transaction expenses",
    d: "Pay the agreed Aurevon service fee in contract-defined milestones to the verified official Philippine company account, once lawful collection and invoicing are confirmed. Pay Greek taxes, legal, notary, registry and immigration charges to their authorised payees against documented instructions.",
  },
  {
    t: "Completion and residency application",
    d: "The Greek lawyer or notary handles title transfer and registration. The residency application, biometrics and permit decisions follow the current Greek process and eligibility rules. Any travel and accommodation inclusions apply only to the one named main investor, as specified in the signed service agreement.",
  },
];

const quotationItems = [
  "The net seller property price",
  "The 18% Aurevon package fee",
  "Estimated Greek acquisition and residency expenses",
  "Taxes and any exclusions",
  "The verified legal recipient of each payment",
];

/* ───────── PIECES ───────── */
function PriceTable({
  head,
  rows,
  total,
}: {
  head: [string, string];
  rows: Row[];
  total: { label: string; amount: string };
}) {
  return (
    <div className="overflow-x-auto border border-(--gold)/40 bg-white shadow-[0_30px_60px_-35px_rgba(16,35,94,0.5)]">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-(--navy) text-(--gold-light)">
            <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.25em]">
              {head[0]}
            </th>
            <th className="px-5 py-3.5 text-right text-[10px] font-semibold uppercase tracking-[0.25em]">
              {head[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-(--gold)/25">
              <td className="px-5 py-4 text-(--navy)/90">
                {r.label}
                {r.note && (
                  <span className="mt-0.5 block text-xs text-(--navy)/60">
                    {r.note}
                  </span>
                )}
              </td>
              <td className="whitespace-nowrap px-5 py-4 text-right font-serif font-bold text-(--navy)">
                {r.amount}
              </td>
            </tr>
          ))}
          <tr className="bg-(--paper)">
            <td className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-(--navy)">
              {total.label}
            </td>
            <td className="whitespace-nowrap px-5 py-4 text-right font-serif text-lg font-bold text-(--gold-dark)">
              {total.amount}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-(--gold) bg-(--paper)/70 px-5 py-4 text-sm leading-relaxed text-(--navy)/80">
      {children}
    </p>
  );
}

export default function PricingPage() {
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
                Aurevon Global Partners
              </p>
            </Reveal3D>
            <h1 className="mt-6 font-serif text-4xl font-bold uppercase leading-[1.04] tracking-tight md:text-6xl">
              <Words text="Transparent" className="block" />
              <Words
                text="Investment Pricing"
                className="block"
                delay={300}
                wordClass="bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-transparent"
              />
            </h1>
            <Reveal3D variant="rise" delay={500}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-(--navy)/80">
                One clearly disclosed Aurevon package fee: 18% of the confirmed
                net property price, with every other cost shown separately and
                paid to its own authorised recipient.
              </p>
              <a
                href="#quotation"
                className="mt-9 inline-block bg-(--navy) px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:bg-(--gold-dark)"
              >
                See an example
              </a>
            </Reveal3D>
          </div>

          <Reveal3D variant="flipRight" className="lg:col-span-5">
            <div className="relative overflow-hidden bg-(--navy) p-8 text-white shadow-[0_40px_70px_-30px_rgba(16,35,94,0.6)] md:p-10">
              <div aria-hidden className="absolute inset-0" style={glow("100% 0%", 0.3)} />
              <div aria-hidden className="pointer-events-none absolute inset-3 border border-(--gold)/50" />
              <div className="relative">
                <p className="font-serif text-7xl font-bold text-(--gold-light) md:text-8xl">
                  18%
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80">
                  Of the confirmed net property price
                </p>
                <span className="my-7 block h-px w-full bg-(--gold)/40" />
                <ul className="space-y-3 text-sm leading-relaxed text-white/85">
                  {heroPoints.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-(--gold-light)" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal3D>
        </div>
        <Meander className="relative opacity-70" />
      </section>

      {/* ───────── ILLUSTRATIVE QUOTATION ───────── */}
      <section id="quotation" className="relative scroll-mt-20 bg-(--cream)">
        <Paper />
        <div className="relative mx-auto max-w-4xl px-6 py-20 md:py-28">
          <Title title="Illustrative quotation" sub="EUR 260,000 property" />
          <div className="mt-12">
            <Reveal3D variant="rise">
              <PriceTable
                head={["Description", "Illustrative amount"]}
                rows={quotation}
                total={{ label: "Indicative combined budget", amount: "EUR 332,794" }}
              />
            </Reveal3D>
          </div>
          <div className="mt-8">
            <Note>
              <strong className="font-semibold text-(--navy)">Important:</strong>{" "}
              EUR 332,794 is not a fixed or all-inclusive offer. Translation,
              additional family applicants, travel exclusions, insurance,
              banking and FX charges, possible VAT on services, and other
              transaction-specific charges may apply. Greek tax calculations
              may depend on the applicable taxable value and transaction type.
            </Note>
          </div>
        </div>
      </section>

      {/* ───────── WHO RECEIVES WHICH PAYMENT ───────── */}
      <section className="relative bg-(--paper)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Title title="Who receives which payment?" sub="Three payments, three recipients" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {recipients.map((r, i) => (
              <Reveal3D key={r.who} variant="flipCard" delay={i * 120}>
                <div className="h-full border border-(--gold)/40 bg-white p-8">
                  <span className="font-serif text-xs tracking-[0.3em] text-(--gold)">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-bold uppercase tracking-wide">
                    {r.who}
                  </h3>
                  <span className="my-5 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                  <p className="text-sm leading-relaxed text-(--navy)/75">{r.text}</p>
                </div>
              </Reveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── GREEK PURCHASING & RESIDENCY COSTS ───────── */}
      <section className="relative bg-(--cream)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Title
            title="Greek purchasing & residency costs"
            sub="Supplier worksheet using a EUR 260,000 contract price"
          />
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-(--navy)/75">
            These figures are supplier estimates, not guaranteed statutory
            rates or a final invoice.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Reveal3D variant="flipLeft">
              <PriceTable
                head={["Purchasing cost", "Worksheet amount"]}
                rows={purchasing}
                total={{ label: "Total purchasing costs", amount: "EUR 16,978" }}
              />
            </Reveal3D>
            <Reveal3D variant="flipRight">
              <PriceTable
                head={["Residency and legal cost, sample scenario", "Worksheet amount"]}
                rows={residency}
                total={{ label: "Total estimated PR costs", amount: "EUR 5,016" }}
              />
            </Reveal3D>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <Reveal3D variant="rise" className="lg:col-span-5">
              <div className="h-full border border-(--gold)/40 bg-white p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">
                  Combined acquisition and PR estimate
                </p>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between gap-4 border-b border-(--gold)/25 pb-3">
                    <dt className="text-(--navy)/80">Base estimate</dt>
                    <dd className="font-serif font-bold">EUR 21,994</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-(--gold)/25 pb-3">
                    <dt className="text-(--navy)/80">Optional expedited allowance</dt>
                    <dd className="font-serif font-bold">EUR 4,000</dd>
                  </div>
                  <div className="flex justify-between gap-4 pt-1">
                    <dt className="font-semibold text-(--navy)">With allowance</dt>
                    <dd className="font-serif text-lg font-bold text-(--gold-dark)">
                      EUR 25,994
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal3D>
            <Reveal3D variant="rise" delay={120} className="lg:col-span-7">
              <ul className="space-y-4 text-sm leading-relaxed text-(--navy)/80">
                <li className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-(--gold)" />
                  The worksheet assumes a main applicant and two family
                  members. Actual fees change with the number and ages of
                  dependants, the scope of lawyer services, current government
                  fees and eligibility.
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-(--gold)" />
                  English-Greek translation is charged per page and is not
                  included in the total. Request an updated itemised quote
                  from the Greek lawyer and notary before you commit.
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-(--gold)" />
                  The 3.09% transfer tax illustration does not apply to every
                  transaction. VAT and new-build treatment, and the relevant
                  taxable value, must be confirmed independently. The other
                  percentages are estimates, not universal legal rates.
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-(--gold)" />
                  The EUR 4,000 fast-track coordination allowance is a
                  proposed additional amount, not a verified Greek government
                  fee.
                </li>
              </ul>
            </Reveal3D>
          </div>
        </div>
      </section>

      {/* ───────── SECURE PAYMENT STRUCTURE · navy ───────── */}
      <div className="bg-(--cream)">
        <Wave />
      </div>
      <section
        className="relative -mt-px overflow-hidden bg-(--navy) px-6 py-16 text-white md:py-24"
        style={glow("50% 0%", 0.25)}
      >
        <div className="relative mx-auto max-w-4xl">
          <Title
            title="Proposed secure payment structure"
            sub="Property funds, Aurevon package and Greek charges, each with its own invoice"
            dark
          />
          <div className="mt-14">
            {stages.map((s, i) => (
              <Reveal3D key={s.t} variant="rise" delay={i * 80}>
                <div className="grid grid-cols-[3.5rem_1fr] gap-5 border-t border-(--gold)/35 py-8 md:grid-cols-[5rem_1fr] md:gap-8">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                      Stage
                    </p>
                    <p className="font-serif text-4xl font-bold text-(--gold-light) md:text-5xl">
                      {i + 1}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold uppercase tracking-wide md:text-2xl">
                      {s.t}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">
                      {s.d}
                    </p>
                  </div>
                </div>
              </Reveal3D>
            ))}
          </div>
          <Reveal3D variant="rise">
            <div className="mt-6 border border-(--gold)/60 p-6 md:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-light)">
                Payment security
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/85">
                Independently confirm account details through a known phone
                number, and never rely solely on changed email or messaging
                instructions. Keep receipts, invoices and SWIFT transfer
                confirmations.
              </p>
            </div>
          </Reveal3D>
        </div>
      </section>
      <div className="bg-(--paper)">
        <div className="bg-(--navy)">
          <Wave flip />
        </div>
      </div>

      {/* ───────── DISCLOSURES ───────── */}
      <section id="disclosures" className="relative -mt-px scroll-mt-20 bg-(--paper)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Title title="Important disclosures" sub="Investor-first transparency" />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <Reveal3D variant="flipLeft">
              <div className="h-full border border-(--gold)/40 bg-white p-8">
                <h3 className="font-serif text-lg font-bold uppercase tracking-wide">
                  Property and residency eligibility
                </h3>
                <span className="my-5 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                <p className="text-sm leading-relaxed text-(--navy)/75">
                  Properties shown are subject to price changes, availability
                  and seller confirmation. Owning a property does not
                  automatically qualify an investor for a Greek Golden Visa.
                  Thresholds, permitted property categories and use
                  restrictions apply. Lower-priced properties in Attica,
                  including Drapetsona, require documented proof of an
                  applicable exception before being described as Golden Visa
                  eligible. Greek investor residence permits are generally
                  renewable subject to continued compliance; approval,
                  renewals and citizenship are not guaranteed.
                </p>
              </div>
            </Reveal3D>
            <Reveal3D variant="rise" delay={120}>
              <div className="h-full border border-(--gold)/40 bg-white p-8">
                <h3 className="font-serif text-lg font-bold uppercase tracking-wide">
                  Professional and regulatory boundaries
                </h3>
                <span className="my-5 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                <p className="text-sm leading-relaxed text-(--navy)/75">
                  Aurevon acts as an investment-support and
                  property-introduction coordinator only to the extent
                  permitted by applicable Philippine and Greek law. Regulated
                  real estate brokerage, conveyancing, tax, immigration and
                  legal services must be undertaken by appropriately
                  authorised professionals. Philippine business registration
                  alone does not establish authority to perform all brokerage
                  activities.
                </p>
              </div>
            </Reveal3D>
            <Reveal3D variant="flipRight" delay={240}>
              <div className="h-full border border-(--gold)/40 bg-white p-8">
                <h3 className="font-serif text-lg font-bold uppercase tracking-wide">
                  What every quotation shows
                </h3>
                <span className="my-5 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                <ol className="space-y-3 text-sm text-(--navy)/80">
                  {quotationItems.map((q, i) => (
                    <li key={q} className="flex gap-3">
                      <span className="font-serif text-xs tracking-[0.2em] text-(--gold)">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {q}
                    </li>
                  ))}
                </ol>
                <p className="mt-5 text-sm leading-relaxed text-(--navy)/75">
                  No guaranteed investment return, residency approval or fixed
                  property availability is promised.
                </p>
              </div>
            </Reveal3D>
          </div>

          <div className="mt-8">
            <Note>
              <strong className="font-semibold text-(--navy)">Note:</strong>{" "}
              All prices, fees and totals are illustrative only. Actual costs
              depend on the confirmed net property price, applicable taxes,
              professional and residency fees, and transaction-specific
              charges. This is an example computation structure, not a fixed
              or final quotation. Property prices and availability are subject
              to change.
            </Note>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-(--navy)/60">
            Residency reference: Greek Ministry of Migration and Asylum
            (migration.gov.gr), reviewed 20 October 2026. Current requirements
            must be checked for each case.
          </p>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <div className="bg-(--paper)">
        <Wave />
      </div>
      <section
        className="relative -mt-px overflow-hidden bg-(--navy) px-6 pb-24 pt-10 text-center text-white md:pb-32"
        style={glow("50% 0%", 0.28)}
      >
        <div className="relative mx-auto max-w-3xl border border-(--gold)/60 p-10 md:p-16">
          <Meander className="absolute inset-x-6 top-3 opacity-60" color="%23e2b862" />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-light)">
            Aurevon Global Partners
          </p>
          <h2 className="mx-auto mt-5 max-w-xl font-serif text-3xl font-bold uppercase leading-tight md:text-5xl">
            <Words text="Request a personalised quotation" className="block" />
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
            Tell us the property and your family size, and we will send a
            written, itemised quotation.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110"
          >
            Inquire now
          </Link>
          <Meander className="absolute inset-x-6 bottom-3 opacity-60" color="%23e2b862" />
        </div>
      </section>
    </main>
  );
}