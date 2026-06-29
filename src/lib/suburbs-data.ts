// Whitfield Credit — Columbus neighborhood pages.
// Unique local content per neighborhood — never a city-page find/replace.

export type Suburb = {
  slug: string;
  name: string;
  /** "City of Columbus" | "Franklin County" | "Delaware County" */
  county: string;
  /** Short tagline / sub-heading. */
  tagline: string;
  /** First paragraph — unique local intro (700+ word pages should expand on this). */
  intro: string;
  /** Local landmarks and notable spots — used in body copy. */
  landmarks: string[];
  /** Notable local industries / business types. */
  industries: string[];
  /** Sample local businesses (fictional but plausible) used in case study callouts. */
  sampleBusinesses: { name: string; type: string; useCase: string }[];
  /** ZIP codes served. */
  zips: string[];
};

export const SUBURBS: Suburb[] = [
  {
    slug: "downtown-columbus",
    name: "Downtown Columbus",
    county: "City of Columbus",
    tagline: "Statehouse government, professional services and the Scioto Mile",
    intro:
      "Downtown Columbus is the state's seat of government and the city's professional-services core — anchored by the Ohio Statehouse, the Columbus Commons, the Scioto Mile and a deep base of law firms, lobbying shops and accounting practices clustered around High Street and Broad Street. Whitfield Credit works with Downtown owners on professional-services partner buy-ins, restaurant working capital, SBA acquisition deals and bridge structures sized to the rhythm of the legislative session and the lunchtime trade.",
    landmarks: ["Ohio Statehouse", "Scioto Mile", "Columbus Commons", "COSI", "North Market"],
    industries: ["Government affairs", "Legal", "Accounting", "Restaurants"],
    sampleBusinesses: [
      { name: "Broad Street Government Affairs", type: "Lobbying firm", useCase: "Unsecured partner buy-in financing" },
      { name: "Statehouse Lunch Co.", type: "Restaurant group", useCase: "Working capital line for session-driven cash flow" },
      { name: "Scioto Mile Legal Partners", type: "Law firm", useCase: "SBA 7(a) for office acquisition" },
    ],
    zips: ["43215", "43210", "43203"],
  },
  {
    slug: "short-north",
    name: "Short North",
    county: "City of Columbus",
    tagline: "Arts district galleries, chef-driven restaurants and boutique retail",
    intro:
      "The Short North runs along High Street between Downtown and OSU — a dense corridor of galleries, chef-driven restaurants, boutique retail and creative studios. The district hosts the monthly Gallery Hop, the Goodale Park weekend trade, and a steady flow of conference and event traffic. Whitfield Credit routes Short North financing around build-outs, working capital lines that flex with event-driven sales, and SBA 7(a) acquisitions when long-running concepts transition owners.",
    landmarks: ["Gallery Hop arches", "Goodale Park", "North Market Bridge Park", "Pizzuti Collection"],
    industries: ["Restaurants", "Galleries", "Boutique retail", "Creative studios"],
    sampleBusinesses: [
      { name: "Goodale Park Roasters", type: "Coffee + roastery", useCase: "Equipment loan for production expansion" },
      { name: "High Street Gallery Group", type: "Art gallery", useCase: "Revenue-based financing for inventory" },
      { name: "Short North Bistro Holdings", type: "Restaurant group", useCase: "SBA 7(a) for second-location acquisition" },
    ],
    zips: ["43215", "43201"],
  },
  {
    slug: "german-village",
    name: "German Village",
    county: "City of Columbus",
    tagline: "Historic brick-street boutiques, restaurants and professional services",
    intro:
      "German Village is the city's historic brick-street district south of Downtown — Schiller Park, the Book Loft, classic German-Hungarian restaurants and a tight cluster of boutiques, professional offices and bed-and-breakfasts. Rent per square foot here is among the highest in the metro outside Downtown, which compresses margin for everyone in the district. Whitfield Credit finances German Village owners with SBA 7(a) for boutique and restaurant acquisitions, working capital lines and SBA 504 owner-occupied purchases when an operator buys the brick frontage they've leased.",
    landmarks: ["Schiller Park", "The Book Loft", "Schmidt's Sausage Haus", "Frank Fetch Park"],
    industries: ["Restaurants", "Boutique retail", "Professional services", "Hospitality"],
    sampleBusinesses: [
      { name: "Schiller Park Family Dental", type: "Dental practice", useCase: "Practice acquisition + chair refresh" },
      { name: "Third Street Bakeshop", type: "Bakery", useCase: "Equipment + working capital combo" },
      { name: "Brick Street Inn Holdings", type: "Boutique hospitality", useCase: "SBA 504 for the historic building" },
    ],
    zips: ["43206"],
  },
  {
    slug: "dublin",
    name: "Dublin",
    county: "Franklin County",
    tagline: "North-side tech corridor, corporate HQs and affluent professional services",
    intro:
      "Dublin sits along I-270 northwest of Columbus — the Bridge Park development, the corporate campuses of Cardinal Health and Wendy's, the Memorial Tournament at Muirfield Village and a thick base of tech-enabled professional services. Operators here are typically white-collar, scale-oriented and well-credentialed, which produces clean underwriting profiles and a high fit for unsecured working capital and revenue-based products. Whitfield Credit routes Dublin financing toward growth capital — hiring ramps, marketing spend and partner buy-ins — rather than the equipment-heavy mix more common south of I-270.",
    landmarks: ["Bridge Park", "Muirfield Village Golf Club", "Dublin Historic District", "Scioto River trails"],
    industries: ["Technology services", "Healthcare administration", "Professional services", "Specialty retail"],
    sampleBusinesses: [
      { name: "Bridge Park SaaS Co.", type: "B2B software", useCase: "Revenue-based financing for hiring" },
      { name: "Muirfield Specialty Clinic", type: "Medical group", useCase: "SBA 7(a) for partner buy-in" },
      { name: "Dublin Accounting Partners", type: "CPA firm", useCase: "Unsecured working capital line" },
    ],
    zips: ["43017", "43016"],
  },
  {
    slug: "westerville",
    name: "Westerville",
    county: "Franklin County",
    tagline: "Northeast suburb anchored by Otterbein and family-owned trades",
    intro:
      "Westerville sits at the northeast edge of Franklin County along I-71 — Otterbein University, Uptown Westerville's historic main street, Polaris-area retail and a deep base of family-owned trades and professional offices. Operators here trend long-tenured and second-generation, with strong underwriting profiles built on consistent revenue and a high share of succession deals. Whitfield Credit routes Westerville financing across SBA 7(a) family-business successions, equipment financing for trades and SBA 504 owner-occupied real estate purchases.",
    landmarks: ["Otterbein University", "Uptown Westerville", "Hoover Reservoir", "Polaris Fashion Place"],
    industries: ["Trades / HVAC", "Education-adjacent services", "Retail", "Professional services"],
    sampleBusinesses: [
      { name: "Uptown Westerville Heating & Cooling", type: "HVAC trade", useCase: "Equipment line for fleet refresh" },
      { name: "Hoover Family Auto", type: "Auto repair", useCase: "SBA 7(a) for second-generation buy-in" },
      { name: "Polaris Specialty Retail Group", type: "Specialty retail", useCase: "Revolving line for seasonal inventory" },
    ],
    zips: ["43081", "43082"],
  },
  {
    slug: "bexley",
    name: "Bexley",
    county: "Franklin County",
    tagline: "Independent municipality with deep professional services and independent retail",
    intro:
      "Bexley — an independent municipality inside Columbus's footprint along Main Street and Drexel — concentrates a deep base of independent retail, dental practices and professional services, plus Capital University and Jeffrey Mansion. Operators here trend more established than the metro average, with strong underwriting profiles and a high share of second- and third-generation succession deals along Main Street. Whitfield Credit routes Bexley financing through SBA 7(a) acquisitions, SBA 504 real estate purchases and unsecured working capital lines for the in-between work.",
    landmarks: ["Capital University", "Jeffrey Mansion", "Drexel Theatre", "Main Street brick storefronts"],
    industries: ["Dental", "Boutique retail", "Professional services", "Education-adjacent"],
    sampleBusinesses: [
      { name: "Main Street Dental Group", type: "Dental practice", useCase: "Practice acquisition + CBCT imaging" },
      { name: "Drexel Avenue CPAs", type: "Accounting", useCase: "Partner buy-in financing" },
      { name: "Bexley Independent Books", type: "Specialty retail", useCase: "SBA 504 for the storefront" },
    ],
    zips: ["43209"],
  },
  {
    slug: "hilltop",
    name: "Hilltop",
    county: "City of Columbus",
    tagline: "West-side legacy industrial, light manufacturing and family-owned trades",
    intro:
      "The Hilltop sits west of Downtown along Broad Street and Sullivant — a deep base of family-owned light manufacturers, auto shops, panaderías and trades. Operators here trend long-tenured and family-owned, with strong cash-flow histories but often unbanked or underbanked relative to the north-side peers. Whitfield Credit routes Hilltop financing across two patterns: equipment loans and SBA 504 real estate purchases for legacy operators ready to modernize, and SBA 7(a) acquisitions for second-generation buyers stepping into family businesses.",
    landmarks: ["Westgate Park", "Camp Chase Trail", "Sullivant Avenue corridor", "Westland-area industrial"],
    industries: ["Light manufacturing", "Auto repair", "Bakeries / food production", "Trades"],
    sampleBusinesses: [
      { name: "Sullivant Avenue Metalworks", type: "Metal fabrication", useCase: "Equipment line for CNC upgrade" },
      { name: "Westgate Auto Body", type: "Auto body shop", useCase: "SBA 504 for the building purchase" },
      { name: "Hilltop Family Bakery", type: "Bakery / wholesale", useCase: "Working capital + equipment combo" },
    ],
    zips: ["43204", "43223"],
  },
  {
    slug: "worthington",
    name: "Worthington",
    county: "Franklin County",
    tagline: "North suburb mixing historic district professional services with corporate corridor",
    intro:
      "Worthington sits north of Columbus along High Street and 161 — the Historic District around the Worthington Inn, the Linworth corridor's restaurants and a thick base of professional offices, medical practices and corporate-adjacent service firms along the I-270 frontage. Operators trend established and professionally licensed, with clean underwriting profiles. Whitfield Credit routes Worthington deals through unsecured working capital lines, SBA 7(a) for medical and dental practice acquisitions, and SBA 504 for owner-occupied medical-office purchases.",
    landmarks: ["Worthington Historic District", "Worthington Inn", "Olentangy River trails", "Old Worthington Library"],
    industries: ["Medical / dental", "Professional services", "Boutique retail", "Corporate-adjacent services"],
    sampleBusinesses: [
      { name: "Old Worthington Family Medicine", type: "Medical practice", useCase: "SBA 7(a) for partner buy-in" },
      { name: "High Street Wealth Advisors", type: "Financial services", useCase: "Unsecured working capital" },
      { name: "Linworth Specialty Dental", type: "Dental specialty", useCase: "Equipment + practice expansion" },
    ],
    zips: ["43085", "43235"],
  },
  {
    slug: "easton",
    name: "Easton",
    county: "City of Columbus",
    tagline: "Mixed-use retail district anchored by Easton Town Center",
    intro:
      "Easton is a planned mixed-use district in the northeast quadrant of Columbus — anchored by Easton Town Center, a deep base of restaurants and specialty retail, plus the office campuses along Easton Way. Operators here finance the same patterns common to large-format retail districts: revolving lines for inventory cycles, SBA build-out financing for new concepts and revenue-based financing for fast-growing retail brands. Whitfield Credit routes around customer concentration, seasonality and the rent base.",
    landmarks: ["Easton Town Center", "Easton Way office corridor", "Easton Market"],
    industries: ["Specialty retail", "Restaurants", "Professional services", "Corporate offices"],
    sampleBusinesses: [
      { name: "Easton Center Boutique Holdings", type: "Specialty retail", useCase: "Inventory line for seasonal cycle" },
      { name: "Easton Way Consulting", type: "Consulting firm", useCase: "Unsecured working capital for hiring" },
      { name: "Easton Restaurant Group", type: "Restaurant group", useCase: "SBA 7(a) for second-location build-out" },
    ],
    zips: ["43219"],
  },
  {
    slug: "grandview-heights",
    name: "Grandview Heights",
    county: "Franklin County",
    tagline: "Independent muni boutique retail, professional services and creative studios",
    intro:
      "Grandview Heights — an independent municipality between Downtown and Upper Arlington — concentrates a tight base of independent boutique retail, professional offices, creative studios and chef-driven restaurants along Grandview Avenue and 5th Avenue. Operators trend boutique and design-forward, with revenue patterns sized more like the Pearl-equivalent districts in larger metros than like a corporate suburb. Whitfield Credit finances Grandview operators with SBA 7(a) acquisitions, equipment + working capital combos for restaurants and revenue-based financing for design and creative firms.",
    landmarks: ["Grandview Yard", "Grandview Avenue retail strip", "Pierce Field"],
    industries: ["Restaurants", "Boutique retail", "Creative studios", "Professional services"],
    sampleBusinesses: [
      { name: "Grandview Avenue Bistro", type: "Restaurant", useCase: "Working capital + equipment combo" },
      { name: "Pierce Field Creative", type: "Design studio", useCase: "Revenue-based financing for hiring" },
      { name: "Grandview Yard CPAs", type: "Accounting", useCase: "Unsecured partner buy-in" },
    ],
    zips: ["43212"],
  },
];

export function getSuburb(slug: string): Suburb | undefined {
  return SUBURBS.find((s) => s.slug === slug);
}
