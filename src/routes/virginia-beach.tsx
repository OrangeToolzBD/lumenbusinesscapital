import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { ArrowRight, MapPin, Banknote, Briefcase, Building2, Phone } from "lucide-react";
import { Header, Footer } from "./index";
import { MONEY_PILLARS, VERTICAL_PILLARS, TOP_MONEY_PILLARS } from "@/lib/pillars-data";
import { SUBURBS } from "@/lib/suburbs-data";
import { buildHead } from "@/lib/seo";
import { buildGraph } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";

const siteFavUrl = "/lumenfav-removebg.png";

export const Route = createFileRoute("/virginia-beach")({
  head: ({ matches, match }) => {
    if (matches[matches.length - 1]?.routeId !== match.routeId) return {};
    const title = "Virginia Beach Business Loans Hub";
    const description =
      "The complete Virginia Beach, VA business funding directory: 24 loan programs across 10 neighborhoods and adjacent communities, from Downtown to Short North, German Village, Dublin and beyond.";
    return buildHead({
      title,
      description,
      path: "/virginia-beach",
      schema: buildGraph({ title, description, path: "/virginia-beach", pageType: "CollectionPage" }),
    });
  },
  component: VirginiaBeachHub,
});

function VirginiaBeachHub() {
  const matches = useMatches();
  const isLeaf = matches[matches.length - 1]?.routeId === "/virginia-beach";
  if (!isLeaf) return <Outlet />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[color:var(--brand-charcoal)] py-28 text-white">
          <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-[0.07]" />
          <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-[600px] w-[600px] rounded-full blur-[140px]" style={{ background: "radial-gradient(circle, oklch(0.75 0.13 85 / 0.11) 0%, transparent 65%)" }} />

          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/30 bg-[color:var(--brand-bronze)]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
              <MapPin className="h-3.5 w-3.5" /> The Virginia Beach Directory
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Every program.{" "}
              <span className="text-[color:var(--brand-bronze)]">Every neighborhood.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/65">
              The complete Lumen Business Capital directory for Virginia Beach, VA  -  every loan program we broker, mapped to every neighborhood and adjacent community we serve.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/apply-now" className="btn-primary text-base px-8 py-3.5">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/" className="btn-ghost-dark text-base px-8 py-3.5">
                Back to home
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
              <span>10 Neighborhoods</span>
              <span aria-hidden>·</span>
              <span>24 Loan Programs</span>
              <span aria-hidden>·</span>
              <span>60+ Local Pages</span>
            </div>
          </div>
        </section>

        {/* Neighborhoods grid */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
                Coverage Map
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Neighborhoods & adjacent communities
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Each location has a dedicated page with local landmarks, sample businesses we fund, and the six GBP-active loan programs for that neighborhood.
              </p>
            </div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {String(SUBURBS.length).padStart(3, "0")} locations
            </span>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUBURBS.map((s, i) => (
              <li key={s.slug}>
                <Link
                  to="/virginia-beach/$suburb"
                  params={{ suburb: s.slug }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--brand-charcoal)]/30 hover:bg-[color:var(--brand-charcoal)] hover:text-white hover:shadow-lg"
                >
                  <div aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 rounded-l-2xl bg-[color:var(--brand-bronze)] transition-transform duration-500 group-hover:scale-y-100" />
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-xs font-bold tracking-[0.18em] text-[color:var(--brand-bronze)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <MapPin className="h-4 w-4 shrink-0 text-[color:var(--primary)] transition-colors group-hover:text-[color:var(--brand-bronze)]" />
                  </div>
                  <div className="mt-4 flex-1">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-white/50">{s.county}</div>
                    <h3 className="mt-1 text-lg font-bold">{s.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground transition-colors group-hover:text-white/60">{s.tagline}</p>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:border-white/15 group-hover:text-[color:var(--brand-bronze)]">
                    <span>Explore</span>
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Money pillars */}
        <PillarGrid
          title="Money pillars  -  general business financing"
          subtitle="The 14 core funding programs Whitfield Credit brokers for Virginia Beach businesses, with the six active GBP plays first."
          icon={Banknote}
          pillars={MONEY_PILLARS}
        />

        {/* Suburb x Services matrix */}
        <SuburbServicesMatrix />

        {/* Vertical pillars */}
        <PillarGrid
          title="Vertical pillars  -  industry-specific funding"
          subtitle="10 industry-specialized lending programs for Coastal Virginia operators."
          icon={Briefcase}
          pillars={VERTICAL_PILLARS}
          alt
        />
      </main>
      <Footer />
    </div>
  );
}

function PillarGrid({
  title,
  subtitle,
  icon: Icon,
  pillars,
  alt,
}: {
  title: string;
  subtitle: string;
  icon: typeof Banknote;
  pillars: typeof MONEY_PILLARS;
  alt?: boolean;
}) {
  return (
    <section className={`border-t border-border/60 py-20 ${alt ? "bg-[color:var(--brand-cream)]" : ""}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color:var(--primary)]/10">
            <Icon className="h-5 w-5 text-[color:var(--primary)]" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
              {alt ? "Vertical Pillars · Sector Specific" : "Money Pillars · General"}
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
            <p className="mt-1 text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <li key={p.slug}>
              <Link
                to="/pillar/$slug"
                params={{ slug: p.slug }}
                className="group relative flex items-start justify-between gap-3 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--brand-charcoal)]/30 hover:bg-[color:var(--brand-charcoal)] hover:text-white hover:shadow-md"
              >
                <div aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 rounded-l-2xl bg-[color:var(--brand-bronze)] transition-transform duration-500 group-hover:scale-y-100" />
                <div className="min-w-0">
                  <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[color:var(--brand-bronze)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-1 text-sm font-semibold">{p.title}</div>
                  <div className="mt-0.5 truncate text-xs text-muted-foreground transition-colors group-hover:text-white/60">{p.tagline}</div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-[color:var(--brand-bronze)] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SuburbServicesMatrix() {
  return (
    <section className="border-t border-border/60 bg-[color:var(--brand-cream)] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color:var(--primary)]/10">
            <Building2 className="h-5 w-5 text-[color:var(--primary)]" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
              Matrix · Neighborhood x Program
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">Services by neighborhood</h2>
            <p className="mt-1 max-w-2xl text-muted-foreground">
              Every neighborhood we serve, mapped to the six GBP-active money pillars Virginia Beach owners ask for most.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {SUBURBS.map((s, i) => (
            <div key={s.slug} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3 border-b border-border pb-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-[color:var(--brand-bronze)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{s.county}</span>
                  </div>
                  <Link
                    to="/virginia-beach/$suburb"
                    params={{ suburb: s.slug }}
                    className="mt-1 inline-flex items-center gap-1.5 text-lg font-bold transition-colors hover:text-[color:var(--brand-bronze)]"
                  >
                    {s.name} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">{s.tagline}</p>
                </div>
                <MapPin className="h-5 w-5 shrink-0 text-[color:var(--primary)]" />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {TOP_MONEY_PILLARS.map((p) => (
                  <Link
                    key={p.slug}
                    to="/virginia-beach/$suburb/$pillar"
                    params={{ suburb: s.slug, pillar: p.slug }}
                    className="group inline-flex items-center justify-between gap-2 rounded-xl border border-border/60 bg-background px-3 py-2 text-sm transition-all hover:border-[color:var(--brand-bronze)]/50 hover:bg-[color:var(--brand-bronze)]/8"
                  >
                    <span className="truncate">{p.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-[color:var(--brand-bronze)] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <span>ZIPs · {s.zips.join(", ")}</span>
                <Link
                  to="/virginia-beach/$suburb"
                  params={{ suburb: s.slug }}
                  className="text-[color:var(--brand-bronze)] transition-colors hover:underline"
                >
                  View hub <ArrowRight className="inline h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
