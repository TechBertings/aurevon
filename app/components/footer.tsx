"use client";
import { useState, useEffect } from "react";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-white/10 bg-slate-950 px-6 py-10 text-center text-xs text-slate-400">
      <p>© {year ?? ""} Aurevon Global Partners. All rights reserved.</p>
      <p className="mx-auto mt-3 max-w-2xl leading-relaxed">
        The information on this website is general in nature and does not
        constitute legal, financial, or immigration advice. Residency outcomes
        depend on each country&apos;s requirements and are not guaranteed.
      </p>
    </footer>
  );
}