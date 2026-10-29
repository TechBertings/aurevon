"use client";

import { useState, type FormEvent } from "react";

const EMAIL = "invest@aurevon-globalpartners.com";

const label =
  "block text-[10px] font-semibold uppercase tracking-[0.25em] text-(--gold-dark)";
const field =
  "mt-2 w-full border-0 border-b border-(--navy)/30 bg-transparent px-0 py-3 text-sm text-(--navy) placeholder:text-(--navy)/40 transition focus:border-(--gold) focus:outline-none focus:ring-0";

const interests = [
  "Property Investment",
  "Residency Opportunities",
  "Seizani Loft Apartments, Nea Ionia",
  "Pythagoras Loft Apartment, Korydallos",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  /* No backend yet: this opens the visitor's email app with everything filled in.
     Swap the body of onSubmit for a fetch() to your API route / Supabase when ready. */
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const interest = String(d.get("interest") || "General enquiry");
    const body = [
      `Name: ${d.get("name")}`,
      `Email: ${d.get("email")}`,
      `Phone: ${d.get("phone") || "-"}`,
      `Interested in: ${interest}`,
      "",
      String(d.get("message") || ""),
    ].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      `Enquiry: ${interest}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Full name
          </label>
          <input id="name" name="name" required autoComplete="name" className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={label}>
            Phone <span className="font-normal normal-case tracking-normal text-(--navy)/50">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} placeholder="+00 000 000 0000" />
        </div>
        <div>
          <label htmlFor="interest" className={label}>
            I am interested in
          </label>
          <select id="interest" name="interest" required defaultValue="" className={field}>
            <option value="" disabled>
              Select an option
            </option>
            {interests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${field} resize-none`}
          placeholder="Tell us what you are looking for and we will get back to you."
        />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          className="bg-linear-to-b from-(--gold-light) to-(--gold) px-9 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg transition hover:brightness-110"
        >
          Send message
        </button>
        {sent && (
          <p role="status" className="text-xs leading-relaxed text-(--navy)/70">
            Your email app should open with the message ready. If it does not,
            write to {EMAIL}.
          </p>
        )}
      </div>
    </form>
  );
}