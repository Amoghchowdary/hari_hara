import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, Users } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { getService, SERVICES } from "@/lib/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title} | Harihara Constructions & Fabrication` },
          { name: "description", content: loaderData.service.short },
          { property: "og:title", content: `${loaderData.service.title} | Harihara` },
          { property: "og:description", content: loaderData.service.description },
        ]
      : [],
  }),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const Icon = service.icon;
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <SiteLayout>
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
        <div className="mx-auto max-w-5xl px-4">
          <Link to="/services" className="text-gold text-sm hover:underline">← All services</Link>
          <div className="mt-6 flex items-start gap-5">
            <div className="h-16 w-16 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
              <Icon className="h-8 w-8 text-gold" />
            </div>
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl">{service.title}</h1>
              <p className="mt-3 text-primary-foreground/85 max-w-2xl">{service.short}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-2xl text-primary mb-3">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-primary mb-4">What's included</h2>
              <ul className="space-y-3">
                {service.included.map((i: string) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-accent p-6">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Users className="h-5 w-5" />
                <h3 className="font-serif text-lg">Ideal for</h3>
              </div>
              <p className="text-foreground/80">{service.ideal}</p>
            </div>
          </div>
          <aside className="rounded-2xl bg-card border border-border p-6 shadow-card h-fit lg:sticky lg:top-28">
            <h3 className="font-serif text-xl text-primary mb-2">Enquire about this service</h3>
            <p className="text-sm text-muted-foreground mb-5">Tell us about your site — we'll guide you on next steps.</p>
            <Button asChild size="lg" className="w-full bg-gradient-primary text-primary-foreground">
              <Link to="/quote" search={{ service: service.title }}>Enquire Now <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </aside>
        </div>
      </section>

      <section className="py-16 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-serif text-2xl text-primary mb-6">Other services</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {others.map((s: typeof SERVICES[number]) => {
              const I = s.icon;
              return (
                <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group rounded-2xl bg-card border border-border p-5 shadow-card hover:shadow-elegant transition-smooth">
                  <I className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-serif text-lg text-primary mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{s.short}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
