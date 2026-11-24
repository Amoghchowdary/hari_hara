import { MessageCircle } from "lucide-react";
import { waLink, BRAND } from "@/lib/brand";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with ${BRAND.shortName} on WhatsApp`}
      className="fixed bottom-5 right-5 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-60 animate-ping" />
      <span className="relative flex items-center justify-center h-14 w-14 rounded-full bg-emerald-600 text-white shadow-elegant transition-smooth group-hover:scale-110">
        <MessageCircle className="h-7 w-7" />
      </span>
    </a>
  );
}
