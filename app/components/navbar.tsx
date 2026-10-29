"use client";
import { useState, useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

/* EDIT HERE: brand palette (keep in sync with the page files) */
const palette = {
  "--gold": "#b98a45",
  "--navy": "#0f1b3d",
} as CSSProperties;

/* EDIT HERE: add more links when pages are ready */
const links: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    href: "/apartments",
    label: "Apartments",
   children: [
  { href: "/apartments/seizani_loft", label: "Seizani Loft" },
  { href: "/apartments/santa_sophia", label: "Santa Sophia" },
  { href: "/apartments/pythagoras", label: "Pythagoras" },
  { href: "/apartments/piraeus_olynthou", label: "Piraeus Olynthou" },
  { href: "/apartments/drapetsona", label: "Drapetsona" },
  { href: "/apartments/sea-view-villa", label: "Sea View Villa" },
  { href: "/apartments/villa-porto-rafti", label: "Villa Porto Rafti" },
],
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

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

  /* Highlights the section you are currently in (gold text) */
  const isActive = (l: NavLink) =>
    l.href === "/"
      ? pathname === "/"
      : !l.href.includes("#") && pathname.startsWith(l.href);

  return (
    <header
      style={palette}
      className="fixed inset-x-0 top-0 z-30 border-b border-(--gold)/40 bg-white shadow-sm"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="block" onClick={closeAll}>
          <Image
            src="/images/aurevon_logo_rbg.png"
            alt="Aurevon Global Partners"
            width={200}
            height={60}
            priority
            className="h-14 w-auto"
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
                    if (
                      l.children &&
                      !e.currentTarget.contains(e.relatedTarget as Node)
                    ) {
                      setOpenDropdown(null);
                    }
                  }}
                >
             {(() => {
  const cls = `flex items-center gap-1.5 py-2 text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:text-(--gold) ${
    isActive(l) ? "text-(--gold)" : "text-(--navy)"
  }`;
  const inner = (
    <>
      {l.label}
      {l.children && (
        <svg
          aria-hidden="true"
          viewBox="0 0 10 6"
          className={`h-1.5 w-2.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      )}
    </>
  );
  return l.children ? (
    <button
      type="button"
      aria-haspopup="true"
      aria-expanded={isOpen}
      onClick={() => setOpenDropdown(isOpen ? null : l.href)}
      className={cls}
    >
      {inner}
    </button>
  ) : (
    <Link href={l.href} onClick={closeAll} className={cls}>
      {inner}
    </Link>
  );
})()}

                  {/* Dropdown */}
                  {l.children && (
                    <div
                      className={`absolute left-1/2 top-full w-56 -translate-x-1/2 pt-2 transition-all duration-200 ${
                        isOpen
                          ? "visible opacity-100"
                          : "invisible pointer-events-none opacity-0"
                      }`}
                    >
                      <ul className="border border-(--gold)/40 border-t-2 border-t-(--gold) bg-white py-2 shadow-lg">
                        {l.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              onClick={closeAll}
                              className={`block px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:bg-(--navy) hover:text-white ${
                                pathname === c.href
                                  ? "text-(--gold)"
                                  : "text-(--navy)"
                              }`}
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
            className="border border-(--navy) bg-(--navy) px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:border-(--gold) hover:bg-(--gold) hover:text-(--navy)"
          >
            Inquire Now
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 text-(--navy) md:hidden"
          >
            <span
              className={`h-px w-6 bg-current transition ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-current transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-current transition ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {menuOpen && (
        <div className="border-t border-(--gold)/30 bg-white md:hidden">
          <ul className="mx-auto max-w-6xl px-6 py-4">
            {links.map((l) => (
              <li
                key={l.href}
                className="border-b border-(--navy)/10 last:border-0"
              >
                <Link
                  href={l.href}
                  onClick={closeAll}
                  className={`block py-3 text-xs font-medium uppercase tracking-[0.15em] ${
                    isActive(l) ? "text-(--gold)" : "text-(--navy)"
                  }`}
                >
                  {l.label}
                </Link>
                {l.children && (
                  <ul className="mb-2 ml-3 border-l border-(--gold)/50 pl-4">
                    {l.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={closeAll}
                          className={`block py-2.5 text-xs font-medium uppercase tracking-[0.15em] hover:text-(--gold) ${
                            pathname === c.href
                              ? "text-(--gold)"
                              : "text-(--navy)/70"
                          }`}
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