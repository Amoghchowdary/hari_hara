import { Outlet, createRootRoute, HeadContent, Link } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Harihara Constructions & Fabrication | Farmhouses, Pools, Fabrication & Office Construction" },
      { name: "description", content: "Harihara Constructions & Fabrication builds Kerala-style farmhouses, swimming pools, mandwas, fire camp areas, landscaping, fabrication works, roofing structures, and office construction projects." },
      { name: "author", content: "Harihara Constructions & Fabrication" },
      { property: "og:title", content: "Harihara Constructions & Fabrication | Farmhouses, Pools, Fabrication & Office Construction" },
      { property: "og:description", content: "Harihara Constructions & Fabrication builds Kerala-style farmhouses, swimming pools, mandwas, fire camp areas, landscaping, fabrication works, roofing structures, and office construction projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Harihara Constructions & Fabrication | Farmhouses, Pools, Fabrication & Office Construction" },
      { name: "twitter:description", content: "Harihara Constructions & Fabrication builds Kerala-style farmhouses, swimming pools, mandwas, fire camp areas, landscaping, fabrication works, roofing structures, and office construction projects." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <>
      <HeadContent />
      <Outlet />
      <Toaster position="top-center" richColors />
    </>
  );
}
