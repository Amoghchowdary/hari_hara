import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SERVICES } from "@/lib/services";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services | Harihara Constructions & Fabrication" },
      { name: "description", content: "Farmhouse construction, swimming pools, mandwas, fire camp areas, landscaping, fabrication, roofing, office construction, and renovation services." },
      { property: "og:title", content: "Our Services | Harihara Constructions & Fabrication" },
      { property: "og:description", content: "Construction, fabrication, and outdoor lifestyle services — all under one roof." },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <SiteLayout>
      <section className="py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-4">OUR SERVICES</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gold font-medium leading-tight">Everything we build, end to end</h1>
          <div className="w-24 h-px bg-gold mx-auto my-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
            From the foundation to the final landscape light — every service handled by our team.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group rounded-2xl bg-card border border-border p-7 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant hover:border-gold/40">
                <div className="h-14 w-14 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-5">
                  <Icon className="h-7 w-7" />
                </div>
                <h2 className="font-serif text-xl text-gold mb-2">{s.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.short}</p>
                <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-primary font-semibold border-b border-gold pb-1">
                  Know More <ArrowRight className="h-3 w-3 transition-smooth group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
