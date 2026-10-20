"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

/* EDIT HERE: add more links when pages are ready */
const links: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  {
    href: "/apartments",
    label: "Apartments",
    children: [
      { href: "/apartments/seizani-loft", label: "Seizani Loft" },
      { href: "/apartments/santa_sophia", label: "Santa Sophia" },
      { href: "/apartments/pythagoras", label: "Pythagoras" },
      { href: "/apartments/piraeus-olynthou", label: "Piraeus Olynthou" },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen && !openDropdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, openDropdown]);

  // Close everything whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const solid = scrolled || menuOpen || openDropdown !== null;

  const closeAll = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(false);
    setOpenDropdown(null);
    // Remove focus so the dropdown doesn't stay open via keyboard focus
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const openDrop = (href: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(href);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-all duration-300 ${
        solid
          ? "bg-white/95 shadow-sm backdrop-blur"
          : "bg-linear-to-b from-black/40 to-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="block" onClick={closeAll}>
          <Image
            src="/images/aurevon_logo_rbg.png"
            alt="Aurevon Global Partners"
            width={200}
            height={60}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => {
              const isOpen = openDropdown === l.href;
              return (
                <div
                  key={l.href}
                  className="relative"
                  onMouseEnter={() => l.children && openDrop(l.href)}
                  onMouseLeave={() => l.children && scheduleClose()}
                  onFocus={() => l.children && openDrop(l.href)}
                  onBlur={(e) => {
                    // close only if focus moved outside this item
                    if (l.children && !e.currentTarget.contains(e.relatedTarget as Node)) {
                      setOpenDropdown(null);
                    }
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={closeAll}
                    className={`flex items-center gap-1.5 py-2 text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:text-[#b8935a] ${
                      solid ? "text-slate-700" : "text-white"
                    }`}
                  >
                    {l.label}
                    {l.children && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 10 6"
                        className={`h-1.5 w-2.5 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M1 1l4 4 4-4" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown */}
                  {l.children && (
                    <div
                      className={`absolute left-1/2 top-full w-56 -translate-x-1/2 pt-2 transition-all duration-200 ${
                        isOpen
                          ? "visible opacity-100"
                          : "invisible pointer-events-none opacity-0"
                      }`}
                    >
                      <ul className="border border-slate-200 bg-white py-2 shadow-lg">
                        {l.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              onClick={closeAll}
                              className="block px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#b8935a]"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <Link
            href="/contact"
            onClick={closeAll}
            className={`border px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition ${
              solid
                ? "border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
                : "border-white/70 text-white hover:bg-white hover:text-slate-900"
            }`}
          >
            Inquire Now
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden ${
              solid ? "text-slate-800" : "text-white"
            }`}
          >
            <span className={`h-px w-6 bg-current transition ${menuOpen ? "translate-y-7px rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-current transition ${menuOpen ? "-translate-y-7px -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <ul className="mx-auto max-w-6xl px-6 py-4">
            {links.map((l) => (
              <li key={l.href} className="border-b border-slate-100 last:border-0">
                <Link
                  href={l.href}
                  onClick={closeAll}
                  className="block py-3 text-xs font-medium uppercase tracking-[0.15em] text-slate-700"
                >
                  {l.label}
                </Link>
                {l.children && (
                  <ul className="mb-2 ml-3 border-l border-slate-200 pl-4">
                    {l.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={closeAll}
                          className="block py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-slate-500 hover:text-[#b8935a]"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}