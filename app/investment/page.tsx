const items = [
  { title: "Residential", text: "Apartments, condos, and homes in growing markets." },
  { title: "Commercial", text: "Office and retail spaces with steady rental income." },
  { title: "Land", text: "Strategic land holdings for long-term appreciation." },
];

export default function Investment() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-family-name:var(--font-display)] text-4xl font-light text-slate-900">
        Property Investment
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Explore property types selected for value, security, and growth.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((i) => (
          <div key={i.title} className="border border-stone-200 bg-white p-8">
            <h2 className="font-family-name:var(--font-display)] text-2xl font-light text-[#b8935a]">
              {i.title}
            </h2>
            <p className="mt-3 text-slate-600">{i.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}