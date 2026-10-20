"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  { image: "/images/property1.jpg", title: "Azure Heights Luxury Residences", location: "Dubai Marina", price: "from $160k" },
  { image: "/images/property2.jpg", title: "Palm Vista Villas", location: "Palm Jumeirah", price: "from $320k" },
  { image: "/images/property3.jpg", title: "Skyline Residences", location: "Downtown", price: "from $210k" },
  { image: "/images/property4.jpg", title: "Harbor View Apartments", location: "Business Bay", price: "from $180k" },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      4000
    );
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="relative h-112 w-full overflow-hidden rounded-2xl shadow-lg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />  
      {slides.map((s, i) => (
        <div
          key={s.image}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            priority={i === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900">
              {s.location}
            </span>
            <h3 className="mt-3 text-2xl font-bold">{s.title}</h3>
            <p className="text-sm text-slate-200">{s.price}</p>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 font-bold hover:bg-white"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 font-bold hover:bg-white"
      >
        ›
      </button>

      <div className="absolute bottom-4 right-6 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-6 bg-amber-500" : "w-2 bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}