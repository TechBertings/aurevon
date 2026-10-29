"use client";

import { useEffect, useRef, useState } from "react";

export type UnitVideo = {
  src: string | null; /* mp4 in /public/videos/, e.g. "/videos/unit1.mp4" */
  poster?: string | null; /* thumbnail image shown before playing */
  place: string;
  name: string;
  price?: string;
};

export default function UnitVideos({ videos }: { videos: UnitVideo[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [sound, setSound] = useState(false);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  /* only one video plays at a time */
  useEffect(() => {
    refs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.muted = !sound;
        void v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active, sound]);

  return (
    <ul className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
      {videos.map((v, i) => {
        const playing = active === i;
        return (
          <li
            key={v.name}
            className="w-[62%] shrink-0 snap-center sm:w-[42%] lg:w-auto"
          >
            <div className="relative aspect-9/16 overflow-hidden rounded-xl border border-(--gold)/40 bg-(--navy)">
              {v.src ? (
                <video
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  src={v.src}
                  poster={v.poster ?? undefined}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-b from-(--navy) to-(--navy-deep) text-xs uppercase tracking-[0.2em] text-white/70">
                  Video coming soon
                </div>
              )}

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-(--navy-deep) via-transparent to-(--navy-deep)/30"
              />

              {v.src && (
                <button
                  type="button"
                  onClick={() => setActive(playing ? null : i)}
                  aria-label={`${playing ? "Pause" : "Play"} video: ${v.name}`}
                  className="absolute inset-0 flex items-center justify-center focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-(--gold-light)"
                >
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-full border border-(--gold-light)/70 bg-(--navy-deep)/60 text-(--gold-light) backdrop-blur transition-opacity ${
                      playing ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7L8 5Z" />
                    </svg>
                  </span>
                </button>
              )}

              {v.src && playing && (
                <button
                  type="button"
                  onClick={() => setSound((s) => !s)}
                  aria-label={sound ? "Mute" : "Unmute"}
                  className="absolute right-3 top-3 rounded-full bg-(--navy-deep)/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-(--gold-light)"
                >
                  {sound ? "Sound on" : "Sound off"}
                </button>
              )}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">
                  {v.place}
                </p>
                <h3 className="mt-1 font-serif text-lg text-white">{v.name}</h3>
                {v.price && (
                  <p className="mt-1 font-serif text-(--gold-light)">{v.price}</p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}