import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getIndustry, INDUSTRIES, type Service } from "@/lib/industries-data";
import { Header, Footer } from "./index";
import { buildHead } from "@/lib/seo";
import { buildGraph, serviceNode } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";
import { INDUSTRY_BODIES } from "@/lib/industries-content";

const siteFavUrl = "/lumenfav-removebg.png";

export const Route = createFileRoute("/industry/$slug")({
  head: ({ params }) => {
    const ind = getIndustry(params.slug);
    const title = ind ? `${ind.label} Business Financing` : "Industry Financing";
    const description = ind?.intro ?? "Specialized business financing for your industry.";
    const path = `/industry/${params.slug}`;
    return buildHead({
      title,
      description,
      path,
      schema: buildGraph({
        title,
        description,
        path,
        extraNodes: ind
          ? [serviceNode({ path, name: `${ind.label} Business Financing`, description, serviceType: ind.label })]
          : [],
      }),
    });
  },
  loader: ({ params }) => {
    if (!getIndustry(params.slug)) throw notFound();
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Industry not found</h1>
      <p className="mt-3 text-muted-foreground">We don't have a page for that industry yet.</p>
      <Button asChild className="mt-6">
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <Button onClick={reset} className="mt-6">Try again</Button>
    </div>
  ),
  component: IndustryPage,
});

function IndustryPage() {
  const { slug } = Route.useParams();
  const industry = getIndustry(slug)!;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [industry.slug]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div aria-hidden className="h-20" />
      <main>
        {/* Breadcrumb */}
        <div className="border-b border-border/60 bg-[color:var(--brand-cream)]">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-[color:var(--brand-bronze)]">
              <ArrowLeft className="h-3.5 w-3.5" /> Home
            </Link>
            <span className="text-muted-foreground">
              Sectors · <span className="text-foreground">{industry.label}</span>
            </span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-[color:var(--brand-charcoal)] py-24 text-white">
          <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-[0.07]" />
          <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-[600px] w-[600px] rounded-full blur-[140px]" style={{ background: "radial-gradient(circle, oklch(0.75 0.13 85 / 0.11) 0%, transparent 65%)" }} />

          <div className="relative mx-auto max-w-4xl px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/30 bg-[color:var(--brand-bronze)]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
              <Sparkles className="h-3.5 w-3.5" /> Sector Brief · {industry.label}
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {industry.label}
              <span className="block text-[color:var(--brand-bronze)]">Financing</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-semibold text-white/85">{industry.hero}</p>
            <p className="mt-4 max-w-2xl text-base text-white/65 md:text-lg">{industry.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/apply-now" className="btn-primary text-base px-7 py-3.5">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={SITE_CONFIG.phoneHref} className="btn-ghost-dark text-base px-7 py-3.5">
                <Phone className="h-4 w-4" /> Talk to a specialist
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[color:var(--brand-bronze)]" /> Soft credit pull</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--brand-bronze)]" /> 24-hour decisions</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--brand-bronze)]" /> 75+ lender network</span>
            </div>
          </div>
        </section>

        {/* Sector memo */}
        {INDUSTRY_BODIES[industry.slug] && (
          <section className="bg-[color:var(--brand-cream)] py-16">
            <div className="mx-auto max-w-4xl px-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
                Sector Memo
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                {industry.label} financing for Virginia Beach businesses
              </h2>
              {INDUSTRY_BODIES[industry.slug].map((p, i) => (
                <p key={i} className="mt-4 text-muted-foreground">{p}</p>
              ))}
            </div>
          </section>
        )}

        {/* Services grid */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
            Programs · {industry.label}
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            The plays we route most for {industry.label.toLowerCase()}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Every option starts with a soft credit pull. Pre-screen takes 60 seconds.
          </p>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industry.services.map((svc: Service, i: number) => {
              const SIcon = svc.icon;
              return (
                <li key={svc.slug}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--brand-charcoal)]/30 hover:bg-[color:var(--brand-charcoal)] hover:text-white hover:shadow-lg">
                    <div aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 rounded-l-2xl bg-[color:var(--brand-bronze)] transition-transform duration-500 group-hover:scale-y-100" />
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[color:var(--brand-bronze)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--primary)]/10 transition-colors group-hover:bg-white/10">
                        <SIcon className="h-5 w-5 text-[color:var(--primary)] transition-colors group-hover:text-[color:var(--brand-bronze)]" />
                      </div>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">{svc.title}</h3>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-white/55">{svc.tagline}</p>
                    <p className="mt-3 flex-1 text-sm text-foreground/80 transition-colors group-hover:text-white/75">{svc.description}</p>
                    <ul className="mt-4 space-y-2">
                      {svc.bullets.map((b: string) => (
                        <li key={b} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--brand-bronze)]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/40 bg-[color:var(--brand-bronze)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
                      {svc.highlight}
                    </div>
                    <div className="mt-5">
                      <Link
                        to="/apply-now"
                        className="btn-primary w-full justify-center py-2.5 text-[11px]"
                      >
                        Apply Now <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Other industries */}
        <section className="bg-[color:var(--brand-cream)] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
                  Other Sectors
                </div>
                <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">Explore other sectors</h2>
              </div>
              <Link to="/" className="btn-outline-light inline-flex items-center gap-2 px-5 py-2.5 text-xs">
                View all
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {INDUSTRIES.filter((ind) => ind.slug !== industry.slug).slice(0, 10).map((ind, idx) => {
                const I = ind.icon;
                return (
                  <li key={ind.slug}>
                    <Link
                      to="/industry/$slug"
                      params={{ slug: ind.slug }}
                      className="group relative flex h-full flex-col items-start gap-2 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--brand-charcoal)]/30 hover:bg-[color:var(--brand-charcoal)] hover:text-white hover:shadow-md"
                    >
                      <div aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 rounded-l-2xl bg-[color:var(--brand-bronze)] transition-transform duration-500 group-hover:scale-y-100" />
                      <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[color:var(--brand-bronze)]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <I className="h-6 w-6 text-[color:var(--primary)] transition-colors group-hover:text-[color:var(--brand-bronze)]" />
                      <span className="text-sm font-medium">{ind.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-[color:var(--brand-charcoal)] py-24 text-white">
          <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-[0.06]" />
          <div aria-hidden className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full blur-[100px] opacity-20" style={{ background: "radial-gradient(circle, oklch(0.75 0.13 85) 0%, transparent 70%)" }} />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/30 bg-[color:var(--brand-bronze)]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
              Ready to fund · {industry.label}
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Move first.
              <span className="block text-[color:var(--brand-bronze)]">Pre-qualify in 60 seconds.</span>
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
