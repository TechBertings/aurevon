import Link from "next/link";
import Hero from "./components/hero";

// TODO: palitan ng totoong numero ng client
const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "30+", label: "Markets Covered" },
  { value: "500+", label: "Clients Advised" },
  { value: "100%", label: "Independent Advice" },
];

const services = [
  {
    href: "/investment",
    title: "Property Investment",
    text: "Access carefully selected residential and commercial opportunities across established and emerging markets.",
  },
  {
    href: "/residency",
    title: "Residency Opportunities",
    text: "Understand how qualifying property investments may support your residency objectives.",
  },
  {
    href: "/contact",
    title: "Advisory Support",
    text: "Professional guidance at every stage, from first consultation to after-care.",
  },
];

const steps = [
  { title: "Consultation", text: "We learn about your goals, timeline, and requirements." },
  { title: "Selection", text: "We present options that fit your objectives and budget." },
  { title: "Application", text: "We coordinate documents and work with qualified partners." },
  { title: "Completion", text: "We support you through to completion and beyond." },
];

const reasons = [
  { title: "Transparent", text: "Clear information on options, costs, and timelines, with no hidden surprises." },
  { title: "Tailored", text: "Every recommendation is built around your own circumstances." },
  { title: "End-to-end", text: "One team from first enquiry through to after-care." },
];

const faqs = [
  {
    q: "What is the minimum investment required?",
    a: "It depends on the market and the programme. Contact us and we will outline the current options for your situation.",
  },
  {
    q: "How long does the process take?",
    a: "Timelines vary by country and application type. We will give you a realistic estimate during your consultation.",
  },
  {
    q: "Does property investment guarantee residency?",
    a: "No. Requirements and approvals are set by each country's authorities. We provide guidance, but outcomes cannot be guaranteed.",
  },
  {
    q: "Do you offer support after purchase?",
    a: "Yes. We can assist with after-care, including coordination with local professionals.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Stats */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-(family-name:--font-display) text-4xl font-light text-[#b8935a] md:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#b8935a]">
          What We Do
        </p>
        <h2 className="mt-4 max-w-2xl font-(family-name:--font-display) text-4xl font-light text-slate-900 md:text-5xl">
          Our Services
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="border border-stone-200 bg-white p-8 transition hover:border-[#b8935a]"
            >
              <h3 className="font-(family-name:--font-display) text-2xl font-light text-slate-900">
                {c.title}
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">{c.text}</p>
              <span className="mt-6 inline-block text-xs font-medium uppercase tracking-[0.15em] text-[#b8935a]">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-900 py-24 text-stone-100">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#b8935a]">
            Our Process
          </p>
          <h2 className="mt-4 font-(family-name:--font-display) text-4xl font-light md:text-5xl">
            How It Works
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="border-t border-white/20 pt-6">
                <span className="font-(family-name:--font-display) text-5xl font-light text-[#b8935a]">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-lg font-medium">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#b8935a]">
          Why Aurevon
        </p>
        <h2 className="mt-4 max-w-2xl font-(family-name:--font-display) text-4xl font-light text-slate-900 md:text-5xl">
          A Considered Approach
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title}>
              <div className="mb-5 h-0.5 w-10 bg-[#b8935a]" />
              <h3 className="text-xl font-medium text-slate-900">{r.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-stone-200 bg-white py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#b8935a]">
            FAQ
          </p>
          <h2 className="mt-4 font-(family-name:--font-display) text-4xl font-light text-slate-900 md:text-5xl">
            Common Questions
          </h2>
          <div className="mt-10 divide-y divide-stone-200 border-y border-stone-200">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-slate-900">
                  {f.q}
                  <span className="text-2xl text-[#b8935a] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-900 px-6 py-24 text-center text-stone-100">
        <h2 className="mx-auto max-w-2xl font-(family-name:--font-display) text-4xl font-light md:text-5xl">
          Ready to Discuss Your Requirements?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-slate-300">
          Speak with our team for an initial, no-obligation conversation.
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-block border border-[#b8935a] bg-[#b8935a] px-8 py-4 text-xs font-medium uppercase tracking-[0.15em] text-slate-900 hover:bg-transparent hover:text-[#b8935a]"
        >
          Get in Touch
        </Link>
      </section>
    </>
  );
}