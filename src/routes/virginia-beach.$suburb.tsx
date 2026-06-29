import { createFileRoute, Link, notFound, Outlet, useMatches } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { Header, Footer } from "./index";
import { Button } from "@/components/ui/button";
import { getSuburb, type Suburb } from "@/lib/suburbs-data";
import { TOP_MONEY_PILLARS, VERTICAL_PILLARS } from "@/lib/pillars-data";
import { buildHead } from "@/lib/seo";
import { buildGraph, placeNode } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";
import { SUBURB_BODIES } from "@/lib/suburbs-content";

const siteFavUrl = "/lumenfav-removebg.png";

export const Route = createFileRoute("/virginia-beach/$suburb")({
  head: ({ params, matches, match }) => {
    if (matches[matches.length - 1]?.routeId !== match.routeId) return {};
    const s = getSuburb(params.suburb);
    const title = s ? `Business Loans in ${s.name}, VA` : "Virginia Beach Neighborhood";
    const description = s?.intro?.slice(0, 158) ?? "Virginia Beach neighborhood business funding.";
    const path = `/virginia-beach/${params.suburb}`;
    return buildHead({
      title,
      description,
      path,
      schema: buildGraph({
        title,
        description,
        path,
        extraNodes: s ? [placeNode({ path, name: `${s.name}, VA` })] : [],
      }),
    });
  },
  loader: ({ params }) => {
    const suburb = getSuburb(params.suburb);
    if (!suburb) throw notFound();
    return { suburb } as { suburb: Suburb };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Neighborhood not found</h1>
      <Button asChild className="mt-6"><Link to="/virginia-beach">Back to hub</Link></Button>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <Button onClick={reset} className="mt-6">Try again</Button>
    </div>
  ),
  component: SuburbPage,
});

function SuburbPage() {
  const { suburb } = Route.useLoaderData();
  const matches = useMatches();
  const isLeaf = matches[matches.length - 1]?.routeId === "/virginia-beach/$suburb";
  if (!isLeaf) return <Outlet />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div aria-hidden className="h-20" />
      <main>
        {/* Breadcrumb */}
        <div className="border-b border-border/60 bg-[color:var(--brand-cream)]">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]">
            <Link to="/virginia-beach" className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-[color:var(--brand-bronze)]">
              <ArrowLeft className="h-3.5 w-3.5" /> Virginia Beach Hub
            </Link>
            <span className="text-muted-foreground">
              {suburb.county} · <span className="text-foreground">{suburb.name}</span>
            </span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-[color:var(--brand-charcoal)] py-24 text-white">
          <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-[0.07]" />
          <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-[600px] w-[600px] rounded-full blur-[140px]" style={{ background: "radial-gradient(circle, oklch(0.75 0.13 85 / 0.11) 0%, transparent 65%)" }} />

          <div className="relative mx-auto max-w-4xl px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/30 bg-[color:var(--brand-bronze)]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
              <Sparkles className="h-3.5 w-3.5" /> {suburb.county} · ZIP {suburb.zips.join(", ")}
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {suburb.name}
              <span className="block text-[color:var(--brand-bronze)]">Business Loans</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-semibold text-white/85">{suburb.tagline}</p>
            <p className="mt-4 max-w-2xl text-base text-white/65 md:text-lg">{suburb.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/apply-now" className="btn-primary text-base px-7 py-3.5">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={SITE_CONFIG.phoneHref} className="btn-ghost-dark text-base px-7 py-3.5">
                <Phone className="h-4 w-4" /> {SITE_CONFIG.phone}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[color:var(--brand-bronze)]" /> Soft credit pull only</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--brand-bronze)]" /> 24-hour decisions</span>
            </div>
          </div>
        </section>

        {/* Local context  -  landmarks + industries */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
                <MapPin className="h-4 w-4" /> Local Landmarks
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Our {suburb.name} advisors work directly with operators across these areas.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {suburb.landmarks.map((l: string) => (
                  <li key={l} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/80">{l}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
                <Building2 className="h-4 w-4" /> Industries We Fund Here
              </div>
              <ul className="mt-5 space-y-2.5">
                {suburb.industries.map((ind: string, idx: number) => (
                  <li key={ind} className="flex items-center gap-3 text-sm">
                    <span className="font-mono text-[10px] font-bold tracking-[0.14em] text-[color:var(--brand-bronze)]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Long-form context */}
        {SUBURB_BODIES[suburb.slug] && (
          <section className="bg-[color:var(--brand-cream)] py-16">
            <div className="mx-auto max-w-4xl px-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
                Local Memo
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                Business funding in {suburb.name}
              </h2>
              {SUBURB_BODIES[suburb.slug].map((p, i) => (
                <p key={i} className="mt-4 text-muted-foreground">{p}</p>
              ))}
            </div>
          </section>
        )}

        {/* Sample businesses */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
              Case Files
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
              {suburb.name} businesses Whitfield Credit works with
            </h2>
            <p className="mt-2 text-muted-foreground">Representative case studies  -  composite profiles drawn from real funding outcomes.</p>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {suburb.sampleBusinesses.map((b: { name: string; type: string; useCase: string }, i: number) => (
                <li key={b.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-[color:var(--brand-bronze)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{b.type}</div>
                  <h3 className="mt-2 text-lg font-semibold">{b.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{b.useCase}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Top money pillars */}
        <section className="bg-[color:var(--brand-cream)] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
              Top Programs · {suburb.name}
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
              The six plays {suburb.name} owners ask for most
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {TOP_MONEY_PILLARS.map((p, i) => (
                <li key={p.slug}>
                  <Link
                    to="/virginia-beach/$suburb/$pillar"
                    params={{ suburb: suburb.slug, pillar: p.slug }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--brand-charcoal)]/30 hover:bg-[color:var(--brand-charcoal)] hover:text-white hover:shadow-md"
                  >
                    <div aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 rounded-l-2xl bg-[color:var(--brand-bronze)] transition-transform duration-500 group-hover:scale-y-100" />
                    <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[color:var(--brand-bronze)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="mt-2 text-sm font-semibold">{p.title}</div>
                    <div className="mt-1 flex-1 text-xs text-muted-foreground transition-colors group-hover:text-white/60">{p.tagline}</div>
                    <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--brand-bronze)]">
                      Open in {suburb.name} <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Industry (vertical) pillars */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
              Industry Programs
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
              Vertical pillars · {suburb.name}
            </h2>
            <p className="mt-2 text-muted-foreground">
              All ten industry-specific programs are available to {suburb.name} operators.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {VERTICAL_PILLARS.slice(0, 9).map((p, i) => (
                <li key={p.slug}>
                  <Link
                    to="/pillar/$slug"
                    params={{ slug: p.slug }}
                    className="group relative flex min-w-0 items-start justify-between gap-3 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--brand-charcoal)]/30 hover:bg-[color:var(--brand-charcoal)] hover:text-white hover:shadow-md"
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

        {/* CTA */}
        <section className="relative overflow-hidden bg-[color:var(--brand-charcoal)] py-24 text-white">
          <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-[0.06]" />
          <div aria-hidden className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full blur-[100px] opacity-20" style={{ background: "radial-gradient(circle, oklch(0.75 0.13 85) 0%, transparent 70%)" }} />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/30 bg-[color:var(--brand-bronze)]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
              Funding · {suburb.name}
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Fund your {suburb.name} business, fast.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/65">
              Get matched with the right program in minutes  -  soft credit pull, no obligation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/apply-now" className="btn-primary text-base px-9 py-4">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={SITE_CONFIG.phoneHref} className="btn-ghost-dark text-base px-9 py-4">
                <Phone className="h-4 w-4" /> Call now
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
