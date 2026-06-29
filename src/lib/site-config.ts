// Single source of truth for SITE_URL and business facts.
// Mock/placeholder values OK while INDEXABLE=false. Before flipping
// VITE_INDEXABLE=true, replace every mock value with the real owner data.

const RAW_SITE_URL =
  (import.meta.env?.VITE_SITE_URL as string | undefined) ??
  "https://lumenbusinesscapital.com";

export const SITE_URL: string = RAW_SITE_URL.replace(/\/+$/, "");

export const INDEXABLE: boolean =
  (import.meta.env?.VITE_INDEXABLE as string | undefined) === "true";

export const SITE_CONFIG = {
  url: SITE_URL,
  indexable: INDEXABLE,

  name: "Lumen Business Capital",
  legalName: "Lumen Business Capital, LLC",
  tagline: "Coastal clarity — capital for Virginia Beach operators",
  defaultDescription:
    "Working capital, invoice factoring, AR financing, SBA loans and small business loans for Virginia Beach, VA. Pre-qualify with a soft credit pull and review offers in 24 hours.",

  phone: "(757) 347-2737",
  phoneHref: "tel:+17573472737",
  email: "",

  hasPublicOffice: true,
  address: {
    streetAddress: "4525 Main St",
    addressLocality: "Virginia Beach",
    addressRegion: "VA",
    postalCode: "23462",
    addressCountry: "US",
  },
  geo: {
    latitude: 36.8529,
    longitude: -75.9780,
  },

  openingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "19:00",
    },
    { dayOfWeek: ["Saturday"], opens: "09:00", closes: "14:00" },
  ],

  license: {
    state: "VA",
    licenseNumber: "VA-CFL-204918",
  },

  areasServed: [
    "Virginia Beach, VA",
    "Hampton Roads",
    "Coastal Virginia",
  ],

  social: {
    googleBusinessProfile: "https://www.google.com/maps/place/Lumen+Business+Capital",
    linkedin: "https://www.linkedin.com/company/lumen-business-capital",
    facebook: "https://www.facebook.com/lumenbusinesscapital",
    twitter: "https://twitter.com/LumenBizCapital",
  },

  defaultOgImage: "/og-default.svg",

  stats: {
    reviewsCount: "1,380+",
    reviewsRating: "4.9",
    businessesFunded: "5,900+",
    loansFacilitated: "$340M+",
    fastestFundingHours: "24h",
  },

  trustBadges: ["Soft Pull · No Credit Impact"],

  author: {
    name: "Daniel Lumen",
    title: "Managing Director",
    credentials: "MBA, 16+ years SBA & commercial lending",
    profileUrl: "https://www.linkedin.com/in/daniel-lumen-lbc",
  },

  featuredStat: {
    value: "780,000",
    claim: "small businesses operating across Virginia",
    sourceName: "SBA Office of Advocacy — Virginia Profile",
    sourceUrl: "https://advocacy.sba.gov/",
  },

  ghl: {
    formId: "iILOP7GhpUNskBYRNuWk",
    formName: "Loan Application",
    formHeight: 876,
    embedScriptSrc: "https://link.msgsndr.com/js/form_embed.js",
  },
} as const;

export function absoluteUrl(path: string = "/"): string {
  if (!path) return `${SITE_URL}/`;
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  const normalized = withLeading === "/" ? "/" : withLeading.replace(/\/+$/, "");
  return `${SITE_URL}${normalized}`;
}
