import type { ComponentType, CSSProperties, ReactNode } from "react";
import ContactForm from "../components/contact-form";
import { Reveal3D, S3Styles, ScrollBar, Words } from "../components/scroll-3d";

export const metadata = {
  title: "Contact | Aurevon Global Partners",
  description:
    "Speak with Aurevon Global Partners about property investment and residency opportunities in Greece.",
};

const palette = {
  "--navy": "#10235e",
  "--navy-deep": "#0a1740",
  "--gold": "#b9791f",
  "--gold-light": "#e2b862",
  "--gold-dark": "#8f5a12",
  "--cream": "#fbf6ea",
  "--paper": "#f3ead6",
} as CSSProperties;

const grain: CSSProperties = {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .42 0 0 0 0 .34 0 0 0 0 .22 0 0 0 .14 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
};
const Paper = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 mix-blend-multiply"
    style={grain}
  />
);

const glow = (pos: string, a = 0.22): CSSProperties => ({
  backgroundImage: `radial-gradient(55% 60% at ${pos}, rgba(226,184,98,${a}), transparent 70%)`,
});

const meanderBg = (color: string): CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='14'><path d='M0 13V1H13V10H5V5H9M13 1H18' fill='none' stroke='${color}' stroke-width='1.4'/></svg>")`,
  backgroundRepeat: "repeat-x",
});
const Meander = ({
  className = "",
  color = "%23b9791f",
}: {
  className?: string;
  color?: string;
}) => (
  <div aria-hidden className={`h-3.5 ${className}`} style={meanderBg(color)} />
);

type IconType = ComponentType<{ className?: string }>;
const icon = (paths: ReactNode): IconType => {
  const I: IconType = ({ className = "h-5 w-5" }) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths}
    </svg>
  );
  return I;
};

const PhoneIcon = icon(
  <path d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 5.2 5.2l1.3-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" />,
);
const MailIcon = icon(
  <>
    <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
    <path d="M4 7l8 6 8-6" />
  </>,
);
const GlobeIcon = icon(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.5 2.4 3.6 5.2 3.6 8.5S14.500 18.100 12 20.500C9.500 18.100 8.400 15.300 8.400 12S9.500 5.900 12 3.500z" />
  </>,
);

const phones = [
  { display: "+49 160 9243 2179", href: "tel:+4916092432179" },
  { display: "+49 151 2404 9188", href: "tel:+4915124049188" },
];
const EMAIL = "invest@aurevon-globalpartners.com";
const SITE = "www.aurevon-globalpartners.com";

function Row({
  Icon,
  title,
  children,
}: {
  Icon: IconType;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-5 border-t border-(--gold)/30 py-6 first:border-t-0 first:pt-0">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-(--gold-light)/70 text-(--gold-light)">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-light)">
          {title}
        </p>
        <div className="mt-2 space-y-1 text-sm text-white/90">{children}</div>
      </div>
    </div>
  );
}

const link = "transition hover:text-(--gold-light)";

export default function Contact() {
  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      <S3Styles />
      <ScrollBar />

      {/* ───────── HEADER ───────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-(--paper) to-(--cream) pt-32 md:pt-40">
        <Paper />
        <div aria-hidden className="absolute inset-0" style={glow("85% 90%", 0.35)} />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <Reveal3D variant="flipLeft">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
              Aurevon Global Partners
            </p>
          </Reveal3D>
          <h1 className="mt-6 font-serif text-5xl font-bold uppercase leading-[1.02] tracking-tight md:text-7xl">
            <Words text="Contact" className="block" />
            <Words
              text="Us"
              className="block"
              delay={300}
              wordClass="bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-transparent"
            />
          </h1>
          <Reveal3D variant="rise" delay={500}>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-(--navy)/80">
              Tell us what you are looking for and we will get back to you.
            </p>
            <span className="mt-6 block h-0.5 w-16 bg-linear-to-r from-(--gold) to-(--gold-light)" />
          </Reveal3D>
        </div>
        <Meander className="relative opacity-70" />
      </section>

      {/* ───────── DETAILS + FORM ───────── */}
      <section className="relative bg-(--cream)">
        <Paper />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 md:py-24 lg:grid-cols-12">
          {/* details card */}
          <Reveal3D variant="flipLeft" className="lg:col-span-5">
            <aside className="relative h-full overflow-hidden bg-(--navy) p-8 text-white shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-12">
              <div aria-hidden className="absolute inset-0" style={glow("100% 0%", 0.3)} />
              <div aria-hidden className="pointer-events-none absolute inset-3 border border-(--gold)/50" />
              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-light)">
                  Get in touch
                </p>
                <h2 className="mt-4 font-serif text-2xl font-bold uppercase leading-tight md:text-3xl">
                  Speak with our team
                </h2>
                <span className="mb-10 mt-5 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />

                <Row Icon={PhoneIcon} title="Contact number">
                  {phones.map((p) => (
                    <p key={p.href}>
                      <a href={p.href} className={link}>
                        {p.display}
                      </a>
                    </p>
                  ))}
                </Row>
                <Row Icon={MailIcon} title="Email">
                  <p>
                    <a href={`mailto:${EMAIL}`} className={`${link} break-all`}>
                      {EMAIL}
                    </a>
                  </p>
                </Row>
                <Row Icon={GlobeIcon} title="Website">
                  <p>
                    <a
                      href={`https://${SITE}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${link} break-all`}
                    >
                      {SITE}
                    </a>
                  </p>
                </Row>
              </div>
            </aside>
          </Reveal3D>

          {/* form */}
          <Reveal3D variant="flipRight" className="lg:col-span-7">
            <div className="h-full border border-(--gold)/40 bg-white p-8 md:p-12">
              <h2 className="font-serif text-2xl font-bold uppercase tracking-wide md:text-3xl">
                Send an inquiry
              </h2>
              <span className="mb-10 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
              <ContactForm />
            </div>
          </Reveal3D>
        </div>
      </section>
    </main>
  );
}