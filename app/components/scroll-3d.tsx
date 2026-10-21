"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";

/* ───────── helpers ───────── */
const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

/* ───────── keyframes (render once in the page) ───────── */
export function S3Styles() {
  return (
    <style>{`
      @keyframes s3-marquee { to { transform: translateX(-50%); } }
      @keyframes s3-spin { to { transform: rotate(360deg); } }
      @keyframes s3-float {
        0%, 100% { transform: translate3d(0, 0, 0); }
        50% { transform: translate3d(0, -10px, 0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .s3-anim { animation: none !important; }
      }
    `}</style>
  );
}

/* ───────── gold progress bar at the top ───────── */
export function ScrollBar() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (ref.current) ref.current.style.transform = `scaleX(${clamp(p, 0, 1)})`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-60 h-[3px]">
      <div
        ref={ref}
        className="h-full origin-left bg-linear-to-r from-(--gold) via-(--gold-light) to-(--gold)"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

/* ───────── Reveal3D: enters with depth, not just a fade ───────── */
type Variant = "rise" | "flipLeft" | "flipRight" | "flipCard" | "zoom";

const FROM: Record<Variant, string> = {
  rise: "perspective(1200px) translate3d(0,70px,-160px) rotateX(38deg)",
  flipLeft: "perspective(1200px) translate3d(-70px,0,-120px) rotateY(32deg)",
  flipRight: "perspective(1200px) translate3d(70px,0,-120px) rotateY(-32deg)",
  flipCard: "perspective(1000px) translate3d(0,30px,-80px) rotateY(-75deg)",
  zoom: "perspective(1200px) translate3d(0,0,-320px) scale(0.9)",
};
const TO = "perspective(1200px) translate3d(0,0,0) rotateX(0) rotateY(0) scale(1)";

export function Reveal3D({
  children,
  variant = "rise",
  delay = 0,
  duration = 1100,
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const [ref, seen] = useInView<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? TO : FROM[variant],
        transformOrigin: variant === "rise" ? "50% 100%" : "50% 50%",
        transition: `transform ${duration}ms cubic-bezier(.16,.84,.24,1) ${delay}ms, opacity ${duration * 0.6}ms ease ${delay}ms`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}

/* ───────── Depth: scroll-linked 3D (tilts back as it enters, flat at centre) ───────── */
export function Depth({
  children,
  className = "",
  axis = "x",
  rotate = 16,
  lift = 90,
}: {
  children: ReactNode;
  className?: string;
  axis?: "x" | "y";
  rotate?: number;
  lift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp((r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2), -1, 1);
      const k = window.innerWidth < 768 ? 0.5 : 1;
      const a = Math.abs(p);
      const rot = axis === "x" ? `rotateX(${p * rotate * k}deg)` : `rotateY(${p * rotate * k}deg)`;
      el.style.transform = `perspective(1400px) translateZ(${-a * lift * k}px) ${rot} scale(${1 - a * 0.05})`;
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
  }, [axis, rotate, lift]);
  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

/* ───────── HeroStage: mouse + scroll drive CSS vars (--mx --my --sy) for layered 3D ───────── */
export function HeroStage({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let raf = 0;
    let mx = 0;
    let my = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
      el.style.setProperty("--sy", clamp(window.scrollY / 700, 0, 1).toFixed(3));
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const move = (e: globalThis.PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      queue();
    };
    apply();
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", queue, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", queue);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

/* ───────── Tilt3D: pointer tilt for cards ───────── */
export function Tilt3D({
  children,
  className = "",
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || reduced()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg) translateZ(12px)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={className}
      style={{ transition: "transform 280ms ease-out" }}
    >
      {children}
    </div>
  );
}

/* ───────── Words: headline words swing up in 3D ───────── */
export function Words({
  text,
  className = "",
  wordClass = "",
  delay = 0,
  step = 80,
}: {
  text: string;
  className?: string;
  wordClass?: string;
  delay?: number;
  step?: number;
}) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.2);
  const words = text.split(" ");
  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      style={{ perspective: "900px" }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className={`inline-block ${wordClass}`}
          style={{
            transformOrigin: "50% 100%",
            opacity: seen ? 1 : 0,
            transform: seen
              ? "rotateX(0deg) translateY(0)"
              : "rotateX(-100deg) translateY(40%)",
            transition: `transform 900ms cubic-bezier(.2,.8,.2,1) ${delay + i * step}ms, opacity 700ms ease ${delay + i * step}ms`,
          }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

/* ───────── Counter ───────── */
export function Counter({
  to,
  className = "",
}: {
  to: number;
  className?: string;
}) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.4);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (reduced()) {
      setV(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = clamp((t - t0) / 1100, 0, 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return (
    <span ref={ref} className={className}>
      {String(v).padStart(2, "0")}
    </span>
  );
}

/* ───────── Marquee ───────── */
export function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className="s3-anim flex w-max whitespace-nowrap"
        style={{ animation: "s3-marquee 38s linear infinite" }}
      >
        {row.map((t, i) => (
          <span key={i} className={className}>
            {t}
            <span aria-hidden className="mx-10">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}