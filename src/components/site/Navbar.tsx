import { Link } from "@tanstack/react-router";
import { Menu, X, Facebook, Instagram, Youtube } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import logo from "@/assets/logo.png?url";

const navItems = [
  { to: "/" as const, label: "Home" },
  { to: "/about" as const, label: "About Us" },
  { to: "/services" as const, label: "Services" },
  { to: "/projects" as const, label: "Projects" },
  { to: "/contact" as const, label: "Contact Us" },
];

const SOCIAL = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-smooth ${
        scrolled
          ? "bg-background/98 backdrop-blur-md shadow-card border-b border-border"
          : "bg-background/95 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between gap-4">
          <Link to="/" className="flex items-center group shrink-0">
            <img
              src={logo}
              alt={BRAND.name}
              className="h-12 lg:h-16 w-auto transition-smooth group-hover:scale-105"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-gold" }}
                inactiveProps={{ className: "text-foreground/85 hover:text-gold" }}
                className="px-3 py-2 text-[15px] font-serif tracking-wide transition-smooth"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="h-8 w-8 rounded-full bg-primary/5 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-smooth"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <Button asChild size="sm" className="bg-gold text-gold-foreground hover:bg-primary hover:text-primary-foreground transition-smooth font-medium">
              <Link to="/quote">Enquire Now</Link>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 rounded-md hover:bg-accent text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <nav className="lg:hidden pb-4 pt-2 border-t border-border space-y-1 animate-fade-up">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-gold bg-accent" }}
                className="block px-3 py-2.5 rounded-md text-sm font-serif hover:bg-accent"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size="sm" className="w-full mt-2 bg-gold text-gold-foreground">
              <Link to="/quote" onClick={() => setOpen(false)}>Enquire Now</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
