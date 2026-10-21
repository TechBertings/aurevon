"use client";

import { useEffect, useRef, useState } from "react";
import {
  Badge,
  Paper,
  Ph,
  Reveal,
  Tag,
  Title,
  useInView,
  type IconName,
  type Tone,
} from "./fx";

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
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const n = features.length;

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.i));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative bg-(--paper)">
      <Paper />
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <Title
            center
            title="Why Greece"
            sub="Sun, sea, culture and opportunity"
          />
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          {/* pinned photo stack (desktop) */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-24 h-[min(640px,calc(100vh-8rem))]">
              <div className="relative mx-auto h-full w-full max-w-md">
                <div
                  aria-hidden
                  className="fx-anim absolute -right-10 -top-10 z-20 h-40 w-40 rounded-full border border-dashed border-(--gold)"
                  style={{ animation: "fx-spin 30s linear infinite" }}
                />
                {features.map((f, i) => (
                  <div
                    key={f.title}
                    className="fx-clip absolute inset-0"
                    style={{
                      zIndex: i,
                      clipPath:
                        i <= active
                          ? "inset(-30px -30px -30px -30px)"
                          : "inset(-30px -30px 100% -30px)",
                      transition: "clip-path 1100ms cubic-bezier(.77,0,.18,1)",
                    }}
                  >
                    <Ph
                      src={f.src}
                      label={f.label}
                      tone={f.tone}
                      arch
                      className="h-full w-full"
                    />
                  </div>
                ))}
                <Tag className="absolute -left-4 bottom-10 z-30">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(n).padStart(2, "0")}
                </Tag>
              </div>
            </div>
          </div>

          {/* scrolling points */}
          <ol className="relative lg:col-span-6">
            <span
              aria-hidden
              className="absolute left-7 top-0 hidden h-full w-px bg-(--navy)/15 lg:block"
            />
            <span
              aria-hidden
              className="absolute left-7 top-0 hidden w-px bg-linear-to-b from-(--gold-light) to-(--gold-dark) transition-[height] duration-1000 ease-out lg:block"
              style={{ height: `${((active + 1) / n) * 100}%` }}
            />
            {features.map((f, i) => (
              <li
                key={f.title}
                ref={(el) => {
                  items.current[i] = el;
                }}
                data-i={i}
                className={`relative flex flex-col justify-center gap-5 py-10 transition-opacity duration-700 lg:min-h-[78vh] lg:pl-24 ${
                  i === active ? "" : "lg:opacity-30"
                }`}
              >
                {/* photo shown inline on mobile */}
                <div className="lg:hidden">
                  <Reveal variant="wipe">
                    <Ph
                      src={f.src}
                      label={f.label}
                      tone={f.tone}
                      arch
                      className="mx-auto aspect-4/5 w-4/5"
                    />
                  </Reveal>
                </div>
                <Badge
                  name={f.icon}
                  className={`h-14 w-14 transition-transform duration-700 lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 ${
                    i === active ? "lg:scale-110" : ""
                  }`}
                />
                <span className="font-serif text-sm tracking-[0.3em] text-(--gold-dark)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-3xl font-bold uppercase leading-tight md:text-4xl">
                  {f.title}
                </h3>
                <span className="h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                <p className="max-w-md leading-relaxed text-(--navy)/75">
                  {f.text}
                </p>
              </li>
            ))}
          </ol>
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