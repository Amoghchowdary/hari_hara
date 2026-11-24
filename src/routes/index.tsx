import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck, Award, Clock, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/services";
import { PROJECTS } from "@/lib/projects";
import { BRAND } from "@/lib/brand";
import heroImg from "@/assets/farmhouse-twin-night.jpg";
import poolImg from "@/assets/landscape-pool-night.jpg";
import sideImg from "@/assets/project-1.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harihara Constructions & Fabrication | Kerala Farmhouses, Pools & Fabrication" },
      { name: "description", content: "Build your dream Kerala-style farmhouse, swimming pool, mandwa, fire camp area, and landscape with Harihara Constructions & Fabrication." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

const STATS = [
  { value: "150+", label: "Projects Delivered", sub: "Across Kerala & beyond" },
  { value: "20+", label: "Years of Craft", sub: "Traditional + modern build" },
  { value: "100%", label: "In-House Crew", sub: "No outsourced finishing" },
  { value: "1 Day", label: "Response Time", sub: "From initial enquiry" },
];

const CATEGORIES = [
  { slug: "kerala-farmhouses", label: "Farmhouses", img: heroImg, blurb: "Traditional Kerala-style design with brick, wood, and tiled roofing." },
  { slug: "swimming-pools", label: "Swimming Pools", img: poolImg, blurb: "Custom concrete pools with finishing, lighting, and pool-side decks." },
  { slug: "landscaping", label: "Landscape & Gardens", img: poolImg, blurb: "Lawn, planting, pathways, and warm outdoor lighting." },
];

const WHY = [
  { icon: Award, title: "Premium Quality Construction", desc: "Uncompromising standards across materials, structural work, and finishing." },
  { icon: Sparkles, title: "Rich Living Experience", desc: "Thoughtfully designed homes with modern amenities and quality infrastructure." },
  { icon: ShieldCheck, title: "Trusted Craftsmanship", desc: "Direct accountability — the same team plans, builds, and finishes your project." },
  { icon: Clock, title: "Timely Project Delivery", desc: "Strong planning and disciplined execution — delivered as promised." },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO — split: copy on the left, image as side accent on the right */}
      <section className="relative bg-background overflow-hidden pt-28 lg:pt-32 pb-16 lg:pb-24">
        {/* subtle decorative gold ring in the corner */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full border border-gold/20" />
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full border border-gold/10" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 animate-fade-up">
            <div className="flex flex-wrap gap-2">
              {["TRADITIONAL", "MODERN STRENGTH", "100% IN-HOUSE"].map((b) => (
                <span key={b} className="px-3 py-1 rounded-full border border-gold/40 text-gold text-[10px] tracking-widest font-semibold">
                  {b}
                </span>
              ))}
            </div>
            <p className="font-serif text-gold text-sm uppercase tracking-[0.3em]">WELCOME!</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.05] text-balance text-gold">
              Building Spaces for a Rich Living Experience
            </h1>
            <div className="w-24 h-px bg-gold" />
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl text-pretty leading-relaxed">
              At {BRAND.name}, we believe that building goes beyond creating structures — it is about
              crafting Kerala-style farmhouses, pools, and outdoor spaces that enrich everyday life.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-primary hover:text-primary-foreground transition-smooth shadow-elegant">
                <Link to="/quote">Enquire Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-gold-foreground">
                <Link to="/projects">View Our Projects</Link>
              </Button>
            </div>
          </div>

          {/* Side image — corner accent, not full-bleed */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant aspect-[4/5]">
              <img src={sideImg} alt="Featured Harihara project" className="h-full w-full object-cover" />
            </div>
            <div className="hidden lg:block absolute -bottom-6 -left-6 h-32 w-32 rounded-2xl border-2 border-gold/40 -z-0" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-4">WELCOME!</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gold font-medium leading-tight mb-2">
            Building homes for a Rich Living Experience
          </h2>
          <p className="font-serif text-2xl sm:text-3xl text-foreground/80 mb-8">— At {BRAND.shortName} Constructions</p>
          <div className="w-24 h-px bg-gold mx-auto mb-8" />
          <h3 className="font-serif text-3xl sm:text-4xl text-gold font-medium mb-6">About {BRAND.shortName} Constructions</h3>
          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg max-w-3xl mx-auto">
            {BRAND.name} has built a credible reputation across Kerala — designing and constructing
            farmhouses, swimming pools, mandwas, fire camp areas, landscaping, fabrication structures,
            and office buildings. With careful attention to traditional Kerala architecture and modern
            engineering, our exquisite structures are the perfect combination of aesthetic design,
            elegance, and durability. We devote our time to understanding customer requirements and
            building spaces with maximum facilities, in eco-friendly environs. Adhering to quality
            and attention to detail at every stage ensures the secured feeling of having a build
            really made to last.
          </p>
          <div className="mt-8">
            <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-gold-foreground">
              <Link to="/about">Know More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 lg:py-20 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">AT A GLANCE</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-gold font-medium">By the Numbers</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {STATS.map((s) => (
              <div key={s.label} className="text-center bg-card rounded-2xl p-8 border border-border shadow-card hover:shadow-elegant transition-smooth hover:-translate-y-1">
                <div className="font-serif text-5xl lg:text-6xl text-gold font-medium mb-2">{s.value}</div>
                <div className="font-serif text-lg text-primary mb-1">{s.label}</div>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE CATEGORIES — image cards */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">WHAT WE BUILD</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-gold font-medium">Our Specialities</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((c) => (
              <Link key={c.slug} to="/services/$slug" params={{ slug: c.slug }} className="group rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-elegant transition-smooth hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={c.img} alt={c.label} className="h-full w-full object-cover transition-smooth group-hover:scale-105" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif text-2xl text-gold mb-2">{c.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.blurb}</p>
                  <span className="inline-block text-xs uppercase tracking-widest text-primary font-semibold border-b border-gold pb-1">
                    Know More
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-20 lg:py-28 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">PORTFOLIO</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-gold font-medium">Featured Projects</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.slice(0, 6).map((p) => (
              <div key={p.id} className="group relative rounded-2xl overflow-hidden shadow-card aspect-[4/3] cursor-pointer">
                <img src={p.image} alt={p.alt} className="h-full w-full object-cover transition-smooth group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="inline-block text-[10px] uppercase tracking-widest text-gold font-semibold mb-1">{p.category}</span>
                  <h3 className="font-serif text-xl">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-gold-foreground">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">WHY CHOOSE US</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-gold font-medium">Why Choose {BRAND.shortName}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-card border border-border p-7 shadow-card hover:shadow-elegant transition-smooth hover:-translate-y-1 text-center">
                <div className="h-14 w-14 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto mb-5">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-lg text-primary mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES (replaces apt amenities) */}
      <section className="py-20 lg:py-28 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">CAPABILITIES</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-gold font-medium">Everything Under One Roof</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">From foundation to final landscape light — every service handled by our in-house team.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.slug} className="flex items-center gap-4 bg-card rounded-xl p-5 border border-border hover:border-gold/40 transition-smooth">
                  <div className="h-12 w-12 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-primary">{s.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">GALLERY</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-gold font-medium">Project Gallery</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {PROJECTS.slice(0, 6).map((p) => (
              <div key={`g-${p.id}`} className="aspect-square overflow-hidden rounded-xl group">
                <img src={p.image} alt={p.alt} className="h-full w-full object-cover transition-smooth group-hover:scale-110" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-primary">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-primary-foreground">
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-4">BOOK YOUR VISIT TODAY!</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gold font-medium mb-4">Let's Build Together</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">Tell us about your land or idea — we'll respond with a clear next step within one working day.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-primary hover:text-primary-foreground transition-smooth">
              <Link to="/quote">Enquire Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/60 text-white bg-transparent hover:bg-white hover:text-primary">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
          <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-primary-foreground/80">
            {["Premium Quality", "Timely Delivery", "Transparent Pricing", "100% In-House"].map((w) => (
              <li key={w} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-gold" /> {w}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
