import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import RoomBook from "../../../components/room-book";
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
   ONE PAGE FOR EVERY PIRAEUS APARTMENT
   File location: app/apartments/piraeus/[unit]/page.tsx
   URLs: /apartments/piraeus/<slug>   (slug = the keys of `units` below)
   To add an apartment: copy one entry in `units`, change the data, drop its images in public/images/.
   ═════════════════════════════════════════════════════════════════ */

/* EDIT HERE: palette. Same variable names as the other pages (RoomBook depends on them). */
const palette = {
  "--navy": "#10235e",
  "--navy-deep": "#0a1740",
  "--gold": "#b9791f",
  "--gold-light": "#e2b862",
  "--gold-dark": "#8f5a12",
  "--cream": "#f8f4ec",
  "--paper": "#ece7da",
  "--sky": "#d3e2ee",
  "--aegean": "#2a7aa8",
} as CSSProperties;

const grain: CSSProperties = {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .42 0 0 0 0 .34 0 0 0 0 .22 0 0 0 .12 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
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

/* Meander band (Greek key) */
const meanderBg = (color: string): CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='14'><path d='M0 13H13V1H3V10H9V4H6' fill='none' stroke='${color}' stroke-width='1.2' stroke-linejoin='miter'/></svg>")`,
  backgroundRepeat: "repeat-x",
});
const Meander = ({
  className = "",
  color = "%23b9791f",
}: {
  className?: string;
  color?: string;
}) => (
  <div aria-hidden className={`h-3.5 ${className}`} style={meanderBg(color)} />
);

/* ───────── IMAGES ─────────
   All files go in public/images/. If your files are .jpg, change EXT to "jpg".

   SHARED (same for every Piraeus unit)
     piraeus-aerial.png        the aerial map from page 2 of the brochure (crop to just the map)
     piraeus-theatre.png       Municipal Theatre photo (crop off the text)
     piraeus-mikrolimano.png   Mikrolimano photo (crop off the text)

   43 m² GROUND FLOOR
     piraeus-cover.png         brochure cover (crop out the title text and "Golden Visa Eligible")
     interior-1 … interior-7   kitchen, open plan, living, dining, lounge, entrance, bathroom
     piraeus-map.png           the "Location" map only (no title, no distance list)

   94 m² GROUND FLOOR (numbered in the order of your upload)
     p94-1.png  double-height living with the mezzanine and the arc lamp
     p94-2.png  living room looking at the staircase (purple lens flare)
     p94-3.png  grey sectional, brick wall and concrete ceiling
     p94-4.png  leather sofa and the timber slat column
     p94-5.png  lounge with the three framed prints and the staircase
     p94-6.png  bedroom
     p94-7.png  garden terrace with the pergola and dining table
     p94-8.png  indoor plants / garden room
     p94-9.png  street facade
*/
const FOLDER = "/images";
const EXT = "png";
const img = (n: string) => `${FOLDER}/${n}.${EXT}`;

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

const PinIcon = icon(
  <>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.3" />
  </>,
);
const WaveIcon = icon(
  <>
    <path d="M3 9c2 0 2-1.5 4.5-1.5S10 9 12 9s2.5-1.5 4.5-1.5S19 9 21 9" />
    <path d="M3 14c2 0 2-1.5 4.5-1.5S10 14 12 14s2.5-1.5 4.5-1.5S19 14 21 14" />
    <path d="M3 19c2 0 2-1.5 4.5-1.5S10 19 12 19s2.5-1.5 4.5-1.5S19 19 21 19" />
  </>,
);
const HouseIcon = icon(
  <>
    <path d="M3.5 11.5L12 4l8.5 7.5" />
    <path d="M5.5 10v10h13V10" />
    <path d="M10 20v-5.5h4V20" />
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
const FloorIcon = icon(
  <>
    <path d="M3 8l9-4 9 4-9 4z" />
    <path d="M3 12l9 4 9-4" />
    <path d="M3 16l9 4 9-4" />
  </>,
);
const EuroIcon = icon(
  <>
    <path d="M17.5 7.2A6 6 0 0 0 13 5.5c-3.3 0-6 2.9-6 6.5s2.7 6.5 6 6.5a6 6 0 0 0 4.5-1.7" />
    <path d="M4.5 10.5h9M4.5 13.5h9" />
  </>,
);
const KeyIcon = icon(
  <>
    <circle cx="8" cy="12" r="3.5" />
    <path d="M11.5 12H21M17 12v3M20 12v2" />
  </>,
);
const SunIcon = icon(
  <>
    <circle cx="12" cy="12" r="3.5" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6L7 7M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
  </>,
);
const LayersIcon = icon(
  <>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </>,
);
const AppliancesIcon = icon(
  <>
    <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
    <path d="M5 10h14M8 6.5h2M8 13v4" />
  </>,
);
const ShowerIcon = icon(
  <>
    <path d="M5 21V8a4 4 0 0 1 4-4h3" />
    <path d="M12 4h5a2 2 0 0 1 2 2v1H12z" />
    <path d="M13 11v1M16 11v1M13 15v1M16 15v1" />
  </>,
);
const SofaIcon = icon(
  <>
    <path d="M5 11V8.5A1.5 1.5 0 0 1 6.5 7h11A1.5 1.5 0 0 1 18 8.5V11" />
    <path d="M3 13a2 2 0 0 1 4 0v1h10v-1a2 2 0 0 1 4 0v4H3z" />
    <path d="M6 17v2M18 17v2" />
  </>,
);
const ColumnsIcon = icon(
  <>
    <path d="M3.5 9L12 4l8.5 5z" />
    <path d="M6 11v7M10 11v7M14 11v7M18 11v7" />
    <path d="M4 20h16" />
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
const ShipIcon = icon(
  <>
    <path d="M3 15l2 4h14l2-4z" />
    <path d="M6 15V10h12v5M9 10V6h6v4M12 3v3" />
  </>,
);
const AnchorIcon = icon(
  <>
    <circle cx="12" cy="5.5" r="2" />
    <path d="M12 7.5V20M8 11h8" />
    <path d="M4 14a8 8 0 0 0 16 0" />
  </>,
);
const ChartIcon = icon(
  <>
    <path d="M4 20V4M4 20h16" />
    <path d="M8 15l3.5-4 3 2.5L19 8" />
  </>,
);
const PlaneIcon = icon(
  <>
    <path d="M21 4L3 11l6 2.5L11.5 20 14 14.5z" />
    <path d="M9 13.5L21 4" />
  </>,
);
const HospitalIcon = icon(
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M12 8v8M8 12h8" />
  </>,
);
const GradIcon = icon(
  <>
    <path d="M2.5 9L12 4.5 21.5 9 12 13.5z" />
    <path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />
  </>,
);
const TreeIcon = icon(
  <>
    <circle cx="12" cy="9" r="5" />
    <path d="M12 14v7M9 21h6" />
  </>,
);
const WifiIcon = icon(
  <>
    <path d="M3 9.5a13 13 0 0 1 18 0" />
    <path d="M6 13a8.5 8.5 0 0 1 12 0" />
    <path d="M9 16.5a4 4 0 0 1 6 0" />
    <circle cx="12" cy="19.5" r=".7" />
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
const PergolaIcon = icon(
  <>
    <path d="M3 8h18M5 8l-1.5 3M9 8l-1.5 3M13 8l-1.5 3M17 8l-1.5 3M21 8l-1.5 3" />
    <path d="M5 11v9M19 11v9" />
  </>,
);

/* ═════════ UNIT DATA ═════════ */
type Room = { id: string; group: string; title: string; text: string; src: string; alt: string };
type Stat = { n?: number; text?: string; label: string };
type Place = { id: string; name: string; tag: string; x: number; y: number };
type Distance = { Icon: IconType; label: string; value: string };

type Unit = {
  metaTitle: string;
  metaDescription: string;
  /* hero */
  kicker: string;
  h1: [string, string];
  intro: string;
  tag: string;
  price: string;
  coverSrc: string;
  coverAlt: string;
   aerialSrc?: string;
  heroVariant?: "pediment" | "arch" | "plate" | "collage";
  heroFlip?: boolean;
  heroCaption?: string;
  heroSecondSrc?: string;
  heroSecondAlt?: string;
  /* strip + features */
  stats: Stat[];
  featuresSub: string;
  featuresText: string;
  highlights: { Icon: IconType; value: string; label: string }[];
  specs: { Icon: IconType; text: string }[];
  features: { Icon: IconType; text: string }[];
  /* book */
  rooms: Room[];
  chapters: { range: string; label: string }[];
  /* location (leave out if the brochure page isn't ready: the section is skipped) */
  location?: {
    title: string;
    intro: string;
    mapSrc: string;
    mapAlt: string;
    places: Place[];
    distances: Distance[];
  };
  /* closing card */
  ctaHeading: string;
  ctaText: string;
};

/* ───── 43 m² ground floor ───── */
const ground43: Unit = {
  metaTitle: "Ground Floor Apartment in Piraeus, Golden Visa Eligible | Aurevon Global Partners",
  metaDescription:
    "A renovated 43 m² ground floor apartment in Piraeus, Athens. 1 bedroom, 1 bathroom, €250,000. Golden Visa eligible, 4 minutes on foot to Freatida Beach and close to Mikrolimano.",
  kicker: "Piraeus, Athens, 43 m²",
  h1: ["Ground Floor", "Apartment"],
  intro:
    "A renovated 43 m² apartment with 1 bedroom and 1 bathroom, a short walk from Freatida Beach and close to Mikrolimano.",
  tag: "Golden Visa eligible",
  price: "€250,000",
  coverSrc: img("piraeus-ground-floor-cover"),
  coverAlt:
    "Piraeus at night: the neoclassical Municipal Theatre lit up in front of the Mikrolimano harbour",
  stats: [
    { n: 1, label: "Bedroom" },
    { n: 1, label: "Bathroom" },
    { n: 43, label: "m² interior" },
    { text: "€250,000", label: "Asking price" },
  ],
  featuresSub: "A modern city apartment by the Saronic Gulf",
  featuresText:
    "A compact, fully renovated ground floor home with marble-effect floors, a fitted kitchen and a clean European finish, in one of Athens’ most connected neighbourhoods.",
  highlights: [
    { Icon: WaveIcon, value: "4 min", label: "On foot to Freatida Beach" },
    { Icon: HospitalIcon, value: "3 min", label: "On foot to Metaxa Hospital" },
    { Icon: KeyIcon, value: "Golden Visa", label: "Eligible" },
  ],
  specs: [
    { Icon: HouseIcon, text: "43 sq.m. apartment" },
    { Icon: BedIcon, text: "1 Bedroom" },
    { Icon: BathIcon, text: "1 Bathroom" },
    { Icon: FloorIcon, text: "Ground floor" },
    { Icon: EuroIcon, text: "€250,000" },
  ],
  features: [
    { Icon: KeyIcon, text: "Golden Visa eligible" },
    { Icon: LayersIcon, text: "Polished marble-effect floors" },
    { Icon: SunIcon, text: "LED-lined ceilings throughout" },
    { Icon: AppliancesIcon, text: "Fitted kitchen with built-in appliances" },
    { Icon: SofaIcon, text: "Open-plan living and dining area" },
    { Icon: ShowerIcon, text: "Modern bathroom with walk-in shower" },
  ],
  rooms: [
    {
      id: "kitchen",
      group: "Kitchen",
      title: "The kitchen",
      text: "Dark handleless cabinets, a marble-effect splashback and built-in appliances, lit by a slim LED ceiling line.",
      src: img("piraeus-ground-floor-interior-1"),
      alt: "Modern kitchen with dark cabinets, a marble-effect splashback and a steel fridge",
    },
    {
      id: "open-plan",
      group: "Kitchen",
      title: "Open plan",
      text: "Kitchen, dining and lounge flow into one bright space, with a dark stone feature wall behind the TV.",
      src: img("piraeus-ground-floor-interior-2"),
      alt: "Open-plan interior with LED ceiling lines, a stone TV wall and a kitchen at the back",
    },
    {
      id: "living",
      group: "Living",
      title: "Living and dining",
      text: "Polished marble-effect floors run through the apartment, with room for a sofa and a dining table for two.",
      src: img("piraeus-ground-floor-interior-3"),
      alt: "Living and dining area with a grey sofa, black dining set and polished floors",
    },
    {
      id: "dining",
      group: "Living",
      title: "The dining corner",
      text: "A quiet corner with a pendant light and a framed print of Piraeus.",
      src: img("piraeus-ground-floor-interior-4"),
      alt: "Dining corner with a round black table, two chairs and a pendant light",
    },
    {
      id: "lounge",
      group: "Living",
      title: "The lounge",
      text: "A grey sofa bed and sculpted wall panels, with the sleeping area set behind frosted glass.",
      src: img("piraeus-ground-floor-interior-5"),
      alt: "Lounge with a grey sofa, two relief wall panels and an oval coffee table",
    },
    {
      id: "entrance",
      group: "Living",
      title: "Entrance and work corner",
      text: "A security door, softly lit steps and a small desk by the window.",
      src: img("piraeus-ground-floor-interior-6"),
      alt: "Entrance door with lit steps, a desk and a window",
    },
    {
      id: "bathroom",
      group: "Bath",
      title: "The bathroom",
      text: "A walk-in shower, wall-hung toilet and a floating vanity with a backlit mirror.",
      src: img("piraeus-ground-floor-interior-7"),
      alt: "Modern bathroom with a glass shower, wall-hung toilet and a floating vanity",
    },
  ],
  chapters: [
    { range: "I – II", label: "Kitchen & open plan" },
    { range: "III – VI", label: "Living & dining" },
    { range: "VII", label: "Bathroom" },
  ],
  location: {
    title: "By the sea, close to everything.",
    intro:
      "The beach and the hospital are a few minutes on foot. Hover or tap a place to find it on the map.",
    mapSrc: img("piraeus-ground-floor-map"),
    mapAlt:
      "Map of Piraeus showing the apartment, Freatida Beach, the hospital, the Municipal Theatre and the metro station",
    places: [
      { id: "apartment", name: "The apartment", tag: "Your property", x: 34, y: 60 },
      { id: "hospital", name: "Metaxa Anticancer Hospital", tag: "3 min on foot", x: 43, y: 62 },
      { id: "beach", name: "Freatida Beach", tag: "4 min on foot", x: 75, y: 57 },
      { id: "theatre", name: "Municipal Theatre", tag: "10 min by car", x: 41, y: 15 },
      { id: "metro", name: "Dimotiko Theatro Metro Station", tag: "10 min by car", x: 55, y: 14 },
    ],
    distances: [
      { Icon: PinIcon, label: "Athens city centre (Syntagma)", value: "≈ 25 min drive" },
      { Icon: ColumnsIcon, label: "Acropolis of Athens", value: "≈ 25 min drive" },
      { Icon: GradIcon, label: "University of Piraeus", value: "≈ 10 min drive" },
      { Icon: PlaneIcon, label: "Athens International Airport", value: "≈ 50 min drive" },
    ],
  },
  ctaHeading: "Interested in the Piraeus apartment?",
  ctaText:
    "A 43 m² ground floor apartment with 1 bedroom and 1 bathroom at €250,000, Golden Visa eligible, with the beach 4 minutes on foot. Contact us to arrange a viewing.",
};

/* ───── 94 m² ground floor (with attic and private garden) ───── */
const ground94: Unit = {
  metaTitle: "Ground Floor Apartment in Piraeus, 94 m² with Garden | Aurevon Global Partners",
  metaDescription:
    "A 94 m² smart-home ground floor apartment with attic and a 50 m² private garden in Piraeus, Athens. 2 bedrooms, 2 bathrooms, €350,000.",
  kicker: "Piraeus, Athens, 94 m²",
  h1: ["Ground Floor", "Apartment"],
  intro:
    "A 94 m² smart home with an attic, 2 bedrooms, 2 bathrooms and a 50 m² private garden, in the heart of Piraeus.",
  tag: "Private garden",
  price: "€350,000",
  coverSrc: img("piraeus-ground-floor-interior-94sqm-8"),
  coverAlt: "Garden terrace with a timber pergola, dining table and stone-paved garden",
  heroVariant: "arch",
  heroFlip: true,
  heroCaption: "Private garden",
  stats: [
    { n: 2, label: "Bedrooms" },
    { n: 2, label: "Bathrooms" },
    { n: 94, label: "m² with attic" },
    { text: "€350,000", label: "Asking price" },
  ],
  featuresSub: "A smart home with its own garden",
  featuresText:
    "A double-height living space with a mezzanine and attic, warm timber details and a 50 m² private garden, set in one of Athens’ most connected neighbourhoods.",
  highlights: [
    { Icon: WifiIcon, value: "Smart Home", label: "Connected living" },
    { Icon: TreeIcon, value: "50 m²", label: "Private garden" },
    { Icon: FloorIcon, value: "94 m²", label: "Including the attic" },
  ],
  specs: [
    { Icon: HouseIcon, text: "94 sq.m. with attic" },
    { Icon: BedIcon, text: "2 Bedrooms" },
    { Icon: BathIcon, text: "2 Bathrooms" },
    { Icon: TreeIcon, text: "50 sq.m. private garden" },
    { Icon: WifiIcon, text: "Smart home" },
    { Icon: EuroIcon, text: "€350,000" },
  ],
  /* only what is visible in the renders; add anything else the brochure lists */
  features: [
    { Icon: WifiIcon, text: "Smart home system" },
    { Icon: StairsIcon, text: "Double-height living with a steel-and-timber staircase" },
    { Icon: SlatsIcon, text: "Timber slat feature column" },
    { Icon: PergolaIcon, text: "Garden terrace with a timber pergola and deck" },
    { Icon: TreeIcon, text: "Landscaped garden with stone paving" },
    { Icon: SofaIcon, text: "Indoor planting and a garden room" },
  ],
  rooms: [
    {
      id: "facade",
      group: "Exterior",
      title: "The facade",
      text: "Stone and timber details, a perforated screen and planting at the street entrance.",
      src: img("piraeus-ground-floor-interior-94sqm-9"),
      alt: "Street facade with a perforated white screen, timber detailing and planting",
    },
    {
      id: "living",
      group: "Living",
      title: "Double-height living",
      text: "A tall living space with black-framed glazing, a mezzanine above and the open kitchen to the right.",
      src: img("piraeus-ground-floor-interior-94sqm-1"),
      alt: "Double-height living room with a mezzanine, black-framed glazing and an arc lamp",
    },
    {
      id: "staircase",
      group: "Living",
      title: "Towards the staircase",
      text: "A floating timber staircase climbs to the upper level beside the lounge.",
      src: img("piraeus-ground-floor-interior-94sqm-2"),
      alt: "Living room with a cream sofa, a timber staircase and tall glazing",
    },
    {
      id: "lounge",
      group: "Living",
      title: "The lounge",
      text: "A relaxed seating area under the arc lamp, with the staircase and gallery wall behind.",
      src: img("piraeus-ground-floor-interior-94sqm-5"),
      alt: "Lounge with a sectional sofa, three framed prints and a steel-and-timber staircase",
    },
    {
      id: "timber",
      group: "Living",
      title: "Timber and leather",
      text: "A slatted timber column divides the living area from the kitchen.",
      src: img("piraeus-ground-floor-interior-94sqm-3"),
      alt: "Living area with a leather sofa, a TV wall and a timber slat column",
    },
    {
      id: "kitchen-living",
      group: "Living",
      title: "Living and kitchen",
      text: "An industrial alternative: concrete, exposed brick and a large grey sectional beside the open kitchen.",
      src: img("piraeus-ground-floor-interior-94sqm-4"),
      alt: "Industrial-style living area with a grey sectional, concrete walls and a brick kitchen wall",
    },
    {
      id: "bedroom",
      group: "Bedroom",
      title: "The bedroom",
      text: "Soft natural tones, oak flooring and sculpted wall panels above an upholstered bed.",
      src: img("piraeus-ground-floor-interior-94sqm-6"),
      alt: "Bedroom with an upholstered grey bed, oak floor and relief wall panels",
    },
    {
      id: "terrace",
      group: "Garden",
      title: "The garden terrace",
      text: "A timber deck and pergola for outdoor dining, opening to a stone-paved garden.",
      src: img("piraeus-ground-floor-interior-94sqm-7"),
      alt: "Garden terrace with a timber pergola, dining table and stone-paved garden",
    },
    {
      id: "garden-room",
      group: "Garden",
      title: "The garden room",
      text: "Dense planting brings the garden right up to the glazing of the living space.",
      src: img("piraeus-ground-floor-interior-94sqm-8"),
      alt: "Planted garden room next to the living space with large glass doors",
    },
  ],
  chapters: [
    { range: "I", label: "Exterior" },
    { range: "II – VI", label: "Living" },
    { range: "VII", label: "Bedroom" },
    { range: "VIII – IX", label: "Garden" },
  ],
  /* no `location` yet: send the location page of the 94 m² brochure and it gets added here */
  ctaHeading: "Interested in the Piraeus apartment?",
  ctaText:
    "A 94 m² smart-home apartment with attic, 2 bedrooms, 2 bathrooms and a 50 m² private garden at €350,000. Contact us to arrange a viewing.",
};
/* ───── 71 m² first floor (fully furnished) ─────
   PASTE THIS BLOCK right above the line:  /* EDIT HERE: every Piraeus apartment. The key is the URL slug. */
/*
     piraeus-first-floor-71sqm-aerial.png   page 1 aerial map, crop to just the map (keeps this unit's cyan circle)
     piraeus-first-floor-71sqm-1.png        kitchen and dining table
     piraeus-first-floor-71sqm-2.png        living room with the three mountain prints
     piraeus-first-floor-71sqm-3.png        living and dining towards the windows and TV
     piraeus-first-floor-71sqm-4.png        master bedroom with the white wardrobe
     piraeus-first-floor-71sqm-5.png        second bedroom with the single bed and desk
     piraeus-first-floor-71sqm-6.png        second bedroom, work corner with the orange print
     piraeus-first-floor-71sqm-7.png        bathroom
     piraeus-first-floor-71sqm-plan.png     floor plan only (crop off the icons and specs below it)
   The cover reuses piraeus-ground-floor-cover (no 1st floor cover was sent). */



const first71: Unit = {
  metaTitle: "1st Floor Apartment in Piraeus, 71 m² Fully Furnished | Aurevon Global Partners",
  metaDescription:
    "A fully furnished 71 m² first floor apartment in Piraeus, Athens. 2 bedrooms, 2 bathrooms, electric appliances included, €400,000.",
  kicker: "Piraeus, Athens, 71 m²",
  h1: ["1st Floor", "Apartment"],
  intro:
    "A fully furnished 71 m² apartment with 2 bedrooms, 2 bathrooms and electric appliances, in the heart of Piraeus.",
  tag: "Fully furnished",
  price: "€400,000",
  coverSrc: img("piraeus-first-floor-interior-71sqm-2"),
  coverAlt: "Living room with two sofas, a marble coffee table and three framed mountain prints",
  heroVariant: "plate",
  heroCaption: "The living room",
  aerialSrc: img("piraeus-ground-floor-map"),
  stats: [
    { n: 2, label: "Bedrooms" },
    { n: 2, label: "Bathrooms" },
    { n: 71, label: "m² interior" },
    { text: "€400,000", label: "Asking price" },
  ],
  featuresSub: "A fully furnished city apartment",
  featuresText:
    "A bright first floor apartment with an open kitchen and living area, two bedrooms and two bathrooms, fully furnished and equipped with electric appliances, in one of Athens’ most connected neighbourhoods.",
  highlights: [
    { Icon: SofaIcon, value: "Furnished", label: "Fully furnished" },
    { Icon: AppliancesIcon, value: "Electric", label: "Appliances included" },
    { Icon: FloorIcon, value: "1st Floor", label: "Level" },
  ],
  specs: [
    { Icon: HouseIcon, text: "71 sq.m. apartment" },
    { Icon: BedIcon, text: "2 Bedrooms" },
    { Icon: BathIcon, text: "2 Bathrooms" },
    { Icon: FloorIcon, text: "First floor" },
    { Icon: SofaIcon, text: "Fully furnished" },
    { Icon: AppliancesIcon, text: "Electric appliances" },
    { Icon: EuroIcon, text: "€400,000" },
  ],
  /* only what is visible in the renders and the brochure; add anything else it lists */
  features: [
    { Icon: SofaIcon, text: "Fully furnished throughout" },
    { Icon: AppliancesIcon, text: "Electric appliances included" },
    { Icon: HouseIcon, text: "Open-plan kitchen, living and dining area" },
    { Icon: SunIcon, text: "Tall windows and a balcony" },
    { Icon: ShowerIcon, text: "Marble-effect bathroom with a heated towel rail" },
    { Icon: BedIcon, text: "Second bedroom with a work desk" },
  ],
  rooms: [
    {
      id: "kitchen",
      group: "Kitchen",
      title: "The kitchen",
      text: "Handleless white cabinets, a stone-effect splashback and a timber worktop, with a built-in oven and the dining table alongside.",
      src: img("piraeus-first-floor-interior-71sqm-1"),
      alt: "Open kitchen with white cabinets, a timber worktop and a dining table with timber chairs",
    },
    {
      id: "living",
      group: "Living",
      title: "The living room",
      text: "Soft grey seating with blue cushions, a marble-top coffee table and a triptych of mountain prints.",
      src: img("piraeus-first-floor-interior-71sqm-2"),
      alt: "Living room with two sofas, a marble coffee table and three framed mountain prints",
    },
    {
      id: "living-view",
      group: "Living",
      title: "Living and dining",
      text: "The living area opens to tall windows and a balcony, with the dining table beside it.",
      src: img("piraeus-first-floor-interior-71sqm-3"),
      alt: "Living and dining area with a TV wall, tall windows with sheer curtains and a dining table",
    },
    {
      id: "master",
      group: "Bedrooms",
      title: "The master bedroom",
      text: "A calm room with a large white wardrobe, an upholstered headboard and warm terracotta tones.",
      src: img("piraeus-first-floor-interior-71sqm-4"),
      alt: "Master bedroom with a double bed, a terracotta throw and a tall white wardrobe",
    },
    {
      id: "bedroom-2",
      group: "Bedrooms",
      title: "The second bedroom",
      text: "A single bed and a work desk by the window, under a woven pendant light.",
      src: img("piraeus-first-floor-interior-71sqm-5"),
      alt: "Second bedroom with a single bed, a desk by the window and a woven pendant light",
    },
    {
      id: "work-corner",
      group: "Bedrooms",
      title: "The work corner",
      text: "A compact desk by the window with a wire chair, beside a framed print.",
      src: img("piraeus-first-floor-interior-71sqm-6"),
      alt: "Desk with a wire chair by a window and a framed terracotta print above the bed",
    },
    {
      id: "bathroom",
      group: "Bath",
      title: "The bathroom",
      text: "Marble-effect walls and floor, a walk-in shower with a rain head, a round basin and a heated towel rail.",
      src: img("piraeus-first-floor-interior-71sqm-7"),
      alt: "Marble-effect bathroom with a walk-in shower, a round basin and a heated towel rail",
    },
    {
      id: "plan",
      group: "Plan",
      title: "The floor plan",
      text: "Two bedrooms, two bathrooms and an open kitchen and living area, seen from above.",
      src: img("piraeus-first-floor-71sqm-plan"),
      alt: "Top-down floor plan of the apartment showing two bedrooms, two bathrooms, the kitchen and the living area",
    },
  ],
  chapters: [
    { range: "I – III", label: "Kitchen & living" },
    { range: "IV – VI", label: "Bedrooms" },
    { range: "VII", label: "Bathroom" },
    { range: "VIII", label: "Floor plan" },
  ],
  /* no `location` yet: send the location page of the 71 m² brochure (if it has one) and it gets added here */
  ctaHeading: "Interested in the Piraeus apartment?",
  ctaText:
    "A fully furnished 71 m² first floor apartment with 2 bedrooms, 2 bathrooms and electric appliances at €400,000. Contact us to arrange a viewing.",
};
/* EDIT HERE: every Piraeus apartment. The key is the URL slug. */

/* ───── 101 m² apartment (fully furnished, 3 bedrooms) ─────
   PASTE THIS BLOCK right BELOW the `first71` block and ABOVE `const units`.
   (It has to come after first71 because it reuses its renders.)

   IMAGES: only ONE new file is needed
     piraeus-apartment-101sqm-plan.png   floor plan only (crop off the icons and specs below it)
   Everything else reuses the 71 m² renders (piraeus-first-floor-interior-71sqm-1 … 7). */
const first71Renders = first71.rooms.filter((r) => r.id !== "plan");

const apartment101: Unit = {
  metaTitle: "Fully Furnished 101 m² Apartment in Piraeus, 3 Bedrooms | Aurevon Global Partners",
  metaDescription:
    "A fully furnished 101 m² apartment in Piraeus, Athens. 3 bedrooms, 2 bathrooms, electric appliances included, €420,000.",
  kicker: "Piraeus, Athens, 101 m²",
  h1: ["Piraeus", "Apartment"],
  intro:
    "A fully furnished 101 m² apartment with 3 bedrooms, 2 bathrooms and electric appliances, in the heart of Piraeus.",
   tag: "Fully furnished",
  price: "€420,000",
  coverSrc: img("piraeus-first-floor-interior-71sqm-1"),
  coverAlt: "Open kitchen with white cabinets, a timber worktop and a dining table with timber chairs",
  heroVariant: "collage",
  heroFlip: true,
  heroSecondSrc: img("piraeus-first-floor-interior-71sqm-4"),
  heroSecondAlt: "Master bedroom with a double bed, a terracotta throw and a tall white wardrobe",
  stats: [
    { n: 3, label: "Bedrooms" },
    { n: 2, label: "Bathrooms" },
    { n: 101, label: "m² interior" },
    { text: "€420,000", label: "Asking price" },
  ],
  featuresSub: "A spacious, fully furnished city apartment",
  featuresText:
    "A generous apartment with an open kitchen and living area, three bedrooms and two bathrooms, fully furnished and equipped with electric appliances, in one of Athens’ most connected neighbourhoods.",
  highlights: [
    { Icon: SofaIcon, value: "Furnished", label: "Fully furnished" },
    { Icon: AppliancesIcon, value: "Electric", label: "Appliances included" },
    { Icon: BedIcon, value: "3", label: "Bedrooms" },
  ],
  specs: [
    { Icon: HouseIcon, text: "101 sq.m. apartment" },
    { Icon: BedIcon, text: "3 Bedrooms" },
    { Icon: BathIcon, text: "2 Bathrooms" },
    { Icon: SofaIcon, text: "Fully furnished" },
    { Icon: AppliancesIcon, text: "Electric appliances" },
    { Icon: EuroIcon, text: "€420,000" },
  ],
  /* only what the brochure and the renders show; add anything else it lists */
  features: [
    { Icon: SofaIcon, text: "Fully furnished throughout" },
    { Icon: AppliancesIcon, text: "Electric appliances included" },
    { Icon: HouseIcon, text: "Open-plan kitchen, living and dining area" },
    { Icon: BedIcon, text: "Three bedrooms and two bathrooms" },
    { Icon: SunIcon, text: "Tall windows and a balcony" },
    { Icon: ShowerIcon, text: "Marble-effect bathroom with a heated towel rail" },
  ],
  rooms: [
    ...first71Renders,
    {
      id: "plan",
      group: "Plan",
      title: "The floor plan",
      text: "Three bedrooms, two bathrooms and a large open kitchen and living area, seen from above.",
      src: img("piraeus-apartment-101sqm-plan"),
      alt: "Top-down floor plan of the apartment showing three bedrooms, two bathrooms, the kitchen and the living area",
    },
  ],
  chapters: first71.chapters,
  /* no `location` yet: send the location page of the 101 m² brochure (if it has one) and it gets added here */
  ctaHeading: "Interested in the Piraeus apartment?",
  ctaText:
    "A fully furnished 101 m² apartment with 3 bedrooms, 2 bathrooms and electric appliances at €420,000. Contact us to arrange a viewing.",
};
const units: Record<string, Unit> = {
  "ground-floor-43": ground43,
  "ground-floor-94": ground94,
  "first-floor-71": first71,
  "apartment-101": apartment101,
};

/* ═════════ SHARED PIRAEUS CONTENT (same for every unit) ═════════ */
const overviewParas: ReactNode[] = [
  <>
    Piraeus is more than just the <strong>largest passenger port in Europe</strong>. It is one
    of Athens&rsquo; most dynamic and strategic neighbourhoods, set on the{" "}
    <strong>Saronic Gulf</strong> with a mix of urban convenience, coastal charm and{" "}
    <strong>strong investment potential</strong>.
  </>,
  <>
    <strong>Metro and tram connections</strong> reach the city centre and the airport, and{" "}
    <strong>constant ferry access</strong> links the port to the islands. Recent years brought
    modern marinas and <strong>upgraded public spaces</strong>, with growing commercial interest
    from global hospitality and cruise brands.
  </>,
  <>
    For residential investment, vacation rentals or mixed-use projects, Piraeus offers{" "}
    <strong>year-round demand</strong>, <strong>strong rental yields</strong> and a rich mix of
    local culture and global connectivity.
  </>,
];

const destination: { Icon: IconType; label: string; text: string }[] = [
  {
    Icon: AnchorIcon,
    label: "Europe's largest passenger port",
    text: "A working harbour with cruise terminals and constant ferry links to the islands.",
  },
  {
    Icon: TrainIcon,
    label: "Metro and tram",
    text: "Direct connections to the city centre and the airport.",
  },
  {
    Icon: WaveIcon,
    label: "Marinas and seafront",
    text: "Modern marinas and upgraded public spaces along the Saronic Gulf.",
  },
  {
    Icon: ColumnsIcon,
    label: "Culture",
    text: "A restored neoclassical theatre hosting concerts and events all year.",
  },
  {
    Icon: ShipIcon,
    label: "Hospitality",
    text: "Growing interest from global hospitality and cruise brands.",
  },
  {
    Icon: ChartIcon,
    label: "Rental demand",
    text: "Year-round demand and strong rental yields for long-term and vacation lets.",
  },
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

/* Pediment divider (a shallow triangle, like the Municipal Theatre's gable) */
function Pediment({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden
      className={`block h-10 w-full md:h-14 ${flip ? "rotate-180" : ""}`}
    >
      <path d="M0 60V46L720 6L1440 46V60Z" fill="var(--navy)" />
      <path
        d="M0 46L720 6L1440 46"
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

/* clip the photo into a gable (pediment) top, echoing the Municipal Theatre */
const gable: CSSProperties = {
  clipPath: "polygon(0 14%, 50% 0, 100% 14%, 100% 100%, 0 100%)",
};

/* Portrait hero frame: gable top (pediment) or round top (arch) */
function HeroFrame({
  src,
  alt = "",
  caption = "Piraeus, Athens",
  shape = "pediment",
  priority = false,
  sizes,
  className = "",
}: {
  src: string;
  alt?: string;
  caption?: string;
  shape?: "pediment" | "arch";
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
          style={shape === "pediment" ? gable : undefined}
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
 
/* Landscape hero: one big photo with a smaller one overlapping the corner */
function HeroCollage({
  src,
  alt,
  src2,
  alt2 = "",
}: {
  src: string;
  alt: string;
  src2?: string;
  alt2?: string;
}) {
  return (
    <div className="relative pb-12 pl-8">
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-3 translate-y-3 border border-(--gold)/50"
        />
        <div className="relative border border-(--gold)/60 bg-white p-3 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden ring-1 ring-(--gold)/50">
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="(min-width:1024px) 520px, 95vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(16,35,94,0.3)]"
            />
          </div>
        </div>
      </div>
      {src2 && (
        <div className="absolute bottom-0 left-0 w-[40%] border border-(--gold)/60 bg-white p-2 shadow-[0_30px_50px_-20px_rgba(16,35,94,0.6)] md:p-3">
          <div className="relative aspect-[3/4] w-full overflow-hidden ring-1 ring-(--gold)/50">
            <Image src={src2} alt={alt2} fill sizes="220px" className="object-cover" />
          </div>
        </div>
      )}
    </div>
  );
}
 
/* Picks the hero shape for the unit */
function HeroMedia({ u }: { u: Unit }) {
  const v = u.heroVariant ?? "pediment";
  const caption = u.heroCaption ?? "Piraeus, Athens";
  if (v === "plate") {
    return (
      <Plate
        src={u.coverSrc}
        alt={u.coverAlt}
        caption={caption}
        aspect="aspect-[4/3]"
        sizes="(min-width:1024px) 520px, 95vw"
      />
    );
  }
  if (v === "collage") {
    return (
      <HeroCollage
        src={u.coverSrc}
        alt={u.coverAlt}
        src2={u.heroSecondSrc}
        alt2={u.heroSecondAlt}
      />
    );
  }
  return (
    <HeroFrame
      src={u.coverSrc}
      alt={u.coverAlt}
      caption={caption}
      shape={v === "arch" ? "arch" : "pediment"}
      priority
      sizes="(min-width:768px) 400px, 336px"
      className="aspect-[5/7] w-full"
    />
  );
}
 

function Plate({
  src,
  alt,
  caption,
  sizes,
  className = "",
  aspect = "aspect-[4/5]",
  fit = "object-cover",
}: {
  src: string;
  alt: string;
  caption: string;
  sizes: string;
  className?: string;
  aspect?: string;
  fit?: "object-cover" | "object-contain";
}) {
  return (
    <figure className={`relative ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-(--gold)/50"
      />
      <div className="relative border border-(--gold)/60 bg-white p-3 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-2 border border-(--gold)/40"
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
        <div className={`relative ${aspect} w-full overflow-hidden ring-1 ring-(--gold)/50`}>
          <Image src={src} alt={alt} fill sizes={sizes} className={`${fit} object-center`} />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(16,35,94,0.3)]"
          />
        </div>
        <figcaption className="relative mt-3 flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark) md:text-[10px]">
          <span className="h-px w-6 bg-(--gold)/60 md:w-10" />
          <span className="font-serif italic normal-case tracking-[0.15em]">{caption}</span>
          <span className="h-px w-6 bg-(--gold)/60 md:w-10" />
        </figcaption>
      </div>
    </figure>
  );
}

const IconList = ({ items }: { items: { Icon: IconType; text: string }[] }) => (
  <ul className="space-y-5">
    {items.map(({ Icon, text }) => (
      <li key={text} className="flex items-center gap-4 text-sm text-(--navy)/90">
        <Icon className="h-6 w-6 shrink-0 text-(--gold-dark)" />
        <span>{text}</span>
      </li>
    ))}
  </ul>
);

function Landmark({
  src,
  alt,
  caption,
  eyebrow,
  heading,
  paras,
  reverse = false,
}: {
  src: string;
  alt: string;
  caption: string;
  eyebrow: string;
  heading: string;
  paras: ReactNode[];
  reverse?: boolean;
}) {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
      <Reveal3D
        variant="rise"
        className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}
      >
        <Plate
          src={src}
          alt={alt}
          caption={caption}
          aspect="aspect-[4/3]"
          sizes="(min-width:1024px) 540px, 95vw"
        />
      </Reveal3D>
      <Reveal3D
        variant="rise"
        delay={150}
        className={`lg:col-span-6 ${reverse ? "lg:order-1" : ""}`}
      >
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
          {eyebrow}
        </p>
        <h3 className="font-serif text-2xl font-bold uppercase leading-tight tracking-tight text-(--navy) md:text-3xl">
          {heading}
        </h3>
        <span className="mb-6 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
        <div className="space-y-4 text-sm leading-relaxed text-(--navy)/75 [&_strong]:font-semibold [&_strong]:text-(--navy)">
          {paras.map((p, j) => (
            <p key={j}>{p}</p>
          ))}
        </div>
      </Reveal3D>
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

export default async function PiraeusApartmentPage({
  params,
}: {
  params: Promise<{ unit: string }>;
}) {
  const { unit } = await params;
  const u = units[unit];
  if (!u) notFound();

  const hoverCss = u.location
    ? u.location.places
        .map(
          (p) =>
            `.loc-explorer:has([data-place=${p.id}]:is(:hover,:focus)) [data-pin=${p.id}]{opacity:1;scale:1}`,
        )
        .join("\n")
    : "";
  const hv = u.heroVariant ?? "pediment";
  const portrait = hv === "pediment" || hv === "arch";
  return (
    <main className="bg-(--cream) text-(--navy)" style={palette}>
      <S3Styles />
      <ScrollBar />

      {/* ───────── HERO · pediment-framed photo ───────── */}
      <section className="relative overflow-hidden bg-linear-to-b from-(--sky) via-(--cream) to-[#f1ddb4] pt-32 md:pt-40">
        <div aria-hidden className="absolute inset-0" style={glow("15% 85%", 0.4)} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 md:pb-32 lg:grid-cols-12">
       <HeroStage
            className={`relative flex justify-center lg:col-span-6 ${
              u.heroFlip ? "lg:order-2" : ""
            }`}
          >
            <div
              className={`relative ${
                portrait ? "w-[min(88%,21rem)] md:w-[min(88%,25rem)]" : "w-full max-w-lg"
              }`}
            >
              {portrait && (
                <div
                  aria-hidden
                  style={layer(12, -6, -25, 0, -4)}
                  className={`absolute inset-0 -translate-x-5 translate-y-5 border border-(--gold)/70 ${
                    hv === "arch" ? "rounded-t-full" : ""
                  }`}
                />
              )}
              <div style={layer(-8, -10, -60, 60, -5)} className="relative">
                <Reveal3D variant="zoom" delay={300} duration={1300}>
                  <HeroMedia u={u} />
                </Reveal3D>
              </div>
            </div>
          </HeroStage>

          <div className="lg:col-span-6">
            <Reveal3D variant="flipRight">
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
                  href="#views"
                  className="border border-(--navy)/40 bg-white/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] backdrop-blur transition hover:border-(--gold) hover:text-(--gold-dark)"
                >
                  Tour the apartment
                </a>
              </div>
            </Reveal3D>
          </div>
        </div>
        <Meander className="relative opacity-70" />
      </section>

      {/* ───────── STATS · navy strip ───────── */}
      <section className="bg-(--navy)">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-(--gold)/30 px-6 md:grid-cols-4">
          {u.stats.map((s, i) => (
            <Reveal3D
              key={s.label}
              variant="flipCard"
              delay={i * 140}
              className="px-4 py-8 text-center md:px-8"
            >
              <dd className="font-serif text-4xl font-bold text-(--gold-light) md:text-5xl">
                {s.n !== undefined ? <Counter to={s.n} /> : s.text}
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
              <Title title="Piraeus" sub={u.featuresSub} />
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
                  Property highlights
                </h3>
                <span className="mb-7 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
                <IconList items={u.features} />
              </div>
            </Reveal3D>
          </div>

          {/* overview: text left, aerial plate right (shared) */}
          <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal3D variant="rise" className="lg:col-span-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
                Overview
              </p>
              <h3 className="font-serif text-2xl font-bold uppercase leading-tight tracking-tight text-(--navy) md:text-3xl">
                More than just Europe&rsquo;s largest passenger port
              </h3>
              <span className="mb-6 mt-4 block h-0.5 w-12 bg-linear-to-r from-(--gold) to-(--gold-light)" />
              <div className="space-y-4 text-sm leading-relaxed text-(--navy)/75 [&_strong]:font-semibold [&_strong]:text-(--navy)">
                {overviewParas.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </Reveal3D>
            <Reveal3D variant="rise" delay={150} className="lg:col-span-6">
              <Plate
                src={u.aerialSrc ?? img("piraeus-ground-floor-map")}
                alt="Aerial view of Piraeus and the Saronic Gulf"
                caption="Piraeus from above"
                aspect="aspect-[4/3]"
                sizes="(min-width:1024px) 540px, 95vw"
              />
            </Reveal3D>
          </div>
        </div>
      </section>

      {/* ───────── VIEWS · flipping book ───────── */}
      <div className="bg-(--cream)">
        <Pediment />
      </div>
      <section
        id="views"
        className="relative -mt-px scroll-mt-20 overflow-hidden bg-(--navy-deep) px-6 py-16 md:py-24"
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "linear-gradient(180deg, var(--navy) 0%, rgba(10,23,64,0) 16%, rgba(10,23,64,0) 84%, var(--navy) 100%)",
              "radial-gradient(70% 38% at 50% 24%, rgba(42,122,168,0.5), transparent 72%)",
              "radial-gradient(75% 42% at 50% 62%, rgba(226,184,98,0.45), transparent 72%)",
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
            title="Step inside."
            sub={`Flip through ${u.rooms.length} views`}
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
      <div className="bg-(--paper)">
        <Pediment flip />
      </div>

      {/* ───────── LOCATION · only when the unit has location data ───────── */}
      {u.location && (
        <section id="location" className="relative -mt-px scroll-mt-20 bg-(--paper)">
          <Paper />
          <style dangerouslySetInnerHTML={{ __html: hoverCss }} />
          <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="loc-explorer grid gap-12 lg:grid-cols-12 lg:items-center">
              {/* LEFT: landscape map plate */}
              <div className="mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
                <Depth axis="y" rotate={8} lift={90}>
                  <div className="relative">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-3 translate-y-3 border border-(--gold)/50 md:-translate-x-5 md:translate-y-5"
                    />
                    <div className="relative border border-(--gold)/60 bg-white p-4 shadow-[0_40px_70px_-30px_rgba(16,35,94,0.55)] md:p-6">
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

                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-(--paper) ring-1 ring-(--gold)/50">
                        <Image
                          src={u.location.mapSrc}
                          alt={u.location.mapAlt}
                          fill
                          sizes="(min-width:1024px) 560px, 95vw"
                          className="object-cover"
                        />
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 z-[5] shadow-[inset_0_0_70px_rgba(16,35,94,0.3)]"
                        />
                        {u.location.places.map(({ id, x, y }) => (
                          <span
                            key={id}
                            data-pin={id}
                            aria-hidden
                            style={{ left: `${x}%`, top: `${y}%` }}
                            className="pointer-events-none absolute z-10 aspect-square w-[14%] -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full border-2 border-(--gold-light) opacity-0 transition duration-300"
                          >
                            <span className="absolute inset-0 animate-ping rounded-full bg-(--gold-light)/50" />
                          </span>
                        ))}
                      </div>

                      <div className="relative mt-4 flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-(--gold-dark) md:mt-5 md:text-[10px]">
                        <span className="h-px w-8 bg-(--gold)/60 md:w-12" />
                        <span className="font-serif italic normal-case tracking-[0.15em]">
                          Piraeus
                        </span>
                        <span className="h-px w-8 bg-(--gold)/60 md:w-12" />
                      </div>
                    </div>
                  </div>
                </Depth>
              </div>

              {/* RIGHT: title + intro + places list */}
              <div className="lg:col-span-6">
                <Title title={u.location.title} sub="Location" />
                <Reveal3D variant="rise" delay={150}>
                  <p className="mt-8 max-w-md text-sm leading-relaxed text-(--navy)/75">
                    {u.location.intro}
                  </p>
                  <ul className="mt-6 border-t border-(--gold)/40">
                    {u.location.places.map(({ id, name, tag }) => (
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
                        <span className="whitespace-nowrap text-xs text-(--gold-dark) group-hover:font-semibold">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal3D>
              </div>
            </div>

            {/* approximate distances */}
            <p className="mb-6 mt-20 text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
              Approximate distances from Piraeus
            </p>
            <Reveal3D variant="rise">
              <ul className="grid grid-cols-1 divide-y divide-(--gold)/30 border-y border-(--gold)/50 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                {u.location.distances.map(({ Icon, label, value }) => (
                  <li
                    key={label}
                    className="group flex flex-col items-center px-6 py-8 text-center"
                  >
                    <Icon className="h-8 w-8 text-(--navy) transition duration-500 group-hover:-translate-y-1 group-hover:text-(--gold-dark)" />
                    <span className="mt-4 block h-px w-8 bg-(--gold)/60" />
                    <span className="mt-4 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-(--navy)">
                      {label}
                    </span>
                    <span className="mt-2 font-serif text-lg text-(--gold-dark)">{value}</span>
                  </li>
                ))}
              </ul>
            </Reveal3D>
          </div>
        </section>
      )}

      {/* ───────── DISCOVER PIRAEUS · cream (shared) ───────── */}
      <section className="relative bg-(--cream)">
        <Paper />
        <div className="relative mx-auto max-w-6xl space-y-24 px-6 py-16 md:space-y-28 md:py-24">
          <Landmark
            src={img("piraeus-theatre")}
            alt="The neoclassical Municipal Theatre of Piraeus with its columns and pediment"
            caption="Municipal Theatre of Piraeus"
            eyebrow="Discover Piraeus"
            heading="Municipal Theatre of Piraeus"
            paras={[
              <>
                One of the city&rsquo;s most iconic <strong>architectural and cultural
                landmarks</strong>. This beautifully restored neoclassical building reflects
                the historical importance of Piraeus as a{" "}
                <strong>major urban and commercial centre</strong>, and stands as a symbol of
                its cultural heritage and artistic tradition.
              </>,
              <>
                Today it hosts <strong>performances, concerts and cultural events</strong>{" "}
                throughout the year for locals and visitors. Its presence has contributed to
                the <strong>revitalisation of the city centre</strong>, adding cultural appeal
                and long-term value to the surrounding area.
              </>,
            ]}
          />

          <Landmark
            reverse
            src={img("piraeus-ground-floor-mikrolimano")}
            alt="Mikrolimano harbour at dusk with boats, waterfront restaurants and colourful buildings"
            caption="Mikrolimano"
            eyebrow="Discover Piraeus"
            heading="Mikrolimano"
            paras={[
              <>
                One of the most charming and picturesque coastal areas of Piraeus, known for
                its <strong>scenic harbour</strong> and <strong>relaxed seaside
                atmosphere</strong>. Surrounded by the sea, yachts and colourful waterfront
                buildings, it combines urban life with a strong Mediterranean character.
              </>,
              <>
                Famous for <strong>high-quality restaurants, cafés and leisure spots</strong>,
                it is a popular destination day and night. Its blend of lifestyle, gastronomy
                and marina living makes it one of the <strong>most desirable locations in
                Piraeus</strong>, for residents, tourists and investors alike.
              </>,
            ]}
          />

          <div>
            <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-(--gold-dark)">
              Why Piraeus
            </p>
            <Reveal3D variant="rise">
              <ul className="grid grid-cols-1 divide-y divide-(--gold)/30 border-y border-(--gold)/50 sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
                {destination.map(({ Icon, label, text }) => (
                  <li
                    key={label}
                    className="group flex flex-col items-center px-6 py-10 text-center sm:[&:nth-child(n+3)]:border-t sm:[&:nth-child(n+3)]:border-(--gold)/30"
                  >
                    <Icon className="h-9 w-9 text-(--navy) transition duration-500 group-hover:-translate-y-1 group-hover:text-(--gold-dark)" />
                    <span className="mt-5 block h-px w-8 bg-(--gold)/60" />
                    <span className="mt-5 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-(--navy)">
                      {label}
                    </span>
                    <span className="mt-2 max-w-[15rem] text-xs leading-relaxed text-(--navy)/65">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal3D>
          </div>

          <Reveal3D variant="rise" delay={100}>
            <p className="mx-auto max-w-2xl text-center font-serif text-xl italic leading-snug text-(--gold-dark) md:text-2xl">
              &ldquo;A historic port city with the coast, culture and connections to match.&rdquo;
            </p>
          </Reveal3D>
        </div>
      </section>

      {/* ───────── CTA · navy with pediment ───────── */}
      <div className="bg-(--cream)">
        <Pediment />
      </div>
      <section
        className="relative -mt-px overflow-hidden bg-(--navy) px-6 pb-24 pt-10 text-white md:pb-32"
        style={glow("50% 0%", 0.28)}
      >
        <Depth rotate={12} lift={120}>
          <div className="relative mx-auto max-w-4xl border border-(--gold)/60 p-10 text-center md:p-16">
            <Meander className="absolute inset-x-6 top-3 opacity-60" color="%23e2b862" />
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
            <Meander className="absolute inset-x-6 bottom-3 opacity-60" color="%23e2b862" />
          </div>
        </Depth>
      </section>
    </main>
  );
}