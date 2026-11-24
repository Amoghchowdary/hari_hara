import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { PROJECTS, PROJECT_CATEGORIES, type ProjectCategory } from "@/lib/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects | Harihara Constructions & Fabrication" },
      { name: "description", content: "Explore farmhouses, pools, landscaping, mandwas, fire camp areas, fabrication, and office construction projects by Harihara." },
      { property: "og:title", content: "Our Projects | Harihara" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <SiteLayout>
      <section className="py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-4">OUR PORTFOLIO</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gold font-medium leading-tight">Projects we've delivered</h1>
          <div className="w-24 h-px bg-gold mx-auto my-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">Browse a selection of our farmhouses, pools, landscaping, and fabrication work.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap gap-2 mb-8">
            {(["All", ...PROJECT_CATEGORIES] as const).map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth border ${filter === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground/80 hover:border-primary/40"}`}>
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-center py-16 text-muted-foreground">No projects in this category yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <article key={p.id} className="group rounded-2xl overflow-hidden bg-card border border-border shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt={p.alt} className="h-full w-full object-cover transition-smooth group-hover:scale-105" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] uppercase tracking-widest font-semibold text-terracotta">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-primary mb-1">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{p.description}</p>
                    <Button asChild size="sm" variant="outline" className="w-full">
                      <Link to="/quote" search={{ service: p.serviceSlug }}>Request Similar Project</Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
