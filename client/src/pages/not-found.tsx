// Public 404 / 500 page. Wired in as Vike's error page via
// pages/_error/+Page.tsx so unknown URLs land here instead of Vike's
// default "no error page defined" template. Reads pageContext.is404 to
// switch between the two messages.

import { usePageContext } from "vike-react/usePageContext";
import { ArrowRight, Phone } from "lucide-react";
import { PublicLayout } from "@/components/public-layout";
import { Button } from "@/components/ui/button";
import { SPENCER_PHONE, SPENCER_PHONE_HREF } from "@/lib/format";

export default function NotFoundPage() {
  const ctx = usePageContext() as any;
  const is404 = ctx?.is404 ?? true;

  const heading = is404 ? "Page not found" : "Something went wrong";
  const eyebrow = is404 ? "404" : "500";
  const blurb = is404
    ? "The page you're looking for may have moved, been renamed, or never existed. Try one of the destinations below."
    : "Our server hit an unexpected error. Spencer's been notified and we'll have it sorted shortly. In the meantime:";

  return (
    <PublicLayout>
      <section className="max-w-[900px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="font-display text-[11px] tracking-[0.32em] text-muted-foreground">
          {eyebrow}
        </div>
        <h1
          className="mt-4 font-serif text-4xl lg:text-6xl leading-[1.05]"
          style={{ letterSpacing: "-0.01em" }}
        >
          {heading}
        </h1>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-foreground/80">
          {blurb}
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
          {[
            { label: "Search Calgary MLS", href: "/mls" },
            { label: "Request a home evaluation", href: "/home-evaluation" },
            { label: "Browse neighbourhoods", href: "/neighbourhoods" },
            { label: "Go to the homepage", href: "/" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between gap-3 border border-border bg-background hover:bg-secondary/60 transition-colors rounded-sm px-5 py-4"
              data-testid={`error-link-${link.href.replace(/\//g, "-")}`}
            >
              <span className="font-display text-[11px] tracking-[0.22em]">
                {link.label.toUpperCase()}
              </span>
              <ArrowRight
                className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all"
                strokeWidth={1.8}
              />
            </a>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center gap-4">
          <span className="text-[13px] text-muted-foreground">
            Prefer to talk to Spencer directly?
          </span>
          <a href={SPENCER_PHONE_HREF}>
            <Button
              variant="outline"
              className="rounded-sm font-display text-[11px] tracking-[0.22em]"
              data-testid="error-call-spencer"
            >
              <Phone className="w-3.5 h-3.5 mr-2" strokeWidth={1.8} />
              CALL {SPENCER_PHONE}
            </Button>
          </a>
        </div>
      </section>
    </PublicLayout>
  );
}
