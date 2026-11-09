"use client";
import { useState, useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

/* A dropdown item is either a plain link, or a group that holds its own list of links */
type NavItem = { href: string; label: string };
type NavChild = {
  href: string; // for a group this is only an id (it is not clickable)
  label: string;
  children?: NavItem[];
};
type NavLink = {
  href: string;
  label: string;
  children?: NavChild[];
};

/* EDIT HERE: brand palette (keep in sync with the page files) */
const palette = {
  "--gold": "#b98a45",
  "--navy": "#0f1b3d",
} as CSSProperties;

/* EDIT HERE: main links */
const leftLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    href: "/apartments",
    label: "Apartments",
    children: [
      { href: "/apartments/seizani_loft", label: "Seizani Loft" },
      { href: "/apartments/santa_sophia", label: "Santa Sophia" },
      { href: "/apartments/pythagoras", label: "Pythagoras" },

      /* GROUP: hover (or tap) "Piraeus" to open its list. Add new Piraeus units here, one line each. */
      {
        href: "piraeus",
        label: "Piraeus",
        children: [
          { href: "/apartments/piraeus_olynthou", label: "Olynthou" },
          { href: "/apartments/piraeus/ground-floor-43", label: "Ground Floor 43 m²" },
          { href: "/apartments/piraeus/ground-floor-94", label: "Ground Floor 94 m²" },
          { href: "/apartments/piraeus/first-floor-71", label: "1st Floor 71 m²" },
          { href: "/apartments/piraeus/apartment-101", label: "Apartment 101 m²" },
        ],
      },

      { href: "/apartments/drapetsona", label: "Drapetsona" },
      { href: "/apartments/sea-view-villa", label: "Sea View Villa" },
      { href: "/apartments/villa-porto-rafti", label: "Villa Porto Rafti" },

      /* GROUP: Pagrati units. The slugs are the keys of `units` in app/apartments/pagrati/[unit]/page.tsx.
         Add new Pagrati units here, one line each. */
      {
        href: "pagrati",
        label: "Pagrati",
        children: [
          { href: "/apartments/pagrati/studio-40", label: "Studio 40 m²" },
          { href: "/apartments/pagrati/evmenous-82", label: "Evmenous 82 m²" },
          { href: "/apartments/pagrati/aspasias-48", label: "Aspasias 48 m²" },
        ],
      },

      { href: "/apartments/katechaki", label: "Katechaki" },
      /* GROUP: Votanikos units. The slugs are the keys of `units` in app/apartments/votanikos/[unit]/page.tsx.
         Add new Votanikos units here, one line each. */
      {
        href: "votanikos",
        label: "Votanikos",
        children: [
          { href: "/apartments/votanikos/kozanis-45", label: "Kozanis Loft 45 m²" },
          { href: "/apartments/votanikos/agias-markellas-68", label: "Agias Markellas 68 m²" },
        ],
      },
      { href: "/apartments/glaraki", label: "Glaraki" },
      { href: "/apartments/petralona", label: "Petralona" },
      { href: "/apartments/areios-pagos", label: "Areios Pagos" },
      { href: "/apartments/kato-pasia", label: "Kato Pasia" },
      { href: "/apartments/korinthos", label: "Korinthos" },

      /* GROUP: sold apartments. The slugs are the keys of `units` in app/apartments/sold-apartment/[unit]/page.tsx.
         Add new sold apartments here, one line each. */
      {
        href: "sold-apartment",
        label: "Sold Apartments",
        children: [
          { href: "/apartments/sold-apartment/miaouli", label: "Miaouli 60 m²" },
          { href: "/apartments/sold-apartment/pagrati-evmenous-145", label: "Pagrati Evmenous 145 m²" },
          { href: "/apartments/sold-apartment/kallithea-menelaou-95", label: "Kallithea Menelaou 95 m²" },
        ],
      },
    ],
  },
];

/* EDIT HERE: more links (the Inquire Now button follows them) */
const rightLinks: NavLink[] = [
  { href: "/pricing", label: "Pricing" },
  { href: "/partners", label: "Partners" },
];

/* used by both the desktop bar and the mobile panel */
const mobileLinks: NavLink[] = [...leftLinks, ...rightLinks];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null); // desktop flyout
  const [mobileSub, setMobileSub] = useState<string | null>(null); // mobile expandable group
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!menuOpen && !openDropdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setOpenDropdown(null);
        setOpenSub(null);
        setMobileSub(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, openDropdown]);

  // Close everything whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setOpenSub(null);
    setMobileSub(null);
  }, [pathname]);

  // When the main dropdown closes, fold its flyout too
  useEffect(() => {
    if (!openDropdown) setOpenSub(null);
  }, [openDropdown]);

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
    setOpenSub(null);
    setMobileSub(null);
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

  const groupActive = (c: NavChild) =>
    !!c.children?.some((g) => pathname === g.href);

  const renderDesktop = (l: NavLink) => {
    const isOpen = openDropdown === l.href;
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
        {l.children ? (
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
        )}

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
              {l.children.map((c) =>
                c.children ? (
                  /* GROUP row with a flyout to the right */
                  <li
                    key={c.href}
                    className="relative"
                    onMouseEnter={() => setOpenSub(c.href)}
                  >
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={openSub === c.href}
                      onClick={() => setOpenSub(openSub === c.href ? null : c.href)}
                      className={`flex w-full items-center justify-between px-5 py-2.5 text-left text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:bg-(--navy) hover:text-white ${
                        openSub === c.href
                          ? "bg-(--navy) text-white"
                          : groupActive(c)
                            ? "text-(--gold)"
                            : "text-(--navy)"
                      }`}
                    >
                      {c.label}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 6 10"
                        className="h-2.5 w-1.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M1 1l4 4-4 4" />
                      </svg>
                    </button>

                    {openSub === c.href && (
                      <div className="absolute left-full top-0 -mt-2 w-56 pl-0.5">
                        <ul className="border border-(--gold)/40 border-t-2 border-t-(--gold) bg-white py-2 shadow-lg">
                          {c.children.map((g) => (
                            <li key={g.href}>
                              <Link
                                href={g.href}
                                onClick={closeAll}
                                className={`block px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:bg-(--navy) hover:text-white ${
                                  pathname === g.href ? "text-(--gold)" : "text-(--navy)"
                                }`}
                              >
                                {g.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ) : (
                  /* plain link row (folds any open flyout when hovered) */
                  <li key={c.href} onMouseEnter={() => setOpenSub(null)}>
                    <Link
                      href={c.href}
                      onClick={closeAll}
                      className={`block px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:bg-(--navy) hover:text-white ${
                        pathname === c.href ? "text-(--gold)" : "text-(--navy)"
                      }`}
                    >
                      {c.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <header
      style={palette}
      className="fixed inset-x-0 top-0 z-30 border-b border-(--gold)/40 bg-white shadow-sm"
    >
      {/* three columns: links | centred logo | links + button */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2">
        <Link href="/" className="block" onClick={closeAll}>
         <Image
  src="/images/aurevon-logo.jpg"
  alt="Aurevon Global Partners"
  width={400}
  height={120}
  priority
  className="h-20 w-auto md:h-24"
/>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {mobileLinks.map(renderDesktop)}
          </div>

          <Link
            href="/contact"
            onClick={closeAll}
            className="hidden border border-(--navy) bg-(--navy) px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:border-(--gold) hover:bg-(--gold) hover:text-(--navy) md:inline-block"
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
<div className="max-h-[calc(100vh-7rem)] overflow-y-auto border-t border-(--gold)/30 bg-white md:hidden">          <ul className="mx-auto max-w-6xl px-6 py-4">
            {mobileLinks.map((l) => (
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
                    {l.children.map((c) =>
                      c.children ? (
                        /* GROUP: tap to expand */
                        <li key={c.href}>
                          <button
                            type="button"
                            aria-expanded={mobileSub === c.href}
                            onClick={() =>
                              setMobileSub(mobileSub === c.href ? null : c.href)
                            }
                            className={`flex w-full items-center justify-between py-2.5 text-left text-xs font-medium uppercase tracking-[0.15em] hover:text-(--gold) ${
                              groupActive(c) ? "text-(--gold)" : "text-(--navy)/70"
                            }`}
                          >
                            {c.label}
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 10 6"
                              className={`h-1.5 w-2.5 transition-transform ${
                                mobileSub === c.href ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <path d="M1 1l4 4 4-4" />
                            </svg>
                          </button>
                          {mobileSub === c.href && (
                            <ul className="mb-1 ml-3 border-l border-(--gold)/30 pl-4">
                              {c.children.map((g) => (
                                <li key={g.href}>
                                  <Link
                                    href={g.href}
                                    onClick={closeAll}
                                    className={`block py-2.5 text-xs font-medium uppercase tracking-[0.15em] hover:text-(--gold) ${
                                      pathname === g.href
                                        ? "text-(--gold)"
                                        : "text-(--navy)/70"
                                    }`}
                                  >
                                    {g.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ) : (
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
                      ),
                    )}
                  </ul>
                )}
              </li>
            ))}
            <li className="pt-4">
              <Link
                href="/contact"
                onClick={closeAll}
                className="block bg-(--navy) py-3 text-center text-xs font-medium uppercase tracking-[0.15em] text-white"
              >
                Inquire Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}