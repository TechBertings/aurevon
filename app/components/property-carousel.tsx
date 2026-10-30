"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export type Property = {
  slug: string;
  src: string;
  name: string;
  tag: string;
  facts: string[]; // [location, line 2, line 3]
  stats: { n: string; l: string }[]; // 2 items
  price: string;
  from?: boolean;
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function PropertyCarousel({
  items,
  interval = 4500,
}: {
  items: Property[];
  interval?: number;
}) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchX, setTouchX] = useState<number | null>(null);

  const go = useCallback((d: number) => setActive((a) => (a + d + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), interval);
    return () => clearInterval(t);
  }, [paused, go, interval, active]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        setTouchX(null);
      }}
    >
      {/* stage */}
      <div className="relative mx-auto h-[600px] w-full max-w-[1500px] overflow-hidden [--step:255px] sm:[--step:310px] md:h-[690px] md:[--step:355px]">
        {items.map((p, i) => {
          let o = (i - active + n) % n;
          if (o > n / 2) o -= n;
          const abs = Math.abs(o);
          const visible = abs <= 2;
          const isActive = o === 0;
          const clamped = Math.max(-3, Math.min(3, o));

          return (
            <article
              key={p.slug}
              role={isActive ? undefined : "button"}
              tabIndex={visible && !isActive ? 0 : -1}
              aria-label={isActive ? undefined : `Show ${p.name}`}
              onClick={() => !isActive && setActive(i)}
              onKeyDown={(e) => {
                if (!isActive && (e.key === "Enter" || e.key === " ")) setActive(i);
              }}
              style={{
                transform: `translateX(calc(-50% + ${clamped} * var(--step))) scale(${
                  visible ? 1 - abs * 0.12 : 0.7
                })`,
                opacity: !visible ? 0 : abs === 0 ? 1 : abs === 1 ? 0.75 : 0.4,
                zIndex: 10 - abs,
                pointerEvents: visible ? "auto" : "none",
              }}
              className={`absolute left-1/2 top-1/2 flex h-[540px] w-[270px] -translate-y-1/2 flex-col rounded-t-[999px] border border-(--gold)/60 bg-white p-2 transition-all duration-700 ease-out sm:w-[300px] md:h-[620px] md:w-[330px] ${
                isActive
                  ? "shadow-[0_50px_80px_-35px_rgba(16,35,94,0.6)]"
                  : "cursor-pointer shadow-[0_30px_50px_-30px_rgba(16,35,94,0.4)]"
              }`}
            >
              {/* photo (arch) */}
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-t-[999px]">
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  sizes="330px"
                  className={`object-cover transition duration-700 ${
                    isActive ? "scale-105" : "scale-100 grayscale-[35%]"
                  }`}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-(--navy-deep)/60 via-transparent to-transparent"
                />
                <span className="absolute left-1/2 top-7 -translate-x-1/2 font-serif text-[11px] tracking-[0.35em] text-white/90">
                  N° {pad(i + 1)}
                </span>
                <span className="absolute inset-x-0 bottom-4 mx-auto w-fit bg-linear-to-b from-(--gold-light) to-(--gold) px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-white shadow-md">
                  {p.tag}
                </span>
              </div>

              {/* text */}
              <div className="px-4 pb-4 pt-5 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">
                  {p.facts[0]}
                </p>
                <h3 className="mt-2 font-serif text-2xl leading-tight text-(--navy) md:text-[26px]">
                  {p.name}
                </h3>

                {/* details: only on the active card */}
                <div
                  className={`grid transition-all duration-500 ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <span className="mx-auto mt-3 block h-px w-10 bg-(--gold)" />
                    <p className="mt-3 text-xs text-(--navy)/65">
                      {p.facts[1]} · {p.facts[2]}
                    </p>

                    <dl className="mt-4 grid grid-cols-3 divide-x divide-(--gold)/30 border-y border-(--gold)/30 py-3">
                      {p.stats.map((s) => (
                        <div key={s.l} className="px-1">
                          <dd className="font-serif text-lg leading-none text-(--navy)">
                            {s.n}
                          </dd>
                          <dt className="mt-1 text-[9px] uppercase tracking-[0.2em] text-(--navy)/55">
                            {s.l}
                          </dt>
                        </div>
                      ))}
                      <div className="px-1">
                        <dd className="font-serif text-lg leading-none text-(--gold-dark)">
                          {p.price}
                        </dd>
                        <dt className="mt-1 text-[9px] uppercase tracking-[0.2em] text-(--navy)/55">
                          {p.from ? "From" : "Price"}
                        </dt>
                      </div>
                    </dl>

                    <Link
                      href={`/apartments/${p.slug}`}
                      tabIndex={isActive ? 0 : -1}
                      className="mt-4 flex items-center justify-center gap-3 bg-(--navy) py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-(--gold-dark)"
                    >
                      View property <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* controls */}
      <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-5 px-6">
        <button
          onClick={() => go(-1)}
          aria-label="Previous property"
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-(--navy)/30 text-(--navy) transition hover:border-(--gold) hover:bg-(--gold) hover:text-white"
        >
          ←
        </button>

        <div className="flex flex-1 items-center gap-4">
          <span className="font-serif text-sm tracking-[0.2em] text-(--navy)">
            {pad(active + 1)}
          </span>
          <span className="relative h-px flex-1 bg-(--navy)/20">
            <span
              className="absolute inset-y-0 left-0 h-0.5 -translate-y-1/4 bg-(--gold) transition-all duration-500"
              style={{ width: `${((active + 1) / n) * 100}%` }}
            />
          </span>
          <span className="font-serif text-sm tracking-[0.2em] text-(--navy)/50">
            {pad(n)}
          </span>
        </div>

        <button
          onClick={() => go(1)}
          aria-label="Next property"
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-(--navy)/30 text-(--navy) transition hover:border-(--gold) hover:bg-(--gold) hover:text-white"
        >
          →
        </button>
      </div>
    </div>
  );
}