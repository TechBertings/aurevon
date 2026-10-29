"use client";

import Image from "next/image";
import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

export type BookPage = {
  id: string;
  group: string;
  title: string;
  text: string;
  src: string;
  alt: string;
};

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/* A 3D "open book": the current page sits flat in the centre,
   neighbouring pages are hinged at their inner edge and angled away.
   Change the numbers in pageStyle() to tune the angle, spacing and depth. */
function pageStyle(off: number) {
  const abs = Math.abs(off);
  const dir = Math.sign(off);
  const x = dir * (abs === 0 ? 0 : 96 + (abs - 1) * 48); // % of page width
  return {
    transform: `translate(-50%, -50%) translateX(${x}%) translateZ(${-abs * 160}px) rotateY(${-dir * 54}deg)`,
    transformOrigin: dir === 0 ? "50% 50%" : dir > 0 ? "0% 50%" : "100% 50%",
    zIndex: 10 - abs,
    opacity: abs > 2 ? 0 : 1,
    filter: abs === 0 ? "none" : `brightness(${1 - abs * 0.2})`,
    pointerEvents: abs > 2 ? ("none" as const) : ("auto" as const),
  };
}

export default function RoomBook({ pages }: { pages: BookPage[] }) {
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);
  const n = pages.length;

  const go = useCallback(
    (i: number) => setActive(Math.max(0, Math.min(n - 1, i))),
    [n],
  );

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(active + 1);
    if (e.key === "ArrowLeft") go(active - 1);
  };
  const onDown = (e: PointerEvent) => {
    startX.current = e.clientX;
  };
  const onUp = (e: PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (dx < -50) go(active + 1);
    if (dx > 50) go(active - 1);
  };

  /* glow lights that travel with the active page (sunset one way, sky the other) */
  const pct = n > 1 ? active / (n - 1) : 0;
  const orb =
    "pointer-events-none absolute top-[52%] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[left] duration-[1400ms] ease-out motion-reduce:transition-none md:h-[820px] md:w-[820px]";

  return (
    <div className="relative z-10">
      {/* backdrop: soft lights behind the book */}
      <div aria-hidden className="contents">
        <div
          className={orb}
          style={{
            left: `${15 + pct * 70}%`,
            background:
              "radial-gradient(circle, rgba(244,217,168,0.55) 0%, rgba(226,184,98,0.28) 40%, transparent 70%)",
          }}
        />
        <div
          className={orb}
          style={{
            left: `${85 - pct * 70}%`,
            background:
              "radial-gradient(circle, rgba(29,125,181,0.45) 0%, rgba(207,229,244,0.16) 42%, transparent 70%)",
          }}
        />
      </div>

      {/* stage */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Apartment rooms"
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerUp={onUp}
        className="relative h-[450px] touch-pan-y select-none outline-none focus-visible:ring-2 focus-visible:ring-(--gold-light) sm:h-[520px] md:h-[620px]"
        style={{ perspective: "1800px" }}
      >
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {pages.map((p, i) => {
            const off = i - active;
            const isActive = off === 0;
            return (
              <article
                key={p.id}
                aria-hidden={!isActive}
                aria-label={`${p.title}, ${i + 1} of ${n}`}
                onClick={() => !isActive && go(i)}
                style={pageStyle(off)}
                className={`absolute left-1/2 top-1/2 flex h-[400px] w-[270px] flex-col border border-(--gold)/60 bg-(--cream) p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] transition-[transform,opacity,filter] duration-[900ms] ease-[cubic-bezier(0.22,0.8,0.2,1)] motion-reduce:transition-none sm:h-[460px] sm:w-[320px] md:h-[560px] md:w-[390px] ${
                  isActive ? "" : "cursor-pointer"
                }`}
              >
                <div className="relative flex-[1.7] overflow-hidden border border-(--gold)/50">
                  <Image
                    src={p.src}
                    alt={isActive ? p.alt : ""}
                    fill
                    sizes="(min-width:768px) 390px, 320px"
                    className="object-cover"
                    draggable={false}
                  />
                  <span className="absolute bottom-3 right-0 bg-linear-to-b from-(--gold-light) to-(--gold) px-4 py-1.5 font-serif text-xs font-semibold tracking-widest text-white shadow-md">
                    {ROMAN[i] ?? i + 1}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-center px-3 py-3 text-(--navy) md:px-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">
                    {p.group}
                  </span>
                  <h3 className="mt-1 font-serif text-xl font-bold uppercase leading-snug tracking-wide md:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-(--navy)/75 md:text-sm">
                    {p.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* controls */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          aria-label="Previous room"
          onClick={() => go(active - 1)}
          disabled={active === 0}
          className="flex h-11 w-11 items-center justify-center border border-(--gold)/70 text-(--gold-light) transition hover:bg-(--gold) hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-(--gold-light)"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M12.5 4l-6 6 6 6" />
          </svg>
        </button>

        <div className="flex items-center gap-2.5">
          {pages.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-label={`Go to ${p.title}`}
              aria-current={i === active}
              onClick={() => go(i)}
              className={`h-2 transition-all duration-300 ${
                i === active
                  ? "w-8 bg-(--gold-light)"
                  : "w-2 bg-white/35 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next room"
          onClick={() => go(active + 1)}
          disabled={active === n - 1}
          className="flex h-11 w-11 items-center justify-center border border-(--gold)/70 text-(--gold-light) transition hover:bg-(--gold) hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-(--gold-light)"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M7.5 4l6 6-6 6" />
          </svg>
        </button>
      </div>

      <p className="mt-4 text-center text-[11px] uppercase tracking-[0.3em] text-white/60">
        {ROMAN[active] ?? active + 1} / {ROMAN[n - 1] ?? n}
      </p>
    </div>
  );
}