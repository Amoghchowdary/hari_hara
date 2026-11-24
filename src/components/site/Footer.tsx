import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { BRAND } from "@/lib/brand";
import logo from "@/assets/logo.png?url";

const SOCIAL = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-5">
            <div className="bg-white rounded-lg p-3 w-fit">
              <img src={logo} alt={BRAND.name} className="h-20 w-auto" />
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed font-sans max-w-sm">
              Wrap yourself with the timeless beauty of nature, each day of your life. Harihara
              Constructions &amp; Fabrication crafts Kerala-style farmhouses, pools, and outdoor
              living spaces with traditional beauty and modern strength.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-5 text-gold uppercase tracking-wider">Useful Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="text-primary-foreground/75 hover:text-gold transition-smooth">Home</Link></li>
              <li><Link to="/about" className="text-primary-foreground/75 hover:text-gold transition-smooth">About</Link></li>
              <li><Link to="/services" className="text-primary-foreground/75 hover:text-gold transition-smooth">Services</Link></li>
              <li><Link to="/projects" className="text-primary-foreground/75 hover:text-gold transition-smooth">Projects</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/75 hover:text-gold transition-smooth">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-serif text-xl mb-5 text-gold uppercase tracking-wider">Address</h4>
              <ul className="space-y-2.5 text-sm text-primary-foreground/80">
                <li>{BRAND.address}</li>
                <li><a href={`mailto:${BRAND.email}`} className="hover:text-gold transition-smooth">{BRAND.email}</a></li>
                <li><a href={`tel:${BRAND.phoneRaw}`} className="hover:text-gold transition-smooth">{BRAND.phone}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-base mb-3 text-gold uppercase tracking-wider">Follow Us</h4>
              <div className="flex items-center gap-2">
                {SOCIAL.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="h-9 w-9 rounded-full bg-primary-foreground/10 hover:bg-gold hover:text-gold-foreground flex items-center justify-center transition-smooth"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/15 text-center text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} Harihara Constructions &amp; Fabrication. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
