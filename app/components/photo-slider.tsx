"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Image from "next/image";

type Photo = { src: string; alt: string };

const GOLD = "#b8935a";
/* EDIT HERE: how long each picture stays before sliding (milliseconds) */
const AUTOPLAY_MS = 4000;
/* EDIT HERE: most pictures shown at once on desktop / tablet */
const MAX_VISIBLE_DESKTOP = 4;
const MAX_VISIBLE_TABLET = 2;
/* gap-3 = 0.75rem */
const GAP_REM = 0.75;

/* Fades and lifts its content in when it scrolls into view */
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* Width of one slide when `v` slides are visible at once */
const slideWidth = (v: number) =>
  `calc((100% - ${(v - 1) * GAP_REM}rem) / ${v})`;

/* Auto-sliding photo strip: always keeps at least one photo hidden
   (3 photos -> 2 visible, 4 -> 3, 5 -> 4 ...) and slides one at a time */
export default function PhotoSlider({
  photos,
  square = false,
}: {
  photos: Photo[];
  square?: boolean;
}) {
  const n = photos.length;
  const desktop = n <= 1 ? 1 : Math.min(MAX_VISIBLE_DESKTOP, n - 1);
  const tablet = n <= 1 ? 1 : Math.min(MAX_VISIBLE_TABLET, n - 1);

  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [stops, setStops] = useState(Math.max(1, n - desktop + 1));
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  const slideTo = useCallback((i: number) => {
    const track = trackRef.current;
    const child = track?.children[i] as HTMLElement | undefined;
    if (!track || !child) return;
    track.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  }, []);

  const next = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const atEnd = t.scrollLeft >= t.scrollWidth - t.clientWidth - 4;
    if (atEnd) return slideTo(0);
    const kids = Array.from(t.children) as HTMLElement[];
    const i = kids.findIndex((k) => k.offsetLeft > t.scrollLeft + 4);
    slideTo(i === -1 ? 0 : i);
  }, [slideTo]);

  const prev = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const kids = Array.from(t.children) as HTMLElement[];
    if (t.scrollLeft <= 4) return slideTo(kids.length - 1);
    let i = 0;
    kids.forEach((k, idx) => {
      if (k.offsetLeft < t.scrollLeft - 4) i = idx;
    });
    slideTo(i);
  }, [slideTo]);

  /* How many resting positions exist (depends on screen size) */
  const measureStops = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const max = t.scrollWidth - t.clientWidth;
    const kids = Array.from(t.children) as HTMLElement[];
    const count = kids.filter((k) => k.offsetLeft <= max + 4).length;
    setStops(Math.max(1, count));
  }, []);

  /* Keep the dots in sync with autoplay, buttons and swiping */
  const onScroll = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const kids = Array.from(t.children) as HTMLElement[];
    const max = t.scrollWidth - t.clientWidth;
    if (t.scrollLeft >= max - 4) {
      setActive(
        Math.max(0, kids.filter((k) => k.offsetLeft <= max + 4).length - 1),
      );
      return;
    }
    let best = 0;
    let bestDist = Infinity;
    kids.forEach((k, idx) => {
      const d = Math.abs(k.offsetLeft - t.scrollLeft);
      if (d < bestDist) {
        bestDist = d;
        best = idx;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    measureStops();
    const ro = new ResizeObserver(measureStops);
    ro.observe(t);
    return () => ro.disconnect();
  }, [measureStops]);

  /* Only run autoplay while the slider is on screen */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [inView, paused, next]);

  const widths = {
    "--w-base": slideWidth(n <= 1 ? 1 : 1),
    "--w-sm": slideWidth(tablet),
    "--w-lg": slideWidth(desktop),
  } as CSSProperties;

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setTimeout(() => setPaused(false), 3000)}
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        style={widths}
        className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto scrollbar-width:none [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((p) => (
          <div
            key={p.src}
            className={`group relative shrink-0 basis-(--w-base) snap-start overflow-hidden sm:basis-(--w-sm) lg:basis-(--w-lg) ${
              square ? "aspect-square" : "aspect-3/4"
            }`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width:1024px) 30vw, 90vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {stops > 1 && (
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Array.from({ length: stops }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to position ${i + 1}`}
                onClick={() => slideTo(i)}
                className={`h-1 transition-all duration-300 ${
                  i === active ? "w-8" : "w-4 bg-slate-300 hover:bg-slate-400"
                }`}
                style={i === active ? { background: GOLD } : undefined}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous photo"
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center border border-slate-300 text-slate-700 transition hover:border-[#b8935a] hover:text-[#b8935a]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={next}
              className="flex h-10 w-10 items-center justify-center border border-slate-300 text-slate-700 transition hover:border-[#b8935a] hover:text-[#b8935a]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}