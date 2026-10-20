"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/images/room1.jpg",
  "/images/room2.jpg",
  "/images/room3.jpg",
  "/images/room4.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % images.length),
      6000
    );
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section
      id="home"
      className="relative flex h-svh min-h-150 items-start overflow-hidden text-white"
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="100vw"
          priority={i === 0}
          className={`object-cover transition-all duration-1500 ${
            i === current ? "scale-105 opacity-100" : "scale-100 opacity-0"
          }`}
        />
      ))}

      {/* Overlay: mas madilim sa kaliwa kung nasaan ang text */}
      <div className="absolute inset-0 bg-linear-to-r from-slate-900/75 via-slate-900/40 to-slate-900/5" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-slate-900/50 to-transparent" />

      {/* Content (itaas-kaliwa) */}
      <div className="relative mx-auto w-full max-w-6xl px-6 pt-32 md:pt-40">
        <div className="mb-6 flex animate-[fade-up_1s_ease_both] items-center gap-4">
          <span className="h-px w-12 bg-[#e0c48f]" />
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#e0c48f]">
            Aurevon Global Partners
          </p>
        </div>

        <h1 className="max-w-4xl animate-[fade-up_1s_ease_0.2s_both] text-balance font-(family-name:--font-display) text-4xl font-light leading-[1.1] drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
          Property Investment &amp; Residency Opportunities
        </h1>

        <p className="mt-6 max-w-xl animate-[fade-up_1s_ease_0.4s_both] leading-relaxed text-stone-100 drop-shadow">
          How property investment considerations and residency objectives may
          intersect, and how professional advisory support can guide your
          decision-making.
        </p>

        <div className="mt-8 flex animate-[fade-up_1s_ease_0.6s_both] flex-wrap gap-4">
          <a
            href="#contact"
            className="bg-[#b8935a] px-8 py-4 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:bg-[#a07f49]"
          >
            Discuss Your Requirements
          </a>
          <a
            href="#services"
            className="border border-white/70 px-8 py-4 text-xs font-medium uppercase tracking-[0.15em] transition hover:bg-white hover:text-slate-900"
          >
            Our Services
          </a>
        </div>
      </div>

      {/* Slide indicators (clickable) */}
      <div className="absolute bottom-6 left-0 right-0 mx-auto flex w-full max-w-6xl px-6">
        <div className="flex">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to image ${i + 1}`}
              className="group flex h-10 w-12 cursor-pointer items-center justify-center first:justify-start"
            >
              <span
                className={`block h-0.5 transition-all duration-300 ${
                  i === current
                    ? "w-10 bg-[#e0c48f]"
                    : "w-7 bg-white/50 group-hover:w-10 group-hover:bg-white"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}