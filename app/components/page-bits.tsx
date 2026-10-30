import type { CSSProperties } from "react";
import { Words } from "./scroll-3d";

/* Shared building blocks for the Pricing and Partners pages */

export const palette = {
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
export const Paper = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 mix-blend-multiply"
    style={grain}
  />
);

export const glow = (pos: string, a = 0.22): CSSProperties => ({
  backgroundImage: `radial-gradient(55% 60% at ${pos}, rgba(226,184,98,${a}), transparent 70%)`,
});

const meanderBg = (color: string): CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='14'><path d='M0 13V1H13V10H5V5H9M13 1H18' fill='none' stroke='${color}' stroke-width='1.4'/></svg>")`,
  backgroundRepeat: "repeat-x",
});
export const Meander = ({
  className = "",
  color = "%23b9791f",
}: {
  className?: string;
  color?: string;
}) => (
  <div aria-hidden className={`h-3.5 ${className}`} style={meanderBg(color)} />
);

export function Wave({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
      className={`block h-10 w-full md:h-16 ${flip ? "rotate-180" : ""}`}
    >
      <path
        d="M0 46 C 260 6, 520 74, 780 38 C 1040 4, 1250 56, 1440 20 L1440 80 L0 80 Z"
        fill="var(--navy)"
      />
      <path
        d="M0 46 C 260 6, 520 74, 780 38 C 1040 4, 1250 56, 1440 20"
        fill="none"
        stroke="var(--gold-light)"
        strokeWidth="2.5"
      />
    </svg>
  );
}

export function Title({
  title,
  sub,
  dark = false,
  center = false,
}: {
  title: string;
  sub?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2
        className={`font-serif text-3xl font-bold uppercase leading-[1.1] tracking-tight md:text-5xl ${
          dark ? "text-white" : "text-(--navy)"
        }`}
      >
        <Words text={title} className="block" />
      </h2>
      {sub && (
        <p
          className={`mt-3 text-xs font-medium uppercase tracking-[0.25em] md:text-sm ${
            dark ? "text-(--gold-light)" : "text-(--navy)/70"
          }`}
        >
          {sub}
        </p>
      )}
      <span
        className={`mt-5 block h-0.5 w-16 bg-linear-to-r from-(--gold) to-(--gold-light) ${
          center ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}