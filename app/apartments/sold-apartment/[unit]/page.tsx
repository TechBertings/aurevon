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
   ONE PAGE FOR EVERY SOLD APARTMENT
   File location: app/apartments/sold-apartment/[unit]/page.tsx
   URLs: /apartments/sold-apartment/<slug>   (slug = the keys of `units` below)
   Same layout as the Votanikos page: dark navy hero with the stats built in,
   window-pane dividers, numbered feature rows, map + grouped place list, and tabs.
   Every unit on this route is shown as SOLD (stamp on the photo, struck-through price,
   "Sold" in the stats and the closing card).
   To add another sold apartment: copy the `miaouli` entry in `units`, change the data,
   drop its images in public/images/.
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

/* Window-pane band: a row of small rectangles, like the panes of a window */
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

   60 m² MIAOULI
     piraeus-miaouli-cover.png     brochure page 1 photo (crop out the title, the price and the specs below it)
     piraeus-miaouli-1.png         kitchen render (open fridge, washing machine)
     piraeus-miaouli-2.png         living room, beige corner sofa and windows
     piraeus-miaouli-3.png         bedroom with the slat wall and TV
     piraeus-miaouli-4.png         bedroom, glossy wardrobe and window
     piraeus-miaouli-5.png         bathroom, marble
     piraeus-miaouli-map.png       the illustrated "Location" map only (no title, no distance list)

   145 m² PAGRATI EVMENOUS (in the order of the brochure)
     pagrati-evmenous-sold-cover.png    brochure cover, portrait (crop out the title, "Golden Visa Eligible" and the price/specs block)
     pagrati-evmenous-sold-1.png        living room, sculpted TV wall and the stairs
     pagrati-evmenous-sold-2.png        living area, grey sofa and coffee table, stairs and kitchen
     pagrati-evmenous-sold-3.png        living room towards the entrance door and the high windows
     pagrati-evmenous-sold-4.png        kitchen, sage-green cabinets and the timber breakfast bar
     pagrati-evmenous-sold-5.png        bedroom with the panelled headboard and the white wardrobes
     pagrati-evmenous-sold-6.png        second bedroom, double bed and lit wall niches
     pagrati-evmenous-sold-7.png        bathroom, glass shower and timber vanity
     pagrati-evmenous-sold-8.png        bathroom, vessel basin and wall-hung toilet
     pagrati-evmenous-sold-9.png        basement, row of high windows
     pagrati-evmenous-sold-10.png       basement, towards the door
     pagrati-evmenous-sold-map.png      the location map only (crop off the "Location" title)

   95 m² KALLITHEA MENELAOU (in the order of the brochure)
     kallithea-menelaou-cover.png  brochure cover, portrait (crop out the title, "Golden Visa Eligible" and the price/specs block)
     kallithea-menelaou-1.png      living room, grey corner sofa, armchair and the framed print
     kallithea-menelaou-2.png      kitchen with the breakfast bar and the glass dining table
     kallithea-menelaou-3.png      view from the staircase: kitchen, dining table and living area
     kallithea-menelaou-4.png      dining table beneath the steel staircase, glazed entrance beyond
     kallithea-menelaou-5.png      bedroom with the timber bed and the long low window
     kallithea-menelaou-6.png      bedroom with the dark headboard and the wardrobes
     kallithea-menelaou-7.png      bedroom, grey button-tufted headboard and sliding wardrobes (portrait)
     kallithea-menelaou-8.png      round timber dining table under the pendant light (portrait)
     kallithea-menelaou-map.png    the "Nea Smyrni Premier Location Map" only (crop off the "Location" title)
   (The two brochure pages with the Stavros Niarchos Center and the Kallithea skyline are used as text only.)
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

const SlatsIcon = icon(
  <>
    <rect x="4" y="3.5" width="16" height="17" />
    <path d="M8 3.5v17M12 3.5v17M16 3.5v17" />
  </>,
);
const SunIcon = icon(
  <>
    <circle cx="12" cy="12" r="3.5" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6L7 7M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
  </>,
);
const AppliancesIcon = icon(
  <>
    <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
    <path d="M5 10h14M8 6.5h2M8 13v4" />
  </>,
);
const SofaIcon = icon(
  <>
    <path d="M5 11V8.5A1.5 1.5 0 0 1 6.5 7h11A1.5 1.5 0 0 1 18 8.5V11" />
    <path d="M3 13a2 2 0 0 1 4 0v1h10v-1a2 2 0 0 1 4 0v4H3z" />
    <path d="M6 17v2M18 17v2" />
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
const NicheIcon = icon(
  <>
    <rect x="3.5" y="4.5" width="17" height="15" />
    <rect x="7" y="8" width="10" height="8" />
  </>,
);
const BoxIcon = icon(
  <>
    <path d="M3.5 8L12 4l8.5 4v9L12 21l-8.5-4z" />
    <path d="M3.5 8L12 12l8.5-4M12 12v9" />
  </>,
);
const AnchorIcon = icon(
  <>
    <circle cx="12" cy="5.5" r="2" />
    <path d="M12 7.5V20M8 11h8" />
    <path d="M4 14a8 8 0 0 0 16 0" />
  </>,
);
const TrainIcon = icon(
  <>
    <rect x="6" y="3.5" width="12" height="13" rx="3" />
    <path d="M6 11h12M9 20l1.5-3.5M15 20l-1.5-3.5" />
    <circle cx="9.5" cy="13.7" r=".6" />
    <circle cx="14.5" cy="13.7" r=".6" />
  </>,
);

/* ═════════ MIAOULI LOCATION AND NEIGHBOURHOOD CONTENT (Piraeus) ═════════ */
type Place = {
  id: string;
  name: string;
  note: string;
  group: string;
};

/* The brochure gives travel times only for the four "by car" places; the map places are described instead.
   Places without an entry in the unit's `pins` (the "by car" ones) show no ring on the map. */
const miaouliPlaces: Place[] = [
  { id: "zeas", name: "Marina Zeas", note: "Yacht club", group: "waterfront" },
  { id: "pasalimani", name: "Pasalimani", note: "Yacht basin and promenade", group: "waterfront" },
  { id: "freatida", name: "Freatida Beach", note: "Swimming cove", group: "waterfront" },
  { id: "votsalakia", name: "Votsalakia Beach", note: "Recreation area", group: "waterfront" },
  { id: "port", name: "Piraeus Port", note: "Ferries and connections", group: "culture" },
  { id: "museum", name: "Archaeological Museum", note: "Classical artefacts", group: "culture" },
  { id: "maritime", name: "Hellenic Maritime Museum", note: "Maritime heritage", group: "culture" },
  { id: "theatre", name: "Veakio Theatre", note: "Open-air performances", group: "culture" },
  { id: "syntagma", name: "Athens city centre (Syntagma)", note: "≈ 20 min", group: "drive" },
  { id: "acropolis", name: "Acropolis of Athens", note: "≈ 20 min", group: "drive" },
  { id: "university", name: "University of Piraeus", note: "≈ 15 min", group: "drive" },
  { id: "airport", name: "Athens International Airport", note: "≈ 45 min", group: "drive" },
];

const miaouliGroups: { key: string; label: string }[] = [
  { key: "waterfront", label: "On the waterfront" },
  { key: "culture", label: "Port and culture" },
  { key: "drive", label: "By car" },
];

/* ───────── Neighbourhood copy (tabs) ───────── */
const overview: { label: string; text: string }[] = [
  {
    label: "More than Europe's largest passenger port",
    text: "Piraeus is one of Athens' most dynamic and strategic neighbourhoods, set on the Saronic Gulf with a mix of urban convenience, coastal charm and strong investment potential.",
  },
  {
    label: "Transport and the sea",
    text: "Metro and tram connections reach the city centre and the airport, and constant ferry access links the port to the islands. Recent years brought modern marinas and upgraded public spaces.",
  },
  {
    label: "Year-round demand",
    text: "For residential investment, vacation rentals or mixed-use projects, Piraeus offers year-round demand, strong rental yields and a rich mix of local culture and global connectivity.",
  },
];

const discover: { label: string; text: string }[] = [
  {
    label: "Municipal Theatre of Piraeus",
    text: "One of the city's most iconic architectural and cultural landmarks. This beautifully restored neoclassical building hosts performances, concerts and cultural events throughout the year, and has contributed to the revitalisation of the city centre.",
  },
  {
    label: "Mikrolimano",
    text: "One of the most charming coastal areas of Piraeus, known for its scenic harbour and relaxed seaside atmosphere. Famous for high-quality restaurants, cafés and leisure spots, it is popular day and night.",
  },
];

const whyPiraeus: { label: string; text: string }[] = [
  { label: "Europe's largest passenger port", text: "A working harbour with cruise terminals and constant ferry links to the islands." },
  { label: "Metro and tram", text: "Direct connections to the city centre and the airport." },
  { label: "Marinas and seafront", text: "Modern marinas and upgraded public spaces along the Saronic Gulf." },
  { label: "Culture", text: "A restored neoclassical theatre hosting concerts and events all year." },
  { label: "Hospitality", text: "Growing interest from global hospitality and cruise brands." },
  { label: "Rental demand", text: "Year-round demand and strong rental yields for long-term and vacation lets." },
];

const miaouliTabs = [
  { id: "neighbourhood", tab: "The neighbourhood", items: overview },
  { id: "discover", tab: "Discover Piraeus", items: discover },
  { id: "why", tab: "Why Piraeus", items: whyPiraeus },
];

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
  price: string; /* the old asking price, shown struck through */
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
  /* map: x / y = where each ring sits on the map image, in %. They are estimates, nudge if a ring looks slightly off.
     Places without a pin (the drive times) simply show no ring. */
  mapSrc: string;
  mapAlt: string;
  mapAspect: string;
  homeName: string;
  homeNote: string;
  pins: Record<string, [number, number]>;
  /* location list + tabs + discover copy (per unit, because each apartment has its own neighbourhood) */
  places: Place[];
  groups: { key: string; label: string }[];
  locationTitle: string;
  locationIntro: string;
  tabGroups: { id: string; tab: string; items: { label: string; text: string }[] }[];
  discoverTitle: string;
  discoverSub: string;
  discoverText: string;
  discoverQuote: string;
  discoverCardLabel: string;
  discoverCardText: string;
  /* closing card */
  ctaHeading: string;
  ctaText: string;
};

/* ───── 60 m² Miaouli, 2nd floor ───── */
const miaouli: Unit = {
  metaTitle: "SOLD: Miaouli Apartment in Piraeus, 60 m² | Aurevon Global Partners",
  metaDescription:
    "Sold. A 60 m² 2nd floor apartment in Piraeus, Athens with 2 bedrooms and 1 bathroom, listed at €330,000. Golden Visa eligible.",
  kicker: "Piraeus, Athens",
  h1: ["Miaouli", "Apartment"],
  intro:
    "A 60 m² second floor apartment with 2 bedrooms and 1 bathroom, fully fitted and in the heart of Piraeus. This apartment has been sold.",
  price: "€330,000",
  heroSrc: img("piraeus-miaouli-cover"),
  heroAlt:
    "Miaouli Apartment in Piraeus: an open-plan kitchen and living area with a timber slat feature wall, a TV and a glowing LED ceiling edge. 60 m², 2 bedrooms, 1 bathroom.",
  tourLabel: "See the apartment",
  stats: [
    { n: 60, label: "m² of living space" },
    { n: 2, label: "Bedrooms" },
    { n: 1, label: "Bathroom" },
    { text: "Sold", label: "Status" },
  ],
  featuresTitle: "Warm timber, clean lines.",
  featuresSub: "One fitted apartment, now sold",
  featuresText:
    "A bright second floor apartment with an open kitchen and living area, two bedrooms and a marble bathroom, fitted with built-in appliances, in one of Athens’ most connected neighbourhoods.",
  ledger: [
    { label: "Interior", value: "60 m²" },
    { label: "Bedrooms", value: "2" },
    { label: "Bathroom", value: "1" },
    { label: "Level", value: "2nd floor" },
    { label: "Golden Visa", value: "Eligible" },
    { label: "Listed at", value: "€330,000" },
  ],
  /* only what is visible in the brochure photos and renders; add anything else the brochure lists */
  features: [
    {
      Icon: SlatsIcon,
      title: "Timber slat feature wall",
      text: "A full-height slatted timber panel carries the TV in the living area and runs on into the main bedroom.",
    },
    {
      Icon: SunIcon,
      title: "LED-lined ceiling edge",
      text: "A recessed ceiling edge with a soft LED glow lights the open-plan living area, with spotlights set into the ceiling.",
    },
    {
      Icon: AppliancesIcon,
      title: "Fitted kitchen with appliances",
      text: "Cream handleless cabinets over a timber splashback, with a fridge, oven, dishwasher, microwave and washing machine built in.",
    },
    {
      Icon: SofaIcon,
      title: "Open-plan living area",
      text: "A corner sofa and a glass coffee table sit under two tall windows, with air conditioning above.",
    },
    {
      Icon: WardrobeIcon,
      title: "Oak-effect floors and wardrobes",
      text: "Warm oak-effect flooring throughout, and full-height glossy wardrobes in the second bedroom.",
    },
    {
      Icon: ShowerIcon,
      title: "Marble bathroom",
      text: "Marble-effect walls and floor, a glass walk-in shower with a niche, a wall-hung toilet and a stone basin.",
    },
  ],
  bookTitle: "Walk through the apartment.",
  rooms: [
    {
      id: "kitchen",
      group: "Kitchen & living",
      title: "The kitchen",
      text: "Cream handleless cabinets, a timber splashback and a full set of built-in appliances along one wall.",
      src: img("piraeus-miaouli-1"),
      alt: "Fitted kitchen with cream cabinets, a timber splashback, a washing machine, oven and dishwasher",
    },
    {
      id: "living",
      group: "Kitchen & living",
      title: "The living room",
      text: "A corner sofa under two tall windows, with a glass coffee table and air conditioning.",
      src: img("piraeus-miaouli-2"),
      alt: "Living room with a beige corner sofa, a glass coffee table and two tall windows",
    },
    {
      id: "bedroom-1",
      group: "Bedrooms",
      title: "The main bedroom",
      text: "An upholstered headboard and a timber slat wall, with the TV on the wall opposite.",
      src: img("piraeus-miaouli-3"),
      alt: "Bedroom with an upholstered bed and a timber slat wall with a TV",
    },
    {
      id: "bedroom-2",
      group: "Bedrooms",
      title: "The second bedroom",
      text: "Full-height glossy wardrobes along one wall and a window onto the street.",
      src: img("piraeus-miaouli-4"),
      alt: "Bedroom with floor-to-ceiling glossy wardrobes and a window",
    },
    {
      id: "bathroom",
      group: "Bathroom",
      title: "The bathroom",
      text: "Marble-effect walls and floor, a glass walk-in shower, a wall-hung toilet and a stone basin.",
      src: img("piraeus-miaouli-5"),
      alt: "Marble bathroom with a glass shower, a wall-hung toilet and a stone basin",
    },
  ],
  chapters: [
    { range: "I – II", label: "Kitchen & living" },
    { range: "III – IV", label: "Bedrooms" },
    { range: "V", label: "Bathroom" },
  ],
  mapSrc: img("piraeus-miaouli-map"),
  mapAlt:
    "Illustrated map of the Piraeus waterfront showing the apartment, Pasalimani, Marina Zeas, Freatida Beach, the Veakio Theatre and the port",
  mapAspect: "aspect-square",
  homeName: "The apartment",
  pins: {
    home: [21, 29],
    port: [52, 12],
    museum: [37, 31],
    maritime: [17, 43],
    pasalimani: [54, 66],
    zeas: [28, 82],
    freatida: [17, 93],
    votsalakia: [75, 88],
    theatre: [82, 69],
  },
  homeNote: "Prime location",
  places: miaouliPlaces,
  groups: miaouliGroups,
  locationTitle: "Waterfront Piraeus, close to everything.",
  locationIntro:
    "Hover or tap a place to find it on the map. Drive times are approximate, from Piraeus.",
  tabGroups: miaouliTabs,
  discoverTitle: "Discover Piraeus.",
  discoverSub: "A historic port city at the heart of the Saronic Gulf",
  discoverText:
    "Piraeus is more than just the largest passenger port in Europe. Set on the Saronic Gulf, it combines urban convenience and coastal charm, with metro and tram connections to the city centre and the airport, constant ferry access to the islands, modern marinas and upgraded public spaces.",
  discoverQuote: "A historic port city with the coast, culture and connections to match.",
  discoverCardLabel: "Sea, culture and connections",
  discoverCardText:
    "Year-round demand, strong rental yields and a rich mix of local culture and global connectivity.",
  ctaHeading: "This apartment has been sold.",
  ctaText:
    "The 60 m² Miaouli apartment with 2 bedrooms and 1 bathroom has found its buyer. Get in touch and we will show you similar apartments in Piraeus.",
};

/* ───── 145 m² Pagrati Evmenous loft, with basement ───── */
const evmenousPlaces: Place[] = [
  { id: "kallimarmaro", name: "Kallimarmaro", note: "Historic stadium", group: "nearby" },
  { id: "park", name: "Alsos Loggiou Park", note: "Park", group: "nearby" },
  { id: "retail", name: "Pagrati Retail Hub", note: "High-street services", group: "nearby" },
  { id: "casa", name: "Casa Nostra Fresca", note: "Dining", group: "nearby" },
  { id: "pasta", name: "Pasta Pagrati", note: "Dining", group: "nearby" },
  { id: "acropolis", name: "Acropolis of Athens", note: "≈ 15 min by metro", group: "landmarks" },
  { id: "areopagus", name: "Areopagus Hill", note: "Hill", group: "landmarks" },
  { id: "zappeion", name: "Zappeion", note: "Landmark", group: "landmarks" },
  { id: "garden", name: "National Garden", note: "Park", group: "landmarks" },
  { id: "benaki", name: "Benaki Museum", note: "Museum", group: "landmarks" },
  { id: "olympian", name: "Olympian Zeus columns", note: "Ancient columns", group: "landmarks" },
  { id: "syntagma-metro", name: "Syntagma Metro", note: "Metro station", group: "metro" },
  { id: "evangelismos", name: "Evangelismos Metro", note: "Metro station", group: "metro" },
  { id: "syntagma-square", name: "Syntagma Square", note: "Square", group: "metro" },
  { id: "kolonaki", name: "Kolonaki", note: "Dining and shopping district", group: "metro" },
];

const evmenous145: Unit = {
  metaTitle: "SOLD: Pagrati Evmenous Loft Apartment, 145 m² | Aurevon Global Partners",
  metaDescription:
    "Sold. A 145 m² loft apartment with 2 bedrooms, 2 bathrooms and a basement with a storage room in Pagrati, Athens, listed at €420,000. Golden Visa eligible.",
  kicker: "Pagrati, Athens",
  h1: ["Evmenous", "Loft"],
  intro:
    "A 145 m² loft apartment with 2 bedrooms, 2 bathrooms and a basement with a storage room, in the heart of Pagrati. This apartment has been sold.",
  price: "€420,000",
  heroSrc: img("pagrati-evmenous-sold-cover"),
  heroAlt:
    "Pagrati Evmenous Loft Apartment: a double-height living room with a sculpted TV wall, a sage-green kitchen with a breakfast bar and a grey corner sofa. 145 m², 2 bedrooms, 2 bathrooms.",
  tourLabel: "See the loft",
  stats: [
    { n: 145, label: "m² of living space" },
    { n: 2, label: "Bedrooms" },
    { n: 2, label: "Bathrooms" },
    { text: "Sold", label: "Status" },
  ],
  featuresTitle: "A loft with room to spare.",
  featuresSub: "One loft apartment, now sold",
  featuresText:
    "Double-height living, a sage-green kitchen with a breakfast bar, two bedrooms, two bathrooms and a basement with a storage room, in a central Athens neighbourhood.",
  ledger: [
    { label: "Interior", value: "145 m²" },
    { label: "Bedrooms", value: "2" },
    { label: "Bathrooms", value: "2" },
    { label: "Basement", value: "With storage room" },
    { label: "Golden Visa", value: "Eligible" },
    { label: "Listed at", value: "€420,000" },
  ],
  /* only what is visible in the brochure photos; add anything else the brochure lists */
  features: [
    {
      Icon: GlassIcon,
      title: "Double-height living space",
      text: "A tall loft living room with a high ceiling, a row of clerestory windows above the entrance and warm oak-effect flooring.",
    },
    {
      Icon: StairsIcon,
      title: "Stone-effect staircase",
      text: "Stone-effect steps rise from the living area, with a sculpted white wall alongside.",
    },
    {
      Icon: NicheIcon,
      title: "Illuminated TV wall",
      text: "A white sculpted niche holds the TV, with a soft LED glow around the frame.",
    },
    {
      Icon: AppliancesIcon,
      title: "Sage-green kitchen and bar",
      text: "Sage-green cabinets with a marble-effect splashback, under-cabinet lighting, a built-in oven and a breakfast bar with stools.",
    },
    {
      Icon: WardrobeIcon,
      title: "Two bedrooms",
      text: "A bedroom with a panelled headboard and fitted white wardrobes, and a second with an upholstered headboard and softly lit wall niches.",
    },
    {
      Icon: ShowerIcon,
      title: "Two bathrooms",
      text: "Large-format stone-effect tiles, glass walk-in showers, a wall-hung toilet, a vessel basin and a timber vanity.",
    },
    {
      Icon: BoxIcon,
      title: "Basement with storage room",
      text: "A large tiled basement with a row of high windows, and a storage room.",
    },
  ],
  bookTitle: "Walk through the loft.",
  rooms: [
    {
      id: "living-1",
      group: "Living",
      title: "The living room",
      text: "A sculpted white TV wall with a soft LED glow, oak-effect flooring and the kitchen beyond.",
      src: img("pagrati-evmenous-sold-1"),
      alt: "Living room with a sculpted white TV wall, a stone-effect staircase and a green kitchen with a breakfast bar",
    },
    {
      id: "living-2",
      group: "Living",
      title: "Sofa, stairs and kitchen",
      text: "A grey sofa and a glass coffee table, with the staircase on the left and the kitchen bar behind.",
      src: img("pagrati-evmenous-sold-2"),
      alt: "Living area with a grey sofa, a glass coffee table, a staircase and a green kitchen",
    },
    {
      id: "living-3",
      group: "Living",
      title: "Towards the entrance",
      text: "A high ceiling with a row of clerestory windows over the entrance door, and a sofa along the wall.",
      src: img("pagrati-evmenous-sold-3"),
      alt: "Living room with a sofa, a coffee table, the entrance door and a row of high windows",
    },
    {
      id: "kitchen",
      group: "Kitchen",
      title: "The kitchen",
      text: "Sage-green cabinets, a marble-effect splashback with under-cabinet lighting, and a long timber breakfast bar.",
      src: img("pagrati-evmenous-sold-4"),
      alt: "Kitchen with sage-green cabinets, a marble-effect splashback and a long timber breakfast bar",
    },
    {
      id: "bedroom-1",
      group: "Bedrooms",
      title: "The first bedroom",
      text: "A panelled upholstered headboard, a softly lit wall niche and fitted white wardrobes.",
      src: img("pagrati-evmenous-sold-5"),
      alt: "Bedroom with a panelled headboard, a lit wall niche and white wardrobes",
    },
    {
      id: "bedroom-2",
      group: "Bedrooms",
      title: "The second bedroom",
      text: "A double bed with an upholstered headboard, lit wall niches and a ceiling light.",
      src: img("pagrati-evmenous-sold-6"),
      alt: "Bedroom with a double bed, an upholstered headboard and lit wall niches",
    },
    {
      id: "bath-1",
      group: "Bathrooms",
      title: "The first bathroom",
      text: "Stone-effect tiles, a glass walk-in shower with a heated towel rail and a timber vanity.",
      src: img("pagrati-evmenous-sold-7"),
      alt: "Bathroom with stone-effect tiles, a glass shower, a heated towel rail and a timber vanity",
    },
    {
      id: "bath-2",
      group: "Bathrooms",
      title: "The second bathroom",
      text: "A vessel basin on a stone-effect counter, a wall-hung toilet and a glass shower with a niche.",
      src: img("pagrati-evmenous-sold-8"),
      alt: "Bathroom with a vessel basin, a wall-hung toilet and a glass shower",
    },
    {
      id: "basement-1",
      group: "Basement",
      title: "The basement",
      text: "A large tiled room with a row of high windows along one wall.",
      src: img("pagrati-evmenous-sold-9"),
      alt: "Large basement room with grey tiled flooring and a row of high windows",
    },
    {
      id: "basement-2",
      group: "Basement",
      title: "The basement, the other way",
      text: "The same room seen towards the door, with a further room beyond.",
      src: img("pagrati-evmenous-sold-10"),
      alt: "Basement room with grey tiled flooring and a door at the far end",
    },
  ],
  chapters: [
    { range: "I – III", label: "Living" },
    { range: "IV", label: "Kitchen" },
    { range: "V – VI", label: "Bedrooms" },
    { range: "VII – VIII", label: "Bathrooms" },
    { range: "IX – X", label: "Basement" },
  ],
  mapSrc: img("pagrati-evmenous-sold-map"),
  mapAlt:
    "Aerial map of Pagrati and central Athens showing the property, the Acropolis, Syntagma Square, the National Garden, Kallimarmaro and nearby metro stations",
  mapAspect: "aspect-square",
  homeName: "The loft",
  homeNote: "On the map",
  /* x / y in % of the cropped map image; estimates from the brochure map, nudge if a ring looks off */
  pins: {
    home: [69, 73],
    kallimarmaro: [61, 41],
    park: [33, 64],
    retail: [90, 64],
    casa: [84, 40],
    pasta: [79, 47],
    acropolis: [12, 16],
    areopagus: [26, 10],
    zappeion: [48, 25],
    garden: [58, 23],
    benaki: [70, 21],
    olympian: [33, 29],
    "syntagma-metro": [61, 6],
    evangelismos: [94, 22],
    "syntagma-square": [48, 9],
    kolonaki: [88, 9],
  },
  places: evmenousPlaces,
  groups: [
    { key: "nearby", label: "Nearby" },
    { key: "landmarks", label: "Landmarks and museums" },
    { key: "metro", label: "Metro and districts" },
  ],
  locationTitle: "Pagrati, close to the heart of Athens.",
  locationIntro:
    "Hover or tap a place to find it on the map. The brochure gives the Acropolis as about 15 minutes by metro.",
  /* neighbourhood copy is written from the brochure map labels only; replace it with the brochure's own text if it has a neighbourhood page */
  tabGroups: [
    {
      id: "neighbourhood",
      tab: "The neighbourhood",
      items: [
        {
          label: "A central residential district",
          text: "Pagrati sits close to Kallimarmaro and the green space of Alsos Loggiou Park, a short way from Syntagma, Kolonaki and the National Garden.",
        },
        {
          label: "Everyday dining and services",
          text: "Casa Nostra Fresca and Pasta Pagrati are marked on the brochure map close by, and the Pagrati retail hub brings high-street services near the property.",
        },
      ],
    },
    {
      id: "landmarks",
      tab: "Landmarks",
      items: [
        {
          label: "The Acropolis and the old city",
          text: "The Acropolis of Athens and Areopagus Hill, about 15 minutes by metro.",
        },
        {
          label: "Gardens and museums",
          text: "Zappeion, the National Garden and the Benaki Museum are all on the map between the property and Syntagma.",
        },
        {
          label: "Ancient columns",
          text: "The Olympian Zeus columns stand just to the west of the neighbourhood.",
        },
      ],
    },
    {
      id: "connected",
      tab: "Connected to Athens",
      items: [
        { label: "Syntagma Metro", text: "A metro station at Syntagma Square, in the heart of the city." },
        { label: "Evangelismos Metro", text: "A second metro station on the map, beside Kolonaki." },
        { label: "Kolonaki", text: "A dining and shopping district." },
      ],
    },
  ],
  discoverTitle: "Discover Pagrati.",
  discoverSub: "A central Athens neighbourhood by the city's green heart",
  discoverText:
    "Pagrati is a central Athens neighbourhood a short way from Syntagma, Kolonaki and the National Garden, with Kallimarmaro and Alsos Loggiou Park nearby and the Acropolis about 15 minutes away by metro.",
  discoverQuote: "The Acropolis, the parks and the metro, all within reach.",
  discoverCardLabel: "Premium urban living",
  discoverCardText:
    "The Acropolis is about 15 minutes away by metro, with Syntagma and Evangelismos stations on the map.",
  ctaHeading: "This apartment has been sold.",
  ctaText:
    "The 145 m² Pagrati Evmenous loft with 2 bedrooms, 2 bathrooms and a basement with a storage room has found its buyer. Get in touch and we will show you similar apartments in Athens.",
};

/* ───── 95 m² Kallithea Menelaou loft ───── */
const kallitheaPlaces: Place[] = [
  { id: "alsos", name: "Alsos Nea Smyrni", note: "Urban park", group: "nearby" },
  { id: "doxis", name: "Doxis Park", note: "Boutique park", group: "nearby" },
  { id: "davaki", name: "Davaki Square", note: "Traditional square", group: "nearby" },
  { id: "hondos", name: "Hondos Center", note: "Premium retail", group: "nearby" },
  { id: "stadio", name: "Stadio Sris Lamprakis", note: "Stadium", group: "nearby" },
  { id: "marina", name: "Palaio Faliro Marina", note: "Marina and promenade", group: "sea" },
  { id: "eo", name: "e&o Pan-Asian Restaurant", note: "Fine dining", group: "sea" },
  { id: "snfcc", name: "Stavros Niarchos Cultural Center", note: "Opera, library and park", group: "sea" },
  { id: "transport", name: "Public transport network", note: "Syggrou Avenue", group: "city" },
  { id: "harokopio", name: "Harokopio University", note: "University", group: "city" },
  { id: "hilton", name: "Hilton Garden Inn Athens Syggrou", note: "Hotel", group: "city" },
  { id: "avenue", name: "Athens Avenue Hotel", note: "Hotel", group: "city" },
];

const kallithea95: Unit = {
  metaTitle: "SOLD: Kallithea Menelaou Loft Apartment, 95 m² | Aurevon Global Partners",
  metaDescription:
    "Sold. A 95 m² loft apartment with 2 bedrooms and 2 bathrooms in Kallithea, Athens, listed at €285,000. Golden Visa eligible.",
  kicker: "Kallithea, Athens",
  h1: ["Menelaou", "Loft"],
  intro:
    "A 95 m² loft apartment with 2 bedrooms and 2 bathrooms in Kallithea, between the city centre and the Athenian Riviera. This apartment has been sold.",
  price: "€285,000",
  heroSrc: img("kallithea-menelaou-cover"),
  heroAlt:
    "Kallithea Menelaou Loft Apartment: a living room with a grey corner sofa and armchair, a timber sideboard with LED underlight and a steel staircase beyond. 95 m², 2 bedrooms, 2 bathrooms.",
  tourLabel: "See the loft",
  stats: [
    { n: 95, label: "m² of living space" },
    { n: 2, label: "Bedrooms" },
    { n: 2, label: "Bathrooms" },
    { text: "Sold", label: "Status" },
  ],
  featuresTitle: "A loft with light.",
  featuresSub: "One loft apartment, now sold",
  featuresText:
    "A loft with a steel staircase, an open kitchen with a breakfast bar, tall windows and two bedrooms, in one of Athens’ best-connected districts.",
  ledger: [
    { label: "Interior", value: "95 m²" },
    { label: "Bedrooms", value: "2" },
    { label: "Bathrooms", value: "2" },
    { label: "Layout", value: "Loft with staircase" },
    { label: "Golden Visa", value: "Eligible" },
    { label: "Listed at", value: "€285,000" },
  ],
  /* only what is visible in the brochure photos; add anything else the brochure lists */
  features: [
    {
      Icon: StairsIcon,
      title: "Loft with a steel staircase",
      text: "A black steel staircase with a slim balustrade rises from the dining area, with soft lighting set into the steps.",
    },
    {
      Icon: GlassIcon,
      title: "Tall windows and a glass door",
      text: "Large windows and a glazed entrance door bring daylight deep into the living area.",
    },
    {
      Icon: AppliancesIcon,
      title: "Open kitchen with a breakfast bar",
      text: "Light cabinets, a marble-effect splashback and a timber worktop, with a built-in oven, a hob and a black fridge-freezer.",
    },
    {
      Icon: SofaIcon,
      title: "Living area",
      text: "A corner sofa with a chaise, an armchair and a timber sideboard, on large-format light floor tiles.",
    },
    {
      Icon: WardrobeIcon,
      title: "Two bedrooms",
      text: "Bedrooms with fitted wardrobes and wide windows, with air conditioning in the bedroom under the low window.",
    },
    {
      Icon: SunIcon,
      title: "Soft lighting",
      text: "LED underlight beneath the sideboard and the steps, with recessed ceiling lights throughout.",
    },
  ],
  bookTitle: "Walk through the loft.",
  rooms: [
    {
      id: "living",
      group: "Living and dining",
      title: "The living room",
      text: "A grey corner sofa and armchair under a large window, with a framed print on the wall.",
      src: img("kallithea-menelaou-1"),
      alt: "Living room with a grey corner sofa, an armchair, a large window and a framed print",
    },
    {
      id: "dining-1",
      group: "Living and dining",
      title: "Dining beneath the stairs",
      text: "A round glass dining table with timber chairs, and the steel staircase behind.",
      src: img("kallithea-menelaou-4"),
      alt: "Round glass dining table with timber chairs, a steel staircase and the glazed entrance beyond",
    },
    {
      id: "dining-2",
      group: "Living and dining",
      title: "A second dining corner",
      text: "A round timber table with four chairs under a pendant light.",
      src: img("kallithea-menelaou-8"),
      alt: "Round timber dining table with four chairs under a pendant light",
    },
    {
      id: "kitchen-1",
      group: "Kitchen",
      title: "The kitchen",
      text: "Light cabinets, a marble-effect splashback, a timber worktop and a breakfast bar with stools.",
      src: img("kallithea-menelaou-2"),
      alt: "Kitchen with light cabinets, a marble-effect splashback, a timber worktop and bar stools",
    },
    {
      id: "kitchen-2",
      group: "Kitchen",
      title: "From the staircase",
      text: "The kitchen, the dining table and the living area seen from the upper level.",
      src: img("kallithea-menelaou-3"),
      alt: "View from the staircase down to the kitchen, the dining table and the living area",
    },
    {
      id: "bedroom-1",
      group: "Bedrooms",
      title: "The bedroom under the window",
      text: "A timber bed under a long low window, with air conditioning and a ceiling light.",
      src: img("kallithea-menelaou-5"),
      alt: "Bedroom with a timber bed, a long low window and air conditioning",
    },
    {
      id: "bedroom-2",
      group: "Bedrooms",
      title: "The bedroom with wardrobes",
      text: "A double bed with a dark upholstered headboard and fitted wardrobes, under a soft ceiling light.",
      src: img("kallithea-menelaou-6"),
      alt: "Bedroom with a double bed, a dark headboard and fitted wardrobes",
    },
    {
      id: "bedroom-3",
      group: "Bedrooms",
      title: "The bedroom with sliding wardrobes",
      text: "A grey button-tufted headboard and oak-effect sliding wardrobes, on warm timber flooring.",
      src: img("kallithea-menelaou-7"),
      alt: "Bedroom with a grey tufted headboard and oak-effect sliding wardrobes",
    },
  ],
  chapters: [
    { range: "I – III", label: "Living and dining" },
    { range: "IV – V", label: "Kitchen" },
    { range: "VI – VIII", label: "Bedrooms" },
  ],
  mapSrc: img("kallithea-menelaou-map"),
  mapAlt:
    "Aerial map of the Kallithea and Nea Smyrni area showing the property, Palaio Faliro Marina, the Stavros Niarchos Cultural Center, parks, hotels, Harokopio University and the public transport network",
  mapAspect: "aspect-square",
  homeName: "The loft",
  homeNote: "On the map",
  /* x / y in % of the cropped map image; estimates from the brochure map, nudge if a ring looks off */
  pins: {
    home: [50, 50],
    alsos: [15, 38],
    doxis: [75, 38],
    davaki: [94, 38],
    hondos: [88, 54],
    stadio: [15, 65],
    marina: [27, 20],
    eo: [57, 30],
    snfcc: [83, 15],
    transport: [65, 72],
    harokopio: [88, 77],
    hilton: [45, 42],
    avenue: [8, 50],
  },
  places: kallitheaPlaces,
  groups: [
    { key: "nearby", label: "Nearby" },
    { key: "sea", label: "Seafront and culture" },
    { key: "city", label: "Transport, study and hotels" },
  ],
  locationTitle: "Kallithea, between the city and the sea.",
  locationIntro:
    "Hover or tap a place to find it on the map. The brochure gives no travel times for these places.",
  tabGroups: [
    {
      id: "neighbourhood",
      tab: "The neighbourhood",
      items: [
        {
          label: "Between the city and the coast",
          text: "Kallithea is one of Athens' most strategically positioned districts, with access to both the city centre and the Athenian Riviera.",
        },
        {
          label: "A strong transport network",
          text: "Multiple bus lines, tram access and two metro stations just minutes away.",
        },
        {
          label: "Everyday life on foot",
          text: "Shops, supermarkets, cafés and services are all within walking distance.",
        },
        {
          label: "Rising demand",
          text: "Ongoing development, a growing student population and nearby universities support consistently high rental demand.",
        },
      ],
    },
    {
      id: "snfcc",
      tab: "Stavros Niarchos Center",
      items: [
        {
          label: "A cultural hub in Paleo Faliro",
          text: "The Stavros Niarchos Foundation Cultural Center hosts the National Library, the Greek National Opera and the Stavros Niarchos Park.",
        },
        {
          label: "Designed by Renzo Piano",
          text: "Construction began in 2012 and was completed in 2016, to a design by the Italian architect Renzo Piano.",
        },
        {
          label: "Conceived in 1998",
          text: "The Stavros Niarchos Foundation set out to enrich the cultural facade of Athens with one building that would house both the library and the opera.",
        },
      ],
    },
    {
      id: "connected",
      tab: "Connected to Athens",
      items: [
        { label: "Syngrou Avenue", text: "A prime route that connects residents to the city's major cultural landmarks." },
        { label: "Bus, tram and metro", text: "Multiple bus lines, tram access and two metro stations nearby." },
        { label: "Harokopio University", text: "A prestigious academic institution on the brochure map." },
      ],
    },
  ],
  discoverTitle: "Discover Kallithea.",
  discoverSub: "Between the city centre and the Athenian Riviera",
  discoverText:
    "Kallithea is one of Athens' most strategically positioned districts. Its location along Syngrou Avenue connects residents to major cultural landmarks, including the Stavros Niarchos Foundation Cultural Center and the National Opera, and to the city centre and the coast.",
  discoverQuote: "Urban energy and modern comfort, close to both the city and the coast.",
  discoverCardLabel: "Rising demand",
  discoverCardText:
    "A growing student population and nearby universities support consistently high rental demand.",
  ctaHeading: "This apartment has been sold.",
  ctaText:
    "The 95 m² Kallithea Menelaou loft with 2 bedrooms and 2 bathrooms has found its buyer. Get in touch and we will show you similar apartments in Athens.",
};

/* EDIT HERE: every sold apartment. The key is the URL slug. */
const units: Record<string, Unit> = {
  miaouli,
  "pagrati-evmenous-145": evmenous145,
  "kallithea-menelaou-95": kallithea95,
};

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

/* Diagonal SOLD stamp, laid over the hero photo */
const SoldStamp = () => (
  <div
    role="img"
    aria-label="Sold"
    className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 -rotate-12 border-[6px] border-double border-white bg-(--navy)/85 px-8 py-3 text-center shadow-2xl backdrop-blur-sm md:px-12 md:py-4"
  >
    <span className="block font-serif text-4xl font-bold uppercase tracking-[0.25em] text-(--gold-light) md:text-6xl">
      Sold
    </span>
  </div>
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
const PlaceRow = ({ p }: { p: { id: string; name: string; note: string } }) => (
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
    <span className="whitespace-nowrap text-right text-xs text-(--gold-dark) transition-colors group-hover:font-semibold group-focus:font-semibold">
      {p.note}
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
  return {
    title: u.metaTitle,
    description: u.metaDescription,
    /* sold pages stay out of search results; delete this line to keep them indexed */
    robots: { index: false, follow: true },
  };
}

export default async function SoldApartmentPage({
  params,
}: {
  params: Promise<{ unit: string }>;
}) {
  const { unit } = await params;
  const u = units[unit];
  if (!u) notFound();

  const home = { id: "home", name: u.homeName, note: u.homeNote };

  /* hover / tap on a row shows the matching ring on the map (pure CSS) */
  const hoverCss = [home.id, ...u.places.map((p) => p.id)]
    .map(
      (id) =>
        `.loc-explorer:has([data-place=${id}]:is(:hover,:focus)) [data-pin=${id}]{opacity:1;scale:1}`,
    )
    .join("\n");

  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      <S3Styles />
      <ScrollBar />

      {/* ───────── HERO · dark navy, portrait photo right with SOLD stamp, stats built in ───────── */}
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
                <Tag className="from-white to-(--paper) !text-(--navy)">Sold</Tag>
                <span className="font-serif text-2xl text-(--gold-light) line-through decoration-2 opacity-70">
                  {u.price}
                </span>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-linear-to-b from-(--gold-light) to-(--gold) px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110"
                >
                  Ask about similar apartments
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
                  <div className="relative">
                    <WindowFrame src={u.heroSrc} alt={u.heroAlt} />
                    <SoldStamp />
                  </div>
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
            <Title title={u.locationTitle} sub="Location and connectivity" center />

            <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:items-start">
              {/* list */}
              <div className="lg:col-span-5">
                <p className="max-w-sm text-sm leading-relaxed text-(--navy)/75">
                  {u.locationIntro}
                </p>
                <ul className="mt-6 border-t border-(--gold)/40">
                  <PlaceRow p={home} />
                </ul>
                {u.groups.map((g) => (
                  <div key={g.key} className="mt-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-(--gold-dark)">
                      {g.label}
                    </p>
                    <ul className="mt-3 border-t border-(--gold)/40">
                      {u.places
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

      {/* ───────── DISCOVER · paper, intro + quote card, then tabs ───────── */}
      <section className="relative border-t border-(--gold)/30 bg-(--paper)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Title title={u.discoverTitle} sub={u.discoverSub} />
              <Reveal3D variant="rise" delay={150}>
                <p className="mt-8 max-w-xl text-sm leading-relaxed text-(--navy)/75">
                  {u.discoverText}
                </p>
                <p className="mt-8 border-t border-(--gold)/40 pt-6 font-serif text-xl italic leading-snug text-(--gold-dark) md:text-2xl">
                  {u.discoverQuote}
                </p>
              </Reveal3D>
            </div>

            <Reveal3D variant="flipRight" className="lg:col-span-5">
              <div className="border-l-4 border-(--gold) bg-(--navy) p-8 text-white shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-(--gold-light)">
                  {u.discoverCardLabel}
                </p>
                <p className="mt-4 font-serif text-2xl italic leading-snug md:text-3xl">
                  {u.discoverCardText}
                </p>
              </div>
            </Reveal3D>
          </div>

          {/* interactive tabs */}
          <div className="mt-14 md:mt-20">
            <Reveal3D variant="rise">
              <NeighbourhoodTabs groups={u.tabGroups} />
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
                Was listed at
              </p>
              <p className="mt-2 font-serif text-5xl font-bold text-(--gold-light) line-through decoration-2 opacity-70">
                {u.price}
              </p>
              <div className="mt-4">
                <Tag className="from-white to-(--paper) !text-(--navy)">Sold</Tag>
              </div>
              <Link
                href="/contact"
                className="mt-8 inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-8 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110"
              >
                Ask about similar apartments
              </Link>
            </div>
          </div>
        </Depth>
      </section>
    </main>
  );
}