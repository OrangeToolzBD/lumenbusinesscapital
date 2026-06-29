import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "./index";
import {
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Building2,
  HeadphonesIcon,
} from "lucide-react";
import { buildHead } from "@/lib/seo";
import { buildGraph } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";

const siteFavUrl = "/lumenfav-removebg.png";

export const Route = createFileRoute("/contact")({
  head: () => {
    const title = "Contact Us";
    const description =
      "Have questions about funding? Reach out to Whitfield Credit. Fast responses, no obligation, 100% confidential.";
    return buildHead({
      title,
      description,
      path: "/contact",
      schema: buildGraph({ title, description, path: "/contact", pageType: "ContactPage" }),
    });
  },
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div aria-hidden className="h-20" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[color:var(--brand-charcoal)] py-24 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-[0.07]" />
        <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full blur-[130px]" style={{ background: "radial-gradient(circle, oklch(0.75 0.13 85 / 0.12) 0%, transparent 65%)" }} />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/30 bg-[color:var(--brand-bronze)]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
            Talk to Whitfield Credit
          </div>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Straight answers.{" "}
            <span className="text-[color:var(--brand-bronze)]">No scripts, no pressure.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/65">
            Questions, custom scenarios or ready to apply? Our funding desk is standing by — typically back within the hour during business days.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-5 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[color:var(--brand-bronze)]" /> 100% Confidential</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--brand-bronze)]" /> Soft Pull Only</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[color:var(--brand-bronze)]" /> 24-Hour Decisions</span>
          </div>
        </div>
      </section>

      {/* Contact channels */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: Phone,
              title: "Call the desk",
              value: SITE_CONFIG.phone,
              sub: "Mon–Fri · 8am–7pm CT · Sat 9am–2pm",
              href: SITE_CONFIG.phoneHref,
            },
            {
              icon: HeadphonesIcon,
              title: "Live chat",
              value: "Chat with a specialist",
              sub: "Available 24/7 on this site",
              href: "#",
            },
          ].map((c, i) => (
            <a
              key={c.title}
              href={c.href}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--brand-charcoal)]/30 hover:bg-[color:var(--brand-charcoal)] hover:text-white hover:shadow-xl"
            >
              <div aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 rounded-l-2xl bg-[color:var(--brand-bronze)] transition-transform duration-500 group-hover:scale-y-100" />
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[color:var(--brand-bronze)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <c.icon className="mt-4 h-7 w-7 text-[color:var(--primary)] transition-colors group-hover:text-[color:var(--brand-bronze)]" />
              <div className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground group-hover:text-white/55">
                {c.title}
              </div>
              <div className="mt-1 text-2xl font-bold tracking-tight">{c.value}</div>
              <div className="mt-2 text-sm text-muted-foreground group-hover:text-white/60">{c.sub}</div>
              <ArrowRight className="absolute right-6 top-6 h-4 w-4 -translate-x-2 opacity-0 text-[color:var(--brand-bronze)] transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </section>

      {/* Info cards */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Location */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
              <Building2 className="h-4 w-4" />
              {SITE_CONFIG.hasPublicOffice ? "Headquarters" : "Service area"}
            </div>
            {SITE_CONFIG.hasPublicOffice ? (
              <p className="mt-4 text-sm text-foreground">
                <strong className="block font-semibold">{SITE_CONFIG.name}</strong>
                {SITE_CONFIG.address.streetAddress}
                <br />
                {SITE_CONFIG.address.addressLocality}, {SITE_CONFIG.address.addressRegion}{" "}
                {SITE_CONFIG.address.postalCode}
              </p>
            ) : (
              <ul className="mt-4 space-y-2 text-sm text-foreground">
                {SITE_CONFIG.areasServed.map((area) => (
                  <li key={area} className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--brand-bronze)]" />
                    {area}
                  </li>
                ))}
              </ul>
            )}
            {SITE_CONFIG.license.state && SITE_CONFIG.license.licenseNumber && (
              <div className="mt-4 border-t border-border pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {SITE_CONFIG.license.state} License #{SITE_CONFIG.license.licenseNumber}
              </div>
            )}
          </div>

          {/* Hours */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
              <Clock className="h-4 w-4" />
              Desk Hours
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { day: "Mon–Fri", hours: "8am–7pm CT" },
                { day: "Saturday", hours: "9am–2pm CT" },
                { day: "Sunday", hours: "Closed" },
              ].map((r) => (
                <li key={r.day} className="flex justify-between border-b border-border/60 pb-2 last:border-0 last:pb-0">
                  <span className="text-muted-foreground">{r.day}</span>
                  <span className="font-semibold">{r.hours}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <MessageSquare className="h-3 w-3 text-[color:var(--brand-bronze)]" />
              Avg. reply &lt; 1 hour
            </div>
          </div>

          {/* Apply CTA card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--brand-charcoal)] p-6 text-white">
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, oklch(0.75 0.13 85) 0%, transparent 70%)" }} />
            <div className="relative">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">Ready to apply?</div>
              <h3 className="mt-3 text-2xl font-bold tracking-tight">Pre-qualify in 60 seconds.</h3>
              <p className="mt-2 text-sm text-white/60">Skip the back-and-forth. Soft credit pull, real offers in 24 hours.</p>
              <Link to="/apply-now" className="btn-primary mt-5 w-full justify-center py-3">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
