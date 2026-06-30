import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { buildHead } from "@/lib/seo";
import { buildGraph, faqNode } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Banknote,
  Building2,
  Truck,
  Stethoscope,
  UtensilsCrossed,
  ShoppingBag,
  Factory,
  Briefcase,
  Star,
  PhoneCall,
  CheckCircle2,
  Lock,
  Users,
  FileText,
  HandCoins,
  CreditCard,
  Wrench,
  Receipt,
  LineChart,
  Sparkles,
  Menu,
  MapPin,
  HelpCircle,
  BookOpen,
  Hammer,
  Plane,
  Flame,
  Package,
  Shield,
  Anchor,
  ArrowUpRight,
  Compass,
  Target,
  TrendingUp,
  Zap,
  Award,
  ChevronRight,
} from "lucide-react";

const siteLogoUrl = "/lumenbusnslogo.png";
const siteFavUrl = "/lumenfav-removebg.png";

type MegaItemProps = Readonly<{
  icon: LucideIcon;
  label: string;
  desc: string;
  href?: string;
  slug?: string;
  homeHash?: string;
}>;

const CITY = "Virginia Beach";
const CITY_STATE = `${CITY}, VA`;

const HOME_FAQS = [
  {
    q: `How quickly can I get funded in ${CITY}?`,
    a: `Many of our lending partners can fund qualified ${CITY} businesses within 24-72 hours of approval. Same-day funding is available for select products like merchant cash advances and short-term loans.`,
  },
  {
    q: "Will checking my options affect my credit score?",
    a: "No. We use a soft credit pull to pre-qualify you. It does not affect your personal or business credit score.",
  },
  {
    q: "What credit score is required?",
    a: "Most of our lenders work with scores starting at 550 FICO. SBA loans and the best lines of credit typically require 650+.",
  },
  {
    q: "Can Coastal Virginia startups qualify?",
    a: "Yes. We work with lenders that fund businesses as young as 3 months, including SBA microloan programs designed for newer ventures.",
  },
  {
    q: "What documents are needed?",
    a: "Typically 3-6 months of business bank statements, basic business details and a valid ID. SBA loans may require tax returns and full financials.",
  },
  {
    q: "How much can I borrow?",
    a: "Funding ranges from $5,000 working capital advances up to $5,000,000 SBA and commercial real estate loans, depending on revenue and use of funds.",
  },
] as const;

export const Route = createFileRoute("/")({
  head: () => {
    const title = `Business Loans in ${CITY_STATE}`;
    const description = `Working capital, invoice factoring, accounts receivable financing, SBA loans and small business loans for ${CITY_STATE}. Pre-qualify in minutes with a soft credit pull and review real offers in 24 hours.`;
    return buildHead({
      title,
      description,
      path: "/",
      schema: buildGraph({
        title,
        description,
        path: "/",
        extraNodes: [faqNode({ path: "/", faqs: HOME_FAQS })],
      }),
    });
  },
  component: Index,
});

function Index() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <StatsBanner />
        <CapitalDesk />
        <CityHubCTA />
        <HowItWorks />
        <Industries />
        <SuccessStories />
        <CityIntro />
        <Security />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- Scroll Reveal ---------------- */
function useScrollReveal() {
  useEffect(() => {
    if (globalThis.window === undefined) return;
    const sections = Array.from(document.querySelectorAll("main > section"));
    const targets: Element[] = [];
    sections.forEach((section) => {
      Array.from(section.children).forEach((child) => {
        const el = child as HTMLElement;
        if (el.classList.contains("pointer-events-none")) return;
        if (el.tagName === "SVG") return;
        const inner = Array.from(el.children).filter(
          (c) => !(c as HTMLElement).classList.contains("pointer-events-none"),
        ) as HTMLElement[];
        if (inner.length > 1 && inner.length <= 8) {
          inner.forEach((c, i) => {
            c.classList.add("reveal");
            if (i > 0 && i <= 5) c.classList.add(`reveal-delay-${i}`);
            targets.push(c);
          });
        } else {
          el.classList.add("reveal");
          targets.push(el);
        }
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
}

/* ---------------- Header ---------------- */

const LOAN_GROUPS: {
  heading: string;
  items: MegaItemProps[];
}[] = [
  {
    heading: "GBP Active Plays",
    items: [
      { icon: Receipt, label: "Accounts Receivable Financing", desc: "Borrow against open A/R", slug: "accounts-receivable-financing" },
      { icon: Receipt, label: "Invoice Factoring", desc: "Same-day cash on invoices", slug: "invoice-factoring" },
      { icon: LineChart, label: "Revenue Based Financing", desc: "Repay as a % of monthly revenue", slug: "revenue-based-financing" },
      { icon: HandCoins, label: "Small Business Loans", desc: "Compare every funding product", slug: "small-business-loans" },
      { icon: MapPin, label: "Small Business Loans Near Me", desc: "Virginia Beach-based loan advisors", slug: "small-business-loans-near-me" },
      { icon: FileText, label: "SBA Loans", desc: "Government-backed funding programs", slug: "sba-loans" },
    ],
  },
  {
    heading: "Working Capital & Credit",
    items: [
      { icon: CreditCard, label: "Business Line of Credit", desc: "Revolving credit when you need it", slug: "business-line-of-credit" },
      { icon: LineChart, label: "Working Capital Loans", desc: "Cover payroll & seasonal gaps", slug: "working-capital-loans" },
      { icon: Banknote, label: "Merchant Cash Advance", desc: "Capital based on future card sales", slug: "merchant-cash-advance" },
      { icon: ShieldCheck, label: "Unsecured Business Loans", desc: "No collateral required", slug: "unsecured-business-loans" },
      { icon: Sparkles, label: "Startup Business Loans", desc: "Funding for newer ventures", slug: "startup-business-loans" },
    ],
  },
  {
    heading: "SBA, Acquisition & Equipment",
    items: [
      { icon: FileText, label: "SBA 7(a) Loan", desc: "The SBA's flagship program", slug: "sba-7a-loan" },
      { icon: Briefcase, label: "Business Acquisition Loans", desc: "Buy an existing Virginia Beach business", slug: "business-acquisition-loans" },
      { icon: Wrench, label: "Equipment Financing", desc: "Machinery, vehicles & tools", slug: "equipment-financing" },
      { icon: Factory, label: "Manufacturing Equipment", desc: "CNC, robotics & production", slug: "manufacturing-equipment-financing" },
    ],
  },
];

const INDUSTRY_GROUPS: {
  heading: string;
  items: MegaItemProps[];
}[] = [
  {
    heading: "Healthcare & Professional",
    items: [
      { icon: Stethoscope, label: "Medical Practice Loans", desc: "Clinics & physician groups", slug: "medical-practice-loans" },
      { icon: Stethoscope, label: "Dental Practice Loans", desc: "Equipment, expansion, acquisition", slug: "dental-practice-loans" },
      { icon: Briefcase, label: "Professional Services", desc: "Law, accounting, consulting", href: "/industry/professional-services" },
    ],
  },
  {
    heading: "Hospitality & Retail",
    items: [
      { icon: UtensilsCrossed, label: "Restaurant Loans", desc: "Fit-out, expansion, equipment", slug: "restaurant-loans" },
      { icon: ShoppingBag, label: "Retail Business Loans", desc: "Inventory & storefront", slug: "retail-business-loans" },
      { icon: Building2, label: "Hotel Loans", desc: "Acquisition & PIP renovation", slug: "hotel-loans" },
    ],
  },
  {
    heading: "Trades, Logistics & Industrial",
    items: [
      { icon: Hammer, label: "Construction Business Loans", desc: "Ground-up & renovation", slug: "construction-business-loans" },
      { icon: Truck, label: "Trucking Business Loans", desc: "Owner-operators to fleets", slug: "trucking-business-loans" },
      { icon: Factory, label: "Manufacturing Equipment", desc: "CNC, robotics & production", slug: "manufacturing-equipment-financing" },
      { icon: Package, label: "Distribution & Logistics", desc: "AR financing & equipment", href: "/industry/distribution" },
    ],
  },
  {
    heading: "Virginia & Hampton Roads",
    items: [
      { icon: Flame, label: "Manufacturing & Industrial", desc: "Production lines & equipment", slug: "oilfield-services-loans" },
      { icon: Plane, label: "Defense & Tech Corridor", desc: "Rickenbacker-adjacent operators", href: "/industry/defense-aerospace" },
      { icon: Shield, label: "Veteran Business Loans", desc: "SBA Express for veterans", slug: "veteran-business-loans" },
    ],
  },
];

const SERVICE_AREAS: { region: string; suburbs: { name: string; slug: string }[] }[] = [
  {
    region: "City of Virginia Beach",
    suburbs: [
      { name: "Downtown Virginia Beach", slug: "downtown-virginia-beach" },
      { name: "Short North", slug: "short-north" },
      { name: "German Village", slug: "german-village" },
      { name: "Hilltop", slug: "hilltop" },
      { name: "Easton", slug: "easton" },
      { name: "Grandview Heights", slug: "grandview-heights" },
    ],
  },
  {
    region: "Hampton Roads",
    suburbs: [
      { name: "Bexley", slug: "bexley" },
      { name: "Westerville", slug: "westerville" },
    ],
  },
  {
    region: "North & West Suburbs",
    suburbs: [
      { name: "Dublin", slug: "dublin" },
      { name: "Worthington", slug: "worthington" },
    ],
  },
];

function MegaItem({
  icon: Icon,
  label,
  desc,
  href,
  slug,
  homeHash,
}: MegaItemProps) {
  const itemClass = "flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-secondary";
  const inner = (
    <>
      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[color:var(--brand-emerald-mid)]/10 text-[color:var(--brand-emerald-mid)]">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground">{label}</span>
        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{desc}</span>
      </span>
    </>
  );
  if (homeHash) {
    return (
      <NavigationMenuLink asChild>
        <Link to="/" hash={homeHash} className={itemClass}>
          {inner}
        </Link>
      </NavigationMenuLink>
    );
  }
  if (slug) {
    return (
      <NavigationMenuLink asChild>
        <Link
          to="/pillar/$slug"
          params={{ slug }}
          className={itemClass}
        >
          {inner}
        </Link>
      </NavigationMenuLink>
    );
  }
  return (
    <NavigationMenuLink asChild>
      <a
        href={href ?? "#"}
        className={itemClass}
      >
        {inner}
      </a>
    </NavigationMenuLink>
  );
}

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[color:var(--brand-charcoal)]/97 text-white shadow-[0_2px_32px_-4px_oklch(0.08_0.04_240/0.55)] backdrop-blur-xl supports-[backdrop-filter]:bg-[color:var(--brand-charcoal)]/88">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-6 px-4 md:px-6">
        {/* Logo  -  left */}
        <a href="/" className="shrink-0 flex items-center">
          <img src={siteLogoUrl} width={843} height={296} alt={SITE_CONFIG.name} className="h-14 w-auto" />
          <span className="sr-only">{SITE_CONFIG.name}</span>
        </a>

        {/* Nav  -  centered */}
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-0">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="nav-item rounded-none bg-transparent text-white/85 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">Capital</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="light bg-popover text-popover-foreground max-w-[100vw] max-h-[calc(100vh-5rem)] overflow-auto">
                    <div className="w-[880px] p-6">
                      <div className="grid grid-cols-3 gap-6">
                        {LOAN_GROUPS.map((g) => (
                          <div key={g.heading}>
                            <div className="mb-3 text-[10px] font-bold uppercase tracking-wider text-[color:var(--primary)]">
                              {g.heading}
                            </div>
                            <div className="space-y-0.5">
                              {g.items.map((it) => (
                                <MegaItem key={it.label} {...it} />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center justify-between rounded-xl border border-border bg-[color:var(--primary)]/5 p-4">
                        <div className="text-sm">
                          <div className="font-semibold">Not sure which capital fits?</div>
                          <div className="text-muted-foreground">Get matched in 60 seconds  -  soft credit pull only.</div>
                        </div>
                        <Link to="/apply-now" className="btn-primary py-2 px-4 text-[11px]">

                          Start Application
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="nav-item rounded-none bg-transparent text-white/85 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">Coverage</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="light bg-popover text-popover-foreground max-w-[100vw] max-h-[calc(100vh-5rem)] overflow-auto">
                    <div className="w-[740px] p-6">
                      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-[color:var(--primary)]" />
                        Funding businesses across the greater {CITY_STATE} metro
                      </div>
                      <div className="grid grid-cols-3 gap-x-8 gap-y-5">
                        {SERVICE_AREAS.map((sa) => (
                          <div key={sa.region}>
                            <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[color:var(--primary)]">
                              {sa.region}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {sa.suburbs.map((s) => (
                                <NavigationMenuLink asChild key={s.slug}>
                                  <Link
                                    to="/virginia-beach/$suburb"
                                    params={{ suburb: s.slug }}
                                    className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs hover:bg-[color:var(--primary)]/10 hover:text-[color:var(--primary)] transition-colors"
                                  >
                                    {s.name}
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 border-t border-border pt-4">
                        <NavigationMenuLink asChild>
                          <Link to="/virginia-beach" className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--primary)] hover:underline">
                            View the full Virginia Beach Hub directory <ArrowRight className="h-4 w-4" />
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/" hash="faq" className={`nav-item ${navigationMenuTriggerStyle()} rounded-none bg-transparent text-white/85 hover:bg-transparent focus:bg-transparent`}>
                    FAQ
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/contact" className={`nav-item ${navigationMenuTriggerStyle()} rounded-none bg-transparent text-white/85 hover:bg-transparent focus:bg-transparent`}>
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right actions */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <a
            href={SITE_CONFIG.phoneHref}
            className="flex items-center gap-2 rounded-lg border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <PhoneCall className="h-4 w-4 text-white/60" />
            {SITE_CONFIG.phone}
          </a>
          <Link to="/apply-now" className="btn-primary py-2.5 px-5 text-[12px]">

            Get Funded
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="ml-auto flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] overflow-y-auto p-0">
              <SheetHeader className="border-b border-border px-5 py-4">
                <SheetTitle className="flex items-center gap-2 text-left">
                  <img src={siteLogoUrl} width={843} height={296} alt={SITE_CONFIG.name} className="h-10 w-auto" />
                </SheetTitle>
              </SheetHeader>
              <div className="px-4 py-4">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="cap">
                    <AccordionTrigger className="px-2 text-base font-semibold">Capital</AccordionTrigger>
                    <AccordionContent>
                      {LOAN_GROUPS.map((g) => (
                        <div key={g.heading} className="mb-3">
                          <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--primary)]">
                            {g.heading}
                          </div>
                          <ul className="mt-1">
                            {g.items.map((it) => (
                              <li key={it.label}>
                                <SheetClose asChild>
                                  {it.slug ? (
                                    <Link
                                      to="/pillar/$slug"
                                      params={{ slug: it.slug }}
                                      className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary"
                                    >
                                      {it.label}
                                    </Link>
                                  ) : (
                                    <a href={it.href ?? "#"} className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary">
                                      {it.label}
                                    </a>
                                  )}
                                </SheetClose>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="areas">
                    <AccordionTrigger className="px-2 text-base font-semibold">Coverage</AccordionTrigger>
                    <AccordionContent>
                      {SERVICE_AREAS.map((sa) => (
                        <div key={sa.region} className="mb-3">
                          <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--primary)]">
                            {sa.region}
                          </div>
                          <div className="mt-1 flex flex-wrap gap-1.5 px-2">
                            {sa.suburbs.map((s) => (
                              <SheetClose asChild key={s.slug}>
                                <Link
                                  to="/virginia-beach/$suburb"
                                  params={{ suburb: s.slug }}
                                  className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground"
                                >
                                  {s.name}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="px-2 pt-2">
                  <SheetClose asChild>
                    <Link to="/" hash="faq" className="block rounded-md px-2 py-2 text-base font-semibold hover:bg-secondary">
                      FAQ
                    </Link>
                  </SheetClose>
                </div>
                <div className="mt-4 space-y-2 border-t border-border px-2 pt-4">
                  <a href={SITE_CONFIG.phoneHref} className="flex items-center gap-2 text-sm font-medium">
                    <PhoneCall className="h-4 w-4 text-[color:var(--primary)]" /> {SITE_CONFIG.phone}
                  </a>
                  <SheetClose asChild>
                    <Link to="/apply-now" className="btn-primary w-full justify-center">

                      Get Funded
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Hero  -  Virginia Beach full-bleed, two-column ---------------- */
function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden text-white flex items-center">
      {/* Virginia Beach oceanfront aerial */}
      <img
        src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1920&q=80"
        alt="Virginia Beach oceanfront"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_40%]"
        fetchPriority="high"
      />
      {/* Deep navy overlay  -  left heavy so text stays legible */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(105deg, oklch(0.13 0.06 235 / 0.96) 0%, oklch(0.15 0.06 235 / 0.88) 45%, oklch(0.12 0.04 235 / 0.65) 100%)" }} />
      {/* Subtle grid texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-[0.035]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-[calc(9rem+72px)] pb-36 lg:pt-[calc(11rem+72px)] lg:pb-44">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">

          {/* Left  -  copy */}
          <div>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--primary)]" />
              Virginia Beach, VA · Business Capital
            </div>

            <h1 className="mt-6 text-5xl font-bold leading-[1.04] tracking-tight sm:text-[3.5rem] lg:text-[4.25rem]">
              Capital for coastal<br />
              <span className="text-[color:var(--brand-vermillion)]">Virginia operators.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
              One soft-pull application connects you to 75+ Virginia-active lenders  -  invoice factoring, AR lines, SBA loans and working capital matched to your deal.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/apply-now" className="btn-primary text-base px-8 py-3.5">

                Get Funded
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={SITE_CONFIG.phoneHref} className="btn-ghost-dark text-base px-8 py-3.5">
                <PhoneCall className="h-4 w-4" />
                {SITE_CONFIG.phone}
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-white/40">
              <span className="inline-flex items-center gap-1.5"><Lock className="h-3 w-3" /> Soft pull only</span>
              <span>·</span>
              <span>No commitment required</span>
              <span>·</span>
              <span>Free consultation</span>
            </div>
          </div>

          {/* Right  -  glass stats card */}
          <div className="rounded-3xl border border-white/12 bg-white/8 p-7 backdrop-blur-lg">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45 mb-5">By the numbers</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { v: SITE_CONFIG.stats.businessesFunded, l: "Businesses funded" },
                { v: SITE_CONFIG.stats.loansFacilitated, l: "Loans facilitated" },
                { v: `${SITE_CONFIG.stats.reviewsRating}/5`, l: `${SITE_CONFIG.stats.reviewsCount} reviews` },
                { v: SITE_CONFIG.stats.fastestFundingHours, l: "Fastest funding" },
              ].map(({ v, l }) => (
                <div key={l} className="rounded-2xl bg-white/10 px-4 py-4">
                  <div className="text-2xl font-black text-white">{v}</div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              {[
                "Virginia-licensed lending partners",
                "75+ active lenders on the bench",
                "Decisions in as little as 24 hours",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[color:var(--primary)]" />
                  <span className="text-sm text-white/80">{t}</span>
                </div>
              ))}
            </div>
            <Link to="/apply-now" className="btn-primary mt-5 w-full justify-center text-sm py-3">
              Apply Now  -  Soft Pull
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ---------------- Stats Banner  -  bold horizontal strip ---------------- */
function StatsBanner() {
  const stats = [
    { value: SITE_CONFIG.stats.businessesFunded, label: "Businesses funded", icon: Users },
    { value: SITE_CONFIG.stats.loansFacilitated, label: "Loans facilitated", icon: Banknote },
    { value: `${SITE_CONFIG.stats.reviewsRating}/5`, label: `${SITE_CONFIG.stats.reviewsCount} verified reviews`, icon: Star },
    { value: SITE_CONFIG.stats.fastestFundingHours, label: "Fastest funding", icon: Zap },
  ];
  return (
    <section className="relative bg-[color:var(--brand-cream)] border-y border-border py-0 overflow-hidden">
      {/* decorative shapes */}
      <svg aria-hidden className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.07]" width="38" height="38" viewBox="0 0 38 38" fill="none"><rect x="1" y="1" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--primary)]" transform="rotate(18 19 19)"/></svg>
      <svg aria-hidden className="pointer-events-none absolute left-[12%] bottom-2 opacity-[0.06]" width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--brand-bronze)]"/></svg>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 divide-x divide-border lg:grid-cols-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-4 px-6 py-8 first:pl-0 last:pr-0 sm:px-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--primary)]/8">
                <Icon className="h-5 w-5 text-[color:var(--primary)]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[color:var(--brand-charcoal)] md:text-3xl">{value}</div>
                <div className="mt-0.5 text-xs font-medium text-muted-foreground">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Capital Desk  -  2x2 card grid ---------------- */
function CapitalDesk() {
  const desk = [
    {
      slug: "invoice-factoring",
      title: "Invoice Factoring",
      lede: "Same-day cash on freight, staffing or construction invoices  -  no debt added to your balance sheet.",
      stat: "Funded in 24 hrs",
      tag: "Advance up to 95%",
      icon: FileText,
      accent: "from-violet-600/20 to-violet-600/5",
    },
    {
      slug: "small-business-loans",
      title: "Small Business Loans",
      lede: "One soft-pull application matches you against every major loan product we broker.",
      stat: "75+ lenders",
      tag: "$5K - $5M",
      icon: HandCoins,
      accent: "from-amber-600/20 to-amber-600/5",
    },
    {
      slug: "accounts-receivable-financing",
      title: "AR Financing",
      lede: "Revolving credit line secured by your open invoices  -  keep your receivables and your cash.",
      stat: "Up to 90% advance",
      tag: "Lines $250K-$20M",
      icon: Receipt,
      accent: "from-blue-600/20 to-blue-600/5",
    },
    {
      slug: "sba-loans",
      title: "SBA Loans",
      lede: "SBA 7(a), 504 and Express programs through Virginia-active Preferred Lenders  -  lowest long-term rates.",
      stat: "From 8.25% APR",
      tag: "Up to $5M",
      icon: Award,
      accent: "from-emerald-600/20 to-emerald-600/5",
    },
  ];
  return (
    <section id="capital" className="relative py-20 sm:py-28 overflow-hidden">
      {/* decorative shapes */}
      <svg aria-hidden className="pointer-events-none absolute left-4 top-16 opacity-[0.055]" width="28" height="28" viewBox="0 0 28 28" fill="none"><line x1="14" y1="0" x2="14" y2="28" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--primary)]"/><line x1="0" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--primary)]"/></svg>
      <svg aria-hidden className="pointer-events-none absolute right-8 bottom-12 opacity-[0.05]" width="32" height="32" viewBox="0 0 32 32" fill="none"><polygon points="16,2 30,28 2,28" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="text-[color:var(--brand-bronze)]"/></svg>
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
              Capital Programs
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[color:var(--brand-charcoal)] md:text-4xl">
              The six programs Virginia Beach asks for most
            </h2>
          </div>
          <Link to="/virginia-beach" className="btn-outline-light hidden sm:inline-flex py-2 px-5 text-[11px]">
            View Virginia Beach Hub <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Card grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {desk.map((d) => {
            const Icon = d.icon;
            return (
              <Link
                key={d.slug}
                to="/pillar/$slug"
                params={{ slug: d.slug }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[color:var(--primary)]/25"
              >
                {/* Hover gradient wash */}
                <div aria-hidden className={`absolute inset-0 bg-gradient-to-br ${d.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                {/* Favicon watermark  -  very low opacity decoration */}
                <img
                  src={siteFavUrl}
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute -bottom-3 -right-3 h-28 w-28 object-contain opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.07]"
                  style={{ filter: "saturate(0.3)" }}
                />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--primary)]/10 transition-colors group-hover:bg-[color:var(--primary)]/15">
                      <Icon className="h-5 w-5 text-[color:var(--primary)]" />
                    </div>
                    <span className="rounded-full bg-[color:var(--primary)]/6 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[color:var(--primary)]">
                      {d.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-foreground transition-colors group-hover:text-[color:var(--primary)]">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.lede}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
                    <div className="text-base font-black text-[color:var(--primary)]">{d.stat}</div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--primary)]/8 transition-all group-hover:bg-[color:var(--primary)] group-hover:text-white">
                      <ArrowRight className="h-3.5 w-3.5 text-[color:var(--primary)] transition-colors group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- City Hub CTA  -  bold dark banner ---------------- */
function CityHubCTA() {
  const highlights = [
    "10 neighborhoods & adjacent communities",
    "24 loan programs mapped locally",
    "60 dedicated neighborhood x program pages",
  ];
  return (
    <section className="relative overflow-hidden py-4 sm:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-3xl p-8 text-white sm:p-10 md:p-16"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-15" />
          {/* Decorative circles */}
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full border border-white/10" />
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/10" />

          <div className="relative grid items-center gap-12 md:grid-cols-[1.5fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/40 bg-[color:var(--brand-bronze)]/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
                <MapPin className="h-3.5 w-3.5" /> Explore the Virginia Beach Hub
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem]">
                Every neighborhood.{" "}
                <span className="text-[color:var(--brand-bronze)]">Every loan program.</span>{" "}
                One directory.
              </h2>
              <p className="mt-4 max-w-lg text-white/70">
                Jump into the Virginia Beach city hub to browse every neighborhood we serve and the
                programs available in each.
              </p>
              <ul className="mt-6 space-y-2.5">
                {highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2.5 text-sm text-white/85">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[color:var(--brand-bronze)]" /> {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/virginia-beach" className="btn-primary w-full justify-center sm:w-auto text-base py-3.5 px-7" style={{ background: "#fff", color: "var(--brand-charcoal)", boxShadow: "0 6px 28px -6px oklch(0 0 0 / 0.25)" }}>
                  Visit the Virginia Beach Hub <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/apply-now" className="btn-ghost-dark w-full justify-center sm:w-auto text-base py-3.5 px-7">

                  Apply Now
                </Link>
              </div>
            </div>

            {/* Right stats card */}
            <div className="rounded-2xl border border-white/15 bg-white/8 p-6 backdrop-blur-sm">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">Inside the hub</div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                {[
                  { n: "10", l: "Neighborhoods" },
                  { n: "24", l: "Programs" },
                  { n: "60+", l: "Local Pages" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl bg-white/10 p-4">
                    <div className="text-2xl font-bold">{s.n}</div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/60">{s.l}</div>
                  </div>
                ))}
              </div>
              <Link to="/virginia-beach" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[color:var(--brand-bronze)] transition-colors">
                Browse the full directory <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- How It Works  -  vertical timeline ---------------- */
function HowItWorks() {
  const steps = [
    {
      n: 1,
      title: "Tell us the brief",
      desc: "60 seconds: how much, what for, how soon. No documents up front  -  just the basics.",
      icon: FileText,
      detail: "Funding amount · Use of funds · Timeline",
    },
    {
      n: 2,
      title: "We shop the bench",
      desc: "Lumen pre-screens 75+ Virginia-active lenders against your specific profile and deal structure.",
      icon: Compass,
      detail: "75+ lenders · Soft pull only · No credit impact",
    },
    {
      n: 3,
      title: "Compare real offers",
      desc: "Side-by-side: rates, terms, fees and remit schedules laid out clearly  -  no spin.",
      icon: TrendingUp,
      detail: "APR · Term length · Fees · Remit schedule",
    },
    {
      n: 4,
      title: "Funded",
      desc: "Sign the docs and receive funds in as little as 24 hours after approval.",
      icon: Zap,
      detail: "Wire in 24 hrs · Direct to your account",
    },
  ];
  return (
    <section id="how" className="relative overflow-hidden bg-[color:var(--brand-charcoal)] py-20 text-white sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-[0.05]" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full blur-[130px]" style={{ background: "radial-gradient(circle, oklch(0.66 0.18 188 / 0.10) 0%, transparent 65%)" }} />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">

          {/* Left  -  sticky header + CTA */}
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
              Process
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Four steps.<br />Zero surprises.
            </h2>
            <p className="mt-4 max-w-sm text-white/55 leading-relaxed">
              How {CITY} operators move from "we need capital" to "the wire cleared"  -  without the runaround.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { icon: Lock, text: "Soft pull only  -  no credit impact" },
                { icon: ShieldCheck, text: "Virginia-licensed lending partners" },
                { icon: Clock, text: "Decisions in as little as 24 hours" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/8">
                    <Icon className="h-4 w-4 text-white/50" />
                  </div>
                  <span className="text-sm text-white/60">{text}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link to="/apply-now" className="btn-primary text-base px-8 py-3.5">

                Start your application
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right  -  vertical timeline */}
          <div className="relative">
            {/* Connector line */}
            <div aria-hidden className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

            <div className="space-y-4">
              {steps.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.n} className="group relative flex gap-6 rounded-2xl border border-white/8 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/16 hover:bg-white/[0.07]">
                    {/* Step circle */}
                    <div className="relative shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[color:var(--brand-charcoal)] text-sm font-black text-white/50 transition-all group-hover:border-[oklch(0.66_0.19_188)] group-hover:text-[oklch(0.76_0.17_184)]">
                        {String(s.n).padStart(2, "0")}
                      </div>
                    </div>
                    {/* Content */}
                    <div className="min-w-0 flex-1 pt-1">
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/8 transition-colors group-hover:bg-[oklch(0.66_0.19_188)]/20">
                          <Icon className="h-3.5 w-3.5 text-white/45 transition-colors group-hover:text-[oklch(0.76_0.17_184)]" />
                        </div>
                        <h3 className="text-base font-bold text-white">{s.title}</h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/50">{s.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {s.detail.split(" · ").map((d) => (
                          <span key={d} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold text-white/35">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ---------------- Industries  -  image-backed sector cards ---------------- */
function Industries() {
  const inds = [
    {
      icon: Stethoscope,
      label: "Healthcare",
      slug: "healthcare",
      blurb: "Sentara, CHKD & Bon Secours groups.",
      img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=600&q=75",
    },
    {
      icon: UtensilsCrossed,
      label: "Hospitality",
      slug: "hospitality",
      blurb: "Oceanfront dining & resort operators.",
      img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=75",
    },
    {
      icon: Building2,
      label: "Construction",
      slug: "construction",
      blurb: "GCs, trade contractors & ground-up builds.",
      img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=75",
    },
    {
      icon: Truck,
      label: "Transportation",
      slug: "transportation",
      blurb: "Coastal freight, logistics & owner-operators.",
      img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=75",
    },
    {
      icon: Briefcase,
      label: "Professional Services",
      slug: "professional-services",
      blurb: "Law, accounting & consulting firms.",
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=75",
    },
    {
      icon: ShoppingBag,
      label: "Retail",
      slug: "retail",
      blurb: "Storefronts, e-commerce & inventory.",
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=75",
    },
    {
      icon: Factory,
      label: "Manufacturing",
      slug: "manufacturing",
      blurb: "Production lines & industrial equipment.",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=75",
    },
  ];

  return (
    <section id="industries" className="relative overflow-hidden py-20 sm:py-28 bg-[color:var(--brand-cream)]/40">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
              Sector Ledger
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[color:var(--brand-charcoal)] md:text-4xl">
              Industries we underwrite first
            </h2>
            <p className="mt-3 text-muted-foreground">
              Virginia Beach-specific verticals with lenders who understand your sector  -  not generalists guessing at your margins.
            </p>
          </div>
          <Link to="/virginia-beach" className="btn-outline-light shrink-0">
            View all programs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {inds.map((ind) => {
            const Icon = ind.icon;
            return (
              <Link
                key={ind.slug}
                to="/industry/$slug"
                params={{ slug: ind.slug }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[color:var(--primary)]/20"
              >
                {/* Photo */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={ind.img}
                    alt={ind.label}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Dark scrim */}
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  {/* Icon pill over photo */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
                    <Icon className="h-3.5 w-3.5 text-white" />
                    <span className="text-[11px] font-bold text-white">{ind.label}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex-1 text-sm text-muted-foreground leading-relaxed">{ind.blurb}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-[color:var(--primary)]">
                      Explore sector
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 text-[color:var(--primary)] transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Success Stories  -  dark bg carousel ---------------- */
function SuccessStories() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  useEffect(() => {
    if (!api) return;
    let raf = 0;
    raf = window.requestAnimationFrame(() => {
      raf = window.requestAnimationFrame(() => api.reInit());
    });
    const container = api.containerNode();
    const ro = new ResizeObserver(() => api.reInit());
    if (container) ro.observe(container);
    const autoplay = setInterval(() => {
      if (!api.canScrollNext()) {
        api.scrollTo(0);
      } else {
        api.scrollNext();
      }
    }, 3500);
    return () => {
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      clearInterval(autoplay);
    };
  }, [api]);

  const stories = [
    {
      name: "Short North Manufacturing Co.",
      amount: "$420,000",
      result: "Same-day cash on open invoices through factoring.",
      type: "Invoice Factoring",
      person: "Marco Delgado",
      role: "Owner & Operator",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face&q=80",
    },
    {
      name: "Easton Corridor Distribution",
      amount: "$1,800,000",
      result: "Revolving AR line scaled with their big-box customer base.",
      type: "Accounts Receivable Financing",
      person: "Renee Calderon",
      role: "CFO",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face&q=80",
    },
    {
      name: "Dublin Dental Partners",
      amount: "$2,400,000",
      result: "SBA 7(a) for partner buy-in plus new CBCT scanner.",
      type: "SBA 7(a) Loan",
      person: "Dr. Priya Anand",
      role: "Managing Partner",
      photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=96&h=96&fit=crop&crop=face&q=80",
    },
    {
      name: "German Village Kitchen Co.",
      amount: "$180,000",
      result: "Working capital line that flexes with event-driven sales.",
      type: "Working Capital Loan",
      person: "Tomás Reyes",
      role: "Executive Chef & Co-Founder",
      photo: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=96&h=96&fit=crop&crop=face&q=80",
    },
    {
      name: "Grandview Heights HVAC",
      amount: "$650,000",
      result: "Equipment line to refresh the service fleet ahead of peak season.",
      type: "Equipment Financing",
      person: "Jordan Whitfield",
      role: "President",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&h=96&fit=crop&crop=face&q=80",
    },
    {
      name: "Short North Hospitality Group",
      amount: "$1,100,000",
      result: "Bridge financing to acquire a second concept off Roosevelt Ave.",
      type: "Business Term Loan",
      person: "Camila Vargas",
      role: "Founder",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96&h=96&fit=crop&crop=face&q=80",
    },
  ];

  return (
    <section id="stories" className="relative overflow-hidden bg-[color:var(--brand-charcoal)] py-20 text-white sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-[0.05]" />
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full blur-[120px]" style={{ background: "radial-gradient(circle, oklch(0.75 0.13 85 / 0.07) 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/30 bg-[color:var(--brand-bronze)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
              Success Stories
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {CITY} businesses Whitfield Credit has funded
            </h2>
            <p className="mt-3 text-white/55">
              Composite outcomes from real deals across Coastal Virginia. Names changed; structures unchanged.
            </p>
          </div>
        </div>

        <div className="relative mt-12">
          <Carousel opts={{ align: "start" }} setApi={setApi} className="relative">
            <CarouselContent className="-ml-4">
              {stories.map((s) => (
                <CarouselItem key={s.name} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                  <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-[color:var(--brand-bronze)]/30 hover:bg-white/8">
                    {/* Quote mark */}
                    <div aria-hidden className="mb-4 text-4xl font-black leading-none text-[color:var(--brand-bronze)]/30">"</div>
                    {/* Stars */}
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={`star-${s.name}-${i}`} className="h-3.5 w-3.5 fill-[color:var(--brand-bronze)] text-[color:var(--brand-bronze)]" />
                      ))}
                    </div>
                    <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/40">{s.type}</div>
                    {/* Amount */}
                    <div className="mt-3 text-3xl font-black text-[color:var(--brand-bronze)]">{s.amount}</div>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{s.result}</p>
                    {/* Person */}
                    <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                      <img
                        src={s.photo}
                        alt={s.person}
                        className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-[color:var(--brand-bronze)]/30"
                      />
                      <div>
                        <div className="text-sm font-semibold text-white">{s.person}</div>
                        <div className="text-xs text-white/45">{s.role} · {s.name}</div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 flex items-center gap-3">
              <CarouselPrevious className="static translate-y-0 border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white" />
              <CarouselNext className="static translate-y-0 border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

/* ---------------- City Intro (SEO copy) ---------------- */
function CityIntro() {
  const neighborhoods = [
    "Virginia Beach Oceanfront", "Town Center", "Hilltop", "Kempsville",
    "Princess Anne", "Great Neck", "Chesapeake", "Norfolk", "Suffolk", "Hampton",
  ];
  const uses = [
    { label: "Expansion", icon: TrendingUp },
    { label: "Payroll", icon: Users },
    { label: "Inventory", icon: Package },
    { label: "Equipment", icon: Wrench },
    { label: "Marketing", icon: Target },
    { label: "Cash Flow", icon: Banknote },
  ];
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* decorative shapes */}
      <svg aria-hidden className="pointer-events-none absolute left-[2%] top-12 opacity-[0.05]" width="34" height="34" viewBox="0 0 34 34" fill="none"><circle cx="17" cy="17" r="16" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--primary)]"/></svg>
      <svg aria-hidden className="pointer-events-none absolute right-[5%] top-8 opacity-[0.045]" width="22" height="22" viewBox="0 0 22 22" fill="none"><line x1="11" y1="0" x2="11" y2="22" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--brand-bronze)]"/><line x1="0" y1="11" x2="22" y2="11" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--brand-bronze)]"/></svg>
      <svg aria-hidden className="pointer-events-none absolute left-[40%] bottom-6 opacity-[0.04]" width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--primary)]" transform="rotate(22 9 9)"/></svg>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
              Serving Coastal Virginia
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[color:var(--brand-charcoal)] md:text-4xl">
              Business Loans for {CITY} Companies
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Whether you operate in {neighborhoods.slice(0, 5).join(", ")} or anywhere across
              Hampton Roads and Coastal Virginia, our lending bench helps local businesses secure the
              capital they need to grow.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              From <strong className="font-semibold text-foreground">SBA 7(a) loans</strong> and{" "}
              <strong className="font-semibold text-foreground">business lines of credit</strong> to{" "}
              <strong className="font-semibold text-foreground">equipment financing</strong>,{" "}
              <strong className="font-semibold text-foreground">working capital loans</strong> and{" "}
              <strong className="font-semibold text-foreground">invoice factoring</strong>, we
              connect {CITY} owners with the right funding product, fast.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {neighborhoods.map((n) => (
                <span
                  key={n}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground hover:border-[color:var(--primary)]/30 hover:text-[color:var(--primary)] cursor-default transition-colors"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
            <h3 className="text-lg font-bold text-foreground">Common uses of funding</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              What {CITY} business owners typically finance with us.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {uses.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 transition-all hover:border-[color:var(--primary)]/30 hover:bg-[color:var(--primary)]/5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[color:var(--primary)]/8 transition-colors group-hover:bg-[color:var(--primary)]/15">
                    <Icon className="h-4 w-4 text-[color:var(--primary)]" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <Link to="/apply-now" className="btn-primary w-full justify-center">

                Get pre-qualified
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Security  -  horizontal trust strip ---------------- */
function Security() {
  const items = [
    { icon: Lock, title: "SSL Secured", desc: "256-bit encryption" },
    { icon: ShieldCheck, title: "Bank-Level Encryption", desc: "Data protected in transit & at rest" },
    { icon: Users, title: "Privacy Protected", desc: "Never sold to third parties" },
    { icon: CheckCircle2, title: "Virginia-Licensed Partners", desc: "Licensed lending advisors" },
  ];
  return (
    <section className="relative overflow-hidden border-y border-border bg-[color:var(--brand-cream)] py-14">
      {/* decorative shapes */}
      <svg aria-hidden className="pointer-events-none absolute right-[6%] top-4 opacity-[0.06]" width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="1" y="1" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--primary)]" transform="rotate(45 13 13)"/></svg>
      <svg aria-hidden className="pointer-events-none absolute left-[3%] bottom-3 opacity-[0.055]" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--brand-bronze)]"/><circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="1" className="text-[color:var(--brand-bronze)]"/></svg>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color:var(--primary)]/10">
                <Icon className="h-5 w-5 text-[color:var(--primary)]" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">{title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ  -  two-column layout ---------------- */
function FAQSection() {
  return (
    <section id="faq" className="relative overflow-hidden py-20 sm:py-28">
      {/* decorative shapes */}
      <svg aria-hidden className="pointer-events-none absolute right-[3%] top-16 opacity-[0.05]" width="30" height="30" viewBox="0 0 30 30" fill="none"><polygon points="15,2 28,27 2,27" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="text-[color:var(--primary)]"/></svg>
      <svg aria-hidden className="pointer-events-none absolute left-[6%] bottom-12 opacity-[0.045]" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="1" y="1" width="22" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--brand-bronze)]" transform="rotate(15 12 12)"/></svg>
      <svg aria-hidden className="pointer-events-none absolute right-[25%] bottom-8 opacity-[0.04]" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--primary)]"/></svg>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          {/* Left sticky header */}
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
              FAQ
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[color:var(--brand-charcoal)] md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything {CITY} business owners want to know before applying.
            </p>
            <div className="mt-8">
              <Link to="/apply-now" className="btn-primary w-full justify-center sm:w-auto text-base px-7 py-3.5">

                Apply Now  -  Soft Pull
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-xs text-muted-foreground">No commitment required. Free consultation.</p>
            </div>
          </div>

          {/* Right  -  accordion */}
          <Accordion type="single" collapsible className="w-full space-y-3">
            {HOME_FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="rounded-2xl border border-border bg-card px-6 data-[state=open]:border-[color:var(--primary)]/25 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA  -  dramatic dark banner ---------------- */
function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-20 text-white sm:py-28"
      style={{ backgroundImage: "var(--gradient-hero)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-15" />
      {/* Decorative rings */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/30 bg-[color:var(--brand-bronze)]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--brand-bronze)]">
          Ready to move?
        </div>
        <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Ready to talk capital in {CITY}?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/65">
          Get matched with Virginia-licensed lenders serving {CITY_STATE}. Soft credit pull, no obligation.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/apply-now" className="btn-primary text-base px-10 py-4">

            Apply Now
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={SITE_CONFIG.phoneHref} className="btn-ghost-dark text-base px-10 py-4">
            <PhoneCall className="h-4 w-4" />
            {SITE_CONFIG.phone}
          </a>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-[11px] text-white/40">
          <span className="inline-flex items-center gap-1.5"><Lock className="h-3 w-3" /> Soft pull only</span>
          <span>·</span>
          <span>No commitment required</span>
          <span>·</span>
          <span>Free consultation</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="bg-[color:var(--brand-charcoal)] text-white/70">
      {/* Top CTA strip */}
      <div className="border-b border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/35 mb-1">Ready to move?</div>
              <p className="text-lg font-bold text-white">Get matched with Virginia-active lenders today.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/apply-now" className="btn-primary py-2.5 px-6 text-[12px]">

                Apply Now
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a href={SITE_CONFIG.phoneHref} className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-all">
                <PhoneCall className="h-4 w-4 text-white/50" />
                {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand col */}
          <div>
            <img src={siteLogoUrl} width={843} height={296} alt={SITE_CONFIG.name} className="h-20 w-auto" />
            <address className="mt-5 not-italic space-y-1.5 text-sm text-white/45">
              {SITE_CONFIG.hasPublicOffice ? (
                <div>
                  {SITE_CONFIG.address.streetAddress}<br />
                  {SITE_CONFIG.address.addressLocality}, {SITE_CONFIG.address.addressRegion} {SITE_CONFIG.address.postalCode}
                </div>
              ) : (
                <div>Serving {SITE_CONFIG.areasServed.join(" · ")}</div>
              )}
              <div>
                <a href={SITE_CONFIG.phoneHref} className="hover:text-white transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </div>
            </address>
            {SITE_CONFIG.license.state && SITE_CONFIG.license.licenseNumber && (
              <div className="mt-4 inline-block rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                {SITE_CONFIG.license.state} License #{SITE_CONFIG.license.licenseNumber}
              </div>
            )}
          </div>

          <FooterCol title="Capital Programs">
            <FooterPillarLink slug="invoice-factoring" label="Invoice Factoring" />
            <FooterPillarLink slug="accounts-receivable-financing" label="AR Financing" />
            <FooterPillarLink slug="small-business-loans" label="Small Business Loans" />
            <FooterPillarLink slug="sba-loans" label="SBA Loans" />
            <FooterPillarLink slug="working-capital-loans" label="Working Capital" />
            <FooterPillarLink slug="equipment-financing" label="Equipment Financing" />
          </FooterCol>

          <FooterCol title="Industries">
            <FooterIndustryLink slug="healthcare" label="Healthcare" />
            <FooterIndustryLink slug="construction" label="Construction" />
            <FooterIndustryLink slug="hospitality" label="Hospitality" />
            <FooterIndustryLink slug="transportation" label="Transportation" />
            <FooterIndustryLink slug="retail" label="Retail" />
            <FooterIndustryLink slug="professional-services" label="Professional Services" />
          </FooterCol>

          <FooterCol title="Company">
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/virginia-beach" className="hover:text-white transition-colors">Virginia Beach Hub</Link></li>
            <li><Link to="/" hash="how" className="hover:text-white transition-colors">How It Works</Link></li>
            <li><Link to="/" hash="faq" className="hover:text-white transition-colors">FAQs</Link></li>
            <li><Link to="/" hash="stories" className="hover:text-white transition-colors">Success Stories</Link></li>
            <li><Link to="/apply-now" className="hover:text-white transition-colors">Apply Now</Link></li>
          </FooterCol>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-white/35">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <p>(c) {new Date().getFullYear()} {SITE_CONFIG.name} · {CITY_STATE}. All rights reserved.</p>
            <p>
              Reviewed by{" "}
              <a href={SITE_CONFIG.author.profileUrl} rel="author" className="text-white/50 hover:text-white/80 transition-colors">
                {SITE_CONFIG.author.name}
              </a>
              , {SITE_CONFIG.author.title} ({SITE_CONFIG.author.credentials}).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <div>
      <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm text-white/55">
        {children}
      </ul>
    </div>
  );
}

function FooterPillarLink({ slug, label }: Readonly<{ slug: string; label: string }>) {
  return (
    <li>
      <Link to="/pillar/$slug" params={{ slug }} className="hover:text-[color:var(--brand-bronze)] transition-colors">
        {label}
      </Link>
    </li>
  );
}

function FooterIndustryLink({ slug, label }: Readonly<{ slug: string; label: string }>) {
  return (
    <li>
      <Link to="/industry/$slug" params={{ slug }} className="hover:text-[color:var(--brand-bronze)] transition-colors">
        {label}
      </Link>
    </li>
  );
}
