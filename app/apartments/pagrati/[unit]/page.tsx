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
   ONE PAGE FOR EVERY PAGRATI APARTMENT
   File location: app/apartments/pagrati/[unit]/page.tsx
   URLs: /apartments/pagrati/<slug>   (slug = the keys of `units` below)
   To add an apartment: copy one entry in `units`, change the data, drop its images in public/images/.
   (Delete the old app/apartments/pagrati_studio folder once this is in.)
   ═════════════════════════════════════════════════════════════════ */

/* EDIT HERE: palette. Same as the other pages (RoomBook depends on these variable names). */
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

/* Right-angle band: a row of small right triangles */
const anglesBg = (color: string): CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='19' height='14'><path d='M0 13H13V1Z M13 13H19' fill='none' stroke='${color}' stroke-width='1.3'/></svg>")`,
  backgroundRepeat: "repeat-x",
});
const Angles = ({
  className = "",
  color = "%23b9791f",
}: {
  className?: string;
  color?: string;
}) => <div aria-hidden className={`h-3.5 ${className}`} style={anglesBg(color)} />;

/* ───────── IMAGES ─────────
   All files go in public/images/. If your files are .jpg, change EXT to "jpg".

   40 m² STUDIO
     pagrati-studio-cover.png        hero (living room through the glass partition)
     pagrati-studio-interior-1 … 7   kitchen+living, living, through glass, bedroom, open kitchen, entrance+dining, kitchen detail
     pagrati-kallimarmaro.png        Kallimarmaro photo
     pagrati-studio-map.png          the "Location" map only

   82 m² EVMENOUS
     pagrati-evmenous-cover.png        brochure cover (crop out the title text and the price/specs block)
     pagrati-evmenous-interior-1.png   living room, spiral staircase, round oak coffee table
     pagrati-evmenous-interior-2.png   kitchen
     pagrati-evmenous-interior-3.png   wardrobe and woven mirror
     pagrati-evmenous-interior-4.png   bedroom, timber slat headboard and glass block
     pagrati-evmenous-interior-5.png   bathroom, oval backlit mirror
     pagrati-evmenous-interior-6.png   bedroom with wall lights
     pagrati-evmenous-interior-7.png   hallway with the mirror and shelving
     pagrati-evmenous-interior-8.png   coffee table with vases and diffuser
     pagrati-evmenous-interior-9.png   round dining table
     pagrati-evmenous-interior-10.png  niche with cushions and vases
     pagrati-evmenous-street.png       street photo from "Discover Pagrati" (crop the photo only)
     pagrati-evmenous-map.png          aerial map from "Location & Connectivity" (crop the map only, no title, no key list)

   48 m² ASPASIAS LOFT
     pagrati-aspasias-cover.png        brochure cover (crop out the title text and the price/specs block)
     pagrati-aspasias-interior-1.png   staircase, kitchen and desk
     pagrati-aspasias-interior-2.png   living room with black sofa and round coffee table
     pagrati-aspasias-interior-3.png   kitchen
     pagrati-aspasias-interior-4.png   view down from the mezzanine
     pagrati-aspasias-interior-5.png   bedroom with yellow cushions
     pagrati-aspasias-interior-6.png   second bedroom, single bed and wardrobe
     pagrati-aspasias-interior-7.png   shower
     pagrati-aspasias-interior-8.png   bathroom, basin and wall-hung toilet
     pagrati-aspasias-interior-9.png   street entrance
     pagrati-aspasias-stadium.png      Panathenaic Stadium photo from the "Pagrati, Athens" page (photo only)
     pagrati-aspasias-map.png          the "Location" map only (no title)
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

const WalkIcon = icon(
  <>
    <circle cx="13" cy="4.5" r="1.7" />
    <path d="M12 8.5l-2 4.2 3 2.3 1 5.5M10 12.7l-3 1.6M13 8.5l3 3 3 .6M13 15l-3 5.5" />
  </>,
);
const ColumnsIcon = icon(
  <>
    <path d="M3.5 9L12 4l8.5 5z" />
    <path d="M6 11v7M10 11v7M14 11v7M18 11v7" />
    <path d="M4 20h16" />
  </>,
);
const PlaneIcon = icon(
  <>
    <path d="M21 4L3 11l6 2.5L11.5 20 14 14.5z" />
    <path d="M9 13.5L21 4" />
  </>,
);
const AnchorIcon = icon(
  <>
    <circle cx="12" cy="5.5" r="2" />
    <path d="M12 7.5V21M8 11h8" />
    <path d="M5 14c0 3.5 3 6 7 6s7-2.5 7-6" />
  </>,
);
const KeyIcon = icon(
  <>
    <circle cx="8" cy="12" r="3.5" />
    <path d="M11.5 12H21M17 12v3M20 12v2" />
  </>,
);
const StoneIcon = icon(
  <>
    <path d="M4 7h7v5H4zM13 7h7v5h-7zM8.5 12h7v5h-7z" />
  </>,
);
const GlassIcon = icon(
  <>
    <rect x="4" y="3.5" width="16" height="17" />
    <path d="M12 3.5v17M4 12h16" />
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
const SunIcon = icon(
  <>
    <circle cx="12" cy="12" r="3.5" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6L7 7M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
  </>,
);
const CoinsIcon = icon(
  <>
    <ellipse cx="12" cy="6" rx="6" ry="2.5" />
    <path d="M6 6v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6" />
    <path d="M6 10v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" />
    <path d="M6 14v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" />
  </>,
);
const PassportIcon = icon(
  <>
    <rect x="5.5" y="3.5" width="13" height="17" rx="1.5" />
    <circle cx="12" cy="10" r="3" />
    <path d="M9 16.5h6" />
  </>,
);
const HouseIcon = icon(
  <>
    <path d="M3.5 11.5L12 4l8.5 7.5" />
    <path d="M5.5 10v10h13V10" />
    <path d="M10 20v-5.5h4V20" />
  </>,
);
const PlanIcon = icon(
  <>
    <path d="M5 4v16h15" />
    <path d="M5 4h8v7h7v9" />
    <path d="M5 11h3" />
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
const BathIcon = icon(
  <>
    <path d="M3 12h18v2.5a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 14.5z" />
    <path d="M6 12V6.5A2.5 2.5 0 0 1 8.5 4 2.5 2.5 0 0 1 11 6" />
    <path d="M7 19l-1 2M17 19l1 2" />
  </>,
);
const SnowIcon = icon(
  <>
    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
    <path d="M9.5 4.5L12 6.5l2.5-2M9.5 19.5L12 17.5l2.5 2" />
  </>,
);
const NoFeeIcon = icon(
  <>
    <circle cx="12" cy="12" r="8" />
    <path d="M6.5 17.5l11-11" />
  </>,
);
const DocIcon = icon(
  <>
    <path d="M7 3.5h7l4 4v13H7z" />
    <path d="M14 3.5v4h4M9.5 12h5M9.5 15.5h5" />
  </>,
);
const WrenchIcon = icon(
  <>
    <path d="M14.5 6.5a4 4 0 0 0 4.8 4.8l-9 9a2.1 2.1 0 0 1-3-3l9-9a4 4 0 0 0-1.8-1.8z" />
  </>,
);
const SofaIcon = icon(
  <>
    <path d="M5 11V8.5A1.5 1.5 0 0 1 6.5 7h11A1.5 1.5 0 0 1 18 8.5V11" />
    <path d="M3 13a2 2 0 0 1 4 0v1h10v-1a2 2 0 0 1 4 0v4H3z" />
    <path d="M6 17v2M18 17v2" />
  </>,
);
const ChartIcon = icon(
  <>
    <path d="M4 20V4M4 20h16" />
    <path d="M8 15l3.5-4 3 2.5L19 8" />
  </>,
);
const StairsIcon = icon(
  <>
    <path d="M4 20h4v-4h4v-4h4V8h4" />
    <path d="M4 20h16" />
  </>,
);
const SlatsIcon = icon(
  <>
    <path d="M6 4v16M10 4v16M14 4v16M18 4v16" />
  </>,
);
const TrainIcon = icon(
  <>
    <rect x="6" y="3.5" width="12" height="13" rx="3" />
    <path d="M6 11h12M9 14h.01M15 14h.01" />
    <path d="M8.5 20.5l2-4M15.5 20.5l-2-4" />
  </>,
);

/* ═════════ UNIT DATA ═════════ */
type Room = { id: string; group: string; title: string; text: string; src: string; alt: string };
type Stat = { n: number; label: string };
type Place = { id: string; name: string; tag: string; x: number; y: number };
type Item = { Icon: IconType; text: string };
type Connection = { Icon: IconType; label: string; text: string };
type TabGroup = { id: string; tab: string; items: { label: string; text: string }[] };

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
  heroVariant: "cut" | "arch" | "pediment";
  heroCaption?: string;
  tourLabel: string;
  /* strip + features */
  stats: Stat[];
  featuresSub: string;
  featuresText: string;
  highlights: { Icon: IconType; value: string; label: string }[];
  specs: Item[];
  finishesTitle: string;
  finishes: Item[];
  /* book */
  bookTitle: string;
  rooms: Room[];
  chapters: { range: string; label: string }[];
  /* location */
  location: {
    title: string;
    intro: string;
    mapSrc: string;
    mapAlt: string;
    mapAspect: string;
    pinSize: string;
    places: Place[];
    connectionsTitle?: string;
    connections?: Connection[];
  };
  /* neighbourhood */
  life: {
    title: string;
    sub: string;
    intro: string;
    quote: string;
    photoSrc: string;
    photoAlt: string;
    photoAspect: string;
    caption: string;
    groups: TabGroup[];
  };
  /* closing card */
  ctaHeading: string;
  ctaText: string;
};

/* ───── 40 m² ground floor studio ───── */
const studio40: Unit = {
  metaTitle: "Studio Apartment in Pagrati, Athens, Golden Visa Eligible | Aurevon Global Partners",
  metaDescription:
    "A 40 m² ground floor studio in Pagrati, central Athens. 1 bedroom, 1 bathroom, €265,000. Golden Visa eligible, 12 minutes on foot to Kallimarmaro and 13 minutes by car to Syntagma.",
  kicker: "Pagrati, Athens",
  h1: ["Pagrati", "Studio"],
  intro:
    "A 40 m² ground floor studio with 1 bedroom and 1 bathroom, in one of the liveliest neighbourhoods of central Athens.",
  tag: "Golden Visa eligible",
  price: "€265,000",
  heroSrc: img("pagrati-studio-cover"),
  heroAlt:
    "Pagrati Studio in Athens: living room seen through a steel-framed glass partition, with a cream sofa and black-and-white art. Golden Visa eligible, €265,000, 40 m², 1 bedroom, 1 bathroom.",
  heroVariant: "cut",
  tourLabel: "Tour the studio",
  stats: [
    { n: 40, label: "m² of living space" },
    { n: 1, label: "Bedroom" },
    { n: 1, label: "Bathroom" },
  ],
  featuresSub: "One studio apartment",
  featuresText:
    "A compact, bright studio just east of the historic centre, a short walk from the Panathenaic Stadium and the National Garden, finished with stone, steel and glass.",
  highlights: [
    { Icon: WalkIcon, value: "12 min", label: "On foot to Kallimarmaro" },
    { Icon: CoinsIcon, value: "€265,000", label: "Price" },
    { Icon: PassportIcon, value: "Eligible", label: "Golden Visa" },
  ],
  specs: [
    { Icon: PlanIcon, text: "40 sq.m. studio apartment" },
    { Icon: HouseIcon, text: "Ground floor" },
    { Icon: BedIcon, text: "1 Bedroom" },
    { Icon: BathIcon, text: "1 Bathroom" },
    { Icon: KeyIcon, text: "Golden Visa eligible" },
  ],
  finishesTitle: "Finishes",
  /* only what is visible in the photos; add anything else the brochure lists */
  finishes: [
    { Icon: StoneIcon, text: "Exposed stone walls in the bedroom and kitchen" },
    { Icon: GlassIcon, text: "Black steel-framed glass partitions" },
    { Icon: AppliancesIcon, text: "Fitted kitchen with hob, oven and brass tap" },
    { Icon: WardrobeIcon, text: "Full-height bedroom wardrobes" },
    { Icon: SunIcon, text: "Warm concealed LED lighting" },
  ],
  bookTitle: "Walk through the studio.",
  rooms: [
    {
      id: "kitchen-living",
      group: "Living",
      title: "Kitchen and living",
      text: "An open plan with white cabinetry, a cream sofa and black-and-white art on the wall.",
      src: img("pagrati-studio-interior-1"),
      alt: "Kitchen and living area with white cabinets, a cream sofa and black-and-white art",
    },
    {
      id: "living-room",
      group: "Living",
      title: "The living room",
      text: "A cream sofa, a leather trunk as a coffee table and white wall shelves.",
      src: img("pagrati-studio-interior-2"),
      alt: "Living room with a cream sofa, a leather trunk as a coffee table and white wall shelves",
    },
    {
      id: "through-glass",
      group: "Living",
      title: "Through the glass",
      text: "Black steel-framed glass partitions keep the studio open and bright.",
      src: img("pagrati-studio-interior-3"),
      alt: "Living room seen through a steel-framed glass partition",
    },
    {
      id: "entrance-dining",
      group: "Kitchen & dining",
      title: "Entrance and dining",
      text: "The front door, shelving and a dining table with two wooden chairs.",
      src: img("pagrati-studio-interior-6"),
      alt: "Entrance and dining table with two wooden chairs, shelves and the front door",
    },
    {
      id: "open-kitchen",
      group: "Kitchen & dining",
      title: "The open kitchen",
      text: "A stone pillar, a plant and the entrance, with the kitchen open to the room.",
      src: img("pagrati-studio-interior-5"),
      alt: "Open kitchen with a stone pillar, a plant and the front door",
    },
    {
      id: "kitchen-detail",
      group: "Kitchen & dining",
      title: "Kitchen detail",
      text: "A black hob, a cream oven and a black sink with a brass tap.",
      src: img("pagrati-studio-interior-7"),
      alt: "Kitchen detail with a black hob, a cream oven and a black sink with a brass tap",
    },
    {
      id: "bedroom",
      group: "Sleeping",
      title: "The bedroom",
      text: "A stone feature wall, a double bed and full-height wardrobes.",
      src: img("pagrati-studio-interior-4"),
      alt: "Bedroom with a stone feature wall, a double bed and full-height wardrobes",
    },
  ],
  chapters: [
    { range: "I – III", label: "Living" },
    { range: "IV – VI", label: "Kitchen & dining" },
    { range: "VII", label: "Sleeping" },
  ],
  location: {
    title: "Pagrati, everything within a walk.",
    intro: "Hover or tap a place to find it on the map, with its travel time from the studio.",
    mapSrc: img("pagrati-studio-map"),
    mapAlt:
      "Map of Pagrati showing the studio, Kallimarmaro, the Acropolis, Alsos Ilisíon and Evangelismos metro station",
    mapAspect: "aspect-[2/1]",
    pinSize: "w-[9%]",
    /* x / y = where each ring sits on the map image, in %. Nudge them if a ring looks slightly off. */
    places: [
      { id: "studio", name: "The studio", tag: "Your property", x: 12, y: 55 },
      { id: "kallimarmaro", name: "Kallimarmaro", tag: "12 min on foot", x: 42, y: 20 },
      { id: "acropolis", name: "Acropolis of Athens", tag: "20 min by car", x: 67, y: 33 },
      { id: "alsos", name: "Alsos Ilisíon", tag: "20 min on foot", x: 72, y: 86 },
      { id: "metro", name: "Evangelismos Metro", tag: "20 min on foot", x: 91, y: 72 },
    ],
    connectionsTitle: "Connected to everything",
    connections: [
      { Icon: ColumnsIcon, label: "Athens city centre (Syntagma)", text: "13 min by car" },
      { Icon: ColumnsIcon, label: "Acropolis of Athens", text: "20 min by car" },
      { Icon: AnchorIcon, label: "Port of Piraeus", text: "30 min by car" },
      { Icon: PlaneIcon, label: "Athens International Airport", text: "36 min by car" },
    ],
  },
  life: {
    title: "Life in Pagrati.",
    sub: "Discover Pagrati",
    intro:
      "A lively neighbourhood just east of the historic centre, a short walk from the Panathenaic Stadium and the National Garden, with easy access to Syntagma Square and the city centre.",
    quote: "Lively streets. A marble landmark. Central Athens.",
    photoSrc: img("pagrati-kallimarmaro"),
    photoAlt: "The Panathenaic Stadium, Kallimarmaro, lit at dusk",
    photoAspect: "aspect-[16/9]",
    caption: "Kallimarmaro, the Panathenaic Stadium",
    groups: [
      {
        id: "pagrati",
        tab: "Life in Pagrati",
        items: [
          {
            label: "Lifestyle",
            text: "Pagrati is one of the most vibrant and sought-after areas in central Athens, known for its lively atmosphere and strong urban character. Just east of the historic centre, it blends residential charm with cafés, restaurants, bars and boutique shops that keep the streets busy from morning to night.",
          },
          {
            label: "Location",
            text: "A prime location close to the Panathenaic Stadium and the National Garden, with easy access to Syntagma Square and the city centre. Walkable streets and reliable public transport make it a natural fit for young professionals, creatives and international residents.",
          },
          {
            label: "Investment",
            text: "Pagrati stands out for strong rental demand, especially in the short-term and serviced apartment market. Its popularity, central position and lifestyle appeal support steady property value growth and high occupancy rates.",
          },
        ],
      },
      {
        id: "kallimarmaro",
        tab: "Kallimarmaro",
        items: [
          {
            label: "The Panathenaic Stadium",
            text: "One of Athens' most iconic landmarks and a symbol of the city's rich historical heritage. It gives the surrounding area a unique cultural prestige.",
          },
          {
            label: "The wider area",
            text: "The Kallimarmaro area is highly sought after for its central location and quality of life, with the National Garden, Zappeion and the vibrant streets of Pagrati close by, and easy access to Syntagma and Kolonaki.",
          },
          { label: "1896", text: "The stadium hosted the first modern Olympic Games." },
          { label: "White marble", text: "The stadium is built entirely of white marble." },
          {
            label: "12 minutes on foot",
            text: "Kallimarmaro is a 12-minute walk from the studio.",
          },
        ],
      },
    ],
  },
  ctaHeading: "Interested in the Pagrati Studio?",
  ctaText:
    "A 40 m² ground floor studio with 1 bedroom and 1 bathroom in Pagrati, at €265,000 and Golden Visa eligible. Contact us to arrange a viewing.",
};

/* ───── 82 m² Evmenous ground floor apartment ───── */
const evmenous82: Unit = {
  metaTitle:
    "Ground Floor Apartment in Pagrati, Athens, 82 m² Golden Visa Eligible | Aurevon Global Partners",
  metaDescription:
    "A renovated, fully furnished 82 m² ground floor apartment in Pagrati, central Athens. 2 bedrooms, 2 bathrooms, €300,000. Golden Visa eligible.",
  kicker: "Pagrati, Athens",
  h1: ["Evmenous", "Apartment"],
  intro:
    "A beautifully renovated and fully furnished 82 m² ground floor apartment with 2 bedrooms and 2 bathrooms, in the heart of Pagrati.",
  tag: "Golden Visa eligible",
  price: "€300,000",
  heroSrc: img("pagrati-evmenous-cover"),
  heroAlt:
    "Pagrati Evmenous Ground Floor Apartment: double-height living room with a mezzanine, a white spiral staircase and a round oak coffee table. Golden Visa eligible, €300,000, 82 m², 2 bedrooms, 2 bathrooms.",
  heroVariant: "arch",
  heroCaption: "Pagrati, Athens",
  tourLabel: "Tour the apartment",
  stats: [
    { n: 82, label: "m² of living space" },
    { n: 2, label: "Bedrooms" },
    { n: 2, label: "Bathrooms" },
  ],
  featuresSub: "Modern living in a vibrant neighbourhood",
  featuresText:
    "A beautifully renovated, fully furnished ground floor apartment in the heart of Pagrati, offering modern comfort and an excellent location. Ideal for private use or as an investment opportunity.",
  /* the brochure also lists "90 m from Varnava Pagrati Square" and "300 m from Kallimarmaro", but its own map
     says 1.0 km and 1.3 km, so they are left out until you confirm which is right */
  highlights: [
    { Icon: ChartIcon, value: "€1,100", label: "Estimated rent per month" },
    { Icon: WrenchIcon, value: "2026", label: "Fully renovated" },
    { Icon: PassportIcon, value: "Eligible", label: "Golden Visa" },
  ],
  specs: [
    { Icon: PlanIcon, text: "82 sq.m. ground floor apartment" },
    { Icon: BedIcon, text: "2 Bedrooms" },
    { Icon: BathIcon, text: "2 Bathrooms" },
    { Icon: WrenchIcon, text: "Fully renovated in 2026" },
    { Icon: SofaIcon, text: "Fully furnished and equipped" },
    { Icon: KeyIcon, text: "Golden Visa eligible" },
  ],
  finishesTitle: "Property highlights",
  finishes: [
    { Icon: SnowIcon, text: "Air conditioning" },
    { Icon: AppliancesIcon, text: "All electrical appliances included" },
    { Icon: NoFeeIcon, text: "No maintenance fees" },
    { Icon: DocIcon, text: "All papers ready for contracts" },
    { Icon: StairsIcon, text: "Mezzanine level with a white spiral staircase" },
    { Icon: SlatsIcon, text: "Timber slat headboard and glass-block detail" },
  ],
  bookTitle: "Walk through the apartment.",
  rooms: [
    {
      id: "living",
      group: "Living",
      title: "Double-height living",
      text: "A tall living space with a mezzanine above, a white spiral staircase and a round oak coffee table.",
      src: img("pagrati-evmenous-interior-1"),
      alt: "Living area with a beige sofa, a round oak coffee table, a spiral staircase and the kitchen beyond",
    },
    {
      id: "kitchen",
      group: "Kitchen",
      title: "The kitchen",
      text: "Cream handleless cabinets, a speckled stone splashback, a black built-in oven and warm under-cabinet lighting.",
      src: img("pagrati-evmenous-interior-2"),
      alt: "Kitchen with cream cabinets, a stone-effect splashback and a black built-in oven",
    },
    {
      id: "dining",
      group: "Living",
      title: "The dining table",
      text: "A round white table with timber armchairs, set against a tall palm.",
      src: img("pagrati-evmenous-interior-9"),
      alt: "Round white dining table with woven placemats, glasses and timber chairs beside a palm",
    },
    {
      id: "table-detail",
      group: "Living",
      title: "Living detail",
      text: "A round oak table with sculpted vases and a reed diffuser, with the kitchen glowing behind.",
      src: img("pagrati-evmenous-interior-8"),
      alt: "Round oak table with vases and a reed diffuser, with a palm and the kitchen in the background",
    },
    {
      id: "niche",
      group: "Living",
      title: "The niche",
      text: "A recessed shelf with soft cushions, dried grasses and glassware above large stone-look tiles.",
      src: img("pagrati-evmenous-interior-10"),
      alt: "Recessed niche with linen cushions, dried grasses, glasses and a patterned jar",
    },
    {
      id: "bedroom",
      group: "Bedrooms",
      title: "The bedroom",
      text: "A timber slat headboard, a green glass-block panel and neutral bedding.",
      src: img("pagrati-evmenous-interior-4"),
      alt: "Bedroom with a timber slat headboard, a glass-block panel and grey and cream cushions",
    },
    {
      id: "bedroom-lights",
      group: "Bedrooms",
      title: "Bedroom with wall lights",
      text: "An upholstered bed under a low ceiling, lit by warm wall lights.",
      src: img("pagrati-evmenous-interior-6"),
      alt: "Bedroom with an upholstered bed, warm wall lights and a slim bedside table",
    },
    {
      id: "wardrobe",
      group: "Bedrooms",
      title: "The wardrobe",
      text: "Cream doors, open timber shelving and a woven sunburst mirror.",
      src: img("pagrati-evmenous-interior-3"),
      alt: "Built-in wardrobe with cream doors, open timber shelves and a woven sunburst mirror",
    },
    {
      id: "hall",
      group: "Hall",
      title: "The hallway",
      text: "Timber shelving, a woven mirror and large stone-look floor tiles.",
      src: img("pagrati-evmenous-interior-7"),
      alt: "Hallway with timber shelving, a woven round mirror and large stone-look floor tiles",
    },
    {
      id: "bathroom",
      group: "Bathroom",
      title: "The bathroom",
      text: "An oval backlit mirror above a white basin on a dark vanity, with a black tap.",
      src: img("pagrati-evmenous-interior-5"),
      alt: "Bathroom with an oval backlit mirror, a white basin, a dark vanity and a black tap",
    },
  ],
  chapters: [
    { range: "I – V", label: "Living & kitchen" },
    { range: "VI – VIII", label: "Bedrooms" },
    { range: "IX", label: "Hall" },
    { range: "X", label: "Bathroom" },
  ],
  location: {
    title: "Pagrati, at the centre of it all.",
    intro:
      "Pagrati Square and the Grove are close by, with the Acropolis about 2.2 km away. Hover or tap a place to find it on the map.",
    mapSrc: img("pagrati-evmenous-map"),
    mapAlt:
      "Aerial map of Pagrati showing the property location, metro stations, squares and landmarks with distances",
    mapAspect: "aspect-[420/385]",
    pinSize: "w-[13%]",
    /* x / y = where each ring sits on the cropped map, in %. They are estimates, nudge if a ring is slightly off. */
    places: [
      { id: "pagrati-square", name: "Pagrati Square", tag: "≈ 0.4 km", x: 79, y: 56 },
      { id: "pagrati-grove", name: "Pagrati Grove", tag: "≈ 0.6 km", x: 62, y: 44 },
      { id: "varnava", name: "Varnava Square", tag: "≈ 1.0 km", x: 81, y: 87 },
      { id: "evangelismos", name: "Evangelismos Metro (Line 3)", tag: "≈ 1.1 km", x: 39, y: 35 },
      { id: "mets", name: "Mets, NTUA School of Applied Arts", tag: "≈ 1.2 km", x: 14, y: 64 },
      { id: "stadium", name: "Panathenaic Stadium (Kallimarmaro)", tag: "≈ 1.3 km", x: 76, y: 25 },
      { id: "acropolis-museum", name: "Acropolis Museum", tag: "≈ 1.8 km", x: 12, y: 30 },
      { id: "national-garden", name: "National Garden", tag: "≈ 1.8 km", x: 7, y: 43 },
      { id: "acropolis", name: "Acropolis of Athens", tag: "≈ 2.2 km", x: 19, y: 15 },
      { id: "syntagma", name: "Syntagma Metro (Lines 2 & 3)", tag: "≈ 2.4 km", x: 7, y: 79 },
      { id: "lycabettus", name: "Lycabettus Hill", tag: "≈ 2.7 km", x: 71, y: 6 },
    ],
  },
  life: {
    title: "Athenian character.",
    sub: "Discover Pagrati",
    intro:
      "An established residential neighbourhood just east of the historic centre of Athens, known for its lively local character, elegant streets and vibrant everyday lifestyle.",
    quote: "Athenian character. Contemporary culture. Connected living.",
    photoSrc: img("pagrati-evmenous-street"),
    photoAlt: "Tree-lined street in Pagrati with classic Athenian apartment buildings and balconies",
    photoAspect: "aspect-[4/3]",
    caption: "Pagrati, Athens",
    groups: [
      {
        id: "life",
        tab: "Life in Pagrati",
        items: [
          {
            label: "Classic and contemporary",
            text: "Traditional apartment buildings and classic Athenian architecture sit alongside contemporary cafés, restaurants, galleries and cultural spaces, creating a neighbourhood that feels both authentic and distinctly modern.",
          },
          {
            label: "Made for everyday life",
            text: "Pagrati's appeal lies in the balance between energy and familiarity. Cafés, restaurants, local shops and cultural destinations are woven into an established residential setting.",
          },
          {
            label: "Varnava Square",
            text: "A lively neighbourhood meeting point with cafés, restaurants and local businesses.",
          },
          {
            label: "Local cafés and dining",
            text: "Independent cafés, contemporary restaurants, traditional tavernas and neighbourhood bars contribute to a vibrant lifestyle.",
          },
          {
            label: "Local shopping",
            text: "Independent shops, bakeries, supermarkets and everyday services fit naturally into the streets.",
          },
        ],
      },
      {
        id: "culture",
        tab: "Culture & greenery",
        items: [
          { label: "Panathenaic Stadium", text: "A historic landmark in central Athens." },
          {
            label: "Goulandris Museum of Contemporary Art",
            text: "A major contemporary art destination.",
          },
          { label: "National Garden", text: "A significant green space for the neighbourhood." },
          {
            label: "Zappeion",
            text: "Historic architecture and landscaping near central Athens.",
          },
          { label: "Alsos Pagratiou", text: "A local green space for recreation." },
        ],
      },
      {
        id: "reach",
        tab: "Everything within reach",
        items: [
          {
            label: "Dining and cafés",
            text: "A vibrant neighbourhood collection of cafés, restaurants and local venues.",
          },
          {
            label: "Culture",
            text: "Museums, galleries, landmarks and contemporary cultural districts.",
          },
          {
            label: "Green spaces",
            text: "Local parks and major landscaped areas in a central neighbourhood.",
          },
          {
            label: "Everyday convenience",
            text: "Shopping, services and community walkways close to home.",
          },
        ],
      },
    ],
  },
  ctaHeading: "Interested in the Evmenous Apartment?",
  ctaText:
    "An 82 m² renovated, fully furnished ground floor apartment with 2 bedrooms and 2 bathrooms in Pagrati, at €300,000 and Golden Visa eligible. Contact us to arrange a viewing.",
};

/* ───── 48 m² Aspasias loft apartment ───── */
const aspasias48: Unit = {
  metaTitle:
    "Loft Apartment in Pagrati, Athens, 48 m² Golden Visa Eligible | Aurevon Global Partners",
  metaDescription:
    "A 48 m² loft apartment with a mezzanine level in Pagrati, central Athens. 2 bedrooms, 1 bathroom, €255,000. Golden Visa eligible.",
  kicker: "Pagrati, Athens",
  h1: ["Aspasias", "Loft"],
  intro:
    "A 48 m² loft apartment with a mezzanine level, 2 bedrooms and 1 bathroom, in one of the most sought-after neighbourhoods of Athens.",
  tag: "Golden Visa eligible",
  price: "€255,000",
  heroSrc: img("pagrati-evmenous-cover"),
  heroAlt:
    "Pagrati Aspasias Loft Apartment: double-height living area with a timber staircase to the mezzanine, a marble kitchen and a black sofa. Golden Visa eligible, €255,000, 48 m², 2 bedrooms, 1 bathroom.",
  heroVariant: "pediment",
  heroCaption: "Aspasias Loft, Pagrati",
  tourLabel: "Tour the loft",
  stats: [
    { n: 48, label: "m² of living space" },
    { n: 2, label: "Bedrooms" },
    { n: 1, label: "Bathroom" },
  ],
  featuresSub: "A loft with a mezzanine",
  featuresText:
    "A compact loft with a timber staircase up to the mezzanine, an open kitchen and living area and two bedrooms, in a leafy, well-connected part of central Athens.",
  highlights: [
    { Icon: TrainIcon, value: "15 min", label: "By metro to the Acropolis" },
    { Icon: CoinsIcon, value: "€255,000", label: "Price" },
    { Icon: PassportIcon, value: "Eligible", label: "Golden Visa" },
  ],
  specs: [
    { Icon: PlanIcon, text: "48 sq.m. loft apartment" },
    { Icon: StairsIcon, text: "Mezzanine level with a timber staircase" },
    { Icon: BedIcon, text: "2 Bedrooms" },
    { Icon: BathIcon, text: "1 Bathroom" },
    { Icon: KeyIcon, text: "Golden Visa eligible" },
  ],
  finishesTitle: "Finishes",
  /* only what is visible in the photos; add anything else the brochure lists */
  finishes: [
    { Icon: StairsIcon, text: "Timber staircase with a matching balustrade" },
    { Icon: SlatsIcon, text: "Timber slat feature wall in the living area" },
    { Icon: AppliancesIcon, text: "Fitted kitchen with built-in oven and fridge-freezer" },
    { Icon: StoneIcon, text: "Hexagon-tile kitchen splashback" },
    { Icon: WardrobeIcon, text: "Oak flooring and wardrobe in the second bedroom" },
    { Icon: BathIcon, text: "Walk-in shower with rain head and wall-hung toilet" },
  ],
  bookTitle: "Walk through the loft.",
  rooms: [
    {
      id: "living",
      group: "Living",
      title: "The living room",
      text: "A black sofa and a round timber coffee table beneath the mezzanine, with timber slats lining the wall.",
      src: img("pagrati-aspasias-interior-2"),
      alt: "Living room with a black sofa, a round timber coffee table, a mezzanine and a slatted wall",
    },
    {
      id: "stairs",
      group: "Living",
      title: "The staircase",
      text: "A timber staircase rises to the mezzanine, beside the kitchen and a desk by the slatted wall.",
      src: img("pagrati-aspasias-interior-1"),
      alt: "Timber staircase to the mezzanine, with the kitchen and a desk beneath",
    },
    {
      id: "kitchen",
      group: "Kitchen",
      title: "The kitchen",
      text: "White cabinets with a black worktop, a hexagon-tile splashback, a built-in oven and a stainless fridge-freezer.",
      src: img("pagrati-aspasias-interior-3"),
      alt: "Kitchen with white cabinets, a hexagon-tile splashback, a built-in oven and a stainless fridge-freezer",
    },
    {
      id: "from-above",
      group: "Living",
      title: "From the mezzanine",
      text: "Looking down from the upper level onto the living area and the window with dark curtains.",
      src: img("pagrati-aspasias-interior-4"),
      alt: "View from the mezzanine down onto a black sofa, a round table and a curtained window",
    },
    {
      id: "bedroom",
      group: "Bedrooms",
      title: "The bedroom",
      text: "A double bed with yellow and cream cushions in a simple, uncluttered room.",
      src: img("pagrati-aspasias-interior-5"),
      alt: "Bedroom with a double bed and yellow and cream cushions",
    },
    {
      id: "bedroom-2",
      group: "Bedrooms",
      title: "The second bedroom",
      text: "A single bed with yellow cushions, a bedside chest and a wardrobe, on oak flooring.",
      src: img("pagrati-aspasias-interior-6"),
      alt: "Second bedroom with a single bed, yellow cushions, a bedside chest and oak flooring",
    },
    {
      id: "shower",
      group: "Bathroom",
      title: "The shower",
      text: "A walk-in shower with a rain head and a frameless glass screen.",
      src: img("pagrati-aspasias-interior-7"),
      alt: "Walk-in shower with a rain head and a frameless glass screen",
    },
    {
      id: "bathroom",
      group: "Bathroom",
      title: "The bathroom",
      text: "A vessel basin on a stone-effect shelf, a mirror and a wall-hung toilet.",
      src: img("pagrati-aspasias-interior-8"),
      alt: "Bathroom with a vessel basin, a mirror and a wall-hung toilet",
    },
    {
      id: "entrance",
      group: "Entrance",
      title: "The entrance",
      text: "A grey front door within a glazed aluminium frontage at street level.",
      src: img("pagrati-aspasias-interior-9"),
      alt: "Grey front door in a glazed aluminium frontage at street level",
    },
  ],
  chapters: [
    { range: "I – IV", label: "Living & kitchen" },
    { range: "V – VI", label: "Bedrooms" },
    { range: "VII – VIII", label: "Bathroom" },
    { range: "IX", label: "Entrance" },
  ],
  location: {
    title: "Pagrati, in the heart of Athens.",
    intro:
      "Parks, cafés, museums and metro stations are marked on the map, and the Acropolis is about 15 minutes away by metro. Hover or tap a place to find it on the map.",
    mapSrc: img("pagrati-aspasias-map"),
    mapAlt:
      "Aerial map of Pagrati showing the property, the Panathenaic Stadium, the National Garden, metro stations and nearby dining and shopping",
    mapAspect: "aspect-[364/376]",
    pinSize: "w-[12%]",
    /* x / y = where each ring sits on the cropped map, in %. They are estimates, nudge if a ring is slightly off.
       The brochure map gives no distances, so each place carries a short label instead. */
    places: [
      { id: "apartment", name: "The apartment", tag: "Your property", x: 70, y: 75 },
      { id: "retail-hub", name: "Pagrati Retail Hub", tag: "Shopping", x: 87, y: 65 },
      { id: "alsos-pagratiou", name: "Alsos Pagratiou", tag: "Park", x: 93, y: 46 },
      { id: "pasta-pagrati", name: "Pasta Pagrati", tag: "Dining", x: 79, y: 43 },
      { id: "kallimarmaro", name: "Kallimarmaro", tag: "Landmark", x: 63, y: 41 },
      { id: "benaki", name: "Benaki Museum", tag: "Museum", x: 74, y: 26 },
      { id: "national-garden", name: "National Garden", tag: "Park", x: 59, y: 30 },
      { id: "evangelismos", name: "Evangelismos Metro", tag: "Metro", x: 90, y: 19 },
      { id: "kolonaki", name: "Kolonaki Dining & Shopping District", tag: "District", x: 85, y: 8 },
      { id: "syntagma", name: "Syntagma Metro", tag: "Metro", x: 60, y: 7 },
      { id: "acropolis", name: "Acropolis of Athens", tag: "15 min by metro", x: 16, y: 21 },
    ],
  },
  life: {
    title: "A vibrant neighbourhood.",
    sub: "Pagrati, Athens",
    intro:
      "One of Athens' most sought-after residential neighbourhoods, combining authentic Athenian character with a contemporary urban lifestyle.",
    quote: "Leafy streets. Cultural venues. City-centre convenience.",
    photoSrc: img("pagrati-aspasias-stadium"),
    photoAlt:
      "Aerial view of the Panathenaic Stadium surrounded by trees and the apartment blocks of Pagrati",
    photoAspect: "aspect-[16/9]",
    caption: "The Panathenaic Stadium",
    groups: [
      {
        id: "life",
        tab: "Life in Pagrati",
        items: [
          {
            label: "Residential and cultural",
            text: "Known for its leafy streets, independent cafés, refined restaurants, cultural venues and vibrant local atmosphere, the area offers an attractive balance between residential tranquillity and city-centre convenience.",
          },
          {
            label: "Close to the landmarks",
            text: "Located close to the city's major landmarks and green spaces, Pagrati provides easy access to the historic centre, Syntagma Square, the National Garden, the Panathenaic Stadium and the surrounding cultural districts.",
          },
          {
            label: "Living and investment",
            text: "Its established residential character and growing appeal among locals and international buyers make it an increasingly attractive location for both living and investment.",
          },
        ],
      },
      {
        id: "highlights",
        tab: "Location highlights",
        items: [
          { label: "Central Athens location", text: "Easy access to the historic centre." },
          { label: "Panathenaic Stadium", text: "A major landmark of the area." },
          { label: "National Garden", text: "One of the city's green spaces close by." },
          { label: "Syntagma Square", text: "Easy access to Syntagma Square." },
          {
            label: "Kolonaki and the city centre",
            text: "The Kolonaki dining and shopping district is marked on the area map.",
          },
          {
            label: "Dining and café culture",
            text: "Independent cafés and refined restaurants.",
          },
          {
            label: "Shopping and everyday amenities",
            text: "Everyday amenities close by, including the Pagrati Retail Hub.",
          },
          {
            label: "Residential and investment appeal",
            text: "An established residential character and growing appeal among locals and international buyers.",
          },
        ],
      },
    ],
  },
  ctaHeading: "Interested in the Aspasias Loft?",
  ctaText:
    "A 48 m² loft apartment with 2 bedrooms and 1 bathroom in Pagrati, at €255,000 and Golden Visa eligible. Contact us to arrange a viewing.",
};

/* EDIT HERE: every Pagrati apartment. The key is the URL slug. */
const units: Record<string, Unit> = {
  "studio-40": studio40,
  "evmenous-82": evmenous82,
  "aspasias-48": aspasias48,
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

/* Staircase divider */
function Steps({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
      className={`block h-10 w-full md:h-16 ${flip ? "rotate-180" : ""}`}
    >
      <path
        d="M0 80V66H240V52H480V38H720V24H960V10H1200V0H1440V80Z"
        fill="var(--navy)"
      />
      <path
        d="M0 66H240V52H480V38H720V24H960V10H1200V0H1440"
        fill="none"
        stroke="var(--gold-light)"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

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

/* Landscape hero photo (studio) */
function CutFrame({
  src,
  alt = "",
  priority = false,
  sizes,
  className = "",
}: {
  src: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ filter: "drop-shadow(0 28px 36px rgba(16,35,94,0.35))" }}
    >
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    </div>
  );
}

/* Portrait hero frame with a round top (arch), caption underneath */
function ArchFrame({
  src,
  alt = "",
  caption = "Pagrati, Athens",
  shape = "arch",
  priority = false,
  sizes,
  className = "",
}: {
  src: string;
  alt?: string;
  caption?: string;
  shape?: "arch" | "pediment";
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative flex h-full w-full flex-col border border-(--gold)/60 bg-white p-3 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-1.5 border border-(--gold)/40"
        />
        {[
          "left-0 top-0 border-l-2 border-t-2",
          "right-0 top-0 border-r-2 border-t-2",
          "bottom-0 left-0 border-b-2 border-l-2",
          "bottom-0 right-0 border-b-2 border-r-2",
        ].map((c) => (
          <span
            key={c}
            aria-hidden
            className={`pointer-events-none absolute h-5 w-5 border-(--gold) ${c}`}
          />
        ))}
        <div
          className={`relative min-h-0 flex-1 overflow-hidden ${
            shape === "arch" ? "rounded-t-full ring-1 ring-(--gold)/50" : ""
          }`}
          style={
            shape === "pediment"
              ? { clipPath: "polygon(0 14%, 50% 0, 100% 14%, 100% 100%, 0 100%)" }
              : undefined
          }
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(16,35,94,0.35)]"
          />
        </div>
        <p className="relative mt-3 flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark) md:text-[10px]">
          <span className="h-px w-6 bg-(--gold)/60 md:w-10" />
          <span className="font-serif italic normal-case tracking-[0.15em]">{caption}</span>
          <span className="h-px w-6 bg-(--gold)/60 md:w-10" />
        </p>
      </div>
    </div>
  );
}

const IconList = ({ items }: { items: Item[] }) => (
  <ul className="space-y-5">
    {items.map(({ Icon, text }) => (
      <li key={text} className="flex items-center gap-4 text-sm text-(--navy)/90">
        <Icon className="h-6 w-6 shrink-0 text-(--gold-dark)" />
        <span>{text}</span>
      </li>
    ))}
  </ul>
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

/* Picks the hero shape for the unit */
function HeroMedia({ u }: { u: Unit }) {
  if (u.heroVariant !== "cut") {
    return (
      <div className="relative w-[min(88%,21rem)] md:w-[min(88%,25rem)]">
        <div
          aria-hidden
          style={layer(12, -6, -25, 0, -4)}
          className={`absolute inset-0 -translate-x-5 translate-y-5 border border-(--gold)/70 ${
            u.heroVariant === "arch" ? "rounded-t-full" : ""
          }`}
        />
        <div style={layer(-8, -10, -60, 60, -5)} className="relative">
          <Reveal3D variant="zoom" delay={300} duration={1300}>
            <ArchFrame
              src={u.heroSrc}
              alt={u.heroAlt}
              caption={u.heroCaption}
              shape={u.heroVariant === "pediment" ? "pediment" : "arch"}
              priority
              sizes="(min-width:768px) 400px, 336px"
              className="aspect-[5/7] w-full"
            />
          </Reveal3D>
        </div>
      </div>
    );
  }
  return (
    <div className="relative w-full max-w-[36rem]">
      <svg
        aria-hidden
        viewBox="0 0 584 449"
        preserveAspectRatio="none"
        style={layer(-12, -6, -25, 0, 4)}
        className="absolute inset-0 h-full w-full translate-x-6 translate-y-6 overflow-visible"
      >
        <path
          d="M0 0H584V391L479 449H0Z"
          fill="none"
          stroke="var(--gold)"
          strokeOpacity="0.7"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div style={layer(8, -10, -60, 60, 5)} className="relative">
        <Reveal3D variant="zoom" delay={300} duration={1300}>
          <CutFrame
            src={u.heroSrc}
            alt={u.heroAlt}
            priority
            sizes="(min-width:768px) 576px, 95vw"
            className="aspect-[584/449] w-full"
          />
        </Reveal3D>
      </div>
    </div>
  );
}

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

export default async function PagratiApartmentPage({
  params,
}: {
  params: Promise<{ unit: string }>;
}) {
  const { unit } = await params;
  const u = units[unit];
  if (!u) notFound();

  const loc = u.location;
  /* hover / tap on a row shows the matching ring on the map (pure CSS) */
  const hoverCss = loc.places
    .map(
      (p) =>
        `.loc-explorer:has([data-place=${p.id}]:is(:hover,:focus)) [data-pin=${p.id}]{opacity:1;scale:1}`,
    )
    .join("\n");
  const arch = u.heroVariant !== "cut"; /* portrait hero (arch or pediment) */

  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      <S3Styles />
      <ScrollBar />

      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-(--sky) via-[#f6efe0] to-[#f4d9a8] pt-32 md:pt-40">
        <div aria-hidden className="absolute inset-0" style={glow("85% 85%", 0.45)} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 md:pb-32 lg:grid-cols-12">
          <div className={arch ? "lg:col-span-6" : "lg:col-span-5"}>
            <Reveal3D variant="flipLeft">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-(--navy)/70">
                {u.kicker}
              </p>
            </Reveal3D>
            <h1 className="mt-6 font-serif text-5xl font-bold uppercase leading-[1.02] tracking-tight md:text-7xl">
              <Words text={u.h1[0]} className="block" />
              <Words
                text={u.h1[1]}
                className="block"
                delay={300}
                wordClass="bg-linear-to-b from-(--gold-light) to-(--gold-dark) bg-clip-text text-transparent"
              />
            </h1>
            <Reveal3D variant="rise" delay={500}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-(--navy)/80">{u.intro}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Tag>{u.tag}</Tag>
                <span className="text-sm font-semibold text-(--navy)">{u.price}</span>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-(--navy) px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:bg-(--gold-dark)"
                >
                  Arrange a viewing
                </Link>
                <a
                  href="#rooms"
                  className="border border-(--navy)/40 bg-white/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] backdrop-blur transition hover:border-(--gold) hover:text-(--gold-dark)"
                >
                  {u.tourLabel}
                </a>
              </div>
            </Reveal3D>
          </div>

          <HeroStage
            className={`relative flex justify-center ${arch ? "lg:col-span-6" : "lg:col-span-7"}`}
          >
            <HeroMedia u={u} />
          </HeroStage>
        </div>
        <Angles className="relative opacity-70" />
      </section>

      {/* ───────── STATS · navy strip ───────── */}
      <section className="bg-(--navy)">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-(--gold)/30 px-6">
          {u.stats.map((s, i) => (
            <Reveal3D
              key={s.label}
              variant="flipCard"
              delay={i * 140}
              className="px-4 py-8 text-center md:px-8"
            >
              <dd className="font-serif text-4xl font-bold text-(--gold-light) md:text-5xl">
                <Counter to={s.n} />
              </dd>
              <dt className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/80 md:text-[11px]">
                {s.label}
              </dt>
            </Reveal3D>
          ))}
        </dl>
      </section>

      {/* ───────── PROPERTY FEATURES · cream ───────── */}
      <section className="relative bg-(--cream)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
                Property features
              </p>
              <Title title="Pagrati" sub={u.featuresSub} />
            </div>
            <Reveal3D variant="flipRight" className="lg:col-span-5">
              <p className="leading-relaxed text-(--navy)/75">{u.featuresText}</p>
            </Reveal3D>
          </div>

          <div className="mt-14 grid grid-cols-1 divide-y divide-(--gold)/30 border border-(--gold)/40 bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {u.highlights.map(({ Icon, value, label }, i) => (
              <Reveal3D
                key={label}
                variant="flipCard"
                delay={i * 100}
                className="flex flex-col items-center px-6 py-8 text-center"
              >
                <Icon className="h-9 w-9 text-(--gold-dark)" />
                <p className="mt-4 font-serif text-3xl font-bold text-(--navy)">{value}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark)">
                  {label}
                </p>
              </Reveal3D>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Reveal3D variant="flipLeft">
              <div className="h-full border border-(--gold)/40 bg-white p-8">
                <h3 className="font-serif text-xl font-bold uppercase tracking-wide">
                  Property specifications
                </h3>
                <span className="mb-7 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                <IconList items={u.specs} />
              </div>
            </Reveal3D>
            <Reveal3D variant="flipRight">
              <div className="h-full border border-(--gold)/40 bg-white p-8">
                <h3 className="font-serif text-xl font-bold uppercase tracking-wide">
                  {u.finishesTitle}
                </h3>
                <span className="mb-7 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                <IconList items={u.finishes} />
              </div>
            </Reveal3D>
          </div>
        </div>
      </section>

      {/* ───────── ROOMS · flipping book ───────── */}
      <div className="bg-(--cream)">
        <Steps />
      </div>
      <section
        id="rooms"
        className="relative -mt-px scroll-mt-20 overflow-hidden bg-(--navy-deep) px-6 py-16 md:py-24"
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "linear-gradient(180deg, var(--navy) 0%, rgba(10,23,64,0) 16%, rgba(10,23,64,0) 84%, var(--navy) 100%)",
              "radial-gradient(70% 38% at 50% 24%, rgba(29,125,181,0.55), transparent 72%)",
              "radial-gradient(75% 42% at 50% 62%, rgba(226,184,98,0.5), transparent 72%)",
            ].join(","),
          }}
        />
        {["top-0", "bottom-0"].map((pos) => (
          <div
            key={pos}
            aria-hidden
            className={`absolute inset-x-0 ${pos} h-1`}
            style={{
              backgroundImage:
                "linear-gradient(90deg, var(--aegean) 0 33.33%, var(--cream) 33.33% 66.66%, var(--gold-light) 66.66% 100%)",
            }}
          />
        ))}
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
      <div className="bg-(--cream)">
        <div className="bg-(--navy)">
          <Steps flip />
        </div>
      </div>

      {/* ───────── LOCATION · cream ───────── */}
      <section id="location" className="relative -mt-px scroll-mt-20 bg-(--cream)">
        <Paper />
        <style dangerouslySetInnerHTML={{ __html: hoverCss }} />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="loc-explorer grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* LEFT: title + paragraph + list */}
            <div className="lg:col-span-5">
              <Title title={loc.title} sub="Location" />
              <Reveal3D variant="rise" delay={150}>
                <p className="mt-8 max-w-sm text-sm leading-relaxed text-(--navy)/75">
                  {loc.intro}
                </p>
                <ul className="mt-6 border-t border-(--gold)/40">
                  {loc.places.map(({ id, name, tag }) => (
                    <li
                      key={id}
                      data-place={id}
                      tabIndex={0}
                      className="group relative flex cursor-pointer items-baseline gap-3 border-b border-(--gold)/20 py-3 text-sm text-(--navy)/85 outline-none transition-all duration-300 hover:bg-(--gold)/10 hover:pl-4 hover:text-(--navy) focus:bg-(--gold)/10 focus:pl-4 focus:text-(--navy)"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 bg-(--gold) transition-all duration-300 group-hover:h-6 group-focus:h-6"
                      />
                      <span>{name}</span>
                      <span
                        aria-hidden
                        className="min-w-4 flex-1 -translate-y-1 border-b border-dotted border-(--gold)/60 transition-colors group-hover:border-(--gold) group-focus:border-(--gold)"
                      />
                      <span className="whitespace-nowrap font-serif font-bold text-(--navy) transition-colors group-hover:text-(--gold-dark) group-focus:text-(--gold-dark)">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal3D>
            </div>

            {/* RIGHT: map plate */}
            <div className="lg:col-span-7 lg:-mr-10 xl:-mr-16">
              <Depth axis="y" rotate={-8} lift={90}>
                <div className="relative">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-(--gold)/50 md:translate-x-5 md:translate-y-5"
                  />

                  <div className="relative flex flex-col justify-center border border-(--gold)/60 bg-white p-4 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-7">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-2 border border-(--gold)/40 md:inset-3"
                    />
                    {[
                      "left-0 top-0 border-l-2 border-t-2",
                      "right-0 top-0 border-r-2 border-t-2",
                      "bottom-0 left-0 border-b-2 border-l-2",
                      "bottom-0 right-0 border-b-2 border-r-2",
                    ].map((c) => (
                      <span
                        key={c}
                        aria-hidden
                        className={`pointer-events-none absolute h-6 w-6 border-(--gold) ${c}`}
                      />
                    ))}

                    <div className="relative mb-4 flex items-center justify-center gap-4 md:mb-5">
                      <span className="h-px w-10 bg-(--gold)/60 md:w-20" />
                      <span className="font-serif text-[10px] font-semibold uppercase tracking-[0.4em] text-(--navy) md:text-xs">
                        Carte de situation
                      </span>
                      <span className="h-px w-10 bg-(--gold)/60 md:w-20" />
                    </div>

                    <div
                      className={`relative ${loc.mapAspect} w-full overflow-hidden bg-(--paper) ring-1 ring-(--gold)/50`}
                    >
                      <Image
                        src={loc.mapSrc}
                        alt={loc.mapAlt}
                        fill
                        sizes="(min-width:1024px) 58vw, 95vw"
                        className="object-cover"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-[5] shadow-[inset_0_0_70px_rgba(90,60,15,0.35)]"
                      />
                      {loc.places.map(({ id, x, y }) => (
                        <span
                          key={id}
                          data-pin={id}
                          aria-hidden
                          style={{ left: `${x}%`, top: `${y}%` }}
                          className={`pointer-events-none absolute z-10 aspect-square ${loc.pinSize} -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full border-2 border-(--gold-light) opacity-0 transition duration-300`}
                        >
                          <span className="absolute inset-0 animate-ping rounded-full bg-(--gold-light)/50" />
                        </span>
                      ))}
                    </div>

                    <div className="relative mt-4 flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark) md:mt-5 md:text-[10px]">
                      <span className="h-px w-8 bg-(--gold)/60 md:w-14" />
                      <span className="font-serif italic normal-case tracking-[0.15em]">Pagrati</span>
                      <span className="h-px w-8 bg-(--gold)/60 md:w-14" />
                    </div>
                  </div>
                </div>
              </Depth>
            </div>
          </div>

          {/* connections row, only for units that have one */}
          {loc.connections && (
            <>
              <p className="mb-6 mt-20 text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark) md:mt-24">
                {loc.connectionsTitle ?? "Connected to everything"}
              </p>
              <Reveal3D variant="rise">
                <ul className="grid grid-cols-1 divide-y divide-(--gold)/30 border-y border-(--gold)/50 sm:grid-cols-2 sm:divide-y-0 md:grid-cols-4 md:divide-x">
                  {loc.connections.map(({ Icon, label, text }, i) => (
                    <li
                      key={label}
                      className="group flex flex-col items-center px-6 py-10 text-center"
                    >
                      <span className="font-serif text-xs tracking-[0.3em] text-(--gold)">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Icon className="mt-5 h-9 w-9 text-(--navy) transition duration-500 group-hover:-translate-y-1 group-hover:text-(--gold-dark)" />
                      <span className="mt-5 block h-px w-8 bg-(--gold)/60" />
                      <span className="mt-5 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-(--navy)">
                        {label}
                      </span>
                      <span className="mt-2 max-w-[11rem] text-xs leading-relaxed text-(--navy)/65">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal3D>
            </>
          )}
        </div>
      </section>

      {/* ───────── LIFE IN PAGRATI · paper ───────── */}
      <section className="relative bg-(--paper)">
        <Paper />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Title title={u.life.title} sub={u.life.sub} />
              <Reveal3D variant="rise" delay={150}>
                <p className="mt-8 max-w-sm text-sm leading-relaxed text-(--navy)/75">
                  {u.life.intro}
                </p>
                <p className="mt-8 border-t border-(--gold)/40 pt-6 font-serif text-xl italic leading-snug text-(--gold-dark) md:text-2xl">
                  {u.life.quote}
                </p>
              </Reveal3D>
            </div>

            <div className="lg:col-span-7">
              <Reveal3D variant="zoom">
                <figure className="relative">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-(--gold)/50 md:translate-x-4 md:translate-y-4"
                  />
                  <div className="relative border border-(--gold)/60 bg-white p-3 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-5">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-2 border border-(--gold)/40 md:inset-2.5"
                    />
                    {[
                      "left-0 top-0 border-l-2 border-t-2",
                      "right-0 top-0 border-r-2 border-t-2",
                      "bottom-0 left-0 border-b-2 border-l-2",
                      "bottom-0 right-0 border-b-2 border-r-2",
                    ].map((c) => (
                      <span
                        key={c}
                        aria-hidden
                        className={`pointer-events-none absolute h-5 w-5 border-(--gold) ${c}`}
                      />
                    ))}
                    <div
                      className={`relative ${u.life.photoAspect} w-full overflow-hidden ring-1 ring-(--gold)/50`}
                    >
                      <Image
                        src={u.life.photoSrc}
                        alt={u.life.photoAlt}
                        fill
                        sizes="(min-width:1024px) 600px, 95vw"
                        className="object-cover object-center"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(90,60,15,0.35)]"
                      />
                    </div>
                    <figcaption className="relative mt-3 flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark) md:text-[10px]">
                      <span className="h-px w-8 bg-(--gold)/60 md:w-12" />
                      <span className="font-serif italic normal-case tracking-[0.15em]">
                        {u.life.caption}
                      </span>
                      <span className="h-px w-8 bg-(--gold)/60 md:w-12" />
                    </figcaption>
                  </div>
                </figure>
              </Reveal3D>
            </div>
          </div>

          <div className="mt-14 md:mt-20">
            <Reveal3D variant="rise">
              <NeighbourhoodTabs groups={u.life.groups} />
            </Reveal3D>
          </div>
        </div>
      </section>

      {/* ───────── CTA · navy with steps ───────── */}
      <div className="bg-(--paper)">
        <Steps />
      </div>
      <section
        className="relative -mt-px overflow-hidden bg-(--navy) px-6 pb-24 pt-10 text-white md:pb-32"
        style={glow("50% 0%", 0.28)}
      >
        <Depth rotate={12} lift={120}>
          <div className="relative mx-auto max-w-4xl border border-(--gold)/60 p-10 text-center md:p-16">
            <Angles className="absolute inset-x-6 top-3 opacity-60" color="%23e2b862" />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-light)">
              Aurevon Global Partners
            </p>
            <h2 className="mx-auto mt-5 max-w-xl font-serif text-3xl font-bold uppercase leading-tight md:text-5xl">
              <Words text={u.ctaHeading} className="block" />
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              {u.ctaText}
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-block bg-linear-to-b from-(--gold-light) to-(--gold) px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition hover:brightness-110"
            >
              Arrange a viewing
            </Link>
            <Angles className="absolute inset-x-6 bottom-3 opacity-60" color="%23e2b862" />
          </div>
        </Depth>
      </section>
    </main>
  );
}