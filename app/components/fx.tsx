"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

/* Colors (--navy, --gold, --cream ...) are set by the page that uses these */

/* ───────── Icons ───────── */
export const ICONS = {
  sun: "M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  home: "M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6",
  temple: "M3 9l9-5 9 5M5 9v9M9 9v9M15 9v9M19 9v9M3 20h18",
  leaf: "M5 19C5 9 11 4 20 4c0 9-5 15-15 15zM5 19c3-5 6-8 10-10",
  diamond: "M6 4h12l4 6-10 11L2 10l4-6zM2 10h20M9 4l3 6 3-6",
  family:
    "M8 8a3 3 0 100-6 3 3 0 000 6zM16 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM2 21v-3a5 5 0 0110 0v3M14 21v-2.5a4 4 0 018 0V21",
  chart: "M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6",
  image: "M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15 9h.01",
} as const;
export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: IconName;
  className?: string;
}) {
  return (
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
      <path d={ICONS[name]} />
    </svg>
  );
}

/* Gold filled circle badge */
export function Badge({
  name,
  className = "h-14 w-14",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-linear-to-b from-(--gold-light) to-(--gold-dark) text-white shadow-[0_8px_20px_-8px_rgba(143,90,18,0.7)] ring-2 ring-(--gold-light)/40 ring-offset-2 ring-offset-transparent ${className}`}
    >
      <Icon name={name} className="h-1/2 w-1/2" />
    </span>
  );
}

/* Gold gradient label */
export function Tag({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-md ${className}`}
    >
      {children}
    </span>
  );
}

/* Navy wave with gold line. flip = wave faces the other way */
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
        className="fill-(--navy)"
      />
      <path
        d="M0 46 C 260 6, 520 74, 780 38 C 1040 4, 1250 56, 1440 20"
        fill="none"
        strokeWidth="2.5"
        className="stroke-(--gold-light)"
      />
    </svg>
  );
}

/* Paper grain over light sections */
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

/* Section title: bold uppercase serif + small caps subtitle + gold rule */
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
        {title}
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

/* ───────── Keyframes + reduced-motion rules. Render once per page. ───────── */
export function FxStyles() {
  return (
    <style>{`
@keyframes fx-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes fx-spin{to{transform:rotate(360deg)}}
@keyframes fx-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes fx-shimmer{from{transform:translateX(-120%)}to{transform:translateX(420%)}}
@keyframes fx-ping{0%{transform:scale(.7);opacity:.9}100%{transform:scale(3);opacity:0}}
@keyframes fx-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes fx-ken{from{transform:scale(1)}to{transform:scale(1.12)}}
@media (prefers-reduced-motion: reduce){
  [data-fx]{opacity:1!important;transform:none!important;clip-path:none!important;transition:none!important}
  .fx-anim{animation:none!important}
  .fx-clip{transition:none!important}
}
`}</style>
  );
}

/* ───────── Scroll helpers ───────── */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

type Variant = "up" | "left" | "right" | "zoom" | "wipe" | "wipe-up";

/* Reveal on scroll. wipe / wipe-up = curtain-style clip reveal */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 900,
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const [ref, seen] = useInView<HTMLDivElement>(0.15);
  const hidden: Record<Variant, CSSProperties> = {
    up: { opacity: 0, transform: "translateY(40px)" },
    left: { opacity: 0, transform: "translateX(-60px)" },
    right: { opacity: 0, transform: "translateX(60px)" },
    zoom: { opacity: 0, transform: "scale(.88)" },
    wipe: { clipPath: "inset(-30px 100% -30px -30px)" },
    "wipe-up": { clipPath: "inset(100% -30px -30px -30px)" },
  };
  const isWipe = variant === "wipe" || variant === "wipe-up";
  const shown: CSSProperties = isWipe
    ? { clipPath: "inset(-30px -30px -30px -30px)" }
    : { opacity: 1, transform: "none" };
  const ease = "cubic-bezier(.2,.7,.2,1)";
  return (
    <div
      ref={ref}
      data-fx
      className={className}
      style={{
        ...(seen ? shown : hidden[variant]),
        transition: `opacity ${duration}ms ${ease} ${delay}ms, transform ${duration}ms ${ease} ${delay}ms, clip-path ${duration + 300}ms cubic-bezier(.77,0,.18,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* Headline that rises word by word out of a mask */
export function Words({
  text,
  className = "",
  wordClass = "",
  step = 70,
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClass?: string;
  step?: number;
  delay?: number;
}) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.3);
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]"
        >
          <span
            data-fx
            className={`inline-block ${wordClass}`}
            style={{
              transform: seen ? "translateY(0)" : "translateY(115%)",
              transition: `transform 950ms cubic-bezier(.2,.7,.2,1) ${delay + i * step}ms`,
            }}
          >
            {w}
            {"\u00A0"}
          </span>
        </span>
      ))}
    </span>
  );
}

/* Moves its content at a different speed than the page scroll */
export function Parallax({
  speed = 0.1,
  clamp,
  className = "",
  children,
}: {
  speed?: number;
  clamp?: number;
  className?: string;
  children: ReactNode;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = o.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      let y = -(r.top + r.height / 2 - window.innerHeight / 2) * speed;
      if (clamp !== undefined) {
        const m = r.height * clamp;
        y = Math.max(-m, Math.min(m, y));
      }
      i.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed, clamp]);
  return (
    <div ref={outer} className={className}>
      <div ref={inner} className="relative h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}

/* 3D tilt that follows the cursor */
export function Tilt({
  children,
  className = "",
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${(x * max).toFixed(2)}deg) rotateX(${(-y * max).toFixed(2)}deg) scale(1.02)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

/* Endless scrolling ribbon of words */
export function Marquee({
  items,
  className = "",
  speed = 45,
}: {
  items: string[];
  className?: string;
  speed?: number;
}) {
  const row = (
    <ul className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <li key={i} className="flex items-center whitespace-nowrap">
          <span className="px-8 text-xs font-semibold uppercase tracking-[0.4em] md:text-sm">
            {t}
          </span>
          <span aria-hidden className="text-(--gold-dark)">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`group overflow-hidden ${className}`}>
      <div
        className="fx-anim flex w-max group-hover:[animation-play-state:paused]"
        style={{ animation: `fx-marquee ${speed}s linear infinite` }}
      >
        {row}
        {row}
      </div>
    </div>
  );
}

/* ───────── Photo: real image if src is set, otherwise a moving placeholder ───────── */
const TONES = {
  sunset: "from-[#9ec9ea] via-[#f3d6a6] to-[#e59a6a]",
  sea: "from-[#cfe5f4] via-[#7fb9dc] to-[#1d7db5]",
  stone: "from-[#f3ead6] via-[#e2d8c3] to-[#cfc2a8]",
  pool: "from-[#e9c48e] via-[#d98a6a] to-[#10235e]",
  sky: "from-[#cfe5f4] via-[#eaf3f8] to-[#f3ead6]",
} as const;
export type Tone = keyof typeof TONES;

export function Ph({
  src,
  label,
  tone = "sky",
  className = "",
  arch = false,
  bare = false,
  speed = 0.06,
  tag,
  priority = false,
  sizes = "(min-width:1024px) 40vw, 90vw",
}: {
  src: string | null;
  label: string;
  tone?: Tone;
  className?: string;
  arch?: boolean;
  /* bare = no white mat / gold frame (for full-bleed backgrounds) */
  bare?: boolean;
  speed?: number;
  tag?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const round = arch ? "rounded-t-full" : "";
  const inner = (
    <>
      <Parallax
        speed={speed}
        clamp={0.09}
        className="absolute inset-x-0 -top-[12%] -bottom-[12%]"
      >
        {src ? (
          <Image
            src={src}
            alt={label}
            fill
            priority={priority}
            sizes={sizes}
            className="fx-anim object-cover"
            style={{ animation: "fx-ken 16s ease-in-out infinite alternate" }}
          />
        ) : (
          <div
            role="img"
            aria-label={label}
            className={`relative h-full w-full overflow-hidden bg-linear-to-b ${TONES[tone]}`}
          >
            <span
              aria-hidden
              className="absolute left-1/2 top-[42%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-2xl"
            />
            <span
              aria-hidden
              className="fx-anim absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-linear-to-r from-transparent via-white/40 to-transparent"
              style={{ animation: "fx-shimmer 5s ease-in-out infinite" }}
            />
            <div className="absolute inset-x-0 bottom-[20%] flex flex-col items-center gap-3 px-4 text-center">
              <Icon name="image" className="h-7 w-7 text-(--navy)/55" />
              <p className="max-w-[18ch] text-[10px] uppercase tracking-[0.25em] text-(--navy)/65">
                {label}
              </p>
            </div>
          </div>
        )}
      </Parallax>
      {tag && <Tag className="absolute bottom-3 right-0 z-10">{tag}</Tag>}
    </>
  );

  if (bare) {
    return (
      <div className={`relative overflow-hidden ${className}`}>{inner}</div>
    );
  }
  return (
    <div
      className={`relative overflow-hidden bg-white p-1.5 shadow-[0_24px_50px_-20px_rgba(16,35,94,0.45)] ${round} ${className}`}
    >
      <div
        className={`relative h-full w-full overflow-hidden border border-(--gold)/60 ${round}`}
      >
        {inner}
      </div>
    </div>
  );
}