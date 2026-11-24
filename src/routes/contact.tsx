import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { InquiryForm } from "@/components/site/InquiryForm";
import { BRAND, telLink, mailLink, waLink } from "@/lib/brand";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Harihara Constructions & Fabrication" },
      { name: "description", content: "Get in touch with Harihara Constructions & Fabrication. Submit your project inquiry and our team will respond within one working day." },
      { property: "og:title", content: "Contact Harihara Constructions & Fabrication" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-4">GET IN TOUCH</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gold font-medium leading-tight">Tell us about your project</h1>
          <div className="w-24 h-px bg-gold mx-auto my-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">We'll respond within one working day with a clear next step.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-10">
          <aside className="space-y-4 lg:col-span-1">
            <ContactCard icon={Phone} title="Call us" value={BRAND.phone} href={telLink()} />
            <ContactCard icon={MessageCircle} title="WhatsApp" value={BRAND.whatsapp} href={waLink()} external />
            <ContactCard icon={Mail} title="Email" value={BRAND.email} href={mailLink()} />
            <ContactCard icon={MapPin} title="Location" value={BRAND.address} />
          </aside>
          <div className="lg:col-span-2">
            <InquiryForm />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ContactCard({ icon: Icon, title, value, href, external }: { icon: typeof Phone; title: string; value: string; href?: string; external?: boolean }) {
  const inner = (
    <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant hover:border-primary/30 transition-smooth">
      <div className="h-11 w-11 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{title}</p>
        <p className="font-serif text-lg text-primary mt-0.5">{value}</p>
      </div>
    </div>
  );
  if (!href) return inner;
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{inner}</a>;
}
