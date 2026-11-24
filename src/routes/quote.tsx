import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SiteLayout } from "@/components/site/SiteLayout";
import { InquiryForm } from "@/components/site/InquiryForm";
import { SERVICES } from "@/lib/services";

const searchSchema = z.object({
  service: z.string().optional(),
});

export const Route = createFileRoute("/quote")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Request a Quote | Harihara Constructions & Fabrication" },
      { name: "description", content: "Request a quote for farmhouse construction, swimming pools, landscaping, fabrication, and more from Harihara." },
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  const { service } = Route.useSearch();
  // Accept either a service slug or full title
  const matched = SERVICES.find((s) => s.slug === service || s.title === service);
  const defaultService = matched?.title;

  return (
    <SiteLayout>
      <section className="py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-4">REQUEST A QUOTE</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gold font-medium leading-tight">Let's plan your project</h1>
          <div className="w-24 h-px bg-gold mx-auto my-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
            {matched
              ? `Tell us about your ${matched.title.toLowerCase()} project — we'll get back with a transparent next step.`
              : "Tell us about your project — we'll get back with a transparent next step."}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <InquiryForm defaultService={defaultService} />
        </div>
      </section>
    </SiteLayout>
  );
}
