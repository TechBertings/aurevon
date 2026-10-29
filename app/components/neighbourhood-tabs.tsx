"use client";

import { useState } from "react";

type Item = { label: string; text: string };
type Group = { id: string; tab: string; items: Item[] };

export default function NeighbourhoodTabs({ groups }: { groups: Group[] }) {
  const [g, setG] = useState(0);
  const [i, setI] = useState(0);

  const group = groups[g];
  const total = group.items.length;
  const item = group.items[i];
  const go = (n: number) => setI((n + total) % total);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="relative border border-(--gold)/50 bg-white shadow-[0_30px_60px_-30px_rgba(16,35,94,0.45)]">
      <style>{`
        @keyframes nt-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .nt-in { animation: nt-in 450ms ease-out both; }
      `}</style>

      {/* corner marks */}
      {[
        "left-0 top-0 border-l-2 border-t-2",
        "right-0 top-0 border-r-2 border-t-2",
        "bottom-0 left-0 border-b-2 border-l-2",
        "bottom-0 right-0 border-b-2 border-r-2",
      ].map((c) => (
        <span
          key={c}
          aria-hidden
          className={`pointer-events-none absolute h-4 w-4 border-(--gold) ${c}`}
        />
      ))}

      {/* tabs */}
      <div role="tablist" className="grid grid-cols-2 border-b border-(--gold)/40">
        {groups.map((gr, idx) => (
          <button
            key={gr.id}
            role="tab"
            aria-selected={idx === g}
            onClick={() => {
              setG(idx);
              setI(0);
            }}
            className={`px-4 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] transition md:text-[11px] ${
              idx === g
                ? "bg-(--navy) text-(--gold-light)"
                : "text-(--navy)/70 hover:bg-(--gold)/10 hover:text-(--navy)"
            }`}
          >
            {gr.tab}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        {/* item list */}
        <ul className="border-b border-(--gold)/30 md:border-b-0 md:border-r">
          {group.items.map((it, idx) => (
            <li key={it.label} className="border-b border-(--gold)/20 last:border-b-0">
              <button
                onClick={() => setI(idx)}
                onMouseEnter={() => setI(idx)}
                aria-current={idx === i}
                className={`group relative flex w-full items-baseline gap-4 px-5 py-3.5 text-left transition-all duration-300 ${
                  idx === i ? "bg-(--gold)/10 pl-7" : "hover:bg-(--gold)/5 hover:pl-6"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute left-0 top-1/2 w-0.5 -translate-y-1/2 bg-(--gold) transition-all duration-300 ${
                    idx === i ? "h-7" : "h-0"
                  }`}
                />
                <span className="font-serif text-xs tracking-[0.2em] text-(--gold)">
                  {pad(idx + 1)}
                </span>
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    idx === i ? "text-(--navy)" : "text-(--navy)/70"
                  }`}
                >
                  {it.label}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* detail */}
        <div className="flex min-h-[15rem] flex-col justify-between p-6 md:p-8">
          <div key={`${g}-${i}`} className="nt-in">
            <p className="font-serif text-5xl font-bold text-(--gold-light) md:text-6xl">
              {pad(i + 1)}
              <span className="ml-2 text-lg font-normal text-(--navy)/30">/ {pad(total)}</span>
            </p>
            <h3 className="mt-4 font-serif text-xl font-bold uppercase tracking-wide text-(--navy) md:text-2xl">
              {item.label}
            </h3>
            <span className="mb-4 mt-3 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
            <p className="text-sm leading-relaxed text-(--navy)/75">{item.text}</p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-1.5" aria-hidden>
              {group.items.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-0.5 transition-all duration-300 ${
                    idx === i ? "w-8 bg-(--gold)" : "w-3 bg-(--gold)/30"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => go(i - 1)}
                aria-label="Previous"
                className="grid h-9 w-9 place-items-center border border-(--gold)/50 text-(--navy) transition hover:bg-(--navy) hover:text-(--gold-light)"
              >
                ←
              </button>
              <button
                onClick={() => go(i + 1)}
                aria-label="Next"
                className="grid h-9 w-9 place-items-center border border-(--gold)/50 text-(--navy) transition hover:bg-(--navy) hover:text-(--gold-light)"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}