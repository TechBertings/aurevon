import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import RoomBook from "../../../components/room-book";
import NeighbourhoodTabs from "../../../components/neighbourhood-tabs";
import {
  Counter,
  Depth,
  HeroStage,
  Reveal3D,
  S3Styles,
  ScrollBar,
  Words,
} from "../../../components/scroll-3d";

/* ═════════════════════════════════════════════════════════════════
   ONE PAGE FOR EVERY VOTANIKOS APARTMENT
   File location: app/apartments/votanikos/[unit]/page.tsx
   URLs: /apartments/votanikos/<slug>   (slug = the keys of `units` below)
   Same layout as the old Kozanis Loft page: dark navy hero with the stats built in,
   window-pane dividers, numbered feature rows, map + grouped place list, and tabs.
   To add an apartment: copy one entry in `units`, change the data, drop its images in public/images/.
   (Delete the old app/apartments/kozanis_loft folder once this is in.)
   ═════════════════════════════════════════════════════════════════ */

/* palette: same as the other pages (RoomBook depends on these variable names) */
const palette = {
  "--navy": "#10235e",
  "--navy-deep": "#0a1740",
  "--gold": "#b9791f",
  "--gold-light": "#e2b862",
  "--gold-dark": "#8f5a12",
  "--cream": "#fbf6ea",
  "--paper": "#f3ead6",
  "--sky": "#cfe5f4",
  "--aegean": "#1d7db5",
} as CSSProperties;

const grain: CSSProperties = {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .42 0 0 0 0 .34 0 0 0 0 .22 0 0 0 .14 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
};
const Paper = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 mix-blend-multiply"
    style={grain}
  />
);

const glow = (pos: string, a = 0.22): CSSProperties => ({
  backgroundImage: `radial-gradient(55% 60% at ${pos}, rgba(226,184,98,${a}), transparent 70%)`,
});

/* Window-pane band: a row of small rectangles, like the panes of steel-framed glass */
const panesBg = (color: string): CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='22'><rect x='.6' y='.6' width='42.8' height='20.8' fill='none' stroke='${color}' stroke-width='1.2'/></svg>")`,
  backgroundRepeat: "repeat-x",
});
const Panes = ({
  className = "",
  color = "%23b9791f",
}: {
  className?: string;
  color?: string;
}) => <div aria-hidden className={`h-[22px] ${className}`} style={panesBg(color)} />;

/* ───────── IMAGES ─────────
   All files go in public/images/. If your files are .jpg, change EXT to "jpg".

   45 m² KOZANIS LOFT (same names as before)
     votanikos-cover.png        brochure cover, portrait (hero)
     votanikos-living-1.png     living area, wide: glass mezzanine, stairs, shelving, kitchen on the left
     votanikos-living-2.png     portrait: wall unit with the stairs on the left
     votanikos-living-3.png     portrait: glass mezzanine, stairs and the kitchen counter
     votanikos-kitchen.png      kitchen corner: black veined splashback, steel sink, white cabinets
     votanikos-entrance.png     entrance with the open door and the high window
     votanikos-mezzanine.png    mezzanine: wardrobes with LED strips and the slatted balustrade
     votanikos-bathroom.png     bathroom: glass walk-in shower, timber vanity
     votanikos-map.png          the aerial map only (crop off the title above and "Key locations" below)

   68 m² AGIAS MARKELLAS
     votanikos-markellas-cover.png        brochure cover, portrait (crop out the title text and the price/specs block)
     votanikos-markellas-interior-1.png   kitchen island, sofa alcove and floating stairs, wide
     votanikos-markellas-interior-2.png   bedroom, button-tufted headboard
     votanikos-markellas-interior-3.png   TV unit under the floating staircase
     votanikos-markellas-interior-4.png   kitchen corner, portrait: stainless fridge-freezer, walnut-effect units
     votanikos-markellas-interior-5.png   marble-effect walk-in shower, portrait
     votanikos-markellas-interior-6.png   wall-hung toilet and frosted window, portrait
     votanikos-markellas-map.png          the aerial map only (crop off the title above and "Key locations" below)
*/
const FOLDER = "/images";
const EXT = "png";
const img = (n: string) => `${FOLDER}/${n}.${EXT}`;

const numWords = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
];
const count = (n: number) => numWords[n] ?? String(n);

/* ───────── Icons (line style) ───────── */
type IconType = ComponentType<{ className?: string }>;
const icon = (paths: ReactNode): IconType => {
  const I: IconType = ({ className = "h-6 w-6" }) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths}
    </svg>
  );
  return I;
};

const GlassIcon = icon(
  <>
    <rect x="4" y="3.5" width="16" height="17" />
    <path d="M12 3.5v17M4 12h16" />
  </>,
);
const StairsIcon = icon(
  <>
    <rect x="4" y="3.5" width="16" height="17" />
    <path d="M4 10h9" />
    <path d="M13 20v-3h3v-3h4" />
  </>,
);
const ShelvesIcon = icon(
  <>
    <rect x="5" y="3.5" width="14" height="17" />
    <path d="M5 9h14M5 14.5h14" />
  </>,
);
const AppliancesIcon = icon(
  <>
    <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
    <path d="M5 10h14M8 6.5h2M8 13v4" />
  </>,
);
const WardrobeIcon = icon(
  <>
    <rect x="5" y="3.5" width="14" height="17" rx="1" />
    <path d="M12 3.5v17M10 11v2M14 11v2" />
  </>,
);
const ShowerIcon = icon(
  <>
    <path d="M5 21V8a4 4 0 0 1 4-4h5" />
    <path d="M10 9h8a4 4 0 0 1-8 0z" />
    <path d="M12 15v2M14 15.5v2.5M16 15v2" />
  </>,
);
const SlatsIcon = icon(
  <>
    <rect x="4" y="3.5" width="16" height="17" />
    <path d="M8 3.5v17M12 3.5v17M16 3.5v17" />
  </>,
);
const FloorIcon = icon(
  <>
    <path d="M3 8l9-4 9 4-9 4z" />
    <path d="M3 12l9 4 9-4" />
    <path d="M3 16l9 4 9-4" />
  </>,
);
const BedIcon = icon(
  <>
    <path d="M3 18v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" />
    <path d="M3 15h18" />
    <path d="M6 8V6.5A1.5 1.5 0 0 1 7.5 5h9A1.5 1.5 0 0 1 18 6.5V8" />
    <path d="M3 18v1.5M21 18v1.5" />
  </>,
);

/* ═════════ UNIT DATA ═════════ */
type Room = { id: string; group: string; title: string; text: string; src: string; alt: string };
type Stat = { n?: number; text?: string; label: string };
type Feature = { Icon: IconType; title: string; text: string };

type Unit = {
  metaTitle: string;
  metaDescription: string;
  /* hero */
  kicker: string;
  h1: [string, string];
  intro: string;
  tag: string;
  price: string;
  heroSrc: string;
  heroAlt: string;
  tourLabel: string;
  stats: Stat[];
  /* features */
  featuresTitle: string;
  featuresSub: string;
  featuresText: string;
  ledger: { label: string; value: string }[];
  features: Feature[];
  /* book */
  bookTitle: string;
  rooms: Room[];
  chapters: { range: string; label: string }[];
  /* map: each unit has its own property pin, so the rings are set per unit.
     x / y = where each ring sits on the map image, in %. They are estimates, nudge if a ring looks slightly off.
     Syntagma Square is on the brochure list but not on the map, so it has no ring. */
  mapSrc: string;
  mapAlt: string;
  mapAspect: string;
  homeName: string;
  pins: Record<string, [number, number]>;
  /* closing card */
  ctaHeading: string;
  ctaText: string;
};

/* ───── 45 m² Kozanis Loft ───── */
const kozanis45: Unit = {
  metaTitle: "Loft Apartment in Votanikos, Athens | Aurevon Global Partners",
  metaDescription:
    "A 45 m² loft apartment in Votanikos, Athens, with a steel-framed glass mezzanine. 1 bedroom, 1 bathroom, €265,000. 2 to 4 minutes on foot to Kerameikos metro station.",
  kicker: "Votanikos, Athens",
  h1: ["Kozanis", "Loft"],
  intro:
    "A 45 m² loft apartment with a steel-framed glass mezzanine, 1 bedroom and 1 bathroom, in the heart of Votanikos, 2 to 4 minutes on foot from Kerameikos metro station.",
  /* the brochure does not mention the Golden Visa; add it here if it applies */
  tag: "Mezzanine loft",
  price: "€265,000",
  heroSrc: img("votanikos-cover"),
  heroAlt:
    "Kozanis Loft Apartment in Votanikos: a double-height space with a steel-framed glass mezzanine, a timber and black staircase and a marble kitchen counter. 45 m², €265,000, 1 bedroom, 1 bathroom.",
  tourLabel: "Tour the loft",
  stats: [
    { n: 45, label: "m² of living space" },
    { n: 1, label: "Bedroom" },
    { n: 1, label: "Bathroom" },
    { text: "€265,000", label: "Asking price" },
  ],
  featuresTitle: "A loft under glass.",
  featuresSub: "One loft apartment",
  featuresText:
    "Double-height living, a steel-framed glass mezzanine and a clean, contemporary finish, in a central Athens neighbourhood on the rise.",
  ledger: [
    { label: "Interior", value: "45 m²" },
    { label: "Bedroom", value: "1" },
    { label: "Bathroom", value: "1" },
    { label: "Layout", value: "Loft with mezzanine" },
    { label: "To Kerameikos Metro", value: "2–4 min on foot" },
    { label: "Asking price", value: "€265,000" },
  ],
  /* only what is visible in the brochure images; add anything else the brochure lists */
  features: [
    {
      Icon: GlassIcon,
      title: "Steel-framed glass mezzanine",
      text: "A black steel and glass partition encloses the mezzanine and keeps the double-height space open and bright.",
    },
    {
      Icon: StairsIcon,
      title: "Timber and black staircase",
      text: "Open stairs with timber treads and black risers, lit by a concealed LED strip along the wall.",
    },
    {
      Icon: ShelvesIcon,
      title: "Built-in wall unit",
      text: "A full-height unit with open shelving, a slatted panel and a media niche, finished in white and charcoal.",
    },
    {
      Icon: AppliancesIcon,
      title: "Black veined kitchen",
      text: "White handled cabinetry against a black veined splashback, with a built-in hob, a steel sink and a breakfast counter.",
    },
    {
      Icon: WardrobeIcon,
      title: "Mezzanine wardrobes",
      text: "Built-in white wardrobes with warm LED lighting at floor level, beside a slatted balustrade.",
    },
    {
      Icon: ShowerIcon,
      title: "Walk-in shower bathroom",
      text: "A frameless glass shower with rain head and niche, a timber vanity with a vessel basin and a wall-hung toilet.",
    },
  ],
  bookTitle: "Walk through the loft.",
  rooms: [
    {
      id: "living-1",
      group: "Living",
      title: "Living and mezzanine",
      text: "A double-height living space under a steel-framed glass mezzanine, with the stairs and a full-height wall unit.",
      src: img("votanikos-living-1"),
      alt: "Living area with a steel-framed glass mezzanine, a timber and black staircase and a wall unit",
    },
    {
      id: "living-3",
      group: "Living",
      title: "Towards the kitchen",
      text: "The glass mezzanine above, the stairs to the right and a breakfast counter marking the kitchen.",
      src: img("votanikos-living-3"),
      alt: "View towards the kitchen with the glass mezzanine above, the stairs and a breakfast counter",
    },
    {
      id: "living-2",
      group: "Living",
      title: "The wall unit",
      text: "Open shelving, a slatted charcoal panel and a media niche, with the stairs rising beside it.",
      src: img("votanikos-living-2"),
      alt: "Full-height wall unit with open shelves and a slatted panel, with the stairs on the left",
    },
    {
      id: "kitchen",
      group: "Kitchen & entrance",
      title: "The kitchen",
      text: "A corner kitchen with white cabinetry, a black veined splashback and worktop, a built-in hob and a steel sink.",
      src: img("votanikos-kitchen"),
      alt: "Corner kitchen with white cabinets, a black veined splashback, a hob and a steel sink",
    },
    {
      id: "entrance",
      group: "Kitchen & entrance",
      title: "The entrance",
      text: "A tall entrance hall with a high window, a black-framed interior window and timber flooring.",
      src: img("votanikos-entrance"),
      alt: "Entrance with the front door open, a high window and a black-framed interior window",
    },
    {
      id: "mezzanine",
      group: "Mezzanine & bath",
      title: "The mezzanine",
      text: "Built-in wardrobes with warm LED lighting at floor level, beside the slatted balustrade over the stairs.",
      src: img("votanikos-mezzanine"),
      alt: "Mezzanine with built-in white wardrobes lit by LED strips and a slatted balustrade",
    },
    {
      id: "bathroom",
      group: "Mezzanine & bath",
      title: "The bathroom",
      text: "A frameless glass walk-in shower with a rain head, a timber vanity with a vessel basin and a wall-hung toilet.",
      src: img("votanikos-bathroom"),
      alt: "Bathroom with a glass walk-in shower, a timber vanity with a vessel basin and a wall-hung toilet",
    },
  ],
  chapters: [
    { range: "I – III", label: "Living" },
    { range: "IV – V", label: "Kitchen & entrance" },
    { range: "VI – VII", label: "Mezzanine & bath" },
  ],
  mapSrc: img("votanikos-map"),
  mapAlt:
    "Aerial map of Votanikos showing the loft and nearby metro stations, cultural sites and the university, with travel times",
  mapAspect: "aspect-[423/372]",
  homeName: "The loft",
  pins: {
    home: [29, 62.5],
    "kerameikos-metro": [44, 60.5],
    eleonas: [9, 41],
    agricultural: [21.5, 78.5],
    technopolis: [33, 39.5],
    "kerameikos-site": [73, 49],
    monastiraki: [82.5, 30.5],
    agora: [56.5, 25.5],
    acropolis: [80.5, 6],
  },
  ctaHeading: "Interested in the Kozanis Loft?",
  ctaText:
    "A 45 m² loft with a steel-framed glass mezzanine, 1 bedroom and 1 bathroom in Votanikos, 2 to 4 minutes on foot from Kerameikos metro station. Contact us to arrange a viewing.",
};

/* ───── 68 m² Agias Markellas apartment ───── */
const markellas68: Unit = {
  metaTitle:
    "Apartment in Votanikos, Athens, 68 m² Fully Furnished | Aurevon Global Partners",
  metaDescription:
    "A fully furnished 68 m² apartment with a mezzanine in Votanikos, Athens. 2 bedrooms, 1 bathroom, €320,000. 2 to 4 minutes on foot to Kerameikos metro station.",
  kicker: "Agias Markellas, Votanikos",
  h1: ["Markellas", "Apartment"],
  intro:
    "A fully furnished 68 m² apartment with a timber-clad mezzanine, 2 bedrooms and 1 bathroom, in the heart of Votanikos, 2 to 4 minutes on foot from Kerameikos metro station.",
  /* the brochure does not mention the Golden Visa; add it here if it applies */
  tag: "Fully furnished",
  price: "€320,000",
  heroSrc: img("votanikos-markellas-cover"),
  heroAlt:
    "Agias Markellas Apartment in Votanikos: a mezzanine with a white slatted balustrade above an open kitchen with an island, and a floating timber staircase. 68 m², €320,000, 2 bedrooms, 1 bathroom, fully furnished.",
  tourLabel: "Tour the apartment",
  stats: [
    { n: 68, label: "m² of living space" },
    { n: 2, label: "Bedrooms" },
    { n: 1, label: "Bathroom" },
    { text: "€320,000", label: "Asking price" },
  ],
  featuresTitle: "Warm timber, white walls.",
  featuresSub: "One furnished apartment",
  featuresText:
    "A mezzanine apartment finished in warm timber-effect flooring and white walls, fully furnished and ready to live in, in a central Athens neighbourhood on the rise.",
  ledger: [
    { label: "Interior", value: "68 m²" },
    { label: "Bedrooms", value: "2" },
    { label: "Bathroom", value: "1" },
    { label: "Furnishing", value: "Fully furnished" },
    { label: "To Kerameikos Metro", value: "2–4 min on foot" },
    { label: "Asking price", value: "€320,000" },
  ],
  /* only what is visible in the brochure images; add anything else the brochure lists */
  features: [
    {
      Icon: SlatsIcon,
      title: "Timber-clad mezzanine",
      text: "A timber-clad edge and a white slatted balustrade enclose the upper level, with a circular light above.",
    },
    {
      Icon: StairsIcon,
      title: "Floating timber staircase",
      text: "Open timber treads climb the wall without risers, lit by a concealed LED strip.",
    },
    {
      Icon: AppliancesIcon,
      title: "Kitchen with an island",
      text: "White upper cabinets over walnut-effect units, a steel sink, a stainless fridge-freezer and a dark-topped island.",
    },
    {
      Icon: FloorIcon,
      title: "Timber-effect flooring",
      text: "Warm timber-effect flooring runs through the living area and the bedroom.",
    },
    {
      Icon: BedIcon,
      title: "The bedroom",
      text: "A double bed with a button-tufted upholstered headboard, bedside tables and a long timber shelf unit, under recessed spotlights.",
    },
    {
      Icon: ShowerIcon,
      title: "Marble-effect bathroom",
      text: "A walk-in shower with sliding glass doors, a rain head and a timber-lined niche, plus a wall-hung toilet and a timber vanity.",
    },
  ],
  bookTitle: "Walk through the apartment.",
  rooms: [
    {
      id: "living",
      group: "Living",
      title: "Living and mezzanine",
      text: "The kitchen island, a sofa alcove and the floating staircase, beneath a timber-clad mezzanine.",
      src: img("votanikos-markellas-interior-1"),
      alt: "Open kitchen with an island, a sofa alcove and a floating staircase beneath a timber-clad mezzanine",
    },
    {
      id: "stairs",
      group: "Living",
      title: "The staircase",
      text: "A floating timber staircase lit by a concealed LED strip, with a TV unit beneath it.",
      src: img("votanikos-markellas-interior-3"),
      alt: "Floating timber staircase with an LED strip above a white and oak TV unit",
    },
    {
      id: "kitchen",
      group: "Kitchen",
      title: "The kitchen",
      text: "White upper cabinets, walnut-effect drawers, a steel sink and a stainless fridge-freezer.",
      src: img("votanikos-markellas-interior-4"),
      alt: "Kitchen corner with white cabinets, walnut-effect drawers, a steel sink and a stainless fridge-freezer",
    },
    {
      id: "bedroom",
      group: "Bedroom",
      title: "The bedroom",
      text: "A double bed with a button-tufted headboard, bedside tables and a long timber shelf unit by the window.",
      src: img("votanikos-markellas-interior-2"),
      alt: "Bedroom with a button-tufted headboard, bedside tables and a timber shelf unit",
    },
    {
      id: "shower",
      group: "Bathroom",
      title: "The shower",
      text: "A marble-effect walk-in shower with sliding glass doors, a rain head and a timber-lined niche.",
      src: img("votanikos-markellas-interior-5"),
      alt: "Marble-effect walk-in shower with sliding glass doors and a timber-lined niche",
    },
    {
      id: "wc",
      group: "Bathroom",
      title: "The toilet",
      text: "A wall-hung toilet beside the shower, under a frosted window with a dark frame.",
      src: img("votanikos-markellas-interior-6"),
      alt: "Wall-hung toilet with marble-effect tiles and a frosted window with a dark frame",
    },
  ],
  chapters: [
    { range: "I – II", label: "Living" },
    { range: "III", label: "Kitchen" },
    { range: "IV", label: "Bedroom" },
    { range: "V – VI", label: "Bathroom" },
  ],
  mapSrc: img("votanikos-markellas-map"),
  mapAlt:
    "Aerial map of Votanikos showing the apartment and nearby metro stations, cultural sites and the university, with travel times",
  mapAspect: "aspect-[421/340]",
  homeName: "The apartment",
  pins: {
    home: [28, 68],
    "kerameikos-metro": [43, 66],
    eleonas: [7, 44],
    agricultural: [21, 86],
    technopolis: [31, 43],
    "kerameikos-site": [72, 54],
    monastiraki: [81, 35],
    agora: [55, 26],
    acropolis: [79, 6],
  },
  ctaHeading: "Interested in the Agias Markellas Apartment?",
  ctaText:
    "A fully furnished 68 m² apartment with a timber-clad mezzanine, 2 bedrooms and 1 bathroom in Votanikos, 2 to 4 minutes on foot from Kerameikos metro station. Contact us to arrange a viewing.",
};

/* EDIT HERE: every Votanikos apartment. The key is the URL slug. */
const units: Record<string, Unit> = {
  "kozanis-45": kozanis45,
  "agias-markellas-68": markellas68,
};

/* ═════════ SHARED VOTANIKOS CONTENT (same for every unit) ═════════ */
type Place = {
  id: string;
  name: string;
  time: string;
  group: "foot" | "metro";
};

const places: Place[] = [
  { id: "kerameikos-metro", name: "Kerameikos Metro Station (Line 3)", time: "2–4 min", group: "foot" },
  { id: "eleonas", name: "Eleonas Metro Station (Line 3)", time: "5 min", group: "foot" },
  { id: "agricultural", name: "Agricultural University of Athens", time: "6 min", group: "foot" },
  { id: "technopolis", name: "Technopolis City of Athens (Gazi)", time: "10 min", group: "foot" },
  { id: "kerameikos-site", name: "Kerameikos Archaeological Site", time: "10 min", group: "foot" },
  { id: "monastiraki", name: "Monastiraki", time: "5 min", group: "metro" },
  { id: "agora", name: "Ancient Agora of Athens", time: "8 min", group: "metro" },
  { id: "acropolis", name: "Acropolis of Athens", time: "10 min", group: "metro" },
  { id: "syntagma", name: "Syntagma Square", time: "10 min", group: "metro" },
];

const groups: { key: "foot" | "metro"; label: string }[] = [
  { key: "foot", label: "On foot" },
  { key: "metro", label: "By metro" },
];

/* ───────── Neighbourhood copy (tabs) ───────── */
const neighbourhood: { label: string; text: string }[] = [
  {
    label: "A district in transformation",
    text: "Votanikos is a central Athens neighbourhood undergoing gradual change, with new contemporary developments appearing alongside its established urban fabric. Its strategic location, distinctive character and proximity to key cultural districts make it an area of increasing interest.",
  },
  {
    label: "Culture and city life within easy reach",
    text: "Votanikos is surrounded by some of Athens' most dynamic cultural and lifestyle destinations, including Technopolis, Gazi, Kerameikos and the historic centre. From contemporary art and live events to dining, nightlife and heritage sites, the area offers a rich and diverse urban experience.",
  },
  {
    label: "Urban life, Athenian character",
    text: "Votanikos offers a distinctly urban side of Athens, where traditional city blocks, contemporary interventions and traces of the area's industrial past create a neighbourhood with a character of its own. Its proximity to established cultural and lifestyle districts places residents within easy reach of the energy of central Athens.",
  },
];

const convenience: { label: string; text: string }[] = [
  {
    label: "Shopping and everyday services",
    text: "Access to local stores, supermarkets and essential services.",
  },
  {
    label: "Dining and entertainment",
    text: "Close connections to the restaurants, cafés and nightlife of Gazi and surrounding districts.",
  },
  {
    label: "Culture and creativity",
    text: "Proximity to cultural venues and creative spaces across the wider Kerameikos and Gazi area.",
  },
  {
    label: "Education",
    text: "Convenient access to educational institutions, including the Agricultural University of Athens.",
  },
];

const connected: { label: string; text: string }[] = [
  { label: "Eleonas Metro", text: "Direct connection to the wider city." },
  { label: "Kerameikos Metro", text: "Access to the historic centre and cultural districts." },
  { label: "Gazi", text: "Dining, entertainment and nightlife." },
  { label: "Monastiraki", text: "Historic character, shopping and city life." },
  { label: "Athens city centre", text: "Culture, shopping and city life." },
  { label: "Athens International Airport", text: "Direct access via the metro and main road network." },
];

const neighbourhoodGroups = [
  { id: "neighbourhood", tab: "The neighbourhood", items: neighbourhood },
  { id: "convenience", tab: "Everyday convenience", items: convenience },
  { id: "connected", tab: "Connected to Athens", items: connected },
];

/* ───────── Shared pieces ───────── */
const Tag = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-md ${className}`}
  >
    {children}
  </span>
);

function Title({
  title,
  sub,
  dark = false,
  center = false,
}: {
  title: string;
  sub?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2
        className={`font-serif text-3xl font-bold uppercase leading-[1.1] tracking-tight md:text-5xl ${
          dark ? "text-white" : "text-(--navy)"
        }`}
      >
        <Words text={title} className="block" />
      </h2>
      {sub && (
        <p
          className={`mt-3 text-xs font-medium uppercase tracking-[0.25em] md:text-sm ${
            dark ? "text-(--gold-light)" : "text-(--navy)/70"
          }`}
        >
          {sub}
        </p>
      )}
      <span
        className={`mt-5 block h-0.5 w-16 bg-linear-to-r from-(--gold) to-(--gold-light) ${
          center ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}

/* Portrait photo in a thin "window frame": a fine inner line on the picture */
function WindowFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[557/785] overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ring-1 ring-(--gold-light)/60">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(min-width:1024px) 400px, 80vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 border border-(--gold-light)/50"
      />
    </div>
  );
}

/* one row of the place list */
const PlaceRow = ({ p }: { p: { id: string; name: string; time: string } }) => (
  <li
    data-place={p.id}
    tabIndex={0}
    className="group relative flex cursor-pointer items-baseline gap-3 border-b border-(--gold)/20 py-3 text-sm text-(--navy)/85 outline-none transition-all duration-300 hover:bg-(--gold)/10 hover:pl-4 hover:text-(--navy) focus:bg-(--gold)/10 focus:pl-4 focus:text-(--navy)"
  >
    <span
      aria-hidden
      className="absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 bg-(--gold) transition-all duration-300 group-hover:h-6 group-focus:h-6"
    />
    <span>{p.name}</span>
    <span
      aria-hidden
      className="min-w-4 flex-1 -translate-y-1 border-b border-dotted border-(--gold)/60 transition-colors group-hover:border-(--gold) group-focus:border-(--gold)"
    />
    <span className="whitespace-nowrap font-serif font-bold text-(--navy) transition-colors group-hover:text-(--gold-dark) group-focus:text-(--gold-dark)">
      {p.time}
    </span>
  </li>
);

/* Each hero layer sits at its own depth and answers to mouse + scroll via the vars set by HeroStage */
const layer = (
  mx: number,
  my: number,
  sy: number,
  z: number,
  ry: number,
): CSSProperties => ({
  transform: `translate3d(calc(var(--mx,0) * ${mx}px), calc(var(--my,0) * ${my}px + var(--sy,0) * ${sy}px), ${z}px) rotateY(calc(var(--mx,0) * ${ry}deg)) rotateX(calc(var(--sy,0) * 8deg))`,
  transition: "transform 350ms ease-out",
  willChange: "transform",
});

/* ═════════ ROUTE ═════════ */
export function generateStaticParams() {
  return Object.keys(units).map((unit) => ({ unit }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unit: string }>;
}) {
  const { unit } = await params;
  const u = units[unit];
  if (!u) return {};
  return { title: u.metaTitle, description: u.metaDescription };
}

export default async function VotanikosApartmentPage({
  params,
}: {
  params: Promise<{ unit: string }>;
}) {
  const { unit } = await params;
  const u = units[unit];
  if (!u) notFound();

  const home = { id: "home", name: u.homeName, time: "Your property" };

  /* hover / tap on a row shows the matching ring on the map (pure CSS) */
  const hoverCss = [home.id, ...places.map((p) => p.id)]
    .map(
      (id) =>
        `.loc-explorer:has([data-place=${id}]:is(:hover,:focus)) [data-pin=${id}]{opacity:1;scale:1}`,
    )
    .join("\n");

  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      <S3Styles />
      <ScrollBar />

      {/* ───────── HERO · dark navy, portrait photo right, stats built in ───────── */}
      <section className="relative overflow-hidden bg-(--navy-deep) text-white">
        <div aria-hidden className="absolute inset-0" style={glow("85% 20%", 0.35)} />
        <div aria-hidden className="absolute inset-0" style={glow("0% 100%", 0.18)} />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-16 pt-32 md:pt-40 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal3D variant="flipLeft">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-light)">
                {u.kicker}
              </p>
            </Reveal3D>
            <h1 className="mt-6 font-serif text-6xl font-bold uppercase leading-[0.98] tracking-tight text-white md:text-8xl">
              <Words text={u.h1[0]} className="block" />
              <Words
                text={u.h1[1]}
                className="block"
                delay={300}
                wordClass="bg-linear-to-b from-(--gold-light) to-(--gold) bg-clip-text text-transparent"
              />
            </h1>
            <Reveal3D variant="rise" delay={500}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/80">{u.intro}</p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Tag>{u.tag}</Tag>
                <span className="font-serif text-2xl text-(--gold-light)">{u.price}</span>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-linear-to-b from-(--gold-light) to-(--gold) px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110"
                >
                  Arrange a viewing
                </Link>
                <a
                  href="#rooms"
                  className="border border-white/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:border-(--gold-light) hover:text-(--gold-light)"
                >
                  {u.tourLabel}
                </a>
              </div>
            </Reveal3D>
          </div>

          <HeroStage className="relative flex justify-center lg:col-span-5">
            <div className="relative w-[min(80%,22rem)] lg:w-full lg:max-w-[24rem]">
              <div
                aria-hidden
                style={layer(-12, -6, -25, 0, 4)}
                className="absolute inset-0 translate-x-4 translate-y-4 border border-(--gold-light)/60"
              />
              <div style={layer(8, -10, -60, 60, 5)} className="relative">
                <Reveal3D variant="zoom" delay={300} duration={1300}>
                  <WindowFrame src={u.heroSrc} alt={u.heroAlt} />
                </Reveal3D>
              </div>
            </div>
          </HeroStage>
        </div>

        {/* stats */}
        <div className="relative mx-auto max-w-6xl px-6 pb-16">
          <Reveal3D variant="rise">
            <dl className="grid grid-cols-2 border-y border-(--gold-light)/30 md:grid-cols-4">
              {u.stats.map((s) => (
                <div
                  key={s.label}
                  className="border-(--gold-light)/25 px-4 py-7 text-center even:border-l md:border-l md:px-6 md:first:border-l-0"
                >
                  <dd className="font-serif text-4xl font-bold text-(--gold-light) md:text-5xl">
                    {s.n !== undefined ? <Counter to={s.n} /> : s.text}
                  </dd>
                  <dt className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/70 md:text-[11px]">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal3D>
        </div>
        <Panes className="relative opacity-70" color="%23e2b862" />
      </section>

      {/* ───────── PROPERTY FEATURES · cream, title + ledger left, numbered rows right ───────── */}
      <section className="relative bg-(--cream)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
                Property features
              </p>
              <Title title={u.featuresTitle} sub={u.featuresSub} />
              <Reveal3D variant="flipLeft" delay={150}>
                <p className="mt-8 max-w-sm text-sm leading-relaxed text-(--navy)/75">
                  {u.featuresText}
                </p>
                <dl className="mt-8 border-t border-(--gold)/40">
                  {u.ledger.map((r) => (
                    <div
                      key={r.label}
                      className="flex items-baseline justify-between gap-6 border-b border-(--gold)/20 py-4"
                    >
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.3em] text-(--navy)/60">
                        {r.label}
                      </dt>
                      <dd className="text-right font-serif text-xl font-bold text-(--navy)">
                        {r.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal3D>
            </div>

            <div className="lg:col-span-7">
              <ol className="border-t border-(--gold)/40">
                {u.features.map(({ Icon, title, text }, i) => (
                  <li key={title} className="border-b border-(--gold)/25">
                    <Reveal3D variant="rise" delay={i * 90}>
                      <div className="grid grid-cols-[2.5rem_1fr_auto] items-start gap-4 py-6 md:gap-6">
                        <span className="font-serif text-xl font-bold text-(--gold)">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-serif text-xl font-bold text-(--navy)">{title}</h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-(--navy)/70">{text}</p>
                        </div>
                        <Icon className="h-8 w-8 text-(--gold-dark)" />
                      </div>
                    </Reveal3D>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── ROOMS · flipping book, window panes top and bottom ───────── */}
      <section
        id="rooms"
        className="relative scroll-mt-20 overflow-hidden bg-(--navy-deep) px-6 py-20 md:py-28"
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "radial-gradient(70% 38% at 50% 24%, rgba(29,125,181,0.55), transparent 72%)",
              "radial-gradient(75% 42% at 50% 62%, rgba(226,184,98,0.5), transparent 72%)",
            ].join(","),
          }}
        />
        <Panes className="absolute inset-x-0 top-0 opacity-60" color="%23e2b862" />
        <Panes className="absolute inset-x-0 bottom-0 opacity-60" color="%23e2b862" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Title
            title={u.bookTitle}
            sub={`Flip through ${count(u.rooms.length)} rooms`}
            dark
            center
          />

          {/* contents strip: as many columns as chapters */}
          <ul
            className="mx-auto mt-10 grid max-w-3xl divide-x divide-(--gold)/30 border-y border-(--gold)/30 text-center"
            style={{ gridTemplateColumns: `repeat(${u.chapters.length}, minmax(0, 1fr))` }}
          >
            {u.chapters.map((c) => (
              <li key={c.label} className="px-2 py-4">
                <span className="block font-serif text-xs tracking-[0.3em] text-(--gold-light)">
                  {c.range}
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-white/70">
                  {c.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <RoomBook pages={u.rooms} />
          </div>
        </div>
      </section>

      {/* ───────── LOCATION · cream, grouped list left + map right ───────── */}
      <section id="location" className="relative scroll-mt-20 bg-(--cream)">
        <Paper />
        <style dangerouslySetInnerHTML={{ __html: hoverCss }} />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="loc-explorer">
            <Title title="Votanikos, connected to the city." sub="Location and connectivity" center />

            <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:items-start">
              {/* list */}
              <div className="lg:col-span-5">
                <p className="max-w-sm text-sm leading-relaxed text-(--navy)/75">
                  Hover or tap a place to find it on the map. Times are approximate, from the
                  property.
                </p>
                <ul className="mt-6 border-t border-(--gold)/40">
                  <PlaceRow p={home} />
                </ul>
                {groups.map((g) => (
                  <div key={g.key} className="mt-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-(--gold-dark)">
                      {g.label}
                    </p>
                    <ul className="mt-3 border-t border-(--gold)/40">
                      {places
                        .filter((p) => p.group === g.key)
                        .map((p) => (
                          <PlaceRow key={p.id} p={p} />
                        ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* map */}
              <div className="lg:sticky lg:top-28 lg:col-span-7">
                <Reveal3D variant="zoom">
                  <Depth axis="y" rotate={-6} lift={70}>
                    <div className="relative">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-(--gold)/50 md:translate-x-5 md:translate-y-5"
                      />
                      <div
                        className={`relative ${u.mapAspect} w-full overflow-hidden bg-(--paper) shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] ring-1 ring-(--gold)/60`}
                      >
                        <Image
                          src={u.mapSrc}
                          alt={u.mapAlt}
                          fill
                          sizes="(min-width:1024px) 58vw, 95vw"
                          className="object-cover"
                        />
                        {Object.entries(u.pins).map(([id, [x, y]]) => (
                          <span
                            key={id}
                            data-pin={id}
                            aria-hidden
                            style={{ left: `${x}%`, top: `${y}%` }}
                            className="pointer-events-none absolute z-10 aspect-square w-[10%] -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full border-2 border-(--gold-light) opacity-0 transition duration-300"
                          >
                            <span className="absolute inset-0 animate-ping rounded-full bg-(--gold-light)/50" />
                          </span>
                        ))}
                      </div>
                    </div>
                  </Depth>
                </Reveal3D>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── DISCOVER VOTANIKOS · paper, intro + quote card, then tabs (shared) ───────── */}
      <section className="relative border-t border-(--gold)/30 bg-(--paper)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Title
                title="Discover Votanikos."
                sub="An evolving neighbourhood at the heart of modern Athens"
              />
              <Reveal3D variant="rise" delay={150}>
                <p className="mt-8 max-w-xl text-sm leading-relaxed text-(--navy)/75">
                  Located just west of Athens' historic centre, Votanikos is an evolving urban
                  neighbourhood shaped by its central position, distinctive architectural character
                  and connection to the wider city. Close to Kerameikos and Gazi, and some of
                  Athens' most important cultural districts, the area combines an authentic
                  metropolitan character with convenient access to everyday amenities,
                  entertainment and transport.
                </p>
                <p className="mt-8 border-t border-(--gold)/40 pt-6 font-serif text-xl italic leading-snug text-(--gold-dark) md:text-2xl">
                  Urban character. Central connectivity. A neighbourhood evolving.
                </p>
              </Reveal3D>
            </div>

            <Reveal3D variant="flipRight" className="lg:col-span-5">
              <div className="border-l-4 border-(--gold) bg-(--navy) p-8 text-white shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-(--gold-light)">
                  Athens in transformation
                </p>
                <p className="mt-4 font-serif text-2xl italic leading-snug md:text-3xl">
                  Central, connected and evolving. Votanikos represents a changing side of
                  contemporary Athens.
                </p>
              </div>
            </Reveal3D>
          </div>

          {/* interactive: neighbourhood, everyday convenience, connected to Athens */}
          <div className="mt-14 md:mt-20">
            <Reveal3D variant="rise">
              <NeighbourhoodTabs groups={neighbourhoodGroups} />
            </Reveal3D>
          </div>
        </div>
      </section>

      {/* ───────── CTA · navy, split card ───────── */}
      <section
        className="relative overflow-hidden bg-(--navy) px-6 pb-24 pt-20 text-white md:pb-32"
        style={glow("20% 0%", 0.3)}
      >
        <Panes className="absolute inset-x-0 top-0 opacity-60" color="%23e2b862" />
        <Depth rotate={10} lift={100}>
          <div className="relative mx-auto grid max-w-5xl border border-(--gold)/60 md:grid-cols-5">
            <div className="p-10 md:col-span-3 md:p-14">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-light)">
                Aurevon Global Partners
              </p>
              <h2 className="mt-5 font-serif text-3xl font-bold uppercase leading-tight md:text-4xl">
                <Words text={u.ctaHeading} className="block" />
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
                {u.ctaText}
              </p>
            </div>
            <div className="flex flex-col justify-center border-t border-(--gold)/40 bg-white/5 p-10 md:col-span-2 md:border-l md:border-t-0 md:p-14">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/60">
                Asking price
              </p>
              <p className="mt-2 font-serif text-5xl font-bold text-(--gold-light)">{u.price}</p>
              <div className="mt-4">
                <Tag>{u.tag}</Tag>
              </div>
              <Link
                href="/contact"
                className="mt-8 inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-8 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110"
              >
                Arrange a viewing
              </Link>
            </div>
          </div>
        </Depth>
      </section>
    </main>
  );
}