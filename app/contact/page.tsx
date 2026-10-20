export default function Contact() {
  const field =
    "w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-amber-600 focus:outline-none";

  return (
    <section className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="mt-3 text-slate-600">
        Tell us what you are looking for and we will get back to you.
      </p>
      <form className="mt-8 space-y-4">
        <input className={field} placeholder="Full name" />
        <input className={field} type="email" placeholder="Email" />
        <select className={field} defaultValue="">
          <option value="" disabled>
            I am interested in...
          </option>
          <option>Property Investment</option>
          <option>Residency Opportunities</option>
        </select>
        <textarea className={field} rows={4} placeholder="Message" />
        <button
          type="button"
          className="w-full rounded-lg bg-amber-600 py-3 font-semibold text-white hover:bg-amber-500"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}