"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import {
  Badge,
  Ph,
  Reveal,
  Title,
  useInView,
  type IconName,
  type Tone,
} from "./fx";
import { glow } from "./glow";

/* Greek key band (local to this file) */
const meanderBg = (color: string): CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='14'><path d='M0 13V1H13V10H5V5H9M13 1H18' fill='none' stroke='${color}' stroke-width='1.4'/></svg>")`,
  backgroundRepeat: "repeat-x",
});
const Meander = ({
  className = "",
  color = "%23e2b862",
}: {
  className?: string;
  color?: string;
}) => (
  <div aria-hidden className={`h-3.5 ${className}`} style={meanderBg(color)} />
);
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const roman = (n: number) => ROMAN[n - 1] ?? String(n);
/* ═════════════════════════════════════════════════════════════
   1. LIFESTYLE STORY
   Big photo stays pinned on the left. As you scroll the four
   points on the right, the photo changes with a curtain wipe.
   ═════════════════════════════════════════════════════════════ */
export type Feature = {
  icon: IconName;
  title: string;
  text: string;
  src: string | null;
  label: string;
  tone: Tone;
};

export function LifestyleStory({ features }: { features: Feature[] }) {
  const [active, setActive] = useState(0);
  const [touchX, setTouchX] = useState<number | null>(null);
  const n = features.length;
  const go = (d: number) => setActive((a) => (a + d + n) % n);

  return (
    <section
      className="relative -mt-px bg-(--navy) text-white"
      style={glow("50% 0%", 0.22)}
    >
      <div className="relative mx-auto max-w-6xl px-6 pt-16 md:pt-24">
        <Meander className="mx-auto w-full max-w-md opacity-50" />
        <div className="mt-12">
          <Reveal>
            <Title
              dark
              center
              title="Why Greece"
              sub="Sun, sea, culture and opportunity"
            />
          </Reveal>
        </div>
      </div>

      <div
        className="relative mx-auto mt-16 grid max-w-6xl items-center gap-14 px-6 pb-20 md:pb-28 lg:grid-cols-12 lg:gap-12"
        onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX === null) return;
          const dx = e.changedTouches[0].clientX - touchX;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          setTouchX(null);
        }}
      >
        {/* ───── gallery plate ───── */}
        <div className="lg:col-span-7">
          <div className="mx-auto w-full max-w-2xl">
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 translate-x-3 translate-y-3 border border-(--gold-light)/35 md:translate-x-4 md:translate-y-4"
              />
              <div className="relative bg-(--cream) p-2.5 shadow-[0_50px_80px_-30px_rgba(0,0,0,0.75)] md:p-3.5">
                <div className="relative aspect-4/3 overflow-hidden ring-1 ring-(--gold)/70">
                  {features.map((f, i) => (
                    <div
                      key={f.title}
                      aria-hidden={i !== active}
                      className="fx-clip absolute inset-0"
                      style={{
                        zIndex: i === active ? 2 : 1,
                        opacity: i === active ? 1 : 0,
                        transform: i === active ? "scale(1)" : "scale(1.05)",
                        clipPath:
                          i === active
                            ? "inset(0 0 0 0)"
                            : "inset(0 0 100% 0)",
                        transition:
                          "opacity 900ms ease, transform 1200ms cubic-bezier(.2,.7,.2,1), clip-path 1000ms cubic-bezier(.77,0,.18,1)",
                      }}
                    >
                      <Ph
                        src={f.src}
                        label={f.label}
                        tone={f.tone}
                        bare
                        priority={i === 0}
                        sizes="(min-width:1024px) 40rem, 90vw"
                        className="h-full w-full"
                      />
                    </div>
                  ))}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_60px_rgba(10,23,64,0.25)]"
                  />
                </div>

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-1.5 border border-(--gold)/50"
                />
                {[
                  "left-0 top-0 border-l-2 border-t-2",
                  "right-0 top-0 border-r-2 border-t-2",
                  "bottom-0 left-0 border-b-2 border-l-2",
                  "bottom-0 right-0 border-b-2 border-r-2",
                ].map((c) => (
                  <span
                    key={c}
                    aria-hidden
                    className={`pointer-events-none absolute h-5 w-5 border-(--gold) ${c}`}
                  />
                ))}
              </div>
            </div>

            {/* caption */}
            <div className="mt-6 flex items-center justify-between gap-4 border-y border-(--gold-light)/50 py-3">
              <span className="font-serif text-sm italic tracking-wide text-white/90">
                {features[active].label}
              </span>
              <span className="shrink-0 font-serif text-[11px] tracking-[0.35em] text-(--gold-light)">
                {roman(active + 1)}
                <span className="mx-1.5 text-white/30">/</span>
                {roman(n)}
              </span>
            </div>

            {/* thumbnails */}
            <div className="mt-5 grid grid-cols-4 gap-3">
              {features.map((f, i) => {
                const on = i === active;
                return (
                  <button
                    key={f.title}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show ${f.label}`}
                    aria-pressed={on}
                    className="group text-left"
                  >
                    <span
                      className={`relative block aspect-3/2 overflow-hidden border p-0.5 transition duration-500 ${
                        on
                          ? "border-(--gold-light) opacity-100"
                          : "border-white/20 opacity-50 group-hover:opacity-90"
                      }`}
                    >
                      <span className="relative block h-full w-full overflow-hidden">
                        <Ph
                          src={f.src}
                          label={f.label}
                          tone={f.tone}
                          bare
                          sizes="140px"
                          className="h-full w-full"
                        />
                      </span>
                    </span>
                    <span
                      className={`mt-2 block text-center font-serif text-[10px] tracking-[0.3em] transition-colors duration-500 ${
                        on ? "text-(--gold-light)" : "text-white/40"
                      }`}
                    >
                      {roman(i + 1)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ───── text + controls ───── */}
        <div className="lg:col-span-5">
          {/* all items share one cell so the height never jumps */}
          <ol className="grid">
            {features.map((f, i) => {
              const on = i === active;
              return (
                <li
                  key={f.title}
                  aria-hidden={!on}
                  className={`col-start-1 row-start-1 flex flex-col justify-center transition-all duration-700 ${
                    on
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-4 opacity-0"
                  }`}
                >
                  <span
                    aria-hidden
                    className="block bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text font-serif text-7xl font-bold leading-none tracking-wide text-transparent md:text-8xl"
                  >
                    {roman(i + 1)}
                  </span>

                  <Meander className="mt-5 w-28 opacity-70" />

                  <h3 className="mt-6 font-serif text-4xl leading-[1.05] text-white md:text-5xl">
                    {f.title}
                  </h3>

                  <span className="mt-6 block h-px w-16 bg-(--gold-light)" />

                  <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
                    {f.text}
                  </p>

                  <div className="mt-8 flex max-w-sm items-center gap-5">
                    <Badge name={f.icon} className="h-12 w-12 shrink-0" />
                    <span className="h-px flex-1 bg-white/20" />
                  </div>
                </li>
              );
            })}
          </ol>

          {/* prev / next */}
          <div className="mt-10 flex items-center gap-5">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/30 transition hover:border-(--gold-light) hover:bg-(--gold-light) hover:text-(--navy-deep)"
            >
              ←
            </button>
            <div className="flex flex-1 gap-2">
              {features.map((f, i) => (
                <span
                  key={f.title}
                  className={`h-px flex-1 transition-colors duration-700 ${
                    i <= active ? "bg-(--gold-light)" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="flex h-12 shrink-0 items-center justify-center gap-3 border border-(--gold-light) bg-(--gold-light) px-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-(--navy-deep) transition hover:bg-transparent hover:text-(--gold-light)"
            >
              Next <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════
   2. LOCATION EXPLORER
   Stylised Greece map. The route draws itself, a dot travels
   along it, pins pulse. Click a place (or wait) and the photo
   card wipes to the next location.
   ═════════════════════════════════════════════════════════════ */
export type Place = {
  name: string;
  text: string;
  src: string | null;
  tone: Tone;
  /* pin position inside the 400 x 440 map */
  x: number;
  y: number;
};

const MAINLAND =
  "M110 70 L175 42 L260 48 L318 78 L290 92 L268 88 L262 108 L240 100 L236 120 L215 118 L222 150 L205 165 L212 190 L190 200 L205 215 L238 235 L225 250 L200 248 L205 270 L180 282 L172 305 L150 300 L152 330 L135 345 L128 320 L140 295 L132 260 L150 232 L128 215 L135 180 L118 150 L125 110 Z";
const EVIA = "M232 140 Q252 160 262 200 L252 204 Q242 170 228 148Z";
const CRETE =
  "M138 392 Q175 376 226 380 Q285 384 306 396 Q250 408 190 402 Q150 404 138 392Z";
const CYCLADES = [
  [250, 300, 5],
  [262, 318, 4],
  [238, 322, 4],
  [292, 306, 4],
  [252, 352, 5],
  [300, 330, 3],
];

export function LocationExplorer({ places }: { places: Place[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ref, seen] = useInView<HTMLDivElement>(0.2);
  const n = places.length;

  /* route goes north to south through every pin */
  const order = [...places].sort((a, b) => a.y - b.y);
  const route = order
    .map((p, i) => {
      if (i === 0) return `M${p.x} ${p.y}`;
      const q = order[i - 1];
      const mx = (p.x + q.x) / 2 + (i % 2 ? 34 : -34);
      const my = (p.y + q.y) / 2;
      return `Q${mx} ${my} ${p.x} ${p.y}`;
    })
    .join(" ");

  return (
    <div
      ref={ref}
      className="grid gap-12 lg:grid-cols-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* list */}
      <ul className="lg:col-span-5">
        {places.map((p, i) => {
          const on = i === active;
          return (
            <li
              key={p.name}
              className="relative border-t border-(--gold)/30 last:border-b"
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={on}
                className="group block w-full py-5 text-left"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-serif text-sm tracking-widest text-(--gold-light)">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-serif text-2xl font-bold uppercase tracking-wide transition-colors duration-500 md:text-3xl ${
                      on
                        ? "text-white"
                        : "text-white/45 group-hover:text-white/80"
                    }`}
                  >
                    {p.name}
                  </span>
                </span>
                <span
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                    on
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <span className="overflow-hidden">
                    <span className="block pl-10 pt-3 text-sm leading-relaxed text-white/70">
                      {p.text}
                    </span>
                  </span>
                </span>
              </button>
              {on && seen && (
                <span
                  key={active}
                  aria-hidden
                  onAnimationEnd={() => setActive((a) => (a + 1) % n)}
                  className="fx-anim absolute -bottom-px left-0 h-px w-full origin-left bg-(--gold-light)"
                  style={{
                    animation: "fx-progress 6s linear forwards",
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              )}
            </li>
          );
        })}
      </ul>

      {/* map + photo card */}
      <div className="relative h-[520px] sm:h-[620px] lg:col-span-7">
        <svg
          viewBox="0 0 400 440"
          className="absolute inset-y-0 left-0 h-full w-[72%]"
          role="img"
          aria-label="Stylised map of Greece with the featured locations"
        >
          <defs>
            <pattern
              id="fx-dots"
              width="9"
              height="9"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.1" fill="#e2b862" opacity=".35" />
            </pattern>
          </defs>

          <g
            fill="url(#fx-dots)"
            stroke="#e2b862"
            strokeOpacity=".55"
            strokeWidth="1.2"
            strokeLinejoin="round"
          >
            <path d={MAINLAND} />
            <path d={EVIA} />
            <path d={CRETE} />
          </g>
          {CYCLADES.map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="#e2b862"
              opacity=".35"
            />
          ))}

          {/* dotted route, then a gold line that draws over it */}
          <path
            d={route}
            fill="none"
            stroke="#e2b862"
            strokeOpacity=".45"
            strokeWidth="1.4"
            strokeDasharray="2 6"
            strokeLinecap="round"
          />
          <path
            id="fx-route"
            d={route}
            fill="none"
            stroke="#e2b862"
            strokeWidth="1.6"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={seen ? 0 : 1}
            style={{
              transition: "stroke-dashoffset 4s cubic-bezier(.5,0,.2,1) 300ms",
            }}
          />
          {seen && (
            <circle r="3.2" fill="#ffffff">
              <animateMotion dur="9s" repeatCount="indefinite">
                <mpath href="#fx-route" />
              </animateMotion>
            </circle>
          )}

          {/* pins */}
          {places.map((p, i) => {
            const on = i === active;
            const left = p.x > 240;
            return (
              <g
                key={p.name}
                role="button"
                tabIndex={0}
                aria-label={p.name}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
                className="cursor-pointer outline-none"
              >
                <circle cx={p.x} cy={p.y} r="16" fill="transparent" />
                {on && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="8"
                    fill="none"
                    stroke="#e2b862"
                    strokeWidth="1.5"
                    className="fx-anim"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      animation: "fx-ping 2s ease-out infinite",
                    }}
                  />
                )}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={on ? 7 : 4.5}
                  fill="#e2b862"
                  stroke="#10235e"
                  strokeWidth="2"
                  style={{ transition: "r 400ms ease" }}
                />
                <text
                  x={left ? p.x - 14 : p.x + 14}
                  y={p.y + 4}
                  textAnchor={left ? "end" : "start"}
                  fontSize="12"
                  letterSpacing="1.5"
                  className={`font-serif uppercase transition-[fill] duration-500 ${
                    on ? "fill-white" : "fill-white/55"
                  }`}
                >
                  {p.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* photo card: wipes between locations */}
        <div className="absolute bottom-4 right-0 aspect-4/5 w-[54%] sm:w-[50%]">
          {places.map((p, i) => {
            const on = i === active;
            return (
              <div
                key={p.name}
                aria-hidden={!on}
                className="fx-clip absolute inset-0"
                style={{
                  zIndex: on ? 2 : 1,
                  opacity: on ? 1 : 0,
                  transform: on ? "scale(1)" : "scale(1.06)",
                  clipPath: on
                    ? "inset(-30px -30px -30px -30px)"
                    : "inset(-30px -30px 100% -30px)",
                  transition:
                    "opacity 900ms ease, transform 1200ms cubic-bezier(.2,.7,.2,1), clip-path 1000ms cubic-bezier(.77,0,.18,1)",
                }}
              >
                <Ph
                  src={p.src}
                  label={`${p.name}, Greece`}
                  tone={p.tone}
                  tag={p.name}
                  speed={0.04}
                  sizes="(min-width:1024px) 25vw, 55vw"
                  className="h-full w-full"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}