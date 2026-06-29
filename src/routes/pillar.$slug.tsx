import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { Header, Footer } from "./index";
import { Button } from "@/components/ui/button";
import { getPillar, PILLARS, type Pillar } from "@/lib/pillars-data";
import { PILLAR_BODIES } from "@/lib/pillars-content";
import { SUBURBS } from "@/lib/suburbs-data";
import { buildHead } from "@/lib/seo";
import { buildGraph, serviceNode } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";

const siteFavUrl = "/lumenfav-removebg.png";

export const Route = createFileRoute("/pillar/$slug")({
  head: ({ params }) => {
    const p = getPillar(params.slug);
    const title = p ? `${p.title} in Virginia Beach, VA` : "Loan Program";
    const description = p?.description ?? "Virginia Beach business financing programs from Whitfield Credit.";
    const path = `/pillar/${params.slug}`;
    return buildHead({
      title, description, path,
      schema: buildGraph({
        title, description, path,
        extraNodes: p ? [serviceNode({ path, name: p.title, description: p.description, serviceType: p.title })] : [],
      }),
    });
  },
  loader: ({ params }) => {
    const pillar = getPillar(params.slug);
    if (!pillar) throw notFound();
    return { pillar } as { pillar: Pillar };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Loan program not found</h1>
      <Button asChild className="mt-6"><Link to="/virginia-beach">Back to hub</Link></Button>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <Button onClick={reset} className="mt-6">Try again</Button>
    </div>
  ),
  component: PillarPage,
});

function PillarPage() {
  const { pillar } = Route.useLoaderData();
  const related = PILLARS.filter((p) => p.kind === pillar.kind && p.slug !== pillar.slug).slice(0, 6);
  const kindLabel = pillar.kind === "money" ? "Money Pillar" : "Vertical Pillar";

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
              {kindLabel} · <span className="text-foreground">{pillar.title}</span>
            </span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-[color:var(--brand-charcoal)] py-24 text-white">
          <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-[0.07]" />
          <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-[600px] w-[600px] rounded-full blur-[140px]" style={{ background: "radial-gradient(circle, oklch(0.75 0.13 85 / 0.11) 0%, transparent 65%)" }} />

          <div className="relative mx-auto max-w-4xl px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/30 bg-[color:var(--brand-bronze)]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
              <Sparkles className="h-3.5 w-3.5" /> Program · {kindLabel}
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {pillar.title}
              <span className="block text-[color:var(--brand-bronze)]">in Virginia Beach</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-semibold text-white/80">{pillar.tagline}</p>
            <p className="mt-4 max-w-2xl text-base text-white/60 md:text-lg">{pillar.description}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {pillar.bullets.map((b: string) => (
                <li key={b} className="flex items-start gap-3 text-sm text-white/80">
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
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--brand-bronze)]" /> VA-licensed partners</span>
            </div>
          </div>
        </section>

        {/* Program memo */}
        <section className="bg-[color:var(--brand-cream)] py-16">
          <div className="mx-auto max-w-4xl px-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
              Program Memo
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
              {pillar.title} for Virginia Beach businesses
            </h2>
            {(PILLAR_BODIES[pillar.slug] ?? []).map((p, i) => (
              <p key={i} className="mt-4 text-muted-foreground">{p}</p>
            ))}
            <p className="mt-4 text-muted-foreground">
              Every Whitfield Credit application runs through Virginia-licensed lending partners —
              one soft credit pull, side-by-side offers, no fee until close.
            </p>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
              Coverage · {pillar.title}
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
              {pillar.title} by Virginia Beach neighborhood
            </h2>
            <p className="mt-2 text-muted-foreground">Open a page tailored to your specific neighborhood or adjacent community.</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SUBURBS.map((s, i) => (
                <li key={s.slug}>
                  <Link
                    to="/virginia-beach/$suburb/$pillar"
                    params={{ suburb: s.slug, pillar: pillar.slug }}
                    className="group relative flex min-w-0 items-center justify-between gap-3 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--brand-charcoal)]/30 hover:bg-[color:var(--brand-charcoal)] hover:text-white hover:shadow-md"
                  >
                    <div aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 rounded-l-2xl bg-[color:var(--brand-bronze)] transition-transform duration-500 group-hover:scale-y-100" />
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[color:var(--brand-bronze)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="mt-1 text-sm font-semibold">{pillar.title}, {s.name}</div>
                      <div className="mt-0.5 truncate text-xs text-muted-foreground transition-colors group-hover:text-white/60">{s.county}</div>
                    </div>
                    <MapPin className="h-4 w-4 shrink-0 text-[color:var(--primary)] transition-colors group-hover:text-[color:var(--brand-bronze)]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Related pillars */}
        <section className="bg-[color:var(--brand-cream)] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
              Related {pillar.kind === "money" ? "Money Pillars" : "Vertical Pillars"}
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
              Other {pillar.kind === "money" ? "money" : "industry"} programs
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
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
              Pre-qualify · 60 seconds
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              {pillar.title}.
              <span className="block text-[color:var(--brand-bronze)]">Apply in 60 seconds.</span>
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
