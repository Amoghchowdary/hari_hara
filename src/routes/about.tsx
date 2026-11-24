import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import poolImg from "@/assets/landscape-pool-night.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Harihara Constructions & Fabrication" },
      { name: "description", content: "Learn how Harihara Constructions & Fabrication blends Kerala-style architecture with modern construction practices." },
      { property: "og:title", content: "About Harihara Constructions & Fabrication" },
      { property: "og:description", content: "Kerala-style farmhouses, pools, mandwas, and fabrication built with traditional beauty and modern durability." },
      { property: "og:image", content: poolImg },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="relative py-20 lg:py-28 bg-background overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-4">ABOUT US</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gold font-medium leading-tight">{BRAND.tagline}</h1>
          <div className="w-24 h-px bg-gold mx-auto my-8" />
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed text-base sm:text-lg">{BRAND.description}</p>
        </div>
      </section>

      <section className="py-20 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-2">WHO WE ARE</p>
              <h2 className="font-serif text-3xl text-gold font-medium mb-3">Building with traditional craft</h2>
              <p className="text-muted-foreground leading-relaxed">
                Harihara Constructions &amp; Fabrication is a construction and fabrication company that designs and builds farmhouses, pools, outdoor living spaces, and commercial structures. We work hands-on with our crew on every project — no outsourcing the parts that matter.
              </p>
            </div>
            <div>
              <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-2">WHAT WE BUILD</p>
              <h2 className="font-serif text-3xl text-gold font-medium mb-3">A complete capability set</h2>
              <p className="text-muted-foreground leading-relaxed">
                Kerala-style farmhouses, swimming pools, mandwas and gazebos, fire camp areas, landscape and garden development, fabrication works, roofing structures, office buildings, and complete site renovations.
              </p>
            </div>
            <div>
              <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-2">DESIGN PHILOSOPHY</p>
              <h2 className="font-serif text-3xl text-gold font-medium mb-3">Forms shaped by climate</h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe traditional architecture earned its forms through climate and lifestyle — sloped roofs, deep verandahs, exposed brick, breathable plans. We carry those forms forward and pair them with modern engineering, waterproofing, electrical systems, and finishes that hold up year after year.
              </p>
            </div>
          </div>
          <div className="space-y-6 lg:sticky lg:top-28">
            <img src={poolImg} alt="Landscaped pool and garden built by Harihara" className="rounded-2xl shadow-elegant w-full aspect-[4/5] object-cover" />
            <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
              <h3 className="font-serif text-xl text-gold mb-2">Quality &amp; finishing commitment</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                We pay attention to the details that age well — joinery, drainage, surface preparation, lighting layouts. Our finishing pass is what separates a good build from one that still looks new five years later.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-3xl px-4 text-center text-primary-foreground">
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-4">BOOK YOUR VISIT TODAY!</p>
          <h2 className="font-serif text-4xl text-gold font-medium mb-4">Have a site in mind?</h2>
          <p className="text-primary-foreground/80 mb-8">Share your idea — we'll guide you through what's possible.</p>
          <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-primary hover:text-primary-foreground transition-smooth">
            <Link to="/quote">Enquire Now</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
