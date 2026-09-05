export const CATEGORIES = ["ALL", "NEW", "TEES", "HOODIES", "OUTERWEAR", "BOTTOMS", "ACCESSORIES"] as const;

export type Category = (typeof CATEGORIES)[number];

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  color: string;
  categories: Category[];
  sizes: string[];
  description: string;
  details: string[];
  images: string[];
};

const u = (id: string, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=86`;

export const products: Product[] = [
  {
    id: "otr-001",
    slug: "run-heavyweight-tee",
    name: "Run Heavyweight Tee",
    price: 54,
    color: "Washed Black",
    categories: ["NEW", "TEES"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "A heavyweight everyday tee cut with a relaxed shoulder and a dense hand feel.",
    details: ["Heavyweight cotton", "Relaxed fit", "Screen printed artwork", "Cold wash recommended"],
    images: [
      u("photo-1521572163474-6864f9cf17ab"),
      u("photo-1515886657613-9f3515b0c78f"),
      u("photo-1483985988355-763728e1935b"),
      u("photo-1523381210434-271e8be1f52b"),
    ],
  },
  {
    id: "otr-002",
    slug: "after-hours-hoodie",
    name: "After Hours Hoodie",
    price: 96,
    color: "Charcoal",
    categories: ["NEW", "HOODIES"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Dense brushed fleece with a boxy body, dropped shoulder and understated OTR placement.",
    details: ["Brushed fleece", "Boxy fit", "Double-layer hood", "Ribbed cuff and hem"],
    images: [
      u("photo-1503342217505-b0a15ec3261c"),
      u("photo-1556821840-3a63f95609a7"),
      u("photo-1485230895905-ec40ba36b9bc"),
      u("photo-1496747611176-843222e1e57c"),
    ],
  },
  {
    id: "otr-003",
    slug: "service-jacket",
    name: "Service Jacket",
    price: 148,
    color: "Graphite",
    categories: ["NEW", "OUTERWEAR"],
    sizes: ["S", "M", "L", "XL"],
    description: "A clean utility shell designed to layer over sweats, tees and the rest of the daily rotation.",
    details: ["Midweight shell", "Two-way zip", "Internal pocket", "Relaxed layering fit"],
    images: [
      u("photo-1551488831-00ddcb6c6bd3"),
      u("photo-1520975954732-35dd22299614"),
      u("photo-1490481651871-ab68de25d43d"),
      u("photo-1529139574466-a303027c1d8b"),
    ],
  },
  {
    id: "otr-004",
    slug: "lane-cargo",
    name: "Lane Cargo",
    price: 118,
    color: "Black",
    categories: ["BOTTOMS"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    description: "Straight utility cargo with a clean leg, functional storage and enough room to move.",
    details: ["Cotton twill", "Straight fit", "Cargo pockets", "Adjustable hem"],
    images: [
      u("photo-1515886657613-9f3515b0c78f"),
      u("photo-1509631179647-0177331693ae"),
      u("photo-1551028719-00167b16eac5"),
      u("photo-1541099649105-f69ad21f3246"),
    ],
  },
  {
    id: "otr-005",
    slug: "garage-tee",
    name: "Garage Tee",
    price: 48,
    color: "Bone",
    categories: ["TEES"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "A softer daily tee with a slightly cropped box fit and low-key garage graphic language.",
    details: ["Midweight cotton", "Box fit", "Front and back print", "Pre-shrunk"],
    images: [
      u("photo-1521572163474-6864f9cf17ab"),
      u("photo-1445205170230-053b83016050"),
      u("photo-1523381210434-271e8be1f52b"),
      u("photo-1483985988355-763728e1935b"),
    ],
  },
  {
    id: "otr-006",
    slug: "night-shift-cap",
    name: "Night Shift Cap",
    price: 42,
    color: "Black",
    categories: ["ACCESSORIES"],
    sizes: ["OS"],
    description: "Low-profile six panel cap with embroidered OTR mark and adjustable rear closure.",
    details: ["Six panel", "Embroidered logo", "Adjustable closure", "One size"],
    images: [
      u("photo-1521369909029-2afed882baee"),
      u("photo-1534215754734-18e55d13e346"),
      u("photo-1523779917675-b6ed3a42a561"),
      u("photo-1523398002811-999ca8dec234"),
    ],
  },
  {
    id: "otr-007",
    slug: "pit-crew-knit",
    name: "Pit Crew Knit",
    price: 88,
    color: "Smoke",
    categories: ["NEW", "OUTERWEAR"],
    sizes: ["S", "M", "L", "XL"],
    description: "A structured knit layer with a clean front, oversized sleeve and garage-uniform attitude.",
    details: ["Structured knit", "Relaxed sleeve", "Ribbed collar", "Dry clean recommended"],
    images: [
      u("photo-1496747611176-843222e1e57c"),
      u("photo-1485968579580-b6d095142e6e"),
      u("photo-1490481651871-ab68de25d43d"),
      u("photo-1529139574466-a303027c1d8b"),
    ],
  },
  {
    id: "otr-008",
    slug: "track-sweat",
    name: "Track Sweat",
    price: 82,
    color: "Heather Grey",
    categories: ["HOODIES"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Clean crewneck fleece with a substantial rib and easy oversized fit for everyday wear.",
    details: ["Heavy fleece", "Oversized fit", "Ribbed trim", "Garment washed"],
    images: [
      u("photo-1556821840-3a63f95609a7"),
      u("photo-1503342217505-b0a15ec3261c"),
      u("photo-1485230895905-ec40ba36b9bc"),
      u("photo-1520975954732-35dd22299614"),
    ],
  },
];

export const lookbookImages = [
  u("photo-1515886657613-9f3515b0c78f", 1800),
  u("photo-1529139574466-a303027c1d8b", 1800),
  u("photo-1483985988355-763728e1935b", 1800),
  u("photo-1496747611176-843222e1e57c", 1800),
  u("photo-1509631179647-0177331693ae", 1800),
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
