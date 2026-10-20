const steps = [
  "Free consultation and eligibility check",
  "Choose a qualified property",
  "Submit documents and application",
  "Approval and residency issuance",
];

export default function Residency() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold">Residency Opportunities</h1>
      <p className="mt-3 text-slate-600">
        Qualified property investments can open pathways to residency. Here is
        how the process works.
      </p>
      <ol className="mt-10 space-y-4">
        {steps.map((s, i) => (
          <li
            key={s}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-600 font-bold text-white">
              {i + 1}
            </span>
            <span className="font-medium">{s}</span>
          </li>
        ))}
      </ol>
    </section>
  );
} 