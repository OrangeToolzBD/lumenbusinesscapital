import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { Header, Footer } from "./index";
import { Button } from "@/components/ui/button";
import { getSuburb, type Suburb } from "@/lib/suburbs-data";
import { getPillar, TOP_MONEY_PILLARS, type Pillar } from "@/lib/pillars-data";
import { buildHead } from "@/lib/seo";
import { buildGraph, serviceNode, placeNode } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";

const siteFavUrl = "/lumenfav-removebg.png";

export const Route = createFileRoute("/virginia-beach/$suburb/$pillar")({
  head: ({ params }) => {
    const s = getSuburb(params.suburb);
    const p = getPillar(params.pillar);
    const title = s && p ? `${p.title} in ${s.name}, VA` : "Virginia Beach Loan Program";
    const description =
      s && p
        ? `${p.title} for ${s.name} businesses: ${p.tagline.toLowerCase()}. ${p.highlight}. Soft credit pull only.`
        : "Virginia Beach business funding programs.";
    const path = `/virginia-beach/${params.suburb}/${params.pillar}`;
    return buildHead({
      title,
      description,
      path,
      schema: buildGraph({
        title,
        description,
        path,
        extraNodes:
          s && p
            ? [
                serviceNode({ path, name: `${p.title} in ${s.name}`, description: p.description, serviceType: p.title }),
                placeNode({ path, name: `${s.name}, VA` }),
              ]
            : [],
      }),
    });
  },
  loader: ({ params }) => {
    const suburb = getSuburb(params.suburb);
    const pillar = getPillar(params.pillar);
    if (!suburb || !pillar) throw notFound();
    return { suburb, pillar } as { suburb: Suburb; pillar: Pillar };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Button asChild className="mt-6"><Link to="/virginia-beach">Back to hub</Link></Button>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <Button onClick={reset} className="mt-6">Try again</Button>
    </div>
  ),
  component: SuburbPillarPage,
});

function SuburbPillarPage() {
  const { suburb, pillar } = Route.useLoaderData();
  const otherPillars = TOP_MONEY_PILLARS.filter((p) => p.slug !== pillar.slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div aria-hidden className="h-20" />
      <main>
        {/* Breadcrumb */}
        <div className="border-b border-border/60 bg-[color:var(--brand-cream)]">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]">
            <Link
              to="/virginia-beach/$suburb"
              params={{ suburb: suburb.slug }}
              className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-[color:var(--brand-bronze)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {suburb.name}
            </Link>
            <span className="text-muted-foreground">
              {pillar.title} · <span className="text-foreground">{suburb.name}</span>
            </span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-[color:var(--brand-charcoal)] py-24 text-white">
          <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-[0.07]" />
          <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-[600px] w-[600px] rounded-full blur-[140px]" style={{ background: "radial-gradient(circle, oklch(0.75 0.13 85 / 0.11) 0%, transparent 65%)" }} />

          <div className="relative mx-auto max-w-4xl px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/30 bg-[color:var(--brand-bronze)]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
              <MapPin className="h-3.5 w-3.5" /> {suburb.name} · {suburb.county}
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {pillar.title}
              <span className="block text-[color:var(--brand-bronze)]">in {suburb.name}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-semibold text-white/85">{pillar.tagline}</p>
            <p className="mt-4 max-w-2xl text-base text-white/65 md:text-lg">
              {pillar.description} For {suburb.name} business owners, this typically means working
              with operators near {suburb.landmarks.slice(0, 2).join(" and ")}:{" "}
              {suburb.industries.slice(0, 2).join(" and ").toLowerCase()} and service businesses
              tied to Virginia Beach's coastal economy and the broader Hampton Roads market.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {pillar.bullets.map((b: string) => (
                <li key={b} className="flex items-start gap-3 text-sm text-white/85">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--brand-bronze)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/40 bg-[color:var(--brand-bronze)]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
              {pillar.highlight}
            </div>

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
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--brand-bronze)]" /> OH-licensed partners</span>
            </div>
          </div>
        </section>

        {/* Local example */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
            Case File · 01
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
            A {suburb.name} example
          </h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="border-b border-border bg-[color:var(--brand-cream)] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
              {suburb.sampleBusinesses[0]!.type}
            </div>
            <div className="flex items-start gap-4 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--primary)]/10">
                <Sparkles className="h-5 w-5 text-[color:var(--primary)]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{suburb.sampleBusinesses[0]!.name}</h3>
                <p className="mt-3 text-muted-foreground">
                  A {suburb.sampleBusinesses[0]!.type.toLowerCase()} near {suburb.landmarks[0]} used{" "}
                  {pillar.title.toLowerCase()} for: {suburb.sampleBusinesses[0]!.useCase}. The deal
                  closed with a soft credit pull only  -  no impact to the owner's personal score.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Other pillars for this suburb */}
        <section className="bg-[color:var(--brand-cream)] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
              Other Programs · {suburb.name}
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
              Compare the other plays in {suburb.name}
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {otherPillars.map((p, i) => (
                <li key={p.slug}>
                  <Link
                    to="/virginia-beach/$suburb/$pillar"
                    params={{ suburb: suburb.slug, pillar: p.slug }}
                    className="group relative flex min-w-0 items-start justify-between gap-3 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--brand-charcoal)]/30 hover:bg-[color:var(--brand-charcoal)] hover:text-white hover:shadow-md"
                  >
                    <div aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 rounded-l-2xl bg-[color:var(--brand-bronze)] transition-transform duration-500 group-hover:scale-y-100" />
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[color:var(--brand-bronze)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="mt-1 text-sm font-semibold">{p.title}, {suburb.name}</div>
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
              Funding Brief · 60 seconds
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              {pillar.title}.
              <span className="block text-[color:var(--brand-bronze)]">In {suburb.name}. Fast.</span>
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/apply-now" className="btn-primary text-base px-9 py-4">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={SITE_CONFIG.phoneHref} className="btn-ghost-dark text-base px-9 py-4">
                <Phone className="h-4 w-4" /> Call the desk
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
