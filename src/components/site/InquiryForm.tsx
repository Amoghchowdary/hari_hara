import { useState } from "react";
import { useForm, type Resolver, type FieldErrors } from "react-hook-form";
import { validateEnquiryForm, type EnquiryFormValues } from "@/lib/enquiry-validation";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { waLink } from "@/lib/brand";
import { submitEnquiryToAppsScript } from "@/lib/backend";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { SERVICES } from "@/lib/services";

type FormValues = EnquiryFormValues;

// React Hook Form supports a custom resolver; no external Zod runtime is needed.
const enquiryResolver: Resolver<FormValues> = async (rawValues) => {
  const { values, errors: validationErrors } = validateEnquiryForm(rawValues);
  const errors = Object.fromEntries(
    Object.entries(validationErrors).map(([name, message]) => [
      name, { type: "validate", message },
    ]),
  ) as FieldErrors<FormValues>;
  return Object.keys(errors).length
    ? { values: {}, errors }
    : { values, errors: {} };
};

const BUDGET_RANGES = [
  "Under ₹5 Lakh",
  "₹5 – 15 Lakh",
  "₹15 – 30 Lakh",
  "₹30 – 50 Lakh",
  "₹50 Lakh – 1 Crore",
  "Above ₹1 Crore",
  "Not sure yet",
];

const CONTACT_TIMES = [
  "Morning (9 AM – 12 PM)",
  "Afternoon (12 – 4 PM)",
  "Evening (4 – 8 PM)",
  "Anytime",
];

export interface InquiryFormProps {
  defaultService?: string;
  compact?: boolean;
}

type SubmissionStatus =
  | { kind: "idle" }
  | { kind: "success"; reference: string }
  | { kind: "error"; message: string; whatsappLink: string };

function fallbackWhatsAppLink(values: FormValues) {
  const details = [
    "*Harihara Constructions – Project Enquiry*",
    `Name: ${values.full_name}`,
    `Phone: ${values.phone}`,
    values.whatsapp ? `WhatsApp: ${values.whatsapp}` : "",
    values.email ? `Email: ${values.email}` : "",
    values.location ? `Site Location: ${values.location}` : "",
    `Service: ${values.service_interest}`,
    values.budget_range ? `Budget: ${values.budget_range}` : "",
    values.preferred_contact_time ? `Preferred contact: ${values.preferred_contact_time}` : "",
    `Project details: ${values.project_description}`,
  ].filter(Boolean).join("\n");
  return waLink(details);
}

export function InquiryForm({ defaultService }: InquiryFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>({ kind: "idle" });
  const [website, setWebsite] = useState(""); // Hidden bot-trap field

  const form = useForm<FormValues>({
    resolver: enquiryResolver,
    defaultValues: {
      full_name: "",
      phone: "",
      whatsapp: "",
      email: "",
      location: "",
      service_interest: defaultService ?? "",
      budget_range: "",
      preferred_contact_time: "",
      project_description: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (submitting) return;
    setSubmitting(true);
    setStatus({ kind: "idle" });
    try {
      const receipt = await submitEnquiryToAppsScript(values, website);
      setStatus({ kind: "success", reference: receipt.reference });
      form.reset();
    } catch (error) {
      setStatus({
        kind: "error",
        message: error instanceof Error ? error.message : "Could not confirm the enquiry.",
        whatsappLink: fallbackWhatsAppLink(values),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-2xl bg-card shadow-card p-6 lg:p-8 space-y-5">
        <div style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }} aria-hidden="true">
          <label htmlFor="harihara-website-verify">Website (leave blank)</label>
          <input id="harihara-website-verify" name="website" type="text" autoComplete="off" tabIndex={-1} value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <FormField control={form.control} name="full_name" render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name *</FormLabel>
              <FormControl><Input placeholder="Your name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number *</FormLabel>
              <FormControl><Input placeholder="+91 98765 43210" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="whatsapp" render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp Number</FormLabel>
              <FormControl><Input placeholder="Same as phone if blank" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="location" render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Site Location</FormLabel>
              <FormControl><Input placeholder="District, town or area" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="service_interest" render={({ field }) => (
            <FormItem>
              <FormLabel>Service Interested In *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Choose a service" /></SelectTrigger></FormControl>
                <SelectContent>{SERVICES.map((s) => <SelectItem key={s.slug} value={s.title}>{s.title}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="budget_range" render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Budget</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger></FormControl>
                <SelectContent>{BUDGET_RANGES.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="preferred_contact_time" render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Preferred Contact Time</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="When should we call?" /></SelectTrigger></FormControl>
                <SelectContent>{CONTACT_TIMES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="project_description" render={({ field }) => (
          <FormItem>
            <FormLabel>Tell us about your project *</FormLabel>
            <FormControl><Textarea placeholder="Site size, what you're planning to build, timelines, anything else we should know…" rows={4} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <p className="text-xs text-muted-foreground">Your enquiry will be sent to Harihara Constructions through its Google Apps Script backend. By submitting, you agree to be contacted about this enquiry. For reference images, use WhatsApp directly.</p>

        {status.kind === "success" && (
          <div role="status" className="flex items-start gap-3 rounded-xl border border-green-600/30 bg-green-50 p-4 text-green-900">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            <div><p className="font-semibold">Your enquiry has been recorded.</p><p className="text-sm">Reference: {status.reference}</p></div>
          </div>
        )}
        {status.kind === "error" && (
          <div role="alert" className="flex items-start gap-3 rounded-xl border border-amber-600/30 bg-amber-50 p-4 text-amber-950">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">We couldn't confirm your submission.</p>
              <p className="mt-1 text-sm">{status.message}</p>
              <a href={status.whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-medium underline">Contact us on WhatsApp instead</a>
            </div>
          </div>
        )}

        <Button type="submit" size="lg" disabled={submitting} className="w-full bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-95">
          {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting enquiry…</> : "Submit Enquiry"}
        </Button>
      </form>
    </Form>
  );
}
