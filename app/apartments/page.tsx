import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Apartments | Aurevon Global Partners",
  description:
    "Explore our apartments: Seizani Loft, Santa Sophia, Pythagoras and Piraeus Olynthou.",
};

const GOLD = "#b8935a";
const img = (n: string) => `/images/apartments/${n}.jpg`;

/* EDIT HERE: description and cover photo for each apartment */
const apartments = [
  {
    href: "/apartments/seizani-loft",
    name: "Seizani Loft",
    text: "Add a short description of Seizani Loft here.",
    cover: img("light-1"),
  },
  {
    href: "/apartments/santa-sophia",
    name: "Santa Sophia",
    text: "Light, texture and greenery in a calm, private setting.",
    cover: img("balconies-1"),
  },
  {
    href: "/apartments/pythagoras",
    name: "Pythagoras",
    text: "Add a short description of Pythagoras here.",
    cover: img("fins-1"),
  },
  {
    href: "/apartments/piraeus-olynthou",
    name: "Piraeus Olynthou",
    text: "Add a short description of Piraeus Olynthou here.",
    cover: img("plants-1"),
  },
];

export default function ApartmentsIndexPage() {
  return (
    <main className="bg-[#f7f4ee] text-slate-800">
      {/* HERO */}
      <section className="bg-[#2a2724] pt-32 pb-16 text-white md:pt-40 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <p
            className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.3em]"
            style={{ color: GOLD }}
          >
            <span className="h-px w-10" style={{ background: GOLD }} />
            Our Apartments
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-[1.08] md:text-6xl">
            Apartments
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">
            Four apartments, each with its own character. Choose one to see the
            design details.
          </p>
        </div>
      </section>

      {/* LIST */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <ul className="grid gap-8 sm:grid-cols-2">
          {apartments.map((a) => (
            <li key={a.href}>
              <Link href={a.href} className="group block">
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={a.cover}
                    alt={a.name}
                    fill
                    sizes="(min-width:640px) 45vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h2 className="mt-5 font-serif text-2xl group-hover:text-[#b8935a]">
                  {a.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {a.text}
                </p>
                <span
                  className="mt-4 inline-block text-xs font-medium uppercase tracking-[0.15em]"
                  style={{ color: GOLD }}
                >
                  View apartment →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}