import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "./index";
import { buildHead } from "@/lib/seo";
import { buildGraph } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";
import { GHLForm } from "@/components/GHLForm";
import {
  CheckCircle2,
  Clock,
  Lock,
  Phone,
  ShieldCheck,
  ArrowRight,
  Zap,
  Users,
  Banknote,
  Star,
} from "lucide-react";

const CITY = "Virginia Beach";
const CITY_STATE = "Virginia Beach, VA";
const siteFavUrl = "/lumenfav-removebg.png";

export const Route = createFileRoute("/apply-now")({
  head: () => {
    const title = "Apply Now";
    const description = `Apply for a business loan in ${CITY_STATE}. Soft credit pull only, no impact to your credit score. Get matched with funding programs in 60 seconds.`;
    return buildHead({
      title,
      description,
      path: "/apply-now",
      noindex: true,
      schema: buildGraph({ title, description, path: "/apply-now" }),
    });
  },
  component: ApplyNowPage,
});

const STEPS = [
  { n: "01", label: "Brief", desc: "60-second business overview" },
  { n: "02", label: "Shop", desc: "Whitfield Credit pre-screens 75+ lenders" },
  { n: "03", label: "Compare", desc: "Real offers side-by-side" },
  { n: "04", label: "Funded", desc: "Wire in as little as 24 hours" },
];

function ApplyNowPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div aria-hidden className="h-20" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[color:var(--brand-charcoal)] py-20 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-[0.07]" />
        <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full blur-[130px]" style={{ background: "radial-gradient(circle, oklch(0.75 0.13 85 / 0.12) 0%, transparent 65%)" }} />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/30 bg-[color:var(--brand-bronze)]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
            <ShieldCheck className="h-3.5 w-3.5" /> Application · Step 1 of 4
          </div>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Tell us the brief.{" "}
            <span className="text-[color:var(--brand-bronze)]">We'll do the shopping.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/65">
            Share a few details and Whitfield Credit will pre-screen the right lenders across {CITY_STATE} and the broader Virginia market.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
            <span className="inline-flex items-center gap-1.5"><Lock className="h-3 w-3" /> Soft pull only</span>
            <span>·</span>
            <span>No credit impact</span>
            <span>·</span>
            <span>Free consultation</span>
          </div>
        </div>
      </section>

      {/* Step indicator */}
      <section className="border-b border-border bg-[color:var(--brand-cream)]">
        <ol className="mx-auto grid max-w-4xl grid-cols-2 gap-0 px-6 py-5 sm:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.n} className={`flex items-start gap-3 border-l-2 px-4 py-1 ${i === 0 ? "border-[color:var(--brand-bronze)]" : "border-border"}`}>
              <span className={`mt-0.5 font-mono text-[11px] font-bold tracking-[0.18em] ${i === 0 ? "text-[color:var(--brand-bronze)]" : "text-muted-foreground/50"}`}>
                {s.n}
              </span>
              <div>
                <div className={`text-sm font-semibold ${i === 0 ? "text-foreground" : "text-muted-foreground/55"}`}>{s.label}</div>
                <div className="text-[11px] text-muted-foreground/55">{s.desc}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <main className="mx-auto grid min-w-0 max-w-5xl gap-8 px-6 py-12 lg:grid-cols-[1fr_300px]">
        {/* Form card */}
        <div className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-[color:var(--brand-cream)] px-6 py-4">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-foreground/70">
              Funding Brief
            </span>
            <span className="rounded-full bg-[color:var(--brand-bronze)]/15 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wide text-[color:var(--brand-bronze)]">~ 60 sec</span>
          </div>
          <div className="p-6 sm:p-8">
            <GHLForm />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
          {/* Why this is safe */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-sm font-bold">
              <ShieldCheck className="h-4 w-4 text-[color:var(--brand-bronze)]" /> Why this is safe
            </div>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {[
                "Soft credit pull, never affects your score",
                "Bank-level 256-bit encryption",
                "No obligation — compare offers freely",
                "Virginia-licensed lending partners only",
              ].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--brand-bronze)]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats card */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--brand-charcoal)] p-5 text-white">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">The Ledger</span>
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { v: SITE_CONFIG.stats.businessesFunded, l: "Funded", icon: Users },
                { v: SITE_CONFIG.stats.loansFacilitated, l: "Facilitated", icon: Banknote },
                { v: `${SITE_CONFIG.stats.reviewsRating}/5`, l: "Rating", icon: Star },
                { v: SITE_CONFIG.stats.fastestFundingHours, l: "Fastest", icon: Zap },
              ].map((m) => (
                <div key={m.l} className="rounded-xl bg-white/5 p-3">
                  <div className="text-xl font-bold text-[color:var(--brand-bronze)]">{m.v}</div>
                  <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">{m.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Call CTA */}
          <div className="rounded-2xl border border-[color:var(--brand-bronze)]/25 bg-[color:var(--brand-bronze)]/8 p-5">
            <div className="text-sm font-bold text-foreground">Need a quick gut-check?</div>
            <p className="mt-1.5 text-sm text-muted-foreground">Talk to a Whitfield Credit advisor in {CITY} before you finish the form.</p>
            <a href={SITE_CONFIG.phoneHref} className="btn-primary mt-4 w-full justify-center py-3 text-[12px]">
              {SITE_CONFIG.phone}
            </a>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
              <Clock className="h-3 w-3 text-[color:var(--brand-bronze)]" />
              Mon–Fri · 8am–7pm CT
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Lock className="h-3 w-3 text-[color:var(--brand-bronze)]" /> SSL</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-[color:var(--brand-bronze)]" /> Encrypted</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-[color:var(--brand-bronze)]" /> VA-Licensed</span>
          </div>

          <Link to="/" className="inline-flex items-center gap-1 px-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-[color:var(--brand-bronze)]">
            <ArrowRight className="h-3 w-3 rotate-180" /> Back to home
          </Link>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
